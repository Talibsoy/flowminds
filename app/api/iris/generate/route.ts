import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildIrisPrompt, getTodayService } from "@/lib/iris-content";
import { sendTelegramMessage } from "@/lib/iris-poster";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  // Simple API key check
  const auth = req.headers.get("x-iris-key");
  if (auth !== process.env.IRIS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const service = getTodayService();
  const prompt = buildIrisPrompt(service);

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in Claude response");

    const content = JSON.parse(jsonMatch[0]);

    // Store in env temporarily via a simple key for webhook to use
    const contentKey = Date.now().toString();

    // Send Telegram preview
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const preview = `🌈 <b>IRIS — Daily Content Preview</b>
📅 ${today} | Focus: <b>${service}</b>

📸 <b>INSTAGRAM</b>
<i>${content.instagram.caption.substring(0, 200)}...</i>
Story 1: ${content.instagram.story1}
Story 2: ${content.instagram.story2}
${content.instagram.hashtags}

💼 <b>LINKEDIN</b>
<i>${content.linkedin.post.substring(0, 200)}...</i>

📘 <b>FACEBOOK</b>
<i>${content.facebook.post.substring(0, 150)}...</i>

🎵 <b>TIKTOK HOOK</b>
<i>${content.tiktok.hook}</i>

<code>Key: ${contentKey}</code>`;

    const keyboard = {
      inline_keyboard: [
        [
          { text: "✅ Post All", callback_data: `iris_post_${contentKey}` },
          { text: "🔄 Regenerate", callback_data: "iris_regenerate" },
        ],
        [{ text: "❌ Skip Today", callback_data: "iris_skip" }],
      ],
    };

    await sendTelegramMessage(preview, keyboard);

    // Save content to Supabase for webhook retrieval
    const { getSupabase } = await import("@/lib/supabase");
    const supabase = getSupabase();
    await supabase.from("iris_queue").insert({
      key: contentKey,
      service,
      content: JSON.stringify(content),
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, service, contentKey });
  } catch (error) {
    console.error("Iris generate error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
