import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
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
        { error: "Acesso negado. Apenas administradores podem criar usuários." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, password, fullName } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Campos obrigatórios: email, password, fullName" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Usar Admin API para criar usuário (requer service role key)
    // Se não tiver service role key configurada, usar método alternativo
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (serviceRoleKey && supabaseUrl) {
      // Usar Admin API (cria usuário sem confirmação de email)
      const adminClient = createAdminClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      const { data: adminData, error: adminError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Confirmar email automaticamente
        user_metadata: {
          full_name: fullName,
        },
      });

      if (adminError) {
        return NextResponse.json(
          { error: adminError.message },
          { status: 400 }
        );
      }

      if (!adminData.user) {
        return NextResponse.json(
          { error: "Falha ao criar usuário" },
          { status: 500 }
        );
      }

      // Criar perfil na tabela profiles
      const { error: profileError } = await adminClient
        .from('profiles')
        .insert({
          id: adminData.user.id,
          email: email,
          full_name: fullName,
        });

      if (profileError) {
        console.error('Erro ao criar perfil:', profileError);
        // Não retorna erro aqui, pois o usuário já foi criado no auth
      }

      return NextResponse.json({
        success: true,
        user: {
          id: adminData.user.id,
          email: adminData.user.email,
          full_name: fullName,
        },
      });
    } else {
      // Método alternativo: usar signUp normal (requer confirmação de email)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/login`,
        },
      });

      if (signUpError) {
        return NextResponse.json(
          { error: signUpError.message },
          { status: 400 }
        );
      }

      if (!signUpData.user) {
        return NextResponse.json(
          { error: "Falha ao criar usuário" },
          { status: 500 }
        );
      }

      // Criar perfil na tabela profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: signUpData.user.id,
          email: email,
          full_name: fullName,
        });

      if (profileError) {
        console.error('Erro ao criar perfil:', profileError);
      }

      return NextResponse.json({
        success: true,
        user: {
          id: signUpData.user.id,
          email: signUpData.user.email,
          full_name: fullName,
        },
        message: "Usuário criado. Um email de confirmação foi enviado.",
      });
    }
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
