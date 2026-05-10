import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getDb } from "@/lib/firebase";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-aria-key");
  if (auth !== process.env.ARIA_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { inquiryId } = await req.json();
  const db = getDb();

  const doc = await db.collection("inquiries").doc(inquiryId).get();
  if (!doc.exists) return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  const inquiry = { id: doc.id, ...doc.data() } as Record<string, string>;

  const prompt = `You are ARIA, FlowMinds' AI Sales Agent. Write a warm, professional email reply to this client inquiry.

FlowMinds is an AI digital agency offering:
- AI Web Development, AI Agents (WhatsApp, Instagram, Messenger bots)
- SaaS Development, Social Media Automation
- Meta Solutions, No-Code Automation (Zapier, Make, n8n)
- WhatsApp Business API, Digital Strategy

Client Details:
Name: ${inquiry.name}
Email: ${inquiry.email}
Message: ${inquiry.message}

Write a personalized email reply (100-150 words) that:
- Greets them by name
- Acknowledges their specific request
- Briefly mentions how FlowMinds can help
- Asks 1-2 clarifying questions to move forward
- Ends with a clear next step (call/meeting suggestion)

Do NOT start with "I am ARIA" or "I am an AI". Sound like a real human team member.
Return ONLY the email body text, no subject line, no extra formatting.`;

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  const reply = msg.content[0].type === "text" ? msg.content[0].text : "";

  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;

  const previewMsg = `💬 <b>ARIA — Cavab Təklifi</b>
<b>Müştəri:</b> ${inquiry.name} (${inquiry.email})
<b>━━━━━━━━━━━━━━━━━</b>

<i>${reply}</i>

<b>━━━━━━━━━━━━━━━━━</b>`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "✅ Göndər", callback_data: `aria_send_${inquiryId}` },
      ],
    ],
  };

  await db.collection("inquiries").doc(inquiryId).update({ ai_reply: reply });

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: previewMsg,
      parse_mode: "HTML",
      reply_markup: keyboard,
    }),
  });

  return NextResponse.json({ success: true });
}
