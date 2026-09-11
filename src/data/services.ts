import {
  AppWindow,
  Flag,
  LayoutPanelTop,
  Maximize,
  Megaphone,
  Printer,
  ScrollText,
  SquareStack,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  image?: string;
}

export const SERVICES: Service[] = [
  {
    id: "exhibidores",
    title: "Exhibidores",
    description:
      "Nos encargamos de la producción integral de tus exhibidores de plástico corrugado, para piso o mostrador, desde los 2 a 10 mm de espesor.",
    items: [],
    icon: LayoutPanelTop,
  },
  {
    id: "pop",
    title: "Productos POP para punto de venta",
    description:
      "Destacá tu producto en góndola a través de una amplia gama de productos.",
    items: [
      "Salientes",
      "Cenefas",
      "Stoppers",
      "Movies",
      "Headers",
      "Cubrepallets",
      "Punteras",
      "Colgantes",
      "Islas",
    ],
    icon: SquareStack,
  },
  {
    id: "eventos",
    title: "Materiales de promoción para eventos",
    description: "",
    items: [
      "Banners de pie y para mostrador",
      "Back de prensa",
      "Tótems",
      "Cubos apilables",
    ],
    icon: Flag,
  },
  {
    id: "offset-digital",
    title: "Offset y digital",
    description: "",
    items: [
      "Flyers",
      "Folletos",
      "Posters",
      "Dípticos",
      "Trípticos",
      "Tarjetas",
      "Carpetas de presentación",
      "Encuadernaciones",
      "Catálogos",
      "Revistas",
      "Sobres",
    ],
    icon: Printer,
  },
  {
    id: "rigidos",
    title: "Impresiones sobre materiales rígidos",
    description:
      "Usamos tintas color y blanco. Gran variedad de sustratos:",
    items: [
      "PVC",
      "PAI",
      "Plástico corrugado",
      "PET",
      "Acrílico",
      "Cartulina",
      "Madera",
    ],
    icon: ScrollText,
  },
  {
    id: "gran-formato",
    title: "Impresión en gran formato",
    description:
      "Impresión sobre distintos materiales de 320 cm de ancho. Tinta UV de gran durabilidad en interior y exterior.",
    items: [
      "Todo tipo de lonas y vinilos",
      "Cuerina",
      "Lienzo canvas",
      "Papel fotográfico",
      "¡Y mucho más!",
    ],
    icon: Maximize,
  },
  {
    id: "carteleria",
    title: "Cartelería y marquesinas",
    description:
      "Fabricación e instalación de marquesinas y tensado de lonas, con cobertura en todo el país.",
    items: [],
    icon: Megaphone,
  },
  {
    id: "vidrieras",
    title: "Vidrieras",
    description:
      "Impresión sobre todo tipo de vinilos —base blanca, microperforado y cristal— con colocación en punto de venta. Cobertura a nivel nacional.",
    items: [],
    icon: AppWindow,
  },
];
