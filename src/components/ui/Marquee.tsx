import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  gapClassName?: string;
  fadeColor?: string;
  paused?: boolean;
}

export function Marquee({
  children,
  speed = 45,
  reverse = false,
  gapClassName = "gap-4",
  fadeColor = "var(--color-bg-surface)",
  paused = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(1);
  const [setWidth, setSetWidth] = useState(0);
  const [onScreen, setOnScreen] = useState(true);
  const [hovered, setHovered] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const width = setRef.current?.offsetWidth ?? 0;
      if (!width) return;
      setSetWidth(width);
      setCopies(Math.max(1, Math.ceil(container.offsetWidth / width)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const half = (measured: boolean) => (
    <div className={`flex shrink-0 ${gapClassName}`}>
      {Array.from({ length: copies }, (_, i) => (
        <div
          key={i}
          ref={measured && i === 0 ? setRef : undefined}
          className={`flex shrink-0 ${gapClassName}`}
        >
          {children}
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex w-max ${gapClassName} motion-safe:animate-[marquee_linear_infinite]`}
        style={{
          animationDuration: `${Math.max(1, (copies * setWidth) / speed)}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState:
            paused || hovered || !onScreen ? "paused" : "running",
        }}
      >
        {half(true)}
        <div aria-hidden="true" className="contents">
          {half(false)}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20"
        style={{ background: `linear-gradient(90deg, ${fadeColor}, transparent)` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20"
        style={{ background: `linear-gradient(270deg, ${fadeColor}, transparent)` }}
        aria-hidden="true"
      />
    </div>
  );
}
