import { getClient, executeQuery, executeArrayQuery } from "./base-client";

/**
 * Gets city information by member ID
 * @param id - The member ID
 * @returns City data or null
 */
export async function getCityByID(id: string){
  const supabase = getClient();
  
  // Get location with city_id
  const locationResult = await executeQuery<{ city_id: string }>(
    () => supabase.from('locations').select('city_id').eq('member_id', id).single(),
    'getCityByID - location'
  );

  if (!locationResult.data) {
    return null;
    }

  const cityId = locationResult.data.city_id;
  
  // Get city details
  const cityResult = await executeQuery(
    () => supabase.from('cities').select('*').eq('id', cityId).single(),
    'getCityByID - city'
  );
  
  return cityResult.data;
}
  
/**
 * Gets all city names
 * @returns Array of city names
 */
  export async function getAllCities() {
  const supabase = getClient();
  const data = await executeArrayQuery<{ name: string }>(
    () => supabase.from('cities').select('name'),
    'getAllCities'
  );
    return data.map(city => city.name);
  }
  
/**
 * Gets all state names (lowercased)
 * @returns Array of state names in lowercase
 */
  export async function getAllStates() {
  const supabase = getClient();
  const data = await executeArrayQuery<{ name: string }>(
    () => supabase.from('states').select('name'),
    'getAllStates'
  );
    return data.map(state => state.name.toLowerCase());
  }

/**
 * Checks if a query matches a city name
 * @param query - The search query
 * @returns True if query matches a city
 */
  export async function isCity(query: string) {
  const supabase = getClient();
  const data = await executeArrayQuery<{ name: string }>(
    () => supabase.from("cities").select("name").ilike("name", query),
    'isCity'
  );
  return data.length > 0;
}

/**
 * Checks if a query matches a state name
 * @param query - The search query
 * @returns True if query matches a state
 */
  export async function isState(query: string) {
  const supabase = getClient();
  const data = await executeArrayQuery<{ name: string }>(
    () => supabase.from("states").select("name").ilike("name", query),
    'isState'
  );
  return data.length > 0;
  }