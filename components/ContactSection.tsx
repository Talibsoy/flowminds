"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare, User } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
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

  const inputStyle = { background: "#0A0A0F", border: "1px solid #1E1E2E", color: "#F8F8FF" };
  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "#7C3AED");
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "#1E1E2E");

  return (
    <section id="contact" className="py-16 md:py-24 relative" style={{ overflow: "clip" }}>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: "80vw", height: "40vw", background: "radial-gradient(ellipse, rgba(124,58,237,0.1), transparent 70%)" }}
      />

      <div className="w-full max-w-2xl mx-auto px-5 sm:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs sm:text-sm text-purple-300 mb-4">
            Let&apos;s Talk
          </span>
          <h2 className="font-bold" style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.75rem, 6vw, 3rem)" }}>
            Start Your <span className="text-gradient">Project</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "#8B8B9A" }}>
            Tell us what you need. We&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="rounded-2xl p-5 sm:p-8 flex flex-col gap-4 border-gradient"
          style={{ background: "#13131A" }}
        >
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
            <input type="text" placeholder="Your Name" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
              style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </div>

          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
            <input type="email" placeholder="your@email.com" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
              style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </div>

          <div className="relative">
            <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-purple-400" />
            <textarea placeholder="Tell us about your project..." required rows={4} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none"
              style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </div>

          <button type="submit" disabled={status === "loading"}
            className="group flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", boxShadow: "0 0 25px rgba(124,58,237,0.25)" }}
          >
            {status === "loading"
              ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <><Send size={15} />Send Message</>}
          </button>

          {status === "success" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-green-400">
              <CheckCircle size={15} /> Message sent! We&apos;ll be in touch soon.
            </motion.div>
          )}
          {status === "error" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle size={15} /> Something went wrong. Please try again.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
