import { GoogleGenerativeAI } from "@google/generative-ai";

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

const SEARCH_QUERIES = [
  "whatsapp bot automation",
  "ai web development",
  "chatbot development",
  "social media automation",
  "no code automation n8n",
  "saas development",
];

const APIFY_TOKEN = () => process.env.APIFY_API_KEY!;
const ACTOR = "flash_mage~upwork";

const FLOWMINDS_CONTEXT = `
FlowMinds is an AI digital agency offering:
- AI Web Development (custom AI-powered websites)
- AI Agent Development (WhatsApp, Messenger, Instagram bots)
- SaaS Development (subscription platforms)
- Social Media Automation (scheduling, auto-reply)
- Meta Solutions (Instagram, Facebook, WhatsApp integrations)
- No-Code Automation (Zapier, Make, n8n)
- WhatsApp Business API (chatbots, broadcasts)
- Digital Strategy (growth hacking, funnels)
Team: Expert developers with real production systems (natoure.az, promptazmusic.com)
`;

function parseJob(job: Record<string, unknown>): Lead | null {
  const title = (job.title as string) || "";
  const url = (job.link as string) || "";
  if (!title || !url) return null;

  const opening = (job.data as Record<string, unknown>)?.opening as Record<string, unknown> | undefined;
  const info = opening?.info as Record<string, unknown> | undefined;

  const postedOn = (opening?.postedOn as string) || new Date().toISOString();
  const description = ((opening?.description as string) || "").substring(0, 500);

  // Budget
  const jobType = (info?.type as string) || "";
  const hourlyMin = (info?.hourlyBudgetMin as number) || 0;
  const hourlyMax = (info?.hourlyBudgetMax as number) || 0;
  const fixedAmount = (info?.amount as number) || (info?.budget as Record<string, unknown>)?.amount as number || 0;

  let budget = "Not specified";
  if (jobType === "HOURLY" && hourlyMin > 0) {
    budget = `$${hourlyMin}-$${hourlyMax}/hr`;
  } else if (fixedAmount > 0) {
    budget = `$${fixedAmount} (fixed)`;
  }

  const id = (info?.id as string) || Buffer.from(url).toString("base64").substring(0, 16);

  return { id, title, url, budget, description, publishedAt: postedOn };
}

export async function fetchUpworkLeads(): Promise<Lead[]> {
  const token = APIFY_TOKEN();
  if (!token) throw new Error("APIFY_API_KEY yoxdur.");

  const leads: Lead[] = [];
  const seenUrls = new Set<string>();

  for (const query of SEARCH_QUERIES) {
    try {
      const res = await fetch(
        `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${token}&memory=256&timeout=90`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ searchQuery: query, maxResults: 10 }),
        }
      );

      if (!res.ok) continue;
      const items = await res.json();
      if (!Array.isArray(items)) continue;

      for (const item of items) {
        const lead = parseJob(item as Record<string, unknown>);
        if (!lead || seenUrls.has(lead.url)) continue;
        seenUrls.add(lead.url);

        const hoursOld = (Date.now() - new Date(lead.publishedAt).getTime()) / 3600000;
        if (hoursOld > 24) continue;

        leads.push(lead);
      }
    } catch {
      continue;
    }
  }

  return leads;
}

export async function qualifyAndPropose(lead: Lead): Promise<ScoredLead | null> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are Scout, FlowMinds' lead qualification agent.

${FLOWMINDS_CONTEXT}

Analyze this Upwork job posting:
TITLE: ${lead.title}
BUDGET: ${lead.budget}
DESCRIPTION: ${lead.description}

Return JSON:
{
  "score": <1-10>,
  "reason": "<one sentence>",
  "proposal": "<150-200 word personalized English proposal. Strong hook. References their needs. Mentions FlowMinds experience. Clear CTA. Do NOT start with 'I am' or 'We are'.>"
}

Score:
- 8-10: Perfect match, clear requirements
- 6-7: Good match, vague budget
- 1-5: Poor match

Return ONLY valid JSON.`;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    if (!parsed.score || !parsed.proposal) return null;

    return { ...lead, score: parsed.score, proposal: parsed.proposal };
  } catch {
    return null;
  }
}
