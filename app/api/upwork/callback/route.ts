import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;background:#0A0A0F;color:#F8F8FF;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
        <div style="text-align:center">
          <h2 style="color:#ef4444">❌ Upwork Auth Failed</h2>
          <p>${error || "No code received"}</p>
        </div>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const clientId = process.env.UPWORK_CLIENT_ID!;
  const clientSecret = process.env.UPWORK_CLIENT_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_URL}/api/upwork/callback`;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenRes = await fetch("https://www.upwork.com/api/v3/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return new NextResponse(
      `<html><body style="font-family:sans-serif;background:#0A0A0F;color:#F8F8FF;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
        <div style="text-align:center">
          <h2 style="color:#ef4444">❌ Token Exchange Failed</h2>
          <pre style="color:#8B8B9A;font-size:12px">${text}</pre>
        </div>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const tokenData = await tokenRes.json();
  const { access_token, refresh_token, expires_in } = tokenData;

  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  const db = getDb();
  await db.collection("upwork_tokens").doc("main").set({
    access_token,
    refresh_token,
    expires_at: expiresAt,
    updated_at: new Date().toISOString(),
  });

  return new NextResponse(
    `<html><body style="font-family:sans-serif;background:#0A0A0F;color:#F8F8FF;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
      <div style="text-align:center">
        <h2 style="color:#A855F7">✅ Scout Connected!</h2>
        <p style="color:#8B8B9A">Upwork hesabın qoşuldu. Scout artıq avtomatik lead tapacaq.</p>
        <a href="/" style="color:#06B6D4">← FlowMinds-ə qayıt</a>
      </div>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
