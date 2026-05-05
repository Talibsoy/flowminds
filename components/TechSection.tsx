"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techs = [
  { name: "Next.js", color: "#ffffff" },
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Python", color: "#FFD43B" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "Gemini AI", color: "#4285F4" },
  { name: "n8n", color: "#EA4B71" },
  { name: "Make", color: "#6D00CC" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "WhatsApp API", color: "#25D366" },
  { name: "Meta Graph API", color: "#0866FF" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "Vercel", color: "#ffffff" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "Framer Motion", color: "#BB4EFF" },
  { name: "Resend", color: "#ffffff" },
];

export default function TechSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tech" className="py-16 md:py-24 relative" style={{ overflow: "clip", background: "#0A0A0F", zIndex: 5, position: "relative" }}>
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs sm:text-sm text-violet-300 mb-4">
            Our Stack
          </span>
          <h2
            className="font-bold"
            style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.75rem, 6vw, 3rem)" }}
          >
            Built With The{" "}
            <span className="text-gradient">Best Tools</span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-sm sm:text-base" style={{ color: "#8B8B9A" }}>
            Battle-tested, cutting-edge technologies that scale.
          </p>
        </motion.div>

        {/* Tech grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3"
        >
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all duration-300"
              style={{ background: "#13131A" }}
            >
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}88` }}
              />
              <span className="text-[9px] sm:text-xs font-medium text-center leading-tight" style={{ color: "#8B8B9A" }}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee */}
        <div className="mt-10 md:mt-14 relative" style={{ overflow: "clip" }}>
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10"
            style={{ background: "linear-gradient(90deg, #0A0A0F, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10"
            style={{ background: "linear-gradient(270deg, #0A0A0F, transparent)" }} />
          <motion.div
            className="flex gap-3 sm:gap-6"
            style={{ whiteSpace: "nowrap", width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...techs, ...techs].map((tech, i) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border flex-shrink-0"
                style={{ color: tech.color, borderColor: `${tech.color}22`, background: `${tech.color}11` }}
              >
                {tech.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
