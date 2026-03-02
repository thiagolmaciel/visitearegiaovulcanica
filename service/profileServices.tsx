import { getClient, executeQuery } from "./base-client";

/**
 * Profile interface matching the Supabase profiles table
 */
export interface Profile {
  id: string;
  full_name?: string | null;
  phone?: string | null;
  location?: string | null;
  email?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
}

/**
 * Gets a user profile by ID
 * @param id - The profile ID
 * @returns Profile data or null
 */
export async function getProfile(id: string): Promise<Profile | null> {
  if (!id) return null;
  
  const supabase = getClient();
  const result = await executeQuery<Profile>(
    async () => await supabase.from('profiles').select('*').eq('id', id).single(),
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
    async () => await supabase.from('members').select('*').eq('profile_id', id),
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
  