# Constitución — apps/bandu

> Versión 1.0 | Última actualización: cycle-0 (adopción SDD de una app preexistente)
> Fuente de verdad técnica del subproyecto. Contexto vigente = este archivo + `updates/*.md` en orden de nombre.

> ⚠ **Repo standalone:** el código de esta app vive en la **raíz del repositorio**, no en `apps/bandu/`. El identificador `apps/bandu` es la convención con la que los registros SDD (global.json, specs, ciclos) refieren a este único subproyecto lógico.

> ⚠ **Sin Nx:** este repo no tiene `nx.json` ni `pnpm-workspace.yaml` **por decisión**, no por omisión. La skill `init-nx-workspace` que menciona el `CLAUDE.md` del arnés **no se ejecuta acá**: convertiría un sitio de una sola app en un monorepo sin beneficio. No correr `nx` ni sus generadores.

## 1. Propósito

- **Tipo:** react (SPA estática)
- **Negocio:** Bandurria Gráfica y Deco — imprenta en Montenegro 133, Chacarita, CABA. Dominio de producción: `bandurriadeco.com.ar`.
- **Rol en el sistema:** única app del repo y cara pública de la empresa. Presenta la propuesta de valor (quiénes somos, tecnología, servicios, clientes, contacto) y hospeda el brochure comercial 2026 como pieza de venta navegable.
- **Audiencia:** clientes actuales y potenciales que llegan por buscadores, redes o link directo del equipo comercial.

## 2. Stack tecnológico

| Capa             | Elección                                                    | Nota                                                        |
| ---------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| UI               | React 19 (`react`, `react-dom`)                             | Function components + hooks; `StrictMode` activo            |
| Lenguaje         | TypeScript ~6.0                                             | Proyecto referenciado: `tsconfig.app.json` (`include: src`) |
| Build / dev      | Vite 8 + `@vitejs/plugin-react`                             | Salida estática en `dist/`                                  |
| Estilos          | Tailwind CSS 4 vía `@tailwindcss/vite`                      | **Sin** `tailwind.config.js`: todo en `src/index.css`        |
| Ruteo            | React Router 7 (`BrowserRouter`)                            | SPA: requiere rewrite del hosting (`public/_redirects`)     |
| Animación        | Framer Motion 12                                            | + keyframes CSS propios en `index.css`                      |
| Iconos           | `lucide-react` (solo en `BrochurePage`) y SVG inline        | La landing usa SVG inline, no lucide                        |
| Lint             | ESLint 10 + typescript-eslint + react-hooks + react-refresh | Flat config en `eslint.config.js`                           |

**No hay:** backend propio, base de datos, autenticación, estado global, capa de data fetching, i18n, ni runner de tests.

## 3. Estructura y patrones

```
index.html                 → shell HTML: SEO, Open Graph, favicons, JSON-LD (LocalBusiness + WebSite)
vite.config.ts             → react() + tailwindcss(), sin más configuración
src/
  main.tsx                 → createRoot + StrictMode + BrowserRouter
  App.tsx                  → <Routes>: "/" → LandingPage · "/brochure" → BrochurePage
  index.css                → @import tailwindcss + @theme (tokens) + keyframes + tema .light + reset
  pages/BrochurePage.tsx   → brochure 2026, página autocontenida (~1100 líneas)
  components/layout/       → Header.tsx · WhatsAppButton.tsx
  components/sections/     → Nosotros · Stats · Tecnologia · Servicios · ServiceCard · OffsetDigital · Clientes · Contacto
  components/ui/           → RevealOnScroll.tsx
  data/services.ts         → interface Service + SERVICES[] (9 servicios de la landing)
  hooks/useTheme.ts        → tema dark/light persistido en localStorage
  assets/                  → imágenes importadas por el bundler (logo-full.png, hero.png…)
public/                    → servido tal cual: favicons, site.webmanifest, robots.txt, sitemap.xml,
                             _redirects, img-0XX.jpg (fotos de producción), logos/ (marcas de clientes)
docs/                      → material fuente del brochure (PDF, brochure-assets/, plan.md)
tests/screenshots/         → capturas de verificación visual
```

### Patrones vigentes

1. **Sección = componente autónomo.** Cada bloque de la landing exporta por default su propia `<section>` con `id` de anclaje y `aria-label`. `App.tsx` solo los ordena dentro de `<main>`; no hay props de contenido entre secciones.
2. **Anclas como contrato de navegación.** Los `id` de sección (`nosotros`, `tecnologia`, `servicios`, `offset-digital`, `clientes`, `contacto`) son consumidos por `NAV_LINKS` en `Header.tsx` y por CTAs internos (`href="#contacto"`). Renombrar un `id` rompe la navegación: es un cambio de contrato.
3. **Tokens de color por CSS variables.** El JSX nunca hardcodea colores de tema: usa `bg-[var(--color-bg)]`, `text-[var(--color-text-muted)]`, etc. Los tokens se definen en `@theme` (dark, default) y se redefinen bajo `.light`. El único color literal aceptado es el verde de marca de WhatsApp (`#25D366`).
4. **Tema por clase en `<html>`.** `useTheme` agrega/quita la clase `light` en `document.documentElement` y persiste en `localStorage` (default: `dark`). Solo `LandingPage` lo consume y se lo pasa al `Header`; **`BrochurePage` no expone toggle de tema**.
5. **Animación en dos niveles.** Reveals simples → `<RevealOnScroll>` (`components/ui/`). Animaciones con variantes, stagger o scroll-linked → `motion.*` local a la sección, siempre con `viewport={{ once: true }}` y la curva compartida `EASE = [0.25, 0.46, 0.45, 0.94]`.
6. **Contenido declarado como constante tipada.** Los listados viven arriba del componente o en `src/data/`: `SERVICES` (`data/services.ts`), `CLIENTS`, `STATS`, `PRODUCTOS`, `FEATURES`, `CONTACT_INFO`, `NAV_LINKS`. El JSX solo mapea.
7. **Iconos como sub-componentes del archivo.** Los SVG inline (`PhoneIcon`, `ChevronLeft`, `WhatsAppIcon`…) se declaran como funciones privadas en el mismo archivo, con `aria-hidden="true"`.
8. **`BrochurePage` es deliberadamente autónoma.** Tiene su propio `SERVICES`, su `FadeUp`, su nav y su footer, independientes de la landing. Es una pieza de marketing con ciclo de vida propio: **no se refactoriza para "compartir" componentes con la landing** salvo que una spec lo pida explícitamente.

## 4. Convenciones propias

- **Naming:** un componente por archivo en `PascalCase.tsx` con `export default`; el único `export` nombrado es `RevealOnScroll`. Hooks en `useAlgo.ts` con export nombrado. Datos/tipos en `camelCase.ts`. Constantes de módulo en `SCREAMING_SNAKE_CASE`.
- **Estilos:** solo utilidades Tailwind en el JSX. Prohibido CSS-in-JS y archivos `.css` por componente; lo global (tokens, keyframes, reset, `prefers-reduced-motion`) va en `src/index.css`.
- **Assets:** si el bundler debe hashearlo/optimizarlo → `src/assets/` e importarlo. Si necesita URL estable (favicons, manifest, `logos/`, fotos `img-0XX.jpg`, material del brochure) → `public/` y referenciarlo por ruta absoluta.
- **Idioma:** copy de UI en español rioplatense ("Escribinos", "Pedí tu presupuesto"). Identificadores mezclan inglés y español siguiendo lo existente (`SERVICES`, `PRODUCTOS`, `handleSubmit`) — se respeta el archivo donde se está trabajando, no se unifica de oficio.
- **Accesibilidad (mínimo exigible):** `<section>` con `aria-label`, SVG decorativos con `aria-hidden`, links externos con `rel="noopener noreferrer"`, inputs con `<label>` asociado por `id`. `index.css` ya neutraliza animaciones bajo `prefers-reduced-motion` — ninguna animación nueva puede eludir esa regla.
- **SEO:** `index.html` (title, description, canonical, OG, Twitter, JSON-LD), `public/sitemap.xml` y `public/robots.txt` son parte del producto. **Toda ruta nueva obliga a sumar su `<url>` al sitemap** dentro del mismo ciclo.
- **Verificación:** no hay tests unitarios ni e2e. La barrera mínima es `pnpm lint` + `pnpm build` (el `tsc -b` typea todo `src/`) y revisión visual; las capturas van a `tests/screenshots/`.
- **Dependencias:** superficie chica a propósito (5 dependencias de runtime). Sumar una requiere justificación explícita en la spec del ciclo.
- **Límites:** subproyecto único, sin dependencias internas. Ninguna feature puede requerir un servidor propio; si necesita datos externos, el servicio de terceros se declara en la spec.

## 5. Deuda conocida (estado al adoptar SDD — no son reglas, son hechos a corregir vía spec o fix)

1. **`tsconfig.app.json` no tiene `strict: true`.** Solo están activos `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` y `noFallthroughCasesInSwitch`. Activar `strict` es un cambio con impacto: candidato a spec propia, no a cambio al pasar.
2. **El formulario de `Contacto.tsx` no envía nada.** `handleSubmit` simula con `setTimeout(900)` y muestra éxito. Los mensajes del usuario **se pierden**: es el gap funcional más grande del sitio.
3. **Imágenes de `SERVICES` apuntan a Unsplash** (`images.unsplash.com`), no a fotos propias — dependencia externa en el render de la sección principal de servicios.
4. **`og:image` apunta a `/og-image.jpg`, que no existe en `public/`.** Las previews en redes y WhatsApp salen sin imagen.
5. **Hay comentarios narrativos en el JSX** (`{/* Header de sección */}`, `// Simula envío — reemplazar con endpoint real`), contra la regla de cero comentarios del arnés. Se limpian al tocar cada archivo, no en un barrido aparte.
6. **Bundle de ~447 kB (138 kB gzip) en un solo chunk:** `BrochurePage` no está lazy-loaded pese a ser una ruta secundaria de ~1100 líneas.
7. **La baseline de componentes no está registrada en `sdd/components.json`.** El registro exige `spec` y `created_in_cycle ≥ 1`, que el código pre-SDD no tiene. Cada componente se registra recién cuando un ciclo lo toque.

> Las actualizaciones por ciclo/fix van como fragmentos aditivos en `updates/` —
> este archivo base solo lo modifica la consolidación (ver `sdd/context/context_prompt.md` sección 6).
