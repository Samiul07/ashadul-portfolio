"use client";

import { useMemo, useState } from "react";
import {
  MobileFeaturedNote,
  NoteCard,
} from "@/components/sections/notes-section";
import SectionCrosshairs from "@/components/ui/section-crosshairs";
import { getAllNotes, noteCardData } from "@/lib/notes";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

/** Six notes per page — enough for a full desktop row set without a long scroll. */
const PAGE_SIZE = 6;

const blogNotes = getAllNotes().map(noteCardData);

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
        className="cursor-pointer border-0 bg-transparent px-0 py-1 font-sans text-sm tracking-[-0.2px] text-white/50 transition-colors hover:text-white disabled:cursor-default disabled:text-white/20"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        type="button"
      >
        Prev
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: pageCount }, (_, index) => {
          const isActive = index === page;

          return (
            <button
              aria-current={isActive ? "page" : undefined}
              aria-label={`Page ${index + 1}`}
              className={`relative min-w-10 cursor-pointer border-0 bg-transparent px-2.5 py-2 font-display text-sm font-bold tracking-tight transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-white/35 hover:text-white/75"
              }`}
              key={index}
              onClick={() => onPageChange(index)}
              type="button"
            >
              {String(index + 1).padStart(2, "0")}
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute right-1.5 bottom-0 left-1.5 h-px bg-primary"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <button
        aria-label="Next page"
        className="cursor-pointer border-0 bg-transparent px-0 py-1 font-sans text-sm tracking-[-0.2px] text-white/50 transition-colors hover:text-white disabled:cursor-default disabled:text-white/20"
        disabled={page >= pageCount - 1}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        Next
      </button>
    </nav>
  );
}

export default function BlogPostsSection() {
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(blogNotes.length / PAGE_SIZE);

  const pageNotes = useMemo(() => {
    const start = page * PAGE_SIZE;
    return blogNotes.slice(start, start + PAGE_SIZE);
  }, [page]);

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
          page={page}
          pageCount={pageCount}
        />
      </div>
    </section>
  );
}
