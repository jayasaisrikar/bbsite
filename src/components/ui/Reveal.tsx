"use client";

import React, { useEffect, useRef } from "react";

type RevealProps = React.PropsWithChildren<{
  className?: string;
  rootMargin?: string;
  threshold?: number;
}>;

export default function Reveal({ children, className = "", rootMargin = "0px 0px -10% 0px", threshold = 0.15 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial state
    el.classList.add("opacity-0", "translate-y-6");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0", "transition-all", "duration-700", "ease-out");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            // optional: unobserve after reveal
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
