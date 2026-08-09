// Archived unmounted alternative. Retained for design history only.
import Image from "next/image";
import SectionCrosshairs from "../ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[639px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

const reasons = [
  {
    description:
      "I connect UX decisions to business outcomes, conversion, AOV, retention not just screens.",
    number: "01",
    title: "Focus on conversion.",
  },
  {
    description:
      "I take work from Figma to functional myself, so designs become real product without waiting on dev.",
    number: "02",
    title: "I ship, not just design.",
  },
  {
    description:
      "12 years across SaaS platforms, dashboards, and ecommerce funnels, I know how these products convert.",
    number: "03",
    title: "SaaS & Ecommerce fluency.",
  },
  {
    description:
      "I own problems end-to-end and move fast, no bureaucracy required. I've run my own store and led lean teams.",
    number: "04",
    title: "Built for small, fast teams.",
  },
];

export default function WhyMeSection() {
  return (
    <section
      aria-labelledby="why-me-heading"
      className="relative z-6 w-full border-t border-white/12 bg-black text-white"
      id="about"
    >
      <div
        className={`relative flex min-h-[930px] flex-col justify-center border-x border-white/12 py-[120px] max-[1023px]:py-24 max-[639px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />
        <div className="flex w-full flex-col gap-8 px-8 max-[639px]:px-5">
          <div className="flex w-full items-start gap-[100px] font-overline text-base leading-none font-medium text-white uppercase max-[1023px]:gap-10 max-[639px]:text-sm">
            <p className="m-0 min-w-0 flex-1">{"// About Me"}</p>
            <p className="m-0 w-[518px] max-[1023px]:w-[42%] max-[639px]:w-auto">
              {"// Why teams work with me"}
            </p>
          </div>

          <div className="grid w-full grid-cols-[minmax(0,1fr)_518px] items-stretch gap-[100px] max-[1023px]:grid-cols-1 max-[1023px]:gap-20">
            <div className="flex min-w-0 flex-col gap-16">
              <h2
                className="m-0 w-full font-display text-[160px] leading-none font-black tracking-[-6px] text-white uppercase max-[1023px]:text-[clamp(90px,17vw,144px)] max-[639px]:text-[clamp(70px,24vw,106px)] max-[639px]:tracking-[-4px]"
                id="why-me-heading"
              >
                Why Me<span className="text-primary">.</span>
              </h2>

              <div className="relative flex min-h-[418px] flex-col items-start">
                <div className="flex w-full flex-col gap-4 font-sans text-2xl leading-[1.2] font-normal tracking-[-0.5px] text-white max-[639px]:text-lg">
                  <p className="m-0">
                    I&rsquo;m a senior product designer who works best{" "}
                    <span className="text-primary">
                      where product, UX, and implementation meet. Over 12+ years
                    </span>
                    , I&rsquo;ve designed SaaS platforms, AI tools, dashboards,
                    mobile apps, service workflows, and design systems across
                    remote teams. I care about making complex products easier to
                    understand, use, and build.
                  </p>
                  <p className="m-0">
                    I&rsquo;m not the designer who disappears after handing off
                    screens. I shape the flow, clean up the logic, pressure-test
                    the edge cases, and use AI-assisted workflows to move faster
                    from Figma to build.
                  </p>
                </div>

                <Image
                  alt="Ashadul signature"
                  className="mt-auto h-auto w-[195px] translate-x-[-6px] object-contain"
                  height={120}
                  src="/images/signature-ashadul.png"
                  width={195}
                />
              </div>
            </div>

            <div className="flex h-full flex-col justify-between py-3 max-[1023px]:gap-0">
              {reasons.map((reason, index) => (
                <article
                  className="relative flex min-h-[143px] items-center gap-8 border-b border-white/12 last:border-b-0 max-[639px]:gap-4"
                  key={reason.number}
                >
                  {index < reasons.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[-3px] left-0 z-2 h-2 w-2 bg-primary"
                    />
                  ) : null}
                  <p className="m-0 w-20 shrink-0 text-center font-display text-[80px] leading-[0.9] font-black tracking-[-3px] text-primary uppercase max-[639px]:w-16 max-[639px]:text-[64px]">
                    {reason.number}
                  </p>
                  <div className="flex min-w-0 flex-1 flex-col gap-4">
                    <h3 className="m-0 font-sans text-[32px] leading-[1.2] font-semibold tracking-[-0.5px] text-white max-[639px]:text-2xl">
                      {reason.title}
                    </h3>
                    <p className="m-0 font-sans text-base leading-normal font-normal tracking-[-0.32px] text-white/60">
                      {reason.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
