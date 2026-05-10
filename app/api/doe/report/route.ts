import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase";

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
}

async function buildReport(): Promise<NextResponse> {
  const db = getDb();
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86400000).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();

  // IRIS stats — dünən
  const irisSnap = await db.collection("iris_queue").where("created_at", ">=", yesterday).get();
  const irisTotal = irisSnap.size;
  const irisPosted = irisSnap.docs.filter((d) => d.data().posted).length;

  // SCOUT stats — bu həftə
  const leadsSnap = await db.collection("leads").where("created_at", ">=", weekAgo).get();
  const leadsData = leadsSnap.docs.map((d) => d.data());
  const leadsTotal = leadsData.length;
  const leadsHighScore = leadsData.filter((l) => l.score >= 7).length;
  const leadsPending = leadsData.filter((l) => l.status === "pending").length;

  // ARIA stats — cavablanmayan inquiries
  const inquiriesSnap = await db.collection("inquiries").get();
  const inquiriesData = inquiriesSnap.docs.map((d) => d.data());
  const inquiriesNew = inquiriesData.filter((i) => i.status === "new").length;
  const inquiriesTotal = inquiriesData.length;

  const date = now.toLocaleDateString("az-AZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const report = `📊 <b>DOE — Gündəlik Hesabat</b>
📅 ${date}
<b>━━━━━━━━━━━━━━━━━━━━</b>

🌈 <b>IRIS — Sosial Media</b>
• Dünən yaradılan: <b>${irisTotal}</b>
• Paylaşılan: <b>${irisPosted}</b>
• Paylaşılmayan: <b>${irisTotal - irisPosted}</b>

🎯 <b>SCOUT — Lead Agenti</b>
• Bu həftə tapılan: <b>${leadsTotal}</b>
• 7+ skor alan: <b>${leadsHighScore}</b>
• Gözlənilən (pending): <b>${leadsPending}</b>

💬 <b>ARIA — Müştəri Sorğuları</b>
• Cavablanmayan: <b>${inquiriesNew}</b>
• Ümumi sorğu: <b>${inquiriesTotal}</b>

<b>━━━━━━━━━━━━━━━━━━━━</b>
${inquiriesNew > 0 ? `⚠️ <b>${inquiriesNew} cavablanmamış sorğu var!</b>` : "✅ Bütün sorğular cavablanıb."}`;

  await sendTelegram(report);
  return NextResponse.json({ success: true });
}

// Vercel Cron — GET
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return buildReport();
}

// Manual trigger — POST
export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-doe-key");
  if (auth !== process.env.DOE_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return buildReport();
}
