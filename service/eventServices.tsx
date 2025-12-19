import { createClient } from "@/lib/supabase/server";
import { Event } from "@/model/Event";

/**
 * Busca todos os eventos ativos, ordenados por data de início
 * Inclui eventos que já começaram mas ainda não terminaram
 */
export async function getActiveEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const now = new Date().toISOString();
  
  // Busca todos os eventos ativos e filtra no código
  // para incluir eventos que já começaram mas ainda não terminaram
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "ativo")
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }

  if (!data) return [];

  // Filtra eventos que:
  // 1. Ainda não começaram (start_date >= now), OU
  // 2. Já começaram mas ainda não terminaram (start_date <= now AND (end_date IS NULL OR end_date >= now))
  return data.filter(event => {
    const startDate = new Date(event.start_date);
    const endDate = event.end_date ? new Date(event.end_date) : null;
    const nowDate = new Date(now);
    
    // Se ainda não começou
    if (startDate >= nowDate) {
      return true;
    }
    
    // Se já começou, verifica se ainda não terminou
    if (startDate <= nowDate) {
      if (!endDate || endDate >= nowDate) {
        return true;
      }
    }
    
    return false;
  });
}

/**
 * Busca todos os eventos (ativos e finalizados)
 */
export async function getAllEvents(): Promise<Event[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .in("status", ["ativo", "finalizado"])
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }

  return data || [];
}

/**
 * Busca eventos por categoria
 */
export async function getEventsByCategory(category: string): Promise<Event[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("category", category)
    .eq("status", "ativo")
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Erro ao buscar eventos por categoria:", error);
    return [];
  }

  return data || [];
}

/**
 * Busca um evento por ID
 */
export async function getEventById(id: string): Promise<Event | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erro ao buscar evento:", error);
    return null;
  }

  return data;
}

/**
 * Busca eventos próximos (próximos 30 dias)
 */
export async function getUpcomingEvents(days: number = 30): Promise<Event[]> {
  const supabase = await createClient();
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + days);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "ativo")
    .gte("start_date", now.toISOString())
    .lte("start_date", futureDate.toISOString())
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Erro ao buscar eventos próximos:", error);
    return [];
  }

  return data || [];
}


