"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare, User } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
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
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-28 px-5 sm:px-8 relative" style={{ overflow: "hidden", maxWidth: "100vw" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, #7C3AED44, transparent)" }}
      />
      {/* BG glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom center, rgba(124,58,237,0.12), transparent 70%)" }}
      />

      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-sm text-purple-300 mb-4">
            Let&apos;s Talk
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Start Your{" "}
            <span className="text-gradient">Project</span>
          </h2>
          <p className="mt-4" style={{ color: "#8B8B9A" }}>
            Tell us what you need. We&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="rounded-2xl p-5 sm:p-8 border-gradient flex flex-col gap-4 sm:gap-5"
          style={{ background: "#13131A" }}
        >
          {/* Name */}
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 placeholder-muted"
              style={{
                background: "#0A0A0F",
                border: "1px solid #1E1E2E",
                color: "#F8F8FF",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7C3AED")}
              onBlur={(e) => (e.target.style.borderColor = "#1E1E2E")}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
              style={{
                background: "#0A0A0F",
                border: "1px solid #1E1E2E",
                color: "#F8F8FF",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7C3AED")}
              onBlur={(e) => (e.target.style.borderColor = "#1E1E2E")}
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare size={16} className="absolute left-4 top-4 text-purple-400" />
            <textarea
              placeholder="Tell us about your project..."
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 resize-none"
              style={{
                background: "#0A0A0F",
                border: "1px solid #1E1E2E",
                color: "#F8F8FF",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7C3AED")}
              onBlur={(e) => (e.target.style.borderColor = "#1E1E2E")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="group flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              boxShadow: "0 0 30px rgba(124,58,237,0.3)",
            }}
          >
            {status === "loading" ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Send Message
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
              </>
            )}
          </button>

          {/* Feedback */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-green-400"
            >
              <CheckCircle size={16} />
              Message sent! We&apos;ll be in touch soon.
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-red-400"
            >
              <AlertCircle size={16} />
              Something went wrong. Please try again.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
