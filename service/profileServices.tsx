import { getClient, executeQuery } from "./base-client";

/**
 * Gets a user profile by ID
 * @param id - The profile ID
 * @returns Profile data or null
 */
export async function getProfile(id: string){
  if (!id) return null;
  
  const supabase = getClient();
  const result = await executeQuery(
    () => supabase.from('profiles').select('*').eq('id', id).single(),
    'getProfile'
  );
  return result.data;
}

/**
 * Gets all members for a profile ID
 * @param id - The profile ID
 * @returns Array of members
 */
export async function getMembersByProfileID(id: string) {
  if (!id) return [];
  
  const supabase = getClient();
  const { executeArrayQuery } = await import("./base-client");
  return await executeArrayQuery(
    () => supabase.from('members').select('*').eq('profile_id', id),
    'getMembersByProfileID'
  );
}

/**
 * Gets user avatar URL
 * @param authId - The user authentication ID
 * @returns Avatar URL or default avatar
 */
export async function getUserAvatar(authId: string) {
    if (!authId) return '/avatar.jpg';
    
  const supabase = getClient();
    const { data } = await supabase.storage
        .from('avatars')
        .getPublicUrl(`${authId}/avatar.jpg`);
    
    return data?.publicUrl || '/avatar.jpg';
}
  