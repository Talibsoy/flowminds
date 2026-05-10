import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDb } from "@/lib/firebase";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const TOKEN = () => process.env.TELEGRAM_BOT_TOKEN!;
const ALLOWED_CHAT = () => process.env.TELEGRAM_CHAT_ID!;

async function sendMessage(chatId: number | string, text: string, keyboard?: object) {
  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };
  if (keyboard) body.reply_markup = keyboard;

  await fetch(`https://api.telegram.org/bot${TOKEN()}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function answerCallback(callbackId: string) {
  await fetch(`https://api.telegram.org/bot${TOKEN()}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackId }),
  });
}

// Upwork URL slug-dan başlıq çıxar
function titleFromUrl(url: string): string {
  try {
    const match = url.match(/\/jobs\/([^_~?/]+)/);
    if (!match) return "Upwork Job";
    return match[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  } catch {
    return "Upwork Job";
  }
}

const FLOWMINDS_CONTEXT = `FlowMinds is an AI digital agency:
- AI Web Development, AI Agents (WhatsApp, Instagram, Messenger bots)
- SaaS Development, Social Media Automation
- Meta Solutions, No-Code Automation (Zapier, Make, n8n)
- WhatsApp Business API, Digital Strategy
Portfolio: natoure.az, promptazmusic.com`;

// ARIA ilə Upwork proposal yarat
async function generateProposal(title: string, description: string, budget: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(
    `You are ARIA, FlowMinds' AI sales agent. Write a winning Upwork cover letter.

${FLOWMINDS_CONTEXT}

Job:
Title: ${title}
Budget: ${budget}
Description: ${description}

Write a 150-200 word cover letter that:
- Starts with a strong hook (reference their specific problem)
- Shows we understand their needs
- Mentions 1-2 relevant FlowMinds capabilities
- Includes a specific question to start conversation
- Ends with clear CTA

Do NOT start with "I" or "We are FlowMinds". Sound human and confident.
Return ONLY the cover letter text.`
  );
  return result.response.text();
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // ── Callback query handler ─────────────────────────────────
  if (body.callback_query) {
    const callback = body.callback_query;
    const data = callback.data as string;
    const chatId = callback.message.chat.id;

    await answerCallback(callback.id);

    // Scout: lead skip
    if (data.startsWith("scout_skip_")) {
      const leadId = data.replace("scout_skip_", "");
      const db = getDb();
      await db.collection("leads").doc(leadId).update({ status: "rejected" });
      await sendMessage(chatId, "❌ Lead skip edildi.");
    }

    // ARIA: inquiry reply generate
    if (data.startsWith("aria_reply_")) {
      const inquiryId = data.replace("aria_reply_", "");
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/aria/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-aria-key": process.env.ARIA_API_KEY! },
        body: JSON.stringify({ inquiryId }),
      });
    }

    // ARIA: send email
    if (data.startsWith("aria_send_")) {
      const inquiryId = data.replace("aria_send_", "");
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/aria/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-aria-key": process.env.ARIA_API_KEY! },
        body: JSON.stringify({ inquiryId }),
      });
    }

    // IRIS: post content
    if (data.startsWith("iris_post_")) {
      const contentKey = data.replace("iris_post_", "");
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/iris/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-iris-key": process.env.IRIS_API_KEY! },
        body: JSON.stringify({ contentKey }),
      });
    }

    return NextResponse.json({ ok: true });
  }

  // ── Message handler ────────────────────────────────────────
  if (body.message) {
    const msg = body.message;
    const chatId = msg.chat.id;
    const text: string = msg.text || "";

    // Yalnız authorized chat-dan gələn mesajları qəbul et
    if (String(chatId) !== String(ALLOWED_CHAT())) {
      return NextResponse.json({ ok: true });
    }

    // Upwork URL gəldi → ARIA proposal yaz
    if (text.includes("upwork.com/jobs/") || text.includes("upwork.com/freelance-jobs/")) {
      const jobUrl = text.trim();
      const title = titleFromUrl(jobUrl);

      await sendMessage(chatId, "✍️ ARIA proposal yazır...");

      try {
        const proposal = await generateProposal(title, "No description — write a strong general proposal based on the job title.", "Not specified");

        await sendMessage(
          chatId,
          `🤖 ARIA — Upwork Proposal\n━━━━━━━━━━━━━━━━━\n${title}\n━━━━━━━━━━━━━━━━━\n\n${proposal}\n\n━━━━━━━━━━━━━━━━━\nJob tesvirini gondersen daha deqiq proposal yazaram.`,
          { inline_keyboard: [[{ text: "Upwork-da ac", url: jobUrl }]] }
        );

        try {
          const db = getDb();
          await db.collection("leads").add({
            title, url: jobUrl, budget: "Not specified", description: "",
            score: 8, proposal, status: "pending",
            source: "telegram_manual", created_at: new Date().toISOString(),
          });
        } catch { /* Firestore xətası proposal-ı bloklamasın */ }
      } catch (err) {
        await sendMessage(chatId, `Xeta: ${String(err).substring(0, 200)}`);
      }

      return NextResponse.json({ ok: true });
    }

    // Sərbəst mətn gəldi → ARIA proposal yaz (job təsviri kimi qəbul et)
    if (text.length > 50 && !text.startsWith("/")) {
      await sendMessage(chatId, "✍️ ARIA proposal yazır...");

      try {
        const proposal = await generateProposal("Upwork Job", text, "Not specified");
        await sendMessage(chatId, `🤖 ARIA — Proposal\n━━━━━━━━━━━━━━━━━\n\n${proposal}\n\n━━━━━━━━━━━━━━━━━\nKopyala ve yapishdir.`);
      } catch (err) {
        await sendMessage(chatId, `Xeta: ${String(err).substring(0, 200)}`);
      }

      return NextResponse.json({ ok: true });
    }

    // /start və ya /help
    if (text === "/start" || text === "/help") {
      await sendMessage(
        chatId,
        `👋 <b>FlowMinds AI Bot</b>

<b>Nə edə bilərəm:</b>
• Upwork URL göndər → ARIA proposal yazar
• Job təsvirini yazıb göndər → proposal alarsan
• SCOUT avtomatik hər gün lead tapır
• ARIA müştəri sorğularına cavab verir

<b>Agentlər:</b>
🌈 IRIS — Sosial media
🎯 SCOUT — Lead tapma
💬 ARIA — Müştəri cavabları
📊 DOE — Gündəlik hesabat`
      );
    }
  }

  return NextResponse.json({ ok: true });
}
