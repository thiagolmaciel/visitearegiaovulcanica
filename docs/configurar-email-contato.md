# Configuração do Formulário de Contato

Este guia explica como configurar o envio de emails do formulário de contato.

## 📋 Opções de Configuração

O formulário de contato suporta múltiplas formas de envio de email. Escolha a opção que melhor se adequa ao seu projeto.

### Opção 1: Resend (Recomendado)

Resend é um serviço de email moderno e fácil de usar, perfeito para projetos Next.js.

#### Passo 1: Instalar Resend

```bash
npm install resend
# ou
yarn add resend
# ou
pnpm add resend
```

#### Passo 2: Criar Conta no Resend

1. Acesse [resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Vá em **API Keys** e crie uma nova chave
4. Copie a chave API

#### Passo 3: Configurar Variável de Ambiente

Adicione a chave API ao seu arquivo `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

#### Passo 4: Verificar Domínio (Opcional mas Recomendado)

1. No dashboard do Resend, vá em **Domains**
2. Adicione seu domínio (ex: `regiaovulcanica.org.br`)
3. Configure os registros DNS conforme as instruções
4. Após verificação, atualize o `from` no arquivo `app/api/contact/route.ts`:

```typescript
from: "Contato Site <contato@regiaovulcanica.org.br>",
```

**Nota:** Sem verificar o domínio, você pode usar `onboarding@resend.dev` apenas para testes.

### Opção 2: Armazenar no Supabase (Sem Email)

Se você não quiser configurar um serviço de email agora, as mensagens podem ser armazenadas apenas no banco de dados do Supabase.

#### Passo 1: Criar Tabela no Supabase

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Vá em **SQL Editor**
3. Execute o seguinte SQL:

```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Opcional: Criar índice para buscas
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
```

#### Passo 2: Configurar Service Role Key

Adicione ao seu `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
```

As mensagens serão armazenadas no banco de dados e você poderá visualizá-las no Supabase Dashboard.

### Opção 3: Supabase Edge Functions (Avançado)

Para usar Supabase Edge Functions para enviar emails:

1. Crie uma Edge Function no Supabase
2. Configure um serviço de email (Resend, SendGrid, etc.) dentro da função
3. Atualize a API route para chamar a Edge Function

## 🔧 Como Funciona

1. **Usuário preenche o formulário** na página `/sobre/contato`
2. **Formulário envia dados** para `/api/contact`
3. **API route processa**:
   - Valida os dados
   - Tenta enviar email via Resend (se configurado)
   - Armazena no Supabase (se configurado)
   - Retorna sucesso ou erro

## 📧 Estrutura do Email

O email enviado contém:
- **Nome** do remetente
- **Email** do remetente (usado como reply-to)
- **Assunto** da mensagem
- **Mensagem** completa

O email é enviado para: `contato@regiaovulcanica.org.br`

## 🧪 Testando

1. Preencha o formulário de contato
2. Clique em "Enviar Mensagem"
3. Você deve ver uma notificação de sucesso
4. Verifique a caixa de entrada de `contato@regiaovulcanica.org.br`

## ⚠️ Troubleshooting

### Email não está sendo enviado

1. Verifique se `RESEND_API_KEY` está configurada corretamente
2. Verifique os logs do servidor para erros
3. Se usar domínio não verificado, use `onboarding@resend.dev` temporariamente

### Mensagens não estão sendo salvas no banco

1. Verifique se a tabela `contact_messages` existe no Supabase
2. Verifique se `SUPABASE_SERVICE_ROLE_KEY` está configurada
3. Verifique os logs do servidor para erros de banco de dados

### Erro 500 ao enviar formulário

1. Verifique todas as variáveis de ambiente
2. Verifique os logs do servidor
3. Certifique-se de que todas as dependências estão instaladas

## 📝 Notas Importantes

- O formulário funciona mesmo sem configuração de email (apenas armazena no banco)
- Recomendamos usar Resend para produção
- Sempre verifique seu domínio no Resend para melhor deliverability
- As mensagens são armazenadas no Supabase para histórico/backup

