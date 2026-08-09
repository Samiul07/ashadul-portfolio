"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import SectionCrosshairs from "../ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

const services = [
  {
    description:
      "End-to-end UX/UI for SaaS platforms, dashboards, mobile apps, and web products, from rough brief to polished interface.",
    tags: [
      "Web & mobile",
      "User flows",
      "UX/UI design",
      "Prototyping",
      "Handoff",
      "Dashboard UI",
    ],
    title: "Product Design",
  },
  {
    description:
      "I design flows built to convert; landing pages, funnels, and checkouts then validate them with A/B testing, not guesswork.",
    tags: [
      "Landing pages",
      "Funnels",
      "A/B testing",
      "Booking flows",
      "Drop-off reduction",
    ],
    title: "Conversion & CRO",
  },
  {
    description:
      "I connect design decisions to business goals; through user research, journey mapping, and a clear rationale behind every screen.",
    tags: [
      "User research",
      "Journey mapping",
      "IA",
      "Usability testing",
      "Success metrics",
      "Competitor review",
    ],
    title: "UX Strategy & Research",
  },
  {
    description:
      "Reusable components, tokens, patterns, and documentation that make product delivery faster and more consistent.",
    tags: [
      "Tokens",
      "Components",
      "Documentation",
      "Figma variables",
      "Dev-ready specs",
    ],
    title: "Design Systems",
  },
  {
    description:
      "I take designs from Figma to functional myself, vibe-coding front-ends so ideas ship as real product, not just mockups.",
    tags: [
      "HTML/CSS basics",
      "Vibe-coding",
      "Live prototypes",
      "Fast shipping",
      "QA review",
    ],
    title: "Design-to-code",
  },
  {
    description:
      "Using AI and vibe-coding workflows to prototype ideas, test interactions, and explore implementation faster.",
    tags: [
      "AI research",
      "Rapid prototyping",
      "Vibe-coding",
      "Workflow automation",
      "Cursor",
      "Claude Code",
      "Codex",
      "Figma Make",
    ],
    title: "AI-assisted Design",
  },
];

const capabilityNotes: Record<string, string> = {
  "A/B testing":
    "I compare solutions, then use evidence to choose the stronger direction.",
  "AI research":
    "I find where AI solves a real user problem before adding it.",
  "Booking flows":
    "I reduce steps and uncertainty so more users complete their booking.",
  "Claude Code":
    "I use codebase-wide reasoning to solve edge cases and review builds.",
  Codex:
    "I turn product intent into working UI, then refine it in-browser.",
  Components:
    "I build flexible patterns that prevent one-off UI debt.",
  "Competitor review":
    "I compare patterns and gaps to find opportunities we can own.",
  Cursor:
    "I use codebase context to implement decisions with fewer blind spots.",
  "Dashboard UI":
    "I organize dense data around priority, action, and quick decisions.",
  "Dev-ready specs":
    "I document states and edge cases so developers interpret less.",
  Documentation:
    "I capture when and how patterns should be used beyond the design file.",
  "Drop-off reduction":
    "I find where confidence breaks, then redesign the moment users leave.",
  "Fast shipping":
    "I reduce handoffs and validate in-browser so useful work ships sooner.",
  "Figma Make":
    "I pressure-test interactive ideas before committing to a full build.",
  "Figma variables":
    "I connect colors, spacing, and modes so global updates stay safe.",
  Funnels:
    "I connect each step and remove distractions that kill momentum.",
  Handoff:
    "I document states, responsive behavior, and what developers need.",
  "HTML/CSS basics":
    "I design for real layout, responsive, and browser constraints.",
  IA: "I organize and label information around how users expect to find it.",
  "Journey mapping":
    "I map touchpoints and breakdowns to show where to intervene.",
  "Landing pages":
    "I align hierarchy, messaging, and calls to action around one goal.",
  "Live prototypes":
    "I prototype real interactions so teams can judge behavior early.",
  Prototyping:
    "I test risky interactions while changing direction is still cheap.",
  "QA review":
    "I compare the build to the design and catch responsive gaps.",
  "Rapid prototyping":
    "I make concepts testable before the team over-invests.",
  "Success metrics":
    "I define observable outcomes first, so improvement has a shared meaning.",
  Tokens:
    "I turn repeated visual choices into consistent foundations.",
  "Usability testing":
    "I watch where users hesitate, then prioritize the clearest fixes.",
  "User flows":
    "I map decisions and edge cases so users always understand the next step.",
  "User research":
    "I turn interviews and behavior into product priorities teams can act on.",
  "UX/UI design":
    "I pair clear interaction logic with an intentional visual system.",
  "Vibe-coding":
    "I move from prompt to functional UI quickly, then review structure and usability.",
  "Web & mobile":
    "I adapt product logic to each screen, platform, and interaction model.",
  "Workflow automation":
    "I automate repetitive delivery work so more time goes into product judgment.",
};

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
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
    setActiveCapability(null);
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
      aria-labelledby="services-heading"
      className="relative z-6 w-full border-t border-white/12 bg-black text-white"
      id="expertise"
    >
      <style>{`
        @media (max-width: 1199px) {
          [data-services-mobile-list] {
            interpolate-size: allow-keywords;
          }

          [data-mobile-service-disclosure]::details-content {
            block-size: 0;
            opacity: 0;
            overflow-y: clip;
            transition:
              block-size 520ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 260ms ease,
              content-visibility 520ms allow-discrete;
          }

          [data-mobile-service-disclosure][open]::details-content {
            block-size: auto;
            opacity: 1;
          }

          [data-mobile-service-panel] {
            transform: translate3d(0, -8px, 0);
            transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
          }

          [data-mobile-service-disclosure][open] [data-mobile-service-panel] {
            transform: translate3d(0, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-mobile-service-disclosure]::details-content,
          [data-mobile-service-panel] {
            transition: none !important;
          }
        }
      `}</style>

      <div
        className={`relative flex min-h-[1372px] flex-col justify-center gap-14 border-x border-white/12 py-[120px] max-[1200px]:min-h-0 max-[1200px]:py-24 max-[640px]:justify-start max-[640px]:gap-10 max-[640px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />

        <header className="flex w-full flex-col gap-8 px-8 text-white uppercase max-[640px]:gap-6 max-[640px]:px-5">
          <p className="m-0 font-overline text-base leading-none font-medium">
            {"// What I bring to product teams"}
          </p>
          <h2
            className="m-0 font-display text-[160px] leading-none font-black tracking-[-6px] max-[1200px]:text-[clamp(82px,14vw,132px)] max-[640px]:text-[64px] max-[640px]:leading-[1.1] max-[640px]:tracking-[-3px]"
            id="services-heading"
          >
            How I Can Help<span className="text-primary">.</span>
          </h2>
        </header>

        <div className="hidden h-[882px] w-full [contain:layout] min-[1200px]:block">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                className="relative border-t border-white/12"
                key={service.title}
                onMouseEnter={(event) => activateFromHover(index, event)}
                onMouseMove={(event) => activateFromHover(index, event)}
              >
                <motion.span
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-[-1px] z-10 h-px origin-left bg-primary"
                  initial={false}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
                  }
                />
                <div
                  className={`grid grid-cols-[minmax(0,1fr)_450px] items-center gap-12 overflow-visible px-8 py-8 transition-[height] duration-[720ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:duration-0 max-[1024px]:grid-cols-1 max-[1024px]:gap-0 max-[640px]:px-5 ${
                    isActive
                      ? "min-[1200px]:h-[201px] min-[1024px]:max-[1200px]:h-[296px] min-[640px]:max-[1024px]:h-[432px] min-[480px]:max-[640px]:h-[464px] min-[390px]:max-[480px]:h-[513px] min-[360px]:max-[390px]:h-[561px] max-[360px]:h-[585px]"
                      : "min-[1200px]:h-[135px] min-[640px]:max-[1200px]:h-[205px] max-[640px]:h-[166px]"
                  }`}
                >
                  <button
                    aria-expanded={isActive}
                    className="group min-w-0 cursor-pointer bg-transparent text-left text-white"
                    onClick={() => {
                      setActiveCapability(null);
                      setActiveIndex(index);
                    }}
                    type="button"
                  >
                    <motion.h3
                      className={`m-0 font-display text-[64px] leading-[1.1] font-black tracking-[-3px] uppercase transition-colors duration-300 ease-out min-[640px]:max-[1200px]:min-h-[141px] max-[640px]:min-h-[102px] max-[640px]:text-[46px] max-[640px]:tracking-[-2px] ${
                        isActive ? "text-primary" : "text-white"
                      }`}
                    >
                      {service.title}
                    </motion.h3>

                    <motion.div
                      style={{ willChange: "transform, opacity" }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 12,
                      }}
                      aria-hidden={!isActive}
                      className={isActive ? "h-auto overflow-hidden" : "h-0 overflow-hidden"}
                      initial={false}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              opacity: {
                                delay: isActive ? 0.12 : 0,
                                duration: isActive ? 0.42 : 0.24,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              },
                              y: {
                                duration: isActive ? 0.54 : 0.28,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              },
                            }
                      }
                    >
                      <p className="m-0 w-[513px] max-w-full pt-[18px] font-sans text-base leading-normal font-normal tracking-[-0.32px] text-white/80">
                        {service.description}
                      </p>
                    </motion.div>
                  </button>

                  <motion.div
                    style={{ willChange: "transform, opacity" }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 14,
                    }}
                    aria-hidden={!isActive}
                    className={`relative z-20 overflow-visible ${
                      isActive ? "h-auto" : "h-0"
                    }`}
                    initial={false}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            opacity: {
                              delay: isActive ? 0.1 : 0,
                              duration: isActive ? 0.44 : 0.22,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            },
                            y: {
                              duration: isActive ? 0.56 : 0.28,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            },
                          }
                    }
                  >
                    <div className="flex w-full flex-wrap items-center gap-2 max-[1024px]:mt-6">
                      {service.tags.map((tag, tagIndex) => {
                        const capabilityId = `${index}-${tagIndex}`;

                        return (
                          <motion.span
                            style={{ willChange: "transform, opacity" }}
                            animate={
                              isActive
                                ? { opacity: 1, scale: 1, x: 0, y: 0 }
                                : { opacity: 0, scale: 0.96, x: 18, y: 4 }
                            }
                            aria-describedby={`capability-note-${capabilityId}`}
                            aria-label={`${tag}: ${capabilityNotes[tag]}`}
                            className="relative inline-flex focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            initial={false}
                            key={`${service.title}-${tag}`}
                            onBlur={() => setActiveCapability(null)}
                            onFocus={() => setActiveCapability(capabilityId)}
                            onMouseEnter={() => setActiveCapability(capabilityId)}
                            onMouseLeave={(event) => {
                              if (event.currentTarget !== document.activeElement) {
                                setActiveCapability(null);
                              }
                            }}
                            tabIndex={isActive ? 0 : -1}
                            transition={
                              reduceMotion
                                ? { duration: 0 }
                                : {
                                    delay: isActive
                                      ? 0.12 + tagIndex * 0.035
                                      : 0,
                                    duration: 0.46,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                  }
                            }
                          >
                            <AnimatePresence>
                              {activeCapability === capabilityId ? (
                                <motion.span
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  className="pointer-events-none absolute bottom-[calc(100%+46px)] left-1/2 z-30 hidden w-[280px] -translate-x-1/2 max-[1200px]:right-0 max-[1200px]:left-auto max-[1200px]:translate-x-0 min-[1024px]:block"
                                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                                  id={`capability-note-${capabilityId}`}
                                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                                  role="tooltip"
                                  transition={
                                    reduceMotion
                                      ? { duration: 0 }
                                      : {
                                          duration: 0.2,
                                          ease: [0.22, 1, 0.36, 1],
                                        }
                                  }
                                >
                                  <span className="block bg-white px-4 py-3 text-left text-black shadow-[0_16px_44px_rgba(0,0,0,0.42)] [clip-path:polygon(0_0,calc(100%_-_10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%_-_10px))]">
                                    <span className="block font-overline text-[10px] leading-none font-medium tracking-[0.08em] text-primary uppercase">
                                      {"// Capability"}
                                    </span>
                                    <span className="mt-2 block font-sans text-sm leading-[1.4] font-medium tracking-[-0.2px] text-black">
                                      {capabilityNotes[tag]}
                                    </span>
                                  </span>
                                </motion.span>
                              ) : null}
                            </AnimatePresence>

                            <span className="inline-flex h-10 items-center justify-center border-[0.5px] border-primary px-3 py-2 font-sans text-base leading-normal font-normal tracking-[-0.32px] whitespace-nowrap text-primary transition-colors duration-200 ease-out hover:bg-primary hover:text-black">
                              +&nbsp;&nbsp;{tag}
                            </span>
                          </motion.span>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="w-full min-[1200px]:hidden" data-services-mobile-list>
          {services.map((service, index) => (
            <details
              className={`group relative ${
                index === 0 ? "" : "border-t border-white/20"
              }`}
              data-mobile-service-disclosure
              key={`${service.title}-mobile`}
              name="mobile-services"
              open={index === 0}
            >
              <summary
                aria-label={`${service.title} details`}
                className="flex w-full cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left text-white transition-[padding,color] duration-300 group-open:pb-0 group-open:text-primary select-none [&::-webkit-details-marker]:hidden"
              >
                <span className="min-w-0 font-display text-[40px] leading-[0.9] font-black tracking-[-0.5px] uppercase max-[359px]:text-[36px]">
                  {service.title}
                </span>
                <span
                  aria-hidden="true"
                  className="relative h-9 w-6 shrink-0 font-display text-[30px] leading-9 font-black text-white/70 transition-colors duration-300 group-open:text-primary"
                >
                  <span className="absolute inset-0 text-center transition-[opacity,transform] duration-300 group-open:scale-75 group-open:opacity-0">
                    +
                  </span>
                  <span className="absolute inset-0 scale-75 text-center opacity-0 transition-[opacity,transform] duration-300 group-open:scale-100 group-open:opacity-100">
                    −
                  </span>
                </span>
              </summary>

              <div className="px-5 pt-4 pb-5" data-mobile-service-panel>
                <p className="m-0 font-sans text-base leading-[1.5] font-normal tracking-[-0.32px] text-white/80">
                  {service.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {service.tags.map((tag) => (
                    <span
                      className="inline-flex items-center justify-center border border-primary px-2.5 py-1.5 font-sans text-base leading-[1.5] font-normal tracking-[-0.32px] text-primary"
                      key={`${service.title}-${tag}-mobile`}
                    >
                      +&nbsp;{tag}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
