import { supabase } from "../utils/supabaseClient";

// Optional: Define the expected shape of a service
export type Service = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  icon:string;
};

export async function getMemberServices(memberId: number): Promise<Service[]> {
  const { data: member_services, error: member_services_Error } = await supabase
    .from('member_services')
    .select('services_id')
    .eq('member_id', memberId);

  if (member_services_Error || !member_services) {
    console.error('Erro ao buscar member_services: ', member_services_Error);
    return [];
  }

  const serviceIDs = member_services.map((ms) => ms.services_id);
  if (serviceIDs.length === 0) {
    return [];
  }

  const { data: services, error: services_Error } = await supabase
    .from('services')
    .select('*')
    .in('id', serviceIDs);

  if (services_Error || !services) {
    console.error('Erro ao buscar services: ', services_Error);
    return [];
  }

  return services as Service[];
}

export async function getMemberLocation(memberID: number) {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('member_id', memberID)
    .single();

  if (error || !data) {
    console.error('Erro ao buscar localização:', error?.message);
    return null;
  }

  return data;
}