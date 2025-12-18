# Tutorial: Como Alterar Email de Usuários (Admin)

Este tutorial explica como configurar e usar a funcionalidade de alteração de email de usuários na área administrativa.

## 📋 Pré-requisitos

Para que a funcionalidade de alteração de email funcione, você precisa configurar a **Service Role Key** do Supabase.

## 🔧 Configuração Inicial

### 1. Obter a Service Role Key do Supabase

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Na seção **Project API keys**, encontre a chave **`service_role`** (secret)
5. **⚠️ IMPORTANTE**: Esta chave tem acesso total ao banco de dados. Nunca a exponha publicamente!

### 2. Configurar a Variável de Ambiente

Adicione a Service Role Key ao seu arquivo `.env.local` (ou `.env` em produção):

```env
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
```

**⚠️ Segurança:**
- Nunca commite o arquivo `.env.local` no Git
- Adicione `.env.local` ao `.gitignore`
- Em produção, configure a variável de ambiente no seu provedor de hospedagem (Vercel, Railway, etc.)

### 3. Reiniciar o Servidor

Após adicionar a variável de ambiente, reinicie o servidor de desenvolvimento:

```bash
# Se estiver usando npm
npm run dev

# Se estiver usando yarn
yarn dev

# Se estiver usando pnpm
pnpm dev
```

## 🎯 Como Usar a Funcionalidade

### Passo 1: Acessar a Página do Usuário

1. Faça login como administrador
2. Navegue para **Admin** → **Usuários**
3. Clique no usuário que deseja editar

### Passo 2: Editar Informações

1. Na página do usuário, você verá um card com as informações do usuário
2. Clique no botão **"Editar"** no canto superior direito do card
3. Os campos de **Nome Completo** e **Email** ficarão editáveis

### Passo 3: Fazer as Alterações

1. **Nome Completo**: Pode ser deixado em branco ou preenchido
2. **Email**: Campo obrigatório, deve ser um email válido
3. Clique em **"Salvar"** para confirmar as alterações

### Passo 4: Confirmação

- Se tudo estiver correto, você verá uma mensagem de sucesso
- O email será atualizado tanto no sistema de autenticação (Supabase Auth) quanto na tabela `profiles`
- O email será automaticamente confirmado (não requer confirmação por email)

## 🔍 Como Funciona Tecnicamente

### API Route: `/admin/usuarios/atualizar`

A funcionalidade utiliza uma rota API que:

1. **Valida permissões**: Verifica se o usuário atual é administrador
2. **Atualiza Auth**: Usa a Supabase Admin API para atualizar o email no sistema de autenticação
3. **Atualiza Profile**: Atualiza a tabela `profiles` com o novo email e nome
4. **Confirmação automática**: O email é marcado como confirmado automaticamente

### Código da API Route

```typescript
// app/(admin)/admin/usuarios/atualizar/route.ts

// 1. Cria cliente Admin com Service Role Key
const adminClient = createAdminClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// 2. Atualiza email no Auth (auth.users)
// IMPORTANTE: O email está apenas em auth.users, NÃO na tabela profiles
await adminClient.auth.admin.updateUserById(userId, {
  email: email,
  email_confirm: true,
});

// 3. Atualiza apenas full_name na tabela profiles
// O email NÃO é armazenado em profiles, apenas em auth.users
await adminClient
  .from('profiles')
  .update({ full_name })
  .eq('id', userId);
```

**⚠️ Importante**: O email é o identificador do usuário e está armazenado apenas na tabela `auth.users` do Supabase, não na tabela `profiles`. Apenas o `full_name` é atualizado na tabela `profiles`.

## ⚠️ Considerações Importantes

### Segurança

1. **Service Role Key**: Esta chave tem acesso total. Use apenas em servidor (nunca no cliente)
2. **Validação**: A API valida que apenas administradores podem fazer alterações
3. **Logs**: Monitore logs para detectar alterações suspeitas

### Limitações

1. **Email único**: O Supabase não permite emails duplicados. Se o email já estiver em uso, a operação falhará
2. **Require Service Role Key**: Sem a Service Role Key configurada, a funcionalidade não funcionará
3. **Confirmação automática**: O email é confirmado automaticamente, então o usuário não precisa verificar o novo email

### Tratamento de Erros

A API retorna erros específicos:

- **401**: Não autenticado
- **403**: Acesso negado (não é administrador)
- **400**: Dados inválidos (email inválido, email já em uso, etc.)
- **500**: Erro de servidor (Service Role Key não configurada, etc.)

## 🐛 Troubleshooting

### Erro: "SUPABASE_SERVICE_ROLE_KEY não configurada"

**Solução**: Adicione a variável de ambiente `SUPABASE_SERVICE_ROLE_KEY` no seu `.env.local`

### Erro: "Email já está em uso"

**Solução**: O email que você está tentando usar já está associado a outro usuário. Escolha um email diferente.

### Erro: "Email inválido"

**Solução**: Verifique se o formato do email está correto (exemplo@dominio.com)

### Alterações não aparecem imediatamente

**Solução**: A página é atualizada automaticamente após salvar. Se não aparecer, recarregue a página manualmente.

## 📝 Exemplo de Uso

```typescript
// Exemplo de requisição para a API
const response = await fetch('/admin/usuarios/atualizar', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'uuid-do-usuario',
    email: 'novo-email@exemplo.com',
    fullName: 'Novo Nome',
  }),
});
```

## 🔐 Boas Práticas

1. **Auditoria**: Considere adicionar logs de todas as alterações de email
2. **Notificação**: Considere notificar o usuário quando seu email for alterado
3. **Validação**: Sempre valide o formato do email antes de salvar
4. **Backup**: Mantenha backups regulares do banco de dados
5. **Testes**: Teste a funcionalidade em ambiente de desenvolvimento antes de usar em produção

## 📚 Recursos Adicionais

- [Documentação Supabase Admin API](https://supabase.com/docs/reference/javascript/auth-admin-updateuserbyid)
- [Supabase Auth Management](https://supabase.com/docs/guides/auth)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## ✅ Checklist de Configuração

- [ ] Service Role Key obtida do Supabase Dashboard
- [ ] Variável `SUPABASE_SERVICE_ROLE_KEY` adicionada ao `.env.local`
- [ ] Variável `NEXT_PUBLIC_SUPABASE_URL` configurada
- [ ] Servidor reiniciado após adicionar variáveis
- [ ] Funcionalidade testada em ambiente de desenvolvimento
- [ ] Variáveis de ambiente configuradas em produção (se aplicável)
- [ ] `.env.local` adicionado ao `.gitignore`

---

**Última atualização**: Janeiro 2025

