"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionCrosshairs from "../ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

const stages = [
  {
    artifact: "Project blueprint",
    artifactNote: "Goals, audience, scope, success metrics, and technical boundaries.",
    description:
      "I start with the business goal, the people using the product, the current friction, and the technical limits. This gives design and development one clear direction.",
    image: "/images/work-northwind-finance.png",
    label: "Discover",
    number: "01",
    points: [
      "Define the business goal and the conversion or success metric.",
      "Review the current experience, user needs, and competitive landscape.",
      "Agree on scope, priorities, platform, and technical constraints.",
    ],
    title: "Understand what we need to build.",
  },
  {
    artifact: "UI design system",
    artifactNote: "Approved flows, responsive screens, components, and interaction behavior.",
    description:
      "I turn the direction into user flows, wireframes, polished interfaces, and reusable components for desktop and mobile. The important interactions are resolved before coding begins.",
    image: "/images/work-folio-dashboard.png",
    label: "Design",
    number: "02",
    points: [
      "Map the user flow and organise the product around clear decisions.",
      "Design responsive UI screens, states, and reusable components.",
      "Prototype and review the key experience before development.",
    ],
    title: "Design the product and interface.",
    titleLines: ["Design the product", "and interface."],
  },
  {
    artifact: "Working build",
    artifactNote: "Responsive code, reusable components, and functional interactions.",
    description:
      "I translate the approved design into a responsive website or product front end. The design system becomes reusable code, with real content, states, and interactions.",
    image: "/images/work-luminix-home.png",
    label: "Build",
    number: "03",
    points: [
      "Build responsive interfaces with HTML, CSS, React, or Next.js.",
      "Connect content, forms, data, and APIs where the product needs them.",
      "Preserve design fidelity, accessibility, and front-end performance.",
    ],
    title: "Turn the approved design into code.",
  },
  {
    artifact: "Live product",
    artifactNote: "A deployed experience with QA, analytics, and a clear iteration plan.",
    description:
      "I test the working build across devices, fix edge cases, deploy it, and use live feedback or conversion data to guide what should improve next.",
    image: "/images/work-traffic-management.png",
    label: "Launch",
    number: "04",
    points: [
      "QA the experience across screen sizes, browsers, and real content.",
      "Deploy the build with hosting, domain, analytics, and tracking in place.",
      "Monitor issues and improve conversion, usability, and performance.",
    ],
    title: "Test, deploy, and keep improving.",
  },
] as const;

const folderOffsets = [2, 27, 52, 75] as const;
const ease = [0.16, 1, 0.3, 1] as const;
const folderRowStep = 33;
const stageAutoAdvanceDelay = 2500;
const contentEnterDuration = 0.36;
const contentExitDuration = 0.28;
const tabTransitionDuration = 0.3;

function folderShape(offset: number) {
  return `polygon(0 15px, ${offset}% 15px, ${offset + 3}% 0, ${offset + 20}% 0, ${offset + 23}% 15px, 100% 15px, 100% 100%, 0 100%)`;
}

function supportsIntentionalHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function WorkProcessFolderRefinedSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const hoverTimerRef = useRef(0);
  const autoAdvanceTimerRef = useRef(0);
  const resetAutoAdvanceRef = useRef<() => void>(() => {});
  const tabsHoveredRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const selectStage = (index: number) => {
    window.clearTimeout(hoverTimerRef.current);
    activeIndexRef.current = index;
    setActiveIndex(index);
    resetAutoAdvanceRef.current();
  };

  useEffect(() => {
    const scheduleNextStage = () => {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = window.setTimeout(() => {
        if (!tabsHoveredRef.current || !supportsIntentionalHover()) {
          setActiveIndex((currentIndex) => {
            const nextIndex = (currentIndex + 1) % stages.length;
            activeIndexRef.current = nextIndex;
            return nextIndex;
          });
        }
        scheduleNextStage();
      }, stageAutoAdvanceDelay);
    };

    resetAutoAdvanceRef.current = scheduleNextStage;
    scheduleNextStage();

    return () => {
      window.clearTimeout(autoAdvanceTimerRef.current);
      resetAutoAdvanceRef.current = () => {};
    };
  }, []);

  const activeStage = stages[activeIndex];

  return (
    <section
      aria-labelledby="process-folder-refined-heading"
      className="relative z-6 w-full border-t border-white/12 bg-black text-white"
      id="process"
    >
      <style>{`
        @media (max-width: 639px) {
          @keyframes mobile-process-stage-cycle {
            0%, 24.99% { opacity: 1; }
            25%, 100% { opacity: 0; }
          }

          @keyframes mobile-process-tab-cycle {
            0%, 24.99% { opacity: 1; }
            25%, 100% { opacity: 0.35; }
          }

          @keyframes mobile-process-progress-cycle {
            0% { transform: scaleX(0); }
            24.99% { transform: scaleX(1); }
            25%, 100% { transform: scaleX(1); }
          }

          [data-mobile-process-stage],
          [data-mobile-process-output] {
            animation: mobile-process-stage-cycle 16s steps(1, end) infinite;
            animation-delay: var(--stage-delay);
            opacity: 0;
          }

          [data-mobile-process-tab] {
            animation: mobile-process-tab-cycle 16s steps(1, end) infinite;
            animation-delay: var(--stage-delay);
          }

          [data-mobile-process-progress] {
            animation: mobile-process-progress-cycle 16s linear infinite;
            animation-delay: var(--stage-delay);
          }

          [data-mobile-process]:active [data-mobile-process-stage],
          [data-mobile-process]:active [data-mobile-process-output],
          [data-mobile-process]:active [data-mobile-process-tab],
          [data-mobile-process]:active [data-mobile-process-progress],
          [data-mobile-process]:has([data-mobile-process-hint]:active) [data-mobile-process-stage],
          [data-mobile-process]:has([data-mobile-process-hint]:active) [data-mobile-process-output],
          [data-mobile-process]:has([data-mobile-process-hint]:active) [data-mobile-process-tab],
          [data-mobile-process]:has([data-mobile-process-hint]:active) [data-mobile-process-progress] {
            animation-play-state: paused;
          }

          [data-mobile-process-hint-paused] {
            display: none;
          }

          [data-mobile-process]:active [data-mobile-process-hint],
          [data-mobile-process]:has([data-mobile-process-hint]:active) [data-mobile-process-hint] {
            color: #ff1e00;
          }

          [data-mobile-process]:active [data-mobile-process-hint-default],
          [data-mobile-process]:has([data-mobile-process-hint]:active) [data-mobile-process-hint-default] {
            display: none;
          }

          [data-mobile-process]:active [data-mobile-process-hint-paused],
          [data-mobile-process]:has([data-mobile-process-hint]:active) [data-mobile-process-hint-paused] {
            display: inline;
          }

          [data-mobile-process]:has(input:checked) [data-mobile-process-stage],
          [data-mobile-process]:has(input:checked) [data-mobile-process-output],
          [data-mobile-process]:has(input:checked) [data-mobile-process-tab],
          [data-mobile-process]:has(input:checked) [data-mobile-process-progress] {
            animation: none;
          }

          [data-mobile-process]:has(input:checked) [data-mobile-process-stage],
          [data-mobile-process]:has(input:checked) [data-mobile-process-output] {
            opacity: 0;
          }

          [data-mobile-process]:has(input:checked) [data-mobile-process-tab] {
            color: rgba(255, 255, 255, 0.22);
          }

          ${stages
            .map(
              (_, index) => `
                #mobile-process-stage-${index}:checked ~ [data-mobile-process-tabs] label[for="mobile-process-stage-${index}"] {
                  color: #ff1e00;
                }

                #mobile-process-stage-${index}:checked ~ [data-mobile-process-narratives] [data-mobile-process-stage="${index}"],
                #mobile-process-stage-${index}:checked ~ [data-mobile-process-outputs] [data-mobile-process-output="${index}"] {
                  opacity: 1;
                  visibility: visible;
                }
              `,
            )
            .join("\n")}

          @media (prefers-reduced-motion: reduce) {
            [data-mobile-process-stage],
            [data-mobile-process-output],
            [data-mobile-process-tab],
            [data-mobile-process-progress] {
              animation-timing-function: steps(1, end);
              transition: none !important;
            }
          }
        }
      `}</style>

      <div
        className={`relative flex flex-col gap-14 border-x border-white/12 px-8 py-[120px] min-[641px]:max-[1024px]:gap-10 max-[1024px]:py-24 max-[640px]:gap-10 max-[640px]:px-5 max-[640px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />

        <header className="flex flex-col gap-8 uppercase max-[640px]:gap-5">
          <p className="m-0 font-overline text-base leading-none font-medium max-[640px]:text-sm">
            {"// How I work"}
          </p>
          <h2
            className="m-0 font-display text-[clamp(112px,8.35vw,160px)] leading-none font-black tracking-[-6px] whitespace-nowrap uppercase max-[1024px]:text-[clamp(76px,12vw,118px)] max-[640px]:text-[clamp(40px,13vw,56px)] max-[640px]:tracking-[-2.5px]"
            id="process-folder-refined-heading"
          >
            Work Process<span className="text-primary">.</span>
          </h2>
        </header>

        <div className="grid grid-cols-[0.96fr_1.04fr] items-center gap-16 max-[1200px]:gap-10 max-[1024px]:grid-cols-1 max-[640px]:hidden">
          <div className="relative min-h-[568px] min-w-0 min-[641px]:max-[1024px]:min-h-[460px] max-[640px]:min-h-[500px]">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                animate={{ opacity: 1 }}
                aria-live="polite"
                className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-start min-[641px]:max-[1024px]:top-0 min-[641px]:max-[1024px]:translate-y-0"
                exit={{
                  opacity: 0,
                  transition: {
                    duration: reduceMotion ? 0 : contentExitDuration,
                    ease: "easeInOut",
                  },
                }}
                initial={{ opacity: 0 }}
                key={activeStage.number}
                transition={{
                  duration: reduceMotion ? 0 : contentEnterDuration,
                  ease,
                }}
              >
                <div className="mb-7 inline-flex items-center gap-3 font-overline text-[11px] leading-none tracking-[0.16em] text-white/58 uppercase max-[640px]:mb-5">
                  <span className="h-2 w-2 bg-primary" />
                  <span>Current focus</span>
                  <span className="h-px w-8 bg-white/22" />
                  <span className="text-white/82">{activeStage.label}</span>
                </div>

                <h3
                  className={`m-0 text-balance font-display leading-[0.94] font-black uppercase ${
                    "titleLines" in activeStage
                      ? "max-w-none text-[60px] tracking-[-2.6px] max-[1200px]:text-[50px] max-[640px]:text-[38px] max-[640px]:tracking-[-1.8px]"
                      : "max-w-[14ch] text-[64px] tracking-[-2.8px] max-[1200px]:text-[54px] max-[640px]:max-w-[12ch] max-[640px]:text-[42px] max-[640px]:tracking-[-2px]"
                  }`}
                >
                  {"titleLines" in activeStage
                    ? activeStage.titleLines.map((line) => (
                        <span className="block whitespace-nowrap" key={line}>
                          {line}{" "}
                        </span>
                      ))
                    : activeStage.title}
                </h3>
                <p className="mt-7 mb-0 max-w-[50ch] font-sans text-lg leading-[1.58] tracking-[-0.2px] text-[#b3b3b3] max-[1200px]:text-base max-[640px]:mt-5 max-[640px]:text-sm">
                  {activeStage.description}
                </p>

                <ul className="mt-9 mb-0 flex w-full max-w-[540px] list-none flex-col gap-5 p-0 max-[1200px]:gap-4 max-[640px]:mt-7 max-[640px]:gap-3.5">
                  {activeStage.points.map((point) => (
                    <li
                      className="flex items-start gap-4 font-sans text-[15px] leading-[1.5] tracking-[-0.12px] text-white/88 max-[1200px]:text-sm"
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
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-[568px] min-w-0 [--folder-panel-height:421px] max-[1024px]:h-[568px] max-[640px]:h-[433px] max-[640px]:[--folder-panel-height:373px]">
            <div
              aria-label="Choose a refined work process stage"
              className="absolute inset-x-0 top-0 hidden h-[150px] min-[640px]:block"
              onPointerEnter={() => {
                if (!supportsIntentionalHover()) return;
                tabsHoveredRef.current = true;
                window.clearTimeout(autoAdvanceTimerRef.current);
              }}
              onPointerLeave={() => {
                if (!supportsIntentionalHover()) return;
                tabsHoveredRef.current = false;
                resetAutoAdvanceRef.current();
              }}
              role="tablist"
            >
              {stages.map((stage, index) => {
                const isActive = index === activeIndex;
                const offset = folderOffsets[index];
                const shape = folderShape(offset);

                return (
                  <button
                    aria-controls={`process-refined-panel-${index}`}
                    aria-selected={isActive}
                    className={`absolute left-0 h-12 w-full cursor-pointer bg-white/28 p-px text-left outline-none transition-colors duration-150 focus-visible:ring-1 focus-visible:ring-white ${
                      isActive
                        ? "text-white"
                        : "text-white/56 hover:text-white"
                    }`}
                    id={`process-refined-tab-${index}`}
                    key={stage.number}
                    onClick={() => selectStage(index)}
                    onFocus={() => selectStage(index)}
                    onPointerEnter={() => {
                      if (!supportsIntentionalHover()) return;
                      window.clearTimeout(hoverTimerRef.current);
                      hoverTimerRef.current = window.setTimeout(
                        () => selectStage(index),
                        140,
                      );
                    }}
                    onPointerLeave={() => {
                      if (!supportsIntentionalHover()) return;
                      window.clearTimeout(hoverTimerRef.current)
                    }}
                    role="tab"
                    style={{
                      clipPath: shape,
                      top: index * folderRowStep,
                      zIndex: 10 + index,
                    }}
                    type="button"
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={{
                        backgroundColor: isActive ? "#ff1e00" : "#000000",
                      }}
                      className="absolute inset-x-px top-px bottom-0"
                      style={{ clipPath: shape }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: tabTransitionDuration, ease: "easeOut" }
                      }
                    />
                    <span
                      className="absolute top-[1px] z-2 inline-flex items-center gap-2.5 font-overline text-[11px] leading-none tracking-[0.08em] uppercase"
                      style={{ left: `calc(${offset}% + 4%)` }}
                    >
                      <span>{stage.number}</span>
                      <span className="font-sans text-[12px] font-semibold tracking-[-0.1px] normal-case">
                        {stage.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="absolute inset-x-0 top-[147px] z-1 h-[var(--folder-panel-height)] bg-white/28 p-px [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_18px),calc(100%_-_18px)_100%,18px_100%,0_calc(100%_-_18px))]">
              <div
                aria-labelledby={`process-refined-tab-${activeIndex}`}
                className="relative h-full overflow-hidden bg-black [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_18px),calc(100%_-_18px)_100%,18px_100%,0_calc(100%_-_18px))]"
                id={`process-refined-panel-${activeIndex}`}
                role="tabpanel"
              >
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 origin-top bg-black"
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: reduceMotion ? 0 : contentExitDuration,
                        ease: "easeInOut",
                      },
                    }}
                    initial={{ opacity: 0 }}
                    key={activeStage.number}
                    transition={{
                      duration: reduceMotion ? 0 : contentEnterDuration,
                      ease,
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden bg-[#111]">
                      <motion.div
                        animate={{ scale: 1 }}
                        className="absolute inset-0"
                        initial={{ scale: reduceMotion ? 1 : 1.008 }}
                        transition={{ duration: reduceMotion ? 0 : 0.34, ease }}
                      >
                        <Image
                          alt=""
                          className="object-cover brightness-[0.84] contrast-110 saturate-[0.76]"
                          fill
                          sizes="(max-width: 639px) 350px, (max-width: 1023px) 760px, 690px"
                          src={activeStage.image}
                        />
                      </motion.div>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 [background:linear-gradient(to_top,#000_0%,rgba(0,0,0,0.86)_22%,rgba(0,0,0,0.58)_40%,rgba(0,0,0,0.14)_61%,transparent_78%)]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-primary/[0.045] mix-blend-soft-light"
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-2 flex items-end justify-between gap-8 px-7 pb-7 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-2.5 max-[640px]:px-5 max-[640px]:pb-5">
                      <div className="relative [text-shadow:0_3px_20px_rgba(0,0,0,0.95)]">
                        <p className="mb-3 font-overline text-[10px] tracking-[0.15em] text-primary uppercase">
                          Process output
                        </p>
                        <h4 className="m-0 max-w-[10ch] font-display text-[52px] leading-[0.86] font-black tracking-[-2.4px] uppercase max-[1200px]:text-[47px] max-[640px]:text-[38px] max-[640px]:tracking-[-1.8px]">
                          {activeStage.artifact}
                          <span className="text-primary">.</span>
                        </h4>
                      </div>
                      <p className="m-0 max-w-[26ch] text-right font-sans text-[15px] leading-[1.5] tracking-[-0.1px] text-white/88 [text-shadow:0_2px_15px_rgba(0,0,0,1)] max-[640px]:max-w-[31ch] max-[640px]:text-left max-[640px]:text-xs">
                        {activeStage.artifactNote}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div
          className="select-none [touch-action:pan-y] [-webkit-touch-callout:none] min-[640px]:hidden"
          data-mobile-process
        >
          {stages.map((stage, index) => (
            <input
              aria-label={`Show ${stage.label} stage`}
              className="sr-only"
              id={`mobile-process-stage-${index}`}
              key={`${stage.number}-mobile-input`}
              name="mobile-process-stage"
              suppressHydrationWarning
              type="radio"
            />
          ))}

          <div className="grid" data-mobile-process-narratives>
            {stages.map((stage, index) => (
              <article
                className="col-start-1 row-start-1 flex flex-col items-start self-start"
                data-mobile-process-stage={index}
                key={`${stage.number}-mobile-narrative`}
                style={{ animationDelay: `${index * 4}s` }}
              >
                <div className="mb-5 inline-flex items-center gap-3 font-overline text-[11px] leading-none tracking-[0.16em] text-white/58 uppercase max-[359px]:gap-2 max-[359px]:text-[9px] max-[359px]:tracking-[0.12em]">
                  <span className="h-2 w-2 shrink-0 bg-primary" />
                  <span className="whitespace-nowrap">Current focus</span>
                  <span className="h-px w-8 bg-white/22 max-[359px]:w-5" />
                  <span className="font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")} {stage.label}
                  </span>
                </div>

                <h3 className="m-0 w-full font-display text-[42px] leading-[0.94] font-black tracking-[-2px] uppercase min-[390px]:max-[640px]:min-h-[79px] min-[350px]:max-[389px]:min-h-[119px] max-[349px]:min-h-[99px] max-[359px]:text-[35px] max-[359px]:tracking-[-1.5px]">
                  {stage.title}
                </h3>
                <p className="mt-5 mb-0 font-sans text-sm leading-[1.58] tracking-[-0.2px] text-[#b3b3b3] min-[370px]:max-[640px]:min-h-[89px] max-[369px]:min-h-[111px]">
                  {stage.description}
                </p>

                <ul className="mt-7 mb-0 flex w-full list-none flex-col justify-between gap-0 p-0 min-[370px]:max-[640px]:min-h-[154px] min-[350px]:max-[369px]:min-h-[175px] min-[330px]:max-[349px]:min-h-[196px] max-[329px]:min-h-[217px]">
                  {stage.points.map((point) => (
                    <li
                      className="flex items-start gap-4 font-sans text-sm leading-[1.5] tracking-[-0.12px] text-white/88"
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
              </article>
            ))}
          </div>

          <button
            aria-label="Hold anywhere to pause automatic stage rotation"
            className="mt-[42px] flex w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-center font-overline text-[11px] leading-none tracking-[0.12em] text-white/48 uppercase transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary"
            data-mobile-process-hint
            type="button"
          >
            <span data-mobile-process-hint-default>
              Hold anywhere to pause
            </span>
            <span data-mobile-process-hint-paused>
              Paused — release to continue
            </span>
          </button>

          <div
            className="relative z-10 mt-[10px] flex h-[6px] items-start justify-center gap-1"
            data-mobile-process-tabs
          >
            {stages.map((stage, index) => (
              <label
                className="flex h-8 w-10 cursor-pointer items-start justify-center text-white/22"
                data-mobile-process-tab
                htmlFor={`mobile-process-stage-${index}`}
                key={`${stage.number}-mobile-label`}
                style={{ animationDelay: `${index * 4}s` }}
              >
                <span
                  aria-hidden="true"
                  className="h-[2px] w-9 origin-left bg-current transition-colors duration-200"
                  data-mobile-process-progress
                  style={{ animationDelay: `${index * 4}s` }}
                />
                <span className="sr-only">Show {stage.label} stage</span>
              </label>
            ))}
          </div>

          <div className="mt-1 grid" data-mobile-process-outputs>
            {stages.map((stage, index) => (
              <article
                className="relative col-start-1 row-start-1 h-[373px] overflow-hidden bg-black p-px [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_18px),calc(100%_-_18px)_100%,18px_100%,0_calc(100%_-_18px))] before:absolute before:inset-0 before:bg-white/28"
                data-mobile-process-output={index}
                key={`${stage.number}-mobile-output`}
                style={{ animationDelay: `${index * 4}s` }}
              >
                <div className="absolute inset-px overflow-hidden bg-[#111] [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_17px),calc(100%_-_17px)_100%,17px_100%,0_calc(100%_-_17px))]">
                  <Image
                    alt=""
                    className="object-cover brightness-[0.84] contrast-110 saturate-[0.76]"
                    fill
                    sizes="(max-width: 639px) calc(100vw - 80px)"
                    src={stage.image}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 [background:linear-gradient(to_top,#000_0%,rgba(0,0,0,0.86)_22%,rgba(0,0,0,0.58)_40%,rgba(0,0,0,0.14)_61%,transparent_78%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-primary/[0.045] mix-blend-soft-light"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 z-2 flex flex-col items-start gap-2.5 px-5 pb-5">
                  <div className="relative [text-shadow:0_3px_20px_rgba(0,0,0,0.95)]">
                    <p className="mb-3 font-overline text-[10px] tracking-[0.15em] text-primary uppercase">
                      Process output
                    </p>
                    <h4 className="m-0 max-w-[10ch] font-display text-[38px] leading-[0.86] font-black tracking-[-1.8px] uppercase">
                      {stage.artifact}
                      <span className="text-primary">.</span>
                    </h4>
                  </div>
                  <p className="m-0 max-w-[31ch] text-left font-sans text-xs leading-[1.5] tracking-[-0.1px] text-white/88 [text-shadow:0_2px_15px_rgba(0,0,0,1)]">
                    {stage.artifactNote}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
