import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const PARAGRAPHS = [
  <>
    Somos un equipo de profesionales que combina experiencia, tecnología y
    capacidad para acompañar a nuestros clientes en sus proyectos, desde una
    necesidad puntual hasta desarrollos de gran escala.
  </>,
  <>
    Creemos que una empresa se construye a partir de cómo se relaciona con las
    personas. Por eso buscamos trabajar con confianza, respeto y claridad,
    brindando un servicio cercano y cuidando cada vínculo y cada proyecto.
  </>,
  <>
    Nos gusta involucrarnos, entender lo que cada cliente necesita y encontrar la
    mejor manera de resolverlo.{" "}
    <strong className="font-bold text-[var(--color-text)]">
      Buscamos que cada trabajo sea el comienzo de una relación de largo plazo.
    </strong>
  </>,
];

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      aria-label="Nosotros"
      className="relative overflow-hidden bg-[var(--color-bg)] py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 50% 0%, rgba(247,130,51,0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]"
        >
          Quiénes somos
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-4xl font-black uppercase tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl"
        >
          Nosotros
        </motion.h2>

        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="mx-auto mt-6 block h-px w-20 origin-center bg-[var(--color-accent)]"
          aria-hidden="true"
        />

        <div className="mt-10 space-y-6 text-left">
          {PARAGRAPHS.map((content, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                delay: 0.25 + i * 0.15,
                ease: EASE,
              }}
              className="text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg sm:leading-[1.75]"
            >
              {content}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
