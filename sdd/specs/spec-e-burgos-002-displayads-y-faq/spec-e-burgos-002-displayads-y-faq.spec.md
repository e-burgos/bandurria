# spec-e-burgos-002-displayads-y-faq — Cartelería Digital (DisplayAds) y FAQ

> Módulo: `displayads-y-faq` | App: `apps/bandu` | Autor: e-burgos | Fecha: 2026-09-11
> Fuente del pedido: mensaje del cliente del 2026-09-11 (4 puntos).

## 1. Problema

La landing 2026 comunica la unidad gráfica de Bandurria pero no dice nada de **DisplayAds**, la
unidad de negocio de cartelería digital del grupo, que hoy vive sólo en su sitio propio
(`displayads.com.ar`) y no recibe tráfico desde la web principal.

Además, las consultas repetidas que entran por WhatsApp y por el formulario (dónde están, si
hacen gran formato, si colocan, si trabajan con agencias) no tienen respuesta en la página: se
responden a mano una por una.

Dos datos operativos quedaron desactualizados: el número de WhatsApp de contacto y las imágenes
del carrusel desktop, generadas desde los archivos de 72 DPI existiendo versiones de 150 DPI.

## 2. Objetivo

Sumar DisplayAds como unidad de negocio visible en la landing con su propio anchor de menú y un
acceso directo a la plataforma, publicar las preguntas frecuentes como sección propia, y corregir
el número de WhatsApp y la calidad del arte del carrusel desktop.

## 3. Alcance

| # | Cambio | Detalle |
| - | ------ | ------- |
| 1 | Cartelería Digital | Sección nueva `#carteleria-digital` con DisplayAds como unidad de negocio + CTA a `https://displayads.com.ar` |
| 2 | Menú | Anchor "Cartelería Digital" en nav desktop y menú mobile |
| 3 | FAQ | Sección nueva `#faq` con las 9 preguntas frecuentes en acordeón accesible + JSON-LD `FAQPage` |
| 4 | Menú | Anchor "FAQ" en nav desktop y menú mobile |
| 5 | WhatsApp | Todos los enlaces `wa.me` pasan a `5491133091839`; ítem WhatsApp propio en la lista de contacto |
| 6 | Carrusel | `public/hero/*-desktop.webp` regenerados desde `CARROUSEL PC/150 DPI/` |

## 4. Fuera de alcance

- Sitio propio de DisplayAds (`displayads.com.ar`): no se toca, sólo se enlaza.
- Teléfono fijo `5227-8002`: queda como está, decisión del cliente.
- Arte mobile del carrusel: el actual es suficiente para su viewport.
- Backend del formulario de contacto.

## 5. Pendientes del cliente (bloquean contenido, no el ciclo)

- Copy definitivo de DisplayAds: el sitio `displayads.com.ar` está bloqueado por el proxy de red
  del entorno de trabajo, así que no se pudo extraer su texto literal. La sección se implementa
  con copy provisional y todo el contenido aislado en `src/data/displayads.ts`: reemplazarlo es
  editar strings de un archivo de datos, sin tocar componentes.
- Fotos propias de cartelería digital: la sección se resuelve con composición tipográfica.

## 6. Criterios de aceptación

- `pnpm build` y `pnpm lint` en verde.
- Los dos anchors nuevos navegan a su sección en desktop y en mobile, y el menú mobile se cierra.
- El acordeón de FAQ abre y cierra por teclado, con `aria-expanded` y `aria-controls` correctos.
- Ningún `wa.me` del repo apunta a un número distinto de `5491133091839`.
- Los tres `*-desktop.webp` derivan de los archivos de 150 DPI y pesan menos de 250 kB cada uno.
- Desktop (≥1280px) y mobile (375px) verificados en tema claro y oscuro, sin scroll horizontal.
