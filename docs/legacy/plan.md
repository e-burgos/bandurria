# Bandurria Deco — Plan de Implementación (SDD)

> Referencia: [docs/specs/site-spec.md](./specs/site-spec.md)

## Grafo de dependencias

```
Task 1 (Setup)
    └── Task 2 (Data layer)
            ├── Task 3 (Header)
            ├── Task 4 (Nosotros)
            ├── Task 5 (Servicios) ← depende de Task 2
            ├── Task 6 (Contacto)
            └── Task 7 (WhatsApp button)
                        └── Task 8 (Assembly — App.tsx)
                                    └── Task 9 (Verificación final)
                                                └── Task 10 (SEO)
```

**Tasks paralelas (pueden ejecutarse juntas):** 3, 4, 5, 6, 7

---

## Task 1 — Setup y limpieza del boilerplate

**Dominio:** Infraestructura  
**Depende de:** —  
**Bloquea:** todas las demás

### Contexto

El proyecto fue inicializado con `vite --template react-ts`. El `App.tsx` contiene
el boilerplate de Vite (logos, contador). Hay que limpiarlo y dejar la base lista
para el sitio real, incluyendo el sistema de design tokens (colores, animaciones)
y el hook de dark/light mode.

### Archivos a tocar

| Archivo                                | Acción                                                        |
| -------------------------------------- | ------------------------------------------------------------- |
| `src/App.tsx`                          | Reemplazar boilerplate por shell vacío                        |
| `src/App.css`                          | Eliminar — mover todo a index.css                             |
| `src/index.css`                        | Sistema de design tokens completo con `@theme` y `@keyframes` |
| `src/main.tsx`                         | Sin cambios                                                   |
| `vite.config.ts`                       | Verificar que `@tailwindcss/vite` esté configurado            |
| `src/hooks/useTheme.ts`                | Crear — hook dark/light mode con localStorage                 |
| `src/components/ui/RevealOnScroll.tsx` | Crear — wrapper IntersectionObserver                          |

### Pasos

1. Vaciar `App.tsx` → retorna `<></>` por ahora, aplicar clase del tema en `<html>`
2. Eliminar `App.css` — consolidar estilos en `index.css`
3. En `index.css` configurar el sistema completo:

   ```css
   @import "tailwindcss";

   @theme {
     /* Color tokens */
     --color-bg: #0a0a0a;
     --color-bg-card: #141414;
     --color-bg-surface: #1a1a1a;
     --color-text: #f5f5f4;
     --color-text-muted: #a3a3a3;
     --color-border: rgba(255, 255, 255, 0.08);
     --color-accent: #25d366;

     /* Keyframes */
     --animate-fade-in-up: fade-in-up 0.5s ease-out both;
     --animate-fade-in: fade-in 0.6s ease-out both;
     --animate-slide-in-right: slide-in-right 0.3s ease-out both;
     --animate-pulse-soft: pulse-soft 2s ease-in-out infinite;
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

   html {
     scroll-behavior: smooth;
     background-color: var(--color-bg);
     color: var(--color-text);
     transition:
       background-color 0.3s ease,
       color 0.3s ease;
   }
   ```

4. Crear `src/hooks/useTheme.ts`:

   ```ts
   import { useEffect, useState } from "react";

   type Theme = "dark" | "light";

   export function useTheme() {
     const [theme, setTheme] = useState<Theme>(
       () => (localStorage.getItem("theme") as Theme) ?? "dark",
     );

     useEffect(() => {
       const root = document.documentElement;
       if (theme === "light") {
         root.classList.add("light");
       } else {
         root.classList.remove("light");
       }
       localStorage.setItem("theme", theme);
     }, [theme]);

     const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
     return { theme, toggle };
   }
   ```

5. Crear `src/components/ui/RevealOnScroll.tsx`:

   ```tsx
   import { useEffect, useRef, type ReactNode } from "react";

   interface Props {
     children: ReactNode;
     className?: string;
     delay?: number; // ms de delay para stagger
   }

   export function RevealOnScroll({
     children,
     className = "",
     delay = 0,
   }: Props) {
     const ref = useRef<HTMLDivElement>(null);

     useEffect(() => {
       const el = ref.current;
       if (!el) return;
       const observer = new IntersectionObserver(
         ([entry]) => {
           if (entry.isIntersecting) {
             el.classList.add("visible");
             observer.disconnect();
           }
         },
         { threshold: 0.15 },
       );
       observer.observe(el);
       return () => observer.disconnect();
     }, []);

     return (
       <div
         ref={ref}
         style={{ transitionDelay: `${delay}ms` }}
         className={`opacity-0 translate-y-6 transition-all duration-500 ease-out [&.visible]:opacity-100 [&.visible]:translate-y-0 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${className}`}
       >
         {children}
       </div>
     );
   }
   ```

6. Crear estructura de carpetas: `src/components/layout/`, `src/components/sections/`, `src/components/ui/`, `src/hooks/`, `src/data/`

### Verificación

```bash
pnpm dev        # servidor levanta sin errores de consola
pnpm build      # build limpio
```

### Exit criteria

- `pnpm dev` corre sin errores
- Pantalla con fondo `#0A0A0A` (no el boilerplate de Vite)
- `useTheme` hook exportado correctamente
- `RevealOnScroll` componente exportado correctamente

---

## Task 2 — Data layer: services.ts

**Dominio:** Data  
**Depende de:** Task 1  
**Bloquea:** Task 5

### Contexto

Las 11 categorías de servicios deben estar tipadas y centralizadas. El componente
`Servicios.tsx` las consumirá como array.

### Archivos a tocar

| Archivo                | Acción                                |
| ---------------------- | ------------------------------------- |
| `src/data/services.ts` | Crear — tipos + array de 11 servicios |

### Pasos

1. Definir interfaz `Service`:
   ```ts
   interface Service {
     id: string;
     title: string;
     description?: string;
     items: string[];
   }
   ```
2. Exportar array `SERVICES: Service[]` con los 11 ítems de la spec
3. Verificar que el array tiene exactamente 11 elementos

### Verificación

```bash
pnpm tsc --noEmit   # sin errores de tipos
```

### Exit criteria

- Archivo `src/data/services.ts` exporta `SERVICES` con 11 elementos
- Sin errores de TypeScript

---

## Task 3 — Componente: Header

**Dominio:** Layout  
**Depende de:** Task 1  
**Paralela con:** Task 4, 6, 7

### Contexto

Header sticky con fondo `bg-(--color-bg)/95 backdrop-blur`. Contiene: logo textual,
íconos RRSS, toggle dark/light mode y menú hamburguesa en mobile. El header se
"eleva" visualmente al hacer scroll (sombra sutil que aparece).

### Archivos a tocar

| Archivo                            | Acción |
| ---------------------------------- | ------ |
| `src/components/layout/Header.tsx` | Crear  |

### Pasos

1. Crear `Header.tsx` con estados:
   - `menuOpen: boolean` — menú mobile
   - `scrolled: boolean` — sombra al hacer scroll (via `useEffect` + `window.addEventListener('scroll')`)
   - recibe `{ theme, toggleTheme }` como props (del hook `useTheme` en App)
2. Estructura:
   ```
   <header class="sticky top-0 z-50 bg-(--color-bg)/95 backdrop-blur-md
                  border-b border-(--color-border) transition-shadow duration-300
                  [&.scrolled]:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
     <div class="container mx-auto flex items-center justify-between px-4 h-16">
       <Logo />        ← texto BANDURRIA (bold) + subtext Gráfica y Deco
       <nav>           ← hidden md:flex — links anclas con hover underline animado
       <div>           ← flex items-center gap-3
         <ThemeToggle /> ← botón ícono sol/luna
         <RRSSLinks />   ← Facebook + Instagram SVG
         <HamburgerBtn />← visible solo mobile, animación X al abrir
       </div>
     </div>
     <MobileMenu />    ← condicional, animate-slide-in-right, fondo bg-(--color-bg)
   </header>
   ```
3. Links de nav: `relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300`
4. Ícono hamburguesa: anima las 3 líneas → X con `transition-transform`
5. Mobile menu: `animate-[slide-in-right_0.3s_ease-out]`, cierra al clickar link
6. `ThemeToggle`: ícono luna (dark) ↔ sol (light) con `transition-transform rotate-0 hover:rotate-12`

### Verificación

```bash
pnpm build   # sin errores
```

### Exit criteria

- Header sticky con blur y sombra al scrollear
- Toggle dark/light funciona y el ícono cambia
- Menú mobile entra con slide-in-right y X animada
- Links de nav tienen underline animado en hover

---

## Task 4 — Componente: Nosotros

**Dominio:** Sección  
**Depende de:** Task 1  
**Paralela con:** Task 3, 6, 7

### Contexto

Sección hero con video de fondo (MP4). Si el video no carga, mostrar imagen
estática como fallback (poster). Texto superpuesto con el copy de los fundadores.

### Archivos a tocar

| Archivo                                | Acción |
| -------------------------------------- | ------ |
| `src/components/sections/Nosotros.tsx` | Crear  |

### Pasos

1. Estructura:
   ```
   <section id="nosotros"> (relative, min-h-screen)
     <video> (absolute inset-0, object-cover, autoPlay muted loop playsInline)
     <div overlay> (absolute inset-0, bg-black/60)
     <div content> (relative z-10, texto de los fundadores)
   </section>
   ```
2. `<video>` con `src` del MP4, atributo `poster` con imagen fallback
3. Texto: título h1 "Nosotros", párrafos con el copy exacto de la spec
4. Imagen poster: placeholder oscuro con color `#0A0A0A`

### Verificación

```bash
pnpm build   # sin errores
```

### Exit criteria

- Sección ocupa full viewport (min-h-screen)
- Video reproduce o muestra poster si falla
- Texto legible sobre el video

---

## Task 5 — Componente: Servicios

**Dominio:** Sección  
**Depende de:** Task 1, Task 2  
**Paralela con:** Task 3, 4, 6, 7 (una vez Task 2 esté done)

### Contexto

Grid responsive de 11 tarjetas. Consume `SERVICES` de `src/data/services.ts`.
Cada tarjeta tiene hover expressivo y las tarjetas revelan en stagger al hacer scroll.

### Archivos a tocar

| Archivo                                   | Acción |
| ----------------------------------------- | ------ |
| `src/components/sections/Servicios.tsx`   | Crear  |
| `src/components/sections/ServiceCard.tsx` | Crear  |

### Pasos

1. `Servicios.tsx`:
   ```tsx
   <section id="servicios" className="py-20 bg-(--color-bg)">
     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       <RevealOnScroll>
         <h2 className="text-3xl font-bold text-(--color-text) mb-12 text-center">
           Servicios
         </h2>
       </RevealOnScroll>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {SERVICES.map((s, i) => (
           <RevealOnScroll key={s.id} delay={i * 60}>
             <ServiceCard service={s} />
           </RevealOnScroll>
         ))}
       </div>
     </div>
   </section>
   ```
2. `ServiceCard.tsx`:
   ```tsx
   <article
     className="
     h-full p-6 rounded-xl
     bg-(--color-bg-card)
     border border-(--color-border)
     hover:border-white/20
     hover:-translate-y-1
     hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
     transition-all duration-300 ease-out
     cursor-default
   "
   >
     <h3 className="text-lg font-semibold text-(--color-text) mb-2">
       {service.title}
     </h3>
     {service.description && (
       <p className="text-(--color-text-muted) text-sm mb-3">
         {service.description}
       </p>
     )}
     <ul className="space-y-1">
       {service.items.map((item) => (
         <li
           key={item}
           className="text-(--color-text-muted) text-sm flex gap-2"
         >
           <span className="text-(--color-accent) mt-0.5">›</span>
           {item}
         </li>
       ))}
     </ul>
   </article>
   ```
3. Stagger: delay incremental de 60ms por tarjeta via `RevealOnScroll delay={i * 60}`

### Verificación

```bash
pnpm build   # sin errores de tipos
```

### Exit criteria

- 11 tarjetas renderizadas con stagger reveal
- Grid: 1 col mobile / 2 col tablet / 3 col desktop
- Hover: elevación + sombra + borde iluminado
- `prefers-reduced-motion`: animaciones desactivadas

---

## Task 6 — Componente: Contacto

**Dominio:** Sección  
**Depende de:** Task 1  
**Paralela con:** Task 3, 4, 7

### Contexto

Sección con dos columnas: datos + mapa a la izquierda, formulario a la derecha.
Formulario con validación HTML5 de campos requeridos. No requiere backend — solo
estructura y validación de frontend.

### Archivos a tocar

| Archivo                                | Acción |
| -------------------------------------- | ------ |
| `src/components/sections/Contacto.tsx` | Crear  |

### Pasos

1. Estructura:
   ```
   <section id="contacto"> (bg-neutral-900, py-20)
     <h2> Contacto
     <div> (grid: 1 col mobile / 2 col desktop)
       <div> (datos de contacto + mapa iframe)
       <div> (formulario)
     </div>
   </section>
   ```
2. Datos de contacto (ícono + texto):
   - Tel: 5227-8002
   - Dirección: Montenegro 133, Chacarita, CABA
   - Horario: Lunes a Viernes de 9:15 a 17:45 hs.
   - Email: contacto@bandurriadeco.com.ar
3. Mapa: `<iframe>` de Google Maps con `src` de embed para Montenegro 133, Chacarita
4. Formulario:
   ```tsx
   <form onSubmit={handleSubmit}>
     <input name="nombre" type="text" required />
     <input name="mail" type="email" required />
     <input name="asunto" type="text" required />
     <textarea name="mensaje" required />
     <button type="submit">Enviar</button>
   </form>
   ```
5. Estado local `useState` para los campos y feedback de envío (mensaje "¡Gracias!")

### Verificación

```bash
pnpm build   # sin errores
# Test manual: intentar submit con campos vacíos → HTML5 validation muestra error
```

### Exit criteria

- Datos de contacto visibles
- Mapa iframe renderizado
- Formulario valida campos requeridos antes de submit

---

## Task 7 — Componente: WhatsApp Button

**Dominio:** Layout  
**Depende de:** Task 1  
**Paralela con:** Task 3, 4, 6

### Contexto

Botón flotante fijo en esquina inferior derecha. Siempre visible. Abre el chat
de WhatsApp con el número de la empresa en formato internacional.

### Archivos a tocar

| Archivo                                    | Acción |
| ------------------------------------------ | ------ |
| `src/components/layout/WhatsAppButton.tsx` | Crear  |

### Pasos

1. Estructura:
   ```
   <a
     href="https://wa.me/5491152278002"
     target="_blank"
     rel="noopener noreferrer"
     className="fixed bottom-6 right-6 z-50 bg-[#25D366] rounded-full p-4 shadow-lg"
   >
     <WhatsAppIcon />
   </a>
   ```
2. Ícono: SVG inline de WhatsApp (24×24, blanco)
3. Efecto hover: `hover:scale-110 transition-transform`

### Verificación

```bash
pnpm build   # sin errores
```

### Exit criteria

- Botón visible en todas las secciones (fixed)
- Link correcto a WhatsApp con el número de la empresa
- Hover effect visible

---

## Task 8 — Assembly: App.tsx

**Dominio:** Composición  
**Depende de:** Tasks 3, 4, 5, 6, 7  
**Bloquea:** Task 9

### Contexto

Ensamblar todos los componentes en `App.tsx`. Integrar `useTheme` y pasar
`{ theme, toggle }` al Header. El tema dark/light se aplica en `<html>` via el hook.

### Archivos a tocar

| Archivo       | Acción                                     |
| ------------- | ------------------------------------------ |
| `src/App.tsx` | Composición final con `useTheme` integrado |

### Pasos

1. `App.tsx`:

   ```tsx
   import { useTheme } from "./hooks/useTheme";
   import Header from "./components/layout/Header";
   import WhatsAppButton from "./components/layout/WhatsAppButton";
   import Nosotros from "./components/sections/Nosotros";
   import Servicios from "./components/sections/Servicios";
   import Contacto from "./components/sections/Contacto";

   function App() {
     const { theme, toggle } = useTheme();
     return (
       <>
         <Header theme={theme} onToggleTheme={toggle} />
         <main>
           <Nosotros />
           <Servicios />
           <Contacto />
         </main>
         <WhatsAppButton />
       </>
     );
   }
   ```

2. Verificar que el toggle cambia la clase `.light` en `<html>` y los colores cambian
3. Verificar scroll suave entre secciones con los links del Header
4. Verificar `RevealOnScroll` activa `.visible` en todos los elementos al scrollear

### Verificación

```bash
pnpm dev     # probar dark/light toggle, scroll reveal, hover en tarjetas
pnpm build   # sin errores
```

### Exit criteria

- Todas las secciones visibles en orden correcto
- Toggle dark/light funciona y persiste al recargar
- Scroll reveal en secciones y tarjetas de servicios
- Sin errores en consola del browser

---

## Task 9 — Verificación final

**Dominio:** QA  
**Depende de:** Task 8

### Checklist completo

```bash
# 1. Type check
pnpm tsc --noEmit

# 2. Lint
pnpm lint

# 3. Build de producción
pnpm build

# 4. Preview del build
pnpm preview
```

### Criterios de aceptación (de la spec)

**Funcionalidad core**

- [ ] Header sticky visible en todas las secciones
- [ ] Navegación por anclas funciona con scroll suave
- [ ] Sección Nosotros muestra video o imagen fallback correctamente
- [ ] Las 11 tarjetas de servicios se muestran en grilla responsive
- [ ] Formulario de contacto valida campos requeridos antes de enviar
- [ ] Mapa de Google Maps se embebe correctamente
- [ ] Botón WhatsApp flotante visible en todo momento
- [ ] Menú hamburguesa funciona en mobile

**Responsive**

- [ ] Layout correcto en 375px (mobile), 768px (tablet), 1280px+ (desktop)
- [ ] Sin overflow horizontal en ningún breakpoint

**Dark / Light Mode**

- [ ] Modo dark por defecto
- [ ] Toggle en Header cambia el modo con transición suave
- [ ] Preferencia persiste al recargar (localStorage)
- [ ] Todos los textos legibles en ambos modos

**Animaciones**

- [ ] Fade-in-up al entrar secciones y tarjetas en viewport
- [ ] Stagger de 60ms entre tarjetas de servicios
- [ ] Hover en tarjetas: elevación + sombra + borde iluminado
- [ ] WhatsApp button: pulse suave continuo
- [ ] Menú mobile: slide-in-right
- [ ] `prefers-reduced-motion`: sin animaciones

**Calidad**

- [ ] `pnpm tsc --noEmit` sin errores
- [ ] `pnpm lint` sin errores
- [ ] `pnpm build` sin warnings

---

## Task 10 — SEO

**Dominio:** SEO / Performance  
**Depende de:** Task 9  
**Bloquea:** — (es la task final)

### Contexto

Con el sitio ensamblado y verificado, se aplica la capa de SEO completa.
El objetivo es Lighthouse SEO = 100, Performance ≥ 90 mobile y ≥ 95 desktop,
y posicionamiento local en búsquedas de imprenta/deco en Chacarita, CABA.

### Archivos a tocar

| Archivo                   | Acción                                                                  |
| ------------------------- | ----------------------------------------------------------------------- |
| `index.html`              | Agregar todos los `<meta>`, JSON-LD, favicon links, `lang="es-AR"`      |
| `public/robots.txt`       | Crear                                                                   |
| `public/sitemap.xml`      | Crear                                                                   |
| `public/site.webmanifest` | Crear                                                                   |
| `src/seo/meta.ts`         | Crear — exportar constantes de metadatos (title, description, OG, etc.) |

### Pasos

1. **`index.html`** — completar el `<head>`:

   ```html
   <!doctype html>
   <html lang="es-AR">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />

       <!-- SEO esenciales -->
       <title>Bandurria Gráfica y Deco | Imprenta en Chacarita, CABA</title>
       <meta
         name="description"
         content="Impresión gran formato, exhibidores, artículos deco y cartelería en Chacarita. Más de 10 años de experiencia. Pedí tu presupuesto."
       />
       <meta name="robots" content="index, follow" />
       <link rel="canonical" href="https://bandurriadeco.com.ar/" />

       <!-- Open Graph -->
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
       <meta
         property="og:image"
         content="https://bandurriadeco.com.ar/og-image.jpg"
       />
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

       <!-- Theme color (dark/light) -->
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

       <!-- Favicons -->
       <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
       <link
         rel="apple-touch-icon"
         sizes="180x180"
         href="/apple-touch-icon.png"
       />
       <link rel="manifest" href="/site.webmanifest" />

       <!-- Preconnect Google Maps -->
       <link rel="preconnect" href="https://maps.googleapis.com" />
       <link rel="preconnect" href="https://maps.gstatic.com" crossorigin />

       <!-- JSON-LD LocalBusiness -->
       <script type="application/ld+json">
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
           "openingHoursSpecification": [
             {
               "@type": "OpeningHoursSpecification",
               "dayOfWeek": [
                 "Monday",
                 "Tuesday",
                 "Wednesday",
                 "Thursday",
                 "Friday"
               ],
               "opens": "09:15",
               "closes": "17:45"
             }
           ],
           "sameAs": [
             "https://www.facebook.com/bandurria.deco.7",
             "https://www.instagram.com/bandurriadeco"
           ]
         }
       </script>

       <!-- JSON-LD WebSite -->
       <script type="application/ld+json">
         {
           "@context": "https://schema.org",
           "@type": "WebSite",
           "name": "Bandurria Gráfica y Deco",
           "url": "https://bandurriadeco.com.ar"
         }
       </script>
     </head>
   </html>
   ```

2. **Performance de imágenes** — verificar en todos los `<img>`:
   - `alt` descriptivo
   - `width` + `height` explícitos (evita CLS)
   - `loading="lazy"` fuera del fold
   - `fetchpriority="high"` solo en la imagen del hero

3. **Video hero** — en `Nosotros.tsx`:
   - Añadir `preload="none"` en mobile via media query JS o attribute condicional
   - `<video>` debe tener `aria-label` o estar dentro de un `<figure>` con `<figcaption>`

4. **Semántica HTML** — auditar:
   - Un solo `<h1>` en toda la página (en sección Nosotros o Hero)
   - Secciones tienen `<h2>` como título de sección
   - Tarjetas de servicios usan `<h3>`
   - Formulario tiene `<label>` asociado a cada `<input>` via `htmlFor`

5. **Crear archivos públicos:**

   ```
   public/
   ├── robots.txt
   ├── sitemap.xml
   └── site.webmanifest
   ```

6. **Verificar con Lighthouse** (en `pnpm preview`):
   ```bash
   # Instalar si no está disponible
   npx lighthouse http://localhost:4173 --output=html --output-path=lighthouse-report.html
   ```

### Verificación

```bash
pnpm build && pnpm preview
# Abrir DevTools > Lighthouse > Mobile + Desktop
# Verificar: SEO=100, Performance ≥ 90 mobile
# Verificar: /robots.txt y /sitemap.xml accesibles
# Verificar: JSON-LD en https://search.google.com/test/rich-results
```

### Exit criteria

- [ ] Lighthouse SEO = 100 (mobile y desktop)
- [ ] Lighthouse Performance ≥ 90 mobile / ≥ 95 desktop
- [ ] Lighthouse Accessibility ≥ 95
- [ ] CLS < 0.1, LCP < 2.5s
- [ ] JSON-LD `LocalBusiness` validado en Rich Results Test
- [ ] Open Graph correcto (verificar con [opengraph.xyz](https://www.opengraph.xyz))
- [ ] `/robots.txt` y `/sitemap.xml` devuelven 200
- [ ] `site.webmanifest` válido

---

## Resumen de tasks

| #   | Task                                                    | Depende de    | Dominio     | Paralela con |
| --- | ------------------------------------------------------- | ------------- | ----------- | ------------ |
| 1   | Setup, design tokens, hooks, RevealOnScroll             | —             | Infra       | —            |
| 2   | Data layer (services.ts)                                | 1             | Data        | —            |
| 3   | Header (sticky, dark/light toggle, hamburguesa animada) | 1             | Layout      | 4, 6, 7      |
| 4   | Sección Nosotros (video hero + fade-in)                 | 1             | Sección     | 3, 6, 7      |
| 5   | Sección Servicios (grid + stagger reveal + hover)       | 1, 2          | Sección     | 3, 4, 6, 7   |
| 6   | Sección Contacto (responsive + formulario)              | 1             | Sección     | 3, 4, 7      |
| 7   | WhatsApp Button (pulse animation)                       | 1             | Layout      | 3, 4, 6      |
| 8   | Assembly App.tsx + integración useTheme                 | 3, 4, 5, 6, 7 | Composición | —            |
| 9   | Verificación final (tsc + lint + build + responsive)    | 8             | QA          | —            |
| 10  | SEO (meta, JSON-LD, robots, sitemap, Lighthouse)        | 9             | SEO         | —            |
