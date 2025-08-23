import { supabase } from "../utils/supabase/client";

export async function getAllServices(){
    const {data, error} = await supabase
    .from('services')
    .select('*')
    if (!(!data || error)) return data;
}