import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
};

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase env vars not configured");
    _client = createClient(url, key);
  }
  return _client;
}
