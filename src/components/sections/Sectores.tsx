import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

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

export default function Sectores() {
  return (
    <section
      aria-label="Sectores que atendemos"
      className="bg-[var(--color-bg-surface)] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
        >
          Sectores que atendemos
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap justify-center gap-3"
        >
          {SECTORES.map((sector) => (
            <span
              key={sector}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-2 text-sm text-[var(--color-text-muted)]"
            >
              {sector}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
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
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
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
