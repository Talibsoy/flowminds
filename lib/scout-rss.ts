import Anthropic from "@anthropic-ai/sdk";

export type Lead = {
  id: string;
  title: string;
  url: string;
  budget: string;
  description: string;
  publishedAt: string;
};

export type ScoredLead = Lead & {
  score: number;
  proposal: string;
};

const RSS_FEEDS = [
  "whatsapp+bot+automation",
  "ai+web+development",
  "no+code+automation+zapier",
  "social+media+automation",
  "meta+facebook+automation",
  "chatbot+development",
  "n8n+make+automation",
  "saas+development",
];

const FLOWMINDS_CONTEXT = `
FlowMinds is an AI digital agency offering:
- AI Web Development (custom AI-powered websites)
- AI Agent Development (WhatsApp, Messenger, Instagram bots)
- SaaS Development (subscription platforms)
- Social Media Automation (scheduling, auto-reply)
- Meta Solutions (Instagram, Facebook, WhatsApp integrations)
- Long-Term API Keys (permanent IG/FB/WA tokens)
- Code Automation (custom scripts, API pipelines)
- No-Code Automation (Zapier, Make, n8n)
- WhatsApp Business API (chatbots, broadcasts)
- Digital Strategy (growth hacking, funnels)
Team: Expert developers with real production systems (natoure.az, promptazmusic.com)
`;

export async function fetchUpworkLeads(): Promise<Lead[]> {
  const leads: Lead[] = [];
  const seenUrls = new Set<string>();

  for (const keyword of RSS_FEEDS) {
    try {
      const url = `https://www.upwork.com/ab/feed/jobs/rss?q=${keyword}&sort=recency&paging=0%3B10`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; FlowMinds/1.0)" },
      });

      if (!res.ok) continue;

      const xml = await res.text();
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

      for (const item of items.slice(0, 5)) {
        const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]?.trim() ||
                      item.match(/<title>(.*?)<\/title>/)?.[1]?.trim() || "";
        const link = item.match(/<link>(.*?)<\/link>/)?.[1]?.trim() ||
                     item.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1]?.trim() || "";
        const desc = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1]
                       ?.replace(/<[^>]*>/g, "")?.trim().substring(0, 500) || "";
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim() || "";

        // Extract budget from description
        const budgetMatch = desc.match(/Budget:\s*([^\n<]+)/i) ||
                            desc.match(/\$[\d,]+/);
        const budget = budgetMatch?.[1]?.trim() || budgetMatch?.[0] || "Not specified";

        if (!title || !link || seenUrls.has(link)) continue;
        seenUrls.add(link);

        // Only include recent (last 4 hours)
        const publishedAt = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();
        const hoursOld = (Date.now() - new Date(publishedAt).getTime()) / 3600000;
        if (hoursOld > 4) continue;

        leads.push({
          id: Buffer.from(link).toString("base64").substring(0, 16),
          title,
          url: link,
          budget,
          description: desc,
          publishedAt,
        });
      }
    } catch {
      // Continue on error for individual feeds
    }
  }

  return leads;
}

export async function qualifyAndPropose(lead: Lead): Promise<ScoredLead | null> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are Scout, FlowMinds' lead qualification agent.

${FLOWMINDS_CONTEXT}

Analyze this Upwork job posting:
TITLE: ${lead.title}
BUDGET: ${lead.budget}
DESCRIPTION: ${lead.description}

Return a JSON object with:
{
  "score": <1-10, how well this matches FlowMinds services>,
  "reason": "<one sentence why>",
  "proposal": "<150-200 word personalized English proposal that sounds human, references their specific needs, mentions relevant FlowMinds work. Start with a strong hook, NOT 'I am' or 'We are'. End with a clear CTA.>"
}

Score criteria:
- 8-10: Perfect match, good budget, clear requirements
- 6-7: Good match but unclear budget or vague requirements
- 1-5: Poor match or too small/irrelevant

Return ONLY valid JSON, no other text.`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = msg.content[0].type === "text" ? msg.content[0].text : "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const result = JSON.parse(jsonMatch[0]);
    if (!result.score || !result.proposal) return null;

    return { ...lead, score: result.score, proposal: result.proposal };
  } catch {
    return null;
  }
}
