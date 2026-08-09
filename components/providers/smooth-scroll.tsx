"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (reducedMotion || isMobile) return;

    const lenis = new Lenis({
      anchors: { offset: -86 },
      autoRaf: true,
      duration: 1.05,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      wheelMultiplier: 0.82,
    });

    const portfolioWindow = window as Window & { __portfolioLenis?: Lenis };
    portfolioWindow.__portfolioLenis = lenis;

    return () => {
      delete portfolioWindow.__portfolioLenis;
      lenis.destroy();
    };
  }, []);

  return children;
}
