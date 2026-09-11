# FIX-e-burgos-002 — Trabajos realizados: fila completa + visor de imagen

> Tipo: IMPROVEMENT · Severidad: medium · Spec: spec-e-burgos-001-web-2026-redesign
> Autor: e-burgos · Creado: 2026-09-10

## Pedido

1. El carrusel de Trabajos "se corta mucho en desktop", debería verse siempre completo.
2. Al tocar una imagen, abrirla en un visor con un efecto de transición.

## 1 · Por qué se cortaba

`Marquee` renderizaba dos copias del set y animaba `translateX(-50%)`. Con 4 tiles por fila
(~1024 px) y un viewport de 1600–1920 px, una copia es más angosta que la pantalla: al desplazarse
media pista quedaba aire a la derecha. No se nota en pantallas chicas, por eso pasó la primera
revisión.

Ahora `Marquee` mide el ancho real de un set y del contenedor (`ResizeObserver`) y repite el set
`ceil(contenedor / set)` veces por mitad, así cada mitad siempre cubre el viewport. La velocidad
pasó de `durationSeconds` a `speed` en px/s: la duración se deriva de la distancia real, de modo
que el ritmo no cambia al agregar repeticiones ni al cambiar de pantalla. Además cada fila usa
las 8 imágenes (la segunda rotada 4 posiciones) en vez de 4, y el marquee se pausa fuera de
pantalla con `IntersectionObserver`.

## 2 · Visor

`src/components/ui/Lightbox.tsx`, sobre framer-motion (ya instalada; sin dependencias nuevas).

- **Continuidad espacial:** al hacer click se mide el rect de la tarjeta y el visor entra
  desplazado una fracción del vector tarjeta→centro, con `scale(0.86)` y la curva de entrada
  `cubic-bezier(0.22, 1, 0.36, 1)`. No se usa `layoutId`: el marquee clona cada tarjeta (ids
  duplicados) y sus ancestros llevan una animación CSS que rompe la proyección de layout de
  framer-motion.
- Fondo con blur, salida más rápida que la entrada (0.2s vs 0.42s).
- Navegación con flechas del visor (con slide direccional) y con teclado ←/→ (**sin** animación:
  las acciones iniciadas por teclado no se animan).
- `Esc` cierra, foco atrapado en el diálogo, foco devuelto a la tarjeta al cerrar, scroll del
  body bloqueado, `role="dialog"` + `aria-modal`.
- El marquee se pausa mientras el visor está abierto.
- `prefers-reduced-motion` anula todos los desplazamientos.
- Las tarjetas pasaron de `<figure>` a `<button>`: son accionables y deben ser alcanzables por
  teclado.

## 3 · Resolución de las imágenes

El visor mostraba las miniaturas de 640 px a tamaño nativo: chico en desktop. Se agregó
`Trabajo.full` con versiones de 1600 px (`public/trabajos/*-full.webp`, 1,4 MB los 8, cargadas
sólo al abrir el visor). La miniatura de 640 px sigue siendo la de la cinta.

## 4 · Corrección de contenido

Los `alt` de los placeholders estaban corridos respecto de la foto (decía "stickers" y mostraba
roll ups). Se remapeó cada slug a su foto real y se reescribieron los textos.

## Verificación

`pnpm lint`, `pnpm build`, y en navegador a 1600 px y 375 px en ambos temas: filas completas de
borde a borde, apertura/cierre del visor, navegación por botón y teclado, pausa del marquee y
ausencia de scroll horizontal.
