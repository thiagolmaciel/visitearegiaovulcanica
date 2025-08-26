import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getAllServices(){
    const {data, error} = await supabase
    .from('services')
    .select('*')
    if (!(!data || error)) return data;
}