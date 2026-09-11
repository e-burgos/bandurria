# 2026-09-10 · FIX-e-burgos-002

## Qué pasó

Un marquee infinito hecho con dos copias del contenido y `translateX(-50%)` deja un hueco
cuando una copia es más angosta que el contenedor: con 4 tarjetas (~1024 px) en un desktop de
1600 px, media vuelta era aire. Pasó la revisión visual porque en mobile y en el pane angosto
del navegador el set sí cubría el ancho.

## Lección

Un marquee sólo es continuo si cada mitad de la pista mide al menos el ancho del contenedor:
medir el set con `ResizeObserver` y repetirlo `ceil(contenedor / set)` veces, y expresar la
velocidad en px/s para que el ritmo no dependa de cuántas repeticiones haya. Revisarlo siempre
en el viewport más ancho, no en el más angosto.

## Costo evitable

Medio: el bug llegó al dev y volvió como pedido. Un chequeo a 1600 px en la revisión del ciclo
lo hubiera agarrado junto con el scroll horizontal.
