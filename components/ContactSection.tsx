"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare, User } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section
      id="contact"
      style={{
        background: "#0A0A0F",
        position: "relative",
        zIndex: 10,
        padding: "80px 0",
      }}
    >
      {/* BG glow — contained separately */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "40vw",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.1), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <span style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 999,
            border: "1px solid rgba(168,85,247,0.3)",
            background: "rgba(168,85,247,0.1)",
            color: "#C084FC",
            fontSize: 13,
            marginBottom: 16,
          }}>
            {t("contactBadge")}
          </span>
          <h2 style={{
            fontFamily: "var(--font-space)",
            fontSize: "clamp(1.75rem, 6vw, 3rem)",
            fontWeight: 800,
            color: "#F8F8FF",
            lineHeight: 1.15,
            margin: 0,
          }}>
            {t("contactTitlePrefix")}{" "}
            <span style={{
              background: "linear-gradient(135deg, #A855F7, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {t("contactTitleHighlight")}
            </span>
          </h2>
          <p style={{ marginTop: 12, color: "#8B8B9A", fontSize: 15 }}>
            {t("contactSubtitle")}
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={handleSubmit}
          style={{
            background: "#13131A",
            border: "1px solid #1E1E2E",
            borderRadius: 20,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          {/* Name */}
          <Field icon={<User size={15} color="#A855F7" />}>
            <input
              type="text"
              placeholder={t("formName")}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputCSS}
              onFocus={(e) => (e.target.style.borderColor = "#7C3AED")}
              onBlur={(e) => (e.target.style.borderColor = "#1E1E2E")}
            />
          </Field>

          {/* Email */}
          <Field icon={<Mail size={15} color="#A855F7" />}>
            <input
              type="email"
              placeholder={t("formEmail")}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputCSS}
              onFocus={(e) => (e.target.style.borderColor = "#7C3AED")}
              onBlur={(e) => (e.target.style.borderColor = "#1E1E2E")}
            />
          </Field>

          {/* Message */}
          <Field icon={<MessageSquare size={15} color="#A855F7" />} top>
            <textarea
              placeholder={t("formMessage")}
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{ ...inputCSS, resize: "none", paddingTop: 12 }}
              onFocus={(e) => (e.target.style.borderColor = "#7C3AED")}
              onBlur={(e) => (e.target.style.borderColor = "#1E1E2E")}
            />
          </Field>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              boxShadow: "0 0 25px rgba(124,58,237,0.25)",
              border: "none",
              borderRadius: 12,
              padding: "14px 24px",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: status === "loading" ? 0.6 : 1,
            }}
          >
            {status === "loading"
              ? <span style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
              : <><Send size={15} /> {t("formSend")}</>
            }
          </button>

          {status === "success" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: "flex", alignItems: "center", gap: 8, color: "#4ADE80", fontSize: 14 }}>
              <CheckCircle size={15} /> {t("formSuccess")}
            </motion.div>
          )}
          {status === "error" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: "flex", alignItems: "center", gap: 8, color: "#F87171", fontSize: 14 }}>
              <AlertCircle size={15} /> {t("formError")}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

const inputCSS: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  paddingLeft: 44,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 12,
  borderRadius: 12,
  fontSize: 14,
  outline: "none",
  background: "#0A0A0F",
  border: "1px solid #1E1E2E",
  color: "#F8F8FF",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

function Field({
  icon,
  children,
  top,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  top?: boolean;
}) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <span style={{
        position: "absolute",
        left: 14,
        top: top ? 14 : "50%",
        transform: top ? "none" : "translateY(-50%)",
        pointerEvents: "none",
        zIndex: 2,
        display: "flex",
      }}>
        {icon}
      </span>
      {children}
    </div>
  );
}
