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
        { error: "Acesso negado. Apenas administradores podem remover controle de locais." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { memberId } = body;

    if (!memberId) {
      return NextResponse.json(
        { error: "memberId é obrigatório" },
        { status: 400 }
      );
    }

    // Remover o controle (definir profile_id como null)
    // Nota: Se profile_id não pode ser null, você pode precisar criar um usuário "sistema" ou usar outra abordagem
    const { error: updateError } = await supabase
      .from('members')
      .update({ profile_id: null })
      .eq('id', memberId);

    if (updateError) {
      // Se não permitir null, podemos criar um usuário "sistema" ou usar outra estratégia
      console.error('Erro ao remover controle:', updateError);
      return NextResponse.json(
        { error: updateError.message || "Erro ao remover controle. Verifique se profile_id pode ser null." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Controle removido com sucesso",
    });
  } catch (error: any) {
    console.error('Erro ao remover controle:', error);
    return NextResponse.json(
      { error: error.message || "Erro ao remover controle" },
      { status: 500 }
    );
  }
}

