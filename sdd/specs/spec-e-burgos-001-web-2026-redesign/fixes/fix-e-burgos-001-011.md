# FIX-e-burgos-011 — Deploy automático a producción

> Tipo: IMPROVEMENT · Severidad: medium · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-10-19

## Pedido

Cada push a `main` debe publicar en bandurriadeco.com.ar. El mecanismo ya estaba probado en el
subdominio de prueba; sólo faltaba apuntarlo al dominio principal.

## Qué faltaba

Una cuenta FTP cuya raíz fuera `public_html`. `deploy@bandurriadeco.com.ar` apuntaba a
`/home/bandurri/bandurriadeco.com.ar/deploy`; se cambió su directorio a `public_html`
(`Ftp::set_homedir`), conservando la contraseña. La cuenta ve `tienda/` y `.well-known/` pero la
action sólo sube lo que está en `dist/`, así que no los toca.

## Cambios

- `.github/workflows/deploy-cpanel.yml`: lint, build con `VITE_BASE=/` y FTPS a la raíz. Sin
  bloqueo de indexación. Condicionado a la variable `FTP_HOST`. Credenciales en los secrets
  `FTP_USERNAME` / `FTP_PASSWORD`.
- `public/.htaccess`: `Require all denied` para `.ftp-deploy-sync-state.json`, que la action deja
  en el servidor para sincronizar.

## Nota

La action sólo borra del servidor lo que ella misma subió antes; no elimina `tienda/` ni nada
ajeno al build.
