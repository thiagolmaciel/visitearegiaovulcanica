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

    const adminId = authData.claims.sub;
    const userIsAdmin = await isAdmin(adminId);
    
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem enviar emails de recuperação." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, email } = body;

    if (!userId || !email) {
      return NextResponse.json(
        { error: "userId e email são obrigatórios" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey || !supabaseUrl) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY não configurada. Configure a variável de ambiente para enviar emails de recuperação." },
        { status: 500 }
      );
    }

    // Criar cliente Admin para enviar email de recuperação
    const adminClient = createAdminClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Verificar se o usuário existe
    const { data: userData, error: userError } = await adminClient.auth.admin.getUserById(userId);
    
    if (userError || !userData?.user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se o email corresponde
    if (userData.user.email !== email) {
      return NextResponse.json(
        { error: "Email não corresponde ao usuário" },
        { status: 400 }
      );
    }

    // Usar o mesmo método do forgot-password: fazer requisição HTTP direta
    // Isso simula exatamente o que o cliente faz, sem problemas de sessão
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;
    
    if (!anonKey) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY não configurada" },
        { status: 500 }
      );
    }

    // Usar callback que processará os hash fragments e redirecionará para update-password
    const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`;

    // Fazer requisição HTTP direta ao endpoint que resetPasswordForEmail usa internamente
    // Este é exatamente o mesmo método que o forgot-password usa no cliente
    const response = await fetch(`${supabaseUrl}/auth/v1/recover`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        email: email,
        redirect_to: redirectUrl,
      }),
    });

    // Verificar se a requisição foi bem-sucedida
    // O endpoint /auth/v1/recover pode retornar vazio (204) ou texto simples quando bem-sucedido
    const status = response.status;
    
    if (status >= 200 && status < 300) {
      // Sucesso - o email foi enviado
      // Não tentar fazer parse se a resposta estiver vazia
      const responseText = await response.text().catch(() => '');
      console.log('Email de recuperação enviado com sucesso para:', email, 'Status:', status);
      
      // Retornar resposta JSON válida
      return NextResponse.json({
        success: true,
        message: "Email de recuperação de senha enviado com sucesso",
      });
    }

    // Erro - tentar ler a mensagem de erro
    let errorMessage = 'Erro ao enviar email de recuperação';
    try {
      const contentType = response.headers.get('content-type');
      const responseText = await response.text();
      
      // Verificar se é HTML (doctype, html tags, etc)
      const isHTML = responseText.trim().toLowerCase().startsWith('<!doctype') || 
                    responseText.trim().toLowerCase().startsWith('<html') ||
                    responseText.includes('<html') ||
                    responseText.includes('<!DOCTYPE');
      
      if (isHTML) {
        // Se for HTML, usar mensagem genérica
        errorMessage = `Erro HTTP ${status}. Verifique a configuração do Supabase.`;
      } else if (contentType && contentType.includes('application/json') && responseText.trim()) {
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorData.error_description || errorMessage;
        } catch {
          // Se não conseguir fazer parse, usar texto limpo (sem HTML)
          errorMessage = responseText.substring(0, 200) || errorMessage;
        }
      } else if (responseText.trim() && !isHTML) {
        // Usar texto, mas limitar tamanho e remover HTML se houver
        const cleanText = responseText.replace(/<[^>]*>/g, '').trim().substring(0, 200);
        errorMessage = cleanText || `Erro HTTP ${status}`;
      } else {
        errorMessage = `Erro HTTP ${status}`;
      }
    } catch (parseError) {
      errorMessage = `Erro HTTP ${status}`;
    }
    
    // Limpar a mensagem de qualquer HTML restante
    errorMessage = errorMessage.replace(/<[^>]*>/g, '').trim();
    
    console.error('Erro ao enviar email de recuperação:', errorMessage);
    return NextResponse.json(
      { 
        error: errorMessage,
        hint: "Verifique se os templates de email estão configurados no Supabase Dashboard e se o SMTP está configurado"
      },
      { status: status || 400 }
    );
  } catch (error: any) {
    console.error('Erro ao enviar email de recuperação:', error);
    return NextResponse.json(
      { error: error.message || "Erro ao enviar email de recuperação" },
      { status: 500 }
    );
  }
}

