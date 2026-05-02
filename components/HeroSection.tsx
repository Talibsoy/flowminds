"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7 },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated orb backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-[400px] h-[400px] rounded-full animate-float"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
            transform: "translate(50%, -50%)",
          }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-[300px] h-[300px] rounded-full animate-float-delay"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-sm text-purple-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          AI-Powered Digital Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.15)}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          style={{ fontFamily: "var(--font-space)" }}
        >
          We Build Systems
          <br />
          That{" "}
          <span className="text-gradient animate-gradient">Work For You</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#8B8B9A" }}
        >
          AI web development, social media automation, Meta integrations &
          smart workflows — everything your business needs to scale on autopilot.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.45)}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all duration-300 glow-purple text-base"
          >
            Start Your Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-purple-500/30 hover:border-purple-400/60 text-purple-300 hover:text-white transition-all duration-300 text-base"
          >
            <Play size={16} className="fill-current" />
            See Our Work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.6)}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "99%", label: "Client Satisfaction" },
            { value: "24/7", label: "Automation Running" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gradient" style={{ fontFamily: "var(--font-space)" }}>
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: "#8B8B9A" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
