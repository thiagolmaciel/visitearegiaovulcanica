import { createClient } from "@/lib/supabase/server";

/**
 * Get maintenance mode status
 */
export async function getMaintenanceMode(): Promise<boolean> {
  const supabase = await createClient();
  
  try {
    // Tentar buscar do banco
    const { data: settings } = await supabase
      .from('system_settings')
      .select('*')
      .eq('key', 'main')
      .single();

    if (settings?.value?.maintenanceMode) {
      return true;
    }

    return false;
  } catch (error) {
    // Se a tabela não existir, retornar false
    return false;
  }
}

