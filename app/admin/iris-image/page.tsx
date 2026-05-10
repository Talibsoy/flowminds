"use client";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function IrisImageUploader() {
  const searchParams = useSearchParams();
  const contentKey = searchParams.get("key") ?? "";
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file || !contentKey) return;

    setStatus("uploading");
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "iris");

    const uploadRes = await fetch("/api/storage/upload", {
      method: "POST",
      headers: { "x-iris-key": process.env.NEXT_PUBLIC_IRIS_KEY ?? "" },
      body: formData,
    });

    if (!uploadRes.ok) {
      setStatus("error");
      setError("Yükləmə uğursuz oldu");
      return;
    }

    const { url } = await uploadRes.json();

    const patchRes = await fetch("/api/iris/set-image", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-iris-key": process.env.NEXT_PUBLIC_IRIS_KEY ?? "" },
      body: JSON.stringify({ contentKey, imageUrl: url }),
    });

    if (patchRes.ok) {
      setImageUrl(url);
      setStatus("done");
    } else {
      setStatus("error");
      setError("Şəkil saxlanmadı");
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0F", display: "flex",
      alignItems: "center", justifyContent: "center", fontFamily: "sans-serif",
    }}>
      <div style={{
        background: "#13131A", border: "1px solid #1E1E2E", borderRadius: 16,
        padding: 40, maxWidth: 480, width: "100%",
      }}>
        <h2 style={{ color: "#A855F7", margin: "0 0 8px" }}>📷 IRIS — Şəkil Yüklə</h2>
        <p style={{ color: "#8B8B9A", fontSize: 14, margin: "0 0 24px" }}>
          Content key: <code style={{ color: "#06B6D4" }}>{contentKey}</code>
        </p>

        {status === "done" ? (
          <div>
            <p style={{ color: "#10B981", marginBottom: 16 }}>✅ Şəkil uğurla yükləndi!</p>
            <img src={imageUrl} alt="uploaded" style={{ width: "100%", borderRadius: 8 }} />
            <p style={{ color: "#8B8B9A", fontSize: 12, marginTop: 12, wordBreak: "break-all" }}>{imageUrl}</p>
          </div>
        ) : (
          <form onSubmit={handleUpload}>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              style={{
                display: "block", width: "100%", padding: "12px",
                background: "#0A0A0F", border: "1px solid #1E1E2E",
                borderRadius: 8, color: "#F8F8FF", marginBottom: 16,
                boxSizing: "border-box",
              }}
            />
            {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button
              type="submit"
              disabled={status === "uploading"}
              style={{
                width: "100%", padding: "12px", background: "#7C3AED",
                color: "#fff", border: "none", borderRadius: 8,
                fontSize: 15, cursor: status === "uploading" ? "not-allowed" : "pointer",
                opacity: status === "uploading" ? 0.7 : 1,
              }}
            >
              {status === "uploading" ? "Yüklənir..." : "Yüklə"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function IrisImagePage() {
  return (
    <Suspense>
      <IrisImageUploader />
    </Suspense>
  );
}
