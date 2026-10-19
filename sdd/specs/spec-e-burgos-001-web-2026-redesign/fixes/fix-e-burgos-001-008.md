# FIX-e-burgos-008 — Corte a producción en el hosting cPanel

> Tipo: IMPROVEMENT · Severidad: medium · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-10-19

## Pedido

Mover el WordPress viejo a `old.bandurriadeco.com.ar` y publicar el sitio nuevo en el dominio
principal. `public_html/tienda` es otro WordPress que debe seguir funcionando.

## Relevamiento

`public_html` (6,9 GB) tenía el WordPress principal (Astra), `tienda/` (WordPress propio),
carpetas legacy (`code`, `css`, `decoprint`, `demo`, `files`, `img`, `less`, `mercadolibre`,
`nuevositio`, `web-principal`, `webalizer`), `.well-known` (validación SSL) y archivos sueltos,
entre ellos `bandurriadeco.com.ar.zip` (138 MB) y `sftp-config.json`, ambos descargables
públicamente. El MX es Google Workspace: el correo no se afecta.

## Cambios en el repo

- `public/.htaccess`: redirecciones 301 de las páginas del WordPress anterior (`/nosotros/`,
  `/servicios/`, `/tecnologia/`, `/contacto/`, `/home/`, `/28-2/`, `/tienda-deco/`) y exclusión
  de `/tienda` del fallback SPA.
- `public/googled9eec180d5e65b02.html`: verificación de Google Search Console, que vivía sólo
  en el servidor viejo.

## Cambios en el hosting

Subdominio `old.bandurriadeco.com.ar` (raíz `/old.bandurriadeco.com.ar`); el contenido del
WordPress viejo se mueve ahí con renombrados (mismo filesystem, instantáneos y reversibles);
`tienda/` y `.well-known/` se quedan; el zip y `sftp-config.json` salen del webroot a
`/home/bandurri/old_archivos` (sin acceso web).

## Rollback

Mover de vuelta el contenido de `old.bandurriadeco.com.ar/` a `public_html/`.
