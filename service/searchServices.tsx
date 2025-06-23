import { supabase } from "../utils/supabaseClient";

export default async function searchServices(query: string) {

    const { data: members, error: membersError } = await supabase
        .from('members')
        .select()
        .textSearch('name_title_description', query);

    if (membersError) {
        throw new Error(
            membersError?.message || "Erro na busca"
        );
    }
    
    return members;
}
