import Link from "next/link";
import MobileVisualViewport from "@/components/hero/mobile-visual-viewport";
import ContactFooterSection from "@/components/sections/contact-footer-section";
import SectionCrosshairs from "@/components/ui/section-crosshairs";
import styles from "./not-found.module.css";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const buttonShape =
  "[clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]";
const buttonInnerShape =
  "[clip-path:polygon(0_0,calc(100%_-_11px)_0,100%_11px,100%_100%,11px_100%,0_calc(100%_-_11px))]";

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24">
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

export default function NotFound() {
  return (
    <>
      <section
        aria-labelledby="not-found-heading"
        className="relative z-10 overflow-hidden bg-black text-white"
      >
        <MobileVisualViewport />
        <div
          className={`relative min-h-[780px] border-x border-white/12 max-[1024px]:min-h-[720px] max-[700px]:min-h-0 ${frameWidth} ${frameMargin} ${styles.mobileFrame}`}
        >
          <SectionCrosshairs />

          <div className={`flex h-[92px] items-center justify-between border-b border-white/12 px-10 max-[1024px]:h-[82px] max-[1024px]:px-7 max-[640px]:h-[74px] max-[640px]:px-5 ${styles.mobileHeader}`}>
            <p className="m-0 font-sans text-sm leading-none font-medium tracking-[0.12em] text-white/58 uppercase max-[640px]:text-[11px]">
              <span className="text-primary">{"//"}</span> Error / Page not found
            </p>
            <span className="font-display text-[22px] leading-none font-black tracking-[-0.03em] text-primary uppercase max-[640px]:text-lg">
              404
            </span>
          </div>

          <div className={`grid min-h-[688px] grid-cols-[0.92fr_1.08fr] max-[1024px]:min-h-[638px] max-[840px]:grid-cols-1 max-[840px]:grid-rows-[auto_auto] ${styles.mobileGrid}`}>
            <div className={`relative z-2 flex flex-col justify-center px-12 py-16 max-[1200px]:px-9 max-[1024px]:px-7 max-[840px]:order-2 max-[840px]:border-t max-[840px]:border-white/12 max-[640px]:px-5 max-[640px]:py-10 ${styles.mobileCopy}`}>
              <p className={`m-0 mb-5 font-sans text-xs font-semibold tracking-[0.14em] text-primary uppercase ${styles.mobileKicker}`}>
                Wrong turn. Easy fix.
              </p>
              <h1
                className={`m-0 max-w-[620px] font-display text-[clamp(78px,7.5vw,116px)] leading-[0.84] font-black tracking-[-0.048em] text-white uppercase max-[1024px]:text-[clamp(68px,8vw,92px)] max-[640px]:text-[clamp(58px,17vw,76px)] ${styles.mobileTitle}`}
                id="not-found-heading"
              >
                You&rsquo;ve gone off grid<span className="text-primary">.</span>
              </h1>

              <p className={`m-0 mt-8 max-w-[510px] font-sans text-lg leading-[1.55] tracking-[-0.3px] text-white/66 max-[640px]:mt-6 max-[640px]:text-base ${styles.mobileBody}`}>
                This route doesn&rsquo;t lead anywhere. Head home or jump straight back into the work.
              </p>

              <div className={`mt-9 flex items-center gap-3 max-[640px]:mt-8 max-[640px]:flex-col max-[640px]:items-stretch ${styles.mobileActions}`}>
                <Link
                  className={`inline-flex h-[60px] min-w-[190px] items-center justify-center gap-3 bg-white px-7 font-sans text-base font-semibold tracking-[-0.3px] text-black no-underline transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary max-[640px]:w-full ${buttonShape} ${styles.mobileButton}`}
                  href="/"
                >
                  Back to home
                  <ArrowUpRight />
                </Link>
                <Link
                  className={`group inline-flex h-[60px] min-w-[190px] bg-white/28 p-px font-sans text-base font-semibold tracking-[-0.3px] text-white no-underline transition-colors hover:bg-white/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary max-[640px]:w-full ${buttonShape} ${styles.mobileButton} ${styles.mobileOutlinedButton}`}
                  href="/portfolio"
                >
                  <span
                    className={`flex h-full w-full items-center justify-center gap-3 bg-black px-7 transition-colors group-hover:bg-[#111] ${buttonInnerShape}`}
                  >
                    View my work
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowUpRight />
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            <div className={`relative flex min-h-[560px] items-center justify-center overflow-hidden px-8 py-14 max-[1024px]:min-h-[500px] max-[840px]:order-1 max-[840px]:min-h-[430px] max-[840px]:py-10 max-[640px]:min-h-[320px] max-[640px]:px-4 max-[640px]:py-8 ${styles.mobileArt}`}>
              <div className="relative z-1 flex items-center justify-center">
                <span className={`font-display text-[clamp(250px,27vw,410px)] leading-[0.72] font-black tracking-[-0.07em] text-white max-[1024px]:text-[clamp(220px,28vw,330px)] max-[840px]:text-[clamp(230px,45vw,340px)] max-[640px]:text-[clamp(170px,52vw,220px)] ${styles.mobileDigit}`}>
                  4
                </span>
                <span
                  className={`relative font-display text-[clamp(250px,27vw,410px)] leading-[0.72] font-black tracking-[-0.07em] max-[1024px]:text-[clamp(220px,28vw,330px)] max-[840px]:text-[clamp(230px,45vw,340px)] max-[640px]:text-[clamp(170px,52vw,220px)] ${styles.missingZero} ${styles.mobileDigit}`}
                >
                  0
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 bg-primary max-[640px]:h-3 max-[640px]:w-3"
                  />
                </span>
                <span className={`font-display text-[clamp(250px,27vw,410px)] leading-[0.72] font-black tracking-[-0.07em] text-white max-[1024px]:text-[clamp(220px,28vw,330px)] max-[840px]:text-[clamp(230px,45vw,340px)] max-[640px]:text-[clamp(170px,52vw,220px)] ${styles.mobileDigit}`}>
                  4<span className="text-primary">.</span>
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      <ContactFooterSection workHref="/portfolio" />
    </>
  );
}
