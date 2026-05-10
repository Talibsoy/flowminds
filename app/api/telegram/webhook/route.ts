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
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
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

    // ── /sent [url] — proposal göndərildi, status yenilə ──────
    if (text.startsWith("/sent")) {
      const url = text.replace("/sent", "").trim();
      if (!url) {
        await sendMessage(chatId, "İstifade: /sent [upwork_url]");
        return NextResponse.json({ ok: true });
      }
      try {
        const db = getDb();
        const snap = await db.collection("leads").where("url", "==", url).limit(1).get();
        if (snap.empty) {
          await sendMessage(chatId, "⚠️ Bu URL-ə aid lead tapılmadı.");
          return NextResponse.json({ ok: true });
        }
        await snap.docs[0].ref.update({ status: "sent", sent_at: new Date().toISOString() });
        const title = snap.docs[0].data().title;
        await sendMessage(chatId, `✅ <b>${title}</b>\nStatus: <b>Göndərildi</b> — müştəri cavabını gözlə.\n\nMüştəri cavab verəndə mesajını bura at, ARIA follow-up yazar.`);
      } catch (err) {
        await sendMessage(chatId, `Xeta: ${String(err).substring(0, 150)}`);
      }
      return NextResponse.json({ ok: true });
    }

    // ── /won [url] — müqavilə qazanıldı ──────────────────────
    if (text.startsWith("/won")) {
      const url = text.replace("/won", "").trim();
      try {
        const db = getDb();
        const snap = await db.collection("leads").where("url", "==", url).limit(1).get();
        if (!snap.empty) {
          await snap.docs[0].ref.update({ status: "won", won_at: new Date().toISOString() });
          const title = snap.docs[0].data().title;
          await sendMessage(chatId, `🏆 <b>Təbrik!</b>\n<b>${title}</b>\nMüqavilə qazanıldı! DOE hesabatına əlavə edildi.`);
        } else {
          await sendMessage(chatId, "⚠️ Lead tapılmadı. URL düzgündür?");
        }
      } catch (err) {
        await sendMessage(chatId, `Xeta: ${String(err).substring(0, 150)}`);
      }
      return NextResponse.json({ ok: true });
    }

    // ── /lost [url] — lead itdi ───────────────────────────────
    if (text.startsWith("/lost")) {
      const url = text.replace("/lost", "").trim();
      try {
        const db = getDb();
        const snap = await db.collection("leads").where("url", "==", url).limit(1).get();
        if (!snap.empty) {
          await snap.docs[0].ref.update({ status: "lost", lost_at: new Date().toISOString() });
          const title = snap.docs[0].data().title;
          await sendMessage(chatId, `📝 <b>${title}</b> — Lost kimi qeyd edildi.`);
        } else {
          await sendMessage(chatId, "⚠️ Lead tapılmadı.");
        }
      } catch (err) {
        await sendMessage(chatId, `Xeta: ${String(err).substring(0, 150)}`);
      }
      return NextResponse.json({ ok: true });
    }

    // ── /leads — aktiv lead-ləri göstər ──────────────────────
    if (text === "/leads") {
      try {
        const db = getDb();
        const snap = await db.collection("leads")
          .where("status", "in", ["pending", "sent", "replied", "meeting"])
          .orderBy("created_at", "desc")
          .limit(10)
          .get();

        if (snap.empty) {
          await sendMessage(chatId, "Aktiv lead yoxdur.");
          return NextResponse.json({ ok: true });
        }

        const statusEmoji: Record<string, string> = {
          pending: "⏳", sent: "📤", replied: "💬", meeting: "📅", won: "🏆", lost: "❌"
        };

        const lines = snap.docs.map((d) => {
          const l = d.data();
          return `${statusEmoji[l.status] ?? "•"} <b>${l.title}</b>\nStatus: ${l.status} | Score: ${l.score}/10`;
        }).join("\n\n");

        await sendMessage(chatId, `📋 <b>Aktiv Lead-lər</b>\n━━━━━━━━━━━━━━━━━\n\n${lines}`);
      } catch (err) {
        await sendMessage(chatId, `Xeta: ${String(err).substring(0, 150)}`);
      }
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

    // ── Müştəri mesajı (follow-up) ───────────────────────────
    // Format: müştəri mesajını sadəcə at, ARIA follow-up yazır
    if (text.length > 30 && !text.startsWith("/")) {
      await sendMessage(chatId, "💬 ARIA follow-up yazır...");

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(
          `You are ARIA, FlowMinds' AI sales agent. Write a professional follow-up reply to this client message on Upwork.

${FLOWMINDS_CONTEXT}

Client message: "${text}"

Write a 80-120 word reply that:
- Directly addresses their message
- Moves the conversation forward (toward a call or project start)
- Sounds natural and confident, not salesy
- If they ask about price/timeline, give a range and suggest a quick call to clarify

Return ONLY the reply text.`
        );
        const reply = result.response.text();

        await sendMessage(
          chatId,
          `💬 <b>ARIA — Follow-up Cavabı</b>\n━━━━━━━━━━━━━━━━━\n\n${reply}\n\n━━━━━━━━━━━━━━━━━\nKopyala və Upwork-da göndər.`
        );
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

<b>Komandalar:</b>
• Upwork URL → proposal yazar
• Müştəri mesajını at → follow-up yazar
• /sent [url] → proposal göndərildi
• /won [url] → müqavilə qazanıldı 🏆
• /lost [url] → lead itdi
• /leads → aktiv leadlər

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
