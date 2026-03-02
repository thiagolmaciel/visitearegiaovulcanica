# Configuração de Emails no Supabase

Este guia explica como configurar o Supabase para enviar emails de confirmação e recuperação de senha.

## Problema Comum: Emails Não Estão Sendo Enviados

Se os emails de cadastro não estão sendo recebidos, siga os passos abaixo para configurar o Supabase corretamente.

## Passo 1: Configurar URLs de Redirecionamento (CRÍTICO)

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Authentication** → **URL Configuration**
4. Na seção **Redirect URLs**, adicione as seguintes URLs (uma por linha):

### Para Desenvolvimento (localhost):
```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/callback
http://localhost:3000/auth/update-password
```

### Para Produção:
```
https://seu-dominio.com/auth/confirm
https://seu-dominio.com/auth/callback
https://seu-dominio.com/auth/update-password
```

5. Clique em **Save**

## Passo 2: Verificar Configuração de Email

1. No Supabase Dashboard, vá em **Authentication** → **Email**
2. Verifique se os templates estão configurados:
   - **Confirm signup** - Template para confirmação de cadastro
   - **Reset password** - Template para recuperação de senha
   - **Magic Link** - Template para login sem senha (se usado)

3. Se os templates não existirem, o Supabase usa templates padrão (isso está OK)

## Passo 3: Verificar Configurações de Autenticação

1. Vá em **Authentication** → **Configuration**
2. Verifique as seguintes configurações:

### Email Auth
- ✅ **Enable Email Signup**: Deve estar habilitado
- ✅ **Confirm email**: Pode estar habilitado ou desabilitado
  - Se habilitado: Usuário precisa confirmar email antes de fazer login
  - Se desabilitado: Usuário pode fazer login imediatamente após cadastro

### SMTP Settings (Opcional)
Por padrão, o Supabase usa seu próprio serviço de email. Se você quiser usar seu próprio SMTP:

1. Vá em **Authentication** → **Email** → **SMTP Settings** (ou **Project Settings** → **Auth** → **SMTP Settings**)
2. Configure seu servidor SMTP (Gmail, SendGrid, etc.)
3. Isso é opcional - o serviço padrão do Supabase funciona bem

## Passo 4: Verificar Rate Limits

1. Vá em **Authentication** → **Rate Limits**
2. Verifique os limites:
   - **Email rate limit**: Quantos emails podem ser enviados por hora
   - Se você estiver em um plano gratuito, pode haver limites (geralmente 4-5 emails/hora)

## Passo 5: Verificar Logs

1. Vá em **Logs** → **Auth Logs**
2. Procure por tentativas de sign-up
3. Verifique se há erros relacionados ao envio de email

## Passo 6: Testar Configuração

### Teste 1: Cadastro de Novo Usuário

1. Acesse `/auth/sign-up`
2. Preencha o formulário com um email válido
3. Clique em "Cadastrar"
4. Verifique:
   - Se aparece mensagem de sucesso
   - Se email é recebido (verifique spam também)
   - Se link no email funciona

### Teste 2: Verificar Email no Supabase

1. Vá em **Authentication** → **Users**
2. Procure pelo usuário recém-criado
3. Verifique o status:
   - **Unconfirmed**: Email não foi confirmado (esperado se confirmação estiver habilitada)
   - **Confirmed**: Email foi confirmado
4. Verifique a coluna **Email Verified**: deve mostrar se o email foi verificado

## Problemas Comuns e Soluções

### Problema: Email não é recebido

**Soluções**:
1. Verifique a pasta de spam/lixo eletrônico
2. Verifique se o email está correto
3. Verifique os logs do Supabase para erros
4. Aguarde alguns minutos (pode haver delay)
5. Verifique se o rate limit não foi atingido

### Problema: Link no email não funciona

**Soluções**:
1. Verifique se a URL está configurada em **Redirect URLs**
2. Verifique se está usando a URL correta (localhost vs produção)
3. Verifique se o link não expirou (links geralmente expiram em 1 hora)

### Problema: "Email already registered" mas não recebeu email

**Soluções**:
1. Verifique se o usuário já existe no Supabase Dashboard
2. Tente usar "Esqueci minha senha" em vez de criar nova conta
3. Verifique se email confirmation está desabilitado (usuário pode fazer login direto)

### Problema: Email confirmation desabilitado mas quer habilitar

**Soluções**:
1. Vá em **Authentication** → **Configuration**
2. Habilite **Confirm email**
3. Usuários existentes não precisam confirmar, mas novos usuários sim

## Configuração Avançada: Customizar Templates de Email

1. Vá em **Authentication** → **Email**
2. Você verá os templates disponíveis:
   - **Confirm signup** - Template para confirmação de cadastro
   - **Reset password** - Template para recuperação de senha
   - **Magic Link** - Template para login sem senha
3. Selecione o template que deseja editar
4. Clique em **Edit** (se disponível) ou use o template padrão
5. Personalize o template HTML (se editando)
6. Use variáveis disponíveis:
   - `{{ .ConfirmationURL }}` - Link de confirmação
   - `{{ .Email }}` - Email do usuário
   - `{{ .Token }}` - Token de confirmação (se necessário)

## Notas Importantes

- **Plano Gratuito**: Tem limites de emails por hora (geralmente 4-5 emails/hora)
- **Plano Pago**: Limites maiores ou ilimitados
- **SMTP Custom**: Se configurar SMTP próprio, você tem mais controle mas precisa gerenciar
- **Email Confirmation**: Se desabilitado, usuários podem fazer login imediatamente após cadastro

## Verificação Rápida

Execute este checklist:

- [ ] URLs de redirecionamento configuradas em **Authentication** → **URL Configuration**
- [ ] Email signup habilitado em **Authentication** → **Configuration**
- [ ] Templates de email verificados em **Authentication** → **Email**
- [ ] Rate limits verificados em **Authentication** → **Rate Limits** (não atingidos)
- [ ] Logs verificados em **Logs** → **Auth Logs** (sem erros)
- [ ] Email testado com endereço válido
- [ ] Pasta de spam verificada

## Suporte

Se os problemas persistirem:
1. Verifique a [documentação oficial do Supabase](https://supabase.com/docs/guides/auth)
2. Verifique os [fóruns do Supabase](https://github.com/supabase/supabase/discussions)
3. Entre em contato com o suporte do Supabase
