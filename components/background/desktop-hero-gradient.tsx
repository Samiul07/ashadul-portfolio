"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroGradient = dynamic(() => import("./hero-gradient"), {
  ssr: false,
});

/** Keep the animated SVG/Framer Motion graph out of mobile bundles. */
export default function DesktopHeroGradient() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 641px)");
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return isDesktop ? <HeroGradient /> : null;
}
