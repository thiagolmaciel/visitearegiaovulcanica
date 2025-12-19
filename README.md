# Visite a Região Vulcânica

Plataforma digital desenvolvida para promover e divulgar os atrativos turísticos da Região Vulcânica, conectando visitantes a agriturismos, experiências sustentáveis e eventos locais.

## 📋 Sobre o Projeto

A iniciativa da plataforma **Visite a Região Vulcânica** nasce no âmbito do **Programa Institucional de Apoio a Ações de Extensão do IFSP**. O projeto tem como objetivo unir tecnologia e sustentabilidade para fortalecer o turismo local, valorizando a região vulcânica e promovendo experiências que respeitem o meio ambiente e a cultura regional.

### Equipe Responsável

- **Coordenador**: Prof. João Paulo Pereira
- **Desenvolvedor**: Thiago Laranjeira Maciel (IFSP - Campus São João da Boa Vista)

## 🚀 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org)** - Framework React com App Router
- **[Supabase](https://supabase.com)** - Backend como serviço (autenticação e banco de dados)
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utilitário
- **[TypeScript](https://www.typescriptlang.org)** - Tipagem estática
- **[shadcn/ui](https://ui.shadcn.com)** - Componentes UI
- **[Radix UI](https://www.radix-ui.com)** - Componentes acessíveis
- **[Embla Carousel](https://www.embla-carousel.com)** - Carrossel de imagens

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- Yarn ou npm
- Conta no Supabase (para banco de dados e autenticação)

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositório>
   cd visitearegiaovulcanica
   ```

2. **Instale as dependências**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://kdwpecddwtaczhoorylb.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
   ```

   > **Nota**: As chaves do Supabase podem ser encontradas nas configurações da API do seu projeto no [dashboard do Supabase](https://supabase.com/dashboard).

4. **Execute o servidor de desenvolvimento**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

   O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
visitearegiaovulcanica/
├── app/                          # Rotas e páginas (App Router)
│   ├── (main)/                   # Páginas públicas
│   │   ├── page.tsx              # Página inicial
│   │   ├── busca/                # Página de busca
│   │   ├── sobre/                # Páginas sobre o projeto
│   │   └── afiliados/            # Páginas de afiliados
│   ├── (auth)/                   # Autenticação
│   ├── (dashboard)/               # Dashboard do usuário
│   └── (admin)/                  # Área administrativa
├── components/                   # Componentes React
│   ├── main/                     # Componentes da área pública
│   ├── dashboard/                # Componentes do dashboard
│   ├── admin/                    # Componentes administrativos
│   └── ui/                       # Componentes UI reutilizáveis
├── lib/                          # Bibliotecas e utilitários
│   ├── supabase/                 # Configuração do Supabase
│   └── utils.ts                  # Funções utilitárias
├── service/                      # Serviços de dados
│   ├── memberServices.tsx        # Serviços de membros/locais
│   ├── eventServices.tsx         # Serviços de eventos
│   └── ...
├── model/                        # Modelos de dados (TypeScript)
├── public/                       # Arquivos estáticos
└── docs/                         # Documentação adicional
```

## 🎯 Funcionalidades Principais

### Área Pública
- **Página inicial** com busca e destaque de locais
- **Busca avançada** por locais, serviços e cidades
- **Carrossel de eventos** ativos
- **Páginas informativas** sobre o projeto
- **Perfis de afiliados** com informações detalhadas

### Área do Usuário (Dashboard)
- Cadastro e edição de agriturismos/locais
- Gerenciamento de imagens
- Edição de perfil
- Visualização de estatísticas pessoais

### Área Administrativa
- Gerenciamento de usuários
- Gerenciamento de locais
- Gerenciamento de eventos
- Estatísticas do sistema

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev          # Inicia servidor de desenvolvimento

# Produção
yarn build        # Cria build de produção
yarn start        # Inicia servidor de produção

# Qualidade de código
yarn lint         # Executa o linter
```

## 📚 Documentação Adicional

- [Guia Técnico](./docs/guia-tecnico.md) - Documentação técnica detalhada
- [Guia de Estilo Frontend](./FRONTEND_STYLE_GUIDE.md) - Padrões de design e UI

## 🤝 Contribuindo

Este é um projeto acadêmico desenvolvido no âmbito do IFSP. Para contribuições, entre em contato com a equipe responsável.

## 📄 Licença

Este projeto é desenvolvido para fins acadêmicos e de extensão.

## 📧 Contato

- **Email**: contato@regiaovulcanica.org.br
- **Telefone**: +55 (35) 99819 6519
- **Website**: [regiaovulcanica.org.br](https://regiaovulcanica.org.br)

---

Desenvolvido com ❤️ para promover a Região Vulcânica
