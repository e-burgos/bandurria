export interface HeroSlide {
  id: string;
  alt: string;
  desktop: string;
  desktopRetina: string;
  mobile: string;
  mobileRetina: string;
  href: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "exhibidores",
    alt: "Exhibidores de plástico corrugado de piso y mostrador en góndola de supermercado",
    desktop: "/hero/exhibidores-desktop.webp",
    desktopRetina: "/hero/exhibidores-desktop@2x.webp",
    mobile: "/hero/exhibidores-mobile.webp",
    mobileRetina: "/hero/exhibidores-mobile@2x.webp",
    href: "#servicios",
  },
  {
    id: "pop-rigidos",
    alt: "Productos POP y piezas sobre materiales rígidos para punto de venta",
    desktop: "/hero/pop-rigidos-desktop.webp",
    desktopRetina: "/hero/pop-rigidos-desktop@2x.webp",
    mobile: "/hero/pop-rigidos-mobile.webp",
    mobileRetina: "/hero/pop-rigidos-mobile@2x.webp",
    href: "#servicios",
  },
  {
    id: "banners-totems",
    alt: "Banners de pie, back de prensa y tótems para eventos",
    desktop: "/hero/banners-totems-desktop.webp",
    desktopRetina: "/hero/banners-totems-desktop@2x.webp",
    mobile: "/hero/banners-totems-mobile.webp",
    mobileRetina: "/hero/banners-totems-mobile@2x.webp",
    href: "#servicios",
  },
];
