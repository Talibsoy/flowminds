import { X, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";

const links = {
  Services: ["AI Web Development", "Social Media Automation", "Meta Solutions", "Code Automation"],
  Company: ["About", "Projects", "Tech Stack", "Contact"],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12 md:py-16 px-5 sm:px-8 border-t" style={{ borderColor: "#1E1E2E", overflow: "hidden", maxWidth: "100vw" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <a href="#hero" className="flex items-center gap-2.5 mb-4">
              <Logo size={34} />
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Flow<span className="text-gradient">Minds</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#8B8B9A" }}>
              We build AI-powered digital systems that automate, scale, and
              grow your business — while you sleep.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { label: "X", icon: X, href: "#" },
                { label: "Link", icon: ExternalLink, href: "#" },
              ].map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-lg border flex items-center justify-center hover:text-white hover:border-purple-500/50 transition-all duration-200"
                  style={{ borderColor: "#1E1E2E", color: "#8B8B9A" }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4
                className="text-sm font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-space)" }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors duration-200"
                      style={{ color: "#8B8B9A" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t text-xs"
          style={{ borderColor: "#1E1E2E", color: "#8B8B9A" }}
        >
          <span>© {year} FlowMinds. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
