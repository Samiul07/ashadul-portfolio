"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MobileFeaturedNote,
  type Note,
  NoteCard,
} from "@/components/sections/notes-section";
import SectionCrosshairs from "@/components/ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

function Pagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (next: number) => void;
}) {
  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="Notes pagination"
      className="mt-16 flex w-full items-center justify-between gap-4 border-t border-white/12 px-8 pt-8 max-[640px]:mt-10 max-[640px]:px-5 max-[640px]:pt-6"
    >
      <button
        aria-label="Previous page"
        className="group flex cursor-pointer items-center gap-1.5 border-0 bg-transparent px-3 py-2 font-sans text-[11px] font-semibold tracking-[0.11em] uppercase text-white/50 transition-colors hover:text-white disabled:cursor-default disabled:text-white/20"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 group-disabled:transform-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Prev</span>
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: pageCount }, (_, index) => {
          const isActive = index === page;

          return (
            <button
              aria-current={isActive ? "page" : undefined}
              aria-label={`Page ${index + 1}`}
              className={`relative flex h-10 w-10 cursor-pointer items-center justify-center border-0 bg-transparent font-display text-base font-bold tracking-tight transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-white/50 hover:text-white"
              }`}
              key={index}
              onClick={() => onPageChange(index)}
              type="button"
            >
              {String(index + 1).padStart(2, "0")}
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-primary"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <button
        aria-label="Next page"
        className="group flex cursor-pointer items-center gap-1.5 border-0 bg-transparent px-3 py-2 font-sans text-[11px] font-semibold tracking-[0.11em] uppercase text-white/50 transition-colors hover:text-white disabled:cursor-default disabled:text-white/20"
        disabled={page >= pageCount - 1}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        <span>Next</span>
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-disabled:transform-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}

export default function BlogPostsSection({ notes }: { notes: Note[] }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const blogNotes = notes;

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth >= 1200) {
        setPageSize(12);
      } else {
        setPageSize(6);
      }
    };
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const pageCount = useMemo(() => {
    return Math.ceil(blogNotes.length / pageSize);
  }, [blogNotes.length, pageSize]);

  const activePage = useMemo(() => {
    return Math.max(0, Math.min(page, pageCount - 1));
  }, [page, pageCount]);

  const pageNotes = useMemo(() => {
    const start = activePage * pageSize;
    return blogNotes.slice(start, start + pageSize);
  }, [activePage, blogNotes, pageSize]);

  const goToPage = (next: number) => {
    const clamped = Math.max(0, Math.min(next, pageCount - 1));
    setPage(clamped);

    const section = document.getElementById("blog-posts");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      aria-label="Field notes and articles"
      className="relative z-[10] w-full border-b border-white/12 bg-transparent text-white"
      id="blog-posts"
    >
      <div
        className={`relative border-x border-white/12 py-[120px] max-[1200px]:py-24 max-[640px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />

        <div
          aria-label="Product notes"
          className="grid w-full grid-cols-3 gap-12 px-8 min-[640px]:max-[1200px]:grid-cols-2 min-[640px]:max-[1200px]:gap-x-8 min-[640px]:max-[1200px]:gap-y-12 min-[640px]:max-[1200px]:[&>*:first-child]:col-span-2 max-[640px]:hidden"
        >
          {pageNotes.map((note) => (
            <NoteCard key={note.title} mobileFeed note={note} tabletFeed />
          ))}
        </div>

        <div
          aria-label="Product notes"
          className="hidden w-full max-[640px]:block [&>article:last-child]:border-b-0"
        >
          {pageNotes.map((note) => (
            <MobileFeaturedNote key={note.title} note={note} />
          ))}
        </div>

        <Pagination
          onPageChange={goToPage}
          page={activePage}
          pageCount={pageCount}
        />
      </div>
    </section>
  );
}
