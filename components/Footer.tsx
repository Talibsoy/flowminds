"use client";
import { X, ExternalLink, Phone, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { useLanguage } from "@/components/LanguageContext";
import type { TranslationDictionary } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const columns: { titleKey: keyof TranslationDictionary; itemKeys: (keyof TranslationDictionary)[] }[] = [
    { titleKey: "footerColServices", itemKeys: ["footerSvc1", "footerSvc2", "footerSvc3", "footerSvc4"] },
    { titleKey: "footerColCompany", itemKeys: ["footerCompany1", "footerCompany2", "footerCompany3", "footerCompany4"] },
  ];
  return (
    <footer className="relative py-12 md:py-16 border-t" style={{ borderColor: "#1E1E2E", overflow: "clip" }}>
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2">
            <a href="#hero" className="flex items-center gap-2.5 mb-4">
              <Logo size={28} />
              <span className="text-lg font-bold" style={{ fontFamily: "var(--font-space)" }}>
                Flow<span className="text-gradient">Minds</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#8B8B9A" }}>
              {t("footerTagline")}
            </p>
            {/* Contact info */}
            <div className="flex flex-col gap-2 mt-5">
              <a href="tel:+447828721748"
                className="flex items-center gap-2 text-xs hover:text-white transition-colors duration-200"
                style={{ color: "#8B8B9A" }}
              >
                <Phone size={13} />
                +44 7828 721 7478
              </a>
              <a href="https://wa.me/447828721748"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs hover:text-green-400 transition-colors duration-200"
                style={{ color: "#8B8B9A" }}
              >
                <MessageCircle size={13} />
                WhatsApp
              </a>
              <a href="mailto:yourminds@flowminds.tech"
                className="flex items-center gap-2 text-xs hover:text-white transition-colors duration-200"
                style={{ color: "#8B8B9A" }}
              >
                <ExternalLink size={13} />
                yourminds@flowminds.tech
              </a>
            </div>

            <div className="flex items-center gap-3 mt-4">
              {[{ label: "X", icon: X }].map(({ label, icon: Icon }) => (
                <a key={label} href="#"
                  className="w-9 h-9 rounded-lg border flex items-center justify-center hover:text-white hover:border-purple-500/50 transition-all duration-200"
                  style={{ borderColor: "#1E1E2E", color: "#8B8B9A" }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.titleKey}>
              <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "var(--font-space)" }}>
                {t(col.titleKey)}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.itemKeys.map((itemKey) => (
                  <li key={itemKey}>
                    <a href="#" className="text-xs sm:text-sm hover:text-white transition-colors duration-200" style={{ color: "#8B8B9A" }}>
                      {t(itemKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t text-xs"
          style={{ borderColor: "#1E1E2E", color: "#8B8B9A" }}>
          <span>{t("footerRights", { year: String(year) })}</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t("footerOperational")}
          </div>
        </div>
      </div>
    </footer>
  );
}
