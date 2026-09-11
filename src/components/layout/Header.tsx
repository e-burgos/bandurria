import { useEffect, useState } from "react";
import logoImg from "../../assets/logo-home.png";

interface Props {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Clientes", href: "#clientes" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Contacto", href: "#contacto" },
];

function Logo({ theme }: { theme: "dark" | "light" }) {
  return (
    <a
      href="#inicio"
      className="flex items-center group"
      aria-label="Bandurria - inicio"
    >
      <img
        src={logoImg}
        alt="Bandurria Gráfica y Deco"
        width={376}
        height={95}
        className={[
          "h-9 w-auto object-contain transition-[filter] duration-300 sm:h-10",
          theme === "light" ? "invert" : "",
        ].join(" ")}
      />
    </a>
  );
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Header({ theme, onToggleTheme }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "bg-[var(--color-bg)]/95 backdrop-blur-md",
        "border-b border-[var(--color-border)]",
        "transition-shadow duration-300",
        scrolled ? "shadow-[0_4px_32px_rgba(0,0,0,0.35)]" : "",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo theme={theme} />

        {/* Nav desktop */}
        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300
                after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-[var(--color-accent)]
                hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="rounded-full p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-surface)] transition-all duration-300 hover:rotate-12"
            aria-label={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* RRSS */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="https://www.facebook.com/bandurria.deco.7"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-surface)] transition-all duration-300"
              aria-label="Facebook de Bandurria"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/bandurriadeco"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-surface)] transition-all duration-300"
              aria-label="Instagram de Bandurria"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="lg:hidden flex flex-col justify-center gap-[5px] p-2 w-10 h-10"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-[var(--color-text)] transition-all duration-300 origin-center ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--color-text)] transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--color-text)] transition-all duration-300 origin-center ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] animate-[slide-in-right_0.28s_ease-out]">
          <nav
            className="flex flex-col px-4 py-4 gap-1"
            aria-label="Menú móvil"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-3 px-2 text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-surface)] rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 px-2 pt-3 border-t border-[var(--color-border)] mt-2">
              <a
                href="https://www.facebook.com/bandurria.deco.7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/bandurriadeco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
