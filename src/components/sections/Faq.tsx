import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ_ITEMS } from "../../data/faq";
import { RevealOnScroll } from "../ui/RevealOnScroll";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 ${
        open ? "rotate-45" : ""
      }`}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  return (
    <section
      id="faq"
      aria-label="Preguntas frecuentes"
      className="py-24 bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-[var(--color-accent)]">
            Dudas frecuentes
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-muted)]">
            Lo que más nos consultan. Si tu duda no está acá, escribinos.
          </p>
        </RevealOnScroll>

        <ul className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const open = openId === item.id;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-colors duration-300 hover:border-[var(--color-accent)]/30"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold text-[var(--color-text)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:text-base"
                  >
                    {item.question}
                    <span className="text-[var(--color-accent)]">
                      <PlusIcon open={open} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

        <RevealOnScroll delay={150} className="mt-12 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            ¿Tenés otra consulta?{" "}
            <a
              href="#contacto"
              className="font-semibold text-[var(--color-accent)] hover:underline"
            >
              Escribinos y te respondemos en el día.
            </a>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
