export async function postToInstagram(caption: string, hashtags: string): Promise<{ success: boolean; id?: string; error?: string }> {
  const token = process.env.META_ACCESS_TOKEN;
  const userId = process.env.META_IG_USER_ID;

  if (!token || !userId) return { success: false, error: "Instagram credentials missing" };

  const fullCaption = `${caption}\n\n${hashtags}`;

  try {
    // Step 1: Create media container
    const createRes = await fetch(
      `https://graph.facebook.com/v19.0/${userId}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption: fullCaption,
          image_url: "https://flowminds.tech/og-iris.jpg",
          access_token: token,
        }),
      }
    );
    const createData = await createRes.json();
    if (!createData.id) return { success: false, error: createData.error?.message };

    // Step 2: Publish
    const publishRes = await fetch(
      `https://graph.facebook.com/v19.0/${userId}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creation_id: createData.id, access_token: token }),
      }
    );
    const publishData = await publishRes.json();
    return publishData.id
      ? { success: true, id: publishData.id }
      : { success: false, error: publishData.error?.message };
  } catch (e: unknown) {
    return { success: false, error: String(e) };
  }
}

export async function postToFacebook(message: string): Promise<{ success: boolean; id?: string; error?: string }> {
  const token = process.env.META_ACCESS_TOKEN;
  const pageId = process.env.META_FB_PAGE_ID;

  if (!token || !pageId) return { success: false, error: "Facebook credentials missing" };

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, access_token: token }),
    });
    const data = await res.json();
    return data.id ? { success: true, id: data.id } : { success: false, error: data.error?.message };
  } catch (e: unknown) {
    return { success: false, error: String(e) };
  }
}

export async function postToLinkedIn(text: string): Promise<{ success: boolean; id?: string; error?: string }> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const authorId = process.env.LINKEDIN_AUTHOR_ID;

  if (!token || !authorId) return { success: false, error: "LinkedIn credentials missing" };

  try {
    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: `urn:li:person:${authorId}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text },
            shareMediaCategory: "NONE",
          },
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
      }),
    });
    const data = await res.json();
    return data.id ? { success: true, id: data.id } : { success: false, error: JSON.stringify(data) };
  } catch (e: unknown) {
    return { success: false, error: String(e) };
  }
}

export async function sendTelegramMessage(text: string, keyboard?: object): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return false;

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  };
  if (keyboard) body.reply_markup = keyboard;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.ok;
}
