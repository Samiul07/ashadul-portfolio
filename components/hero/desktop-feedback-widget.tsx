"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FeedbackWidget = dynamic(() => import("./feedback-widget"), {
  ssr: false,
});

/** Feedback is hidden below 1200px; defer its Framer Motion graph there. */
export default function DesktopFeedbackWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const media = window.matchMedia("(min-width: 1201px)");
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  // During SSR or before initial mount on client, render a placeholder skeleton
  // container of identical dimensions to prevent any layout shifts (jitter) 
  // when the client-side Framer Motion rotation widget hydrates.
  if (!isMounted) {
    return (
      <div 
        className="absolute right-8 bottom-8 z-[105] h-[210px] w-[404px] border border-white/5 bg-white/[0.02] backdrop-blur-[4px] rounded-[2px] animate-pulse max-[1439px]:right-14 max-[1200px]:hidden"
        style={{
          WebkitBackdropFilter: "blur(4px)",
          backdropFilter: "blur(4px)",
        }}
      />
    );
  }

  return isDesktop ? <FeedbackWidget /> : null;
}
