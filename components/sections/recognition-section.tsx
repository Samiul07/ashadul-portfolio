"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import SectionCrosshairs from "../ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

const awards = [
  {
    detail: "Top Design Voice \u2014 Multilingual Experience",
    icon: "localazy",
    name: "Localazy Digest",
    year: "2023",
  },
  {
    detail: "Top Submission \u2014 Be Reviews Dhaka",
    icon: "behance",
    name: "Behance Award",
    year: "2018",
  },
  {
    detail: "Featured Projects \u2014 UI/UX & Adobe XD",
    icon: "featured",
    name: "Behance Features",
    year: "2017\u201318",
  },
  {
    detail: "Honored Top Designer \u2014 Creative Meet Dhaka",
    icon: "transferwise",
    name: "TransferWise",
    year: "2016",
  },
] as const;

const awardIcons: Record<(typeof awards)[number]["icon"], string> = {
  behance: "/images/recognition-behance-award.svg",
  featured: "/images/recognition-behance-features.svg",
  localazy: "/images/recognition-localazy-digest.svg",
  transferwise: "/images/recognition-transferwise.svg",
};

function AwardIcon({ icon }: { icon: (typeof awards)[number]["icon"] }) {
  const size =
    icon === "featured"
      ? "h-9 w-[58px]"
      : icon === "behance"
        ? "h-[60px] w-[60px]"
        : "h-12 w-[78px]";
  const responsiveSize = icon === "featured" ? "58px" : icon === "behance" ? "60px" : "78px";

  return (
    <span aria-hidden="true" className={`relative block ${size}`}>
      <Image
        alt=""
        className="object-contain"
        fill
        sizes={responsiveSize}
        src={awardIcons[icon]}
      />
    </span>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function RecognitionSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const bubbleX = useSpring(pointerX, { damping: 30, mass: 0.42, stiffness: 360 });
  const bubbleY = useSpring(pointerY, { damping: 30, mass: 0.42, stiffness: 360 });

  const moveBubble = (event: PointerEvent<HTMLElement>) => {
    const frame = frameRef.current;
    if (!frame) return;

    const bounds = frame.getBoundingClientRect();
    const radius = 54;
    pointerX.set(clamp(event.clientX - bounds.left + 82, radius, bounds.width - radius));
    pointerY.set(clamp(event.clientY - bounds.top - 66, radius, bounds.height - radius));
  };

  return (
    <section
      aria-labelledby="recognition-heading"
      className="relative z-6 w-full border-t border-white/12 bg-black text-white"
      id="recognition"
    >
      <div
        className={`relative flex min-h-[976px] flex-col justify-center gap-14 border-x border-white/12 py-[120px] max-[1024px]:min-h-0 max-[1024px]:py-24 max-[640px]:gap-10 max-[640px]:py-14 ${frameWidth} ${frameMargin}`}
        ref={frameRef}
      >
        <SectionCrosshairs />

        <header className="flex w-full flex-col gap-8 px-8 text-white uppercase max-[640px]:gap-6 max-[640px]:px-5">
          <p className="m-0 font-overline text-base leading-none font-medium max-[640px]:text-sm">
            {"// Awards & Recognition"}
          </p>
          <h2
            className="m-0 font-display text-[160px] leading-none font-black tracking-[-6px] whitespace-nowrap max-[1024px]:text-[clamp(82px,14vw,132px)] max-[640px]:text-[clamp(50px,14.9vw,64px)] max-[640px]:leading-[1.1] max-[640px]:tracking-[-3px]"
            id="recognition-heading"
          >
            Recognition<span className="text-primary">.</span>
          </h2>
        </header>

        <div
          className="flex w-full flex-col"
          onPointerLeave={() => setActiveIndex(null)}
        >
          {awards.map((award, index) => (
            <article
              className={`group relative grid min-h-[108px] grid-cols-[450px_minmax(0,1fr)_auto] items-center gap-8 px-8 py-8 tracking-[-0.5px] min-[641px]:max-[1200px]:grid-cols-[minmax(0,1fr)_auto] min-[641px]:max-[1200px]:gap-x-10 min-[641px]:max-[1200px]:gap-y-2 max-[640px]:grid-cols-1 max-[640px]:gap-3.5 max-[640px]:px-5 max-[640px]:py-5 ${index === 0 ? "max-[640px]:pt-0" : ""}`}
              key={award.name}
              onPointerEnter={(event) => {
                setActiveIndex(index);
                moveBubble(event);
              }}
              onPointerMove={moveBubble}
            >

              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12 ${index === 0 ? "max-[640px]:hidden" : ""}`}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 ${index === 0 ? "max-[640px]:hidden" : ""}`}
              />
              <h3 className="m-0 font-display text-[56px] leading-[1.1] font-black text-white uppercase min-[641px]:max-[1200px]:col-start-1 min-[641px]:max-[1200px]:row-start-1 min-[641px]:max-[1200px]:text-[clamp(40px,5.2vw,56px)] max-[640px]:text-[32px] max-[640px]:font-bold">
                {award.name}
              </h3>
              <p className="m-0 font-sans text-2xl leading-[1.2] font-medium text-muted transition-colors duration-300 group-hover:text-primary min-[641px]:max-[1200px]:col-start-1 min-[641px]:max-[1200px]:row-start-2 min-[641px]:max-[1200px]:max-w-[34ch] min-[641px]:max-[1200px]:text-[18px] max-[640px]:text-[18px] max-[640px]:leading-[1.3]">
                {award.detail}
              </p>
              <p className="m-0 whitespace-nowrap font-display text-[56px] leading-[1.1] font-black text-white uppercase min-[641px]:max-[1200px]:col-start-2 min-[641px]:max-[1200px]:row-span-2 min-[641px]:max-[1200px]:row-start-1 min-[641px]:max-[1200px]:self-center min-[641px]:max-[1200px]:text-[clamp(42px,5.4vw,56px)] max-[640px]:text-[32px] max-[640px]:font-bold">
                <span className="text-primary">{"//"}</span> {award.year}
              </p>
            </article>
          ))}
        </div>

        <AnimatePresence>
          {activeIndex !== null ? (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="pointer-events-none absolute top-0 left-0 z-30 hidden min-[960px]:block"
              exit={{ opacity: 0, scale: 0.86 }}
              initial={{ opacity: 0, scale: 0.86 }}
              style={{ x: bubbleX, y: bubbleY }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                className="flex h-[108px] w-[108px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-[0_18px_54px_rgba(255,30,0,0.28)]"
                transition={reduceMotion ? undefined : { duration: 2.2, ease: "easeInOut", repeat: Infinity }}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    className="inline-flex items-center justify-center"
                    exit={{ opacity: 0, rotate: -8, scale: 0.76 }}
                    initial={{ opacity: 0, rotate: 8, scale: 0.76 }}
                    key={awards[activeIndex].icon}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                  >
                    <AwardIcon icon={awards[activeIndex].icon} />
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
