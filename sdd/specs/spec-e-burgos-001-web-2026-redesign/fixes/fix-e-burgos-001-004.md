# FIX-e-burgos-004 — Servicios: fotos en las tarjetas

> Tipo: IMPROVEMENT · Severidad: low · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-10-19

## Problema

Las tarjetas de servicios mostraban un icono sobre una grilla. El material definitivo incluye una
foto por servicio (`docs/new/WEB BANDU 2026/FOTO SERVICIOS/`), pero son PNG de 1,6–2,5 MB
(~16 MB en total), inutilizables tal cual en la web.

## Solución

- Cada foto se convierte a WebP de 800 px de ancho (2x del ancho máximo de la tarjeta), calidad 78:
  `public/servicios/<id-del-servicio>.webp`, 376 KB los 8 (−98 %).
- `src/data/services.ts` asigna `image` a cada servicio. `ServiceCard` ya renderizaba
  `service.image` (lazy, `object-cover`, degradé inferior); el icono queda como fallback.
- Los PNG originales siguen sin trackear en `docs/`; no se publican.

## Archivos

`src/data/services.ts`, `public/servicios/*.webp`.
