import { getClient, executeArrayQuery } from "./base-client";
import { Service } from "@/model/Service";

/**
 * Gets all services
 * @returns Array of all services
 */
export async function getAllServices(): Promise<Service[]> {
  const supabase = getClient();
  return await executeArrayQuery<Service>(
    () => supabase.from('services').select('*'),
    'getAllServices'
  );
}

/**
 * Updates member services (replaces all existing services)
 * @param memberId - The member ID
 * @param services - Array of service IDs
 * @throws Error if update fails
 */
export async function updateMemberServices(memberId: string | undefined, services: string[]){
  if (!memberId) {
    throw new Error('Member ID is required');
  }

  const supabase = getClient();
  
  // Delete existing services
  const deleteResult = await executeArrayQuery(
    () => supabase.from('member_services').delete().eq('member_id', memberId).select(),
    'updateMemberServices - delete'
  );
    
    if (services.length === 0) {
        return;
    }

  // Insert new services
  const insertResult = await executeArrayQuery(
    () => supabase.from('member_services').insert(services.map(id => ({ member_id: memberId, service_id: id }))).select(),
    'updateMemberServices - insert'
  );
}

/**
 * Creates member services (adds new services without deleting existing ones)
 * @param memberId - The member ID
 * @param services - Array of service IDs
 * @throws Error if creation fails
 */
export async function createMemberServices(memberId: string, services: string[]){
  const supabase = getClient();
  await executeArrayQuery(
    () => supabase.from('member_services').insert(services.map(id => ({ member_id: memberId, service_id: id }))).select(),
    'createMemberServices'
  );
}