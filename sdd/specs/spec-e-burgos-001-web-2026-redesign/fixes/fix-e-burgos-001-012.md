# FIX-e-burgos-012 — Formulario: mensajes cortos rechazados sin explicación

> Tipo: BUGFIX · Severidad: medium · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-10-19

## Problema

En producción el formulario mostraba "No pudimos enviar tu mensaje" al enviar nombre "Tucu",
asunto "Test" y mensaje "Test". El servidor respondía `422 invalid_fields` porque `contacto.php`
exigía 10 caracteres de mensaje, y el frontend colapsaba cualquier error en el mismo texto.

## Solución

- `contacto.php`: mensaje de 3 a 3000 caracteres.
- `Contacto.tsx`: el texto de error depende del código del servidor (`invalid_fields`,
  `too_many_requests`, resto); el enlace a WhatsApp se mantiene.
