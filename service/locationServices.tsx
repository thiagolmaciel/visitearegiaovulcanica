import { supabase } from "../utils/supabaseClient";

export async function getCityByID(id: number){
    const { data: locationData, error: locationError } = await supabase
      .from('locations')
      .select('city_id')
      .eq('member_id', id)
      .single();
  
    if (!locationData || locationError) return null;
  
    const cityId = locationData.city_id; 
  
    const { data: cityData, error: cityError } = await supabase
      .from('cities')
      .select('*')
      .eq('id', cityId) 
      .single();
  
    if (!cityData || cityError) return null;
  
    return cityData;
  }
  
  export async function getAllCities() {
    const { data, error } = await supabase.from('cities').select('name');
    if (error) throw new Error(error.message);
    return data.map(city => city.name.toLowerCase());
  }
  
  export async function getAllStates() {
    const { data, error } = await supabase.from('states').select('name');
    if (error) throw new Error(error.message);
    return data.map(state => state.name.toLowerCase());
  }

  export async function isCity(query: string) {
    const { data, error } = await supabase
      .from("cities")
      .select("name")
      .ilike("name", query);
  
    if (error) {
      console.error("Supabase error in isCity:", error);
      return false;
    }
  
    const found = data && data.length > 0;
  
    if (found) {
      console.log("IsCity: " + data[0].name);
    } else {
      console.log("IsCity: not found");
    }
  
    return found;
  }
  
  
  export async function isState(query: string) {
    const { data, error } = await supabase
    .from("states")
    .select("name")
    .ilike("name", query);

  if (error) {
    console.error("Supabase error in isState:", error);
    return false;
  }

  const found = data && data.length > 0;

  return found;
  }