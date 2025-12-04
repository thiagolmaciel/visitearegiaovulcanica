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

    const userId = authData.claims.sub;
    const userIsAdmin = await isAdmin(userId);
    
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem transferir locais." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { memberId, newUserId } = body;

    if (!memberId || !newUserId) {
      return NextResponse.json(
        { error: "memberId e newUserId são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se o novo usuário existe
    const { data: newUser, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', newUserId)
      .single();

    if (userError || !newUser) {
      return NextResponse.json(
        { error: "Usuário de destino não encontrado" },
        { status: 404 }
      );
    }

    // Transferir o local (atualizar profile_id)
    const { error: updateError } = await supabase
      .from('members')
      .update({ profile_id: newUserId })
      .eq('id', memberId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Local transferido com sucesso",
    });
  } catch (error: any) {
    console.error('Erro ao transferir local:', error);
    return NextResponse.json(
      { error: error.message || "Erro ao transferir local" },
      { status: 500 }
    );
  }
}

