import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface AccordionItem {
  id: string;
  label: string;
  content: string;
}

const ITEMS: AccordionItem[] = [
  {
    id: "calidad",
    label: "Calidad",
    content:
      "Trabajamos con maquinaria de última generación: cortadoras Zünd de precisión automatizada, impresoras de gran formato y sistemas UV de alta resolución. Cada trabajo pasa por control de calidad antes de ser entregado.",
  },
  {
    id: "versatilidad",
    label: "Versatilidad",
    content:
      "Más de 30 sustratos distintos, formatos desde A4 hasta 320 cm de ancho sin uniones. Podemos imprimir, cortar, laminar y terminar en un mismo lugar, reduciendo tiempos y costos para tu proyecto.",
  },
  {
    id: "compromiso",
    label: "Compromiso",
    content:
      "Somos un equipo pequeño y comprometido. Respondemos rápido, cumplimos plazos y cuidamos la relación con cada cliente como si fuera la primera vez. En eso trabajamos todos los días.",
  },
];

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--color-border)] last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 py-4 text-left transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[var(--color-border)] text-[var(--color-accent)] text-lg font-light leading-none"
          aria-hidden="true"
        >
          +
        </motion.span>
        <span className="text-sm font-semibold text-[var(--color-text)]">
          {item.label}
        </span>
        <motion.svg
          animate={{ x: isOpen ? 4 : 0 }}
          transition={{ duration: 0.25 }}
          className="ml-auto shrink-0 text-[var(--color-text-muted)]"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-9 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {item.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Tecnologia() {
  const [openId, setOpenId] = useState<string | null>("calidad");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="tecnologia"
      aria-label="Tecnología"
      className="py-24 bg-[var(--color-bg-surface)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Columna izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-[var(--color-accent)]">
              Nuestra infraestructura
            </p>
            <h2 className="mb-8 text-4xl font-black tracking-tight text-[var(--color-text)] sm:text-5xl uppercase">
              Tecnología
            </h2>

            {/* Acordeón */}
            <div className="mb-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 divide-y divide-[var(--color-border)]">
              {ITEMS.map((item) => (
                <AccordionRow
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
              className="text-sm leading-relaxed text-[var(--color-text-muted)]"
            >
              Si querés enterarte de qué es lo que hacemos visitá nuestra
              sección de Servicios. Desde aquí solo queremos transmitirte algo:
              si imprimís con nosotros tendrás de tu lado maquinaria de última
              generación y todo un equipo humano trabajando a diario con un
              único objetivo: entregarte un producto de excelencia.
            </motion.p>
          </motion.div>

          {/* Columna derecha — foto de planta */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="overflow-hidden rounded-2xl border border-[var(--color-border)]"
          >
            <img
              src="/tecnologia.webp"
              alt="Cortadora Zünd, impresora de gran formato y cama plana UV en la planta de Bandurria"
              width={1200}
              height={1200}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
