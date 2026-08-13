"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import SectionCrosshairs from "@/components/ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const sidebarClip =
  "[clip-path:polygon(0_0,calc(100%_-_14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%_-_14px))]";

type CategoryId = string;

export type PortfolioProject = {
  categories: CategoryId[];
  figmaUrl?: string | null;
  image: string;
  imageClassName?: string;
  slug?: string;
  title: string;
  type: string;
};

type Project = PortfolioProject;

/** Count how many projects belong to a given category */
function countForCategory(
  projectList: Project[],
  categoryId: CategoryId,
): number {
  if (categoryId === "all") return projectList.length;
  return projectList.filter((p) => p.categories.includes(categoryId)).length;
}

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isExternal = Boolean(project.figmaUrl);

  return (
    <a
      className="group flex min-w-0 flex-col border border-white/18 bg-transparent p-2 text-white no-underline outline-none transition-transform duration-300 active:scale-[0.98] focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white max-[640px]:border-white/14 max-[640px]:p-0"
      href={project.figmaUrl || "#contact"}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {/* Image Thumbnail with Hover Button Overlay — locked 4/3 aspect ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        <Image
          alt={project.title}
          className={`will-change-transform blur-0 group-hover:scale-105 group-hover:brightness-[0.45] group-hover:saturate-[0.72] group-hover:blur-[3px] group-focus-visible:scale-105 group-focus-visible:brightness-[0.45] group-focus-visible:saturate-[0.72] group-focus-visible:blur-[3px] motion-reduce:transition-none ${
            project.imageClassName ?? "object-cover"
          }`}
          style={{
            transition: "transform 1.0s cubic-bezier(0.16, 1, 0.3, 1), filter 1.0s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          fill
          loading="lazy"
          sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 45vw, 640px"
          src={project.image}
        />

        {/* A single typographic action keeps the artwork and hierarchy uncluttered. */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          style={{
            transition: "opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.55)_100%)]"
          />

          <span className="relative flex items-start gap-3">
            <span className="relative pb-4 font-display text-[clamp(72px,7vw,98px)] leading-[0.78] font-black tracking-[-0.045em] text-white uppercase">
              View
            </span>
            <span
              className="mt-[-2px] inline-flex h-10 w-10 items-center justify-center text-primary group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transition-none"
              style={{
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <ArrowUpRight className="h-10 w-10" />
            </span>
          </span>
        </div>
      </div>

      {/* Title & Type — multi-line title allowed, full white visibility */}
      <div className="flex min-w-0 flex-col gap-2.5 px-1 pt-4 pb-2 max-[640px]:px-4 max-[640px]:pt-4 max-[640px]:pb-4">
        {/* Type / Category */}
        <span className="font-sans text-[11px] leading-none font-semibold tracking-[0.11em] text-primary uppercase">
          {project.type}
        </span>

        {/* Title — multi-line wrapping without truncation */}
        <h3 className="m-0 font-sans text-[20px] leading-[1.3] font-semibold tracking-[-0.4px] text-white max-[640px]:text-lg max-[640px]:leading-[1.35] whitespace-normal">
          {project.title}
        </h3>
      </div>
    </a>
  );
}

export default function PortfolioProjectsSection({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const reduceMotion = useReducedMotion();

  const categoryOptions = useMemo(() => {
    const uniqueCategories = new Map<string, string>();
    projects.forEach((project) => {
      project.categories.forEach((categoryId) => {
        uniqueCategories.set(categoryId, project.type);
      });
    });

    return [
      { id: "all", label: "All Projects" },
      ...Array.from(uniqueCategories, ([id, label]) => ({ id, label })),
    ];
  }, [projects]);

  const visibleProjects = useMemo(
    () =>
      activeCategory === "all"
        ? projects
        : projects.filter((project) =>
            project.categories.includes(activeCategory),
          ),
    [activeCategory, projects],
  );

  return (
    <section
      aria-label="Portfolio projects"
      className="relative z-[5] w-full border-b border-white/12 bg-transparent text-white"
      id="portfolio-projects"
    >
      <div
        className={`relative flex items-start gap-10 border-x border-white/12 px-8 pt-14 pb-[120px] max-[1024px]:flex-col max-[1024px]:gap-8 max-[1024px]:pb-24 max-[640px]:gap-6 max-[640px]:px-5 max-[640px]:pt-8 max-[640px]:pb-14 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />

        {/* ─── Left Category Sidebar & Mobile Option 2 Technical Grid Bar ─── */}
        <nav
          aria-label="Filter projects by category"
          className={`sticky top-[106px] z-20 w-[240px] shrink-0 bg-white/20 p-px ${sidebarClip} max-[1024px]:sticky max-[1024px]:top-[70px] max-[1024px]:w-full max-[1024px]:bg-transparent max-[1024px]:p-0 max-[1024px]:[clip-path:none] max-[640px]:-mx-5 max-[640px]:w-[calc(100%_+_40px)] max-[359px]:!-mx-3 max-[359px]:!w-[calc(100%_+_24px)]`}
        >
          <div
            className={`flex h-full w-full flex-col bg-[#0a0a0a] ${sidebarClip} max-[1024px]:flex-row max-[1024px]:items-center max-[1024px]:overflow-x-auto max-[1024px]:border-b max-[1024px]:border-t-0 max-[1024px]:border-white/12 max-[1024px]:bg-black/95 max-[1024px]:backdrop-blur-xl max-[1024px]:[clip-path:none] max-[1024px]:[scrollbar-width:none] max-[1024px]:[-webkit-overflow-scrolling:touch] max-[1024px]:[scroll-snap-type:x_mandatory]`}
          >
            {/* Overline label — desktop only */}
            <span className="border-b border-white/12 px-5 py-3.5 font-overline text-[11px] leading-none font-medium tracking-[0.14em] text-white/40 uppercase max-[1024px]:hidden">
              {"// Filter work"}
            </span>

            {/* Filter items */}
            <div className="flex flex-col max-[1024px]:flex-row max-[1024px]:items-stretch">
              {categoryOptions.map((category) => {
                const isActive = category.id === activeCategory;
                const count = countForCategory(projects, category.id);
                const isAll = category.id === "all";

                return (
                  <button
                    aria-pressed={isActive}
                    className={`group relative flex cursor-pointer items-center justify-between gap-2.5 border-0 px-5 py-3.5 text-left font-sans text-base leading-[1.4] font-normal tracking-[-0.32px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary max-[1024px]:shrink-0 max-[1024px]:border-r max-[1024px]:border-white/14 max-[1024px]:px-5 max-[1024px]:py-3.5 max-[1024px]:[scroll-snap-align:start] ${
                      isActive
                        ? "bg-white/[0.07] text-primary max-[1024px]:bg-white/[0.06] max-[1024px]:text-white max-[1024px]:font-semibold"
                        : "bg-transparent text-white/45 hover:bg-white/[0.04] hover:text-white/80 max-[1024px]:text-white/60 hover:max-[1024px]:text-white"
                    }`}
                    key={category.id}
                    onClick={(e) => {
                      setActiveCategory(category.id);
                      e.currentTarget.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                      });
                    }}
                    type="button"
                  >
                    {/* Left accent bar — desktop only */}
                    <span
                      aria-hidden="true"
                      className={`absolute top-1.5 bottom-1.5 left-0 w-[2px] transition-all duration-200 max-[1024px]:hidden ${
                        isActive
                          ? "bg-primary opacity-100"
                          : "bg-transparent opacity-0"
                      }`}
                    />

                    {/* Bottom red accent indicator line — mobile active tab only */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="hidden absolute bottom-0 left-0 right-0 h-[3px] bg-primary max-[1024px]:block"
                      />
                    )}

                    {/* Label with // prefix on active mobile tab */}
                    <span className="font-sans text-sm tracking-[-0.2px] whitespace-nowrap max-[1024px]:text-[14px]">
                      {isActive && (
                        <span className="hidden text-primary font-bold mr-1.5 max-[1024px]:inline">
                          {"// "}
                        </span>
                      )}
                      {category.label}
                    </span>

                    {/* Count badge */}
                    <span
                      className={`font-display text-lg font-bold leading-none tracking-tight transition-all duration-200 ${
                        isActive
                          ? "text-primary max-[1024px]:text-primary opacity-100"
                          : isAll
                            ? "text-white/40 opacity-100 group-hover:text-white/70 max-[1024px]:text-white/40"
                            : "text-white/50 opacity-0 group-hover:opacity-100 max-[1024px]:opacity-60 max-[1024px]:text-white/40"
                      }`}
                    >
                      {String(count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ─── Projects Grid — 2-Column Layout on iPad, Edge-to-Edge on Mobile ─── */}
        <div className="w-full min-w-0 flex-1 max-[640px]:-mx-5 max-[640px]:w-[calc(100%_+_40px)] max-[359px]:!-mx-3 max-[359px]:!w-[calc(100%_+_24px)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
              exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              key={activeCategory}
              transition={{ duration: reduceMotion ? 0 : 0.28 }}
            >
              {visibleProjects.length > 0 ? (
                <div className="grid grid-cols-2 gap-6 max-[1024px]:gap-5 max-[640px]:grid-cols-1 max-[640px]:gap-4">
                  {visibleProjects.map((project) => (
                    <ProjectCard
                      key={`${project.title}-${project.type}`}
                      project={project}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[280px] w-full items-center justify-center border border-white/15 text-center">
                  <p className="m-0 font-sans text-sm text-white/50">
                    More work in this category is being prepared.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
