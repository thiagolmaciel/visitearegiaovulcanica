import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/service/adminServices";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getClaims();
    
    if (authError || !authData?.claims) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const adminId = authData.claims.sub;
    const userIsAdmin = await isAdmin(adminId);
    
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem criar eventos." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      start_date,
      end_date,
      location,
      address,
      google_maps_link,
      image_url,
      category,
      status,
      price_info,
      contact_email,
      contact_phone,
      website_url,
      instagram_url,
      facebook_url,
    } = body;

    // Validações
    if (!title || !description || !start_date || !location) {
      return NextResponse.json(
        { error: "Título, descrição, data de início e local são obrigatórios" },
        { status: 400 }
      );
    }

    // Validar data
    const startDate = new Date(start_date);
    if (isNaN(startDate.getTime())) {
      return NextResponse.json(
        { error: "Data de início inválida" },
        { status: 400 }
      );
    }

    // Validar data de término se fornecida
    if (end_date) {
      const endDate = new Date(end_date);
      if (isNaN(endDate.getTime())) {
        return NextResponse.json(
          { error: "Data de término inválida" },
          { status: 400 }
        );
      }
      if (endDate < startDate) {
        return NextResponse.json(
          { error: "Data de término deve ser posterior à data de início" },
          { status: 400 }
        );
      }
    }

    // Criar evento
    const { data: event, error: insertError } = await supabase
      .from("events")
      .insert({
        title,
        description,
        start_date,
        end_date: end_date || null,
        location,
        address: address || null,
        google_maps_link: google_maps_link || null,
        image_url: image_url || null,
        category: category || "geral",
        status: status || "ativo",
        price_info: price_info || null,
        contact_email: contact_email || null,
        contact_phone: contact_phone || null,
        website_url: website_url || null,
        instagram_url: instagram_url || null,
        facebook_url: facebook_url || null,
        created_by: adminId,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Erro ao criar evento:", insertError);
      return NextResponse.json(
        { error: "Erro ao criar evento: " + insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Evento criado com sucesso",
      event,
    });
  } catch (error: any) {
    console.error("Erro ao criar evento:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar evento" },
      { status: 500 }
    );
  }
}




