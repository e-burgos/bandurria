# FIX-e-burgos-007 — Deploy por FTP al hosting cPanel

> Tipo: IMPROVEMENT · Severidad: low · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-10-19

## Pedido

Publicar la web en el hosting de bandurriadeco.com.ar (Net Services Argentina, cPanel), primero en un
subdominio de prueba, con deploy automático.

## Relevamiento del hosting (sólo lectura)

Hosting Médium, cuenta `bandurri`, raíz `/home/bandurri`. Hoy la raíz del dominio sirve el
WordPress en producción. Sin Terminal ni SSH; hay Cuentas de FTP, Git Version Control, Cron y
subdominios ilimitados. Por eso el deploy es FTP, y el sitio nuevo no toca la raíz.

## Solución

- `.github/workflows/deploy-cpanel.yml`: lint, build con `VITE_BASE=/` y subida por FTPS con
  `SamKirkland/FTP-Deploy-Action`. Sólo corre si la variable `FTP_HOST` está definida, así un push
  no falla en rojo antes de configurar el hosting.
- Entorno de prueba: mientras `DEPLOY_NOINDEX` no sea `false` el build reemplaza `robots.txt`
  por `Disallow: /`, elimina `sitemap.xml` y agrega `X-Robots-Tag: noindex, nofollow`.
- `public/.htaccess`: fallback al `index.html` (ruteo SPA, `/brochure` recargado), compresión y
  caché larga para assets. GitHub Pages sigue funcionando en paralelo.

## Configuración requerida (la hace el dev; las credenciales no pasan por el agente)

Variables del repo: `FTP_HOST`, `FTP_SERVER_DIR` (opcional), `DEPLOY_NOINDEX` (opcional).
Secrets: `FTP_USERNAME`, `FTP_PASSWORD`.

## Archivos

`.github/workflows/deploy-cpanel.yml`, `public/.htaccess`.
