import { RevealOnScroll } from "../ui/RevealOnScroll";
import { DESCARGAS, DESCARGAS_URL, type Descarga } from "../../data/descargas";

function DescargaIcon({ tipo }: { tipo: Descarga["icon"] }) {
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
      {tipo === "precios" ? (
        <>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </>
      ) : (
        <>
          <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" />
          <path d="M4 19V5M9 8h6M9 12h6" />
        </>
      )}
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function Descargas() {
  return (
    <section
      id="descargas"
      aria-label="Descargas — precios e instructivos"
      className="py-20 bg-[var(--color-bg)]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        {DESCARGAS.map((descarga, i) => (
          <RevealOnScroll key={descarga.id} delay={i * 100} className="h-full">
            <div className="group flex h-full flex-col gap-5 rounded-2xl border border-[var(--color-accent)]/25 bg-[var(--color-bg-card)] p-8 transition-colors duration-300 hover:border-[var(--color-accent)]/60 sm:flex-row sm:items-center">
              <span
                className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                aria-hidden="true"
              >
                <DescargaIcon tipo={descarga.icon} />
              </span>
              <div className="flex-1">
                <p className="mb-1 text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-accent)]">
                  {descarga.eyebrow}
                </p>
                <h3 className="mb-2 text-xl font-black text-[var(--color-text)]">
                  {descarga.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {descarga.desc}
                </p>
              </div>
              <a
                href={DESCARGAS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                {descarga.ctaLabel}
                <DownloadIcon />
              </a>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
