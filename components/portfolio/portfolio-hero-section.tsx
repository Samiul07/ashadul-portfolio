"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import SectionCrosshairs from "@/components/ui/section-crosshairs";
import styles from "@/app/(site)/portfolio/portfolio-hero.module.css";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const contactShape =
  "[clip-path:polygon(0_0,calc(100%_-_16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%_-_16px))]";

function PlusMark({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 39 40"
    >
      <path
        d="M16.7997 22.6286H0V17.1429H16.7997V0H22.2003V17.1429H39V22.6286H22.2003V40H16.7997V22.6286Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XMark({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 22 40"
    >
      <path
        d="M7.27604 19.5429L0.34375 0H6.98958L11.2292 12.9143H11.3437L15.6979 0H21.6563L14.724 19.5429L22 40H15.3542L10.7708 26.0571H10.6562L5.95833 40H0L7.27604 19.5429Z"
        fill="currentColor"
      />
    </svg>
  );
}

const proofItems = [
  {
    value: "12",
    mark: "plus" as const,
    markWidthClass: "w-[20px] max-[640px]:w-[15.5px]",
    labelLines: ["Years", "Experience"] as const,
  },
  {
    value: "20",
    mark: "plus" as const,
    markWidthClass: "w-[20px] max-[640px]:w-[15.5px]",
    labelLines: ["Products", "Shipped"] as const,
  },
  {
    value: "2",
    mark: "x" as const,
    markWidthClass: "w-[11px] max-[640px]:w-[8.5px]",
    labelLines: ["Conversion", "Lift"] as const,
  },
];

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 max-[640px]:h-[18px] max-[640px]:w-[18px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m7 17 10-10M17 7H8m9 0v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ContactCard({
  containerRef,
  mounted,
  dimensions,
  compact = false,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  mounted: boolean;
  dimensions: { width: number; height: number };
  compact?: boolean;
}) {
  return (
    <div
      ref={containerRef}
      className={`relative w-full ${compact ? styles.mobileProofContact : "-mt-px min-h-[116px]"}`}
    >
      <a
        aria-label="Email Ashadul to start a conversation"
        className={`group block h-full w-full text-white no-underline outline-none ${contactShape}`}
        href="mailto:ashadulislamsamiul@gmail.com?subject=Let%27s%20talk%20about%20a%20product"
      >
        <span
          className={`flex h-full w-full items-center overflow-hidden bg-black/38 backdrop-blur-[18px] backdrop-saturate-[1.25] ${compact ? "gap-2.5 p-2 pr-2" : "min-h-[116px] gap-4 p-3 pr-4"} ${contactShape}`}
        >
          <span
            className={`relative shrink-0 overflow-hidden bg-white/10 ${
              compact
                ? "h-14 w-14 [clip-path:polygon(0_0,100%_0,100%_100%,9px_100%,0_calc(100%_-_9px))]"
                : "h-[88px] w-[88px] [clip-path:polygon(0_0,100%_0,100%_100%,9px_100%,0_calc(100%_-_9px))]"
            }`}
          >
            <Image
              alt="Ashadul Islam"
              className="object-cover object-[50%_20%]"
              fill
              sizes={compact ? "56px" : "88px"}
              src="/images/logo-avatar-new.jpg"
            />
          </span>

          <span className={`flex min-w-0 flex-1 flex-col items-start ${compact ? "gap-1.5" : "gap-1.5"}`}>
            <span
              className={`font-sans font-semibold text-white whitespace-nowrap ${compact ? "text-[15px] leading-none tracking-[-0.45px]" : "text-xl leading-[1.15] tracking-[-0.4px]"}`}
            >
              Ashadul Islam (Ash)
            </span>
            <span
              className={`inline-flex max-w-full items-center font-sans font-medium text-white/58 uppercase whitespace-nowrap ${compact ? "gap-1.5 text-[10px] leading-none tracking-[0.04em]" : "gap-2 text-xs leading-[1.4] tracking-[0.08em]"}`}
            >
              <span
                aria-hidden="true"
                className={`shrink-0 bg-primary ${compact ? "h-1.5 w-1.5" : "h-2 w-2"}`}
              />
              Open to roles &amp; projects
            </span>
          </span>

          <span
            className={`inline-flex shrink-0 items-center justify-center bg-white text-black transition-colors duration-200 group-hover:bg-primary group-hover:text-white ${compact ? "h-9 w-9" : "h-12 w-12"}`}
          >
            <ArrowUpRight />
          </span>
        </span>
      </a>

      {mounted && dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-white/20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M ${dimensions.width - 16.207} 0.5 L ${dimensions.width - 0.5} 16.207 L ${dimensions.width - 0.5} ${dimensions.height - 0.5} L 16.207 ${dimensions.height - 0.5} L 0.5 ${dimensions.height - 16.207} L 0.5 0.5 Z M ${dimensions.width - 0.5} 0.5 L ${dimensions.width - 16.207} 0.5`}
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      )}
    </div>
  );
}

export default function PortfolioHeroSection() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      setDimensions((current) =>
        current.width === width && current.height === height
          ? current
          : { width, height },
      );
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(containerRef.current);

    window.addEventListener("resize", updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [isMobile]);

  return (
    <section
      aria-labelledby="portfolio-heading"
      className={`relative z-[10] w-full border-b border-white/12 bg-transparent text-white ${styles.dynamicSection || ""}`}
      id="portfolio-home"
    >
      {/* Mobile vertical frame — same 100vw centering as Brands crosshairs */}
      <div aria-hidden="true" className={styles.mobileFrame} />

      <div
        className={`relative z-[1] flex min-h-[550px] items-center border-x border-white/12 px-8 pt-[87px] pb-[75px] max-[1100px]:min-h-0 max-[1100px]:px-6 max-[1100px]:py-14 max-[640px]:items-stretch max-[640px]:px-0 max-[640px]:py-0 ${frameWidth} ${frameMargin} ${styles.dynamicContent || ""}`}
      >
        <SectionCrosshairs topAsT />

        <div
          className={`grid w-full grid-cols-[minmax(0,1.22fr)_minmax(470px,0.78fr)] items-end gap-16 max-[1200px]:grid-cols-[minmax(0,1fr)_minmax(430px,0.8fr)] max-[1200px]:gap-10 max-[1100px]:grid-cols-1 max-[1100px]:items-start max-[1100px]:gap-10 max-[640px]:flex max-[640px]:h-full max-[640px]:flex-col max-[640px]:items-stretch ${styles.dynamicMainGrid || ""}`}
        >
          <div
            className={`flex min-w-0 flex-col items-start gap-12 max-[1100px]:gap-6 max-[640px]:gap-3.5 ${styles.titleBlock || ""}`}
          >
            <p
              className={`m-0 font-overline text-base leading-[22px] font-medium tracking-[-0.32px] text-white uppercase max-[640px]:text-xs max-[359px]:text-[11px] ${styles.eyebrow || ""}`}
            >
              {"// Portfolio / Selected case studies"}
            </p>

            <h1
              className={`m-0 font-display text-[156px] leading-[0.84] font-black tracking-[-6px] text-white uppercase max-[1439px]:text-[clamp(112px,10.8vw,156px)] max-[1100px]:text-[clamp(88px,14vw,128px)] max-[768px]:text-[clamp(72px,13.5vw,104px)] max-[640px]:tracking-[-0.04em] ${styles.title || ""}`}
              id="portfolio-heading"
            >
              <span className="block">Selected</span>
              <span className="block">
                Work<span className="text-primary">.</span>
              </span>
            </h1>
          </div>

          {!mounted || !isMobile ? (
            <div className="flex w-full min-w-0 flex-col">
              <div className="border-x border-t border-white/20">
                <div className="border-b border-white/20 px-5 py-4 font-sans text-xs leading-[1.35] font-medium tracking-[0.08em] text-white/55 uppercase">
                  Senior UI/UX <span className="text-primary">&amp;</span> Product
                  Designer
                </div>

                <dl className="grid grid-cols-3">
                  {proofItems.map((item, index) => (
                    <div
                      className={`min-w-0 px-5 py-6 ${index > 0 ? "border-l border-white/20" : ""}`}
                      key={item.labelLines.join(" ")}
                    >
                      <dd className="m-0 flex items-baseline font-display text-[64px] leading-[0.82] font-black text-white uppercase">
                        <span className="leading-none">{item.value}</span>
                        <span
                          aria-hidden="true"
                          className={`ml-1 flex h-5 shrink-0 origin-bottom-left text-primary [&_svg]:block [&_svg]:h-full [&_svg]:w-full ${item.markWidthClass}`}
                        >
                          {item.mark === "plus" ? <PlusMark /> : <XMark />}
                        </span>
                      </dd>
                      <dt className="mt-4 flex flex-col font-sans text-sm leading-[1.25] font-semibold tracking-[-0.2px] text-white">
                        {item.labelLines.map((line) => (
                          <span className="block" key={line}>
                            {line}
                          </span>
                        ))}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>

              <ContactCard
                containerRef={containerRef}
                dimensions={dimensions}
                mounted={mounted}
              />
            </div>
          ) : (
            mounted && (
              <div className={styles.mobileProof}>
                <p className={styles.mobileProofRole}>
                  Senior UI/UX <span className="text-primary">&amp;</span> Product
                  Designer
                </p>

                <div className={styles.mobileProofUnit}>
                  <dl className={styles.mobileProofStats}>
                    {proofItems.map((item) => (
                      <div
                        className={styles.mobileProofStat}
                        key={item.labelLines.join(" ")}
                      >
                        <dd className={styles.mobileProofValue}>
                          <span>{item.value}</span>
                          <span
                            aria-hidden="true"
                            className={`${styles.mobileProofMark} ${item.markWidthClass}`}
                          >
                            {item.mark === "plus" ? <PlusMark /> : <XMark />}
                          </span>
                        </dd>
                        <span aria-hidden="true" className={styles.mobileProofRule} />
                        <dt className={styles.mobileProofLabel}>
                          {item.labelLines.map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </dt>
                      </div>
                    ))}
                  </dl>

                  <ContactCard
                    compact
                    containerRef={containerRef}
                    dimensions={dimensions}
                    mounted={mounted}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
