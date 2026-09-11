# spec-e-burgos-001-web-2026-redesign — Rediseño WEB BANDU 2026

> Módulo: `web-2026-redesign` | App: `apps/bandu` | Autor: e-burgos | Fecha: 2026-09-10
> Fuente del pedido: `docs/new/WEB BANDU 2026/Nueva WEB - Cambios Tucu.md` + assets adjuntos.

## 1. Problema

La landing vigente arrastra contenido de la etapa anterior de la marca: logo viejo, video
institucional embebido desde el WordPress legacy, un banner de métricas que el cliente ya no
quiere comunicar, un texto de "Nosotros" en primera persona de los fundadores, y un catálogo de
servicios de 9 ítems con nomenclatura interna. El cliente entregó el material definitivo de 2026
(logo, carruseles, foto de tecnología, logos de clientes) y el copy final.

## 2. Objetivo

Dejar la landing (desktop y mobile) alineada al material 2026: nuevo logo, hero de carrusel,
copy institucional definitivo, catálogo de 8 servicios en el orden provisto, sección de trabajos
realizados y datos de contacto corregidos.

## 3. Alcance

| # | Cambio | Detalle |
| - | ------ | ------- |
| 1 | Logo | Reemplazar el logotipo del header por `LOGO HOME/Logo HOME_376x95px.png` |
| 2 | Hero | Quitar el video institucional; carrusel de 3 imágenes con arte PC (1920×800) y mobile (1080×900) |
| 3 | Stats | Eliminar el banner de "10 años / 11 categorías / 320 cm / 100%" |
| 4 | Nosotros | Copy nuevo de 3 párrafos, sin foto, última oración en negrita |
| 5 | Servicios | 8 servicios con textos definitivos y en el orden entregado (sin fotos todavía) |
| 6 | Tecnología | Copy sin cambios; reemplazar la galería por la foto nueva |
| 7 | Offset y Digital | Copy sin cambios; quitar el CTA "Cotizar" |
| 8 | Confían en nosotros | Logos de clientes provistos, versión en blanco |
| 9 | Trabajos realizados | Sección nueva: carrusel continuo de fotos chicas |
| 10 | Contacto | Horario: Lunes a Viernes de 9.15 a 13.30 y 14.30 a 17.45 hs |

## 4. Fuera de alcance

- `/brochure` (`src/pages/BrochurePage.tsx`) — no se toca en este ciclo.
- Backend o envío real del formulario de contacto (sigue como está).
- Secciones "Sectores que atendemos", banner "¿Tu empresa todavía no trabaja con nosotros?" y
  "Contacto": quedan igual salvo el horario.

## 5. Pendientes del cliente (bloquean contenido, no el ciclo)

- Fotos de los 8 servicios (`FOTO SERVICIOS - Falta/`, vacía).
- Fotos de trabajos realizados (`FOTOS TRABAJOS - Falta/`, vacía).

Ambas se resuelven con datos placeholder y un campo `image` opcional ya cableado: reemplazar
cada foto es editar una línea en `src/data/*.ts`, sin tocar componentes.

## 6. Criterios de aceptación

- `pnpm build` y `pnpm lint` en verde.
- Desktop (≥1280px) y mobile (375px) verificados en navegador sobre las 9 secciones.
- Ningún asset del hero, tecnología o clientes apunta al dominio WordPress legacy.
- Los 8 servicios se leen en el orden y con el texto exacto del pedido.
