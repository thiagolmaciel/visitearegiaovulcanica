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

    const userId = authData.claims.sub;
    const userIsAdmin = await isAdmin(userId);
    
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem excluir usuários." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userToDeleteId = searchParams.get('id');

    if (!userToDeleteId) {
      return NextResponse.json(
        { error: "ID do usuário é obrigatório" },
        { status: 400 }
      );
    }

    // Não permitir que o admin exclua a si mesmo
    if (userToDeleteId === userId) {
      return NextResponse.json(
        { error: "Você não pode excluir sua própria conta" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (serviceRoleKey && supabaseUrl) {
      // Usar Admin API para deletar usuário
      const adminClient = createAdminClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      // Deletar perfil primeiro (se existir)
      const { error: profileError } = await adminClient
        .from('profiles')
        .delete()
        .eq('id', userToDeleteId);

      if (profileError) {
        console.error('Erro ao deletar perfil:', profileError);
        // Continua mesmo se o perfil não existir
      }

      // Deletar usuário do Auth
      const { error: deleteError } = await adminClient.auth.admin.deleteUser(
        userToDeleteId
      );

      if (deleteError) {
        return NextResponse.json(
          { error: deleteError.message },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Usuário excluído com sucesso",
      });
    } else {
      // Método alternativo: deletar apenas o perfil
      // (não é possível deletar usuário do Auth sem Admin API)
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userToDeleteId);

      if (profileError) {
        return NextResponse.json(
          { error: profileError.message },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Perfil excluído. Configure SUPABASE_SERVICE_ROLE_KEY para excluir completamente do Auth.",
      });
    }
  } catch (error: any) {
    console.error('Erro ao excluir usuário:', error);
    return NextResponse.json(
      { error: error.message || "Erro ao excluir usuário" },
      { status: 500 }
    );
  }
}

