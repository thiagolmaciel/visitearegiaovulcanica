import { supabase } from "../utils/supabaseClient";

export async function getAllServices(){
    const {data, error} = await supabase
    .from('services')
    .select('*')
    if (!(!data || error)) return data;
}