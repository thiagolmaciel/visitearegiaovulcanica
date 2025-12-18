import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
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
        { error: "Acesso negado. Apenas administradores podem atualizar usuários." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, email, fullName } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId é obrigatório" },
        { status: 400 }
      );
    }

    if (!email && !fullName) {
      return NextResponse.json(
        { error: "Pelo menos um campo (email ou fullName) deve ser fornecido" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey || !supabaseUrl) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY não configurada. Configure a variável de ambiente para atualizar emails." },
        { status: 500 }
      );
    }

    // Criar cliente Admin para atualizar Auth e profiles
    const adminClient = createAdminClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Atualizar email no Auth se fornecido
    if (email) {
      const { data: updateAuthData, error: updateAuthError } = await adminClient.auth.admin.updateUserById(
        userId,
        {
          email: email,
          email_confirm: true, // Confirmar email automaticamente
        }
      );

      if (updateAuthError) {
        return NextResponse.json(
          { error: `Erro ao atualizar email no Auth: ${updateAuthError.message}` },
          { status: 400 }
        );
      }
    }

    // Atualizar perfil na tabela profiles (apenas full_name, email está em auth.users)
    if (fullName !== undefined) {
      const { error: profileError } = await adminClient
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', userId);

      if (profileError) {
        console.error('Erro ao atualizar perfil:', profileError);
        return NextResponse.json(
          { error: `Erro ao atualizar perfil: ${profileError.message}` },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Usuário atualizado com sucesso",
    });
  } catch (error: any) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json(
      { error: error.message || "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

