"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Plane, Music2, Newspaper, Scale, Workflow, Globe } from "lucide-react";

const projects = [
  {
    icon: Plane, tag: "Travel & AI", title: "NatoureFlY", url: "natourefly.com",
    desc: "AI-powered flight and travel platform with smart search, automated booking flows, and personalized recommendations.",
    results: ["Automated booking pipeline", "AI travel assistant", "Real-time flight data"],
    color: "#06B6D4",
  },
  {
    icon: Music2, tag: "AI Music Platform", title: "PromptAZ Music", url: "promptazmusic.com",
    desc: "Generate, discover and share AI-created music. Prompt-to-audio pipeline with Azerbaijani language support.",
    results: ["Prompt-to-music generation", "Multi-language support", "Community sharing"],
    color: "#A855F7",
  },
  {
    icon: Newspaper, tag: "News Automation", title: "AutoNews Engine", url: null,
    desc: "Fully automated news aggregation — scrapes, summarizes with AI, and publishes articles 24/7.",
    results: ["24/7 auto-publishing", "AI summarization", "Multi-source aggregation"],
    color: "#7C3AED",
  },
  {
    icon: Scale, tag: "LegalTech + Voice AI", title: "LexBot", url: null,
    desc: "Legal assistant chatbot with voice responses based on Azerbaijani legislation and international conventions.",
    results: ["Voice-enabled responses", "Law & convention database", "Multilingual legal AI"],
    color: "#F59E0B",
  },
  {
    icon: Workflow, tag: "Process Automation", title: "Business Flow Suite", url: null,
    desc: "End-to-end business automation using n8n, Make and custom APIs — CRM, invoicing, email & social.",
    results: ["n8n + Make workflows", "Zero manual input", "20+ automated processes"],
    color: "#10B981",
  },
  {
    icon: Globe, tag: "Meta + WhatsApp", title: "Meta Automation Stack", url: null,
    desc: "Long-term token management, Instagram DM automation, Facebook lead funnels and WhatsApp chatbots.",
    results: ["Long-term IG/FB tokens", "WA chatbot 24/7", "5,000+ msgs/day"],
    color: "#0866FF",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-16 md:py-24 relative" style={{ overflow: "clip" }}>
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs sm:text-sm text-cyan-300 mb-4">
            Portfolio
          </span>
          <h2
            className="font-bold"
            style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.75rem, 6vw, 3rem)" }}
          >
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-sm sm:text-base" style={{ color: "#8B8B9A" }}>
            Real solutions, real results.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border-gradient"
                style={{ background: "#13131A" }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${p.color}18 0%, transparent 60%)` }}
                />
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}
                  >
                    {p.tag}
                  </span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${p.color}22` }}>
                    <Icon size={18} style={{ color: p.color }} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-white text-base" style={{ fontFamily: "var(--font-space)" }}>
                      {p.title}
                    </h3>
                    {p.url && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5" style={{ color: "#8B8B9A" }}>
                        {p.url}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#8B8B9A" }}>
                    {p.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  {p.results.map((r) => (
                    <div key={r} className="flex items-center gap-2 text-xs" style={{ color: "#8B8B9A" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                      {r}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-medium group-hover:text-white transition-colors" style={{ color: "#8B8B9A" }}>
                  View project
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
