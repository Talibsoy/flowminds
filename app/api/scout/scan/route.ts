import { NextRequest, NextResponse } from "next/server";
import { fetchUpworkLeads, qualifyAndPropose } from "@/lib/scout-rss";
import { getSupabase } from "@/lib/supabase";

async function sendTelegram(text: string, keyboard?: object): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };
  if (keyboard) body.reply_markup = keyboard;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.ok;
}

// Vercel Cron calls GET
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return runScan();
}

// Manual trigger calls POST
export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-scout-key");
  if (auth !== process.env.SCOUT_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return runScan();
}

async function runScan() {
  const supabase = getSupabase();
  let found = 0;
  let sent = 0;

  try {
    const leads = await fetchUpworkLeads();

    for (const lead of leads) {
      // Skip already seen
      const { data: existing } = await supabase
        .from("leads")
        .select("id")
        .eq("url", lead.url)
        .single();

      if (existing) continue;

      const scored = await qualifyAndPropose(lead);
      if (!scored) continue;

      found++;

      // Save to Supabase regardless of score
      await supabase.from("leads").insert({
        title: scored.title,
        url: scored.url,
        budget: scored.budget,
        description: scored.description,
        score: scored.score,
        proposal: scored.proposal,
        status: scored.score >= 7 ? "pending" : "low_score",
      });

      // Send to Telegram only if score >= 7
      if (scored.score >= 7) {
        const msg = `<b>SCOUT — New Lead Found</b>
<b>━━━━━━━━━━━━━━━━━</b>

<b>Title:</b> ${scored.title}
<b>Budget:</b> ${scored.budget}
<b>Score:</b> ${scored.score}/10

<b>Copy this proposal:</b>
<code>${scored.proposal}</code>`;

        const keyboard = {
          inline_keyboard: [
            [
              { text: "Apply on Upwork", url: scored.url },
              { text: "Skip", callback_data: `scout_skip_${scored.id}` },
            ],
          ],
        };

        await sendTelegram(msg, keyboard);
        sent++;

        // Small delay between messages
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    if (sent === 0 && found === 0) {
      // Silent — no new leads this scan
    }

    return NextResponse.json({ success: true, found, sent });
  } catch (error) {
    console.error("Scout scan error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
