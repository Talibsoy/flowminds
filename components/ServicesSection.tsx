"use client";
import { motion } from "framer-motion";
import { Globe, Share2, Layers, Key, Code2, Workflow, MessageCircle, TrendingUp, Bot, Package2 } from "lucide-react";

const SERVICES = [
  { icon: Globe,         title: "AI Web Development",   desc: "Intelligent websites powered by AI." },
  { icon: Bot,           title: "AI Agent Development",  desc: "Custom agents for WhatsApp, Messenger, Instagram." },
  { icon: Package2,      title: "SaaS Development",      desc: "Subscription tiers, payments, user lifecycle." },
  { icon: Share2,        title: "Social Automation",     desc: "Scheduling, smart replies & analytics." },
  { icon: Layers,        title: "Meta Solutions",        desc: "Instagram, Facebook & WhatsApp integrations." },
  { icon: Key,           title: "Long-Term API Keys",    desc: "Permanent tokens for IG, FB & WA." },
  { icon: Code2,         title: "Code Automation",       desc: "Custom scripts & backend workflows." },
  { icon: Workflow,      title: "No-Code Flows",         desc: "Zapier, Make & n8n automations." },
  { icon: MessageCircle, title: "WhatsApp Business API", desc: "AI chatbots & broadcast at scale." },
  { icon: TrendingUp,    title: "Digital Strategy",      desc: "Growth hacking & funnel optimization." },
];

const CIRCLE_SIZE = 120; // px — uniform on all screens
const CIRCLE_SIZE_MOBILE = 90;

export default function ServicesSection() {
  return (
    <section id="services" className="section-base" style={{ padding: "80px 0" }}>
      <div className="section-inner">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)", color: "#C084FC", fontSize: 12, marginBottom: 14 }}>
            What We Do
          </span>
          <h2 style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.7rem, 5vw, 2.8rem)", fontWeight: 800, color: "#F8F8FF" }}>
            Our <span className="text-gradient">Services</span>
          </h2>
          <p style={{ marginTop: 12, color: "#8B8B9A", fontSize: 15, maxWidth: 480, margin: "12px auto 0" }}>
            From AI-powered web apps to full Meta automation.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 32,
          justifyItems: "center",
        }}
          className="services-grid"
        >
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center", width: "100%" }}
                className="service-item"
              >
                <div
                  className="circle-icon"
                  style={{ width: CIRCLE_SIZE_MOBILE, height: CIRCLE_SIZE_MOBILE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Icon size={26} color="#A855F7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 700, color: "#F8F8FF", lineHeight: 1.3 }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: 11, color: "#8B8B9A", marginTop: 4, lineHeight: 1.5, maxWidth: 130 }}>
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .circle-icon {
            width: ${CIRCLE_SIZE}px !important;
            height: ${CIRCLE_SIZE}px !important;
          }
        }
        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
