"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Zap, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0A0A0F" }}
    >
      {/* BG orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold" style={{ fontFamily: "var(--font-space)", color: "#F8F8FF" }}>
            Flow<span style={{ background: "linear-gradient(135deg,#A855F7,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Minds</span>
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 flex flex-col gap-5"
          style={{
            background: "#13131A",
            border: "1px solid rgba(124,58,237,0.2)",
            boxShadow: "0 0 40px rgba(124,58,237,0.08)",
          }}
        >
          <div className="text-center mb-2">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Lock size={20} className="text-purple-400" />
            </div>
            <h1 className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-space)" }}>
              Admin Access
            </h1>
            <p className="text-sm mt-1" style={{ color: "#8B8B9A" }}>
              Enter your password to continue
            </p>
          </div>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 pr-11 rounded-xl text-sm outline-none transition-all duration-300"
              style={{
                background: "#0A0A0F",
                border: `1px solid ${error ? "#EF4444" : "#1E1E2E"}`,
                color: "#F8F8FF",
              }}
              onFocus={(e) => { if (!error) e.target.style.borderColor = "#7C3AED"; }}
              onBlur={(e) => { if (!error) e.target.style.borderColor = "#1E1E2E"; }}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "#8B8B9A" }}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-400 -mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: "#8B8B9A" }}>
          flowminds.tech — Admin Panel
        </p>
      </div>
    </div>
  );
}
