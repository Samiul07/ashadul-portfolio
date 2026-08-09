// Archived unmounted alternative. Retained for design history only.
"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";
import SectionCrosshairs from "../ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[639px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

type ArtifactKind = "brief" | "decision" | "flow" | "measure" | "prototype" | "signal";

const steps = [
  {
    artifacts: [
      { kind: "brief" as const, label: "Project brief", note: "Goal, scope, constraints" },
      { kind: "signal" as const, label: "User signal", note: "Friction worth solving" },
      { kind: "measure" as const, label: "Success measure", note: "Proof of movement" },
    ],
    description:
      "Align the business goal, user friction, and success signal before choosing an output.",
    label: "Frame",
    number: "01",
    title: "Find the problem worth solving.",
  },
  {
    artifacts: [
      { kind: "flow" as const, label: "Core flow", note: "The shortest clear path" },
      { kind: "decision" as const, label: "Edge states", note: "What happens off-script" },
      { kind: "brief" as const, label: "Content map", note: "Right message, right moment" },
    ],
    description:
      "Turn rough ideas into flows, states, and content structure the whole team can inspect.",
    label: "Map",
    number: "02",
    title: "Make the product logic visible.",
  },
  {
    artifacts: [
      { kind: "prototype" as const, label: "Live prototype", note: "Behavior before polish" },
      { kind: "signal" as const, label: "Test note", note: "What users showed us" },
      { kind: "decision" as const, label: "Decision log", note: "Why this direction wins" },
    ],
    description:
      "Prototype the riskiest assumptions and use evidence to choose the direction that earns confidence.",
    label: "Prove",
    number: "03",
    title: "Test before polish hardens.",
  },
  {
    artifacts: [
      { kind: "measure" as const, label: "Responsive specs", note: "Rules across screens" },
      { kind: "flow" as const, label: "System rules", note: "Patterns that stay consistent" },
      { kind: "decision" as const, label: "QA pass", note: "Design intent preserved" },
    ],
    description:
      "Package the approved direction with responsive rules, implementation detail, and a reviewed build.",
    label: "Ship",
    number: "04",
    title: "Close every implementation gap.",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;
const tabClip =
  "polygon(0 16px,12px 16px,22px 0,calc(100% - 14px) 0,100% 16px,100% 100%,0 100%)";

function ArtifactGlyph({ kind }: { kind: ArtifactKind }) {
  if (kind === "signal") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 120 64">
        <path d="M4 34h16l8-20 14 38 13-31 12 20 10-13 10 6h19" stroke="currentColor" strokeLinecap="square" strokeWidth="3" />
      </svg>
    );
  }

  if (kind === "flow") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 120 64">
        <rect height="18" width="28" x="3" y="23" stroke="currentColor" strokeWidth="2.5" />
        <rect height="18" width="28" x="89" y="5" stroke="currentColor" strokeWidth="2.5" />
        <rect height="18" width="28" x="89" y="41" stroke="currentColor" strokeWidth="2.5" />
        <path d="M31 32h27m0 0c19 0 12-18 31-18M58 32c19 0 12 18 31 18" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    );
  }

  if (kind === "measure") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 120 64">
        <path d="M5 56V8m0 48h110" stroke="currentColor" strokeWidth="2.5" />
        <path d="m16 44 22-14 18 6 23-24 25 10" stroke="currentColor" strokeWidth="3" />
        <circle cx="79" cy="12" fill="currentColor" r="5" />
      </svg>
    );
  }

  if (kind === "prototype") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 120 64">
        <rect height="54" width="92" x="14" y="5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 17h92M25 29h39M25 39h58M25 49h46" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="21" cy="11" fill="currentColor" r="2" />
        <circle cx="28" cy="11" fill="currentColor" r="2" />
      </svg>
    );
  }

  if (kind === "decision") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 120 64">
        <path d="M8 16h62M8 32h48M8 48h70" stroke="currentColor" strokeWidth="3" />
        <path d="m87 36 9 9 18-26" stroke="currentColor" strokeLinecap="square" strokeWidth="4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 120 64">
      <path d="M7 8h106v48H7zM19 20h47M19 31h84M19 42h65" stroke="currentColor" strokeWidth="2.5" />
      <path d="M92 8v12h21" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export default function WorkProcessSection() {
  const dossierRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { damping: 28, mass: 0.8, stiffness: 130 });
  const smoothY = useSpring(pointerY, { damping: 28, mass: 0.8, stiffness: 130 });
  const rotateX = useTransform(smoothY, [-1, 1], [1.15, -1.15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-1.35, 1.35]);
  const translateX = useTransform(smoothX, [-1, 1], [-3, 3]);
  const translateY = useTransform(smoothY, [-1, 1], [-2, 2]);
  const activeStep = steps[activeIndex];

  const moveDossier = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !dossierRef.current) return;

    const bounds = dossierRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetDossier = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      aria-labelledby="process-heading"
      className="relative z-6 w-full border-t border-white/12 bg-black text-white"
      id="process"
    >
      <div
        className={`relative flex flex-col gap-14 border-x border-white/12 px-8 py-[120px] max-[1023px]:py-24 max-[639px]:gap-10 max-[639px]:px-5 max-[639px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />

        <header className="flex w-full flex-col gap-8 text-white uppercase">
          <p className="m-0 font-overline text-base leading-none font-medium max-[639px]:text-sm">
            {"// How I Work"}
          </p>
          <h2
            className="m-0 font-display text-[clamp(112px,8.35vw,160px)] leading-none font-black tracking-[-6px] whitespace-nowrap text-white uppercase max-[1023px]:text-[clamp(82px,14vw,132px)] max-[639px]:text-[clamp(48px,14vw,58px)] max-[639px]:tracking-[-3px]"
            id="process-heading"
          >
            Work Process<span className="text-primary">.</span>
          </h2>
        </header>

        <motion.div
          className="relative mx-auto h-[500px] w-full max-w-[1180px] max-[1023px]:h-[650px] max-[639px]:h-[670px]"
          initial={reduceMotion ? false : { opacity: 0, y: 44 }}
          onPointerLeave={resetDossier}
          onPointerMove={moveDossier}
          ref={dossierRef}
          style={
            reduceMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformPerspective: 1300,
                  x: translateX,
                  y: translateY,
                }
          }
          transition={{ duration: 0.8, ease }}
          viewport={{ amount: 0.18, once: true }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <div aria-hidden="true" className="absolute inset-x-10 top-[54px] h-[390px] border border-white/8 bg-black max-[1023px]:h-[540px] max-[639px]:inset-x-4 max-[639px]:h-[558px]" />
          <div aria-hidden="true" className="absolute inset-x-5 top-[66px] h-[390px] border border-white/12 bg-black max-[1023px]:h-[540px] max-[639px]:inset-x-2 max-[639px]:h-[558px]" />

          <div
            aria-label="Work process files"
            className="absolute inset-x-0 top-0 z-20 grid h-[72px] grid-cols-4 gap-1 px-5 max-[639px]:h-[64px] max-[639px]:gap-0.5 max-[639px]:px-2"
            role="tablist"
          >
            {steps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  animate={{
                    opacity: isActive ? 1 : 0.56,
                    y: isActive ? 0 : 12,
                  }}
                  aria-controls={`process-panel-${index}`}
                  aria-selected={isActive}
                  className={`relative isolate flex min-w-0 cursor-pointer items-center justify-between gap-2 overflow-hidden px-5 pt-2 text-left max-[639px]:justify-center max-[639px]:px-1 ${
                    isActive ? "text-black" : "text-white"
                  }`}
                  id={`process-tab-${index}`}
                  key={step.number}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onPointerEnter={() => setActiveIndex(index)}
                  role="tab"
                  style={{ clipPath: tabClip }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { damping: 28, mass: 0.9, stiffness: 190, type: "spring" }
                  }
                  type="button"
                >
                  <motion.span
                    animate={{ backgroundColor: isActive ? "#ff1e00" : "#151515" }}
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 border border-white/18"
                    transition={{ duration: reduceMotion ? 0 : 0.36, ease }}
                  />
                  <span className="font-display text-[34px] leading-none font-black tracking-[-1px] max-[639px]:text-[28px]">
                    {step.number}
                  </span>
                  <span className="font-overline text-xs tracking-[0.12em] uppercase max-[639px]:hidden">
                    {step.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="absolute inset-x-0 top-[70px] z-10 h-[390px] overflow-hidden border border-white/20 bg-[#050505] max-[1023px]:h-[540px] max-[639px]:top-[62px] max-[639px]:h-[558px]">
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-1 bg-primary" />
            <span aria-hidden="true" className="absolute top-8 right-8 font-overline text-[10px] tracking-[0.18em] text-white/30 uppercase max-[639px]:top-5 max-[639px]:right-5">
              File {activeStep.number} / 04
            </span>

            <AnimatePresence initial={false} mode="sync">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                aria-labelledby={`process-tab-${activeIndex}`}
                className="absolute inset-0 grid grid-cols-[0.94fr_1.06fr] gap-10 px-10 py-9 max-[1023px]:grid-cols-1 max-[1023px]:grid-rows-[auto_1fr] max-[1023px]:gap-5 max-[639px]:gap-3 max-[639px]:px-5 max-[639px]:pt-12 max-[639px]:pb-5"
                exit={{ opacity: 0, y: -16 }}
                id={`process-panel-${activeIndex}`}
                initial={{ opacity: 0, y: 22 }}
                key={activeStep.number}
                role="tabpanel"
                transition={{ duration: reduceMotion ? 0 : 0.52, ease }}
              >
                <div className="relative flex min-w-0 flex-col justify-between overflow-hidden border-t border-white/18 pt-5 max-[1023px]:min-h-[205px] max-[639px]:min-h-[228px] max-[639px]:pt-4">
                  <span aria-hidden="true" className="pointer-events-none absolute -right-2 -bottom-9 font-display text-[230px] leading-none font-black tracking-[-12px] text-white/[0.035] max-[639px]:text-[180px]">
                    {activeStep.number}
                  </span>

                  <div className="relative z-10 flex flex-col gap-3">
                    <span className="font-overline text-xs font-medium tracking-[0.14em] text-primary uppercase">
                      {activeStep.number} / {activeStep.label}
                    </span>
                    <h3 className="m-0 max-w-[13ch] font-display text-[64px] leading-[0.94] font-black tracking-[-3px] text-white uppercase max-[1199px]:text-[56px] max-[639px]:text-[40px] max-[639px]:tracking-[-1.5px]">
                      {activeStep.title}
                    </h3>
                  </div>

                  <p className="relative z-10 m-0 max-w-[46ch] font-sans text-base leading-[1.45] tracking-[-0.25px] text-white/66 max-[639px]:text-sm">
                    {activeStep.description}
                  </p>
                </div>

                <div className="relative flex min-w-0 flex-col justify-between border-t border-white/18 pt-5 max-[639px]:pt-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-overline text-xs tracking-[0.14em] text-white/48 uppercase">
                      Inside this file
                    </span>
                    <span className="font-overline text-[10px] tracking-[0.14em] text-primary uppercase max-[767px]:hidden">
                      Hover to inspect
                    </span>
                  </div>

                  <div className="flex h-[255px] items-end justify-center -space-x-8 overflow-visible pt-6 max-[1023px]:h-[245px] max-[639px]:h-[238px] max-[639px]:-space-x-4 max-[639px]:pt-4">
                    {activeStep.artifacts.map((artifact, index) => {
                      const rotations = [-6, 1.5, 6];
                      const isRed = index === 2;

                      return (
                        <motion.article
                          animate={{ opacity: 1, rotate: rotations[index], scale: 1, y: 0 }}
                          className={`relative flex h-[225px] w-[205px] shrink-0 flex-col justify-between border border-black/20 p-5 text-black shadow-[0_22px_44px_rgba(0,0,0,0.38)] max-[1199px]:w-[188px] max-[639px]:h-[205px] max-[639px]:w-[112px] max-[639px]:p-3 ${
                            isRed ? "bg-primary" : index === 1 ? "bg-[#d8d8d2]" : "bg-[#f2f1e9]"
                          }`}
                          initial={{ opacity: 0, rotate: rotations[index] * 1.8, scale: 0.94, y: 36 }}
                          key={`${activeStep.number}-${artifact.label}`}
                          style={{ zIndex: index + 1 }}
                          transition={{ delay: reduceMotion ? 0 : 0.1 + index * 0.07, duration: reduceMotion ? 0 : 0.62, ease }}
                          whileHover={
                            reduceMotion
                              ? undefined
                              : { rotate: 0, scale: 1.035, y: -20, zIndex: 10 }
                          }
                        >
                          <div className="flex items-center justify-between gap-3 border-b border-black/25 pb-2 font-overline text-[10px] tracking-[0.1em] uppercase">
                            <span>Artifact 0{index + 1}</span>
                            <span>{activeStep.number}</span>
                          </div>
                          <div className="h-16 w-full max-[639px]:h-12">
                            <ArtifactGlyph kind={artifact.kind} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <h4 className="m-0 font-sans text-xl leading-none font-semibold tracking-[-0.5px] max-[639px]:text-base">
                              {artifact.label}
                            </h4>
                            <p className="m-0 font-sans text-xs leading-[1.3] text-black/62 max-[639px]:text-[10px]">
                              {artifact.note}
                            </p>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
