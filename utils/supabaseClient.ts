import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_PUBLIC_ANON_KEY;

export const supabase = createClient(supabaseUrl!, anonKey!);