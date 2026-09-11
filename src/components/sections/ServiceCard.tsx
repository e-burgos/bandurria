import { motion } from "framer-motion";
import type { Service } from "../../data/services";
import { asset } from "../../lib/asset";

interface Props {
  service: Service;
  index?: number;
}

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function CardMedia({ service }: { service: Service }) {
  if (service.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={asset(service.image)}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>
    );
  }

  const Icon = service.icon;
  return (
    <div
      className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 120% at 50% 120%, color-mix(in srgb, var(--color-accent) 16%, transparent) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <Icon
        size={48}
        strokeWidth={1.25}
        className="relative transition-transform duration-500 group-hover:scale-110"
        style={{ color: "var(--color-accent)" }}
      />
    </div>
  );
}

export default function ServiceCard({ service, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: EASE }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]"
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
        }}
        aria-hidden="true"
      />

      <CardMedia service={service} />

      <div className="flex flex-1 flex-col gap-3 border-t border-[var(--color-border)] p-5">
        <h3 className="text-base font-bold leading-snug text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
          {service.title}
        </h3>

        {service.description && (
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            {service.description}
          </p>
        )}

        {service.items.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {service.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-text-muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
