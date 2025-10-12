# Frontend Style Guide - VisiteRV

## Paleta de Cores

### Cores Principais
- **Main Color**: `#415a3f` (Verde escuro)
- **Background**: `#e9e9e9` (Cinza claro)
- **Foreground**: `#171717` (Preto escuro)

### Cores de Texto
- **Título**: `text-gray-800` ou `font-semibold`
- **Subtítulo**: `text-gray-500`
- **Muted**: `text-gray-400`

### Cores de Fundo
- **Card**: `bg-white`
- **Service Icons**: `bg-gray-100`
- **Hover States**: `hover:bg-gray-50`

## Tipografia

### Fontes
- **Família**: Arial, Helvetica, sans-serif
- **Títulos**: `font-bold text-xl` ou `font-semibold text-lg`
- **Texto Normal**: `text-base`
- **Texto Pequeno**: `text-sm`

### Tamanhos
- **H1**: `text-2xl font-bold`
- **H2**: `text-xl font-bold`
- **H3**: `text-lg font-semibold`
- **Body**: `text-base`
- **Small**: `text-sm`

## Espaçamentos

### Gaps
- **Entre elementos**: `gap-3`, `gap-4`, `gap-6`
- **Entre seções**: `gap-8`
- **Entre cards**: `gap-4` ou `gap-6`

### Padding
- **Cards**: `p-4`
- **Botões**: `px-4 py-2`
- **Inputs**: `px-3 py-2`

### Margins
- **Seções**: `mb-6`, `mb-8`
- **Elementos**: `mt-4`, `mt-6`

## Componentes

### Cards
```css
.className="bg-white rounded-2xl shadow-lg overflow-hidden"
```

### Botões
- **Primário**: `bg-[var(--main-color)] text-white`
- **Secundário**: `bg-white border border-gray-300`
- **Hover**: `hover:-translate-y-1 transition-all ease-in-out duration-300`

### Ícones
- **Tamanho**: `w-4 h-4` ou `w-3 h-3`
- **Cor**: `text-[var(--main-color)]` ou `text-gray-500`

## Layouts

### Grid
- **Mobile**: `grid-cols-1`
- **Tablet**: `md:grid-cols-2`
- **Desktop**: `lg:grid-cols-3`

### Flex
- **Horizontal**: `flex-row`
- **Vertical**: `flex-col`
- **Responsivo**: `flex-col sm:flex-row`

## Animações

### Transições
- **Hover**: `hover:-translate-y-1 transition-all ease-in-out duration-300`
- **Fade**: `transition-opacity duration-300`
- **Scale**: `hover:scale-105 transition-transform duration-200`

### Durações
- **Rápida**: `duration-200`
- **Normal**: `duration-300`
- **Lenta**: `duration-500`

## Responsividade

### Breakpoints
- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`

### Classes Responsivas
- **Mobile First**: `w-full sm:w-auto`
- **Hide/Show**: `hidden sm:block`
- **Flex Direction**: `flex-col sm:flex-row`

---

## MAIN (Público)

### Características
- **Background**: Imagem de grãos de café
- **Cards**: Fundo branco com sombra
- **Hero Section**: Gradiente com overlay
- **Cores**: Verde principal (#415a3f)

### Componentes Específicos
- **SuggestionItem**: Cards com imagem, título, localização e serviços
- **Carousel**: Navegação horizontal responsiva
- **Search**: Botão circular no mobile, barra no desktop

### Estilo de Cards
```css
bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all ease-in-out duration-300
```

---

## DASHBOARD (Admin)

### Características
- **Background**: Cinza claro (#e9e9e9)
- **Layout**: Sidebar + conteúdo principal
- **Cards**: Fundo branco com bordas sutis
- **Cores**: Verde principal (#415a3f)

### Componentes Específicos
- **Formulários**: Inputs com bordas cinzas
- **Tabelas**: Listas em grid responsivo
- **Botões**: Estilo consistente com hover states

### Estilo de Formulários
```css
border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]
```

---

## Regras Gerais

1. **Consistência**: Use sempre as mesmas cores e espaçamentos
2. **Responsividade**: Mobile-first approach
3. **Acessibilidade**: Contraste adequado e hover states
4. **Performance**: Transições suaves mas não excessivas
5. **Hierarquia**: Títulos maiores, textos menores
6. **Espaçamento**: Use o sistema de grid do Tailwind
7. **Cores**: Prefira `var(--main-color)` ao invés de hex direto
8. **Sombras**: `shadow-lg` para cards, `shadow-sm` para elementos pequenos

## Padrões de Nomenclatura

### Classes CSS
- **Layout**: `flex`, `grid`, `w-full`, `h-full`
- **Espaçamento**: `p-4`, `m-2`, `gap-3`
- **Cores**: `bg-white`, `text-gray-800`
- **Responsividade**: `sm:`, `md:`, `lg:`

### Componentes
- **PascalCase**: `SuggestionItem`, `CreateMemberButton`
- **Props**: `camelCase`: `imageUrl`, `onClick`
- **Classes**: `kebab-case` ou Tailwind padrão
