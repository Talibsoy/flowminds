"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useLanguage } from "@/components/LanguageContext";
import type { Locale } from "@/lib/i18n";

const LOCALES: Locale[] = ["az", "en", "tr"];

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { label: t("navServices"), href: "#services" },
    { label: t("navProjects"), href: "#projects" },
    { label: t("navTech"),     href: "#tech" },
    { label: t("navContact"),  href: "#contact" },
  ];

  const LangSwitcher = ({ compact }: { compact?: boolean }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 2, padding: 3, borderRadius: 999, border: "1px solid rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.06)" }}>
      {LOCALES.map((loc) => {
        const active = language === loc;
        return (
          <button
            key={loc}
            onClick={() => setLanguage(loc)}
            aria-label={`Switch language to ${loc.toUpperCase()}`}
            style={{
              padding: compact ? "5px 11px" : "4px 10px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: active ? "#fff" : "#8B8B9A",
              background: active ? "linear-gradient(135deg,#7C3AED,#A855F7)" : "transparent",
              transition: "color 0.2s, background 0.2s",
            }}
          >
            {loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.4s ease",
        ...(scrolled ? {
          background: "rgba(10,10,15,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(124,58,237,0.12)",
          padding: "12px 0",
        } : { padding: "20px 0" }),
      }}
    >
      <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={26} />
          <span style={{ fontFamily: "var(--font-space)", fontSize: 18, fontWeight: 800, color: "#F8F8FF" }}>
            Flow<span className="text-gradient">Minds</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: "none", alignItems: "center", gap: 32, listStyle: "none", margin: 0, padding: 0 }} className="nav-desktop">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={{ fontSize: 14, color: "#8B8B9A", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F8F8FF")}
                onMouseLeave={e => (e.currentTarget.style.color = "#8B8B9A")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + language switcher (desktop) */}
        <div className="nav-cta" style={{ display: "none", alignItems: "center", gap: 14 }}>
          <LangSwitcher />
          <a href="#contact"
            className="glow-purple"
            style={{ padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#7C3AED,#A855F7)", textDecoration: "none" }}
          >
            {t("navGetStarted")}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 4, background: "none", border: "none", color: "#F8F8FF" }}
          aria-label="Toggle menu"
          className="nav-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: "rgba(10,10,15,0.96)", borderTop: "1px solid rgba(124,58,237,0.12)" }}
          >
            <ul style={{ listStyle: "none", padding: "16px 24px 20px", margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}
                    style={{ fontSize: 15, color: "#8B8B9A", textDecoration: "none" }}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <LangSwitcher compact />
              </li>
              <li>
                <a href="#contact" onClick={() => setOpen(false)}
                  style={{ display: "inline-block", padding: "10px 24px", borderRadius: 999, fontSize: 14, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#7C3AED,#A855F7)", textDecoration: "none" }}>
                  {t("navGetStarted")}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-cta     { display: flex !important; }
          .nav-toggle  { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
