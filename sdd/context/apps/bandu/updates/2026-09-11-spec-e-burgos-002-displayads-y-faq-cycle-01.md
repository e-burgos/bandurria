# 2026-09-11 · spec-e-burgos-002-displayads-y-faq · cycle-01

## Estado

La landing suma dos secciones: **Cartelería Digital (Display-Ads)** y **FAQ**, ambas con
anchor propio en el menú. El WhatsApp de todo el sitio (landing + `/brochure`) quedó unificado
en `+54 9 11 3309-1839`; el teléfono fijo `5227-8002` se mantiene como ítem aparte en Contacto
por decisión del cliente. El carrusel del hero se regeneró desde los masters de 150 DPI.

El copy de Display-Ads es el que entregó el cliente por chat: `displayads.com.ar` está
bloqueado por el proxy de egress del entorno remoto, no se puede extraer desde acá.

## Estructura

Orden de secciones en `App.tsx`: HeroCarousel → Nosotros → Servicios → Tecnologia →
OffsetDigital → **CarteleriaDigital** → Clientes → Trabajos → Sectores → **Faq** → Contacto.

- Nuevos: `sections/CarteleriaDigital.tsx`, `sections/Faq.tsx`, `data/displayads.ts`,
  `data/faq.ts`, `data/contacto.ts`.
- `data/contacto.ts` es la única fuente del número de WhatsApp: `WHATSAPP_NUMBER`,
  `WHATSAPP_DISPLAY` y `whatsappLink(mensaje?)`. Ningún componente vuelve a escribir un
  `wa.me` a mano — `grep -rn "wa.me" src` debe devolver solo ese archivo.
- El acordeón de FAQ es propio (`<button>` + `aria-expanded`/`aria-controls` + panel
  `role="region"`), animado con `AnimatePresence` sobre `height`. Sólo un panel abierto a la
  vez; el primero arranca abierto.
- `index.html` tiene tres bloques JSON-LD: `LocalBusiness`, **`FAQPage`** y `WebSite`. El
  `FAQPage` es un espejo estático de `src/data/faq.ts`: al tocar una pregunta o respuesta hay
  que actualizar los dos lugares.
- Hero: `HeroSlide` pasó a llevar cuatro rutas (`desktop`, `desktopRetina`, `mobile`,
  `mobileRetina`) y el `<picture>` usa `srcSet` con `1x, 2x`. Los `@2x` salen de
  `CARROUSEL PC|MOBILE/150 DPI/`, que son masters de 4000×1667 y 2250×1875 — el nombre del
  archivo dice 1920×800 / 1080×900 pero eso es el tamaño de salida, no el del archivo.

## Dependencias

Sin dependencias nuevas. La conversión de imágenes se hizo con `sharp` instalado **fuera del
repo** (scratchpad de la sesión): el repo no versiona herramientas de imagen.

## Qué sigue

- Si el cliente ajusta el copy de Display-Ads, es editar `src/data/displayads.ts`; los
  componentes no tienen texto hardcodeado.
- Las respuestas del FAQ se redactaron a partir del contenido ya publicado en la landing
  (servicios, tecnología, horario). Conviene que el cliente las valide una vez.
- Si Display-Ads llega a tener pantallazos o video de la plataforma, la columna izquierda de
  `CarteleriaDigital.tsx` está preparada para recibir el media al lado del copy.
