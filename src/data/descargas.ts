export const DESCARGAS_URL =
  "https://drive.google.com/drive/folders/1yLgCQB1NGyM6zBUR_2B9wpMycUm18Uxd";

export interface Descarga {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  ctaLabel: string;
  icon: "precios" | "instructivos";
}

export const DESCARGAS: Descarga[] = [
  {
    id: "listado-precios",
    eyebrow: "Precios",
    title: "Listado de precios",
    desc: "Descargá nuestra lista de precios actualizada de impresión gráfica y gran formato.",
    ctaLabel: "Descargar listado",
    icon: "precios",
  },
  {
    id: "instructivos-armado",
    eyebrow: "Instructivos",
    title: "Armado de portabanner y back de prensa",
    desc: "Guías paso a paso para armar tu portabanner y tu back de prensa sin errores.",
    ctaLabel: "Descargar instructivos",
    icon: "instructivos",
  },
];
