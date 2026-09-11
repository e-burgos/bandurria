import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const PRODUCTOS = [
  "Flyers",
  "Folletos",
  "Posters",
  "Afiches para vía pública",
  "Dípticos / Trípticos / Cuadripticos",
  "Tarjetas",
  "Carpetas de presentación",
  "Encuadernaciones",
  "Catálogos",
  "Revistas",
  "Sobres",
];

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Offset",
    desc: "Alta fidelidad de color, ideal para tiradas medianas y largas con calidad premium.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
    title: "Digital",
    desc: "Sin mínimo de tirada. Ideal para personalizaciones, pruebas y producciones cortas.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "100% In House",
    desc: "Producción íntegra en planta. Mayor control, menores tiempos, mejor precio.",
  },
];

export default function OffsetDigital() {
  return (
    <section
      id="offset-digital"
      aria-label="Impresiones Offset y Digital"
      className="py-24 bg-[var(--color-bg)]"
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
            También hacemos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl"
          >
            Impresiones Offset<br className="hidden sm:block" />
            <span className="text-[var(--color-accent)]"> y Digital</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-start">

          {/* Lista de productos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="mb-6 text-sm text-[var(--color-text-muted)] leading-relaxed">
              Además de nuestra producción en gran formato, contamos con capacidad para
              realizar todo tipo de piezas gráficas en offset y digital, con la misma calidad
              y compromiso que nos caracteriza.
            </p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PRODUCTOS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                  className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-sm text-[var(--color-text)]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="space-y-5"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                className="group flex gap-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 hover:border-[var(--color-accent)]/30 transition-colors duration-300"
              >
                <div className="mt-0.5 shrink-0 text-[var(--color-accent)]">{f.icon}</div>
                <div>
                  <h3 className="mb-1 text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{f.desc}</p>
                </div>
              </motion.div>
            ))}

          </motion.div>

        </div>
      </div>
    </section>
  );
}
