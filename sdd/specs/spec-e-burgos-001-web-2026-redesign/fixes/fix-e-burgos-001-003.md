# FIX-e-burgos-003 — Publicar la landing en GitHub Pages

> Tipo: IMPROVEMENT · Severidad: medium · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-09-10

## Pedido

Publicar el sitio en GitHub Pages.

## Qué implica

Pages sirve un repo de proyecto bajo `https://e-burgos.github.io/bandurria/`, no en la raíz del
dominio. Eso rompe tres cosas del build actual:

1. **Assets del bundle** → se resuelve con `base` de Vite (`VITE_BASE` en el workflow).
2. **Los 53 paths absolutos a `public/`** (`/hero/…`, `/logos/clientes/…`, `/trabajos/…`,
   `/img-*.jpg`, `/tecnologia.webp`) los escribe el código, no Vite: apuntarían a
   `e-burgos.github.io/hero/…`. Se agrega `src/lib/asset.ts` que antepone
   `import.meta.env.BASE_URL`, aplicado en los puntos donde la URL se consume (no en los datos,
   que siguen siendo relativos a la raíz del sitio).
3. **Ruteo SPA** → `BrowserRouter` necesita `basename`, y Pages no tiene rewrite: se copia
   `index.html` a `404.html` en el build para que `/brochure` recargado no dé 404.
   `public/_redirects` es formato Netlify y en Pages es inerte; se deja por si se migra.

## Decisiones

- `base` sale de `VITE_BASE` y por defecto es `/`: `pnpm dev` y cualquier hosting en la raíz
  siguen funcionando igual; sólo el workflow de Pages pasa `/bandurria/`.
- `site.webmanifest` pasa a paths relativos para que los íconos resuelvan bajo el subpath.
- Los canonical / `og:url` de `index.html` siguen apuntando a `bandurriadeco.com.ar`. En Pages
  eso es incorrecto, pero es un deploy de preview y cambiarlos ensuciaría el SEO del dominio
  real cuando se publique ahí. Queda anotado como pendiente.

## Verificación

`pnpm lint`, `pnpm build`, el workflow en verde y la URL pública revisada en navegador
(desktop y mobile), incluyendo `/brochure` recargado directo.
