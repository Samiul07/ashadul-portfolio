"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/testimonials";

const featuredClientNames = [
  "Shohanur Rahman",
  "Sean Hopwood",
  "Michael Lion",
  "Justin Böttger",
  "Nate DiDomizio",
];

const feedbackItems = featuredClientNames.flatMap((name) => {
  const testimonial = testimonials.find((item) => item.name === name);
  if (!testimonial) return [];

  const [role, ...companyParts] = testimonial.role.split(", ");

  return [
    {
      company: companyParts.join(", "),
      name: testimonial.name,
      quote: testimonial.text,
      role,
    },
  ];
});

const FEEDBACK_INTERVAL = 4000;
const textTransition = {
  duration: 0.46,
  ease: [0.22, 1, 0.36, 1],
} as const;

export default function FeedbackWidget() {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeFeedback = feedbackItems[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % feedbackItems.length);
    }, FEEDBACK_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside
      className="absolute right-8 bottom-8 z-[105] flex h-[210px] w-[404px] flex-col border border-white/20 bg-[radial-gradient(circle_at_50%_100%,rgba(255,30,0,0.18),transparent_58%),linear-gradient(180deg,rgba(18,8,7,0.44)_0%,rgba(4,1,1,0.42)_100%)] px-6 pt-5 pb-5 text-white shadow-[0_32px_72px_rgba(0,0,0,0.32)] backdrop-blur-[4px] max-[1439px]:right-14 max-[1200px]:hidden"
      aria-label="Recent client feedback"
      style={{
        WebkitBackdropFilter: "blur(4px)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="relative flex shrink-0 items-center justify-between border-b border-white/20 pb-[14px] -mx-6 px-6">
        <p className="m-0 font-sans text-sm leading-none font-medium tracking-normal text-white/40 uppercase">
          {"// Client Feedbacks"}
        </p>

        <div className="flex shrink-0 items-center gap-[6px]" aria-hidden="true">
          {feedbackItems.map((item, index) => (
            <motion.span
              animate={{
                backgroundColor:
                  index === activeIndex
                    ? "rgb(255, 30, 0)"
                    : "rgba(255, 255, 255, 0.18)",
                width: index === activeIndex ? 34 : 18,
              }}
              className="block h-[2px]"
              key={`${item.name}-${item.company}-header-indicator`}
              transition={{ duration: 0.18, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      <div className="relative flex flex-grow items-center overflow-hidden py-3">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            aria-live="polite"
            className="m-0 w-full overflow-hidden font-sans text-base leading-[1.2] font-normal tracking-normal text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
            exit={{ filter: "blur(5px)", opacity: 0, y: -10 }}
            initial={{ filter: "blur(6px)", opacity: 0, y: 12 }}
            key={activeFeedback.quote}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
            transition={textTransition}
          >
            {activeFeedback.quote}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="relative flex h-[38px] shrink-0 items-end">
        <div className="relative h-[38px] min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0"
              exit={{ filter: "blur(4px)", opacity: 0, y: -8 }}
              initial={{ filter: "blur(5px)", opacity: 0, y: 10 }}
              key={`${activeFeedback.name}-${activeFeedback.company}`}
              transition={{ ...textTransition, delay: 0.04 }}
            >
              <p className="m-0 font-sans text-[15px] leading-none font-semibold tracking-[0.2px] text-white uppercase">
                {activeFeedback.name}
              </p>
              <p className="mt-1.5 mb-0 font-sans text-sm leading-none font-medium tracking-[0.1px] whitespace-nowrap text-white/45 uppercase">
                {activeFeedback.role.toUpperCase()},{" "}
                {activeFeedback.company.toUpperCase()}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <motion.span
        aria-hidden="true"
        className="absolute -bottom-px -left-px h-[2px] bg-primary"
        initial={{ width: 0 }}
        animate={{ width: "calc(100% + 2px)" }}
        key={activeIndex}
        transition={{ duration: FEEDBACK_INTERVAL / 1000, ease: "linear" }}
      />
    </aside>
  );
}
