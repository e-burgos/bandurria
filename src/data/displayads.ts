export interface DisplayAdsFeature {
  title: string;
  desc: string;
}

export const DISPLAYADS = {
  eyebrow: "Unidad de negocio",
  brand: "Display-Ads",
  title: "Cartelería Digital",
  claim: "Todas las pantallas de tus locales, manejadas desde un solo lugar.",
  intro: [
    "Display-Ads es una plataforma que te permite manejar las pantallas publicitarias de tus locales desde un solo lugar, sin necesidad de moverte de tu casa u oficina. Podés controlar desde una sola cuenta lo que se muestra en una pantalla o en muchas que tengas en distintos locales, y cambiar el contenido en segundos desde tu celular o computadora.",
    "Con Display-Ads ya no hace falta imprimir carteles ni ir local por local a cambiarlos. Subís imágenes, videos o textos, armás campañas con lo que querés mostrar, y la plataforma se encarga de que cada pantalla muestre justo eso en el momento que programaste. Además, tiene Inteligencia Artificial que te ayuda a crear contenido y a decidir qué mostrar.",
  ],
  platformUrl: "https://displayads.com.ar",
  ctaLabel: "Ir a la plataforma",
};

export const DISPLAYADS_FEATURES: DisplayAdsFeature[] = [
  {
    title: "Una cuenta, todas tus pantallas",
    desc: "Controlá desde un mismo lugar lo que se muestra en una pantalla o en muchas, repartidas en distintos locales.",
  },
  {
    title: "Cambios en segundos",
    desc: "Actualizás el contenido desde el celular o la computadora, sin moverte de tu casa u oficina.",
  },
  {
    title: "Campañas programadas",
    desc: "Subís imágenes, videos o textos, armás tus campañas y cada pantalla muestra lo que corresponde en el momento que programaste.",
  },
  {
    title: "Inteligencia Artificial",
    desc: "Te ayuda a crear el contenido y a decidir qué conviene mostrar en cada pantalla.",
  },
];
