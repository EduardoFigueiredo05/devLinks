# AGENTS.md

Instruções para agentes de programação com IA (Claude Code, Codex, Cursor, GitHub Copilot e similares) que trabalham neste repositório.

## Visão geral

**DevLinks** é uma página de links pessoais baseada no layout DevLinks do Figma.

- **Stack:** React 19 + Vite 7 + Tailwind CSS 4 (plugin `@tailwindcss/vite`) + Playwright
- **Linguagem:** JavaScript (JSX), ES Modules. **Não** usar TypeScript.
- **Idioma:** textos da interface, comentários e mensagens de commit em **português do Brasil**.
- **Sem dependências extras** sem justificativa. Ícones são SVG inline em `src/components/SocialIcon.jsx` e `ThemeToggle.jsx`.

## Comandos

| Ação | Comando |
| --- | --- |
| Instalar dependências | `npm install` |
| Servidor de desenvolvimento | `npm run dev` → http://localhost:5173 |
| Build de produção | `npm run build` |
| Testes E2E | `npm run test:e2e` |
| Instalar navegador dos testes | `npx playwright install chromium` |

Antes de dar uma tarefa como concluída: **`npm run build` e `npm run test:e2e` precisam passar.**

## Arquitetura

```
src/
├── components/   # Componentes visuais, um por arquivo, export default
├── context/      # ThemeContext (Provider do tema)
├── hooks/        # useLocalStorage, useTheme
├── data/         # profile.js — único lugar com conteúdo (nome, links, redes)
├── App.jsx       # Monta a página com os componentes
└── index.css     # Tailwind + @custom-variant dark
tests/            # Testes Playwright (*.spec.js)
```

### Regras

1. **Componentes reutilizáveis com Props.** Nenhum componente deve ter texto, URL ou nome de usuário fixo. Esses dados vêm de `src/data/profile.js` e chegam por props.
2. **Um componente por arquivo**, nome em PascalCase, `export default function Nome(props)`. Documentar as props com JSDoc acima da função.
3. **Hooks** ficam em `src/hooks/`, com nome começando por `use`. Lógica de estado não fica dentro de componentes visuais quando pode ser um hook.
4. **Tema:**
   - O estado do tema fica **somente** no `ThemeContext`. Para ler ou alterar, use `useTheme()`.
   - Valores válidos: `'light'` e `'dark'`.
   - Chave no localStorage: **`devlinks:theme`** (o valor é salvo em JSON, ex.: `"dark"`). Ela também aparece no script inline do `index.html`; se mudar, mude nos dois lugares e nos testes.
   - O tema é aplicado pela classe `dark` no `<html>`. Estilos de tema escuro usam o prefixo `dark:` do Tailwind.
5. **Estilo:** apenas classes utilitárias do Tailwind. Não criar arquivos CSS por componente nem usar `style={}`, exceto quando inevitável.
   - **Tailwind 4:** não existe `tailwind.config.js`. A configuração fica no CSS (`@theme`, `@custom-variant`). Não criar arquivo de config nem usar `darkMode: 'class'`.
6. **Acessibilidade:** todo link com ícone precisa de `aria-label`. O switch de tema usa `role="switch"` + `aria-checked`. Manter `focus-visible:ring-*` em elementos clicáveis.
7. **Links externos** sempre com `target="_blank"` e `rel="noopener noreferrer"`.

## Fidelidade ao layout (Figma)

- Coluna central com largura máxima de ~360px, conteúdo centralizado.
- Ordem: avatar com borda em gradiente (roxo → azul) → `@usuário` → switch de tema → 4 botões de link → ícones sociais → rodapé "Feito com ♥ por ...".
- **Escuro:** fundo quase preto (`zinc-950`) com manchas desfocadas roxas, magenta e azul petróleo. Botões translúcidos com borda `white/20`.
- **Claro:** fundo branco com manchas lilás e rosa. Botões translúcidos claros com borda `zinc-900/10`.
- Switch: no escuro, a bolinha fica à **esquerda** com ícone de lua; no claro, à **direita** com ícone de sol.
- Precisa funcionar bem de 320px (mobile) até desktop, sem rolagem horizontal.

## Testes

- Ficam em `tests/*.spec.js` e rodam nos projetos `desktop-chromium` e `mobile-chromium` (veja `playwright.config.js`). O `webServer` sobe o Vite sozinho.
- Use seletores por papel/acessibilidade (`getByRole`, `getByLabel`) ou `data-testid`. Evite seletores por classe CSS.
- `data-testid` existentes: `theme-toggle`, `username`.
- Toda funcionalidade nova precisa de um teste. Ao mexer no tema, mantenha os testes de persistência no localStorage funcionando.
- Para testar o tema inicial, use `page.emulateMedia({ colorScheme: 'dark' | 'light' })`.

## Ferramentas MCP

Configuradas em `.mcp.json` e `.vscode/mcp.json`.

### Context7 (documentação)

**Antes de escrever código que use uma API de React, Vite, Tailwind ou Playwright, consulte o Context7** para usar a sintaxe da versão instalada. Isso é importante principalmente para o Tailwind 4, que mudou muito em relação ao 3.

Fluxo: `resolve-library-id` (ex.: "tailwindcss") → `get-library-docs` com o tópico (ex.: "dark mode custom variant").

Bibliotecas a consultar: `react`, `vite`, `tailwindcss`, `@playwright/test`.

### Playwright MCP (navegador)

Use para validar o visual e o comportamento depois de alterar algo:

1. `npm run dev` (em segundo plano)
2. Navegar até `http://localhost:5173`
3. Tirar screenshot nos dois temas, em desktop (1280px) e mobile (390px)
4. Clicar no switch, recarregar e confirmar que o tema foi mantido
5. Comparar com o layout do Figma descrito acima

## O que não fazer

- Não adicionar roteamento, gerenciador de estado global (Redux, Zustand) nem biblioteca de componentes. O projeto é intencionalmente pequeno.
- Não trocar React/Vite/Tailwind/Playwright por alternativas.
- Não colocar dados pessoais reais ou credenciais no repositório.
- Não editar `node_modules/`, `dist/`, `playwright-report/` ou `test-results/`.
- Não remover nem desativar testes para fazê-los passar.
