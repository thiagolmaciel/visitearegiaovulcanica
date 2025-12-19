"use client"

import { createClient } from "@/lib/supabase/client";
import { Event } from "@/model/Event";

/**
 * Busca um evento por ID (versão cliente)
 */
export async function getEventByIdClient(id: string): Promise<Event | null> {
  const supabase = createClient();
  
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




