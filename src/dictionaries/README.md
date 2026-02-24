# i18n — Internacionalização e Estrutura de Conteúdo

Este diretório é a **fonte da verdade** de todo o conteúdo traduzível do portfólio.
O conteúdo vive aqui como JSON puro — desacoplado de TypeScript, frameworks e CMSs.

---

## Filosofia

| Princípio | Decisão |
|---|---|
| Fonte da verdade | JSON por locale em `src/dictionaries/` |
| Roteamento i18n | Astro nativo (`/[locale]/...`) |
| Tradução automática | `npx intlayer fill` (preenche línguas faltantes via IA) |
| Componentes | Recebem locale como prop, leem JSON via `getTranslations` |
| Build | 100% estático — sem requisições em runtime |

---

## Estrutura de pastas

```
src/dictionaries/
  nav/                ← key = "nav"
    en.json
    pt.json
    fr.json           ← gerado por `intlayer fill`
    es.json
    zh.json
    ja.json
    en-GB.json
  theme/              ← key = "theme"
    en.json
    pt.json
    ...
  fullstack-hero/     ← key = "fullstack-hero"  ← hífen, NUNCA barra
    en.json
    pt.json
    ...
```

> [!IMPORTANT]
> O **key do intlayer é o nome da pasta** diretamente dentro de `src/dictionaries/`.
> Use **hífen** para separar conceitos compostos (ex: `fullstack-hero`).
> **NUNCA use barras/subpastas** como chave — o intlayer não cria subdiretórios
> em `.intlayer/dictionary/` e vai falhar com ENOENT.

---

## Formato do JSON

Cada arquivo é **um único locale**, com chaves flat:

```json
// src/dictionaries/nav/pt.json
{
  "title": "Portfólio Multiverso",
  "audio": "Alternar Áudio",
  "fullstack": "Fullstack",
  "frontend": "Frontend"
}
```

---

## Como usar nos componentes

### Astro (build-time, zero JS)

```astro
---
import { getTranslations } from '../i18n/index';
import { getLangFromUrl } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);

// key = nome da pasta em src/dictionaries/
const nav = await getTranslations(lang, 'nav');
---

<span>{nav.title}</span>
<a href="...">{nav.fullstack}</a>
```

### React (recebe como prop do Astro pai)

```astro
<!-- No .astro pai -->
const hero = await getTranslations(lang, 'fullstack-hero');
<HeroComponent bio={hero.bio} role={hero.role} />
```

```tsx
// No componente React — só strings, sem hook de runtime
const HeroComponent = ({ bio, role }: { bio: string; role: string }) => (
  <section>
    <h1>{role}</h1>
    <p>{bio}</p>
  </section>
);
```

---

## Workflow de traduções

```bash
# 1. Criar/editar o arquivo base (sempre em inglês)
#    src/dictionaries/nav/en.json

# 2. Construir os dicionários intlayer (verifica estrutura)
npx intlayer build

# 3. Preencher traduções faltantes via IA (requer OPENAI_API_KEY no .env)
npx intlayer fill

# 4. (Opcional) Sincronizar com o CMS do intlayer
npx intlayer push   # envia para o CMS
npx intlayer pull   # baixa do CMS

# 5. Verificar o que foi descoberto
npx intlayer content list   # lista arquivos .content.ts (locais)
npx intlayer build          # mostra "Plugin content: N/N" — este é o nosso número
```

> [!NOTE]
> `intlayer content list` conta apenas arquivos `.content.ts` locais — retorna 0,
> pois usamos só JSON. O número real está em **"Plugin content: N/N"** no `intlayer build`.

---

## Adicionar um novo namespace

1. Criar a pasta e o arquivo base inglês:
   ```bash
   mkdir src/dictionaries/fullstack-hero
   # criar src/dictionaries/fullstack-hero/en.json
   ```
2. Rodar `npx intlayer build` — deve aparecer no "Plugin content"
3. Rodar `npx intlayer fill` para preencher os outros locales
4. Usar com `getTranslations(lang, 'fullstack-hero')` no componente

---

## Locales suportados

| Código | Idioma |
|---|---|
| `en` | English (base, obrigatório) |
| `pt` | Português |
| `fr` | Français |
| `es` | Español |
| `zh` | 中文 |
| `ja` | 日本語 |
| `en-GB` | English (UK) |
