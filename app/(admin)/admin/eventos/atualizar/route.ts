import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/service/adminServices";

export async function PUT(request: NextRequest) {
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
        { error: "Acesso negado. Apenas administradores podem atualizar eventos." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      eventId,
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

    if (!eventId) {
      return NextResponse.json(
        { error: "eventId é obrigatório" },
        { status: 400 }
      );
    }

    // Verificar se o evento existe
    const { data: existingEvent, error: fetchError } = await supabase
      .from("events")
      .select("id, start_date, end_date")
      .eq("id", eventId)
      .single();

    if (fetchError || !existingEvent) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    // Validar datas se fornecidas
    if (start_date) {
      const startDate = new Date(start_date);
      if (isNaN(startDate.getTime())) {
        return NextResponse.json(
          { error: "Data de início inválida" },
          { status: 400 }
        );
      }
    }

    if (end_date) {
      const endDate = new Date(end_date);
      if (isNaN(endDate.getTime())) {
        return NextResponse.json(
          { error: "Data de término inválida" },
          { status: 400 }
        );
      }
      const startDate = start_date ? new Date(start_date) : new Date(existingEvent.start_date);
      if (endDate < startDate) {
        return NextResponse.json(
          { error: "Data de término deve ser posterior à data de início" },
          { status: 400 }
        );
      }
    }

    // Preparar dados para atualização (apenas campos fornecidos)
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (start_date !== undefined) updateData.start_date = start_date;
    if (end_date !== undefined) updateData.end_date = end_date || null;
    if (location !== undefined) updateData.location = location;
    if (address !== undefined) updateData.address = address || null;
    if (google_maps_link !== undefined) updateData.google_maps_link = google_maps_link || null;
    if (image_url !== undefined) updateData.image_url = image_url || null;
    if (category !== undefined) updateData.category = category;
    if (status !== undefined) updateData.status = status;
    if (price_info !== undefined) updateData.price_info = price_info || null;
    if (contact_email !== undefined) updateData.contact_email = contact_email || null;
    if (contact_phone !== undefined) updateData.contact_phone = contact_phone || null;
    if (website_url !== undefined) updateData.website_url = website_url || null;
    if (instagram_url !== undefined) updateData.instagram_url = instagram_url || null;
    if (facebook_url !== undefined) updateData.facebook_url = facebook_url || null;

    // Atualizar evento
    const { data: event, error: updateError } = await supabase
      .from("events")
      .update(updateData)
      .eq("id", eventId)
      .select()
      .single();

    if (updateError) {
      console.error("Erro ao atualizar evento:", updateError);
      return NextResponse.json(
        { error: "Erro ao atualizar evento: " + updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Evento atualizado com sucesso",
      event,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar evento:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao atualizar evento" },
      { status: 500 }
    );
  }
}




