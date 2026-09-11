# 2026-09-10 · spec-e-burgos-001-web-2026-redesign · cycle-01

## Qué pasó

Las entradas `whileInView={{ x: -40 }} / { x: 40 }` de Framer Motion desplazan el elemento
fuera del viewport antes de animar: en 768px el documento medía 784px de ancho y la página
scrolleaba de costado. No se ve en desktop ancho y no lo detecta ni lint ni build; apareció
midiendo `documentElement.scrollWidth > clientWidth` en el navegador.

## Lección

Medir `scrollWidth > clientWidth` en cada breakpoint al revisar una página con animaciones de
entrada horizontales, y contenerlas con `html { overflow-x: clip }` (nunca `hidden`, que
convierte a `html` en contenedor de scroll y rompe el `position: sticky` del header).

## Costo evitable

Bajo acá (una medición), alto si llega a producción: el scroll lateral en mobile se reporta
como "la web está rota" y se debuggea a ciegas sin saber qué elemento desborda.
