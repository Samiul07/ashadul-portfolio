"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

const faqs = [
  {
    question: "What can I contact you about?",
    answer:
      "A new product, an existing experience that needs clarity, design systems, consulting, collaborations, or a role on your team. It does not have to be a fully defined project.",
  },
  {
    question: "What do you need from me?",
    answer:
      "A short note about what you are building, the problem, and where things stand today is enough. Links, files, timelines, and budgets help when available, but they are not required for the first message.",
  },
  {
    question: "Can you join an existing team?",
    answer:
      "Yes. I can work inside an established workflow, partner with founders and product teams, or own a defined product area from discovery through delivery—including with teams outside Bangladesh.",
  },
  {
    question: "When will I hear back?",
    answer:
      "Usually within two working days. If the request is a good fit, I will suggest the clearest next step: a short call, a focused follow-up, or the information needed to shape a scope.",
  },
  {
    question: "Can we talk before the scope is clear?",
    answer:
      "Absolutely. Send a short message and we can clarify the opportunity before deciding what the engagement should become.",
  },
] as const;

function PlusIcon({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative h-5 w-5 shrink-0 transition-colors duration-300 ${active ? "text-primary" : "text-white/42"}`}
    >
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
      <span
        className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-500 ${active ? "rotate-90" : "rotate-0"}`}
      />
    </span>
  );
}

export default function ContactFaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const hoverLockRef = useRef(false);
  const hoverUnlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverActivationPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(
    () => () => {
      if (hoverUnlockTimerRef.current) {
        clearTimeout(hoverUnlockTimerRef.current);
      }
    },
    [],
  );

  const activateFromHover = (
    index: number,
    event: ReactMouseEvent<HTMLElement>,
  ) => {
    if (index === activeIndex) return;

    const previousPoint = hoverActivationPointRef.current;
    const pointerMoved =
      !previousPoint ||
      Math.hypot(
        event.clientX - previousPoint.x,
        event.clientY - previousPoint.y,
      ) > 8;

    if (hoverLockRef.current && !pointerMoved) return;

    hoverLockRef.current = true;
    hoverActivationPointRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
    setActiveIndex(index);

    if (hoverUnlockTimerRef.current) {
      clearTimeout(hoverUnlockTimerRef.current);
    }
    hoverUnlockTimerRef.current = setTimeout(() => {
      hoverLockRef.current = false;
      hoverUnlockTimerRef.current = null;
    }, 720);
  };

  return (
    <section
      aria-labelledby="contact-faq-heading"
      className="relative z-10 bg-transparent text-white"
      id="faq"
    >
      <div
        className={`border-x border-white/12 pt-[144px] pb-[132px] max-[1024px]:pt-[120px] max-[1024px]:pb-[112px] max-[640px]:pt-24 max-[640px]:pb-24 ${frameWidth} ${frameMargin}`}
      >
        <header className="px-8 max-[1200px]:px-6 max-[640px]:px-5">
          <p className="m-0 font-sans text-sm leading-none font-medium tracking-[0.12em] text-white/58 uppercase">
            <span className="text-primary">{"//"}</span> Common questions
          </p>
          <h2
            className="m-0 mt-6 font-display text-[clamp(108px,11vw,160px)] leading-[0.86] font-black tracking-[-0.052em] text-white uppercase max-[640px]:mt-5 max-[640px]:text-[clamp(64px,19vw,86px)]"
            id="contact-faq-heading"
          >
            Before we start<span className="text-primary">.</span>
          </h2>
        </header>

        <div
          className="mt-[72px] grid h-[624px] overflow-hidden border-t border-white/14 [--faq-closed:1fr] [--faq-open:2fr] transition-[grid-template-rows] duration-[720ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:duration-0 max-[640px]:h-[640px] max-[640px]:[--faq-closed:3fr] max-[640px]:[--faq-open:8fr]"
          style={{
            gridTemplateRows: faqs
              .map((_, index) =>
                activeIndex === index
                  ? "var(--faq-open)"
                  : "var(--faq-closed)",
              )
              .join(" "),
          }}
        >
          {faqs.map((faq, index) => {
            const active = activeIndex === index;

            return (
              <article
                className={`group relative overflow-hidden ${index < faqs.length - 1 ? "border-b border-white/14" : ""}`}
                key={faq.question}
                onMouseEnter={(event) => activateFromHover(index, event)}
                onMouseMove={(event) => activateFromHover(index, event)}
              >
                <motion.span
                  animate={{ scaleX: active ? 1 : 0 }}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left bg-primary"
                  initial={false}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
                  }
                />

                <div className="h-full overflow-hidden">
                  <button
                    aria-label={faq.question}
                    aria-expanded={active}
                    className="flex min-h-[104px] w-full cursor-pointer items-center gap-7 border-0 bg-transparent px-8 py-5 text-left text-white outline-none transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] max-[1200px]:px-6 max-[640px]:min-h-[96px] max-[640px]:gap-4 max-[640px]:px-5"
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  >
                    <span className="w-12 shrink-0 font-display text-[32px] leading-none font-black tracking-[-0.04em] text-primary/72 max-[640px]:w-9 max-[640px]:text-[26px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`min-w-0 flex-1 font-display text-[42px] leading-[0.95] font-black tracking-[-1.4px] uppercase transition-colors duration-300 ease-out max-[1024px]:text-[36px] max-[640px]:text-[30px] max-[640px]:leading-none max-[640px]:tracking-[-0.8px] ${active ? "text-primary" : "text-white/58 group-hover:text-white"}`}
                    >
                      {faq.question}
                    </span>
                    <PlusIcon active={active} />
                  </button>

                  <motion.div
                    animate={{
                      opacity: active ? 1 : 0,
                      y: active ? 0 : 12,
                    }}
                    aria-hidden={!active}
                    className={`grid grid-cols-[48px_1fr] gap-7 overflow-hidden px-8 max-[1200px]:px-6 max-[640px]:grid-cols-[36px_1fr] max-[640px]:gap-4 max-[640px]:px-5 ${active ? "h-auto pb-8 max-[640px]:pb-7" : "h-0 pb-0"}`}
                    initial={false}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            opacity: {
                              delay: active ? 0.12 : 0,
                              duration: active ? 0.42 : 0.24,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            },
                            y: {
                              duration: active ? 0.54 : 0.28,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            },
                          }
                    }
                  >
                    <span aria-hidden="true" />
                    <p className="m-0 max-w-[760px] pr-12 font-sans text-base leading-[1.65] tracking-[-0.22px] text-white/50 max-[640px]:pr-0 max-[640px]:text-[15px]">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
