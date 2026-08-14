"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { SanityTestimonial } from "@/sanity/lib/types";
import type { Note } from "@/components/sections/notes-section";

const ProjectGallerySection = dynamic(
  () => import("@/components/sections/project-gallery-section"),
  { ssr: false }
);
const CalloutNotesSection = dynamic(
  () => import("@/components/sections/callout-notes-section"),
  { ssr: false }
);
const WhyMeCardsSection = dynamic(
  () => import("@/components/sections/why-me-cards-section"),
  { ssr: false }
);
const ServicesSection = dynamic(
  () => import("@/components/sections/services-section"),
  { ssr: false }
);
const WorkProcessFolderRefinedSection = dynamic(
  () => import("@/components/sections/work-process-folder-refined-section"),
  { ssr: false }
);
const RecognitionSection = dynamic(
  () => import("@/components/sections/recognition-section"),
  { ssr: false }
);
const NotesSection = dynamic(
  () => import("@/components/sections/notes-section"),
  { ssr: false }
);
const ContactFooterSection = dynamic(
  () => import("@/components/sections/contact-footer-section"),
  { ssr: false }
);

interface DeferredStageProps {
  children: React.ReactNode;
  forceActivate?: boolean;
  rootMargin?: string;
}

function DeferredStage({
  children,
  forceActivate = false,
  rootMargin = "800px 0px",
}: DeferredStageProps) {
  const [isActive, setIsActive] = useState(forceActivate);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive || forceActivate) {
      setIsActive(true);
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [forceActivate, isActive, rootMargin]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-0 w-full" />
      {isActive ? children : null}
    </>
  );
}

interface DeferredBelowFoldSectionsProps {
  testimonials: SanityTestimonial[];
  notes: Note[];
}

export default function DeferredBelowFoldSections({
  testimonials,
  notes,
}: DeferredBelowFoldSectionsProps) {
  const [targetHash, setTargetHash] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTargetHash(window.location.hash);
    }
  }, []);

  const hasHash = (hashes: string[]) =>
    Boolean(targetHash && hashes.some((h) => targetHash.startsWith(h)));

  const forceStage1 = hasHash([
    "#gallery",
    "#testimonials",
    "#collab-notes",
    "#why-me",
    "#about-me",
    "#expertise",
    "#services",
    "#process",
    "#recognition",
    "#notes",
    "#articles",
    "#contact",
  ]);

  const forceStage2 = hasHash([
    "#why-me",
    "#about-me",
    "#expertise",
    "#services",
    "#process",
    "#recognition",
    "#notes",
    "#articles",
    "#contact",
  ]);

  const forceStage3 = hasHash([
    "#process",
    "#recognition",
    "#notes",
    "#articles",
    "#contact",
  ]);

  const forceStage4 = hasHash([
    "#notes",
    "#articles",
    "#contact",
  ]);

  return (
    <>
      {/* Stage 1: Gallery & Testimonials */}
      <DeferredStage forceActivate={forceStage1} rootMargin="800px 0px">
        <ProjectGallerySection />
        <CalloutNotesSection testimonials={testimonials} />
      </DeferredStage>

      {/* Stage 2: Why Me & Services */}
      <DeferredStage forceActivate={forceStage2} rootMargin="800px 0px">
        <WhyMeCardsSection />
        <ServicesSection />
      </DeferredStage>

      {/* Stage 3: Work Process & Recognition */}
      <DeferredStage forceActivate={forceStage3} rootMargin="800px 0px">
        <WorkProcessFolderRefinedSection />
        <RecognitionSection />
      </DeferredStage>

      {/* Stage 4: Notes & Contact Footer */}
      <DeferredStage forceActivate={forceStage4} rootMargin="800px 0px">
        <NotesSection notes={notes} />
        <ContactFooterSection />
      </DeferredStage>
    </>
  );
}
