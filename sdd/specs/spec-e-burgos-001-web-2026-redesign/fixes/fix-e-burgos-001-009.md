# FIX-e-burgos-009 — Formulario de contacto con envío real

> Tipo: BUGFIX · Severidad: medium · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-10-19

## Problema

`Contacto.tsx` simulaba el envío (`setTimeout` de 900 ms) y mostraba "¡Gracias por escribirnos!":
ningún mensaje salía del navegador. No había validación, así que se podía "enviar" vacío.

## Solución

El hosting corre PHP 8.2, el MX es Google Workspace en ruteo remoto y SPF/DKIM son válidos, por
lo que el servidor puede enviar mail como `contacto@bandurriadeco.com.ar` sin servicios externos.

- `public/contacto.php` (sale en cada deploy): sólo POST JSON; valida largo y formato en el
  servidor; honeypot `website`; sólo acepta Origin de `bandurriadeco.com.ar`, `www.` y `new.`;
  máximo 5 envíos por hora por IP; `mail()` a `contacto@` con `From` del mismo dominio, `Reply-To`
  del visitante y envelope `-f`.
- `Contacto.tsx`: `fetch` a `contacto.php`; el éxito sólo se muestra si el servidor responde
  `ok`; si falla muestra un error con enlace a WhatsApp; validación nativa del navegador
  (se quitó `noValidate`).
- Sólo funciona en el hosting: en `pnpm dev` y GitHub Pages el envío cae en el mensaje de error.

## Verificación

Envío real a `contacto@bandurriadeco.com.ar` y casos de rechazo (campos inválidos, método,
origen, honeypot, límite).
