# Guia de Testes - Sistema de Autenticação

Este documento fornece instruções detalhadas para testar todos os fluxos de autenticação do sistema.

## Pré-requisitos

1. Servidor de desenvolvimento rodando (`npm run dev` ou `yarn dev`)
2. Configuração do Supabase correta (variáveis de ambiente configuradas)
3. Acesso a um email de teste para receber links de confirmação e recuperação
4. Supabase Dashboard configurado com URLs de redirecionamento corretas

## ⚠️ IMPORTANTE: Configuração de Email no Supabase

**Se emails não estão sendo recebidos, consulte: [SUPABASE_EMAIL_CONFIG.md](./SUPABASE_EMAIL_CONFIG.md)**

### URLs de Redirecionamento no Supabase

Certifique-se de que as seguintes URLs estão configuradas no Supabase Dashboard:

**No Supabase Dashboard → Authentication → URL Configuration → Redirect URLs:**

Para Desenvolvimento:
- `http://localhost:3000/auth/confirm`
- `http://localhost:3000/auth/callback`
- `http://localhost:3000/auth/update-password`

Para Produção:
- `https://seu-dominio.com/auth/confirm`
- `https://seu-dominio.com/auth/callback`
- `https://seu-dominio.com/auth/update-password`

### Verificações Adicionais

1. **Email Signup habilitado**: Authentication → Configuration → Enable Email Signup ✅
2. **Email Confirmation**: Authentication → Configuration → Confirm email (pode estar habilitado ou desabilitado)
3. **Rate Limits**: Authentication → Rate Limits (verifique se não atingiu o limite - plano gratuito: ~4-5 emails/hora)
4. **Email Templates**: Authentication → Email (verifique templates ou use padrão)

## Fluxos de Teste

### 1. Cadastro de Novo Usuário (Sign Up)

**URL**: `/auth/sign-up`

**Passos**:
1. Acesse `/auth/sign-up`
2. Preencha:
   - Email válido (ex: `teste@example.com`)
   - Senha (mínimo 6 caracteres)
   - Confirmar senha (deve coincidir)
3. Clique em "Cadastrar"
4. **Resultado esperado**: Redirecionamento para `/auth/sign-up-success`
5. Verifique seu email para o link de confirmação

**Testes adicionais**:
- [ ] Senhas não coincidem → deve mostrar erro
- [ ] Senha com menos de 6 caracteres → deve mostrar erro
- [ ] Email inválido → deve mostrar erro do Supabase
- [ ] Email já cadastrado → deve mostrar erro apropriado

**Como verificar**:
- Página de sucesso exibida
- Email de confirmação recebido
- Link no email funciona

---

### 2. Confirmação de Email

**URL**: Link recebido no email após cadastro

**Passos**:
1. Abra o email de confirmação (verifique spam se não receber)
2. Clique no link de confirmação
3. **Resultado esperado**: 
   - Se link válido: Redirecionamento para `/auth/confirm` → processamento → depois para `/dashboard`
   - Se link inválido/expirado: Redirecionamento para `/auth/error`

**⚠️ Se não receber email**:
- Verifique configuração no Supabase (veja SUPABASE_EMAIL_CONFIG.md)
- Verifique pasta de spam
- Verifique logs do Supabase Dashboard
- Aguarde alguns minutos (pode haver delay)

**Testes adicionais**:
- [ ] Link expirado → deve mostrar erro
- [ ] Link já usado → deve mostrar erro
- [ ] Link inválido → deve mostrar erro

**Como verificar**:
- Usuário logado após confirmação
- Redirecionamento correto
- Erros exibidos apropriadamente

---

### 3. Login

**URL**: `/auth/login`

**Passos**:
1. Acesse `/auth/login`
2. Preencha:
   - Email cadastrado
   - Senha correta
3. Clique em "Entrar"
4. **Resultado esperado**: 
   - Usuário normal → redirecionamento para `/dashboard`
   - Usuário admin → redirecionamento para `/admin`

**Testes adicionais**:
- [ ] Email não cadastrado → deve mostrar erro
- [ ] Senha incorreta → deve mostrar erro
- [ ] Email não confirmado → deve mostrar erro (se email confirmation estiver habilitado)
- [ ] Campos vazios → validação HTML deve impedir submit

**Como verificar**:
- Redirecionamento correto baseado no tipo de usuário
- Sessão criada (verificar cookies)
- Erros traduzidos para português

---

### 4. Recuperação de Senha - Método 1 (Email Link)

**URL**: `/auth/forgot-password`

**Passos**:
1. Acesse `/auth/forgot-password` (ou clique em "Esqueci minha senha" no login)
2. Digite o email cadastrado
3. Clique em "Enviar"
4. **Resultado esperado**: Mensagem de sucesso "Cheque seu Email"
5. Verifique seu email para o link de redefinição
6. Clique no link do email
7. **Resultado esperado**: Redirecionamento para `/auth/update-password`
8. Digite nova senha e confirme
9. Clique em "Salvar"
10. **Resultado esperado**: Redirecionamento para `/dashboard`

**Testes adicionais**:
- [ ] Email não cadastrado → deve mostrar erro
- [ ] Link expirado → deve mostrar erro
- [ ] Senhas não coincidem → deve mostrar erro
- [ ] Senha muito curta → deve mostrar erro

**Como verificar**:
- Email recebido com link válido
- Link redireciona corretamente
- Senha atualizada com sucesso
- Login funciona com nova senha

---

### 5. Recuperação de Conta - Método 2 (OTP Code)

**URL**: `/auth/recover`

**Passos**:
1. Acesse `/auth/recover`
2. Digite o email cadastrado
3. Clique em "Enviar"
4. **Resultado esperado**: Tela muda para "Verificar Código"
5. Verifique seu email para o código OTP de 6 dígitos
6. Digite o código de 6 dígitos
7. Clique em "Verificar"
8. **Resultado esperado**: Tela muda para "Nova Senha"
9. Digite nova senha e confirme
10. Clique em "Salvar"
11. **Resultado esperado**: Mensagem de sucesso e link para login

**Testes adicionais**:
- [ ] Email não cadastrado → deve mostrar erro
- [ ] Código incorreto → deve mostrar erro
- [ ] Código expirado → deve mostrar erro
- [ ] Senhas não coincidem → deve mostrar erro
- [ ] Voltar entre etapas → deve funcionar corretamente

**Como verificar**:
- Email recebido com código OTP
- Código funciona corretamente
- Senha atualizada com sucesso
- Login funciona com nova senha

---

### 6. Atualização de Senha (Após Recovery Link)

**URL**: `/auth/update-password` (acessado via link de email)

**Passos**:
1. Acesse via link de recuperação de senha
2. Digite nova senha
3. Digite confirmação de senha
4. Clique em "Salvar"
5. **Resultado esperado**: Redirecionamento para `/dashboard`

**Testes adicionais**:
- [ ] Senhas não coincidem → deve mostrar erro
- [ ] Senha muito curta → deve mostrar erro
- [ ] Acesso sem token válido → deve mostrar erro

**Como verificar**:
- Senha atualizada
- Redirecionamento correto
- Login funciona com nova senha

---

### 7. Logout

**Onde**: Dashboard ou Admin navbar (menu de usuário)

**Passos**:
1. Faça login
2. Clique no menu de usuário
3. Clique em "Sair" ou "Logout"
4. **Resultado esperado**: Redirecionamento para `/auth/login` e sessão encerrada

**Testes adicionais**:
- [ ] Após logout, tentar acessar `/dashboard` → deve redirecionar para login
- [ ] Após logout, tentar acessar `/admin` → deve redirecionar para login
- [ ] Cookies de sessão removidos

**Como verificar**:
- Redirecionamento para login
- Sessão encerrada (cookies removidos)
- Páginas protegidas inacessíveis

---

### 8. Página de Erro

**URL**: `/auth/error?error=mensagem`

**Passos**:
1. Acesse `/auth/error?error=Teste%20de%20erro`
2. **Resultado esperado**: 
   - Mensagem de erro exibida em português
   - Botões para voltar ao login e voltar ao site
   - Estilo consistente com outras páginas de auth

**Testes adicionais**:
- [ ] Erro sem parâmetro → deve mostrar mensagem genérica
- [ ] Erro com caracteres especiais → deve decodificar corretamente
- [ ] Links funcionam corretamente

**Como verificar**:
- Mensagem exibida corretamente
- Tradução em português
- Navegação funciona

---

### 9. Callback Handler

**URL**: `/auth/callback` (acessado automaticamente via hash fragments)

**Passos**:
1. Este endpoint é acessado automaticamente quando:
   - Usuário clica em link de recuperação de senha (com hash fragments)
   - Supabase redireciona após autenticação OAuth
2. **Resultado esperado**: 
   - Processa tokens corretamente
   - Redireciona para página apropriada

**Testes adicionais**:
- [ ] Hash fragment com type=recovery → deve processar e redirecionar para update-password
- [ ] Hash fragment com erro → deve redirecionar para error page
- [ ] Query params (método antigo) → deve funcionar como fallback

**Como verificar**:
- Redirecionamentos corretos
- Sessão criada quando apropriado
- Erros tratados corretamente

---

### 10. Proteção de Rotas

**Testes**:
- [ ] Acessar `/dashboard` sem login → deve redirecionar para `/auth/login`
- [ ] Acessar `/admin` sem login → deve redirecionar para `/auth/login`
- [ ] Acessar `/admin` como usuário normal → deve redirecionar para `/dashboard` ou mostrar erro
- [ ] Acessar `/dashboard` como admin → deve funcionar (ou redirecionar para admin)

**Como verificar**:
- Middleware funcionando
- Redirecionamentos corretos
- Proteção de rotas admin funcionando

---

## Checklist de Testes Completos

### Funcionalidades Básicas
- [ ] Cadastro de novo usuário
- [ ] Confirmação de email
- [ ] Login com credenciais corretas
- [ ] Login com credenciais incorretas (erro)
- [ ] Logout

### Recuperação de Senha
- [ ] Recuperação via email link (forgot-password)
- [ ] Recuperação via OTP code (recover)
- [ ] Atualização de senha após recovery
- [ ] Validação de senhas (coincidência, tamanho mínimo)

### Tratamento de Erros
- [ ] Erros traduzidos para português
- [ ] Mensagens de erro claras
- [ ] Página de erro funcional
- [ ] Links expirados tratados corretamente

### UI/UX
- [ ] Estilo consistente entre todas as páginas de auth
- [ ] Responsividade (mobile/desktop)
- [ ] Loading states durante requisições
- [ ] Navegação entre páginas funciona

### Segurança
- [ ] Senhas não aparecem em logs
- [ ] Tokens não expostos na URL (após processamento)
- [ ] Sessões encerradas corretamente no logout
- [ ] Rotas protegidas funcionando

---

## Problemas Comuns e Soluções

### Email não recebido (SIGN-UP) ⚠️ PROBLEMA MAIS COMUM

**Soluções passo a passo**:

1. **Configure URLs no Supabase Dashboard** (CRÍTICO):
   - Acesse: Supabase Dashboard → Seu Projeto → Authentication → URL Configuration
   - Em **Redirect URLs**, adicione:
     - `http://localhost:3000/auth/confirm` (desenvolvimento)
     - `http://localhost:3000/auth/callback` (desenvolvimento)
     - `http://localhost:3000/auth/update-password` (desenvolvimento)
   - Clique em **Save**

2. **Verifique Email Signup**:
   - Vá em Authentication → Configuration
   - Certifique-se que "Enable Email Signup" está ✅ habilitado

3. **Verifique Rate Limits**:
   - Plano gratuito: ~4-5 emails/hora
   - Se atingiu limite, aguarde 1 hora

4. **Verifique Logs**:
   - Vá em Logs → Auth Logs
   - Procure erros relacionados a email

5. **Outras verificações**:
   - Verifique pasta de spam
   - Aguarde 1-2 minutos (delay comum)
   - Tente com outro email

**📖 Documentação completa**: [SUPABASE_EMAIL_CONFIG.md](./SUPABASE_EMAIL_CONFIG.md)

### Link de confirmação não funciona
- Verifique se a URL está configurada no Supabase Dashboard
- Verifique se o link não expirou (links geralmente expiram em 1 hora)
- Verifique se o link já foi usado

### Erro "Invalid token"
- Token pode ter expirado
- Token pode ter sido usado
- Verifique se está usando o link mais recente do email

### Redirecionamento incorreto
- Verifique configuração de redirect URLs no Supabase
- Verifique variáveis de ambiente
- Verifique código de callback handler

---

## Notas Adicionais

- Todos os textos devem estar em português
- Todas as páginas de auth devem ter estilo consistente
- Erros devem ser traduzidos usando `translateError` utility
- Logs de erro devem usar `logError` utility (não console.log)
- Testes devem ser feitos em ambiente de desenvolvimento primeiro
- Testes em produção devem ser feitos com cuidado (evitar spam de emails)
