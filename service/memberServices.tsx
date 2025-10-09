import { Service } from "@/model/Service";
import { createClient } from "@/lib/supabase/client";
import { simpleToast } from "@/utils/simple-toast";
import { Member } from "@/model/Member";

const supabase = createClient();


export async function getMemberByID(memberId: string){
  const { data: member, error: member_Error } = await supabase
  .from('members')
  .select('*')
  .eq('id', memberId)
  .single();

  if (member_Error || !member) {
    console.error('Erro ao buscar membro: ', member_Error);
    return null;
  }
  return member
}

export async function updateMember(member: Member){
  console.log(member)
  const { error } = await supabase
  .from('members')
  .update({
    name: member.name,
    description: member.description,
    email: member.email,
    whatsapp: member.whatsapp,
    phone: member.phone,
    instagram: member.instagram,
    facebook: member.facebook,
    website: member.website,
    slug: member.slug,
    location_id: member.location_id,
    image: member.image
  })
  .eq('id', member.id);
  if (error) {
    return error
  }
}

export async function getMemberServices(memberId: string): Promise<Service[]> {
  const { data: member_services, error: member_services_Error } = await supabase
    .from('member_services')
    .select('service_id')
    .eq('member_id', memberId);

  if (member_services_Error || !member_services) {
    console.error('Erro ao buscar member_services: ', member_services_Error);
    return [];
  }

  const serviceIDs = member_services.map((ms) => ms.service_id);
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

export async function getMemberServicesIcons(memberId: string): Promise<Service[]> {
  const { data: member_services, error: member_services_Error } = await supabase
    .from('member_services')
    .select('service_id')
    .eq('member_id', memberId);
   
  if (member_services_Error || !member_services) {
    console.error('Erro ao buscar member_services: ', member_services_Error);
    return [];
  }

  const serviceIDs = member_services.map((ms) => ms.service_id);
  if (serviceIDs.length === 0) {
    return [];
  }

  const { data: services, error: services_Error } = await supabase
    .from('services')
    .select('icon')
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

export async function fetchAllMembers() {
  const { data: members, error } = await supabase.from('members').select('*');
  if (!members || error) return null
  return members
}

export async function fetchMembersByCityId(city_id: string) {
  const { data, error } = await supabase
    .from("members")
    .select(`
    *,
    locations:location_id (
      id,
      city_id,
      address
    )
  `)
    .eq("locations.city_id", city_id);

  if (error) {
    console.error("Erro ao buscar membros:", error);
    return [];
  }

  const filteredMembers = data.filter(member => member.locations?.city_id === city_id);

  return filteredMembers;
}

export async function fetchMembersByStateId(state_id: string) {
  const { data, error } = await supabase
    .from("members")
    .select(`
    *,
    locations:location_id (
      id,
      city_id,
      address,
      cities:city_id (
        id,
        name,
        states:state_id (
          id,
          name
        )
      )
    )
  `)
    .eq("locations.cities.states.id", state_id);

  if (error) {
    console.error("Erro ao buscar membros:", error);
    return [];
  }
  const filteredMembers = data.filter(member => member.locations?.cities?.states?.id === state_id);
  return filteredMembers;
}

export async function fetchMembersByCityName(name: string) {
  const city = await getCityIdByName(name);
  if (!city) return null
  console.log('City.id = ' + city.id)
  const data = await fetchMembersByCityId(city.id);
  if (!data) return null
  return data;
}

export async function fetchMembersByStateName(name: string) {
  const state = await getStateIdByName(name);
  if (!state) return null
  const data = await fetchMembersByStateId(state.id);
  if (!data) return null
  return data;
}

export async function getCityIdByName(name: string) {
  console.log(name)
  const { data, error } = await supabase
    .from('cities')
    .select('id')
    .ilike('name', name)
    .single()
  console.log(data)
  if (!data || error) return null
  return data
}

export async function getStateIdByName(name: string) {
  console.log(name)
  const { data, error } = await supabase
    .from('states')
    .select('id')
    .ilike('name', name)
    .single()
  console.log(data)
  if (!data || error) return null
  return data
}



export async function fetchMembersByPartialQuery(query: string) {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

  if (error) {
    console.error("Erro ao buscar membros por query parcial:", error);
    return [];
  }

  return data || [];
}

export async function deleteMemberById(member_id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('members')
    .delete()
    .eq('id', member_id)
  if (error) {
    simpleToast('Erro ao deletar local!', 'error')
  }
  console.log(member_id)
  simpleToast('Sucesso ao deletar local!', 'success')
}

export async function fetchMemberNameByID(member_id: string){
  var name = ""
  const supabase = createClient();
  const { data, error } = await supabase
    .from('members')
    .select("name")
    .eq('id', member_id)
  if (error) {
    throw error
  }
  return name;
}