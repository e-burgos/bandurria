export interface Service {
  id: string;
  title: string;
  description?: string;
  items: string[];
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: "exhibidores",
    title: "Exhibidores",
    description: "Nos encargamos de la producción integral de tus exhibidores.",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=75",
    items: [
      "Impresión en gran calidad sobre plástico corrugado",
      "Espesores desde 2 a 10mm",
      "Corte automatizado con precisión",
    ],
  },
  {
    id: "deco-hogar",
    title: "Artículos deco y para el hogar",
    description:
      "Ideales para sumar a tu emprendimiento o negocio. Envianos tus diseños o utilizá los de nuestro catálogo.",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=75",
    items: [
      "Cortinas de baño",
      "Individuales de mesa",
      "Posavasos",
      "Manteles",
      "Alfombras",
      "Mousepads",
      "Chapas vintage",
    ],
  },
  {
    id: "gran-formato",
    title: "Impresión en gran formato",
    description: "Imprimimos sobre los siguientes materiales:",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=75",
    items: [
      "Lona front 13oz brillo y mate",
      "Lona front 7oz para vía pública",
      "Lona backlight",
      "Lona blackout",
      "Lona mesh",
      "Lienzo canvas de algodón",
      "Cuerina o ecocuero",
      "Papel citylight y fotográfico",
      "Vinilo base blanca",
      "Vinilo base gris",
      "Vinilo cristal",
      "Vinilo microperforado",
      "Imán",
    ],
  },
  {
    id: "terminaciones-lonas",
    title: "Terminaciones para lonas",
    image: "https://picsum.photos/seed/lonas/600/340",
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
    image:
      "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=600&q=75",
    items: [
      "Corte y medio corte, recto o en silueta",
      "Laminado brillo y mate",
      "Laminado blanco para fondeo de impresiones cristal",
    ],
  },
  {
    id: "rigidos-pop",
    title: "Rígidos / POP",
    description:
      "Impresión UV directa sobre el material mediante cama plana y corte automatizado.",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=75",
    items: [
      "PVC, PAI, Foamboard",
      "Plástico corrugado",
      "PET y muchos otros materiales",
    ],
  },
  {
    id: "rigidos-pedido",
    title: "Rígidos y semirígidos a pedido",
    description:
      "Envianos el material, nosotros lo imprimimos. En color y también blanco.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=75",
    items: [
      "Chapa galvanizada y acero",
      "Plásticos, vidrio, acrílico",
      "Madera, goma eva, alfombra, corcho",
    ],
  },
  {
    id: "carteleria",
    title: "Cartelería y vía pública",
    image:
      "https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?auto=format&fit=crop&w=600&q=75",
    items: [
      "Equipos de impresión hasta 320cm de ancho sin uniones",
      "Tintas UV con excelente durabilidad en intemperie",
    ],
  },
  {
    id: "banner",
    title: "Banner y porta banner",
    description: "Stock permanente y gran capacidad de producción.",
    image: "https://picsum.photos/seed/banner/600/340",
    items: [
      "Banner con porta banner: 90×190cm",
      "Tipo Roll Up: 200×85cm",
      "Medidas especiales a pedido",
    ],
  },
  {
    id: "corte",
    title: "Servicio de corte",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=75",
    items: [
      "Corte completo y medio corte",
      "Corte a 45° y trazado",
      "Amplia gama de sustratos",
    ],
  },
  {
    id: "back-prensa",
    title: "Back de prensa",
    description: "Stock permanente con fabricación en medidas especiales.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=75",
    items: [
      "150×200cm",
      "200×200cm",
      "300×200cm",
      "Medidas especiales a pedido",
    ],
  },
];
