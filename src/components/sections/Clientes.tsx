import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const TESTIMONIOS = [
  {
    texto:
      "Trabajamos con Bandurria hace años. Siempre cumplen en tiempo y calidad, con una atención muy personal.",
    autor: "Cliente — Agencia de publicidad",
  },
  {
    texto:
      "El nivel de detalle en el corte y la impresión UV es incomparable. Recomendamos Bandurria a todos nuestros clientes.",
    autor: "Cliente — Estudio de diseño",
  },
  {
    texto:
      "Encontramos en Bandurria un socio confiable para todos nuestros materiales de punto de venta.",
    autor: "Cliente — Retail / Moda",
  },
];

const SECTORES = [
  "Agencias de publicidad",
  "Estudios de diseño",
  "Retail y comercios",
  "Eventos y cultura",
  "Gastronomía",
  "Arquitectura e interiorismo",
  "Moda e indumentaria",
  "Organizaciones sociales",
];

export default function Clientes() {
  return (
    <section
      id="clientes"
      aria-label="Confían en nosotros"
      className="py-24 bg-[var(--color-bg-surface)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-[var(--color-accent)]"
          >
            Referencias
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mb-4 text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl"
          >
            Confían en nosotros
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto max-w-xl text-base text-[var(--color-text-muted)]"
          >
            Más de una década trabajando con agencias, estudios y marcas que
            necesitan calidad, respuesta rápida y un equipo de confianza.
          </motion.p>
        </div>

        {/* Sectores — pills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mb-16 flex flex-wrap justify-center gap-3"
        >
          {SECTORES.map((sector, i) => (
            <motion.span
              key={sector}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.35,
                delay: 0.05 + i * 0.06,
                ease: "easeOut",
              }}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-2 text-sm text-[var(--color-text-muted)]"
            >
              {sector}
            </motion.span>
          ))}
        </motion.div>

        {/* Testimonios */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIOS.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
              className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
            >
              {/* Comillas decorativas */}
              <span
                className="mb-3 text-4xl leading-none text-[var(--color-accent)] font-serif select-none"
                aria-hidden="true"
              >
                "
              </span>
              <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {t.texto}
              </p>
              <footer className="mt-5 text-xs font-semibold tracking-wide text-[var(--color-accent)]">
                — {t.autor}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Banda inferior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
          className="mt-14 rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-bg-card)] p-8 text-center"
        >
          <p className="mb-2 text-lg font-bold text-[var(--color-text)]">
            ¿Tu empresa todavía no trabaja con nosotros?
          </p>
          <p className="mb-6 text-sm text-[var(--color-text-muted)]">
            Escribinos y te respondemos en el día.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300"
          >
            Contactanos
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
