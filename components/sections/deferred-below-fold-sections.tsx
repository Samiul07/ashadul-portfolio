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

interface DeferredBelowFoldSectionsProps {
  testimonials: SanityTestimonial[];
  notes: Note[];
}

export default function DeferredBelowFoldSections({
  testimonials,
  notes,
}: DeferredBelowFoldSectionsProps) {
  const [isActivated, setIsActivated] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the page was loaded with a direct hash anchor to one of the deferred sections, activate immediately
    const hash = window.location.hash;
    const deferredHashes = [
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
    ];
    if (hash && deferredHashes.some((h) => hash.startsWith(h))) {
      setIsActivated(true);
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // IntersectionObserver with generous 800px margin so sections activate before entering viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-0 w-full" />
      {isActivated && (
        <>
          <ProjectGallerySection />
          <CalloutNotesSection testimonials={testimonials} />
          <WhyMeCardsSection />
          <ServicesSection />
          <WorkProcessFolderRefinedSection />
          <RecognitionSection />
          <NotesSection notes={notes} />
          <ContactFooterSection />
        </>
      )}
    </>
  );
}
