"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FeedbackWidget = dynamic(() => import("./feedback-widget"), {
  ssr: false,
});

/** Feedback is hidden below 1200px; defer its Framer Motion graph there. */
export default function DesktopFeedbackWidget() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1201px)");
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return isDesktop ? <FeedbackWidget /> : null;
}
