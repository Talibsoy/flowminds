import { createClient } from "@supabase/supabase-js";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
};

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
