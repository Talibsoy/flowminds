"use client";
import { motion } from "framer-motion";
import {
  Globe, Share2, Layers, Key, Code2, Workflow,
  MessageCircle, TrendingUp, Bot, Package2
} from "lucide-react";

const services = [
  { icon: Globe,        title: "AI Web Development",   desc: "Intelligent websites powered by AI — built to convert." },
  { icon: Bot,          title: "AI Agent Development",  desc: "Conversational AI agents for WhatsApp, Messenger, Instagram and web — trained on your data, live 24/7." },
  { icon: Package2,     title: "SaaS Development",      desc: "Full-stack SaaS with subscription tiers, payment gateways, auth and automated user lifecycle." },
  { icon: Share2,       title: "Social Automation",     desc: "Auto-scheduling, smart replies & cross-platform analytics." },
  { icon: Layers,       title: "Meta Solutions",        desc: "Instagram, Facebook & WhatsApp business integrations." },
  { icon: Key,          title: "Long-Term API Keys",    desc: "Permanent token management for IG, FB & WA — no expirations." },
  { icon: Code2,        title: "Code Automation",       desc: "Custom scripts, API pipelines and backend workflows." },
  { icon: Workflow,     title: "No-Code Flows",         desc: "Zapier, Make & n8n automations for your entire business." },
  { icon: MessageCircle,title: "WhatsApp Business API", desc: "AI chatbots & broadcast messaging at scale, 24/7." },
  { icon: TrendingUp,   title: "Digital Strategy",      desc: "Growth hacking, funnel optimization and scaling strategy." },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 relative" style={{ overflow: "clip" }}>
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10">
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
          <h2 className="font-bold" style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.75rem, 6vw, 3rem)" }}>
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-sm sm:text-base" style={{ color: "#8B8B9A" }}>
            From AI agents and SaaS platforms to full Meta automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8 place-items-center">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="group flex flex-col items-center gap-3 text-center w-full"
              >
                <div
                  className="circle-icon rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{ width: "clamp(80px, 18vw, 120px)", height: "clamp(80px, 18vw, 120px)" }}
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)" }}
                  />
                  <Icon
                    className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10"
                    strokeWidth={1.5}
                    style={{ width: "clamp(18px, 5vw, 28px)", height: "clamp(18px, 5vw, 28px)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-semibold text-white leading-tight"
                    style={{ fontFamily: "var(--font-space)", fontSize: "clamp(9px, 2.2vw, 13px)" }}
                  >
                    {svc.title}
                  </h3>
                  <p className="mt-1 leading-relaxed hidden sm:block max-w-[120px]" style={{ color: "#8B8B9A", fontSize: 10 }}>
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
