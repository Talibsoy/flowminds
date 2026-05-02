"use client";
import { motion } from "framer-motion";
import { Globe, Share2, Layers, Key, Code2, Workflow, MessageCircle, TrendingUp } from "lucide-react";

const services = [
  { icon: Globe, title: "AI Web Development", desc: "Intelligent websites powered by cutting-edge AI — built to convert." },
  { icon: Share2, title: "Social Media Automation", desc: "Auto-scheduling, smart replies, and analytics across all platforms." },
  { icon: Layers, title: "Meta Solutions", desc: "Full Instagram, Facebook & WhatsApp business integrations." },
  { icon: Key, title: "Long-Term API Keys", desc: "Secure, permanent token management for IG, FB & WA." },
  { icon: Code2, title: "Code Automation", desc: "Custom scripts, API pipelines, and backend workflows." },
  { icon: Workflow, title: "No-Code Automation", desc: "Zapier, Make & n8n flows that automate your business." },
  { icon: MessageCircle, title: "WhatsApp Business API", desc: "AI chatbots, broadcast messages & 24/7 engagement." },
  { icon: TrendingUp, title: "Digital Strategy", desc: "Growth hacking, funnel optimization and scaling strategies." },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-28 px-5 sm:px-8 relative overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, #7C3AED44, transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs sm:text-sm text-purple-300 mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-space)" }}>
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base px-2" style={{ color: "#8B8B9A" }}>
            From AI-powered web apps to full Meta automation — we handle the tech so you can focus on growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 place-items-center">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group flex flex-col items-center gap-3 md:gap-4 text-center w-full"
              >
                {/* Circle — smaller on mobile */}
                <div className="circle-icon w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at center, rgba(124,58,237,0.15), transparent 70%)" }} />
                  <Icon size={24} className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10 md:hidden" strokeWidth={1.5} />
                  <Icon size={32} className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10 hidden md:block" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-white leading-tight" style={{ fontFamily: "var(--font-space)" }}>
                    {svc.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs mt-1 leading-relaxed max-w-[120px] sm:max-w-[140px] hidden sm:block" style={{ color: "#8B8B9A" }}>
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
