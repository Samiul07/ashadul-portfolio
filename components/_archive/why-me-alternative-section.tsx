// Archived unmounted alternative. Retained for design history only.
const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[639px]:w-[calc(100%_-_40px)]";
const frameMargin =
  "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

const outcomes = [
  {
    detail: "Find the signal. Remove the friction.",
    number: "01",
    title: "Clarify",
  },
  {
    detail: "Design every decision toward action.",
    number: "02",
    title: "Convert",
  },
  {
    detail: "Make the work ready to build and launch.",
    number: "03",
    title: "Ship",
  },
];

function CrossMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 h-[25px] w-[25px] ${className}`}
    >
      <span className="absolute top-3 left-0 h-px w-6 bg-white" />
      <span className="absolute top-0 left-3 h-[25px] w-px bg-white" />
    </span>
  );
}

export default function WhyMeAlternativeSection() {
  return (
    <section
      aria-labelledby="why-me-alternative-heading"
      className="relative z-6 w-full border-t border-white/12 bg-black text-white"
      id="why-me-short"
    >
      <div
        className={`relative flex min-h-[920px] flex-col justify-center border-x border-white/12 px-8 py-[120px] max-[1023px]:min-h-0 max-[1023px]:py-24 max-[639px]:px-5 max-[639px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <CrossMark className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <CrossMark className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <CrossMark className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CrossMark className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />

        <div className="flex w-full flex-col">
          <p className="m-0 font-overline text-base leading-none font-medium text-white uppercase max-[639px]:text-sm">
            {"// Why me — the short version"}
          </p>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)_410px] items-end gap-16 max-[1023px]:grid-cols-1 max-[1023px]:gap-8">
            <h2
              className="m-0 max-w-[860px] font-display text-[150px] leading-[0.88] font-black tracking-[-8px] text-white uppercase max-[1439px]:text-[118px] max-[1439px]:tracking-[-6px] max-[1023px]:text-[clamp(86px,15vw,132px)] max-[639px]:text-[clamp(58px,18vw,82px)] max-[639px]:tracking-[-4px]"
              id="why-me-alternative-heading"
            >
              <span className="block whitespace-nowrap">Less Pitch.</span>
              <span className="block whitespace-nowrap text-primary">
                More Proof.
              </span>
            </h2>

            <p className="m-0 max-w-[410px] pb-2 font-sans text-2xl leading-[1.25] font-normal tracking-[-0.5px] text-white/78 max-[639px]:text-lg">
              I turn product ambiguity into clear decisions, conversion-ready
              interfaces, and work teams can actually ship.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-3 border-y border-white/12 max-[1023px]:mt-16 max-[767px]:grid-cols-1">
            {outcomes.map((outcome) => (
              <article
                className="group relative flex min-h-[245px] flex-col justify-between border-r border-white/12 px-8 py-7 last:border-r-0 max-[1023px]:px-5 max-[767px]:min-h-[190px] max-[767px]:border-r-0 max-[767px]:border-b max-[767px]:border-white/12 max-[767px]:last:border-b-0"
                key={outcome.number}
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-overline text-sm leading-none font-medium tracking-[0.08em] text-white/45">
                    OUTCOME
                  </span>
                  <span className="font-display text-[64px] leading-[0.82] font-black tracking-[-2px] text-primary">
                    {outcome.number}
                  </span>
                </div>

                <div>
                  <span
                    aria-hidden="true"
                    className="mb-5 block h-[3px] w-14 origin-left bg-primary transition-transform duration-300 ease-out group-hover:scale-x-[1.55]"
                  />
                  <h3 className="m-0 font-display text-[64px] leading-[0.9] font-black tracking-[-3px] text-white uppercase max-[1023px]:text-[52px]">
                    {outcome.title}
                  </h3>
                  <p className="m-0 mt-3 font-sans text-base leading-normal font-normal tracking-[-0.32px] text-white/58">
                    {outcome.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between gap-8 max-[767px]:flex-col max-[767px]:items-start">
            <div className="flex items-center gap-4 font-overline text-base leading-none font-medium tracking-[0.02em] text-white uppercase max-[639px]:text-sm">
              <span aria-hidden="true" className="h-3 w-3 bg-primary" />
              Product thinking to shipped product
            </div>
            <p className="m-0 font-sans text-base leading-normal font-normal tracking-[-0.32px] text-white/52">
              One senior partner. Fewer handoffs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
