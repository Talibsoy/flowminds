import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/firebase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  let inquiryId: string | null = null;

  try {
    const db = getDb();
    const docRef = await db.collection("inquiries").add({
      name,
      email,
      message,
      status: "new",
      created_at: new Date().toISOString(),
    });
    inquiryId = docRef.id;
  } catch (err) {
    console.error("Firestore insert failed:", err);
  }

  // ARIA — Telegram-a bildiriş göndər
  if (inquiryId) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      const msg = `💬 <b>ARIA — Yeni Müştəri Sorğusu</b>
<b>━━━━━━━━━━━━━━━━━</b>
<b>Ad:</b> ${name}
<b>Email:</b> ${email}
<b>Mesaj:</b>
<i>${message.substring(0, 300)}${message.length > 300 ? "..." : ""}</i>`;

      const keyboard = {
        inline_keyboard: [
          [{ text: "🤖 AI ilə cavabla", callback_data: `aria_reply_${inquiryId}` }],
        ],
      };

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: msg,
          parse_mode: "HTML",
          reply_markup: keyboard,
        }),
      });
    }
  }

  // Send email notification
  const { error: emailError } = await resend.emails.send({
    from: "FlowMinds Contact <yourminds@flowminds.tech>",
    to: ["flowminds.tech@gmail.com"],
    replyTo: email,
    subject: `New inquiry from ${name} — FlowMinds`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0F; color: #F8F8FF; padding: 32px; border-radius: 12px; border: 1px solid #1E1E2E;">
        <h2 style="color: #A855F7; margin: 0 0 24px;">New Project Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #8B8B9A; width: 100px;">Name</td>
            <td style="padding: 8px 0; color: #F8F8FF; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8B8B9A;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #06B6D4;">${email}</a></td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #13131A; border-radius: 8px; border: 1px solid #1E1E2E;">
          <p style="color: #8B8B9A; font-size: 12px; margin: 0 0 8px;">Message</p>
          <p style="color: #F8F8FF; line-height: 1.6; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
        </div>
        <p style="margin-top: 24px; color: #8B8B9A; font-size: 12px;">
          Sent via flowminds.tech —
          <a href="https://flowminds.tech/admin" style="color: #7C3AED;">View in Admin Panel</a>
        </p>
      </div>
    `,
  });

  if (emailError) {
    console.error("Resend error:", emailError.message);
  }

  return NextResponse.json({ success: true });
}
