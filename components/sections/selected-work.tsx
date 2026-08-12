"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)] max-[359px]:w-[calc(100%_-_24px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const buttonShape =
  "[clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]";
const buttonBase =
  `relative isolate inline-flex h-[52px] items-center justify-center gap-2 overflow-hidden rounded-[2px] px-6 py-3 font-sans text-base leading-[22px] font-normal tracking-[-0.32px] whitespace-nowrap no-underline transition-colors duration-200 ${buttonShape}`;
const projectCardHeight = 470;
const projectCardGap = 48;
const projectStackGap = 98;
const projectsCount = 4;
const projectStackTravel =
  (projectsCount - 1) *
  (projectCardHeight + projectCardGap - projectStackGap);

type ProjectMeta = {
  label: string;
  value: string;
  valueClassName?: string;
};

type Project = {
  description: string;
  desktopImage: string;
  desktopImageHeight: number;
  desktopImageWidth: number;
  imageClassName: string;
  index: string;
  meta: ProjectMeta[];
  mobileImage: string;
  title: string;
};

const projects: Project[] = [
  {
    description:
      "A comprehensive UX overhaul of an enterprise localization platform, streamlining the translation pipeline to improve client onboarding and task completion rates.",
    desktopImage: "/images/day-translations.png",
    desktopImageHeight: 649,
    desktopImageWidth: 1024,
    imageClassName: "absolute inset-0 h-full w-full max-w-none",
    index: "01",
    meta: [
      { label: "Industry", value: "B2B SaaS" },
      { label: "Role", value: "UX/UI Designer" },
      { label: "Focus", value: "2023" },
      { label: "Deliverable", value: "Web & Design System" },
    ],
    mobileImage: "/images/day-translations.png",
    title: "Day Translations — Linguist SaaS",
  },
  {
    description:
      "An end-to-end healthcare platform connecting patients' wearable fitness data with a diagnostic web dashboard, enabling doctors to monitor remote health metrics.",
    desktopImage: "/images/metabolix.png",
    desktopImageHeight: 649,
    desktopImageWidth: 1024,
    imageClassName: "absolute inset-0 h-full w-full max-w-none",
    index: "02",
    meta: [
      { label: "Industry", value: "HealthTech" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Focus", value: "2025" },
      { label: "Deliverable", value: "Web & Mobile App" },
    ],
    mobileImage: "/images/metabolix.png",
    title: "Metabolix — Telehealth Ecosystem",
  },
  {
    description:
      "An AI-powered journaling application designed for the global market, utilizing calming interfaces and habit-loop mechanics to support daily mental well-being.",
    desktopImage: "/images/betr.png",
    desktopImageHeight: 649,
    desktopImageWidth: 1024,
    imageClassName: "absolute inset-0 h-full w-full max-w-none",
    index: "03",
    meta: [
      { label: "Industry", value: "Wellness" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Focus", value: "2026" },
      { label: "Deliverable", value: "Mobile App" },
    ],
    mobileImage: "/images/betr.png",
    title: "Betr — AI Wellness Journal App",
  },
  {
    description:
      "A consumer-facing solar energy marketplace. Designed a high-converting e-commerce interface that simplifies the purchasing process for sustainable home power solutions.",
    desktopImage: "/images/solence.png",
    desktopImageHeight: 649,
    desktopImageWidth: 1024,
    imageClassName: "absolute inset-0 h-full w-full max-w-none",
    index: "04",
    meta: [
      { label: "Industry", value: "CleanTech" },
      { label: "Role", value: "UX/UI Engineer" },
      { label: "Focus", value: "2026" },
      { label: "Deliverable", value: "Web Platform" },
    ],
    mobileImage: "/images/solence.png",
    title: "Solence — Solar E-commerce",
  },
];

function CrossMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-[25px] w-[25px] ${className}`}
    >
      <span className="absolute top-3 left-0 h-px w-6 bg-white" />
      <span className="absolute top-0 left-3 h-[25px] w-px bg-white" />
    </span>
  );
}

function ProjectCard({
  className = "",
  project,
}: {
  className?: string;
  project: Project;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <article
      className={`flex h-[470px] w-[calc(100%+2px)] items-center gap-8 overflow-hidden bg-black p-2 ring-1 ring-white/20 ring-inset max-[1200px]:h-auto max-[1200px]:flex-col max-[1200px]:items-stretch max-[1200px]:gap-6 min-[768px]:max-[1200px]:gap-0 max-[640px]:w-full max-[640px]:gap-0 max-[640px]:border-y max-[640px]:border-white/20 max-[640px]:p-0 max-[640px]:ring-0 ${className}`}
    >
      <div
        className="relative h-full w-[716px] shrink-0 overflow-hidden bg-black max-[1200px]:h-auto max-[1200px]:w-full max-[1200px]:aspect-[716/454] max-[640px]:aspect-[16/10]"
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          initial={false}
          transition={{
            type: "spring",
            bounce: 0.2,
            delay: 0,
            duration: 0.4,
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.2 }}
        >
          <picture className="min-[768px]:max-[1200px]:hidden">
            <source media="(max-width: 639px)" srcSet={project.mobileImage} />
            <Image
              alt=""
              className={`${project.imageClassName} object-fill max-[640px]:inset-0 max-[640px]:h-full max-[640px]:w-full max-[640px]:object-cover`}
              height={project.desktopImageHeight}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 716px"
              src={project.desktopImage}
              width={project.desktopImageWidth}
              quality={100}
              unoptimized={true}
            />
          </picture>
          <Image
            alt=""
            className="hidden object-cover min-[768px]:max-[1200px]:block"
            fill
            loading={project.index === "01" ? "eager" : "lazy"}
            sizes="(min-width: 768px) and (max-width: 1199px) 50vw, 350px"
            src={project.desktopImage}
            quality={100}
            unoptimized={true}
          />
        </motion.div>

      </div>

      <div className="flex min-w-0 flex-1 self-stretch">
        <div className="flex h-full min-w-0 flex-1 flex-col items-start justify-between py-8 pr-8 max-[1200px]:gap-10 max-[1200px]:p-0 min-[768px]:max-[1200px]:gap-8 min-[768px]:max-[1200px]:p-6 max-[640px]:gap-5 max-[640px]:px-5 max-[640px]:pt-7 max-[640px]:pb-5">
          <div className="flex w-full items-start gap-12 max-[640px]:gap-0">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[18px] max-[640px]:gap-3.5">
              <h3 className="m-0 w-full font-sans text-[28px] leading-[1.2] font-semibold tracking-[-0.5px] text-white min-[768px]:max-[1200px]:text-[24px] max-[640px]:text-[26px] max-[640px]:leading-[1.16]">
                {project.title}
              </h3>
              <p className="m-0 w-full font-sans text-base leading-normal font-normal tracking-[-0.32px] text-white/60 max-[640px]:line-clamp-4">
                {project.description}
              </p>
            </div>
            <span className="shrink-0 font-display text-4xl leading-[0.95] font-medium tracking-[-0.5px] whitespace-nowrap text-primary max-[1200px]:hidden">
              {project.index}
            </span>
          </div>

          <div className="flex w-full flex-col items-start gap-12 max-[640px]:gap-6">
            <div className="flex w-full items-center justify-between gap-5 font-sans text-[15px] leading-[1.4] tracking-[-0.5px] min-[640px]:max-[1200px]:grid min-[640px]:max-[1200px]:grid-cols-2 min-[640px]:max-[1200px]:items-start min-[640px]:max-[1200px]:gap-x-6 min-[640px]:max-[1200px]:gap-y-6 min-[640px]:max-[1200px]:border-t min-[640px]:max-[1200px]:border-white/12 min-[640px]:max-[1200px]:pt-6 max-[640px]:grid max-[640px]:grid-cols-2 max-[640px]:items-start max-[640px]:gap-x-6 max-[640px]:gap-y-6">
              {project.meta.map((item) => (
                <div
                  className="flex min-w-0 shrink-0 flex-col items-start gap-2 min-[640px]:max-[1200px]:shrink max-[640px]:shrink"
                  key={item.label}
                >
                  <span className="font-normal whitespace-nowrap text-white/60">
                    {item.label}
                  </span>
                  <span
                    className={`font-semibold text-white ${
                      item.valueClassName ?? "whitespace-nowrap"
                    } min-[640px]:max-[1200px]:break-words min-[640px]:max-[1200px]:whitespace-normal max-[479px]:whitespace-normal`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <Link
              className={`group/work-action ${buttonBase} w-[184px] border-0 bg-white text-black hover:bg-primary hover:text-white min-[768px]:max-[1200px]:w-full max-[479px]:w-full`}
              href="/portfolio"
            >
              Explore Project
              <span className="inline-flex h-[22px] w-[22px] items-center justify-center">
                <Image
                  alt=""
                  className="transition-[filter] duration-200 group-hover/work-action:invert"
                  height={22}
                  src="/images/icon-arrow-up-right-work.svg"
                  width={22}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function StaticSelectedWorkContent() {
  return (
    <div
      className={`relative z-3 flex h-auto flex-col items-start border-x border-white/12 px-8 py-[120px] max-[1200px]:py-[clamp(72px,8vw,96px)] max-[640px]:px-5 max-[640px]:py-14 max-[359px]:px-3 ${frameWidth} ${frameMargin}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-white/12"
      />
      <CrossMark className="absolute top-0 left-0 z-20 -translate-x-1/2 -translate-y-1/2" />
      <CrossMark className="absolute top-0 right-0 z-20 translate-x-1/2 -translate-y-1/2" />
      <p className="m-0 w-[448px] font-overline text-base leading-none font-medium text-white uppercase max-[640px]:w-full max-[640px]:text-sm">
        {"// Selected Product Work"}
      </p>

      <div className="mt-8 flex w-full flex-col items-start gap-14 max-[640px]:gap-10">
        <h2 className="m-0 w-full font-display text-[160px] leading-none font-black tracking-[-8px] text-white uppercase max-[1200px]:text-[clamp(82px,12vw,132px)] max-[1200px]:tracking-[-0.05em] max-[640px]:text-[clamp(58px,19vw,88px)] max-[640px]:tracking-[-4px]">
          Selected Work<span className="text-primary">.</span>
        </h2>

        <div className="flex w-full flex-col items-start gap-12 min-[768px]:max-[1200px]:grid min-[768px]:max-[1200px]:grid-cols-2 min-[768px]:max-[1200px]:items-stretch min-[768px]:max-[1200px]:gap-6 max-[640px]:-mx-5 max-[640px]:w-[calc(100%_+_40px)] max-[359px]:!-mx-3 max-[359px]:!w-[calc(100%_+_24px)]">
          {projects.map((project) => (
            <ProjectCard key={project.index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StackedProjectCard({
  index,
  scrollY,
  project,
}: {
  index: number;
  scrollY: MotionValue<number>;
  project: Project;
}) {
  const parkedY = index * (projectCardHeight + projectCardGap);
  const stackedY = index * projectStackGap;
  const y = useTransform(scrollY, (val) => {
    return Math.max(parkedY, stackedY + val);
  });

  return (
    <motion.div
      className="absolute inset-x-0 top-0 will-change-transform"
      style={{ y, zIndex: index + 1 }}
    >
      <ProjectCard project={project} />
    </motion.div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start -82px", "end end"],
  });

  const scrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, projectStackTravel],
  );
  const containerY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -projectStackTravel],
  );

  if (reduceMotion) {
    return (
      <section
        id="work"
        aria-label="Selected Work"
        className="relative z-[120] h-auto w-full overflow-visible bg-transparent text-white"
      >
        <StaticSelectedWorkContent />
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Selected Work"
      className="relative z-[120] h-auto w-full overflow-visible bg-transparent text-white min-[1200px]:h-[calc(230vh-88px)]"
    >
      <div className="min-[1200px]:hidden">
        <StaticSelectedWorkContent />
      </div>

      <div className="sticky top-[-82px] hidden h-[calc(100vh+82px)] w-full overflow-hidden min-[1200px]:block">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-white/12"
        />

        <div
          className={`relative h-full overflow-hidden border-x border-white/12 px-8 pt-[120px] ${frameWidth} ${frameMargin}`}
        >
          <CrossMark className="absolute top-0 left-0 z-20 -translate-x-1/2 -translate-y-1/2" />
          <CrossMark className="absolute top-0 right-0 z-20 translate-x-1/2 -translate-y-1/2" />

          <div>
            <p className="m-0 w-[448px] font-overline text-base leading-none font-medium text-white uppercase">
              {"// Selected Product Work"}
            </p>
            <h2 className="mt-8 mb-0 w-full font-display text-[160px] leading-none font-black tracking-[-8px] text-white uppercase max-[1279px]:text-[132px]">
              Selected Work<span className="text-primary">.</span>
            </h2>
          </div>
          <motion.div
            className="relative mt-14 h-[calc(100vh-470px)] w-full overflow-visible"
            style={{ y: containerY }}
          >
            {projects.map((project, index) => (
              <StackedProjectCard
                index={index}
                key={project.index}
                scrollY={scrollY}
                project={project}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
