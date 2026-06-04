"use client";
import { motion } from "framer-motion";
import { Globe, Share2, Layers, Key, Code2, Workflow, MessageCircle, TrendingUp, Bot, Package2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import type { TranslationDictionary } from "@/lib/i18n";

const SERVICES: { icon: typeof Globe; titleKey: keyof TranslationDictionary; descKey: keyof TranslationDictionary }[] = [
  { icon: Globe,         titleKey: "svcWebTitle",      descKey: "svcWebDesc" },
  { icon: Bot,           titleKey: "svcAgentTitle",    descKey: "svcAgentDesc" },
  { icon: Package2,      titleKey: "svcSaasTitle",     descKey: "svcSaasDesc" },
  { icon: Share2,        titleKey: "svcSocialTitle",   descKey: "svcSocialDesc" },
  { icon: Layers,        titleKey: "svcMetaTitle",     descKey: "svcMetaDesc" },
  { icon: Key,           titleKey: "svcApiTitle",      descKey: "svcApiDesc" },
  { icon: Code2,         titleKey: "svcCodeTitle",     descKey: "svcCodeDesc" },
  { icon: Workflow,      titleKey: "svcNoCodeTitle",   descKey: "svcNoCodeDesc" },
  { icon: MessageCircle, titleKey: "svcWhatsappTitle", descKey: "svcWhatsappDesc" },
  { icon: TrendingUp,    titleKey: "svcStrategyTitle", descKey: "svcStrategyDesc" },
];

const CIRCLE_SIZE = 120; // px — uniform on all screens
const CIRCLE_SIZE_MOBILE = 90;

export default function ServicesSection() {
  const { t } = useLanguage();
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
            {t("servicesBadge")}
          </span>
          <h2 style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.7rem, 5vw, 2.8rem)", fontWeight: 800, color: "#F8F8FF" }}>
            {t("servicesTitlePrefix")} <span className="text-gradient">{t("servicesTitleHighlight")}</span>
          </h2>
          <p style={{ marginTop: 12, color: "#8B8B9A", fontSize: 15, maxWidth: 480, margin: "12px auto 0" }}>
            {t("servicesSubtitle")}
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
                key={svc.titleKey}
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
                    {t(svc.titleKey)}
                  </h3>
                  <p style={{ fontSize: 11, color: "#8B8B9A", marginTop: 4, lineHeight: 1.5, maxWidth: 130 }}>
                    {t(svc.descKey)}
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
