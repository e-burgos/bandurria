import { type FormEvent, useState } from "react";
import { RevealOnScroll } from "../ui/RevealOnScroll";
import { WHATSAPP_DISPLAY, whatsappLink } from "../../data/contacto";

interface FormState {
  nombre: string;
  mail: string;
  asunto: string;
  mensaje: string;
}

const INITIAL_FORM: FormState = {
  nombre: "",
  mail: "",
  asunto: "",
  mensaje: "",
};

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.58a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const CONTACT_INFO = [
  {
    icon: PhoneIcon,
    label: "Teléfono",
    value: "5227-8002",
    href: "tel:+541152278002",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: whatsappLink("Hola Bandurria, quiero hacer una consulta"),
  },
  {
    icon: MapPinIcon,
    label: "Dirección",
    value: "Montenegro 133, Chacarita, CABA",
    href: "https://maps.google.com/?q=Montenegro+133+Chacarita+CABA",
  },
  {
    icon: ClockIcon,
    label: "Horario",
    value: "Lunes a Viernes · 9.15 a 13.30 y 14.30 a 17.45 hs.",
  },
  {
    icon: MailIcon,
    label: "Email",
    value: "contacto@bandurriadeco.com.ar",
    href: "mailto:contacto@bandurriadeco.com.ar",
  },
];

export default function Contacto() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simula envío — reemplazar con endpoint real
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
    setForm(INITIAL_FORM);
  };

  const inputClass = [
    "w-full rounded-lg px-4 py-3 text-sm",
    "bg-[var(--color-bg-surface)] text-[var(--color-text)]",
    "border border-[var(--color-border)]",
    "placeholder:text-[var(--color-text-muted)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/60 focus:border-transparent",
    "transition-all duration-200",
  ].join(" ");

  return (
    <section
      id="contacto"
      className="py-24 bg-[var(--color-bg-surface)]"
      aria-label="Contacto"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-[var(--color-accent)]">
            Escribinos
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            Contacto
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Respondemos rápido. Pedí tu presupuesto sin compromiso.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Columna izquierda — datos + mapa */}
          <RevealOnScroll delay={100}>
            <div className="space-y-8">
              {/* Datos de contacto */}
              <ul className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-card)] text-[var(--color-accent)] border border-[var(--color-border)]">
                      <Icon />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[var(--color-text)]">
                          {value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Mapa */}
              <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
                <iframe
                  title="Ubicación de Bandurria Gráfica y Deco"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0!2d-58.4530!3d-34.5927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5a5b0a5a5a5%3A0x1234567890abcdef!2sMontenegro%20133%2C%20Chacarita%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1234567890"
                  width="100%"
                  height="260"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href="https://maps.google.com/?q=Montenegro+133+Chacarita+CABA+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                <MapPinIcon />
                ¿Dónde estamos?
              </a>
            </div>
          </RevealOnScroll>

          {/* Columna derecha — formulario */}
          <RevealOnScroll delay={200}>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-[fade-in_0.5s_ease-out]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)]">
                    ¡Gracias por escribirnos!
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Te respondemos a la brevedad.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm text-[var(--color-accent)] hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
                    >
                      Nombre <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className={inputClass}
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mail"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
                    >
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="mail"
                      name="mail"
                      type="email"
                      required
                      value={form.mail}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="asunto"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
                    >
                      Asunto <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="asunto"
                      name="asunto"
                      type="text"
                      required
                      value={form.asunto}
                      onChange={handleChange}
                      placeholder="¿En qué te podemos ayudar?"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mensaje"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
                    >
                      Mensaje <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={5}
                      value={form.mensaje}
                      onChange={handleChange}
                      placeholder="Contanos tu proyecto..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-lg bg-[var(--color-accent)] py-3 text-sm font-bold text-white shadow-md hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
