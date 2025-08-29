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

export async function getMembersByProfileID(id: string) {
    if (!id) return []
    const supabase = createClient()
    const {data: members, error} = await supabase
    .from('members')
    .select('*')
    .eq('profile_id', id)
    if(error){
        console.error('Erro ao buscar');
        return [];
    }
    return members || [];
  }
  