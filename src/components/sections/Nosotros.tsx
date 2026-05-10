import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Nosotros() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: 0.4 + i * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Nosotros"
    >
      {/* Video de fondo con parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          poster="/nosotros-poster.jpg"
        >
          <source
            src="https://bandurriadeco.com.ar/wp-content/uploads/2023/11/BANDURRIA_Corte3.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85"
        aria-hidden="true"
      />

      {/* Orbes decorativos animados */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-[var(--color-accent)]/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 h-60 w-60 rounded-full bg-[var(--color-accent)]/8 blur-3xl"
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Contenido */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mb-4 text-xs font-semibold tracking-[0.35em] uppercase text-[var(--color-accent)]"
        >
          Quiénes somos
        </motion.p>

        {/* Título con palabras animadas */}
        <h1 className="mb-8 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {"Un gusto en".split(" ").map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            custom={3}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="inline-block text-[var(--color-accent)]"
          >
            conocerte.
          </motion.span>
        </h1>

        <div className="space-y-5 text-left text-base leading-relaxed text-white/80 sm:text-lg">
          {[
            <>
              Somos{" "}
              <strong className="font-semibold text-white">
                Nicolás y Germán
              </strong>
              , hermanos y cofundadores de Bandurria. Hace más de 10 años nos
              propusimos renunciar a nuestros trabajos para crear algo que nos
              permitiera crecer profesionalmente, ser independientes, y
              sentirnos orgullosos de ello.
            </>,
            <>
              Inicialmente, creímos que este orgullo tenía que ver con lograr
              tener una gran empresa, con muchos empleados y grandes clientes;{" "}
              <em>rápidamente nos apartamos de esa idea.</em>
            </>,
            <>
              Hoy encontramos la satisfacción en{" "}
              <strong className="font-semibold text-white">
                hacer las cosas bien
              </strong>
              , en ser lo más eficientes posibles y en tener relaciones sanas y
              duraderas con nuestros clientes y empleados. En eso trabajamos
              todos los días.
            </>,
          ].map((content, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 1 + i * 0.2,
                ease: "easeOut",
              }}
            >
              {content}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#servicios"
            className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300"
          >
            Ver servicios
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300"
          >
            Contactanos
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-widest text-white uppercase">
          Scroll
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
