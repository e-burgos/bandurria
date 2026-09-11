import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ENTER: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface LightboxItem {
  id: string;
  alt: string;
  image: string;
  full: string;
}

export interface OriginOffset {
  x: number;
  y: number;
}

interface Props {
  items: LightboxItem[];
  index: number | null;
  origin: OriginOffset | null;
  direction: number;
  animateStep: boolean;
  onClose: () => void;
  onNavigate: (direction: number, animate: boolean) => void;
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function Lightbox({
  items,
  index,
  origin,
  direction,
  animateStep,
  onClose,
  onNavigate,
}: Props) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate(event.key === "ArrowRight" ? 1 : -1, false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = dialogRef.current?.querySelectorAll("button");
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onKeyDown]);

  const active =
    index === null ? null : { item: items[index], position: index + 1 };

  // La imagen nace desde la tarjeta que se tocó: se arranca desplazada una
  // fracción del vector tarjeta→centro, no en el centro de la nada.
  const pull = 0.4;
  const from = reduceMotion
    ? { opacity: 0, x: 0, y: 0, scale: 1 }
    : {
        opacity: 0,
        x: (origin?.x ?? 0) * pull,
        y: (origin?.y ?? 0) * pull,
        scale: 0.86,
      };

  const stepDuration = reduceMotion || !animateStep ? 0 : 0.26;
  const stepShift = reduceMotion || !animateStep ? 0 : 44;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Trabajo ${active.position} de ${items.length}: ${active.item.alt}`}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80"
            style={{ backdropFilter: "blur(12px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-4"
            initial={from}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ ...from, transition: { duration: reduceMotion ? 0 : 0.2, ease: "easeIn" } }}
            transition={{ duration: reduceMotion ? 0 : 0.42, ease: ENTER }}
          >
            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={active.item.id}
                  src={active.item.full}
                  alt={active.item.alt}
                  initial={{ opacity: 0, x: direction * stepShift }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -stepShift }}
                  transition={{ duration: stepDuration, ease: ENTER }}
                  className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                />
              </AnimatePresence>
            </div>

            <div className="flex w-full items-center justify-between gap-4">
              <p className="min-w-0 flex-1 text-sm text-white/75">
                {active.item.alt}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate(-1, true)}
                  aria-label="Trabajo anterior"
                  className="rounded-full border border-white/25 p-2.5 text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Arrow direction="left" />
                </button>
                <span
                  className="min-w-14 text-center text-sm tabular-nums text-white/70"
                  aria-hidden="true"
                >
                  {active.position} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate(1, true)}
                  aria-label="Trabajo siguiente"
                  className="rounded-full border border-white/25 p-2.5 text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Arrow direction="right" />
                </button>
              </div>
            </div>
          </motion.div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar visor"
            className="absolute right-4 top-4 rounded-full border border-white/25 p-2.5 text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8 sm:top-8"
          >
            <CloseIcon />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
