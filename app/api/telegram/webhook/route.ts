import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getDb } from "@/lib/firebase";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

// Upwork URL-dən job məlumatını çək
async function fetchUpworkJob(url: string): Promise<{ title: string; description: string; budget: string } | null> {
  try {
    const token = process.env.APIFY_API_KEY!;
    const res = await fetch(
      `https://api.apify.com/v2/acts/flash_mage~upwork/run-sync-get-dataset-items?token=${token}&memory=256&timeout=60`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, maxResults: 1 }),
      }
    );
    if (!res.ok) return null;
    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) return null;

    const job = items[0] as Record<string, unknown>;
    const opening = (job.data as Record<string, unknown>)?.opening as Record<string, unknown> | undefined;
    const info = opening?.info as Record<string, unknown> | undefined;

    const title = (job.title as string) || "Upwork Job";
    const description = ((opening?.description as string) || "").substring(0, 600);

    const jobType = (info?.type as string) || "";
    const hourlyMin = (info?.hourlyBudgetMin as number) || 0;
    const hourlyMax = (info?.hourlyBudgetMax as number) || 0;
    const fixedAmount = (info?.amount as number) || 0;

    let budget = "Not specified";
    if (jobType === "HOURLY" && hourlyMin > 0) budget = `$${hourlyMin}-$${hourlyMax}/hr`;
    else if (fixedAmount > 0) budget = `$${fixedAmount} (fixed)`;

    return { title, description, budget };
  } catch {
    return null;
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
  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 600,
    messages: [{
      role: "user",
      content: `You are ARIA, FlowMinds' AI sales agent. Write a winning Upwork cover letter.

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
Return ONLY the cover letter text.`,
    }],
  });

  return msg.content[0].type === "text" ? msg.content[0].text : "";
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
      await sendMessage(chatId, "🔍 Job məlumatları çəkilir, ARIA proposal yazır...");

      const job = await fetchUpworkJob(text.trim());

      if (!job) {
        // URL-dən çəkə bilmədik, sadəcə proposal istə
        await sendMessage(chatId, "⚠️ Job məlumatı tapılmadı. Job təsvirini birbaşa göndər.");
        return NextResponse.json({ ok: true });
      }

      const proposal = await generateProposal(job.title, job.description, job.budget);

      await sendMessage(
        chatId,
        `🤖 <b>ARIA — Upwork Proposal</b>
<b>━━━━━━━━━━━━━━━━━</b>
📌 <b>${job.title}</b>
💰 ${job.budget}
<b>━━━━━━━━━━━━━━━━━</b>

<code>${proposal}</code>

<b>━━━━━━━━━━━━━━━━━</b>
💡 Kopyala və Upwork-da yapışdır.`,
        {
          inline_keyboard: [[
            { text: "🔗 Upwork-da aç", url: text.trim() },
            { text: "🔄 Yenidən yaz", callback_data: `repropo_${Buffer.from(text.trim()).toString("base64").substring(0, 40)}` },
          ]],
        }
      );

      // Firestore-a saxla
      const db = getDb();
      await db.collection("leads").add({
        title: job.title,
        url: text.trim(),
        budget: job.budget,
        description: job.description,
        score: 8,
        proposal,
        status: "pending",
        source: "telegram_manual",
        created_at: new Date().toISOString(),
      });

      return NextResponse.json({ ok: true });
    }

    // Sərbəst mətn gəldi → ARIA proposal yaz (job təsviri kimi qəbul et)
    if (text.length > 50 && !text.startsWith("/")) {
      await sendMessage(chatId, "✍️ ARIA proposal yazır...");

      const proposal = await generateProposal("Upwork Job", text, "Not specified");

      await sendMessage(
        chatId,
        `🤖 <b>ARIA — Proposal</b>
<b>━━━━━━━━━━━━━━━━━</b>

<code>${proposal}</code>

<b>━━━━━━━━━━━━━━━━━</b>
💡 Kopyala və yapışdır.`
      );

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
