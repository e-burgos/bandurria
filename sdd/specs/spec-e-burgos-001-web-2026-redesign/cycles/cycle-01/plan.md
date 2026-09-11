# spec-e-burgos-001-web-2026-redesign — cycle-01 · plan (lite)

> Módulo: web-2026-redesign | Subproyectos: apps/bandu | Fecha: 2026-09-10
> Objetivo: dejar la landing desktop y mobile alineada al material WEB BANDU 2026 (logo, hero de
> carrusel, copy definitivo, 8 servicios, trabajos realizados, horario). Fuera de alcance:
> `/brochure`, backend del formulario, secciones inferiores salvo el horario.

## Historias

- US-001 — Como visitante quiero ver el logo y el hero 2026 para reconocer la marca actual. CA: el header muestra el logo nuevo y el hero rota 3 imágenes con arte PC en desktop y arte mobile en ≤768px, sin video.
- US-002 — Como visitante quiero leer quiénes son en tres párrafos claros para decidir si me representan. CA: sección Nosotros con el copy exacto, sin foto, última oración en negrita.
- US-003 — Como visitante quiero ver los 8 servicios en orden con su descripción para ubicar el mío. CA: los 8 títulos y textos coinciden literalmente con el pedido y en ese orden.
- US-004 — Como visitante quiero ver la planta y las marcas que confían para validar capacidad. CA: Tecnología usa la foto nueva; Clientes muestra los logos provistos en blanco sobre fondo oscuro en ambos temas.
- US-005 — Como visitante quiero ver trabajos realizados pasando solos para dimensionar el trabajo. CA: carrusel continuo, pausable por hover/foco, respetando `prefers-reduced-motion`.
- US-006 — Como visitante quiero el horario correcto para saber cuándo llamar. CA: "Lunes a Viernes · 9.15 a 13.30 y 14.30 a 17.45 hs".

## Tasks (detalle en tasks.json)

- TASK-001 — Optimizar e incorporar los assets entregados (logo, 6 carruseles, foto tecnología, 18 logos de clientes) a `src/assets/` y `public/`; valida el peso resultante por archivo.
- TASK-002 — Hero: nuevo `HeroCarousel` con `<picture>` PC/mobile, autoplay, dots y flechas; borrar el video y el componente `Stats`; actualizar `App.tsx` y la navegación del header al nuevo orden de secciones.
- TASK-003 — `Nosotros` reescrito sin video ni foto, con el copy definitivo y la última oración en negrita.
- TASK-004 — `src/data/services.ts` con los 8 servicios definitivos y `image` opcional; `ServiceCard` que funciona sin foto y la usa si aparece.
- TASK-005 — `Tecnologia` con la foto nueva en lugar de la galería de 3; `OffsetDigital` sin el CTA "Cotizar".
- TASK-006 — `Clientes` con los logos blancos sobre banda oscura; extraer "Sectores" + banner CTA a su propio componente para poder intercalar Trabajos.
- TASK-007 — `Trabajos` nuevo: marquee continuo de fotos chicas con datos placeholder en `src/data/trabajos.ts`.
- TASK-008 — Horario en `Contacto`; `pnpm lint` + `pnpm build` + verificación visual desktop/mobile en navegador.

## Decisiones técnicas

- Logos de clientes en blanco sobre una banda siempre oscura (no siguen el toggle de tema) → la carpeta BLANCO desaparecería sobre el fondo claro y el cliente pidió preferentemente esa versión; evita mantener dos juegos de assets. Registro afectado: `components.json`.
- `Service.image` y `Trabajo.image` opcionales → las fotos que el cliente todavía debe entregar se agregan editando sólo `src/data/*.ts`. Sin foto, la tarjeta de servicio renderiza un bloque tipográfico con degradado propio en vez de una foto de stock ajena a la marca. Registro afectado: `components.json`.
- Assets servidos desde `public/` (no `src/assets/`) para el hero, tecnología y clientes → son reemplazables por el cliente sin rebuild de bundle; sólo el logo entra por `src/assets/` porque lo importa el Header. Registro afectado: `components.json`.
