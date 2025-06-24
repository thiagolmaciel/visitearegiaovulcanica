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
  