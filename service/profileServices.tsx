import { createClient } from "@/lib/supabase/client";

export async function getProfile(id: string){
    const supabase = createClient()
    if(id){
        const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
        return profile;
    }
    return null
}