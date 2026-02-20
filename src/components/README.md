# Components

Regra de ouro: **se não precisa de interatividade no browser, use `.astro`.**

## 📁 Estrutura

```
components/
  layout/         ← Partes do layout (sem JS bundle)
  islands/        ← Componentes React com hydration (JS no browser)
  ui/             ← Componentes de interface reutilizáveis
```

---

## 🏗️ layout/ — Astro puro

Componentes que fazem parte da estrutura da página. Zero JS no bundle.
Renderizados completamente no servidor/build time.

| Arquivo | Responsabilidade |
|---|---|
| `NavBar.astro` | Navegação principal, seletor de modo, theme/language toggles |
| `LanguageToggle.astro` | Dropdown de seleção de idioma |

### Quando adicionar aqui
- Cabeçalhos, rodapés, sidebars
- Menus de navegação
- Qualquer bloco de conteúdo sem estado (`useState`, `useEffect`)

---

## 🏝️ islands/ — React com hydration

Componentes que **precisam rodar no browser** — animações, estado local,
manipulação do DOM após load. Use `client:load` ou `client:visible`.

| Arquivo | Modo | `client:*` | Por quê React |
|---|---|---|---|
| `Hero.tsx` | **todos** | `load` | GSAP animations + parallax no mousemove |
| `ThemeToggle.tsx` | todos | `load` | Lê/escreve `localStorage` |
| `SplineViewer.tsx` | **fullstack only** | `load` | `@splinetool/react-spline` + MutationObserver |
| `ThemeToggle.content.ts` | — | — | Config de conteúdo intlayer para ThemeToggle |

> [!IMPORTANT]
> **SplineViewer é exclusivo do modo Fullstack.**
> O fundo 3D interativo (Spline) representa o universo "fullstack" — todos os mundos.
> Outros modos terão seus próprios backgrounds quando implementados.

### Quando adicionar aqui
- Animações com GSAP/Framer Motion que dependem do DOM
- Componentes com `useState` / `useEffect`
- Acesso a APIs do browser (`localStorage`, `window`, `navigator`)
- Bibliotecas que não funcionam em SSR

---

## 🎨 ui/ — Componentes de Interface

Componentes reutilizáveis de interface. **Preferir `.astro`**, usar React só se
precisar de interatividade.

| Arquivo | Tipo | Descrição |
|---|---|---|
| `PoC.astro` | Astro | Seção de prova de conceito do intlayer |
| `projects.content.ts` | TS | Config de conteúdo intlayer para projetos |

---

## ⚖️ Decisão: Astro vs React

```
Precisa de useState / useEffect / window / DOM events?
├── sim → components/islands/   (.tsx)
└── não → components/layout/ ou components/ui/   (.astro)
```

### Exemplos concretos

| Componente | Por quê Astro | Por quê React |
|---|---|---|
| `NavBar` | Links estáticos, classes calculadas em build time | — |
| `LanguageToggle` | Dropdown sem estado (CSS/HTML nativo) | — |
| `Hero` | — | GSAP `useLayoutEffect`, mousemove listener |
| `ThemeToggle` | — | `localStorage` + re-render no click |
| `SplineViewer` | — | SDK Spline só funciona no browser |

---

## 🔗 Aliases de import

```ts
import NavBar      from "@layout/NavBar.astro";
import Hero        from "@islands/Hero";
import ThemeToggle from "@islands/ThemeToggle";
import PoC         from "@ui/PoC.astro";
```
