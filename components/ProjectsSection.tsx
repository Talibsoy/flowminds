"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Plane, Music2, Cpu, Scale, Globe, Database } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import type { TranslationDictionary } from "@/lib/i18n";

type TKey = keyof TranslationDictionary;

const projects: {
  icon: typeof Plane;
  title: string;
  url: string | null;
  color: string;
  tagKey: TKey;
  descKey: TKey;
  resultKeys: [TKey, TKey, TKey];
}[] = [
  {
    icon: Plane,
    title: "NatoureFlY",
    url: "natoure.az",
    color: "#06B6D4",
    tagKey: "p1Tag", descKey: "p1Desc", resultKeys: ["p1r1", "p1r2", "p1r3"],
  },
  {
    icon: Database,
    title: "NatoureFlY Backend",
    url: null,
    color: "#0891B2",
    tagKey: "p2Tag", descKey: "p2Desc", resultKeys: ["p2r1", "p2r2", "p2r3"],
  },
  {
    icon: Music2,
    title: "PromptAZ Music",
    url: "promptazmusic.com",
    color: "#A855F7",
    tagKey: "p3Tag", descKey: "p3Desc", resultKeys: ["p3r1", "p3r2", "p3r3"],
  },
  {
    icon: Cpu,
    title: "PromptAZ Backend",
    url: null,
    color: "#9333EA",
    tagKey: "p4Tag", descKey: "p4Desc", resultKeys: ["p4r1", "p4r2", "p4r3"],
  },
  {
    icon: Scale,
    title: "LexBot",
    url: null,
    color: "#F59E0B",
    tagKey: "p5Tag", descKey: "p5Desc", resultKeys: ["p5r1", "p5r2", "p5r3"],
  },
  {
    icon: Globe,
    title: "Meta Automation Stack",
    url: null,
    color: "#0866FF",
    tagKey: "p6Tag", descKey: "p6Desc", resultKeys: ["p6r1", "p6r2", "p6r3"],
  },
];

export default function ProjectsSection() {
  const { t } = useLanguage();
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
            {t("projectsBadge")}
          </span>
          <h2 className="font-bold" style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.75rem, 6vw, 3rem)" }}>
            {t("projectsTitlePrefix")} <span className="text-gradient">{t("projectsTitleHighlight")}</span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-sm sm:text-base" style={{ color: "#8B8B9A" }}>
            {t("projectsSubtitle")}
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
                      {t(p.tagKey)}
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm sm:text-base leading-tight" style={{ fontFamily: "var(--font-space)" }}>
                        {p.title}
                      </h3>
                      {p.url && (
                        <a
                          href={`https://${p.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] px-2 py-0.5 rounded-full hover:opacity-80 transition-opacity"
                          style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}35`, textDecoration: "none" }}
                        >
                          ↗ {p.url}
                        </a>
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
                  {t(p.descKey)}
                </p>

                {/* Results */}
                <div className="flex flex-col gap-1.5 pt-1 border-t" style={{ borderColor: "#1E1E2E" }}>
                  {p.resultKeys.map((rk) => (
                    <div key={rk} className="flex items-start gap-2 text-xs" style={{ color: "#8B8B9A" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: p.color }} />
                      {t(rk)}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {p.url ? (
                  <a
                    href={`https://${p.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium group-hover:text-white transition-colors duration-200"
                    style={{ color: "#555566", textDecoration: "none" }}
                  >
                    {t("projVisit")} {p.url}
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="flex items-center gap-1 text-xs font-medium transition-colors duration-200"
                    style={{ color: "#A855F7", textDecoration: "none" }}
                  >
                    {t("projRequestDemo")}
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
