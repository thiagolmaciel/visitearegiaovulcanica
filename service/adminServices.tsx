import { getServerClient, executeArrayQuery, executeQuery } from "./base";
import { logError } from "@/lib/error-handler";

/**
 * Check if the current user is an admin
 * 
 * Checks user metadata in Supabase Auth (raw_user_meta_data.is_admin)
 * Use the SQL functions in supabase_admin_functions.sql to grant/revoke admin status
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = await getServerClient();
  
  try {
    // Get user with full metadata
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      logError('isAdmin', error, { userId });
      return false;
    }
    
    // Check if user ID matches (security check)
    if (user.id !== userId) {
      return false;
    }
    
    // Check user metadata for is_admin
    // user_metadata is the processed version of raw_user_meta_data
    const isAdminStatus = user.user_metadata?.is_admin === true || 
                         user.user_metadata?.is_admin === 'true';
    
    return isAdminStatus;
  } catch (error) {
    logError('isAdmin - exception', error, { userId });
    return false;
  }
}

/**
 * Get all users/profiles
 */
export async function getAllUsers() {
  const supabase = await getServerClient();
  return await executeArrayQuery(
    () => supabase.from('profiles').select('*').order('updated_at', { ascending: false }),
    'getAllUsers'
  );
}

/**
 * Get all members/locations
 */
export async function getAllMembers() {
  const supabase = await getServerClient();
  return await executeArrayQuery(
    () => supabase.from('members').select('*').order('created_at', { ascending: false }),
    'getAllMembers'
  );
}

/**
 * Get dashboard statistics
 */
export async function getAdminStats() {
  const supabase = await getServerClient();
  
  // Get total users
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });
  
  // Get total members
  const { count: totalMembers } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true });
  
  // Get recent users (last 7 days) - using updated_at since created_at doesn't exist
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { count: recentUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('updated_at', sevenDaysAgo.toISOString());
  
  // Get recent members (last 7 days)
  const { count: recentMembers } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString());
  
  return {
    totalUsers: totalUsers || 0,
    totalMembers: totalMembers || 0,
    recentUsers: recentUsers || 0,
    recentMembers: recentMembers || 0,
  };
}

/**
 * Get historical growth data for charts (last 30 days)
 */
export async function getGrowthData() {
  const supabase = await getServerClient();
  
  const data: { date: string; users: number; members: number }[] = [];
  const today = new Date();
  
  // Get data for last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Count users created/updated up to this date
    const { count: usersCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .lte('updated_at', nextDay.toISOString());
    
    // Count members created up to this date
    const { count: membersCount } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true })
      .lte('created_at', nextDay.toISOString());
    
    data.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      users: usersCount || 0,
      members: membersCount || 0,
    });
  }
  
  return data;
}


