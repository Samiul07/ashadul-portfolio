// Archived unmounted alternative. Retained for design history only.
"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionCrosshairs from "../ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[639px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

const stages = [
  {
    artifact: "Product brief",
    artifactNote: "Users, goals, constraints, and the decision the team must make.",
    description:
      "I turn a request into a product decision: who it serves, what is failing today, and what success must change.",
    image: "/images/work-northwind-finance.png",
    label: "Frame",
    number: "01",
    outcome: "A shared problem definition the whole team can challenge.",
    points: [
      "Align the user need with the business outcome.",
      "Set the constraints, risks, and measurable success signal.",
      "Write a brief that makes the next decision obvious.",
    ],
    title: "Define what is worth solving.",
  },
  {
    artifact: "Journey map",
    artifactNote: "The critical path, product states, decisions, and edge cases.",
    description:
      "I model how the product should behave before visual detail: the critical journey, the system states, and the decisions inside it.",
    image: "/images/work-folio-dashboard.png",
    label: "Map",
    number: "02",
    outcome: "An end-to-end flow product and engineering can inspect together.",
    points: [
      "Trace the shortest path from intent to outcome.",
      "Make states, dependencies, and edge cases explicit.",
      "Sequence the smallest coherent release.",
    ],
    title: "Design the path before the screens.",
  },
  {
    artifact: "Validated prototype",
    artifactNote: "Real behavior, observed friction, and evidence for the direction.",
    description:
      "I prototype the moment carrying the most uncertainty, then test behavior before the team invests in visual polish or production.",
    image: "/images/work-luminix-home.png",
    label: "Prove",
    number: "03",
    outcome: "A direction supported by evidence instead of internal preference.",
    points: [
      "Prototype the assumption most likely to fail.",
      "Observe what people do, not only what they say.",
      "Revise the flow before expensive details harden.",
    ],
    title: "Test the riskiest assumption.",
  },
  {
    artifact: "Build specification",
    artifactNote: "Responsive rules, interaction states, implementation detail, and QA.",
    description:
      "I stay with the work through implementation, translating the approved direction into clear rules and checking the product in motion.",
    image: "/images/work-traffic-management.png",
    label: "Ship",
    number: "04",
    outcome: "A working product that preserves the intent of the design.",
    points: [
      "Specify responsive behavior and interaction states.",
      "Resolve implementation tradeoffs with engineering.",
      "QA the working product, not a static screenshot.",
    ],
    title: "Protect the idea through production.",
  },
] as const;

const folderOffsets = [2, 27, 52, 75] as const;
const ease = [0.22, 1, 0.36, 1] as const;
const folderRowStep = 33;
const wheelStageThreshold = 280;
const finalStageHold = 950;

function folderShape(offset: number) {
  return `polygon(0 15px, ${offset}% 15px, ${offset + 3}% 0, ${offset + 20}% 0, ${offset + 23}% 15px, 100% 15px, 100% 100%, 0 100%)`;
}

type PortfolioWindow = Window & {
  __portfolioLenis?: {
    scrollTo: (
      target: number,
      options: { force: boolean; immediate: boolean },
    ) => void;
    start: () => void;
    stop: () => void;
  };
};

export default function WorkProcessFolderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const wheelDirectionRef = useRef(0);
  const finalHoldUntilRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const selectStage = (index: number) => {
    activeIndexRef.current = index;
    wheelAccumulatorRef.current = 0;
    finalHoldUntilRef.current = 0;
    setActiveIndex(index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;

    const portfolioWindow = window as PortfolioWindow;
    let isLocked = false;

    const unlock = () => {
      if (!isLocked) return;
      isLocked = false;
      wheelAccumulatorRef.current = 0;
      wheelDirectionRef.current = 0;
      finalHoldUntilRef.current = 0;
      portfolioWindow.__portfolioLenis?.start();
    };

    const lock = () => {
      const bounds = section.getBoundingClientRect();
      const centeredScroll =
        window.scrollY +
        bounds.top +
        bounds.height / 2 -
        window.innerHeight / 2;

      portfolioWindow.__portfolioLenis?.scrollTo(
        Math.max(0, centeredScroll),
        {
        force: true,
        immediate: true,
        },
      );
      portfolioWindow.__portfolioLenis?.stop();
      isLocked = true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024 || Math.abs(event.deltaY) < 2) {
        unlock();
        return;
      }

      const direction = Math.sign(event.deltaY);
      const currentIndex = activeIndexRef.current;
      const canMove =
        (direction > 0 && currentIndex < stages.length - 1) ||
        (direction < 0 && currentIndex > 0);
      const isHoldingFinalStage =
        direction > 0 &&
        currentIndex === stages.length - 1 &&
        Date.now() < finalHoldUntilRef.current;

      if (!isLocked) {
        const bounds = section.getBoundingClientRect();
        const sectionCenter = bounds.top + bounds.height / 2;
        const centerDistance = Math.abs(
          sectionCenter - window.innerHeight / 2,
        );
        const captureRange = Math.min(150, window.innerHeight * 0.18);
        const isAtCapturePoint = centerDistance <= captureRange;

        if (!isAtCapturePoint || !canMove) return;
        lock();
      }

      if (isHoldingFinalStage) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (!canMove) {
        unlock();
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (wheelDirectionRef.current !== direction) {
        wheelDirectionRef.current = direction;
        wheelAccumulatorRef.current = 0;
      }

      wheelAccumulatorRef.current += Math.abs(event.deltaY);
      if (wheelAccumulatorRef.current < wheelStageThreshold) return;

      const nextIndex = Math.max(
        0,
        Math.min(stages.length - 1, currentIndex + direction),
      );
      activeIndexRef.current = nextIndex;
      wheelAccumulatorRef.current = 0;
      finalHoldUntilRef.current =
        nextIndex === stages.length - 1
          ? Date.now() + finalStageHold
          : 0;
      setActiveIndex(nextIndex);
    };

    const handleScroll = () => {
      if (!isLocked) return;
      const bounds = section.getBoundingClientRect();
      const sectionCenter = bounds.top + bounds.height / 2;
      if (Math.abs(sectionCenter - window.innerHeight / 2) > 12) unlock();
    };

    window.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: false,
    });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      unlock();
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reduceMotion]);

  const activeStage = stages[activeIndex];

  return (
    <section
      aria-labelledby="process-folder-heading"
      className="relative z-6 w-full border-t border-white/12 bg-black text-white"
      ref={sectionRef}
    >
      <div
        className={`relative flex flex-col gap-14 border-x border-white/12 px-8 py-[120px] max-[1023px]:py-24 max-[639px]:gap-10 max-[639px]:px-5 max-[639px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />

        <header className="flex flex-col gap-8 uppercase max-[639px]:gap-5">
          <p className="m-0 font-overline text-base leading-none font-medium max-[639px]:text-sm">
            {"// How I work"}
          </p>
          <h2
            className="m-0 font-display text-[clamp(112px,8.35vw,160px)] leading-none font-black tracking-[-6px] whitespace-nowrap uppercase max-[1023px]:text-[clamp(76px,12vw,118px)] max-[639px]:text-[clamp(48px,13vw,56px)] max-[639px]:tracking-[-2.5px]"
            id="process-folder-heading"
          >
            Work Process<span className="text-primary">.</span>
          </h2>
        </header>

        <div className="grid grid-cols-[0.96fr_1.04fr] items-center gap-16 max-[1199px]:gap-10 max-[1023px]:grid-cols-1 max-[639px]:gap-8">
          <div className="relative min-h-[568px] min-w-0 max-[1023px]:min-h-[540px] max-[639px]:min-h-[532px]">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-start"
                exit={{ opacity: 0, y: -14 }}
                initial={{ opacity: 0, y: 18 }}
                key={activeStage.number}
                transition={{ duration: reduceMotion ? 0 : 0.44, ease }}
              >
                <div className="mb-8 flex items-end gap-4 max-[639px]:mb-5">
                  <span className="font-display text-[72px] leading-[0.78] font-black tracking-[-3px] text-primary max-[1199px]:text-[64px] max-[639px]:text-[56px]">
                    {activeStage.number}
                  </span>
                  <span className="font-overline text-xs leading-none tracking-[0.18em] text-white/58 uppercase">
                    {activeStage.label}
                  </span>
                </div>

                <h3 className="m-0 max-w-[14ch] text-balance font-display text-[62px] leading-[0.94] font-black tracking-[-2.7px] uppercase max-[1199px]:text-[52px] max-[639px]:max-w-[12ch] max-[639px]:text-[42px] max-[639px]:tracking-[-2px]">
                  {activeStage.title}
                </h3>
                <p className="mt-7 mb-0 max-w-[50ch] font-sans text-lg leading-[1.56] tracking-[-0.28px] text-white/68 max-[1199px]:text-base max-[639px]:mt-5 max-[639px]:text-sm">
                  {activeStage.description}
                </p>

                <ul className="mt-9 mb-0 flex w-full max-w-[540px] list-none flex-col gap-5 p-0 max-[1199px]:gap-4 max-[639px]:mt-7 max-[639px]:gap-3.5">
                  {activeStage.points.map((point) => (
                    <li
                      className="flex items-start gap-4 font-sans text-[15px] leading-[1.5] tracking-[-0.18px] text-white/84 max-[1199px]:text-sm"
                      key={point}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[10px] h-[2px] w-7 shrink-0 bg-primary"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-9 mb-0 max-w-[52ch] font-overline text-[11px] leading-[1.5] tracking-[0.14em] text-white/48 uppercase max-[639px]:mt-7 max-[639px]:text-[10px]">
                  Deliverable / {activeStage.outcome}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-[568px] min-w-0 [--folder-panel-height:421px] max-[1023px]:h-[568px] max-[639px]:h-[520px] max-[639px]:[--folder-panel-height:373px]">
            <div
              aria-label="Choose a work process stage"
              className="absolute inset-x-0 top-0 h-[150px]"
              role="tablist"
            >
              {stages.map((stage, index) => {
                const isActive = index === activeIndex;
                const offset = folderOffsets[index];
                const shape = folderShape(offset);

                return (
                  <button
                    aria-controls={`process-folder-panel-${index}`}
                    aria-selected={isActive}
                    className={`absolute left-0 h-12 w-full cursor-pointer p-px text-left outline-none transition-[background-color,color,filter,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 focus-visible:ring-1 focus-visible:ring-white ${
                      isActive
                        ? "bg-primary text-white brightness-100"
                        : "bg-white/28 text-white/54 brightness-75 hover:-translate-y-0.5 hover:brightness-100 hover:text-white"
                    }`}
                    id={`process-folder-tab-${index}`}
                    key={stage.number}
                    onClick={() => selectStage(index)}
                    onFocus={() => selectStage(index)}
                    onPointerEnter={() => selectStage(index)}
                    role="tab"
                    style={{
                      clipPath: shape,
                      top: index * folderRowStep,
                      zIndex: 10 + index,
                    }}
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-px top-px bottom-0 ${isActive ? "bg-primary" : "bg-black"}`}
                      style={{ clipPath: shape }}
                    />
                    <span
                      className="absolute top-[1px] z-2 inline-flex items-center gap-2.5 font-overline text-[11px] leading-none tracking-[0.08em] uppercase"
                      style={{ left: `calc(${offset}% + 4%)` }}
                    >
                      <span className="text-current">
                        {stage.number}
                      </span>
                      <span className="font-sans text-[12px] font-semibold tracking-[-0.1px] normal-case">
                        {stage.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="absolute inset-x-0 top-[147px] z-1 h-[var(--folder-panel-height)] bg-white/24 p-px [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_18px),calc(100%_-_18px)_100%,18px_100%,0_calc(100%_-_18px))]"
            >
              <div
                aria-labelledby={`process-folder-tab-${activeIndex}`}
                className="relative h-full overflow-hidden bg-black [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_18px),calc(100%_-_18px)_100%,18px_100%,0_calc(100%_-_18px))]"
                id={`process-folder-panel-${activeIndex}`}
                role="tabpanel"
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    animate={{ filter: "brightness(1)", opacity: 1, scale: 1 }}
                    className="absolute inset-0 origin-top bg-black"
                    exit={{ filter: "brightness(0.82)", opacity: 0, scale: 1.015 }}
                    initial={{ filter: "brightness(0.72)", opacity: 0, scale: 0.965 }}
                    key={activeStage.number}
                    transition={{ duration: reduceMotion ? 0 : 0.48, ease }}
                  >
                    <div className="group absolute inset-0 overflow-hidden bg-[#111]">
                      <motion.div
                        animate={{ scale: 1 }}
                        className="absolute inset-0"
                        initial={{ scale: reduceMotion ? 1 : 1.035 }}
                        transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
                      >
                        <Image
                          alt=""
                          className="object-cover grayscale brightness-[0.72] contrast-125"
                          fill
                          sizes="(max-width: 639px) 350px, (max-width: 1023px) 760px, 690px"
                          src={activeStage.image}
                        />
                      </motion.div>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 [background:linear-gradient(to_top,#000_0%,rgba(0,0,0,0.74)_38%,rgba(0,0,0,0.08)_100%)]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-primary/10 mix-blend-screen"
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-2 flex items-end justify-between gap-8 px-7 pb-7 max-[639px]:flex-col max-[639px]:items-start max-[639px]:gap-2.5 max-[639px]:px-5 max-[639px]:pb-5">
                      <div>
                        <p className="mb-3 font-overline text-[10px] tracking-[0.15em] text-primary uppercase">
                          Process output
                        </p>
                        <h4 className="m-0 max-w-[10ch] font-display text-[54px] leading-[0.86] font-black tracking-[-2.5px] uppercase max-[1199px]:text-[48px] max-[639px]:text-[38px] max-[639px]:tracking-[-1.8px]">
                          {activeStage.artifact}<span className="text-primary">.</span>
                        </h4>
                      </div>
                      <p className="m-0 max-w-[26ch] text-right font-sans text-[15px] leading-[1.5] tracking-[-0.15px] text-white/68 max-[639px]:max-w-[31ch] max-[639px]:text-left max-[639px]:text-xs">
                        {activeStage.artifactNote}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
