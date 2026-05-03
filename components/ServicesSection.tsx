"use client";
import { motion } from "framer-motion";
import { Globe, Share2, Layers, Key, Code2, Workflow, MessageCircle, TrendingUp } from "lucide-react";

const services = [
  { icon: Globe, title: "AI Web Dev", desc: "Intelligent websites powered by AI." },
  { icon: Share2, title: "Social Automation", desc: "Auto-scheduling, smart replies & analytics." },
  { icon: Layers, title: "Meta Solutions", desc: "Instagram, Facebook & WhatsApp integrations." },
  { icon: Key, title: "Long-Term Keys", desc: "Permanent token management for IG, FB & WA." },
  { icon: Code2, title: "Code Automation", desc: "Custom scripts & backend workflows." },
  { icon: Workflow, title: "No-Code Flows", desc: "Zapier, Make & n8n automations." },
  { icon: MessageCircle, title: "WhatsApp API", desc: "AI chatbots & broadcast messages 24/7." },
  { icon: TrendingUp, title: "Digital Strategy", desc: "Growth hacking & funnel optimization." },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 relative"
      style={{ overflow: "clip" }}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs sm:text-sm text-purple-300 mb-4">
            What We Do
          </span>
          <h2
            className="font-bold"
            style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.75rem, 6vw, 3rem)" }}
          >
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-sm sm:text-base" style={{ color: "#8B8B9A" }}>
            From AI-powered web apps to full Meta automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 place-items-center">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="group flex flex-col items-center gap-3 text-center w-full"
              >
                <div
                  className="circle-icon rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{ width: "clamp(88px, 22vw, 144px)", height: "clamp(88px, 22vw, 144px)" }}
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)" }}
                  />
                  <Icon
                    className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10"
                    strokeWidth={1.5}
                    style={{ width: "clamp(20px, 6vw, 32px)", height: "clamp(20px, 6vw, 32px)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-semibold text-white leading-tight"
                    style={{ fontFamily: "var(--font-space)", fontSize: "clamp(10px, 2.5vw, 14px)" }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="mt-1 leading-relaxed hidden sm:block max-w-[130px]"
                    style={{ color: "#8B8B9A", fontSize: 11 }}
                  >
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
