# FIX-e-burgos-010 — og-image y baja de new.

> Tipo: IMPROVEMENT · Severidad: low · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-10-19

## Pedido

1. Quitar `new.bandurriadeco.com.ar`: era sólo de prueba.
2. Agregar `og-image.jpg`.

## Cambios

- `public/og-image.jpg` (1200×630, ~94 KB): logo de Bandurria sobre una foto de exhibidores con
  degradé oscuro a la izquierda. Lo referencian `og:image` y `twitter:image` de `index.html`, que
  apuntaban a un archivo inexistente.
- Se elimina `.github/workflows/deploy-cpanel.yml`: publicaba en `new.` y sin ese subdominio
  fallaría en cada push. `new.` sale de `ALLOWED_HOSTS` en `contacto.php`.
- Hosting: se da de baja el subdominio `new.`, su cuenta FTP y su carpeta (a la papelera de cPanel).
- Variable y secrets `FTP_*` del repo: dejan de usarse y se borran.

## Nota

Con el workflow eliminado no hay deploy automático: producción se actualiza copiando el build a
`public_html`. Para automatizarlo hace falta una cuenta FTP con directorio `public_html`.
