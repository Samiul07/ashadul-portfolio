"use client";

import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
  toPlainText,
} from "@portabletext/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SanityArticle } from "@/sanity/lib/types";
import SectionCrosshairs from "@/components/ui/section-crosshairs";
import {
  MobileFeaturedNote,
  NoteCard,
  type Note,
  sanityArticleToNoteCard,
} from "@/components/sections/notes-section";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Consistent up-right arrow icon (same as used across the site). */
function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 17 17 7M17 7H8M17 7v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Consistent chevron up icon, same stroke style as ArrowUpRight. */
function ChevronUp() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m18 15-6-6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

/** Consistent chevron down icon, same stroke style as ArrowUpRight. */
function ChevronDown() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

/** Consistent chain-link icon for copy-link actions. */
function LinkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
      <path
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

/** Consistent check icon for the "Link Copied" state. */
function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m20 6-11 11-5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

/** 
 * Pure CSS Dual-Layer Chamfered Box:
 * Uses 1px padding + matching pixel polygon clip-paths for outer and inner layers.
 * The outer layer is SOLID PRIMARY RED so the 1px stroke is uniform and
 * undistorted along all 6 edges (top, bottom, left, right, and the two 45° cuts).
 */
function ChamferedStrokeBox({
  children,
  className = "",
  corner = 14,
}: {
  children: React.ReactNode;
  className?: string;
  corner?: number;
}) {
  const polygonPath = `polygon(0 ${corner}px, ${corner}px 0, 100% 0, 100% calc(100% - ${corner}px), calc(100% - ${corner}px) 100%, 0 100%)`;

  return (
    <div
      className={`relative w-full bg-primary p-[1px] shadow-[0_0_25px_rgba(255,30,0,0.12)] ${className}`}
      style={{ clipPath: polygonPath }}
    >
      <div
        className="absolute inset-[1px] bg-gradient-to-b from-[#120808] via-[#0d0505] to-[#060202] backdrop-blur-md"
        style={{ clipPath: polygonPath }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

function ChamferedOutlineButton({
  children,
  className = "",
  onClick,
  type = "button",
  href,
  height = "h-11",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  href?: string;
  height?: string;
}) {
  const buttonClasses = `group relative isolate inline-flex ${height} items-center justify-center overflow-hidden rounded-[2px] border-0 bg-white/20 p-px transition-colors duration-200 hover:bg-primary [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))] ${className}`;
  
  const innerContent = (
    <div className="flex h-full w-full items-center justify-center gap-2 bg-[#090909] px-5 text-white transition-colors duration-200 group-hover:bg-[#090909]/40 [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]">
      {children}
    </div>
  );

  if (href) {
    return (
      <Link className={`${buttonClasses} no-underline`} href={href}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} type={type}>
      {innerContent}
    </button>
  );
}

const portableTextComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-primary bg-white/[0.02] py-4 pr-6 pl-6 font-sans text-xl leading-[1.4] font-medium italic tracking-[-0.4px] text-white max-[640px]:text-lg max-[640px]:pl-4 max-[640px]:pr-4">
        {children}
      </blockquote>
    ),
    h2: ({ children, value }) => (
      <h2
        className="scroll-mt-28 m-0 font-display text-[36px] leading-[1.05] font-black tracking-[-1px] text-white uppercase max-[1200px]:text-[32px] max-[640px]:text-[clamp(26px,7vw,34px)] max-[640px]:leading-[1.02] max-[640px]:tracking-[-1px]"
        id={slugify(toPlainText(value))}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="m-0 font-display text-[26px] leading-tight font-bold tracking-[-0.5px] text-white uppercase max-[640px]:text-[22px]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="m-0 font-sans text-[19px] leading-[1.7] tracking-[-0.25px] text-white/90 max-[640px]:text-base max-[640px]:leading-[1.65]">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="m-0 flex list-none flex-col gap-3 p-0 font-sans text-[19px] leading-[1.6] tracking-[-0.25px] text-white/90 max-[640px]:text-base">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="m-0 flex list-decimal flex-col gap-3 pl-6 font-sans text-[19px] leading-[1.6] tracking-[-0.25px] text-white/90 max-[640px]:text-base">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative flex items-start gap-3 pl-1 before:mt-2.5 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary">
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="relative flex items-start gap-3 pl-1 font-sans text-[19px] leading-[1.6] tracking-[-0.25px] text-white/90 max-[640px]:text-base">
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");

      return (
        <a
          className="text-primary underline decoration-primary/45 underline-offset-4 transition-colors hover:text-white"
          href={href}
          rel={external ? "noreferrer" : undefined}
          target={external ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

function portableHeadings(body: PortableTextBlock[]) {
  return body
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block) => toPlainText(block))
    .filter(Boolean);
}

/** Sticky Left Sidebar — High Contrast Table of Contents & Reading Progress (Desktop ≥1280px) */
function LeftTocSidebar({ headings }: { headings: string[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollPercent(Math.round(current));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(slugify(heading));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside
      aria-label="Table of contents"
      className="sticky top-28 hidden w-[240px] shrink-0 flex-col gap-8 self-start xl:flex"
    >
      {/* Reading Progress Indicator */}
      <div className="flex flex-col gap-2.5 border-b border-white/14 pb-5">
        <div className="flex items-center justify-between font-overline text-xs font-bold tracking-wider text-white uppercase">
          <span>Progress</span>
          <span className="font-mono text-primary font-bold text-sm">{`${scrollPercent}%`}</span>
        </div>
        <div className="relative h-1.5 w-full overflow-hidden bg-white/14 rounded-full">
          <div
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </div>

      {/* High Contrast Table of Contents Links (WCAG AAA Compliant) */}
      <nav className="flex flex-col gap-3.5">
        <p className="m-0 font-overline text-xs font-bold tracking-widest text-primary uppercase">
          {"// Table of Contents"}
        </p>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {headings.map((heading) => {
            const id = slugify(heading);
            const isActive = activeId === id;
            return (
              <li key={id}>
                <a
                  className={`group relative block font-sans text-sm leading-snug tracking-[-0.2px] transition-all duration-200 ${
                    isActive
                      ? "font-bold text-white pl-3.5 border-l-2 border-primary"
                      : "text-white/70 hover:text-white pl-3.5 border-l-2 border-transparent"
                  }`}
                  href={`#${id}`}
                >
                  {heading}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

/** Mobile & Tablet Sticky Floating Reading Bar + TOC Drawer (< 1280px) */
function MobileReadingBar({ headings }: { headings: string[] }) {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const barRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const articleStartRef = useRef(0);
  const articleEndRef = useRef(0);

  // The bar only appears once the reader has scrolled past the hero image into
  // the article body, and disappears once the article reading area is finished.
  // It measures the article's first content block (the Key Takeaways box) to
  // reveal, and the article's bottom edge to hide after the reader passes it.
  useEffect(() => {
    const article = document.querySelector("article");
    // The Key Takeaways box is the article's first real content block after
    // the hero. The reading bar reveals once this box crosses the middle of
    // the viewport ("as soon as we cross the key takeaways").
    const bodyStart = article
      ? article.querySelector<HTMLElement>(
          "main > div:not([class*='fixed']) > div",
        )
      : null;
    if (!bodyStart || !article) return;

    const measureBounds = () => {
      // Progress is scoped to the article's own reading span: from the moment
      // the Key Takeaways box crosses mid-viewport (the bar appears = 0%) to
      // the article's bottom edge (= 100%). The bar reaches 100% the moment
      // the article content is fully read, not when the whole page (including
      // More Notes) is scrolled.
      const startTop = bodyStart.getBoundingClientRect().top + window.scrollY;
      const articleBottom =
        article.getBoundingClientRect().bottom + window.scrollY;
      // 0% is when the takeaways sit at the middle of the viewport; 100% is
      // when the article's bottom edge reaches the bottom of the viewport
      // (the reader has finished the article content).
      articleStartRef.current = startTop - window.innerHeight * 0.5;
      articleEndRef.current = articleBottom - window.innerHeight;
    };

    const handleScroll = () => {
      const startRect = bodyStart.getBoundingClientRect();
      const articleRect = article.getBoundingClientRect();
      // Reveal when the takeaways cross the upper half of the viewport...
      const started = startRect.top <= window.innerHeight * 0.5;
      // ...and hide once the article's reading content has fully scrolled past
      // the top of the viewport (reader has finished the article).
      const finished = articleRect.bottom <= 0;
      setIsVisible(started && !finished);
    };

    measureBounds();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
      measureBounds();
      handleScroll();
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Update the percent text and progress fill directly via DOM refs (no React
  // re-render per scroll frame) so the fixed bar never re-lays-out or
  // re-composites while scrolling — that recomposition is what shakes the bar
  // vertically on mobile. React state only changes when the rounded percent
  // actually differs, keeping re-renders rare. Progress is 0% at the Key
  // Takeaways and 100% exactly when the article body ends.
  useEffect(() => {
    let rafId = 0;
    let lastPercent = -1;

    const apply = () => {
      const startTop = articleStartRef.current;
      const articleBottom = articleEndRef.current;
      const span = articleBottom - startTop;
      if (span > 0) {
        // 0% when the takeaways cross mid-viewport, 100% when the article's
        // bottom edge reaches the top of the viewport.
        const scrolled = window.scrollY - startTop;
        const current = Math.min(100, Math.max(0, (scrolled / span) * 100));
        const rounded = Math.round(current);
        if (percentTextRef.current) {
          percentTextRef.current.textContent = `${rounded}% READ`;
        }
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${rounded}%`;
        }
        if (rounded !== lastPercent) {
          lastPercent = rounded;
          setScrollPercent(rounded);
        }
      }
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!headings.length) return null;

  return (
    <div
      ref={barRef}
      aria-hidden={isVisible ? undefined : true}
      className="fixed inset-x-0 top-[70px] z-[90] border-b border-white/14 bg-black py-3 px-14 max-[640px]:px-10 shadow-[0_12px_32px_rgba(0,0,0,0.85)] xl:hidden flex flex-col gap-2.5"
      style={{
        transform: `translate3d(0, ${isVisible ? "0px" : "-120%"}, 0)`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
        transition:
          "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease",
        willChange: "transform",
        // Solid background: avoids the backdrop-filter re-sampling that makes
        // a fixed bar shake/jitter vertically while scrolling on mobile.
        WebkitBackdropFilter: "none",
        backdropFilter: "none",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2.5">
          <span ref={percentTextRef} className="font-mono text-primary font-bold text-xs whitespace-nowrap">{`${scrollPercent}% READ`}</span>
          <div className="relative h-1.5 flex-1 max-w-[280px] overflow-hidden bg-white/14 rounded-full">
            <div ref={progressFillRef} className="h-full bg-primary" style={{ width: `${scrollPercent}%` }} />
          </div>
        </div>
        <ChamferedOutlineButton
          onClick={() => setIsOpen(!isOpen)}
          className="shrink-0"
        >
          <span>TOC</span>
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </ChamferedOutlineButton>
      </div>

      {isOpen ? (
        <nav className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto pt-3 border-t border-white/10 [scrollbar-width:none]">
          {headings.map((heading) => {
            const id = slugify(heading);
            return (
              <a
                className="text-xs text-white/80 hover:text-white font-sans py-1.5 pl-3 border-l-2 border-primary/50 hover:border-primary transition-colors"
                href={`#${id}`}
                key={id}
                onClick={() => setIsOpen(false)}
              >
                {heading}
              </a>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}

/**
 * Reusable Newsletter subscription form with state management and Resend API integration.
 */
function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !email.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setIsSubmitted(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3.5 border border-white/14 bg-white/[0.03] p-4 backdrop-blur-md">
      <div className="flex flex-col gap-1">
        <p className="m-0 font-overline text-xs font-bold tracking-wider text-primary uppercase">
          {"// THE NEWSLETTER"}
        </p>
        <h4 className="m-0 font-display text-base font-bold text-white uppercase">
          PRODUCT NOTES
        </h4>
      </div>
      <p className="m-0 font-sans text-sm leading-relaxed text-white/75">
        Get my latest SaaS teardowns, interface patterns, and product strategies delivered straight to your inbox.
      </p>

      {isSubmitted ? (
        <div className="flex items-center gap-2 py-3 text-emerald-400 font-sans text-sm font-medium">
          <span>✓ You&apos;re on the list.</span>
        </div>
      ) : (
        <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
          <input
            suppressHydrationWarning
            className="w-full border border-white/16 bg-black/60 px-3 py-2.5 font-sans text-sm text-white placeholder-white/50 outline-none focus:border-primary"
            placeholder="Enter your email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <button
            className="inline-flex h-11 w-full items-center justify-center gap-2 bg-primary px-5 font-sans text-sm leading-none font-normal tracking-[-0.2px] text-white transition-colors duration-200 hover:bg-white hover:text-black [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))] disabled:opacity-50 disabled:cursor-wait"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
          {error ? (
            <p className="m-0 font-sans text-xs text-primary/80">{error}</p>
          ) : null}
          <p className="m-0 mt-1 font-sans text-[11px] text-white/40 leading-none text-center">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
}

/** 
 * Sleek, Compact Right Sidebar (240px wide) — High Contrast & Readable (Desktop ≥1280px)
 */
function RightShareSidebar({
  copied,
  handleCopyLink,
}: {
  copied: boolean;
  handleCopyLink: () => void;
}) {
  return (
    <aside
      aria-label="Article actions and author info"
      className="sticky top-28 hidden w-[240px] shrink-0 flex-col gap-6 self-start xl:flex"
    >
      {/* Author Badge */}
      <div className="flex items-center gap-4 border border-white/14 bg-white/[0.03] p-4 backdrop-blur-md">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-white/20 bg-white/10">
          <Image
            alt="Ashadul Islam"
            className="object-cover object-[50%_20%]"
            fill
            sizes="56px"
            src="/images/cta-profile-ashadul-wide.png"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="m-0 truncate font-sans text-base font-bold text-white">
            Ashadul Islam
          </p>
          <span className="flex items-center gap-1.5 font-overline text-xs font-medium text-white/70 uppercase">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Lead Designer
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-2.5">
        <p className="m-0 font-overline text-xs font-bold tracking-widest text-primary uppercase">
          {"// Quick Actions"}
        </p>
        <ChamferedOutlineButton
          onClick={handleCopyLink}
          className="w-full"
        >
          <span className="inline-flex h-4 w-4 items-center justify-center">
            {copied ? <CheckIcon /> : <LinkIcon />}
          </span>
          <span>{copied ? "Link Copied" : "Copy Link"}</span>
        </ChamferedOutlineButton>
      </div>

      {/* Substack Box */}
      <NewsletterBox />
    </aside>
  );
}

export default function BlogArticleSection({
  article,
  moreArticles,
}: {
  article: SanityArticle;
  moreArticles?: SanityArticle[];
}) {
  const headings = portableHeadings(article.body ?? []);

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <article
        aria-labelledby="article-heading"
        className="relative z-[120] w-full border-b border-white/12 bg-transparent text-white"
      >
        {/* Hero: overline + display title + hero image */}
        <div
          className={`relative border-x border-white/12 px-8 pt-[140px] pb-[100px] max-[640px]:px-5 max-[640px]:pt-20 max-[640px]:pb-6 ${frameWidth} ${frameMargin}`}
        >
          <SectionCrosshairs hideBottom topAsT />

          <div className="flex w-full flex-col items-center gap-8 max-[640px]:gap-5">
            <div className="flex w-full flex-col items-center gap-6 max-[640px]:gap-3.5">
              <p className="m-0 font-overline text-base leading-none font-medium tracking-[-0.32px] text-white uppercase max-[640px]:text-xs">
                {"// Journal Single"}
              </p>

              <h1
                className="m-0 max-w-[1100px] text-center font-display text-[96px] leading-[0.92] font-black tracking-[-3px] text-white uppercase max-[1439px]:text-[clamp(64px,6vw,84px)] max-[1200px]:text-[clamp(48px,5.5vw,72px)] max-[640px]:text-[clamp(36px,10vw,52px)] max-[640px]:leading-[0.95] max-[640px]:tracking-[-1.5px]"
                id="article-heading"
              >
                {article.title}
                <span className="text-primary">.</span>
              </h1>
            </div>

            {/* Hero Image — Locked 16:9 Aspect Ratio matching blog thumbnails */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5 border border-white/14 max-[640px]:-mx-5 max-[640px]:w-[calc(100%+40px)] max-[640px]:max-w-none max-[640px]:border-x-0">
              <Image
                alt={article.heroAlt ?? article.title}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1439px) calc(100vw - 48px), 1400px"
                src={article.thumbnail?.url ?? "/images/note-ai-judgment.png"}
              />
            </div>
          </div>
        </div>

        {/* 3-Column Body Section: Left TOC + Center Content + Right Actions */}
        <div
          className={`relative border-x border-white/12 px-8 pb-[120px] max-[640px]:px-5 max-[640px]:pb-14 ${frameWidth} ${frameMargin}`}
        >
          <SectionCrosshairs hideTop />

          <div className="flex w-full items-start justify-between gap-12 max-[1280px]:flex-col max-[1280px]:items-stretch max-[1280px]:gap-8">
            {/* Sticky Left Navigation & TOC (Desktop ≥1280px) */}
            <LeftTocSidebar headings={headings} />

            {/* Center Content Column (max-w 720px for optimal 65-75ch readability) */}
            <main className="flex min-w-0 flex-1 max-w-[720px] flex-col gap-10 max-[640px]:gap-6 mx-auto">
              {/* Mobile & Tablet Collapsible TOC Bar (<1280px) */}
              <MobileReadingBar headings={headings} />

              {/* High-Tech Chamfered Key Takeaways Box (Undistorted 1px Red Border) */}
              {article.takeaways && article.takeaways.length > 0 ? (
                <ChamferedStrokeBox corner={14}>
                  <div className="flex w-full flex-col gap-6 p-8 max-[1200px]:p-6 max-[640px]:p-5">
                    <div className="flex items-center justify-between border-b border-white/14 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-[2px] bg-primary text-white font-bold text-sm">
                          ⚡
                        </span>
                        <h3 className="m-0 font-display text-2xl font-black uppercase tracking-wider text-white max-[640px]:text-lg">
                          Key Takeaways
                        </h3>
                      </div>
                      <span className="border border-primary/40 bg-primary/20 px-2.5 py-1 font-overline text-[10px] font-bold text-primary uppercase tracking-widest max-[640px]:hidden">
                        Executive Summary
                      </span>
                    </div>

                    <ul className="m-0 flex flex-col gap-4 pl-0 list-none font-sans text-[17px] leading-[1.5] text-white/90 max-[640px]:text-sm max-[640px]:leading-relaxed">
                      {article.takeaways.map((takeaway, idx) => (
                        <li className="relative flex items-start gap-3" key={idx}>
                          <span className="mt-1.5 text-primary font-bold text-sm select-none">
                            ◆
                          </span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ChamferedStrokeBox>
              ) : null}

              {/* Main Article Body Blocks */}
              <div className="flex w-full flex-col gap-10 max-[640px]:gap-7">
                <PortableText
                  components={portableTextComponents}
                  value={article.body ?? []}
                />
              </div>

              {/* Mobile & Tablet Inline Actions (<1280px) */}
              <div className="flex flex-col gap-8 border-t border-white/12 pt-10 xl:hidden mt-8">
                <div className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-1">
                  {/* Quick Actions */}
                  <div className="flex flex-col gap-2.5">
                    <p className="m-0 font-overline text-xs font-bold tracking-widest text-primary uppercase">
                      {"// Quick Actions"}
                    </p>
                    <ChamferedOutlineButton
                      onClick={handleCopyLink}
                      className="w-full"
                    >
                      <span className="inline-flex h-4 w-4 items-center justify-center">
                        {copied ? <CheckIcon /> : <LinkIcon />}
                      </span>
                      <span>{copied ? "Link Copied" : "Copy Link"}</span>
                    </ChamferedOutlineButton>
                  </div>

                  {/* Substack Insights */}
                  <NewsletterBox />
                </div>
              </div>
            </main>

            {/* Sticky Right Sidebar (Author info & quick actions) */}
            <RightShareSidebar copied={copied} handleCopyLink={handleCopyLink} />
          </div>
        </div>
      </article>

      {/* ─── Rich Post-Article Footer Stack ─── */}



      {/* 2. Explore More — simple numbered list, minimal cognitive load */}
      <section
        aria-label="Continue reading notes"
        className="relative z-[10] w-full bg-transparent text-white"
      >
        <div
          className={`relative border-x border-white/12 px-8 py-[120px] max-[1200px]:py-24 max-[640px]:px-5 max-[640px]:py-14 ${frameWidth} ${frameMargin}`}
        >
          <SectionCrosshairs />

          <div className="flex w-full flex-col gap-14 max-[640px]:gap-10">
            {/* Header row */}
            <div className="flex w-full items-end justify-between gap-6 max-[640px]:flex-col max-[640px]:items-start">
              <div className="flex flex-col gap-3">
                <p className="m-0 font-overline text-sm font-medium tracking-[0.14em] text-white/50 uppercase max-[640px]:text-xs">
                  {"// Continue reading"}
                </p>
                <h2 className="-ml-[8px] m-0 font-display text-[160px] leading-none font-black tracking-[-8px] text-white uppercase max-[1200px]:text-[clamp(82px,14vw,132px)] max-[1200px]:tracking-[-0.05em] max-[640px]:text-[clamp(44px,12vw,68px)] max-[640px]:leading-[0.92] max-[640px]:tracking-[-3px]">
                  More Notes<span className="text-primary">.</span>
                </h2>
              </div>

              <ChamferedOutlineButton
                href="/blog"
                height="h-[52px]"
                className="max-[640px]:w-full"
              >
                <span>View All Notes</span>
                <ArrowUpRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ChamferedOutlineButton>
            </div>

            {/* Curated cards — the exact homepage NoteCard, reused directly */}
            {moreArticles && moreArticles.length > 0 ? (
              <>
                <div className="grid w-full grid-cols-3 gap-12 min-[640px]:max-[1200px]:grid-cols-2 min-[640px]:max-[1200px]:gap-x-8 min-[640px]:max-[1200px]:gap-y-12 min-[640px]:max-[1200px]:[&>*:first-child]:col-span-2 max-[640px]:hidden">
                  {moreArticles.map((moreArticle) => {
                    const moreNote: Note = sanityArticleToNoteCard(moreArticle);
                    return (
                      <NoteCard
                        key={moreNote.href}
                        note={moreNote}
                        tabletFeed={true}
                      />
                    );
                  })}
                </div>

                {/* Mobile — homepage mobile feed pattern */}
                <div className="hidden w-full max-[640px]:block max-[640px]:-mx-5 max-[640px]:w-[calc(100%_+_40px)] [&>article:last-child]:border-b-0">
                  {moreArticles.map((moreArticle) => {
                    const moreNote: Note = sanityArticleToNoteCard(moreArticle);
                    return (
                      <MobileFeaturedNote
                        key={moreNote.href}
                        note={moreNote}
                      />
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
