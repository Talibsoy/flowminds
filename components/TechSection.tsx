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
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech" className="py-16 md:py-28 px-5 sm:px-8 relative overflow-x-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, #A855F744, transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-sm text-violet-300 mb-4">
            Our Stack
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Built With The{" "}
            <span className="text-gradient">Best Tools</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#8B8B9A" }}>
            We use battle-tested, cutting-edge technologies to deliver
            solutions that scale.
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:scale-105"
              style={{ background: "#13131A" }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: tech.color,
                  boxShadow: `0 0 10px ${tech.color}88`,
                }}
              />
              <span
                className="text-xs font-medium text-center leading-tight"
                style={{ color: "#8B8B9A" }}
              >
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scrolling marquee of tech names */}
        <div className="mt-16 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(90deg, #0A0A0F, transparent)" }}
          />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(270deg, #0A0A0F, transparent)" }}
          />
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...techs, ...techs].map((tech, i) => (
              <span
                key={i}
                className="text-sm font-medium px-4 py-2 rounded-full border border-white/5 flex-shrink-0"
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
