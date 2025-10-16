import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getAllServices(){
    const {data, error} = await supabase
    .from('services')
    .select('*')
    if (!(!data || error)) return data;
}

export async function updateMemberServices(memberId: string | undefined, services: string[]){
   const {error} = await supabase
    .from('member_services')
    .delete()
    .eq('member_id', memberId)

    if (error) {
        console.error("Erro ao deletar serviços do membro:", error);
        throw error;
    }
    
    if (services.length === 0) {
        return;
    }

    const { error: insertError } = await supabase
        .from('member_services')
        .insert(services.map(id => ({ member_id: memberId, service_id: id })));

    console.log(services)
    if (insertError) {
        console.error("Erro ao adicionar serviços ao membro:", insertError);
        throw insertError;
    }
}

export async function createMemberServices(memberId: string, services: string[]){
    const {error} = await supabase
    .from('member_services')
    .insert(services.map(id => ({ member_id: memberId, service_id: id })));
    if (error) {
        console.error("Erro ao adicionar serviços ao membro:", error);
        throw error;
    }
}