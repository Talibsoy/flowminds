"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6 },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
      style={{ overflow: "clip" }}
    >
      {/* BG orbs — clipped inside section */}
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: "clip" }}>
        <div className="absolute rounded-full animate-pulse-glow"
          style={{
            width: "60vw", height: "60vw", maxWidth: 500, maxHeight: 500,
            top: "15%", left: "10%",
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="absolute rounded-full animate-float"
          style={{
            width: "50vw", height: "50vw", maxWidth: 400, maxHeight: 400,
            bottom: "10%", right: "5%",
            background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(168,85,247,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs sm:text-sm text-purple-300 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
          AI-Powered Digital Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-bold tracking-tight mb-5 leading-[1.15]"
          style={{
            fontFamily: "var(--font-space)",
            fontSize: "clamp(2rem, 8vw, 4.5rem)",
          }}
        >
          We Build Systems
          <br />
          That{" "}
          <span className="text-gradient animate-gradient">Work For You</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ color: "#8B8B9A" }}
        >
          AI web development, social media automation, Meta integrations &
          smart workflows — everything your business needs to scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <a
            href="#contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-300 glow-purple"
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
          >
            Start Your Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#projects"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold border border-purple-500/30 hover:border-purple-400/60 text-purple-300 hover:text-white transition-all duration-300 text-sm"
          >
            <Play size={13} className="fill-current" />
            See Our Work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-12 md:mt-20 grid grid-cols-3 gap-3 max-w-xs sm:max-w-md mx-auto"
        >
          {[
            { value: "50+", label: "Projects" },
            { value: "99%", label: "Satisfaction" },
            { value: "24/7", label: "Automation" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-bold text-gradient"
                style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.25rem, 5vw, 2rem)" }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs mt-1" style={{ color: "#8B8B9A" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs" style={{ color: "#8B8B9A" }}>Scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-purple-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
