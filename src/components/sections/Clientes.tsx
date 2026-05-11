import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type Client =
  | { type: "img"; name: string; src: string }
  | { type: "text"; name: string };

const CLIENTS: Client[] = [
  { type: "img", name: "Farmacity", src: "/logos/farmacity.png" },
  { type: "img", name: "Carrefour", src: "/logos/carrefour.svg" },
  { type: "img", name: "Coppel", src: "/logos/coppel.svg" },
  { type: "img", name: "Telecom", src: "/logos/telecom.svg" },
  { type: "img", name: "Motomel", src: "/logos/motomel.png" },
  { type: "img", name: "Orbis", src: "/logos/orbis.png" },
  { type: "text", name: "Andrómaco" },
  { type: "text", name: "Get The Look" },
  { type: "text", name: "Flow" },
  { type: "text", name: "AMCA" },
  { type: "text", name: "Parfumerie" },
  { type: "text", name: "Vital" },
];

const PER_PAGE = 4;
const PAGES = Array.from(
  { length: Math.ceil(CLIENTS.length / PER_PAGE) },
  (_, i) => CLIENTS.slice(i * PER_PAGE, i * PER_PAGE + PER_PAGE),
);
const TOTAL_PAGES = PAGES.length;

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
};

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="flex flex-1 min-w-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 aspect-[4/3]">
      {client.type === "img" ? (
        <img
          src={client.src}
          alt={client.name}
          className="max-h-12 max-w-[140px] w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          loading="lazy"
        />
      ) : (
        <span className="text-center text-base font-bold tracking-tight text-[var(--color-text-muted)] leading-tight">
          {client.name}
        </span>
      )}
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
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
  );
}

export default function Clientes() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setPage((p) => (p + dir + TOTAL_PAGES) % TOTAL_PAGES);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 3000);
    return () => clearInterval(t);
  }, [go]);

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
            Más de una década trabajando con agencias, estudios y marcas líderes
            que necesitan calidad, respuesta rápida y un equipo de confianza.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="relative"
        >
          {/* Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: EASE }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-4"
              >
                {PAGES[page].map((client) => (
                  <ClientCard key={client.name} client={client} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              className="rounded-full p-2 border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {PAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > page ? 1 : -1);
                    setPage(i);
                  }}
                  className={[
                    "rounded-full transition-all duration-300",
                    i === page
                      ? "w-5 h-2 bg-[var(--color-accent)]"
                      : "w-2 h-2 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]",
                  ].join(" ")}
                  aria-label={`Página ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="rounded-full p-2 border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all duration-200"
              aria-label="Siguiente"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>

        {/* Sectores */}
        <div className="mt-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-center text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-text-muted)]"
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
            {[
              "Agencias de publicidad",
              "Estudios de diseño",
              "Retail y comercios",
              "Eventos y cultura",
              "Gastronomía",
              "Arquitectura e interiorismo",
              "Moda e indumentaria",
              "Organizaciones sociales",
            ].map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-2 text-sm text-[var(--color-text-muted)]"
              >
                {sector}
              </span>
            ))}
          </motion.div>
        </div>

        {/* CTA inferior */}
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
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
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
