import SectionCrosshairs from "@/components/ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

export default function BlogHeroSection() {
  return (
    <section
      aria-labelledby="blog-heading"
      className="relative z-[120] w-full border-b border-white/12 bg-black text-white"
      id="blog-journal"
    >
      <div
        className={`relative flex min-h-[550px] items-center border-x border-white/12 px-8 pt-[87px] pb-[75px] max-[1100px]:min-h-0 max-[1100px]:px-6 max-[1100px]:py-14 max-[640px]:min-h-[280px] max-[640px]:px-5 max-[640px]:py-12 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />

        <div className="flex w-full min-w-0 flex-col items-start gap-12 max-[1100px]:gap-6 max-[640px]:gap-3.5 text-white uppercase">
          <p className="m-0 font-overline text-base leading-[22px] font-medium tracking-[-0.32px] text-white max-[640px]:text-xs max-[359px]:text-[11px]">
            {"// Product Notes / Field Notes & Insights"}
          </p>

          <h1
            className="m-0 font-display text-[156px] leading-[0.84] font-black tracking-[-6px] text-white max-[1439px]:text-[clamp(112px,10.8vw,156px)] max-[1100px]:text-[clamp(88px,14vw,128px)] max-[768px]:text-[clamp(72px,13.5vw,104px)] blog-hero-heading-mobile max-[640px]:leading-[0.86] max-[640px]:tracking-[-0.04em]"
            id="blog-heading"
          >
            Product Notes<span className="text-primary">.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
