"use client";

import { useEffect, type ReactNode } from "react";
import type Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (reducedMotion || isMobile) return;

    let disposed = false;
    let lenis: Lenis | undefined;
    const portfolioWindow = window as Window & { __portfolioLenis?: Lenis };

    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      lenis = new Lenis({
        anchors: { offset: -86 },
        autoRaf: true,
        duration: 1.05,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        syncTouch: false,
        wheelMultiplier: 0.82,
      });
      portfolioWindow.__portfolioLenis = lenis;
    });

    return () => {
      disposed = true;
      delete portfolioWindow.__portfolioLenis;
      lenis?.destroy();
    };
  }, []);

  return children;
}
