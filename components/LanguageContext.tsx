"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, TranslationDictionary, DICTIONARIES } from "@/lib/i18n";

const COOKIE_KEY = "fm_locale";

interface LanguageContextProps {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  dict: TranslationDictionary;
  t: (key: keyof TranslationDictionary, variables?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Locale>("en");

  useEffect(() => {
    // Helper to read cookies client-side safely
    const getCookie = (name: string): string | null => {
      if (typeof document === "undefined") return null;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
      return null;
    };

    // 1. Check cookie first
    const savedCookie = getCookie(COOKIE_KEY);
    if (savedCookie === "az" || savedCookie === "en" || savedCookie === "tr") {
      setLanguageState(savedCookie as Locale);
      return;
    }

    // 2. Check localStorage fallback
    const savedLocal = localStorage.getItem(COOKIE_KEY);
    if (savedLocal === "az" || savedLocal === "en" || savedLocal === "tr") {
      setLanguageState(savedLocal as Locale);
      // Synchronize to cookie
      document.cookie = `${COOKIE_KEY}=${savedLocal}; path=/; max-age=31536000; SameSite=Lax`;
      return;
    }

    // 3. Auto-detect browser language (default: en)
    const browserLang = navigator.language.toLowerCase();
    let detectedLocale: Locale = "en";
    if (browserLang.startsWith("tr")) {
      detectedLocale = "tr";
    } else if (browserLang.startsWith("az")) {
      detectedLocale = "az";
    }

    setLanguageState(detectedLocale);
    localStorage.setItem(COOKIE_KEY, detectedLocale);
    document.cookie = `${COOKIE_KEY}=${detectedLocale}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    localStorage.setItem(COOKIE_KEY, lang);
    // Write cookie so server-side renders can read the active language
    document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const dict = DICTIONARIES[language];

  // Resolve dynamic interpolation values (e.g. {year})
  const t = (key: keyof TranslationDictionary, variables?: Record<string, string>): string => {
    let text = dict[key] || DICTIONARIES["en"][key] || "";
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{${k}}`, "g"), v);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dict, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
