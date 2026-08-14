"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const panels = [
  "page-load-curtain__panel--outer",
  "page-load-curtain__panel--inner",
  "page-load-curtain__panel--center",
  "page-load-curtain__panel--inner",
  "page-load-curtain__panel--outer",
];

export default function PageLoadCurtain() {
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // First render of a given route shows the curtain exactly once; navigating
  // to a different route replays it. Re-renders of the same route never do.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsReady(false);
    setIsComplete(false);
  }

  useEffect(() => {
    const isMobileOrReduced =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 767px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    if (isMobileOrReduced) {
      setIsComplete(true);
      return;
    }

    let active = true;

    const verifyCriticalAssets = () => {
      return new Promise<void>((resolve) => {
        let resolved = false;
        const done = () => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        };

        // Fallback safety timeout of 2.5 seconds to prevent getting stuck
        const timeoutId = setTimeout(done, 2500);

        const check = () => {
          const img = new window.Image();
          img.src = "/images/hero-portrait-highres.webp";
          img.decode()
            .then(() => {
              clearTimeout(timeoutId);
              done();
            })
            .catch(() => {
              clearTimeout(timeoutId);
              done();
            });
        };

        if (document.readyState === "complete") {
          check();
        } else {
          window.addEventListener("load", check);
        }
      });
    };

    verifyCriticalAssets().then(() => {
      if (!active) return;
      setIsReady(true);

      const timer = setTimeout(() => {
        if (active) {
          setIsComplete(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    });

    return () => {
      active = false;
    };
  }, [lastPathname]);

  if (isComplete) return null;

  return (
    <div
      className={`page-load-curtain ${isReady ? "is-animating" : ""}`}
      aria-hidden="true"
    >
      {panels.map((panelClassName, index) => (
        <div className="page-load-curtain__column" key={index}>
          <span
            className={`page-load-curtain__panel ${panelClassName}`}
          />
        </div>
      ))}
    </div>
  );
}
