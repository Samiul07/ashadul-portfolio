import Image from "next/image";
import Link from "next/link";
import SectionCrosshairs from "../ui/section-crosshairs";
import { getFormattedViews } from "@/lib/metrics";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const buttonShape =
  "[clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]";
const buttonBase = `relative isolate inline-flex h-[52px] items-center justify-center gap-2 overflow-hidden rounded-[2px] px-6 py-3 font-sans text-base leading-[22px] font-normal tracking-[-0.32px] whitespace-nowrap no-underline transition-colors duration-200 ${buttonShape}`;

export type Note = {
  category: string;
  date?: string;
  href: string;
  image: string;
  title: string;
  slug: string;
};

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function sanityArticleToNoteCard(article: {
  category: string | null;
  publishedAt: string;
  slug: string;
  thumbnail: { alt: string; url: string } | null;
  title: string;
}): Note {
  return {
    category: article.category ?? "Article",
    date: formatPublishedDate(article.publishedAt),
    href: `/blog/${article.slug}`,
    image: article.thumbnail?.url ?? "/images/note-ai-judgment.png",
    title: article.title,
    slug: article.slug,
  };
}

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
    <svg
      aria-hidden="true"
      className="h-[16.125px] w-[15.375px] shrink-0"
      viewBox="0 0 15.375 16.125"
      fill="currentColor"
    >
      <path d="M12.1875 0C12.4982 0 12.75 0.25184 12.75 0.5625V1.125H13.3125C14.4516 1.125 15.375 2.04841 15.375 3.1875V14.0625C15.375 15.2016 14.4516 16.125 13.3125 16.125H2.0625C0.923413 16.125 0 15.2016 0 14.0625V3.1875C0 2.04841 0.923413 1.125 2.0625 1.125H2.625V0.5625C2.625 0.25184 2.87684 0 3.1875 0C3.49816 0 3.75 0.25184 3.75 0.5625V1.125H11.625V0.5625C11.625 0.25184 11.8768 0 12.1875 0ZM1.125 14.0625C1.125 14.5803 1.54473 15 2.0625 15H13.3125C13.8303 15 14.25 14.5803 14.25 14.0625V6H1.125V14.0625ZM4.69434 11.0625C5.1085 11.0626 5.44434 11.3983 5.44434 11.8125C5.44434 12.2267 5.1085 12.5624 4.69434 12.5625H4.6875C4.27329 12.5625 3.9375 12.2267 3.9375 11.8125C3.9375 11.3983 4.27329 11.0625 4.6875 11.0625H4.69434ZM7.69043 11.0625C8.10464 11.0625 8.44043 11.3983 8.44043 11.8125C8.44043 12.2267 8.10464 12.5625 7.69043 12.5625H7.68457C7.27036 12.5625 6.93457 12.2267 6.93457 11.8125C6.93457 11.3983 7.27036 11.0625 7.68457 11.0625H7.69043ZM4.69434 8.0625C5.1085 8.06256 5.44434 8.39832 5.44434 8.8125C5.44434 9.22668 5.1085 9.56244 4.69434 9.5625H4.6875C4.27329 9.5625 3.9375 9.22671 3.9375 8.8125C3.9375 8.39829 4.27329 8.0625 4.6875 8.0625H4.69434ZM7.69043 8.0625C8.10464 8.0625 8.44043 8.39829 8.44043 8.8125C8.44043 9.22671 8.10464 9.5625 7.69043 9.5625H7.68457C7.27036 9.5625 6.93457 9.22671 6.93457 8.8125C6.93457 8.39829 7.27036 8.0625 7.68457 8.0625H7.69043ZM10.6875 8.0625C11.1017 8.0625 11.4375 8.39829 11.4375 8.8125C11.4375 9.22671 11.1017 9.5625 10.6875 9.5625H10.6807C10.2665 9.56244 9.93066 9.22668 9.93066 8.8125C9.93066 8.39832 10.2665 8.06256 10.6807 8.0625H10.6875ZM2.0625 2.25C1.54473 2.25 1.125 2.66973 1.125 3.1875V4.875H14.25V3.1875C14.25 2.66973 13.8303 2.25 13.3125 2.25H12.75V2.8125C12.75 3.12316 12.4982 3.375 12.1875 3.375C11.8768 3.375 11.625 3.12316 11.625 2.8125V2.25H3.75V2.8125C3.75 3.12316 3.49816 3.375 3.1875 3.375C2.87684 3.375 2.625 3.12316 2.625 2.8125V2.25H2.0625Z" />
    </svg>
  );
}



function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[11.625px] w-[15.544px] shrink-0"
      viewBox="0 0 15.5443 11.625"
      fill="currentColor"
    >
      <path d="M7.77209 0C9.51832 0 11.0952 0.834394 12.3453 1.80566C13.6018 2.78185 14.5866 3.94165 15.1617 4.69238C15.6718 5.35843 15.6718 6.26657 15.1617 6.93262C14.5866 7.68335 13.6018 8.84315 12.3453 9.81934C11.0952 10.7906 9.51832 11.625 7.77209 11.625C6.02608 11.6249 4.44985 10.7905 3.19982 9.81934C1.94335 8.84314 0.957587 7.68336 0.382438 6.93262C-0.127479 6.26665 -0.127479 5.35835 0.382438 4.69238C0.957587 3.94164 1.94335 2.78186 3.19982 1.80566C4.44985 0.834536 6.02608 6.36513e-05 7.77209 0ZM7.77209 1.125C6.38219 1.12506 5.04739 1.79538 3.89025 2.69434C2.73944 3.58845 1.82072 4.66496 1.27599 5.37598C1.07492 5.63843 1.07492 5.98657 1.27599 6.24902C1.82072 6.96004 2.73944 8.03655 3.89025 8.93066C5.04739 9.82962 6.38219 10.4999 7.77209 10.5C9.16218 10.5 10.4976 9.82979 11.6549 8.93066C12.8056 8.03664 13.7234 6.96003 14.2682 6.24902C14.4692 5.98657 14.4692 5.63843 14.2682 5.37598C13.7234 4.66497 12.8056 3.58836 11.6549 2.69434C10.4976 1.79521 9.16218 1.125 7.77209 1.125ZM7.77306 3C9.32615 3.00025 10.5856 4.25935 10.5856 5.8125C10.5856 7.36565 9.32615 8.62475 7.77306 8.625C6.21976 8.625 4.96056 7.3658 4.96056 5.8125C4.96056 4.2592 6.21976 3 7.77306 3ZM7.77306 4.125C6.84108 4.125 6.08556 4.88052 6.08556 5.8125C6.08556 6.74448 6.84108 7.5 7.77306 7.5C8.70483 7.49975 9.46056 6.74432 9.46056 5.8125C9.46056 4.88067 8.70483 4.12525 7.77306 4.125Z" />
    </svg>
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
            <div className="flex w-full items-center justify-between font-sans text-base leading-normal font-normal tracking-[-0.32px] text-white/70 max-[640px]:text-[13px]">
              <div className="flex items-center gap-2">
                <CalendarIcon />
                <span className="whitespace-nowrap">
                  {note.date ?? "January 10, 2026"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <EyeIcon />
                <span className="whitespace-nowrap" suppressHydrationWarning>
                  {getFormattedViews(note.slug, note.date ?? "")}
                </span>
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
          <div className="flex items-center justify-between font-sans text-[13px] leading-none tracking-[-0.2px] text-white/70">
            <span className="inline-flex items-center gap-2">
              <CalendarIcon />
              {note.date ?? "January 10, 2026"}
            </span>
            <span className="inline-flex items-center gap-2">
              <EyeIcon />
              <span className="whitespace-nowrap" suppressHydrationWarning>
                {getFormattedViews(note.slug, note.date ?? "")}
              </span>
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
          <div className="flex items-center justify-between font-sans text-[11px] leading-none tracking-[-0.1px] text-white/70">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <CalendarIcon />
              {note.date ?? "Jan 10, 2026"}
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <EyeIcon />
              <span className="whitespace-nowrap" suppressHydrationWarning>
                {getFormattedViews(note.slug, note.date ?? "")}
              </span>
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

export default function NotesSection({ notes }: { notes: Note[] }) {
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
