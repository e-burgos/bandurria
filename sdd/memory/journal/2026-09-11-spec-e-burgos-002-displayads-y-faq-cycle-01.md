# 2026-09-11 · spec-e-burgos-002-displayads-y-faq · cycle-01

## Qué pasó

El pedido decía "sacá la info de https://displayads.com.ar". El proxy de egress del entorno
remoto bloquea ese dominio: fallan `WebFetch`, `curl` (CONNECT 403) y también los espejos tipo
`r.jina.ai`. Se perdieron cuatro intentos antes de preguntarle al dev, que pegó el copy en el
chat en un mensaje.

Aparte: los archivos de `CARROUSEL PC/150 DPI/` se llaman `..._1920x800px_150dpi.jpg` pero son
de 4000×1667. Leer las dimensiones reales antes de convertir permitió generar variantes `@2x`
de 160 kB en vez de asumir que no había resolución de sobra.

## Lección

Cuando el pedido depende de contenido de un sitio externo, verificar el acceso con una sola
prueba y, si está bloqueado, pedirle el texto al dev en la misma tanda de preguntas del inicio
en vez de insistir con espejos.

## Costo evitable

~4 llamadas de red fallidas (WebFetch, curl, dos WebSearch sin resultado útil) y una ronda de
preguntas de más.
