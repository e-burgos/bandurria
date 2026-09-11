# Context Prompt — apps/bandu

> Entry point para agentes que trabajen sobre `apps/bandu`.
> Leer junto con `constitution.md` de este directorio **+ `updates/*.md` en orden de nombre**.

> ⚠ **Repo standalone:** el código de esta app vive en la **raíz del repositorio**, no en `apps/bandu/`. El identificador `apps/bandu` es la convención con la que los registros SDD (global.json, specs, ciclos) refieren a este único subproyecto lógico.

> ⚠ **No hay Nx en este repo y no debe haberlo.** Ignorá el chequeo de workspace del `CLAUDE.md` del arnés y la skill `init-nx-workspace`: es una app única, no un monorepo. Correr los scripts de `package.json` directamente, nunca `nx`.

- **Tipo:** react (SPA estática, sin backend)
- **Estado:** app preexistente adoptada por SDD en cycle-0. Cero ciclos SDD completados; el código actual es la baseline.
- **Perfil de trabajo:** `solo` → los ciclos corren en flow `lite` (un solo actor, `plan.md` en vez de los cuatro documentos).

## 1. Rutas

| Ruta        | Componente                  | Qué es                                                                 |
| ----------- | --------------------------- | ---------------------------------------------------------------------- |
| `/`         | `LandingPage` (en `App.tsx`) | Header + 7 secciones ancladas + botón flotante de WhatsApp             |
| `/brochure` | `pages/BrochurePage.tsx`     | Brochure comercial 2026, página autocontenida con su propia nav y hero |

SPA con `BrowserRouter`: el hosting **debe** reescribir todo a `index.html` (`public/_redirects` ya lo declara en formato Netlify). Ruta nueva ⇒ sumarla también a `public/sitemap.xml`.

## 2. Mapa de la landing (orden de render en `App.tsx`)

| Orden | Componente      | `id` de ancla    | Notas                                                                          |
| ----- | --------------- | ---------------- | ------------------------------------------------------------------------------ |
| 1     | `Nosotros`      | `nosotros`       | Hero con parallax (`useScroll` + `useTransform`); CTAs a `#servicios`/`#contacto` |
| 2     | `Stats`         | —                | Contadores animados al entrar en viewport (`useInView`)                        |
| 3     | `Tecnologia`    | `tecnologia`     | Tabs/acordeón con `AnimatePresence`                                            |
| 4     | `Servicios`     | `servicios`      | Grid 1→2→3→4 cols que mapea `SERVICES` sobre `ServiceCard`                     |
| 5     | `OffsetDigital` | `offset-digital` | Bloque destacado con `PRODUCTOS` y `FEATURES` locales                          |
| 6     | `Clientes`      | `clientes`       | Carrusel paginado (`PER_PAGE = 4`) con autoplay y flechas                       |
| 7     | `Contacto`      | `contacto`       | Datos de contacto + mapa + formulario (**hoy no envía**, ver deuda #2)          |

Fuera de `<main>`: `Header` (sticky, detecta scroll, menú mobile, toggle de tema, links a Facebook/Instagram) y `WhatsAppButton` (fijo abajo a la derecha → `wa.me/5491152278002`).

## 3. Piezas compartidas

- `components/ui/RevealOnScroll.tsx` — wrapper de reveal por scroll (`opacity/​y`, `once: true`, prop `delay` en ms). Primera opción para animar; `motion.*` local solo si hace falta stagger o variantes.
- `hooks/useTheme.ts` — `{ theme, toggle }`; clase `light` en `<html>` + `localStorage["theme"]`, default `dark`.
- `data/services.ts` — `interface Service` (`id`, `title`, `tagline`, `description?`, `highlight`, `items[]`, `extras?`, `image`, `color`) y `SERVICES[]` con 9 entradas. Agregar un servicio = agregar un objeto acá, nada de JSX nuevo.
- `src/index.css` — tokens `@theme` (`--color-bg`, `--color-bg-card`, `--color-bg-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`), sus overrides bajo `.light`, keyframes (`fade-in-up`, `fade-in`, `slide-in-right`, `pulse-soft`, `float`, `shimmer-move`, `marquee`), la utilidad `.bg-shimmer` y el bloque `prefers-reduced-motion`.

## 4. Datos de negocio que aparecen en el código (mantener consistentes)

Teléfono/WhatsApp `+54 9 11 5227-8002` · mail `contacto@bandurriadeco.com.ar` · dirección Montenegro 133, Chacarita, CABA · horario L-V 09:15–17:45 · Facebook `bandurria.deco.7` · Instagram `bandurriadeco`.
Están duplicados en `index.html` (JSON-LD), `Contacto.tsx` (`CONTACT_INFO`), `BrochurePage.tsx` (`CONTACT_ITEMS`), `Header.tsx` y `WhatsAppButton.tsx`: **si cambia uno, cambian todos**.

## 5. Cómo correr y verificar

```bash
pnpm install      # dependencias
pnpm dev          # servidor de desarrollo (Vite)
pnpm lint         # ESLint flat config
pnpm build        # tsc -b && vite build → barrera mínima de calidad
pnpm preview      # sirve dist/
```

No hay runner de tests. **Definition of done de una task de esta app:** `pnpm lint` sin errores + `pnpm build` en verde + verificación visual en `/` y `/brochure`, en dark y light, en mobile y desktop (captura a `tests/screenshots/` si el cambio es visual).

Scripts del arnés: `pnpm sdd:validate` (registros SDD), `pnpm sdd:gate <spec-id> [cycle-XX]` (gates), `pnpm sdd:docs` (visor).

## 6. Antes de tocar código — leer esto

1. **Cambiar un `id` de sección es romper la navegación** (`NAV_LINKS` + CTAs internos + sitemap). Tratalo como cambio de contrato.
2. **No hardcodear colores de tema:** usar los tokens CSS. Toda sección nueva debe verse bien en dark **y** en light.
3. **`BrochurePage` se mantiene autónoma** — no extraigas componentes "compartidos" hacia la landing sin una spec que lo pida.
4. **Cero comentarios nuevos** en el código (regla del arnés); el archivo puede tener comentarios viejos: se limpian al pasar por ahí.
5. **Registro SDD:** todo componente/página/hook que un ciclo cree o modifique se anota en `sdd/components.json` bajo la app-key `apps/bandu` (`COMP-NNN` correlativo). La baseline pre-SDD no está registrada a propósito — ver deuda #7 de la constitución.
6. **Deuda conocida** (formulario que no envía, `strict` apagado, `og-image.jpg` faltante, imágenes de Unsplash, brochure sin lazy-load): está listada y priorizable en `constitution.md` § 5 — no la "arregles al pasar", abrí spec o fix.
