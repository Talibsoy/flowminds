"use client";
import { motion } from "framer-motion";
import {
  Globe,
  Share2,
  Layers,
  Key,
  Code2,
  Workflow,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

const services = [
  { icon: Globe, title: "AI Web Development", desc: "Intelligent, modern websites powered by cutting-edge AI — built to convert." },
  { icon: Share2, title: "Social Media Automation", desc: "Auto-scheduling, smart replies, and analytics across all your platforms." },
  { icon: Layers, title: "Meta Solutions", desc: "Full Instagram, Facebook & WhatsApp business integrations and campaigns." },
  { icon: Key, title: "Long-Term API Keys", desc: "Secure, permanent token management for IG, FB & WA — no more expirations." },
  { icon: Code2, title: "Code Automation", desc: "Custom scripts, API pipelines, and backend workflows tailored to your ops." },
  { icon: Workflow, title: "No-Code Automation", desc: "Zapier, Make & n8n flows that automate your entire business." },
  { icon: MessageCircle, title: "WhatsApp Business API", desc: "AI-powered chatbots, broadcast messages & 24/7 customer engagement." },
  { icon: TrendingUp, title: "Digital Strategy", desc: "Growth hacking, funnel optimization and data-driven scaling strategies." },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 px-6 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, #7C3AED44, transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-sm text-purple-300 mb-4">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-space)" }}>
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#8B8B9A" }}>
            From AI-powered web apps to full Meta automation — we handle the tech so you can focus on growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group flex flex-col items-center gap-4 text-center"
              >
                <div className="circle-icon w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at center, rgba(124,58,237,0.15), transparent 70%)" }}
                  />
                  <Icon
                    size={32}
                    className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white leading-tight" style={{ fontFamily: "var(--font-space)" }}>
                    {svc.title}
                  </h3>
                  <p className="text-xs mt-1 leading-relaxed max-w-[140px]" style={{ color: "#8B8B9A" }}>
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
