import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/service/adminServices";

export async function DELETE(request: NextRequest) {
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
        { error: "Acesso negado. Apenas administradores podem excluir eventos." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: "eventId é obrigatório" },
        { status: 400 }
      );
    }

    // Verificar se o evento existe
    const { data: event, error: fetchError } = await supabase
      .from("events")
      .select("id, created_by")
      .eq("id", eventId)
      .single();

    if (fetchError || !event) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    // Excluir o evento
    const { error: deleteError } = await supabase
      .from("events")
      .delete()
      .eq("id", eventId);

    if (deleteError) {
      console.error("Erro ao excluir evento:", deleteError);
      return NextResponse.json(
        { error: "Erro ao excluir evento" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Evento excluído com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao excluir evento:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao excluir evento" },
      { status: 500 }
    );
  }
}




