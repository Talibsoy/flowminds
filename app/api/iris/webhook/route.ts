import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/iris-poster";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const callbackQuery = body.callback_query;

  if (!callbackQuery) return NextResponse.json({ ok: true });

  const data = callbackQuery.data as string;
  const chatId = callbackQuery.message.chat.id;

  // Answer callback query (removes loading spinner)
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQuery.id }),
  });

  if (data.startsWith("iris_post_")) {
    const contentKey = data.replace("iris_post_", "");

    await sendTelegramMessage("⏳ <b>Iris is posting to all platforms...</b>");

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/iris/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-iris-key": process.env.IRIS_API_KEY!,
      },
      body: JSON.stringify({ contentKey }),
    });

    if (!res.ok) {
      await sendTelegramMessage("❌ <b>Error posting. Check logs.</b>");
    }
  } else if (data === "iris_regenerate") {
    await sendTelegramMessage("🔄 <b>Regenerating content...</b>");

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/iris/generate`, {
      method: "POST",
      headers: { "x-iris-key": process.env.IRIS_API_KEY! },
    });
  } else if (data === "iris_skip") {
    await sendTelegramMessage(`⏭️ <b>Iris skipped today.</b>\nSee you tomorrow! 🌈`);
  }

  return NextResponse.json({ ok: true });
}
