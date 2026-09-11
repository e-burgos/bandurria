import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TRABAJOS } from "../../data/trabajos";
import { Marquee } from "../ui/Marquee";
import { Lightbox, type OriginOffset } from "../ui/Lightbox";
import { asset } from "../../lib/asset";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const ROWS = [
  { items: TRABAJOS, speed: 42, reverse: false },
  {
    items: [...TRABAJOS.slice(4), ...TRABAJOS.slice(0, 4)],
    speed: 34,
    reverse: true,
  },
];

interface TileProps {
  id: string;
  alt: string;
  image: string;
  onOpen: (id: string, element: HTMLElement) => void;
}

function WorkTile({ id, alt, image, onOpen }: TileProps) {
  return (
    <button
      type="button"
      onClick={(event) => onOpen(id, event.currentTarget)}
      aria-label={`Ampliar: ${alt}`}
      className="group/tile relative aspect-[4/3] w-48 shrink-0 cursor-zoom-in overflow-hidden rounded-xl border border-[var(--color-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:w-60"
    >
      <img
        src={asset(image)}
        alt={alt}
        width={640}
        height={480}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tile:scale-[1.05]"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 text-left text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100">
        {alt}
      </span>
    </button>
  );
}

export default function Trabajos() {
  const [index, setIndex] = useState<number | null>(null);
  const [origin, setOrigin] = useState<OriginOffset | null>(null);
  const [direction, setDirection] = useState(1);
  const [animateStep, setAnimateStep] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((id: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    triggerRef.current = element;
    setOrigin({
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
    });
    setIndex(TRABAJOS.findIndex((trabajo) => trabajo.id === id));
    setDirection(1);
    setAnimateStep(false);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);

  const navigate = useCallback((dir: number, animate: boolean) => {
    setDirection(dir);
    setAnimateStep(animate);
    setIndex((current) =>
      current === null
        ? current
        : (current + dir + TRABAJOS.length) % TRABAJOS.length,
    );
  }, []);

  return (
    <section
      id="trabajos"
      aria-label="Trabajos realizados"
      className="overflow-hidden bg-[var(--color-bg)] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]"
          >
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mb-4 text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl"
          >
            Trabajos realizados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto max-w-xl text-base text-[var(--color-text-muted)]"
          >
            Una muestra de lo que sale todos los días de nuestra planta. Tocá
            cualquier imagen para verla en grande.
          </motion.p>
        </div>
      </div>

      <div className="space-y-4">
        {ROWS.map((row, rowIndex) => (
          <Marquee
            key={rowIndex}
            speed={row.speed}
            reverse={row.reverse}
            fadeColor="var(--color-bg)"
            paused={index !== null}
          >
            {row.items.map((trabajo) => (
              <WorkTile
                key={trabajo.id}
                id={trabajo.id}
                alt={trabajo.alt}
                image={trabajo.image}
                onOpen={open}
              />
            ))}
          </Marquee>
        ))}
      </div>

      <Lightbox
        items={TRABAJOS}
        index={index}
        origin={origin}
        direction={direction}
        animateStep={animateStep}
        onClose={close}
        onNavigate={navigate}
      />
    </section>
  );
}
