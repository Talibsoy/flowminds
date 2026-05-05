"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TECHS = [
  { name: "Next.js",        color: "#ffffff" },
  { name: "React",          color: "#61DAFB" },
  { name: "TypeScript",     color: "#3178C6" },
  { name: "Python",         color: "#FFD43B" },
  { name: "OpenAI",         color: "#10A37F" },
  { name: "Gemini AI",      color: "#4285F4" },
  { name: "n8n",            color: "#EA4B71" },
  { name: "Make",           color: "#6D00CC" },
  { name: "Zapier",         color: "#FF4A00" },
  { name: "WhatsApp API",   color: "#25D366" },
  { name: "Meta Graph API", color: "#0866FF" },
  { name: "Supabase",       color: "#3ECF8E" },
  { name: "Vercel",         color: "#ffffff" },
  { name: "Tailwind CSS",   color: "#06B6D4" },
  { name: "Framer Motion",  color: "#BB4EFF" },
  { name: "Resend",         color: "#ffffff" },
];

export default function TechSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="tech" className="section-base" style={{ padding: "80px 0" }}>
      <div className="section-inner">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.08)", color: "#A78BFA", fontSize: 12, marginBottom: 14 }}>
            Our Stack
          </span>
          <h2 style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.7rem, 5vw, 2.8rem)", fontWeight: 800, color: "#F8F8FF" }}>
            Built With The <span className="text-gradient">Best Tools</span>
          </h2>
          <p style={{ marginTop: 12, color: "#8B8B9A", fontSize: 15, maxWidth: 440, margin: "12px auto 0" }}>
            Battle-tested, cutting-edge technologies that scale.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}
          className="tech-grid"
        >
          {TECHS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.035, duration: 0.35 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 8, padding: "12px 8px", borderRadius: 12,
                background: "#13131A", border: "1px solid #1E1E2E",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, boxShadow: `0 0 8px ${t.color}88`, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: "#8B8B9A", textAlign: "center", lineHeight: 1.3 }}>{t.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee */}
        <div style={{ marginTop: 48, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: "linear-gradient(90deg, #0A0A0F, transparent)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: "linear-gradient(270deg, #0A0A0F, transparent)" }} />
          <motion.div
            style={{ display: "flex", gap: 12, whiteSpace: "nowrap", width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {[...TECHS, ...TECHS].map((t, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 600,
                padding: "7px 14px", borderRadius: 999, flexShrink: 0,
                color: t.color,
                border: `1px solid ${t.color}22`,
                background: `${t.color}11`,
              }}>
                {t.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px)  { .tech-grid { grid-template-columns: repeat(6, 1fr) !important; } }
        @media (min-width: 1024px) { .tech-grid { grid-template-columns: repeat(8, 1fr) !important; } }
      `}</style>
    </section>
  );
}
