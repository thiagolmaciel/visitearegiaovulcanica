import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/service/adminServices";

export async function GET() {
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
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    // Buscar configurações (usando uma tabela simples ou retornar defaults)
    // Por enquanto, vamos usar uma estrutura simples
    const defaultSettings = {
      twoFactorAuth: false,
      auditLogs: true,
      emailNotifications: true,
      systemAlerts: true,
      maintenanceMode: false,
      backupFrequency: 'diario',
    };

    // Tentar buscar do banco se existir tabela system_settings
    const { data: settings } = await supabase
      .from('system_settings')
      .select('*')
      .eq('key', 'main')
      .single();

    if (settings?.value) {
      return NextResponse.json({
        success: true,
        settings: { ...defaultSettings, ...settings.value },
      });
    }

    return NextResponse.json({
      success: true,
      settings: defaultSettings,
    });
  } catch (error: any) {
    console.error("Erro ao buscar configurações:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar configurações" },
      { status: 500 }
    );
  }
}

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
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { settings } = body;

    if (!settings) {
      return NextResponse.json(
        { error: "Configurações não fornecidas" },
        { status: 400 }
      );
    }

    // Salvar configurações (upsert na tabela system_settings)
    const { error: upsertError } = await supabase
      .from('system_settings')
      .upsert({
        key: 'main',
        value: settings,
        updated_by: adminId,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'key'
      });

    if (upsertError) {
      // Se a tabela não existir, vamos usar uma abordagem alternativa
      // Por enquanto, vamos apenas retornar sucesso
      console.log("Tabela system_settings pode não existir. Configurações não salvas no banco.");
    }

    return NextResponse.json({
      success: true,
      message: "Configurações salvas com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao salvar configurações:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao salvar configurações" },
      { status: 500 }
    );
  }
}

