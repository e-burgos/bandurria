# FIX-e-burgos-006 — Favicon

> Tipo: BUGFIX · Severidad: low · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-10-19

## Problema

1. `public/favicon.svg` era el rayo violeta del template de Vite y `index.html` lo declara primero:
   los navegadores modernos lo eligen sobre los PNG.
2. Los PNG (32, 180, 192, 512) eran idénticos byte a byte a los de bandurriadeco.com.ar: el logo
   en blanco sobre fondo transparente, invisible en pestañas de tema claro.

## Solución

- Fuente: `wp-content/uploads/2023/11/cropped-cropped-logo.png` (512 px) del sitio actual.
- Se regeneran `favicon-32x32.png`, `apple-touch-icon.png` (180), `android-chrome-192x192.png`,
  `android-chrome-512x512.png` y un nuevo `favicon.ico` (16/32/48): logo con margen sobre
  `#0A0A0A` (el `theme_color` del manifest), legible en cualquier tema.
- Se elimina `favicon.svg` y su `<link>`; se agrega el `<link>` del `.ico`.

## Archivos

`index.html`, `public/favicon.ico` (nuevo), `public/favicon.svg` (borrado), PNG de iconos.
