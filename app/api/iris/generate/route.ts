import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildIrisPrompt, getTodayService } from "@/lib/iris-content";
import { sendTelegramMessage } from "@/lib/iris-poster";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Vercel Cron calls GET
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return handleGenerate();
}

// Manual trigger calls POST
export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-iris-key");
  if (auth !== process.env.IRIS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return handleGenerate();
}

async function handleGenerate() {

  const service = getTodayService();
  const prompt = buildIrisPrompt(service);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const response = await model.generateContent(prompt);
    const raw = response.response.text();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in Gemini response");

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
        [
          { text: "📷 Şəkil yüklə", url: `${process.env.NEXT_PUBLIC_URL}/admin/iris-image?key=${contentKey}` },
          { text: "❌ Skip Today", callback_data: "iris_skip" },
        ],
      ],
    };

    await sendTelegramMessage(preview, keyboard);

    const { getDb } = await import("@/lib/firebase");
    const db = getDb();
    await db.collection("iris_queue").add({
      key: contentKey,
      service,
      content: JSON.stringify(content),
      created_at: new Date().toISOString(),
      posted: false,
      image_url: null,
    });

    return NextResponse.json({ success: true, service, contentKey });
  } catch (error) {
    console.error("Iris generate error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
