import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Save to Supabase
  const { error: dbError } = await supabase
    .from("inquiries")
    .insert({ name, email, message, status: "new" });

  if (dbError) {
    console.error("Supabase insert error:", dbError.message);
  }

  // Send email notification
  const { error: emailError } = await resend.emails.send({
    from: "FlowMinds Contact <onboarding@resend.dev>",
    to: ["talibsoyteyyub@gmail.com"],
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
