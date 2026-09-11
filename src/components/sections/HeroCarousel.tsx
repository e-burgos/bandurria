import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HERO_SLIDES } from "../../data/hero";
import { asset } from "../../lib/asset";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const AUTOPLAY_MS = 5500;
const SWIPE_THRESHOLD = 60;
const TOTAL = HERO_SLIDES.length;

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline
        points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
      />
    </svg>
  );
}

function ScrollCue() {
  return (
    <svg
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (next: number) => setIndex(((next % TOTAL) + TOTAL) % TOTAL),
    [],
  );

  const step = useCallback(
    (direction: number) => goTo(index + direction),
    [goTo, index],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, goTo]);

  const slide = HERO_SLIDES[index];

  return (
    <section
      id="inicio"
      aria-label="Nuestro trabajo en punto de venta"
      aria-roledescription="carrusel"
      className="relative isolate overflow-hidden bg-[var(--color-bg-surface)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-[6/5] w-full md:aspect-[12/5] md:max-h-[calc(100dvh-4rem)]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: reduceMotion ? 0 : 0.7, ease: EASE },
              scale: { duration: reduceMotion ? 0 : 7, ease: "linear" },
            }}
            drag={TOTAL > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) step(1);
              else if (info.offset.x > SWIPE_THRESHOLD) step(-1);
            }}
          >
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={`${asset(slide.desktop)} 1x, ${asset(slide.desktopRetina)} 2x`}
                width={1920}
                height={800}
              />
              <img
                src={asset(slide.mobile)}
                srcSet={`${asset(slide.mobile)} 1x, ${asset(slide.mobileRetina)} 2x`}
                alt={slide.alt}
                width={1080}
                height={900}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* Degradé inferior para apoyar los controles sobre cualquier arte */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 to-transparent"
          aria-hidden="true"
        />

        {/* Flechas */}
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Imagen anterior"
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:block lg:left-6"
        >
          <Chevron direction="left" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Imagen siguiente"
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:block lg:right-6"
        >
          <Chevron direction="right" />
        </button>

        {/* Indicadores */}
        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2.5 lg:bottom-8">
          {HERO_SLIDES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la imagen ${i + 1} de ${TOTAL}`}
              aria-current={i === index}
              className={[
                "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                i === index
                  ? "w-9 bg-white"
                  : "w-2 bg-white/45 hover:bg-white/80",
              ].join(" ")}
            />
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Imagen {index + 1} de {TOTAL}: {slide.alt}
        </p>
      </div>

      {/* Cinta de acceso rápido bajo el carrusel */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[var(--color-text-muted)] sm:text-left">
            Producción gráfica integral para punto de venta, eventos y vía
            pública.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#servicios"
              className="rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              Ver servicios
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-6 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              Contactanos
              <ScrollCue />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
