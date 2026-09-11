# 2026-09-10 · spec-e-burgos-001-web-2026-redesign · cycle-01

## Estado

Landing (`/`) migrada al material WEB BANDU 2026. `/brochure` sin cambios.
Copy de Nosotros, los 8 servicios y el horario de contacto son los definitivos del cliente
(`docs/new/WEB BANDU 2026/Nueva WEB - Cambios Tucu.md`); se corrigieron sólo tildes y
mayúsculas respecto del texto recibido.

## Estructura

Orden de secciones en `App.tsx`: HeroCarousel → Nosotros → Servicios → Tecnologia →
OffsetDigital → Clientes → Trabajos → Sectores → Contacto.

- Nuevos: `sections/HeroCarousel.tsx`, `sections/Trabajos.tsx`, `sections/Sectores.tsx`,
  `ui/Marquee.tsx`, `data/hero.ts`, `data/clientes.ts`, `data/trabajos.ts`.
- Eliminados: `sections/Stats.tsx`, `assets/logo-full.png`, el `<video>` del WordPress legacy
  en `Nosotros.tsx` y la galería de 3 fotos remotas de `Tecnologia.tsx`.
- `Sectores.tsx` sale de `Clientes.tsx`: ahí viven "Sectores que atendemos" y el banner
  "¿Tu empresa todavía no trabaja con nosotros?". `Clientes.tsx` quedó sólo con el marquee.
- `ui/Marquee.tsx` es el carrusel continuo compartido por Clientes y Trabajos (dos filas en
  sentidos opuestos, pausa en hover, `motion-safe:` para `prefers-reduced-motion`).
- Assets: hero y tecnología en `public/hero/*.webp` y `public/tecnologia.webp`; logos de
  clientes en `public/logos/clientes/*.png` (versión blanca); miniaturas de trabajos en
  `public/trabajos/*.webp`. Sólo el logo entra por `src/assets/logo-home.png` (lo importa el
  Header). Todo el material original vive en `docs/new/WEB BANDU 2026/`.

## Dependencias

Sin dependencias nuevas. Se empezó a usar `lucide-react` (ya instalada) para los íconos de
`ServiceCard`, en lugar de SVGs inline.

## Qué sigue

- Reemplazar los placeholders cuando lleguen las fotos del cliente: `Service.image` en
  `src/data/services.ts` (hoy vacío → la tarjeta renderiza ícono + degradado) y `Trabajo.image`
  en `src/data/trabajos.ts` (hoy reusa fotos del brochure). Son ediciones de una línea, no
  tocan componentes.
- `Clientes.tsx` fuerza una banda oscura (`#0d0d0d`) en ambos temas porque los logos son
  blancos; si algún día se usan los de `LOGOS CLIENTES/COLOR`, ahí va la bifurcación por tema.
- `html { overflow-x: clip }` en `index.css` contiene el desborde lateral que producen las
  entradas `whileInView` con `x: ±40` (Tecnologia, OffsetDigital). No usar `overflow-x: hidden`:
  rompe el `position: sticky` del header.
