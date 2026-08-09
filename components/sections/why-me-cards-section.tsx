import SectionCrosshairs from "../ui/section-crosshairs";
import WhyMePortraitFrame from "./why-me-portrait-frame";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin =
  "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

const outcomes = [
  {
    description:
      "Tie UX decisions to activation, retention, and measurable business movement.",
    label: "Business outcome",
    number: "01",
    title: "Convert",
  },
  {
    description:
      "Carry the work from Figma through flows, edge cases, and implementation.",
    label: "Delivery outcome",
    number: "02",
    title: "Ship",
  },
  {
    description:
      "Apply 12+ years across SaaS, dashboards, funnels, and commerce systems.",
    label: "Domain advantage",
    number: "03",
    title: "Scale",
  },
  {
    description:
      "Bring senior ownership, clear communication, and fewer handoffs to the team.",
    label: "Team outcome",
    number: "04",
    title: "Partner",
  },
];

function OutcomeItem({
  alignRight = false,
  compact = false,
  outcome,
}: {
  alignRight?: boolean;
  compact?: boolean;
  outcome: (typeof outcomes)[number];
}) {
  const isRightAligned = alignRight && !compact;

  return (
    <article
      className={
        compact
          ? "border-t border-white/14 py-7 max-[640px]:-mx-5 max-[640px]:px-5"
          : "relative flex h-[190px] w-[360px] items-center"
      }
    >
      <div className={`w-full pt-1 ${isRightAligned ? "text-right" : ""}`}>
        <p className="m-0 font-overline text-sm leading-none font-medium text-white/58 uppercase">
          {outcome.label}
        </p>
        <span
          aria-hidden="true"
          className={`mt-5 block h-[3px] w-14 bg-primary ${
            isRightAligned ? "ml-auto" : ""
          }`}
        />
        <div
          className={`mt-5 flex items-end gap-4 ${
            isRightAligned ? "justify-end" : ""
          }`}
        >
          <span className="shrink-0 font-display text-[56px] leading-[0.78] font-black text-primary max-[640px]:text-[48px]">
            {outcome.number}
          </span>
          <h3 className="m-0 font-display text-[54px] leading-[0.88] font-black text-white uppercase max-[640px]:text-[46px]">
            {outcome.title}
          </h3>
        </div>
        <p
          className={`mt-4 mb-0 max-w-[320px] font-sans text-[15px] leading-[1.4] font-normal text-white/64 ${
            isRightAligned ? "ml-auto text-right" : ""
          }`}
        >
          {outcome.description}
        </p>
      </div>
    </article>
  );
}

export default function WhyMeCardsSection() {
  return (
    <section
      aria-labelledby="why-me-cards-heading"
      className="relative z-6 w-full border-t border-white/12 bg-black text-white"
      id="about"
    >
      <div
        className={`relative border-x border-white/12 px-8 py-[120px] max-[1024px]:py-24 max-[640px]:px-5 max-[640px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs />
        <div className="relative z-2">
          <p className="m-0 font-overline text-base leading-none font-medium text-white uppercase max-[640px]:text-sm">
            {"// Why work with me"}
          </p>
          <h2
            className="mt-7 mb-0 font-display text-[136px] leading-none font-black tracking-[-5px] whitespace-nowrap text-white uppercase max-[1439px]:text-[clamp(108px,10vw,136px)] max-[1024px]:text-[clamp(86px,16vw,126px)] max-[640px]:text-[68px] max-[640px]:tracking-[-4px] max-[359px]:text-[54px] max-[359px]:tracking-[-3px]"
            id="why-me-cards-heading"
          >
            End to End<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="relative z-2 mt-14 hidden h-[570px] min-[1400px]:block">
          <span
            aria-hidden="true"
            className="absolute top-1/2 right-[calc(50%+189px)] left-0 z-0 h-px -translate-y-1/2 bg-white/24"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 right-0 left-[calc(50%+189px)] z-0 h-px -translate-y-1/2 bg-white/24"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-0 z-1 h-2 w-2 -translate-y-1/2 bg-primary"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 right-0 z-1 h-2 w-2 -translate-y-1/2 bg-primary"
          />

          <div className="absolute top-1/4 left-0 -translate-y-1/2">
            <OutcomeItem outcome={outcomes[0]} />
          </div>
          <div className="absolute top-3/4 left-0 -translate-y-1/2">
            <OutcomeItem outcome={outcomes[1]} />
          </div>
          <div className="absolute top-1/4 right-0 -translate-y-1/2">
            <OutcomeItem alignRight outcome={outcomes[2]} />
          </div>
          <div className="absolute top-3/4 right-0 -translate-y-1/2">
            <OutcomeItem alignRight outcome={outcomes[3]} />
          </div>

          <div className="absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2">
            <WhyMePortraitFrame />
          </div>
        </div>

        <div className="mt-12 block min-[1400px]:hidden">
          <WhyMePortraitFrame compact />
          <div className="mt-14 grid grid-cols-2 gap-x-10 max-[640px]:grid-cols-1 max-[640px]:mt-7">
            {outcomes.map((outcome) => (
              <OutcomeItem compact key={outcome.number} outcome={outcome} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
