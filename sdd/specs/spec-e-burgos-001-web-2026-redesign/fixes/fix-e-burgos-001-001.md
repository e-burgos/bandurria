# FIX-e-burgos-001 — Color de marca: verde → #f78233

> Tipo: IMPROVEMENT · Severidad: medium · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-09-10

## Pedido

El color principal del sitio debe ser `#f78233` (naranja). Hoy es verde.

## Qué se cambia

`--color-accent` en `src/index.css` es el único punto real: la landing y `/brochure` lo consumen
vía `var(--color-accent)` (25 usos sólo en el brochure). Además hay tres verdes hardcodeados:

| Lugar | Antes | Después |
| ----- | ----- | ------- |
| `index.css` `:root` | `#25d366` | `#f78233` |
| `index.css` `.light` | `#128c47` | `#c2410c` |
| `Nosotros.tsx` (glow radial) | `rgba(37,211,102,0.09)` | `rgba(247,130,51,0.10)` |
| `Stats`/`ServiceCard` glows | `rgba(37,211,102,…)` | tokens del accent |
| `services.ts` `accent: "#25d366"` | paleta de 8 hues | se elimina el campo: los íconos usan `var(--color-accent)` |
| `BrochurePage.tsx` `color: "#25d366"` | verde | `#f78233` |

## Decisiones

- **Tema claro usa `#c2410c`, no `#f78233`.** El naranja de marca da 2.35:1 sobre el fondo claro
  `#f5f5f4` — ilegible para los eyebrows y links. `#c2410c` da 4.75:1 y además sube el texto
  blanco sobre botones a 5.18:1. Es el mismo patrón que ya existía (el verde claro era `#128c47`,
  más oscuro que el `#25d366` del tema oscuro). Sobre fondo oscuro el naranja de marca va puro:
  7.7:1.
- **Se elimina la paleta multicolor de `ServiceCard`.** Los 8 íconos pasan a usar el accent de
  marca: con un color corporativo definido, el arcoíris competía con él. La diferenciación entre
  servicios queda en el ícono, que ya es distinto por servicio.
- **El botón flotante de WhatsApp queda verde `#25D366`.** Es el color de marca de WhatsApp, no
  del sitio; en naranja se pierde el reconocimiento inmediato del canal. Si el cliente lo quiere
  naranja es un cambio de una línea en `WhatsAppButton.tsx`.

## Verificación

`pnpm lint`, `pnpm build` y revisión en navegador a 1440 / 375 px en tema claro y oscuro.
