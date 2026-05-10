import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/firebase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-aria-key");
  if (auth !== process.env.ARIA_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { inquiryId } = await req.json();
  const db = getDb();

  const doc = await db.collection("inquiries").doc(inquiryId).get();
  if (!doc.exists) return NextResponse.json({ error: "Inquiry or reply not found" }, { status: 404 });
  const inquiry = { id: doc.id, ...doc.data() } as Record<string, string>;
  if (!inquiry.ai_reply) return NextResponse.json({ error: "Inquiry or reply not found" }, { status: 404 });

  const { error: emailError } = await resend.emails.send({
    from: "FlowMinds Team <yourminds@flowminds.tech>",
    to: [inquiry.email],
    replyTo: "yourminds@flowminds.tech",
    subject: `Re: Your inquiry — FlowMinds`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #333;">
        <img src="https://flowminds.tech/logo.png" alt="FlowMinds" style="height:32px;margin-bottom:24px" />
        <div style="line-height: 1.7; white-space: pre-line;">${inquiry.ai_reply.replace(/\n/g, "<br>")}</div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #888; font-size: 13px; margin: 0;">
          FlowMinds — AI Digital Agency<br>
          <a href="https://flowminds.tech" style="color: #7C3AED;">flowminds.tech</a>
        </p>
      </div>
    `,
  });

  if (emailError) {
    return NextResponse.json({ error: emailError.message }, { status: 500 });
  }

  await db.collection("inquiries").doc(inquiryId).update({ status: "replied" });

  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `✅ <b>ARIA — Email Göndərildi!</b>\n📧 ${inquiry.name} (${inquiry.email}) cavablandı.`,
      parse_mode: "HTML",
    }),
  });

  return NextResponse.json({ success: true });
}
