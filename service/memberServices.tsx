import { Service } from "@/model/Service";
import { simpleToast } from "@/utils/simple-toast";
import { Member } from "@/model/Member";
import { Location } from "@/model/Location";
import { getClient, executeQuery, executeArrayQuery } from "./base-client";
import { logError } from "@/lib/error-handler";


/**
 * Gets a member by ID
 * @param memberId - The member ID
 * @returns The member or null if not found
 */
export async function getMemberByID(memberId: string): Promise<Member | null> {
  const supabase = getClient();
  const result = await executeQuery<Member>(
    async () => await supabase.from('members').select('*').eq('id', memberId).single(),
    'getMemberByID'
  );
  return result.data;
}

/**
 * Updates a member
 * @param member - The member data to update
 * @returns Error if update fails, null on success
 */
export async function updateMember(member: Member) {
  const supabase = getClient();
  const result = await executeQuery(
    async () => await supabase
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
      .eq('id', member.id)
      .select()
      .single(),
    'updateMember'
  );
  return result.error;
}

/**
 * Gets all services for a member
 * @param memberId - The member ID
 * @returns Array of services
 */
export async function getMemberServices(memberId: string): Promise<Service[]> {
  const supabase = getClient();
  
  // Get member service IDs
  const memberServicesResult = await executeArrayQuery<{ service_id: string }>(
    async () => await supabase.from('member_services').select('service_id').eq('member_id', memberId),
    'getMemberServices - member_services'
  );

  if (memberServicesResult.length === 0) {
    return [];
  }

  const serviceIDs = memberServicesResult.map((ms) => ms.service_id);
  
  // Get full service details
  return await executeArrayQuery<Service>(
    async () => await supabase.from('services').select('*').in('id', serviceIDs),
    'getMemberServices - services'
  );
}

/**
 * Gets service icons for a member (optimized version that only fetches icons)
 * @param memberId - The member ID
 * @returns Array of services with icon field only
 */
export async function getMemberServicesIcons(memberId: string): Promise<Pick<Service, 'icon' | 'id'>[]> {
  const supabase = getClient();
  
  // Get member service IDs
  const memberServicesResult = await executeArrayQuery<{ service_id: string }>(
    async () => await supabase.from('member_services').select('service_id').eq('member_id', memberId),
    'getMemberServicesIcons - member_services'
  );

  if (memberServicesResult.length === 0) {
    return [];
  }

  const serviceIDs = memberServicesResult.map((ms) => ms.service_id);
  
  // Get only icon field for performance
  return await executeArrayQuery<Pick<Service, 'icon' | 'id'>>(
    async () => await supabase.from('services').select('icon, id').in('id', serviceIDs),
    'getMemberServicesIcons - services'
  );
}

/**
 * Gets location for a member
 * @param memberID - The member ID
 * @returns Location data or null
 */
export async function getMemberLocation(memberID: string): Promise<Location | null> {
  const supabase = getClient();
  const result = await executeQuery<Location>(
    async () => await supabase.from('locations').select('*').eq('member_id', memberID).single(),
    'getMemberLocation'
  );
  return result.data;
  }

/**
 * Fetches all members
 * @returns Array of all members or null on error
 */
export async function fetchAllMembers(): Promise<Member[]> {
  const supabase = getClient();
  return await executeArrayQuery<Member>(
    async () => await supabase.from('members').select('*'),
    'fetchAllMembers'
  );
}

/**
 * Fetches members by service ID
 * @param serviceId - The service ID
 * @returns Array of members
 */
export async function fetchMembersByServiceId(serviceId: string) {
  const supabase = getClient();
  
  // Get member IDs for this service
  const memberServicesResult = await executeArrayQuery<{ member_id: string }>(
    async () => await supabase.from('member_services').select('member_id').eq('service_id', serviceId),
    'fetchMembersByServiceId - member_services'
  );

  if (memberServicesResult.length === 0) {
    return [];
  }

  const memberIDs = memberServicesResult.map((ms) => ms.member_id);
  
  // Get full member details
  return await executeArrayQuery<Member>(
    async () => await supabase.from('members').select('*').in('id', memberIDs),
    'fetchMembersByServiceId - members'
  );
}

/**
 * Fetches members by city ID
 * @param city_id - The city ID
 * @returns Array of members
 */
export async function fetchMembersByCityId(city_id: string) {
  const supabase = getClient();
  const result = await executeQuery(
    async () => await supabase
    .from("members")
    .select(`
    *,
    locations:location_id (
      id,
      city_id,
      address
    )
  `)
      .eq("locations.city_id", city_id),
    'fetchMembersByCityId'
  );

  if (!result.data) {
    return [];
  }

  // Filter to ensure city_id matches (Supabase join may return extra results)
  return result.data.filter((member: any) => member.locations?.city_id === city_id);
}

/**
 * Fetches members by state ID
 * @param state_id - The state ID
 * @returns Array of members
 */
export async function fetchMembersByStateId(state_id: string) {
  const supabase = getClient();
  const result = await executeQuery(
    async () => await supabase
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
      .eq("locations.cities.states.id", state_id),
    'fetchMembersByStateId'
  );

  if (!result.data) {
    return [];
  }

  interface MemberWithState {
    locations?: {
      cities?: {
        states?: { id: string };
      };
    };
    [key: string]: unknown;
  }
  return result.data.filter((member: MemberWithState) => member.locations?.cities?.states?.id === state_id);
}

/**
 * Fetches members by city name
 * @param name - The city name
 * @returns Array of members or null
 */
export async function fetchMembersByCityName(name: string) {
  const city = await getCityIdByName(name);
  if (!city) return null;
  return await fetchMembersByCityId(city.id);
}

/**
 * Fetches members by state name
 * @param name - The state name
 * @returns Array of members or null
 */
export async function fetchMembersByStateName(name: string) {
  const state = await getStateIdByName(name);
  if (!state) return null;
  return await fetchMembersByStateId(state.id);
}

/**
 * Gets city ID by name
 * @param name - The city name
 * @returns City data with ID or null
 */
export async function getCityIdByName(name: string): Promise<{ id: string } | null> {
  const supabase = getClient();
  const result = await executeQuery<{ id: string }>(
    async () => await supabase.from('cities').select('id').ilike('name', name).single(),
    'getCityIdByName'
  );
  return result.data;
}

/**
 * Gets state ID by name
 * @param name - The state name
 * @returns State data with ID or null
 */
export async function getStateIdByName(name: string): Promise<{ id: string } | null> {
  const supabase = getClient();
  const result = await executeQuery<{ id: string }>(
    async () => await supabase.from('states').select('id').ilike('name', name).single(),
    'getStateIdByName'
  );
  return result.data;
}



/**
 * Fetches members by partial query (searches name and description)
 * @param query - The search query
 * @returns Array of matching members
 */
export async function fetchMembersByPartialQuery(query: string) {
  const supabase = getClient();
  return await executeArrayQuery<Member>(
    async () => await supabase
    .from("members")
    .select("*")
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`),
    'fetchMembersByPartialQuery'
  );
}

/**
 * Deletes a member and their associated images
 * @param member_id - The member ID to delete
 * @throws Error if deletion fails
 */
export async function deleteMemberById(member_id: string) {
  const supabase = getClient();
  
  // Delete member record
  const deleteResult = await executeQuery(
    async () => await supabase.from('members').delete().eq('id', member_id).select().single(),
    'deleteMemberById - member'
  );

  if (deleteResult.error) {
    simpleToast('Erro ao deletar local!', 'error');
    throw deleteResult.error;
  }
  
  // Delete associated images from storage
  const { error: storageError } = await supabase
    .storage
    .from('members')
    .remove([`images/${member_id}`]);

  if (storageError) {
    logError('deleteMemberById - storage', storageError, { member_id });
    simpleToast('Erro ao deletar fotos do local!', 'error');
    throw storageError;
  }
  
  simpleToast('Sucesso ao deletar local!', 'success');
}

/**
 * Fetches member name by ID
 * @param member_id - The member ID
 * @returns Member name or null
 */
export async function fetchMemberNameByID(member_id: string) {
  const supabase = getClient();
  const result = await executeQuery<{ name: string }>(
    async () => await supabase.from('members').select("name").eq('id', member_id).single(),
    'fetchMemberNameByID'
  );
  return result.data?.name || null;
}

/**
 * Creates a new member
 * @param member - The member data to create
 * @returns The created member
 * @throws Error if creation fails
 */
export async function createMember(member: Member) {
  const supabase = getClient();
  const result = await executeQuery<Member>(
    async () => await supabase.from('members').insert(member).select().single(),
    'createMember'
  );

  if (result.error || !result.data) {
    throw result.error || new Error('Falha ao criar membro');
  }

  return result.data;
}
