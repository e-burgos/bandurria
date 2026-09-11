import { motion } from "framer-motion";
import { DISPLAYADS, DISPLAYADS_FEATURES } from "../../data/displayads";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function ScreenIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8h5M7 11h8" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function CarteleriaDigital() {
  return (
    <section
      id="carteleria-digital"
      aria-label="Cartelería Digital — Display-Ads"
      className="py-24 bg-[var(--color-bg-surface)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-[var(--color-accent)]"
          >
            {DISPLAYADS.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl"
          >
            {DISPLAYADS.title}{" "}
            <span className="text-[var(--color-accent)]">
              {DISPLAYADS.brand}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-muted)]"
          >
            {DISPLAYADS.claim}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="space-y-5"
          >
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
              aria-hidden="true"
            >
              <ScreenIcon />
            </span>

            {DISPLAYADS.intro.map((parrafo) => (
              <p
                key={parrafo.slice(0, 24)}
                className="text-sm leading-relaxed text-[var(--color-text-muted)]"
              >
                {parrafo}
              </p>
            ))}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={DISPLAYADS.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                {DISPLAYADS.ctaLabel}
                <ExternalLinkIcon />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-8 py-3 text-sm font-semibold text-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                Quiero asesoramiento
              </a>
            </div>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="space-y-5"
          >
            {DISPLAYADS_FEATURES.map((feature, i) => (
              <motion.li
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="group flex gap-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-colors duration-300 hover:border-[var(--color-accent)]/30"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                  aria-hidden="true"
                >
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="mb-1 text-sm font-bold text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {feature.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
