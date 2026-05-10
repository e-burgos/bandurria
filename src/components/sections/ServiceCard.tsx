import { motion } from "framer-motion";
import type { Service } from "../../data/services";

interface Props {
  service: Service;
  index?: number;
}

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: EASE,
    },
  }),
};

export default function ServiceCard({ service, index = 0 }: Props) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -10, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl cursor-default"
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Glow border on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(37,211,102,0.4), 0 20px 60px rgba(37,211,102,0.12)",
        }}
      />

      {/* Imagen */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Shimmer on hover */}
        <div className="absolute inset-0 bg-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-sm font-bold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {service.title}
        </h3>

        {service.description && (
          <p className="mb-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
            {service.description}
          </p>
        )}

        <ul className="mt-auto space-y-1.5">
          {service.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]"
            >
              <span className="mt-0.5 shrink-0 text-[var(--color-accent)] font-bold leading-none">
                ›
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
