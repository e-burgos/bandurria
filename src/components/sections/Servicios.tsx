import { motion } from "framer-motion";
import { SERVICES } from "../../data/services";
import ServiceCard from "./ServiceCard";

const headingWords = "Nuestros servicios".split(" ");

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="py-24 bg-[var(--color-bg)]"
      aria-label="Servicios"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header de sección */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-[var(--color-accent)]"
          >
            Lo que hacemos
          </motion.p>
          <h2 className="text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            {headingWords.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as [
                    number,
                    number,
                    number,
                    number,
                  ],
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-4 mx-auto max-w-xl text-base text-[var(--color-text-muted)]"
          >
            Producción integral: imprimimos, cortamos, terminamos e instalamos
            en un mismo lugar.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
