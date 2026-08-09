import Image from "next/image";
import Link from "next/link";
import SectionCrosshairs from "../ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const buttonShape =
  "[clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]";
const buttonBase = `relative isolate inline-flex h-[52px] items-center justify-center gap-2 overflow-hidden rounded-[2px] px-6 py-3 font-sans text-base leading-[22px] font-normal tracking-[-0.32px] whitespace-nowrap no-underline transition-colors duration-200 ${buttonShape}`;

export type Note = {
  category: string;
  href: string;
  image: string;
  title: string;
};

export const notes: Note[] = [
  {
    category: "Art Direction",
    href: "/blog/minimalist-branding-for-modern-tech-startups",
    image: "/images/blog/article/figma-article-hero-78d327.png",
    title: "Minimalist Branding for Modern Tech Startups",
  },
  {
    category: "Product Design",
    href: "/blog/designing-product-flows-that-actually-ship",
    image: "/images/note-product-flows.png",
    title: "Designing Product Flows That Actually Ship",
  },
  {
    category: "AI & Craft",
    href: "/blog/using-ai-without-losing-design-judgment",
    image: "/images/note-ai-judgment.png",
    title: "Using AI Without Losing Design Judgment",
  },
];

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
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

function CalendarIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-[18px] w-[18px] shrink-0 overflow-hidden"
    >
      <span className="absolute inset-[5.21%_7.29%]">
        <Image
          alt=""
          fill
          sizes="16px"
          src="/images/figma-calendar-03.svg"
          unoptimized
        />
      </span>
    </span>
  );
}

function EyeIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-[18px] w-[18px] shrink-0 overflow-hidden"
    >
      <span className="absolute inset-[17.71%_6.82%]">
        <Image
          alt=""
          fill
          sizes="16px"
          src="/images/figma-view.svg"
          unoptimized
        />
      </span>
    </span>
  );
}

export function NoteCard({
  mobileFeed = false,
  tabletFeed = false,
  note,
}: {
  mobileFeed?: boolean;
  tabletFeed?: boolean;
  note: Note;
}) {
  return (
    <article
      className={`min-w-0 flex-1 ${mobileFeed ? "max-[640px]:w-full max-[640px]:flex-none max-[640px]:border-b max-[640px]:border-white/12 max-[640px]:pb-8 max-[640px]:last:border-b-0 max-[640px]:last:pb-0" : ""}`}
    >
      <Link
        aria-label={`Read ${note.title}`}
        className={`group flex min-w-0 flex-col items-start gap-6 text-white no-underline outline-none max-[640px]:gap-0 ${tabletFeed ? "min-[640px]:max-[1200px]:gap-5" : ""}`}
        href={note.href}
      >
        <div className="relative aspect-[40/21] w-full overflow-hidden bg-white/5">
          <ThumbnailArtwork
            note={note}
            sizes="(max-width: 1023px) calc(100vw - 88px), 413px"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-35 transition-opacity duration-400 ease-out will-change-[opacity] group-hover:opacity-65 group-focus-visible:opacity-65" />

          <span className="pointer-events-none absolute top-5 left-5 border border-white/35 bg-black/45 px-3 py-2 font-overline text-[11px] leading-none font-medium tracking-[0.08em] text-white uppercase backdrop-blur-sm max-[640px]:top-3 max-[640px]:left-3 max-[640px]:px-2 max-[640px]:py-1.5 max-[640px]:text-[9px]">
            {note.category}
          </span>

          <span className="pointer-events-none absolute right-5 bottom-5 inline-flex -rotate-2 scale-[0.9] transform-gpu opacity-0 transition-[transform,scale,rotate,opacity] duration-150 ease-in [backface-visibility:hidden] will-change-[transform,scale,rotate,opacity] motion-reduce:transition-none motion-reduce:transform-none group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 group-hover:duration-[260ms] group-hover:ease-[cubic-bezier(0.22,1.35,0.36,1)] group-focus-visible:rotate-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 group-focus-visible:duration-[260ms] group-focus-visible:ease-[cubic-bezier(0.22,1.35,0.36,1)] max-[640px]:hidden">
            <span
              className={`inline-flex h-11 items-center gap-2 bg-white px-4 font-overline text-xs leading-none font-semibold tracking-[0.06em] text-black uppercase ${buttonShape}`}
            >
              Read note
              <span className="inline-flex h-[18px] w-[18px] items-center justify-center">
                <ArrowUpRight />
              </span>
            </span>
          </span>
        </div>

        <div
          className={`flex h-[117px] w-full flex-col items-start ${mobileFeed ? "max-[640px]:h-auto max-[640px]:pt-4" : "max-[640px]:h-[98px]"} ${tabletFeed ? "min-[640px]:max-[1200px]:h-auto" : ""}`}
        >
          <div className="flex w-full flex-col items-start gap-4 max-[640px]:gap-3">
            <div className="flex w-full items-center justify-between font-sans text-base leading-normal font-normal tracking-[-0.32px] text-white/60 max-[640px]:text-[13px]">
              <div className="flex items-center gap-2">
                <CalendarIcon />
                <span className="whitespace-nowrap">January 10, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <EyeIcon />
                <span className="whitespace-nowrap">1.2k</span>
              </div>
            </div>

            <h3
              className={`m-0 line-clamp-2 w-full font-sans text-[32px] leading-[1.2] font-semibold tracking-[-0.5px] text-white transition-colors duration-300 group-hover:text-primary group-focus-visible:text-primary ${mobileFeed ? "max-[640px]:line-clamp-none max-[640px]:text-[26px] max-[640px]:leading-[1.16] max-[640px]:tracking-[-0.4px]" : "max-[640px]:text-2xl"} ${tabletFeed ? "min-[640px]:max-[1200px]:line-clamp-none min-[640px]:max-[1200px]:text-[26px]" : ""}`}
            >
              {note.title}
            </h3>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function MobileFeaturedNote({ note }: { note: Note }) {
  return (
    <article className="border-b border-white/12">
      <Link
        aria-label={`Read ${note.title}`}
        className="group block text-white no-underline outline-none"
        href={note.href}
      >
        <div className="relative aspect-[40/21] w-full overflow-hidden bg-white/5">
          <ThumbnailArtwork
            note={note}
            sizes="(max-width: 639px) 100vw, 1px"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="pointer-events-none absolute top-4 left-4 border border-white/30 bg-black/55 px-2.5 py-2 font-overline text-[10px] leading-none font-medium tracking-[0.08em] text-white uppercase backdrop-blur-sm">
            {note.category}
          </span>
        </div>

        <div className="flex flex-col gap-4 px-5 pt-5 pb-8">
          <div className="flex items-center justify-between font-sans text-[13px] leading-none tracking-[-0.2px] text-white/55">
            <span className="inline-flex items-center gap-2">
              <CalendarIcon />
              January 10, 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <EyeIcon />
              1.2k
            </span>
          </div>
          <h3 className="m-0 w-full font-sans text-[clamp(24px,6.8vw,28px)] leading-[1.12] font-semibold tracking-[-0.45px] text-white transition-colors duration-300 group-hover:text-primary group-focus-visible:text-primary">
            {note.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}

function ThumbnailArtwork({
  note,
  sizes,
}: {
  note: Note;
  sizes: string;
}) {
  return (
    <Image
      alt=""
      className="object-cover"
      fill
      loading="lazy"
      sizes={sizes}
      src={note.image}
    />
  );
}

export function MobileCompactNote({ note }: { note: Note }) {
  return (
    <article className="w-[82%] shrink-0 snap-start border border-white/12 bg-black/25 max-[359px]:w-[88%]">
      <Link
        aria-label={`Read ${note.title}`}
        className="group block text-white no-underline outline-none"
        href={note.href}
      >
        <div className="relative aspect-[40/21] w-full overflow-hidden bg-white/5">
          <ThumbnailArtwork
            note={note}
            sizes="(max-width: 359px) 88vw, 82vw"
          />
          <span className="pointer-events-none absolute top-4 left-4 border border-white/30 bg-black/55 px-2.5 py-2 font-overline text-[10px] leading-none font-medium tracking-[0.08em] text-white uppercase backdrop-blur-sm">
            {note.category}
          </span>
        </div>

        <div className="flex min-h-[136px] flex-col p-4 max-[359px]:min-h-[132px]">
          <div className="flex items-center justify-between font-sans text-[11px] leading-none tracking-[-0.1px] text-white/55">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <CalendarIcon />
              Jan 10, 2026
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <EyeIcon />
              1.2k
            </span>
          </div>

          <h3 className="mt-4 mb-0 line-clamp-3 font-sans text-[21px] leading-[1.1] font-semibold tracking-[-0.35px] text-white transition-colors duration-300 group-focus-visible:text-primary max-[359px]:text-[18px]">
            {note.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}

export default function NotesSection() {
  return (
    <section
      id="notes"
      className="relative z-[7] h-[886px] w-full border-t border-white/12 bg-transparent text-white max-[1200px]:h-auto"
      aria-labelledby="notes-heading"
    >
      <div
        className={`relative flex h-[886px] flex-col items-center justify-center gap-14 border-x border-white/12 py-[120px] max-[1200px]:h-auto max-[1200px]:py-24 max-[640px]:gap-10 max-[640px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />
        <div className="flex w-full items-end justify-center gap-14 px-8 max-[1200px]:flex-col max-[1200px]:items-start max-[640px]:gap-8 max-[640px]:px-5">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-8 text-white uppercase">
            <p className="m-0 w-full font-overline text-base leading-none font-medium max-[640px]:text-sm">
              {"// Product thinking, in writing"}
            </p>
            <h2
              id="notes-heading"
              className="m-0 w-full font-display text-[160px] leading-none font-black tracking-[-8px] text-white uppercase max-[1200px]:text-[clamp(82px,14vw,132px)] max-[640px]:text-[clamp(58px,19vw,88px)] max-[640px]:tracking-[-4px]"
            >
              Product Notes<span className="text-primary">.</span>
            </h2>
          </div>

          <Link
            className={`group/work-action ${buttonBase} w-[148px] border-0 bg-white text-black hover:bg-primary hover:text-white max-[1200px]:hidden`}
            href="/blog"
          >
            Read All
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

        <div
          aria-label="Product notes"
          className="grid w-full grid-cols-3 gap-12 px-8 min-[640px]:max-[1200px]:grid-cols-2 min-[640px]:max-[1200px]:gap-x-8 min-[640px]:max-[1200px]:gap-y-12 min-[640px]:max-[1200px]:[&>*:first-child]:col-span-2 max-[640px]:hidden"
        >
          {notes.map((note) => (
            <NoteCard
              key={note.title}
              mobileFeed
              tabletFeed
              note={note}
            />
          ))}
        </div>

        <div
          aria-label="Product notes"
          className="hidden w-full max-[640px]:block"
        >
          <MobileFeaturedNote note={notes[0]} />
          <div className="flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pt-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {notes.slice(1).map((note) => (
              <MobileCompactNote key={note.title} note={note} />
            ))}
          </div>
        </div>

        <div className="hidden w-full px-5 max-[640px]:block">
          <Link
            className={`group/work-action ${buttonBase} w-full border-0 bg-white text-black hover:bg-primary hover:text-white`}
            href="/blog"
          >
            Read All
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

        <div className="hidden w-full px-8 min-[640px]:max-[1200px]:block">
          <Link
            className={`group/work-action ${buttonBase} w-full border-0 bg-white text-black hover:bg-primary hover:text-white`}
            href="/blog"
          >
            Read All
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
    </section>
  );
}
