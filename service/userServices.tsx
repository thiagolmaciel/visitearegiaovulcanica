import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
export async function getUserId(){
const { data: { user }, error } = await supabase.auth.getUser();
if (error) {
    throw error;
}
return user?.id ?? null;
}
