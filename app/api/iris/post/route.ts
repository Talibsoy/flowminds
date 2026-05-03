import { NextRequest, NextResponse } from "next/server";
import { postToInstagram, postToFacebook, postToLinkedIn, sendTelegramMessage } from "@/lib/iris-poster";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-iris-key");
  if (auth !== process.env.IRIS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { contentKey } = await req.json();

  // Fetch content from Supabase
  const supabase = getSupabase();
  const { data } = await supabase
    .from("iris_queue")
    .select("*")
    .eq("key", contentKey)
    .single();

  if (!data) return NextResponse.json({ error: "Content not found" }, { status: 404 });

  const content = JSON.parse(data.content);
  const results: Record<string, unknown> = {};

  // Post to Instagram
  results.instagram = await postToInstagram(content.instagram.caption, content.instagram.hashtags);

  // Post to Facebook
  results.facebook = await postToFacebook(content.facebook.post);

  // Post to LinkedIn
  results.linkedin = await postToLinkedIn(content.linkedin.post);

  // TikTok — send script to Telegram (manual post)
  await sendTelegramMessage(
    `🎵 <b>TIKTOK — Manual Post</b>\n\n<b>Hook (first 3s):</b>\n${content.tiktok.hook}\n\n<b>Script:</b>\n${content.tiktok.script}\n\n<b>Caption:</b>\n${content.tiktok.caption}`
  );

  // Summary to Telegram
  const summary = `✅ <b>IRIS Posted!</b>\n\n` +
    `📸 Instagram: ${results.instagram && (results.instagram as Record<string, unknown>).success ? "✅" : "❌"}\n` +
    `📘 Facebook: ${results.facebook && (results.facebook as Record<string, unknown>).success ? "✅" : "❌"}\n` +
    `💼 LinkedIn: ${results.linkedin && (results.linkedin as Record<string, unknown>).success ? "✅" : "❌"}\n` +
    `🎵 TikTok: 📋 Script sent — post manually`;

  await sendTelegramMessage(summary);

  // Mark as posted
  await supabase.from("iris_queue").update({ posted: true }).eq("key", contentKey);

  return NextResponse.json({ success: true, results });
}
