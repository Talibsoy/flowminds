import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const callback = body.callback_query;
  if (!callback) return NextResponse.json({ ok: true });

  const data = callback.data as string;
  const token = process.env.TELEGRAM_BOT_TOKEN;

  // Answer callback
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callback.id }),
  });

  if (data.startsWith("scout_skip_")) {
    const leadId = data.replace("scout_skip_", "");
    const db = getDb();
    await db.collection("leads").doc(leadId).update({ status: "rejected" });

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: callback.message.chat.id,
        text: "Lead skipped.",
        parse_mode: "HTML",
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
