"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, LogOut, Mail, Clock, CheckCircle, MessageCircle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import type { Inquiry } from "@/lib/supabase";

const STATUS_CONFIG = {
  new: { label: "New", color: "#A855F7", bg: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.3)" },
  read: { label: "Read", color: "#06B6D4", bg: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.3)" },
  replied: { label: "Replied", color: "#10B981", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)" },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/inquiries");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    setUpdating(id);
    await fetch("/api/admin/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    setUpdating(null);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const counts = {
    new: inquiries.filter((i) => i.status === "new").length,
    read: inquiries.filter((i) => i.status === "read").length,
    replied: inquiries.filter((i) => i.status === "replied").length,
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F8F8FF" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(10,10,15,0.9)", borderBottom: "1px solid #1E1E2E", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
            <Zap size={15} className="text-white" />
          </div>
          <div>
            <span className="font-semibold text-sm" style={{ fontFamily: "var(--font-space)" }}>
              FlowMinds Admin
            </span>
            <p className="text-xs" style={{ color: "#8B8B9A" }}>Inquiry Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchInquiries}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: "#8B8B9A" }}
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
            style={{ color: "#8B8B9A" }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "New", count: counts.new, icon: MessageCircle, color: "#A855F7" },
            { label: "Read", count: counts.read, icon: Clock, color: "#06B6D4" },
            { label: "Replied", count: counts.replied, icon: CheckCircle, color: "#10B981" },
          ].map(({ label, count, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl p-5 flex items-center gap-4"
              style={{ background: "#13131A", border: "1px solid #1E1E2E" }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}22` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-space)" }}>{count}</div>
                <div className="text-xs" style={{ color: "#8B8B9A" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Inquiry list */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #1E1E2E" }}>
          <div className="px-6 py-4 flex items-center justify-between" style={{ background: "#13131A", borderBottom: "1px solid #1E1E2E" }}>
            <h2 className="font-semibold text-sm" style={{ fontFamily: "var(--font-space)" }}>
              All Inquiries
              <span className="ml-2 text-xs font-normal" style={{ color: "#8B8B9A" }}>({inquiries.length} total)</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20" style={{ background: "#0A0A0F" }}>
              <span className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
          ) : inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3" style={{ background: "#0A0A0F" }}>
              <Mail size={32} style={{ color: "#1E1E2E" }} />
              <p className="text-sm" style={{ color: "#8B8B9A" }}>No inquiries yet.</p>
            </div>
          ) : (
            <div style={{ background: "#0A0A0F" }}>
              {inquiries.map((inq, idx) => {
                const cfg = STATUS_CONFIG[inq.status];
                const isExpanded = expanded === inq.id;
                const date = new Date(inq.created_at).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
                });

                return (
                  <div
                    key={inq.id}
                    style={{ borderBottom: idx < inquiries.length - 1 ? "1px solid #1E1E2E" : "none" }}
                  >
                    {/* Row */}
                    <div
                      className="px-6 py-4 flex items-start gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                      onClick={() => setExpanded(isExpanded ? null : inq.id)}
                    >
                      {/* Status dot */}
                      <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span className="font-medium text-sm text-white">{inq.name}</span>
                          <a
                            href={`mailto:${inq.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs hover:text-white transition-colors"
                            style={{ color: "#06B6D4" }}
                          >
                            {inq.email}
                          </a>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs truncate" style={{ color: "#8B8B9A" }}>
                          {inq.message}
                        </p>
                      </div>

                      {/* Date + expand */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs hidden sm:block" style={{ color: "#8B8B9A" }}>{date}</span>
                        {isExpanded ? <ChevronUp size={14} style={{ color: "#8B8B9A" }} /> : <ChevronDown size={14} style={{ color: "#8B8B9A" }} />}
                      </div>
                    </div>

                    {/* Expanded */}
                    {isExpanded && (
                      <div className="px-6 pb-5 pl-12" style={{ background: "#0D0D14" }}>
                        <p
                          className="text-sm leading-relaxed mb-4 p-4 rounded-xl whitespace-pre-wrap"
                          style={{ background: "#13131A", border: "1px solid #1E1E2E", color: "#F8F8FF" }}
                        >
                          {inq.message}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          {/* Status buttons */}
                          {(["new", "read", "replied"] as const).map((s) => {
                            const c = STATUS_CONFIG[s];
                            return (
                              <button
                                key={s}
                                onClick={() => updateStatus(inq.id, s)}
                                disabled={inq.status === s || updating === inq.id}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-50"
                                style={{
                                  background: inq.status === s ? c.bg : "transparent",
                                  color: inq.status === s ? c.color : "#8B8B9A",
                                  border: `1px solid ${inq.status === s ? c.border : "#1E1E2E"}`,
                                }}
                              >
                                {updating === inq.id ? "..." : c.label}
                              </button>
                            );
                          })}
                          {/* Reply link */}
                          <a
                            href={`mailto:${inq.email}?subject=Re: Your FlowMinds inquiry&body=Hi ${inq.name},%0A%0A`}
                            className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200"
                            style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)" }}
                          >
                            <Mail size={12} />
                            Reply via Email
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
