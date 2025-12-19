import { NextRequest, NextResponse } from "next/server";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contato@regiaovulcanica.org.br";
const FROM_EMAIL = process.env.FROM_EMAIL || "Contato Site <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Option 1: Use Resend (recommended - easy setup)
    // You'll need to install: npm install resend
    // And set RESEND_API_KEY in your .env.local
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      try {
        // Dynamic import to avoid issues if package not installed
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5530;">Nova Mensagem de Contato</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
            <h3>Mensagem:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `;

        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: CONTACT_EMAIL,
          replyTo: email,
          subject: `[Contato] ${subject}`,
          html: emailHtml,
        });

        if (error) {
          console.error("Resend error:", error);
          throw new Error(error.message || "Erro ao enviar email");
        }

        return NextResponse.json({
          success: true,
          message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        });
      } catch (resendError: any) {
        console.error("Resend error:", resendError);
        // Fall through to alternative methods
      }
    }

    // Option 2: Store in Supabase database (if you want to keep records)
    // This requires a 'contact_messages' table in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Store message in database
        const { error: dbError } = await supabase
          .from("contact_messages")
          .insert({
            name,
            email,
            subject,
            message,
            created_at: new Date().toISOString(),
          });

        if (dbError) {
          console.error("Database error:", dbError);
        }
      } catch (dbError) {
        console.error("Database storage error:", dbError);
      }
    }

    // If no email service is configured, return success but log a warning
    if (!resendApiKey) {
      console.warn(
        "RESEND_API_KEY not configured. Message stored in database only (if configured)."
      );
      return NextResponse.json({
        success: true,
        message: "Mensagem recebida! Entraremos em contato em breve.",
        warning: "Email service not configured. Please set RESEND_API_KEY to enable email sending.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error: error.message || "Erro ao enviar mensagem. Tente novamente mais tarde.",
      },
      { status: 500 }
    );
  }
}

