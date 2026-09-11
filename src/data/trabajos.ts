export interface Trabajo {
  id: string;
  alt: string;
  image: string;
  full: string;
}

// PLACEHOLDER: fotos provisorias tomadas del material del brochure.
// Reemplazar `image` (miniatura) y `full` (visor) cuando lleguen las de "FOTOS TRABAJOS".
export const TRABAJOS: Trabajo[] = [
  {
    id: "banner-fachada",
    alt: "Banner institucional impreso, instalado en fachada",
    image: "/trabajos/banner-fachada.webp",
    full: "/trabajos/banner-fachada-full.webp",
  },
  {
    id: "roll-ups",
    alt: "Banners de pie tipo roll up con impresión institucional",
    image: "/trabajos/roll-ups.webp",
    full: "/trabajos/roll-ups-full.webp",
  },
  {
    id: "stickers",
    alt: "Stickers troquelados impresos a color",
    image: "/trabajos/stickers.webp",
    full: "/trabajos/stickers-full.webp",
  },
  {
    id: "back-prensa",
    alt: "Back de prensa montado con estructura",
    image: "/trabajos/back-prensa.webp",
    full: "/trabajos/back-prensa-full.webp",
  },
  {
    id: "vinilo-piso",
    alt: "Vinilo impreso colocado en piso",
    image: "/trabajos/vinilo-piso.webp",
    full: "/trabajos/vinilo-piso-full.webp",
  },
  {
    id: "offset",
    alt: "Piezas de offset y digital: folletos, dípticos y catálogos",
    image: "/trabajos/offset.webp",
    full: "/trabajos/offset-full.webp",
  },
  {
    id: "equipos",
    alt: "Equipos de impresión y corte de la planta",
    image: "/trabajos/equipos.webp",
    full: "/trabajos/equipos-full.webp",
  },
  {
    id: "gran-formato",
    alt: "Impresora de gran formato con lona en producción",
    image: "/trabajos/gran-formato.webp",
    full: "/trabajos/gran-formato-full.webp",
  },
];
