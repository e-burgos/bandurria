# Plan — spec-e-burgos-002-displayads-y-faq · cycle-01

> Flow: `lite` (profile `solo`) — este documento reemplaza a brief/functional/planner/architect.
> App: `apps/bandu` (standalone, código en la raíz del repo).

## Qué se construye

Cuatro cambios sobre la landing (`src/App.tsx` y su árbol de secciones):

1. **Cartelería Digital / DisplayAds** — sección nueva entre "Offset y Digital" y "Confían en
   nosotros", presentando DisplayAds como la unidad de negocio de cartelería digital del grupo,
   con CTA a `https://displayads.com.ar`.
2. **FAQ** — sección nueva antes de "Contacto", con las 9 preguntas del pedido en acordeón.
3. **WhatsApp** — número único `+54 9 11 3309-1839` en toda la web.
4. **Carrusel desktop** — arte regenerado desde los JPG de 150 DPI.

## Historias de usuario (lite — inline)

- **US-001** — Como visitante interesado en pantallas quiero encontrar la oferta de cartelería
  digital desde el menú principal y llegar a la plataforma de DisplayAds en un click.
- **US-002** — Como visitante con dudas operativas quiero resolverlas leyendo la página, sin
  escribir a nadie.
- **US-003** — Como visitante que quiere cotizar quiero que el botón de WhatsApp me deje
  hablando con el número que la empresa atiende hoy.
- **US-004** — Como visitante en desktop quiero ver el carrusel nítido en pantallas grandes.

## Decisiones técnicas

| Decisión | Motivo |
| -------- | ------ |
| Contenido de DisplayAds y de FAQ en `src/data/*.ts` | Mismo patrón que `services.ts` / `trabajos.ts`: el copy pendiente del cliente se reemplaza sin tocar componentes |
| Acordeón propio con `<button>` + `aria-expanded`/`aria-controls` en vez de `<details>` | Permite animar la altura con Framer Motion y mantener la tipografía del sistema; `<details>` no anima igual entre navegadores |
| JSON-LD `FAQPage` inyectado en `index.html` | El sitio ya declara `LocalBusiness` ahí; Google necesita el bloque en el HTML servido, no en el render del cliente |
| Carrusel: sólo se regenera la variante desktop | El arte mobile (1080×900) ya cubre su viewport; duplicar peso en mobile empeora LCP |
| Conversión de imágenes con `sharp` instalado fuera del repo | El repo no versiona herramientas de imagen y no se agrega una dependencia sólo para un build de assets |

## Tasks

Ver `tasks.json` (TASK-001 … TASK-005).

## Verificación

- `pnpm lint` y `pnpm build`.
- Navegador a 1440px y 375px, tema claro y oscuro: anchors nuevos, acordeón por teclado,
  ausencia de scroll horizontal.
- `grep -rn "wa.me" src` devuelve un único número.
