import { motion } from "framer-motion";
import { CLIENTES } from "../../data/clientes";
import { Marquee } from "../ui/Marquee";
import { asset } from "../../lib/asset";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const BAND = "#0d0d0d";
const HALF = Math.ceil(CLIENTES.length / 2);

function LogoTile({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex h-24 w-44 shrink-0 items-center justify-center px-5 sm:h-28 sm:w-56 sm:px-8">
      <img
        src={asset(logo)}
        alt={name}
        loading="lazy"
        decoding="async"
        className="max-h-12 w-auto max-w-full object-contain opacity-65 transition-opacity duration-300 hover:opacity-100 sm:max-h-14"
      />
    </div>
  );
}

export default function Clientes() {
  const rows = [CLIENTES.slice(0, HALF), CLIENTES.slice(HALF)];

  return (
    <section
      id="clientes"
      aria-label="Confían en nosotros"
      className="py-24"
      style={{ backgroundColor: BAND }}
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
            Referencias
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Confían en nosotros
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto max-w-xl text-base text-white/55"
          >
            Marcas, agencias y estudios que necesitan calidad, respuesta rápida
            y un equipo de confianza.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="space-y-2"
      >
        {rows.map((row, i) => (
          <Marquee
            key={i}
            speed={i === 0 ? 38 : 30}
            reverse={i === 1}
            gapClassName="gap-0"
            fadeColor={BAND}
          >
            {row.map((client) => (
              <LogoTile key={client.name} {...client} />
            ))}
          </Marquee>
        ))}
      </motion.div>
    </section>
  );
}
