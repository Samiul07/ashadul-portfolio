"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const colorMask =
  "radial-gradient(circle at 50% 42%, #000 0%, #000 40%, rgb(0 0 0 / 84%) 49%, rgb(0 0 0 / 30%) 58%, transparent 69%)";

export default function WhyMePortraitFrame({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const portraitPosition = compact
    ? "top-[-16px] w-[124%] max-[640px]:top-[-10px] max-[640px]:w-[124%]"
    : "top-[-18px] w-[124%]";
  const sizes = compact
    ? "(max-width: 639px) 357px, 446px"
    : "466px";

  return (
    <div
      className={`relative border border-white/34 ${
        compact
          ? "mx-auto h-[520px] w-[360px] max-[640px]:h-[420px] max-[640px]:w-full"
          : "h-[570px] w-[378px]"
      }`}
      data-why-me-portrait=""
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsHovered(true);
      }}
      onPointerLeave={() => setIsHovered(false)}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-1/2 z-4 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-primary"
      />
      <span className="absolute top-0 left-5 z-4 -translate-y-1/2 bg-black px-3 font-overline text-xs leading-none font-medium whitespace-nowrap text-white/60 uppercase">
        One senior partner
      </span>

      <div className="absolute inset-px z-3 overflow-hidden">
        <Image
          alt="Ashadul Islam"
          className={`absolute left-1/2 h-auto max-w-none -translate-x-1/2 select-none [filter:grayscale(1)_contrast(1.06)_brightness(.92)] ${portraitPosition}`}
          height={1537}
          priority
          sizes={sizes}
          src="/images/why-me-blue-portrait.png"
          width={1023}
        />

        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.992,
            maskSize: isHovered ? "360% 360%" : "0% 0%",
          }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          initial={false}
          style={{
            maskImage: colorMask,
            maskPosition: "50% 42%",
            maskRepeat: "no-repeat",
            transformOrigin: "50% 45%",
            WebkitMaskImage: colorMask,
            WebkitMaskPosition: "50% 42%",
            WebkitMaskRepeat: "no-repeat",
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.82,
                  ease: [0.16, 1, 0.3, 1],
                  opacity: { duration: 0.18 },
                }
          }
        >
          <Image
            alt=""
            className={`absolute left-1/2 h-auto max-w-none -translate-x-1/2 select-none [filter:saturate(.94)_contrast(1.03)] ${portraitPosition}`}
            height={1537}
            priority
            sizes={sizes}
            src="/images/why-me-blue-portrait.png"
            width={1023}
          />
        </motion.div>
      </div>
    </div>
  );
}
