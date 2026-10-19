# FIX-e-burgos-005 — Trabajos realizados: fotos definitivas

> Tipo: IMPROVEMENT · Severidad: low · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-10-19

## Problema

Trabajos usaba 8 fotos provisorias del brochure. Llegaron las definitivas
(`docs/new/WEB BANDU 2026/FOTOS TRABAJOS/`): 19 PNG de ~2 MB (~37 MB en total).

## Solución

- Cada foto se convierte a dos WebP en `public/trabajos/`: `<slug>.webp` (640 px, q76, miniatura de
  la cinta) y `<slug>-full.webp` (1280 px, q78, sólo se carga al abrir el visor). Miniaturas
  ~0,6 MB y fulls ~1,7 MB en total para las 19.
- `data/trabajos.ts` pasa a 19 entradas con `alt` descriptivo; se eliminan los 16 archivos viejos.
- `Trabajos.tsx`: la segunda fila rota `floor(n/2)` posiciones en vez de 4 fijo, así sigue
  desfasada media vuelta con cualquier cantidad de fotos.

## Archivos

`src/data/trabajos.ts`, `src/components/sections/Trabajos.tsx`, `public/trabajos/*.webp`.
