import type { Metadata } from "next";
import PortfolioHeroSection from "@/components/portfolio/portfolio-hero-section";
import PortfolioProjectsSection from "@/components/portfolio/portfolio-projects-section";
import type { PortfolioProject } from "@/components/portfolio/portfolio-projects-section";
import ContactFooterSection from "@/components/sections/contact-footer-section";
import LogoListSection from "@/components/sections/logo-list-section";
import HeroGradient from "@/components/background/desktop-hero-gradient";
import MobileVisualViewport from "@/components/hero/mobile-visual-viewport";
import styles from "@/app/portfolio/portfolio-hero.module.css";
import { getProjects } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Selected Product Work | Ashadul Islam",
  description:
    "Selected SaaS, product design, mobile application, design system, and enterprise UX case studies by Ashadul Islam.",
};

function categoryId(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function PortfolioPage() {
  const sanityProjects = await getProjects();
  const projects: PortfolioProject[] = sanityProjects.map((project) => ({
    categories: [categoryId(project.category)],
    figmaUrl: project.figmaUrl,
    image: project.thumbnail?.url || "/images/portfolio/project-folio.png",
    slug: project.slug,
    title: project.title,
    type: project.category,
  }));

  return (
    <>
      <div className="relative w-full overflow-x-clip bg-black">
        <MobileVisualViewport />

        {/* Desktop glow only */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden max-[640px]:hidden">
          <HeroGradient />
        </div>

        {/*
          Homepage-style mobile atmosphere at PAGE level so the red glow
          continues through Brands / projects instead of clipping at hero end.
          Bounded to a fixed height with overflow clipped so the oversized
          decorative gradients never extend the document's scroll height.
        */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 left-0 z-0 w-full overflow-hidden ${styles.mobileAtmosphere}`}
          style={{ height: "2200px" }}
        >
          <span
            className={`${styles.mobileGradientLayer} ${styles.mobileGradientSecondary}`}
          />
          <span
            className={`${styles.mobileGradientLayer} ${styles.mobileGradientMask}`}
          />
          <span
            className={`${styles.mobileGradientLayer} ${styles.mobileGradientHero}`}
          />
        </div>

        <div className={`relative z-[1] ${styles.dynamicWrapper || ""}`}>
          <PortfolioHeroSection />
        </div>

        <div className="relative z-[10]">
          <LogoListSection transparent />
          <PortfolioProjectsSection projects={projects} />
        </div>
      </div>
      <ContactFooterSection workHref="#portfolio-projects" />
    </>
  );
}
