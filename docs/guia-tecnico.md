## Guia Técnico — Visite a Região Vulcânica

Este guia explica, em linguagem direta, como o projeto funciona por dentro, como está organizado e como rodar, manter e ampliar o sistema.

### O que é este projeto
- É um site feito com Next.js (framework para React) que mostra informações da Região Vulcânica.
- Tem área pública (qualquer pessoa vê) e área logada (dashboard) para gerenciar conteúdo.
- O login e os dados são guardados no Supabase (um serviço que oferece autenticação e banco de dados).

### Como o site funciona (resumo rápido)
1) Você abre o site e vê páginas públicas (home, busca, páginas “sobre”).
2) Se quiser gerenciar conteúdo, faz login. O sistema usa o Supabase para autenticar e manter sua sessão (você continua logado enquanto navega).
3) Na área logada (dashboard), você pode cadastrar e editar informações (ex.: seus locais).
4) As imagens podem ficar no armazenamento do Supabase e o Next.js já está preparado para exibi-las.

### O que usamos (as principais ferramentas)
- Next.js + React: para construir as páginas do site.
- Supabase: para login (autenticação) e acesso aos dados.
- Tailwind CSS: para os estilos.
- Bibliotecas de componentes (shadcn/ui, Radix, HeroUI): para botões, inputs, janelas modais, etc.

### Como rodar o projeto
1) Instale dependências: `yarn`
2) Crie um arquivo `.env.local` com:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://kdwpecddwtaczhoorylb.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
   eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkd3BlY2Rkd3RhY3pob29yeWxiIiwicm9sZSI6ImFub24iLCJpYXQ
   iOjE3NDgzNTA2MzQsImV4cCI6MjA2MzkyNjYzNH0.jOwIBjIqWGi8TnFz2mWW3m82nCg_ah2s36uM-jIT3WY
   ```
3) Rode em desenvolvimento: `yarn dev` (abre em `http://localhost:3000`)
4) Para gerar build de produção: `yarn build`
5) Para iniciar em produção (após build): `yarn start`

Dica: sem as variáveis acima, o login pode não funcionar corretamente.

### Organização das pastas (o que tem e para que serve)
- `app/`
  - `(main)/`: páginas abertas ao público, como a página inicial, busca e “sobre”.
  - `(auth)/auth/`: telas de autenticação (login, cadastro, recuperar/alterar senha).
  - `(dashboard)/dashboard/`: área do usuário logado (cadastrar, editar, perfil, etc.).
- `components/`: peças visuais reutilizáveis (botões, formulários, carrossel de imagens, navbar...).
- `lib/`
  - `supabase/`: conexão com o Supabase e o controle da sessão (login) no servidor e no navegador.
  - `utils.ts`: funções de utilidade (ex.: juntar classes CSS).
- `model/`: tipos/formatos dos dados usados no projeto (ex.: `Location`, `Member`).
- `service/`: funções que buscam e guardam dados (ligação com o backend/Supabase).
- `public/`: imagens e arquivos estáticos.
- Arquivos de configuração: `next.config.ts` (imagens externas), `tailwind.config.ts` (estilos), `tsconfig.json` (TypeScript).

### Como funciona o login e a segurança
- Ao entrar, o usuário faz login pela página em `app/(auth)/auth/`.
- O projeto usa um “middleware” (um guardinha de portaria) que verifica se o usuário está logado antes de acessar páginas privadas. Se não estiver, ele manda para a tela de login.
- A sessão (estado de logado) é mantida com cookies seguros. Isso evita que o usuário precise logar toda hora.
- No servidor, usamos uma conexão do Supabase que entende os cookies; no navegador, usamos outra conexão feita para a parte visual.

Caminho prático:
- Middleware: `middleware.ts` (raiz) chama `lib/supabase/middleware.ts` para manter a sessão.
- Cliente do navegador (para ações do usuário): `lib/supabase/client.ts`.
- Cliente do servidor (para leitura segura no SSR/Server Actions): `lib/supabase/server.ts`.

### Imagens e desempenho
- O arquivo `next.config.ts` já permite carregar imagens do armazenamento do Supabase (domínios autorizados).
- Sempre que possível, use o componente `next/image` para melhor desempenho.

### Padrões que seguimos
- TypeScript em todo o projeto (mais segurança e previsibilidade).
- Componentes reutilizáveis, nomes claros e funções que fazem uma coisa bem feita.
- Tailwind para estilos rápidos e padronizados.
- Serviços em `service/` para centralizar acesso a dados.

### Como ampliar o projeto
- Nova página pública: crie em `app/(main)/` e, se precisar, crie componentes em `components/main/`.
- Nova página privada (apenas para logados): crie em `app/(dashboard)/dashboard/` e componentes em `components/dashboard/`.
- Novos dados (modelos): adicione o tipo em `model/` e funções em `service/` para criar/editar/buscar.
- Precisou de dados no servidor (com sessão do usuário)? Use `lib/supabase/server.ts`.
- Precisou de dados direto no navegador (interações da página)? Use `lib/supabase/client.ts`.

### Problemas comuns e como resolver
- Não consigo logar: confira se `.env.local` está preenchido e se o Supabase está com as chaves corretas.
- Página privada redireciona para login: pode ser sessão expirada ou variável de ambiente ausente.
- Imagem não aparece: verifique se a URL é pública/assinada e se o domínio está liberado em `next.config.ts`.
- Estilos estranhos: confirme se o `tailwind.config.ts` está varrendo as pastas corretas (já está configurado para `app`, `components`, etc.).

### Publicar (deploy)
- Recomendado usar Vercel.
- Configure as variáveis de ambiente no painel da Vercel: `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY`.
- Faça o build (`yarn build`) e publique. O Next.js já sabe lidar com as imagens do Supabase.


## Banco de dados