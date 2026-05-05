"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6 },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="section-base"
      style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
    >
      {/* Background orbs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: "min(60vw, 480px)", height: "min(60vw, 480px)",
          top: "15%", left: "8%",
          background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 70%)",
          animation: "pulse-glow 3s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: "min(50vw, 380px)", height: "min(50vw, 380px)",
          bottom: "10%", right: "5%",
          background: "radial-gradient(circle, rgba(6,182,212,0.11) 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />
      </div>

      <div className="section-inner" style={{ position: "relative", zIndex: 1, textAlign: "center", paddingTop: 80, paddingBottom: 80 }}>
        {/* Badge */}
        <motion.div {...fade(0)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)", color: "#C084FC", fontSize: 13, marginBottom: 24 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22D3EE", flexShrink: 0, animation: "pulse-glow 2s ease-in-out infinite" }} />
          AI-Powered Digital Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.1)}
          style={{
            fontFamily: "var(--font-space)",
            fontSize: "clamp(2rem, 7vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            color: "#F8F8FF",
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          We Build Systems<br />
          That{" "}
          <span className="text-gradient animate-gradient">Work For You</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fade(0.2)}
          style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)", color: "#8B8B9A", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.7 }}
        >
          AI web development, social media automation, Meta integrations &
          smart workflows — everything your business needs to scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.3)}
          style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", width: "100%" }}>
            <a href="#contact" className="glow-purple" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "13px 28px", borderRadius: 999, fontWeight: 700, fontSize: 15,
              color: "#fff", background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              textDecoration: "none", minWidth: 200,
            }}>
              Start Your Project <ArrowRight size={16} />
            </a>
            <a href="#projects" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "13px 28px", borderRadius: 999, fontWeight: 700, fontSize: 15,
              color: "#C084FC", border: "1px solid rgba(168,85,247,0.3)",
              textDecoration: "none", minWidth: 160,
            }}>
              <Play size={14} style={{ fill: "currentColor" }} /> See Our Work
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fade(0.4)}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 380, margin: "56px auto 0" }}
        >
          {[
            { value: "50+", label: "Projects" },
            { value: "99%", label: "Satisfaction" },
            { value: "24/7", label: "Automation" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="text-gradient" style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 800 }}>
                {s.value}
              </div>
              <div style={{ color: "#8B8B9A", fontSize: 11, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
