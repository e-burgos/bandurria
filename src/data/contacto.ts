export const WHATSAPP_NUMBER = "5491133091839";
export const WHATSAPP_DISPLAY = "+54 9 11 3309-1839";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
