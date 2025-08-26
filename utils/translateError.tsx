export default function translateError(error: string): string {
    // Erros genéricos
    if (error.includes('missing')) {
      return 'Preencha todos os campos obrigatórios.';
    }
  
    switch (error) {
      // Erros comuns de autenticação
      case 'invalid_credentials':
      case 'Invalid login credentials':
        return 'Credenciais inválidas. Verifique seu email e senha.';
      case 'user_already_exists':
        return 'Este usuário já está registrado.';
      case 'email_exists':
        return 'Este endereço de email já está registrado.';
      case 'email_address_invalid':
        return 'Endereço de email inválido.';
      case 'email_address_not_authorized':
        return 'Envio de email não autorizado para este endereço.';
      case 'email_not_confirmed':
        return 'Email não confirmado. Verifique sua caixa de entrada.';
      case 'email_provider_disabled':
        return 'Cadastro por email e senha está desabilitado.';
      case 'signup_disabled':
        return 'Cadastro de novos usuários está desabilitado.';
      case 'session_expired':
        return 'Sua sessão expirou. Faça login novamente.';
      case 'session_not_found':
        return 'Sessão não encontrada. Faça login novamente.';
      case 'captcha_failed':
        return 'Falha na verificação do CAPTCHA.';
      case 'flow_state_expired':
        return 'Fluxo de autenticação expirado. Solicite para iniciar novamente.';
      case 'flow_state_not_found':
        return 'Estado do fluxo de autenticação não encontrado.';
      case 'reauthentication_needed':
        return 'Reautenticação necessária. Verifique seu código.';
      case 'reauthentication_not_valid':
        return 'Código de reautenticação inválido.';
      case 'too_many_enrolled_mfa_factors':
        return 'Número máximo de fatores MFA atingido.';
      case 'mfa_verification_failed':
        return 'Falha na verificação do MFA. Tente novamente.';
      case 'mfa_challenge_expired':
        return 'Desafio MFA expirado. Solicite um novo.';
      case 'mfa_factor_not_found':
        return 'Fator MFA não encontrado.';
      case 'mfa_ip_address_mismatch':
        return 'Durante o cadastro do MFA, o IP mudou — inicie novamente.';
      case 'mfa_phone_enroll_not_enabled':
        return 'Cadastro de MFA por telefone está desabilitado.';
      case 'mfa_phone_verify_not_enabled':
        return 'Verificação de MFA por telefone está desabilitada.';
      case 'mfa_totp_enroll_not_enabled':
        return 'Cadastro de TOTP (OTP por app) está desabilitado.';
      case 'mfa_totp_verify_not_enabled':
        return 'Verificação de TOTP está desabilitada.';
      case 'identity_already_exists':
        return 'A identidade já está vinculada a um usuário.';
      case 'identity_not_found':
        return 'A identidade não foi encontrada.';
      case 'single_identity_not_deletable':
        return 'Não é possível remover a única identidade do usuário.';
      case 'manual_linking_disabled':
        return 'Vinculação manual de usuários está desativada.';
      case 'invite_not_found':
        return 'Convite expirado ou já utilizado.';
      case 'anonymous_provider_disabled':
        return 'Entradas anônimas estão desabilitadas.';
      case 'bad_code_verifier':
        return 'O verificador de código (PKCE) não corresponde ao esperado.';
      case 'bad_json':
        return 'O corpo da requisição não contém JSON válido.';
      case 'bad_jwt':
        return 'O JWT enviado no cabeçalho Authorization não é válido.';
      case 'bad_oauth_callback':
        return 'Callback OAuth não possui todos os atributos necessários (estado).';
      case 'bad_oauth_state':
        return 'O estado OAuth não está no formato correto.';
      case 'conflict':
        return 'Conflito no banco de dados (ex.: concorrência em requisições simultâneas).';
      case 'email_conflict_identity_not_deletable':
        return 'Não é possível desvincular identidade: o email resultante pertence a outra conta.';
      case 'hook_payload_invalid_content_type':
        return 'O payload do hook não possui um Content-Type válido.';
      case 'hook_payload_over_size_limit':
        return 'O payload do hook excede o tamanho permitido.';
      case 'hook_timeout':
        return 'O hook não respondeu dentro do tempo permitido.';
      case 'hook_timeout_after_retry':
        return 'O hook não respondeu após tentativas de retry.';
      case 'invalid_claim':
        return 'Reivindicação inválida no JWT.';
      case 'invalid_jwt':
        return 'JWT inválido.';
      case 'invalid_request':
        return 'Requisição inválida.';
      case 'invalid_token':
        return 'Token inválido.';
      case 'missing_email_or_password':
        return 'Email ou senha ausentes. Preencha os campos obrigatórios.';
      case 'missing_email_or_phone':
        return 'Email ou telefone ausentes. Preencha os campos obrigatórios.';
      case 'password_too_weak':
        return 'Senha muito fraca. Escolha uma senha mais forte.';
      case 'password_reset_required':
        return 'Redefinição de senha necessária.';
      case 'provider_already_linked':
        return 'Este provedor já está vinculado a outra conta.';
      case 'provider_not_found':
        return 'Provedor não encontrado.';
      case 'rate_limit_exceeded':
        return 'Limite de requisições excedido. Tente novamente mais tarde.';
      case 'resource_not_found':
        return 'Recurso não encontrado.';
      case 'service_unavailable':
        return 'Serviço temporariamente indisponível. Tente novamente mais tarde.';
      case 'too_many_requests':
        return 'Muitas requisições. Tente novamente mais tarde.';
      case 'unauthorized':
        return 'Não autorizado. Verifique suas credenciais.';
      case 'unsupported_grant_type':
        return 'Tipo de concessão não suportado.';
      case 'user_not_found':
        return 'Usuário não encontrado.';
      case 'user_suspended':
        return 'Usuário suspenso. Entre em contato com o suporte.';
      case 'user_disabled':
        return 'Usuário desabilitado.';
      case 'user_locked':
        return 'Conta bloqueada. Entre em contato com o suporte.';
      case 'user_not_confirmed':
        return 'Usuário não confirmado. Verifique seu email.';
      case 'user_not_authenticated':
        return 'Usuário não autenticado.';
      case 'user_not_found':
        return 'Usuário não encontrado.';
      case 'wrong_password':
        return 'Senha incorreta.';
      default:
        return `Erro desconhecido: ${error}`;
    }
  }
  