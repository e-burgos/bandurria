import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Expand,
  Layers,
  FileText,
  Ruler,
  Palette,
  Printer,
  Scissors,
  Zap,
  Wrench,
  Settings,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Constants ─────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const SERVICES = [
  {
    id: "gran-formato",
    num: "01",
    title: "Cartelería y Gran Formato",
    tagline: "Hasta 320 cm de ancho sin uniones",
    description:
      "Equipos de impresión de última generación con tinta UV de alta resistencia, apta para interior y exterior. Colores vivos, durabilidad real.",
    highlight: "hasta 320 cm de ancho",
    color: "#25d366",
    icon: Expand,
    images: ["/img-008.jpg", "/img-006.jpg", "/img-005.jpg"],
    products: [
      "Banners con portabanner",
      "Banner tipo Roll Up",
      "Back de prensa",
    ],
    substrates: [
      "Lona vinílica front",
      "Lona backlight",
      "Lona blackout",
      "Lona mesh",
      "Vinilo base blanca",
      "Vinilo base gris",
      "Vinilo cristal",
      "Vinilo microperforado",
      "Papeles de distintos gramajes",
      "Lienzo canvas",
      "Cuerina",
      "Imán",
      "Stickers",
    ],
  },
  {
    id: "rigidos-pop",
    num: "02",
    title: "Materiales Rígidos / POP",
    tagline: "Corte 100% automatizado con equipo suizo Zünd",
    description:
      "Impresión UV mediante cama plana sobre sustratos rígidos y semirígidos. Corte de precisión milimétrica. Tintas CMYK y blanco.",
    highlight: "corte 100% automatizado",
    color: "#3b82f6",
    icon: Layers,
    images: ["/img-009.jpg", "/img-007.jpg"],
    products: [
      "Exhibidores de plástico corrugado",
      "Colgantes y stoppers",
      "Salientes y cenefas",
      "Headers y cubrepallet",
      "Movies",
    ],
    substrates: [
      "PVC · PAI · Foamboard",
      "Plástico corrugado",
      "PET cristal",
      "Cartulina · Cartón",
      "Chapa galvanizada · Acero",
      "Acrílico · Madera",
      "Goma eva · Alfombra · Corcho · Vidrio",
    ],
  },
  {
    id: "offset-digital",
    num: "03",
    title: "Offset y Digital",
    tagline: "Sin mínimo de tirada — todo en un mismo lugar",
    description:
      "Alta fidelidad de color para tiradas cortas o largas. Flyers, catálogos, carpetas, revistas y más. Sin mínimo en impresión digital.",
    highlight: "sin mínimo de tirada",
    color: "#f59e0b",
    icon: FileText,
    images: ["/img-010.jpg", "/img-010.jpg"],
    products: [
      "Flyers · Folletos · Posters",
      "Afiches para vía pública",
      "Dípticos · Trípticos · Cuadripticos",
      "Tarjetas de presentación",
      "Carpetas corporativas",
      "Catálogos · Revistas",
      "Encuadernaciones · Sobres",
    ],
    substrates: [],
  },
];

const EQUIPMENT = [
  {
    icon: Ruler,
    title: "Plotters Gran Formato",
    spec: "160 a 320 cm de ancho",
    detail:
      "Impresión continua de gran escala sin uniones. Ideal para carteles, lonas y vía pública.",
    image:
      "https://images.unsplash.com/photo-1562155695-fb6e1f95fcfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Palette,
    title: "Tintas Ecosolventes y UV",
    spec: "Interior y exterior",
    detail:
      "Alta durabilidad ante sol, agua y abrasión. Colores precisos y viveza garantizada.",
    image:
      "https://images.unsplash.com/photo-1675263943038-286c7fd18eaa?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Printer,
    title: "Cama Plana UV",
    spec: "Alta producción",
    detail:
      "Impresión directa sobre rígidos y semirígidos. CMYK + blanco sobre cualquier sustrato.",
    image:
      "https://images.unsplash.com/photo-1689942007858-7b12bf5864bd?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Scissors,
    title: "Corte Automatizado Zünd",
    spec: "Equipo suizo — última generación",
    detail:
      "Corte completo, medio corte, 45° y trazado. Precisión de décimas de milímetro.",
    image:
      "https://images.unsplash.com/photo-1738162837627-5794e6563cac?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Zap,
    title: "Soldadoras Industriales",
    spec: "Lonas de gran tamaño",
    detail:
      "Unión perfecta y resistente al viento. Para lonas de cualquier dimensión.",
    image:
      "https://images.unsplash.com/photo-1561536441-01351ded5ffd?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Settings,
    title: "Ojalilladoras Neumáticas",
    spec: "Terminaciones profesionales",
    detail:
      "Ojalillos metálicos de alta resistencia para colgar materiales en exteriores.",
    image:
      "https://images.unsplash.com/photo-1625479141886-48f087e62d01?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Wrench,
    title: "Laminadora Frío / Calor",
    spec: "Brillo · Mate · Satinado",
    detail:
      "Protección y estética en una sola pasada. Acabado de alta gama con mayor durabilidad.",
    image:
      "https://images.unsplash.com/photo-1567696154105-b564c8cbd3b2?auto=format&fit=crop&w=800&q=80",
  },
];

const LOGOS_IMG = [
  { name: "Farmacity", src: "/logos/farmacity.svg" },
  { name: "Carrefour", src: "/logos/carrefour.svg" },
  { name: "Coppel", src: "/logos/coppel.svg" },
  { name: "Telecom", src: "/logos/telecom.svg" },
  { name: "Motomel", src: "/logos/motomel.png" },
  { name: "Orbis", src: "/logos/orbis.png" },
];

const LOGOS_TEXT = [
  "Andrómaco",
  "Get The Look",
  "Flow",
  "AMCA",
  "Parfumerie",
  "Vital",
];

type LogoItem = { name: string; src: string } | string;
const MARQUEE_TRACK: LogoItem[] = [
  ...LOGOS_IMG,
  ...LOGOS_TEXT,
  ...LOGOS_IMG,
  ...LOGOS_TEXT,
];

/* ─── Sub-components ─────────────────────────────────────── */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-[var(--color-accent)]">
      {children}
    </p>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)] px-4 text-center">
      {/* Background photo */}
      <img
        src="/img-000.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.28) saturate(0.55)" }}
      />
      {/* Gradient overlay bottom → bg color */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-[var(--color-bg)]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative z-10 max-w-5xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mb-6 text-xs font-semibold tracking-[0.4em] uppercase text-[var(--color-accent)]"
        >
          Comunicación Visual — Buenos Aires
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mb-6 text-5xl font-black tracking-tight text-[var(--color-text)] sm:text-7xl lg:text-8xl leading-[0.95]"
        >
          Expertos en
          <br />
          <span style={{ color: "var(--color-accent)" }}>comunicación</span>
          <br />
          visual
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: EASE }}
          className="mx-auto mb-10 max-w-xl text-base text-[var(--color-text-muted)] sm:text-lg leading-relaxed"
        >
          Soluciones simples a desafíos complejos.{" "}
          <strong className="text-[var(--color-text)] font-semibold">
            100% in house
          </strong>{" "}
          — impresión, corte, terminación y entrega desde Chacarita, CABA.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/5491124080830?text=Hola%20Bandurria%2C%20consulto%20por%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[var(--color-accent)]/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Consultar por WhatsApp
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-7 py-3.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            Ver servicios
            <ChevronRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-transparent to-[var(--color-text-muted)]/40"
        />
      </motion.div>
    </section>
  );
}

function ServiceImageSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.img
        key={images[index] + index}
        src={images[index]}
        alt={title}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </AnimatePresence>
  );
}

/* ─── Services ───────────────────────────────────────────── */

function Services() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];
  const Icon = service.icon;

  return (
    <section
      id="servicios"
      className="bg-[var(--color-bg)]"
      aria-label="Servicios"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <FadeUp>
          <SectionLabel>Lo que hacemos</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-4xl font-black tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Nuestros{" "}
            <span style={{ color: "var(--color-accent)" }}>servicios</span>
          </h2>
        </FadeUp>
      </div>

      {/* Tab nav */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <div
          className="flex gap-0 border-b border-[var(--color-border)]"
          role="tablist"
          aria-label="Categorías de servicios"
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === i}
              aria-controls={`panel-${s.id}`}
              onClick={() => setActive(i)}
              className={`relative pb-4 pt-2 px-4 sm:px-6 text-sm sm:text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-t ${
                active === i
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <span className="hidden sm:inline">{s.title}</span>
              <span className="sm:hidden">{s.num}</span>
              {active === i && (
                <motion.span
                  layoutId="tab-bar"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          id={`panel-${service.id}`}
          role="tabpanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {/* Full-bleed container */}
          <div className="relative h-[680px] sm:h-[720px] lg:h-[800px] overflow-hidden">
            <ServiceImageSlider images={service.images} title={service.title} />

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent opacity-95" />

            {/* TEXT CONTENT / TOP */}
            <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 lg:p-8">
              <div className="mx-auto max-w-7xl w-full h-full relative">
                {/* Number */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-8 right-0 lg:right-8 text-8xl font-black leading-none select-none"
                  style={{ color: `${service.color}15` }}
                  aria-hidden="true"
                >
                  {service.num}
                </motion.span>

                <div className="pt-8 sm:pt-16 lg:pt-24 max-w-2xl pointer-events-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                    className="flex items-center gap-3 mb-4"
                    style={{ color: service.color }}
                  >
                    <Icon size={24} aria-hidden="true" />
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase">
                      {service.tagline}
                    </span>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                    className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight"
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
                    className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed"
                  >
                    {service.description}
                  </motion.p>

                  <motion.span
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
                    className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                    style={{
                      backgroundColor: `${service.color}1a`,
                      color: service.color,
                      border: `1px solid ${service.color}33`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: service.color }}
                      aria-hidden="true"
                    />
                    {service.highlight}
                  </motion.span>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
                    className="mt-10"
                  >
                    <a
                      href={`https://wa.me/5491124080830?text=Hola%20Bandurria%2C%20consulto%20por%20${encodeURIComponent(service.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                      style={{ backgroundColor: service.color }}
                    >
                      Consultar sobre {service.title}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* TICKERS / BOTTOM */}
            <div className="absolute left-0 right-0 bottom-4 sm:bottom-8 lg:bottom-12 z-20 pointer-events-none select-none">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6">
                  {service.products.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="relative w-full"
                    >
                      <h4 className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-white/90 drop-shadow-md">
                        Productos incluidos
                      </h4>
                      <div className="relative overflow-hidden w-full">
                        {/* Fade edges */}
                        <div
                          className="absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent"
                          aria-hidden="true"
                        />
                        <div
                          className="absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent"
                          aria-hidden="true"
                        />

                        <div className="flex w-full items-center">
                          <div
                            className="flex items-center gap-3 py-1"
                            style={{
                              animation: "marquee 45s linear infinite",
                              width: "max-content",
                            }}
                          >
                            {[
                              ...service.products,
                              ...service.products,
                              ...service.products,
                              ...service.products,
                            ].map((item, i) => (
                              <span
                                key={"prod-" + item + i}
                                className="shrink-0 flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-white shadow-lg pointer-events-auto transition-colors hover:bg-white/20"
                              >
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{
                                    backgroundColor: service.color,
                                    boxShadow: `0 0 8px ${service.color}`,
                                  }}
                                  aria-hidden="true"
                                />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {service.substrates.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative w-full"
                    >
                      <h4 className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-white/50 drop-shadow-md">
                        Sustratos y Materiales
                      </h4>
                      <div className="relative overflow-hidden w-full">
                        {/* Fade edges */}
                        <div
                          className="absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent"
                          aria-hidden="true"
                        />
                        <div
                          className="absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent"
                          aria-hidden="true"
                        />

                        <div className="flex w-full items-center">
                          <div
                            className="flex items-center gap-3 py-1"
                            style={{
                              animation: "marquee 55s linear infinite reverse",
                              width: "max-content",
                            }}
                          >
                            {[
                              ...service.substrates,
                              ...service.substrates,
                              ...service.substrates,
                              ...service.substrates,
                            ].map((item, i) => (
                              <span
                                key={"sust-" + item + i}
                                className="shrink-0 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-sm pointer-events-auto transition-colors hover:text-white hover:bg-black/60 border border-white/5"
                              >
                                <span
                                  className="h-1 w-1 rounded-full opacity-60"
                                  style={{ backgroundColor: service.color }}
                                  aria-hidden="true"
                                />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ─── Equipment ──────────────────────────────────────────── */

function Equipment() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="tecnologia"
      aria-label="Tecnología"
      className="py-24 bg-[var(--color-bg-surface)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 lg:flex lg:items-end lg:justify-between gap-8">
          <div>
            <FadeUp>
              <SectionLabel>Infraestructura</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
                Tecnología de{" "}
                <span style={{ color: "var(--color-accent)" }}>
                  última generación
                </span>
              </h2>
            </FadeUp>
          </div>
          <FadeUp
            delay={0.2}
            className="mt-4 lg:mt-0 lg:max-w-xs lg:text-right"
          >
            <p className="text-sm text-[var(--color-text-muted)]">
              Todo en un mismo taller en Chacarita, CABA. Producción integrada
              sin tercerizar — de la impresión a la terminación.
            </p>
          </FadeUp>
        </div>

        {/* Foto del parque de máquinas */}
        <FadeUp className="mb-12">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/img-011.jpg"
              alt="Parque de máquinas: impresoras CZ de gran formato y cortadora Zünd"
              className="h-64 sm:h-80 w-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5"
              aria-hidden="true"
            />
          </div>
        </FadeUp>

        <motion.ul
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.075 } } }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
        >
          {EQUIPMENT.map((eq) => {
            const Icon = eq.icon;
            return (
              <motion.li
                key={eq.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: EASE },
                  },
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              >
                {/* Imagen */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={eq.image}
                    alt={eq.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Ícono flotante sobre imagen */}
                  <div
                    className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(6px)",
                      color: "var(--color-accent)",
                    }}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {eq.title}
                  </h3>
                  <p
                    className="mb-2 text-xs font-semibold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {eq.spec}
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--color-text-muted)] flex-1">
                    {eq.detail}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

/* ─── Clients ────────────────────────────────────────────── */

function Clients() {
  return (
    <section
      id="clientes"
      aria-label="Clientes"
      className="py-24 bg-[var(--color-bg)] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <FadeUp>
          <SectionLabel>Referencias</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            Confían en nosotros
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mx-auto max-w-xl text-base text-[var(--color-text-muted)]">
            Más de una década trabajando con agencias, estudios y marcas líderes
            que necesitan calidad, respuesta rápida y un equipo de confianza.
          </p>
        </FadeUp>
      </div>

      {/* Marquee */}
      <div
        className="relative w-full"
        role="region"
        aria-label="Logos de clientes"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent"
          aria-hidden="true"
        />
        <div
          className="flex items-center gap-12 py-6"
          style={{
            animation: "marquee 44s linear infinite",
            width: "max-content",
          }}
          aria-hidden="true"
        >
          {MARQUEE_TRACK.map((item, i) =>
            typeof item === "string" ? (
              <span
                key={`t-${i}`}
                className="shrink-0 whitespace-nowrap px-2 text-lg font-bold tracking-tight select-none"
                style={{ color: "var(--color-text-muted)", opacity: 0.35 }}
              >
                {item}
              </span>
            ) : (
              <div
                key={`l-${i}`}
                className="shrink-0 flex h-12 w-36 items-center justify-center"
              >
                <img
                  src={(item as { src: string }).src}
                  alt={(item as { name: string }).name}
                  className="max-h-9 w-auto max-w-28 object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-90 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ),
          )}
        </div>
      </div>

      {/* Sector pills */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <FadeUp>
          <p className="mb-5 text-center text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
            Sectores que atendemos
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Agencias de publicidad",
              "Estudios de diseño",
              "Retail y comercios",
              "Eventos y cultura",
              "Gastronomía",
              "Arquitectura e interiorismo",
              "Moda e indumentaria",
              "Organizaciones sociales",
            ].map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-2 text-sm text-[var(--color-text-muted)]"
              >
                {s}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────── */

const CONTACT_ITEMS = [
  {
    Icon: Phone,
    label: "Teléfono / WhatsApp",
    value: "11 2408 0830",
    href: "https://wa.me/5491124080830",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "produccion@bandurriadeco.com.ar",
    href: "mailto:produccion@bandurriadeco.com.ar",
  },
  {
    Icon: MapPin,
    label: "Ubicación",
    value: "Chacarita, Capital Federal",
    href: "https://maps.google.com/?q=Chacarita+Buenos+Aires",
  },
  {
    Icon: Clock,
    label: "Horario",
    value: "Lunes a Viernes · 9:00 a 18:00 hs.",
  },
];

function Contact() {
  return (
    <section
      id="contacto"
      aria-label="Contacto"
      className="py-24 bg-[var(--color-bg-surface)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <FadeUp>
            <SectionLabel>Hablemos</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
              Contacto
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Info */}
          <div className="space-y-5">
            {CONTACT_ITEMS.map(({ Icon, label, value, href }, i) => (
              <FadeUp key={label} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "var(--color-accent)1a",
                      color: "var(--color-accent)",
                    }}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-sm font-semibold text-[var(--color-text)] underline-offset-2 hover:underline hover:text-[var(--color-accent)] transition-colors duration-200 break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-[var(--color-text)]">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp delay={0.2} className="flex flex-col justify-between gap-6">
            <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-bg-card)] p-8">
              <h3 className="mb-3 text-xl font-bold text-[var(--color-text)]">
                Pedinos una cotización
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Contanos qué necesitás y te respondemos en el día. Trabajamos
                con agencias, estudios y marcas de todos los tamaños.
              </p>
              <a
                href="https://wa.me/5491124080830?text=Hola%20Bandurria%2C%20necesito%20una%20cotizaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--color-accent)]/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Escribir por WhatsApp
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                También por email
              </p>
              <a
                href="mailto:produccion@bandurriadeco.com.ar"
                className="text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-200 break-all"
              >
                produccion@bandurriadeco.com.ar
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Nav ────────────────────────────────────────────────── */

function BrochureNav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 backdrop-blur-md border-b border-[var(--color-border)]"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
      }}
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
        aria-label="Volver al inicio"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Inicio
      </Link>

      <nav className="hidden sm:flex items-center gap-6" aria-label="Secciones">
        {[
          { href: "#servicios", label: "Servicios" },
          { href: "#tecnologia", label: "Tecnología" },
          { href: "#clientes", label: "Clientes" },
          { href: "#contacto", label: "Contacto" },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        href="https://wa.me/5491124080830"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        <Phone size={12} aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </header>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

export default function BrochurePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <BrochureNav />
      <main>
        <Hero />
        <Services />
        <Equipment />
        <Clients />
        {/* Foto de la planta — divisor visual */}
        <div className="relative h-44 sm:h-60 overflow-hidden">
          <img
            src="/img-004.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.35) saturate(0.5)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg-surface)]"
            aria-hidden="true"
          />
        </div>
        <Contact />
      </main>
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-8 text-center">
        <p className="text-xs text-[var(--color-text-muted)]">
          Bandurria — Comunicación Visual · Chacarita, Buenos Aires
        </p>
      </footer>
    </div>
  );
}
