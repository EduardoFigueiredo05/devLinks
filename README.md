# DevLinks

Projeto acadêmico desenvolvido com apoio de um agente de programação com IA. As instruções que o agente segue estão no arquivo [`AGENTS.md`](./AGENTS.md).

---

## Funcionalidades

- Perfil com foto (borda em gradiente) e nome de usuário
- Botão de alternância de tema (switch) **claro / escuro**
- Tema salvo no **localStorage** e mantido ao recarregar a página
- Na primeira visita, o tema segue a preferência do sistema (`prefers-color-scheme`)
- Script no `index.html` que aplica o tema antes do React carregar, para a página não "piscar" no tema errado
- Lista de links com efeito de vidro (*glassmorphism*)
- Ícones de redes sociais (GitHub, Instagram, YouTube, LinkedIn)
- Fundo com gradientes desfocados, com cores diferentes em cada tema
- Layout responsivo (desktop e mobile)
- Acessibilidade: `role="switch"`, `aria-checked`, `aria-label` e foco visível pelo teclado

## Tecnologias

| Ferramenta | Uso |
| --- | --- |
| [React 19](https://react.dev) | Interface com componentes, Props e Hooks |
| [Vite 7](https://vite.dev) | Servidor de desenvolvimento e build |
| [Tailwind CSS 4](https://tailwindcss.com) | Estilização (plugin `@tailwindcss/vite`) |
| [Playwright](https://playwright.dev) | Testes end-to-end (desktop e mobile) |
| [Context7 MCP](https://github.com/upstash/context7) | Documentação atualizada das bibliotecas para o agente de IA |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Permite que o agente abra e teste a página no navegador |

## Como rodar

Pré-requisito: **Node.js 20.19+** (ou 22+).

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar em modo de desenvolvimento
npm run dev
# Acesse http://localhost:5173

# 3. Gerar a versão de produção
npm run build
npm run preview
```

## Testes (Playwright)

```bash
# Na primeira vez, baixe o navegador usado nos testes
npx playwright install chromium

# Rodar todos os testes (o servidor do Vite sobe sozinho)
npm run test:e2e

# Modo visual/interativo
npm run test:e2e:ui

# Ver o relatório HTML do último teste
npx playwright show-report
```

Os testes rodam em dois perfis: **desktop-chromium** e **mobile-chromium** (Pixel 7). Eles verificam:

1. Perfil, os 4 links, as redes sociais e o rodapé aparecem na tela
2. Links externos abrem em nova aba com `rel="noopener noreferrer"`
3. Com o sistema em modo escuro, a página inicia no tema escuro
4. O switch alterna entre claro e escuro
5. A preferência é salva no `localStorage` e mantida depois de recarregar
6. Um valor inválido no `localStorage` é ignorado
7. A página não tem rolagem horizontal (responsividade)

## Estrutura do projeto

```
devLinks/
├── public/
│   └── avatar.svg              # Foto de perfil (substitua pela sua)
├── src/
│   ├── components/
│   │   ├── Background.jsx      # Gradientes do fundo
│   │   ├── Footer.jsx          # "Feito com ♥ por ..."
│   │   ├── LinkButton.jsx      # Botão de link reutilizável
│   │   ├── LinkList.jsx        # Lista de LinkButton
│   │   ├── Profile.jsx         # Avatar + @usuário
│   │   ├── SocialIcon.jsx      # Ícones SVG das redes
│   │   ├── SocialLinks.jsx     # Linha de ícones sociais
│   │   └── ThemeToggle.jsx     # Switch claro/escuro
│   ├── context/
│   │   └── ThemeContext.jsx    # Provider do tema (Context API)
│   ├── hooks/
│   │   ├── useLocalStorage.js  # useState com persistência
│   │   └── useTheme.js         # Acesso ao tema
│   ├── data/
│   │   └── profile.js          # Dados editáveis (nome, links, redes)
│   ├── App.jsx
│   ├── index.css               # Tailwind + variante dark por classe
│   └── main.jsx
├── tests/
│   └── devlinks.spec.js        # Testes Playwright
├── mcp-config/
│   ├── mcp.json                # MCPs (Context7 + Playwright) → copiar para .mcp.json
│   └── vscode-mcp.json         # MCPs para o Copilot → copiar para .vscode/mcp.json
├── AGENTS.md                   # Instruções para o agente de IA
├── index.html
├── package.json
├── playwright.config.js
└── vite.config.js
```

## Conceitos de React aplicados

### Componentes reutilizáveis e Props

Cada parte da tela é um componente que recebe os dados por **props**, sem textos fixos no código:

```jsx
<Profile avatar={profile.avatar} alt={profile.avatarAlt} username={profile.username} />
<LinkList links={links} />
<SocialLinks items={socials} />
<Footer author={footer.author} />
```

O `LinkButton` é usado para todos os links. Para adicionar um botão novo, basta incluir um item no array `links` em `src/data/profile.js`.

### Hooks

- **`useState`** / **`useEffect`**: dentro de `useLocalStorage`, guardam o valor e o salvam sempre que ele muda.
- **`useContext`**: `useTheme` lê o tema de qualquer componente sem passar props por vários níveis.
- **`useCallback`** / **`useMemo`**: evitam recriar a função `toggleTheme` e o objeto do contexto a cada renderização.
- **Hooks personalizados**: `useLocalStorage` (genérico, serve para qualquer valor) e `useTheme`.

### Tema claro/escuro + localStorage

1. `ThemeProvider` lê o valor salvo na chave `devlinks:theme`. Se não houver nada, usa a preferência do sistema.
2. Quando o tema muda, um `useEffect` coloca ou retira a classe `dark` no `<html>`.
3. No Tailwind 4, a variante `dark:` foi configurada para seguir essa classe:
   ```css
   @custom-variant dark (&:where(.dark, .dark *));
   ```
4. `useLocalStorage` salva o novo valor automaticamente.

## Personalização

Edite **`src/data/profile.js`**:

```js
export const profile = { username: '@seu.perfil', avatar: '/avatar.svg', avatarAlt: 'Foto de perfil' }
export const links = [{ id: 'ebook', label: 'Baixe meu e-book', href: 'https://...' }, /* ... */]
export const socials = [{ network: 'github', label: 'GitHub', href: 'https://github.com/...' }, /* ... */]
export const footer = { author: 'seu nome' }
```

## Uso de IA no desenvolvimento

O projeto foi desenvolvido com um agente de programação com IA, que seguiu as regras do [`AGENTS.md`](./AGENTS.md). Dois servidores MCP foram usados:

- **Context7**: consulta a documentação atual do React 19, Tailwind 4, Vite 7 e Playwright. Assim o agente não usa APIs antigas (por exemplo, o `tailwind.config.js` com `darkMode: 'class'` do Tailwind 3).
- **Playwright MCP**: permite que o agente abra a página no navegador, clique no switch e confira o resultado visual.
