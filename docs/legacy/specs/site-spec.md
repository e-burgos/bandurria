# Bandurria Deco — Site Specification

## 1. Visión general

Sitio web institucional / portfolio de servicios para **BANDURRIA Gráfica y Deco**,
empresa de impresión y producción gráfica con sede en Chacarita, CABA.

El sitio es una **landing page de página única (one-page)** con scroll continuo
entre secciones. Su objetivo principal es presentar los servicios y habilitar el
contacto con potenciales clientes.

**Principios de diseño:**

- Responsive-first: diseñado desde mobile hacia desktop
- Elegancia y dinamismo: animaciones sutiles que refuerzan la marca sin distraer
- Dark/Light mode nativo: respeta la preferencia del sistema y permite toggle manual
- Tailwind CSS experto: uso semántico, sin clases arbitrarias innecesarias, con `@layer` y CSS custom properties para el sistema de colores del tema

---

## 2. Identidad de marca

| Atributo       | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Nombre         | BANDURRIA Gráfica y Deco                                 |
| Logo           | Ilustración de pájaro bandurria + tipografía bold blanca |
| Subtítulo      | "Gráfica y Deco"                                         |
| Color primario | Negro (`#000000` o `#0A0A0A`)                            |
| Color de texto | Blanco (`#FFFFFF`)                                       |
| Color acento   | Verde WhatsApp (`#25D366`)                               |
| Estética       | Dark, industrial, profesional                            |
| Tipografía     | System-UI sans-serif (base), heading bold                |

---

## 2.1 Sistema de colores — Dark / Light Mode

El sistema de colores se basa en **CSS custom properties** manejadas por Tailwind v4.
El modo por defecto es **dark**. El usuario puede togglarlo manualmente (ícono luna/sol
en el Header); la preferencia se persiste en `localStorage`.

### Tokens de color

| Token CSS            | Dark mode                | Light mode         | Uso                     |
| -------------------- | ------------------------ | ------------------ | ----------------------- |
| `--color-bg`         | `#0A0A0A`                | `#F5F5F4`          | Fondo principal         |
| `--color-bg-card`    | `#141414`                | `#FFFFFF`          | Fondo de tarjetas       |
| `--color-bg-surface` | `#1A1A1A`                | `#E8E8E7`          | Superficies secundarias |
| `--color-text`       | `#F5F5F4`                | `#0A0A0A`          | Texto principal         |
| `--color-text-muted` | `#A3A3A3`                | `#525252`          | Texto secundario        |
| `--color-border`     | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` | Bordes de tarjetas      |
| `--color-accent`     | `#25D366`                | `#128C47`          | Acento WhatsApp         |

### Implementación Tailwind v4

```css
/* index.css */
@import "tailwindcss";

@theme {
  --color-bg: #0a0a0a;
  --color-bg-card: #141414;
  --color-bg-surface: #1a1a1a;
  --color-text: #f5f5f4;
  --color-text-muted: #a3a3a3;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-accent: #25d366;
}

.light {
  --color-bg: #f5f5f4;
  --color-bg-card: #ffffff;
  --color-bg-surface: #e8e8e7;
  --color-text: #0a0a0a;
  --color-text-muted: #525252;
  --color-border: rgba(0, 0, 0, 0.08);
  --color-accent: #128c47;
}

html {
  scroll-behavior: smooth;
  background-color: var(--color-bg);
  color: var(--color-text);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
```

> **Convención:** la clase `.light` se aplica en `<html>`. En dark (default) no hay clase extra.
> El toggle se maneja con `useTheme()` hook en `src/hooks/useTheme.ts`.

---

## 2.2 Sistema de animaciones

### Principios

- **Entrada en viewport** (scroll reveal): elementos aparecen con fade-in + slide-up al entrar en pantalla — usando `IntersectionObserver`
- **Hover states** expresivos en tarjetas y botones (scale, glow, border color)
- **Transiciones consistentes:** duración base `300ms`, easing `ease-out`
- **Reducción de movimiento:** respetar `prefers-reduced-motion` — animaciones desactivadas

### Animaciones definidas (Tailwind `@keyframes`)

| Nombre           | Efecto                              | Uso                                |
| ---------------- | ----------------------------------- | ---------------------------------- |
| `fade-in-up`     | `opacity 0→1` + `translateY 24px→0` | Reveal de secciones y tarjetas     |
| `fade-in`        | `opacity 0→1`                       | Texto hero sobre video             |
| `slide-in-right` | `translateX 40px→0` + `opacity 0→1` | Menú mobile al abrir               |
| `pulse-soft`     | Escala 1→1.04→1 suave               | Botón WhatsApp llamada a la acción |

```css
/* En @theme de index.css */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes pulse-soft {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.06);
  }
}
```

### Clases Tailwind de animación a usar

```html
<!-- Reveal en scroll -->
<div
  class="opacity-0 translate-y-6 transition-all duration-500 ease-out [&.visible]:opacity-100 [&.visible]:translate-y-0"
>
  <!-- Hover en tarjeta -->
  <article
    class="border border-(--color-border) hover:border-white/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
  >
    <!-- WhatsApp pulse -->
    <a class="animate-[pulse-soft_2s_ease-in-out_infinite]"></a>
  </article>
</div>
```

---

## 2.3 Responsive Design

### Breakpoints (Tailwind v4 defaults)

| Token    | Viewport | Descripción       |
| -------- | -------- | ----------------- |
| _(base)_ | 0px+     | Mobile first      |
| `sm`     | 640px+   | Teléfonos grandes |
| `md`     | 768px+   | Tablets           |
| `lg`     | 1024px+  | Desktop           |
| `xl`     | 1280px+  | Desktop ancho     |

### Reglas por sección

| Sección        | Mobile                 | Tablet (md)                | Desktop (lg)                            |
| -------------- | ---------------------- | -------------------------- | --------------------------------------- |
| Header         | Logo + hamburguesa     | Logo + hamburguesa         | Logo + nav inline + RRSS + toggle theme |
| Nosotros       | Texto debajo del video | Texto superpuesto centrado | Texto superpuesto con max-width         |
| Servicios grid | 1 columna              | 2 columnas                 | 3 columnas                              |
| Contacto       | Stack vertical         | Stack vertical             | 2 columnas (datos \| formulario)        |

### Contenedor base

```html
<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"></div>
```

---

## 3. Estructura de la página

```
┌─────────────────────────────────────────────┐
│  HEADER  (sticky, dark)                     │
│  Logo · RRSS (Facebook, Instagram) · Menú   │
├─────────────────────────────────────────────┤
│  SECCIÓN: NOSOTROS                          │
│  Hero con video institucional + texto        │
├─────────────────────────────────────────────┤
│  SECCIÓN: SERVICIOS                         │
│  Grid de tarjetas (11 categorías)           │
├─────────────────────────────────────────────┤
│  SECCIÓN: CONTACTO                          │
│  Datos · Mapa embed · Formulario            │
└─────────────────────────────────────────────┘
│  BOTÓN FLOTANTE WhatsApp (bottom-right)     │
```

### Navegación

- Menú hamburguesa en mobile
- Anclas: `#nosotros`, `#servicios`, `#contacto`
- Links de RRSS en header: Facebook + Instagram (íconos SVG)

---

## 4. Secciones detalladas

### 4.1 Header

- Sticky (permanece visible al hacer scroll)
- Fondo negro
- Izquierda: logo (SVG o PNG con texto "BANDURRIA" + subtítulo "Gráfica y Deco")
- Derecha: íconos Facebook + Instagram
- Mobile: botón hamburguesa que despliega menú con anclas

---

### 4.2 Sección: Nosotros

**Contenido visual:**

- Video institucional de fondo (formato MP4, ~57s)
  - URL original: `/wp-content/uploads/2023/11/BANDURRIA_Corte3.mp4`
  - Fallback: imagen estática (poster)

**Texto sobre video:**

> **"Un gusto en conocerte."**
>
> Somos Nicolás y Germán, hermanos y cofundadores de Bandurria.
>
> Hace más de 10 años nos propusimos renunciar a nuestros trabajos para crear algo
> que nos permitiera crecer profesionalmente, ser independientes, y sentirnos
> orgullosos de ello.
>
> Inicialmente, creímos que este orgullo tenía que ver con lograr tener una gran
> empresa, con muchos empleados y grandes clientes; rápidamente nos apartamos de
> esa idea.
>
> Hoy encontramos la satisfacción en hacer las cosas bien, en ser lo más eficientes
> posibles y en tener relaciones sanas y duraderas con nuestros clientes y
> empleados. En eso trabajamos todos los días.

---

### 4.3 Sección: Servicios

Grid responsive de tarjetas. Cada tarjeta tiene:

- Ícono o imagen representativa
- Título del servicio (h3)
- Descripción y lista de ítems

#### Categorías y contenido

**1. Exhibidores**

- Nos encargamos de la producción integral de tus exhibidores.
- Impresión en gran calidad y corte sobre plástico corrugado desde 2 a 10mm de espesor.

**2. Fabricación de artículos deco y para el hogar**

- Ideales para sumar a tu emprendimiento o negocio. Envianos tus diseños o utiliza los de nuestro catálogo.
- Cortinas de baño
- Individuales de mesa
- Posavasos
- Manteles
- Alfombras
- Mousepads
- Chapas vintage

**3. Impresión en gran formato**

- Imprimimos sobre los siguientes materiales:
- Lona front 13oz brillo y mate
- Lona front 7oz para vía pública
- Lona backlight
- Lona blackout
- Lona mesh
- Lienzo canvas de algodón
- Cuerina o ecocuero
- Papel citylight y fotográfico
- Vinilo base blanca
- Vinilo base gris
- Vinilo cristal
- Vinilo microperforado
- Imán

**4. Terminaciones para lonas**

- Refilado recto o con forma
- Armado de bolsillos para colgar o tensar
- Soldado de lonas de gran tamaño
- Refuerzo perimetral y ojalillado

**5. Terminaciones en vinilo**

- Corte y medio corte, recto o en silueta
- Laminado brillo y mate
- Laminado blanco para fondeo de impresiones cristal

**6. Rígidos / POP**

- Impresión UV directa sobre el material mediante cama plana y corte automatizado.
- Materiales: PVC, PAI, Foamboard, Plástico corrugado, Pet, y muchos otros.

**7. Impresión sobre materiales rígidos y semirígidos a pedido**

- Envianos el material, nosotros lo imprimimos. En color y también blanco.
- Podemos imprimir sobre: chapa galvanizada, acero, plásticos, vidrio, acrílico, madera, goma eva, alfombra, corcho, entre otros.

**8. Cartelería y vía pública**

- Contamos con equipos de impresión de hasta 320cm de ancho sin uniones.
- Utilizamos tintas UV con excelente durabilidad en intemperie.

**9. Banner y porta banner**

- Stock permanente y gran capacidad de producción.
- Banner con porta banner: 90×190cm
- Tipo Roll Up: 200×85cm

**10. Servicio de corte**

- Ofrecemos servicio de corte completo, medio corte, corte a 45° y trazado sobre una amplia gama de sustratos.

**11. Back de prensa**

- Stock permanente en: 150×200cm / 200×200cm / 300×200cm
- Fabricación en medidas especiales a pedido.

---

### 4.4 Sección: Contacto

**Datos de contacto:**

| Ítem      | Valor                               |
| --------- | ----------------------------------- |
| Teléfono  | 5227-8002                           |
| Dirección | Montenegro 133, Chacarita, CABA     |
| Horario   | Lunes a Viernes de 9:15 a 17:45 hs. |
| Email     | contacto@bandurriadeco.com.ar       |

**Mapa:**

- Google Maps embed (iframe) centrado en Montenegro 133, Chacarita, CABA
- Link "¿Dónde estamos?" para abrir en Maps

**Formulario de contacto:**

| Campo   | Tipo          | Requerido |
| ------- | ------------- | --------- |
| Nombre  | text          | Sí        |
| Mail    | email         | Sí        |
| Asunto  | text          | Sí        |
| Mensaje | textarea      | Sí        |
| Enviar  | button submit | —         |

---

### 4.5 Botón flotante WhatsApp

- Posición: `fixed` bottom-right
- Color: verde (`#25D366`)
- Ícono: SVG de WhatsApp
- Acción: `https://wa.me/5491152278002` (número en formato internacional)

---

## 5. Redes sociales

| Red       | URL                                       |
| --------- | ----------------------------------------- |
| Facebook  | https://www.facebook.com/bandurria.deco.7 |
| Instagram | https://www.instagram.com/bandurriadeco   |

---

## 6. Requerimientos técnicos

### Stack

- **Framework:** React 19 + TypeScript 6
- **Build:** Vite 8
- **Estilos:** Tailwind CSS v4 (con `@tailwindcss/vite`)
- **Package manager:** pnpm

### Estructura de archivos propuesta

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # sticky, dark/light toggle, hamburguesa
│   │   └── WhatsAppButton.tsx  # botón flotante con pulse animation
│   ├── sections/
│   │   ├── Nosotros.tsx        # hero video + scroll reveal
│   │   ├── Servicios.tsx       # grid 11 tarjetas con reveal stagger
│   │   ├── ServiceCard.tsx     # tarjeta individual con hover animations
│   │   └── Contacto.tsx        # datos + mapa + formulario
│   └── ui/
│       └── RevealOnScroll.tsx  # wrapper con IntersectionObserver
├── hooks/
│   └── useTheme.ts             # dark/light toggle + localStorage
├── data/
│   └── services.ts             # Array tipado con las 11 categorías
├── App.tsx
├── main.tsx
└── index.css                   # @theme tokens, @keyframes, base styles
```

### Tailwind best practices a seguir

- Usar `@theme` en `index.css` para todos los tokens de color y animación
- Nunca usar colores hardcodeados en JSX — siempre via `bg-(--color-bg)` o tokens
- Clases de utilidad agrupadas por responsabilidad: layout → spacing → typography → color → animation
- Preferir `transition-all duration-300 ease-out` consistente en todos los elementos interactivos
- Usar variante `dark:` solo como fallback; el sistema principal es la clase `.light` en `<html>`
- `motion-safe:` prefix en todas las animaciones para respetar `prefers-reduced-motion`

### Responsive breakpoints (Tailwind)

| Breakpoint | Viewport   | Grid servicios |
| ---------- | ---------- | -------------- |
| mobile     | < 768px    | 1 columna      |
| tablet     | 768–1024px | 2 columnas     |
| desktop    | > 1024px   | 3–4 columnas   |

---

## 6.2 SEO — Posicionamiento inigualable

### Estrategia general

El sitio debe estar completamente optimizado para buscadores desde el código base,
sin depender de plugins externos. El foco es: **velocidad**, **semántica HTML correcta**
y **señales de relevancia local** (Chacarita, CABA, Argentina).

---

### 6.2.1 HTML semántico y estructura

- Un único `<h1>` por página con la keyword principal (p.ej. _"Imprenta y Deco en Chacarita"_)
- Jerarquía correcta: `h1 > h2 > h3` sin saltos
- `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` nativos (no `<div>` genéricos)
- Atributo `lang="es-AR"` en `<html>`
- Todas las `<img>` y `<video>` con `alt` descriptivo y `title` cuando corresponda

---

### 6.2.2 `<head>` — Metadatos completos

Gestionados desde `src/seo/meta.ts` e inyectados en `index.html` (estáticos) o
via `react-helmet-async` si se requiere dinamismo.

```html
<!-- Esenciales -->
<title>Bandurria Gráfica y Deco | Imprenta en Chacarita, CABA</title>
<meta
  name="description"
  content="Impresión gran formato, exhibidores, artículos deco y cartelería en Chacarita. Más de 10 años de experiencia. Pedi tu presupuesto."
/>
<meta
  name="keywords"
  content="imprenta Chacarita, impresión gran formato Buenos Aires, exhibidores, vinilo, lona, carteleria, deco hogar"
/>
<link rel="canonical" href="https://bandurriadeco.com.ar/" />

<!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://bandurriadeco.com.ar/" />
<meta
  property="og:title"
  content="Bandurria Gráfica y Deco | Imprenta en Chacarita"
/>
<meta
  property="og:description"
  content="Impresión gran formato, exhibidores y artículos deco en Chacarita, CABA."
/>
<meta property="og:image" content="https://bandurriadeco.com.ar/og-image.jpg" />
<meta property="og:locale" content="es_AR" />
<meta property="og:site_name" content="Bandurria Gráfica y Deco" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta
  name="twitter:title"
  content="Bandurria Gráfica y Deco | Imprenta en Chacarita"
/>
<meta
  name="twitter:description"
  content="Impresión gran formato, exhibidores y artículos deco."
/>
<meta
  name="twitter:image"
  content="https://bandurriadeco.com.ar/og-image.jpg"
/>

<!-- Móvil -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta
  name="theme-color"
  content="#0A0A0A"
  media="(prefers-color-scheme: dark)"
/>
<meta
  name="theme-color"
  content="#F5F5F4"
  media="(prefers-color-scheme: light)"
/>

<!-- Robots -->
<meta name="robots" content="index, follow" />
```

---

### 6.2.3 Structured Data (JSON-LD)

Dos bloques de datos estructurados en `<script type="application/ld+json">`:

**LocalBusiness** (posicionamiento local):

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Bandurria Gráfica y Deco",
  "image": "https://bandurriadeco.com.ar/og-image.jpg",
  "url": "https://bandurriadeco.com.ar",
  "telephone": "+541152278002",
  "email": "contacto@bandurriadeco.com.ar",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Montenegro 133",
    "addressLocality": "Chacarita",
    "addressRegion": "CABA",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -34.5927,
    "longitude": -58.4528
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:15",
      "closes": "17:45"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/bandurria.deco.7",
    "https://www.instagram.com/bandurriadeco"
  ]
}
```

**WebSite** (sitelinks search box):

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Bandurria Gráfica y Deco",
  "url": "https://bandurriadeco.com.ar"
}
```

---

### 6.2.4 Performance y Core Web Vitals

El SEO moderno penaliza sitios lentos. Objetivos mínimos:

| Métrica                         | Objetivo                   | Herramienta    |
| ------------------------------- | -------------------------- | -------------- |
| LCP (Largest Contentful Paint)  | < 2.5s                     | Lighthouse     |
| INP (Interaction to Next Paint) | < 200ms                    | CrUX           |
| CLS (Cumulative Layout Shift)   | < 0.1                      | Lighthouse     |
| Lighthouse Performance          | ≥ 90 mobile / ≥ 95 desktop | `pnpm preview` |
| Lighthouse SEO                  | 100                        | Lighthouse     |
| Lighthouse Accessibility        | ≥ 95                       | Lighthouse     |

**Implementaciones obligatorias:**

- `<img>` con `width` y `height` explícitos para evitar CLS
- `loading="lazy"` en imágenes fuera del fold
- `fetchpriority="high"` en la imagen/video del hero (LCP)
- Fuentes del sistema (no Google Fonts) para evitar render-blocking
- Video del hero con `preload="none"` en mobile, `preload="metadata"` en desktop
- `<link rel="preconnect">` para dominios externos (Google Maps)

---

### 6.2.5 Archivo `robots.txt` y `sitemap.xml`

**`public/robots.txt`:**

```
User-agent: *
Allow: /
Sitemap: https://bandurriadeco.com.ar/sitemap.xml
```

**`public/sitemap.xml`** (generado estáticamente):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bandurriadeco.com.ar/</loc>
    <lastmod>2026-05-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

### 6.2.6 Favicons y PWA mínimo

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

**`public/site.webmanifest`:**

```json
{
  "name": "Bandurria Gráfica y Deco",
  "short_name": "Bandurria",
  "theme_color": "#0A0A0A",
  "background_color": "#0A0A0A",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 7. Criterios de aceptación

### Funcionalidad core

- [ ] Header sticky visible en todas las secciones
- [ ] Navegación por anclas funciona con scroll suave
- [ ] Sección Nosotros muestra video o imagen fallback correctamente
- [ ] Las 11 tarjetas de servicios se muestran en grilla responsive
- [ ] Formulario de contacto valida campos requeridos antes de enviar
- [ ] Mapa de Google Maps se embebe correctamente
- [ ] Botón WhatsApp flotante visible en todo momento
- [ ] Menú hamburguesa funciona en mobile

### Responsive

- [ ] Layout correcto en viewport 375px (iPhone SE)
- [ ] Layout correcto en viewport 768px (iPad)
- [ ] Layout correcto en viewport 1280px+ (desktop)
- [ ] Sin overflow horizontal en ningún breakpoint

### Dark / Light Mode

- [ ] Modo dark activo por defecto
- [ ] Toggle en Header cambia el modo visualmente
- [ ] Preferencia persiste al recargar (localStorage)
- [ ] Transición suave entre modos (`transition: background-color 0.3s`)
- [ ] Todos los textos son legibles en ambos modos (contraste WCAG AA)

### Animaciones

- [ ] Secciones y tarjetas hacen fade-in-up al entrar en viewport
- [ ] Tarjetas de servicios tienen hover: elevación + borde iluminado
- [ ] Botón WhatsApp tiene animación pulse suave y continua
- [ ] Menú mobile entra con slide-in-right
- [ ] `prefers-reduced-motion`: sin animaciones cuando el sistema lo indica

### SEO

- [ ] `<html lang="es-AR">` presente
- [ ] `<title>` y `<meta name="description">` con keywords locales
- [ ] Open Graph + Twitter Card completos con imagen `og-image.jpg`
- [ ] JSON-LD `LocalBusiness` con dirección, teléfono y horario
- [ ] JSON-LD `WebSite` presente
- [ ] `robots.txt` accesible en `/robots.txt`
- [ ] `sitemap.xml` accesible en `/sitemap.xml`
- [ ] `site.webmanifest` accesible y válido
- [ ] Un único `<h1>` con keyword principal
- [ ] Todas las imágenes con `alt`, `width` y `height`
- [ ] Lighthouse SEO score = 100
- [ ] Lighthouse Performance ≥ 90 en mobile
- [ ] CLS < 0.1 / LCP < 2.5s / INP < 200ms

### Calidad de código

- [ ] Sin errores de TypeScript (`pnpm tsc --noEmit`)
- [ ] Sin errores de ESLint (`pnpm lint`)
- [ ] `pnpm build` produce un bundle sin warnings
