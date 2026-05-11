export interface Service {
  id: string;
  title: string;
  tagline: string;
  description?: string;
  highlight: string;
  items: string[];
  extras?: string[];
  image: string;
  color: string;
}

export const SERVICES: Service[] = [
  {
    id: "gran-formato",
    title: "Cartelería y Gran Formato",
    tagline: "Hasta 320 cm de ancho sin uniones",
    description:
      "Equipos de impresión de última generación con tinta UV de alta resistencia, apta para interior y exterior.",
    highlight: "hasta 320 cm de ancho",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    color: "#25d366",
    items: [
      "Banners con portabanner y tipo Roll Up",
      "Back de prensa",
      "Lonas vinílicas (front, backlight, blackout, mesh)",
      "Vinilos autoadhesivos (base blanca, base gris, cristal, microperforado)",
      "Papeles de distintos gramajes",
      "Lienzo canvas",
      "Cuerina",
      "Imán",
      "Stickers",
    ],
  },
  {
    id: "rigidos-pop",
    title: "Materiales Rígidos / POP",
    tagline: "Corte 100% automatizado con equipo suizo Zünd",
    description:
      "Impresión UV mediante cama plana sobre sustratos rígidos y semirígidos. Tintas CMYK y blanco.",
    highlight: "corte automatizado",
    image:
      "https://images.unsplash.com/photo-1581091870621-1c7a30e45dfc?auto=format&fit=crop&w=1200&q=80",
    color: "#3b82f6",
    items: [
      "PVC · PAI · Foamboard",
      "Plástico corrugado",
      "PET cristal · Cartulina · Cartón",
      "Corte completo, medio corte y a 45°",
      "Tintas CMYK y Blanco",
      "Fabricación de exhibidores",
      "Chapa galvanizada · Acero · Acrílico · Madera",
      "Colgantes · Stoppers · Salientes · Cenefas",
      "Headers · Cubrepallet · Movies",
    ],
    extras: ["Goma eva · Alfombra · Corcho · Vidrio"],
  },
  {
    id: "offset-digital",
    title: "Offset y Digital",
    tagline: "Sin mínimo de tirada — todo en un lugar",
    description:
      "Alta fidelidad de color para tiradas cortas o largas. Sin mínimo en digital.",
    highlight: "sin mínimo de tirada",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    color: "#f59e0b",
    items: [
      "Flyers · Folletos · Posters",
      "Afiches para vía pública",
      "Dípticos · Trípticos · Cuadripticos",
      "Tarjetas",
      "Carpetas de presentación",
      "Encuadernaciones",
      "Catálogos · Revistas",
      "Sobres",
    ],
  },
  {
    id: "terminaciones-lonas",
    title: "Terminaciones para lonas",
    tagline: "Soldado, ojalillado y bolsillos",
    highlight: "ojalillado neumático",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
    color: "#10b981",
    items: [
      "Refilado recto o con forma",
      "Armado de bolsillos para colgar o tensar",
      "Soldado de lonas de gran tamaño",
      "Refuerzo perimetral y ojalillado",
    ],
  },
  {
    id: "terminaciones-vinilo",
    title: "Terminaciones en vinilo",
    tagline: "Corte, laminado y fondeo",
    highlight: "laminado brillo y mate",
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1200&q=80",
    color: "#8b5cf6",
    items: [
      "Corte y medio corte, recto o en silueta",
      "Laminado brillo y mate",
      "Laminado blanco para fondeo de impresiones cristal",
    ],
  },
  {
    id: "back-prensa",
    title: "Back de prensa",
    tagline: "Stock permanente en medidas estándar",
    description: "Stock permanente con fabricación en medidas especiales.",
    highlight: "stock permanente",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    color: "#ef4444",
    items: [
      "150×200 cm",
      "200×200 cm",
      "300×200 cm",
      "Medidas especiales a pedido",
    ],
  },
  {
    id: "banner",
    title: "Banner y porta banner",
    tagline: "Gran capacidad de producción",
    description: "Stock permanente y gran capacidad de producción.",
    highlight: "stock permanente",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=80",
    color: "#f97316",
    items: [
      "Banner con porta banner: 90×190 cm",
      "Tipo Roll Up: 200×85 cm",
      "Medidas especiales a pedido",
    ],
  },
  {
    id: "exhibidores",
    title: "Exhibidores",
    tagline: "Producción integral de exhibidores",
    description: "Nos encargamos de la producción integral de tus exhibidores.",
    highlight: "corte automatizado",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1200&q=80",
    color: "#06b6d4",
    items: [
      "Impresión en gran calidad sobre plástico corrugado",
      "Espesores desde 2 a 10 mm",
      "Corte automatizado con precisión",
    ],
  },
  {
    id: "deco-hogar",
    title: "Artículos deco y para el hogar",
    tagline: "Diseños propios o del catálogo",
    description: "Ideales para sumar a tu emprendimiento o negocio. Envianos tus diseños o utilizá los de nuestro catálogo.",
    highlight: "catálogo propio",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    color: "#ec4899",
    items: [
      "Cortinas de baño",
      "Individuales de mesa · Posavasos",
      "Manteles · Alfombras",
      "Mousepads",
      "Chapas vintage",
    ],
  },
];
