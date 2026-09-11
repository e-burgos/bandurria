export interface HeroSlide {
  id: string;
  alt: string;
  desktop: string;
  mobile: string;
  href: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "exhibidores",
    alt: "Exhibidores de plástico corrugado de piso y mostrador en góndola de supermercado",
    desktop: "/hero/exhibidores-desktop.webp",
    mobile: "/hero/exhibidores-mobile.webp",
    href: "#servicios",
  },
  {
    id: "pop-rigidos",
    alt: "Productos POP y piezas sobre materiales rígidos para punto de venta",
    desktop: "/hero/pop-rigidos-desktop.webp",
    mobile: "/hero/pop-rigidos-mobile.webp",
    href: "#servicios",
  },
  {
    id: "banners-totems",
    alt: "Banners de pie, back de prensa y tótems para eventos",
    desktop: "/hero/banners-totems-desktop.webp",
    mobile: "/hero/banners-totems-mobile.webp",
    href: "#servicios",
  },
];
