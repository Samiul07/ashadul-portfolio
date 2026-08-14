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
    if (!isActivated || !window.location.hash) return;

    let frameId: number | undefined;
    const scrollToHashTarget = () => {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      const target = document.getElementById(targetId);
      if (!target) return false;

      frameId = window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start" });
      });
      return true;
    };

    if (scrollToHashTarget()) {
      return () => {
        if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      };
    }

    // Dynamic section chunks can resolve after this component commits. Watch
    // briefly for the requested anchor, then perform the native anchor jump.
    const observer = new MutationObserver(() => {
      if (scrollToHashTarget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeoutId = window.setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, [isActivated]);

  useEffect(() => {
    const deferredHashes = [
      "#gallery",
      "#testimonials",
      "#collab-notes",
      "#why-me",
      "#about",
      "#about-me",
      "#expertise",
      "#services",
      "#process",
      "#recognition",
      "#notes",
      "#articles",
      "#contact",
    ];
    const matchesDeferredHash = () => {
      const hash = window.location.hash;
      return Boolean(
        hash && deferredHashes.some((deferredHash) => hash.startsWith(deferredHash)),
      );
    };

    // A direct anchor load needs the target mounted before the browser can reach it.
    if (matchesDeferredHash()) {
      const frameId = window.requestAnimationFrame(() => {
        setIsActivated(true);
      });
      return () => window.cancelAnimationFrame(frameId);
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Load the deep page only when the reader is actually approaching it. Keeping
    // this observer-driven avoids competing with the hero during the LCP window.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(sentinel);

    // Navbar links update only the hash on the homepage. Activate immediately so
    // those links keep working even though the target section is still unloaded.
    const activateFromHash = () => {
      if (!matchesDeferredHash()) return;
      observer.disconnect();
      setIsActivated(true);
    };
    window.addEventListener("hashchange", activateFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", activateFromHash);
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
