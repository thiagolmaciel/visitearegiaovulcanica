import { createClient } from "@/lib/supabase/client";

export async function getProfile(){
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if(user){
        const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        return profile;
    }
    return null
}