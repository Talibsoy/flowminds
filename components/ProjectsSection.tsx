"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Plane, Music2, Cpu, Scale, Globe, Database } from "lucide-react";

const projects = [
  {
    icon: Plane,
    tag: "AI Travel Ecosystem",
    title: "NatoureFlY",
    url: "natoure.az",
    desc: "Azerbaijan's first end-to-end AI travel platform — from WhatsApp message to confirmed booking, zero human involvement. AI agent 'Nigar' runs across WhatsApp, Messenger, Instagram and web in Azerbaijani, sourcing 500+ airline routes via Duffel, hotel inventory via Booking.com, CBAR real-time FX conversion, and AZN checkout via ePoint.az. Four-tier loyalty engine included.",
    results: ["AI agent across 4 channels", "500+ airlines · Booking.com", "ePoint.az · Apple/Google Pay · Bronze→Platinum"],
    color: "#06B6D4",
  },
  {
    icon: Database,
    tag: "Infrastructure Automation",
    title: "NatoureFlY Backend",
    url: null,
    desc: "The operational backbone of natoure.az: Duffel + RateHawk daily price sync into Supabase, pgvector + Voyage AI semantic search enabling natural-language queries, automated tour packaging, weekly Telegram price reports — backed by AES-256-GCM encryption, webhook signature verification and server-side payment validation.",
    results: ["pgvector semantic search (RAG)", "Daily auto tour packaging", "AES-256 · 3D Secure · Rate limiting"],
    color: "#0891B2",
  },
  {
    icon: Music2,
    tag: "AI SaaS Platform",
    title: "PromptAZ Music",
    url: "promptazmusic.com",
    desc: "Azerbaijan's first AI music SaaS — built around mugham intelligence. Generates Şur, Segah and Rast-aware prompts, produces audio via Suno API in real time, and writes Azerbaijani lyrics on demand. Three subscription tiers (Free / Pro / Studio) with automated billing and usage enforcement.",
    results: ["Mugham-aware AI prompt engine", "Real-time audio via Suno API", "Free / Pro / Studio tiers"],
    color: "#A855F7",
  },
  {
    icon: Cpu,
    tag: "Content Automation",
    title: "PromptAZ Backend",
    url: null,
    desc: "The autonomous engine behind PromptAZ: Gemini AI writes and publishes daily SEO blog posts in Azerbaijani, new tracks auto-post to social platforms, the Qızıl Fond dataset expands continuously via scraping, Cloudflare Turnstile quotas self-manage, and weekly analytics land automatically. Zero human input.",
    results: ["Daily Gemini AI blog (SEO)", "Qızıl Fond dataset pipeline", "Auto social · Turnstile self-management"],
    color: "#9333EA",
  },
  {
    icon: Scale,
    tag: "LegalTech · Voice AI",
    title: "LexBot",
    url: null,
    desc: "A voice-enabled legal assistant grounded in Azerbaijani legislation and international conventions. Answers complex legal queries in real time — no lawyer required for first-line research.",
    results: ["Voice-enabled legal responses", "AZ legislation + intl. conventions", "Multilingual, citation-aware"],
    color: "#F59E0B",
  },
  {
    icon: Globe,
    tag: "Meta · WhatsApp · Social",
    title: "Meta Automation Stack",
    url: null,
    desc: "Enterprise-grade Meta automation: permanent token management for IG/FB/WA, Instagram DM flows, Facebook lead funnels, and WhatsApp Business chatbots handling 5,000+ messages daily — no manual renewal, no downtime.",
    results: ["Permanent IG/FB/WA tokens", "5,000+ automated msgs/day", "DM flows · Lead funnels · Chatbots"],
    color: "#0866FF",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-16 md:py-24 relative" style={{ overflow: "clip" }}>
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10">
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
          <h2 className="font-bold" style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.75rem, 6vw, 3rem)" }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-sm sm:text-base" style={{ color: "#8B8B9A" }}>
            Production systems running at scale — real businesses, real outcomes.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl p-6 sm:p-7 flex flex-col gap-4 border-gradient"
                style={{ background: "#13131A" }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${p.color}15 0%, transparent 65%)` }}
                />

                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full inline-block mb-2"
                      style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}35` }}
                    >
                      {p.tag}
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm sm:text-base leading-tight" style={{ fontFamily: "var(--font-space)" }}>
                        {p.title}
                      </h3>
                      {p.url && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5" style={{ color: "#8B8B9A" }}>
                          {p.url}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${p.color}18` }}>
                    <Icon size={17} style={{ color: p.color }} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-xs sm:text-sm leading-relaxed flex-1"
                  style={{
                    color: "#8B8B9A",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.desc}
                </p>

                {/* Results */}
                <div className="flex flex-col gap-1.5 pt-1 border-t" style={{ borderColor: "#1E1E2E" }}>
                  {p.results.map((r) => (
                    <div key={r} className="flex items-start gap-2 text-xs" style={{ color: "#8B8B9A" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: p.color }} />
                      {r}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-1 text-xs font-medium group-hover:text-white transition-colors duration-200" style={{ color: "#555566" }}>
                  View project
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
