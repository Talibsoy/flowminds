import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const callback = body.callback_query;
  if (!callback) return NextResponse.json({ ok: true });

  const data = callback.data as string;
  const token = process.env.TELEGRAM_BOT_TOKEN!;

  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callback.id }),
  });

  if (data.startsWith("aria_reply_")) {
    const inquiryId = data.replace("aria_reply_", "");

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: callback.message.chat.id,
        text: "⏳ <b>ARIA cavab yazır...</b>",
        parse_mode: "HTML",
      }),
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/aria/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-aria-key": process.env.ARIA_API_KEY!,
      },
      body: JSON.stringify({ inquiryId }),
    });

    if (!res.ok) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: callback.message.chat.id,
          text: "❌ <b>ARIA xəta verdi. Logları yoxla.</b>",
          parse_mode: "HTML",
        }),
      });
    }
  } else if (data.startsWith("aria_send_")) {
    const inquiryId = data.replace("aria_send_", "");

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/aria/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-aria-key": process.env.ARIA_API_KEY!,
      },
      body: JSON.stringify({ inquiryId }),
    });
  }

  return NextResponse.json({ ok: true });
}
