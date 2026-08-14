import dynamic from "next/dynamic";
import Image from "next/image";
import FeedbackWidget from "@/components/hero/desktop-feedback-widget";
import AvailabilityBadge from "@/components/hero/availability-badge";
import MobileVisualViewport from "@/components/hero/mobile-visual-viewport";
import HeroGradient from "@/components/background/desktop-hero-gradient";
import LogoListSection from "@/components/sections/logo-list-section";
import heroStyles from "./home-hero.module.css";
import { getRecentArticles, getTestimonials } from "@/sanity/lib/data";
import { sanityArticleToNoteCard } from "@/components/sections/notes-section";

const SelectedWork = dynamic(
  () => import("@/components/sections/selected-work")
);
const WhyMeCardsSection = dynamic(
  () => import("@/components/sections/why-me-cards-section")
);
const ProjectGallerySection = dynamic(
  () => import("@/components/sections/project-gallery-section")
);
const CalloutNotesSection = dynamic(
  () => import("@/components/sections/callout-notes-section")
);
const ServicesSection = dynamic(
  () => import("@/components/sections/services-section")
);
const WorkProcessFolderRefinedSection = dynamic(
  () => import("@/components/sections/work-process-folder-refined-section")
);
const RecognitionSection = dynamic(
  () => import("@/components/sections/recognition-section")
);
const NotesSection = dynamic(
  () => import("@/components/sections/notes-section")
);
const ContactFooterSection = dynamic(
  () => import("@/components/sections/contact-footer-section")
);

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const buttonShape =
  "[clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]";
const buttonBase = `relative isolate inline-flex h-[52px] items-center justify-center gap-2 overflow-hidden rounded-[2px] px-6 py-3 font-sans text-base leading-[22px] font-normal tracking-[-0.32px] whitespace-nowrap no-underline transition-colors duration-200 ${buttonShape}`;

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 22 22" fill="none">
      <path
        d="M15.125 6.875 5.5 16.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.375"
      />
      <path
        d="M7.332 5.672s7.377-.622 8.497.498c1.119 1.119.497 8.497.497 8.497"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.375"
      />
    </svg>
  );
}

function Download() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17c0 .93 0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C5.605 21 6.07 21 7 21h10c.93 0 1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C21 18.395 21 17.93 21 17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M16.5 11.5S13.186 16 12 16s-4.5-4.5-4.5-4.5M12 15V3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PlusMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 39 40" fill="none">
      <path
        d="M16.7997 22.6286H0V17.1429H16.7997V0H22.2003V17.1429H39V22.6286H22.2003V40H16.7997V22.6286Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 22 40" fill="none">
      <path
        d="M7.27604 19.5429L0.34375 0H6.98958L11.2292 12.9143H11.3437L15.6979 0H21.6563L14.724 19.5429L22 40H15.3542L10.7708 26.0571H10.6562L5.95833 40H0L7.27604 19.5429Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PercentMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 29 40" fill="none">
      <path
        d="M5.92293 22.1667C3.98587 22.1667 2.51445 21.6296 1.50867 20.5556C0.50289 19.4815 0 17.9444 0 15.9444V6.22222C0 4.22222 0.50289 2.68519 1.50867 1.61111C2.51445 0.537037 3.98587 0 5.92293 0C7.85999 0 9.33141 0.537037 10.3372 1.61111C11.343 2.68519 11.8459 4.22222 11.8459 6.22222V15.9444C11.8459 17.9444 11.343 19.4815 10.3372 20.5556C9.33141 21.6296 7.85999 22.1667 5.92293 22.1667ZM20.1156 0.555555H24.027L8.88439 39.4444H4.97303L20.1156 0.555555ZM5.92293 18.6667C7.26397 18.6667 7.93449 17.8519 7.93449 16.2222V5.94444C7.93449 4.31482 7.26397 3.5 5.92293 3.5C4.58189 3.5 3.91137 4.31482 3.91137 5.94444V16.2222C3.91137 17.8519 4.58189 18.6667 5.92293 18.6667ZM23.0771 40C21.14 40 19.6686 39.463 18.6628 38.3889C17.657 37.3148 17.1541 35.7778 17.1541 33.7778V24.0556C17.1541 22.0556 17.657 20.5185 18.6628 19.4444C19.6686 18.3704 21.14 17.8333 23.0771 17.8333C25.0141 17.8333 26.4856 18.3704 27.4913 19.4444C28.4971 20.5185 29 22.0556 29 24.0556V33.7778C29 35.7778 28.4971 37.3148 27.4913 38.3889C26.4856 39.463 25.0141 40 23.0771 40ZM23.0771 36.5C24.4181 36.5 25.0886 35.6852 25.0886 34.0556V23.7778C25.0886 22.1481 24.4181 21.3333 23.0771 21.3333C21.736 21.3333 21.0655 22.1481 21.0655 23.7778V34.0556C21.0655 35.6852 21.736 36.5 23.0771 36.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CrossMark({
  className,
  topHalf = false,
}: {
  className: string;
  topHalf?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-[25px] w-[25px] ${className}`}
    >
      <span
        className={`absolute left-0 h-px w-6 bg-white ${
          topHalf ? "top-0" : "top-3"
        }`}
      />
      <span
        className={`absolute left-3 w-px bg-white ${
          topHalf ? "top-0 h-3" : "top-0 h-[25px]"
        }`}
      />
    </span>
  );
}

const stats = [
  {
    details: "Across SaaS, AI tools, dashboards, and web/mobile products.",
    itemClassName: "w-[203px]",
    mark: <PlusMark />,
    markClassName: "w-[39px]",
    markLeftClassName: "left-[147px]",
    metricClassName: "w-[186px]",
    numberClassName: "w-[147px]",
    numberScaleClassName: "scale-x-[0.88]",
    title: "Years Experience",
    value: "12",
  },
  {
    details:
      "Booking flows and landing pages improved through testing and UX iteration.",
    itemClassName: "w-[203px]",
    mark: <XMark />,
    markClassName: "w-[22px]",
    markLeftClassName: "left-[99px]",
    metricClassName: "w-[121px]",
    numberClassName: "w-[99px]",
    numberScaleClassName: "scale-x-[0.82]",
    title: "Conversion Lift",
    value: "3",
  },
  {
    details:
      "Platforms, apps, tools, websites, and product flows from brief to launch.",
    itemClassName: "w-[233px]",
    mark: <PlusMark />,
    markClassName: "w-[39px]",
    markLeftClassName: "left-[194px]",
    metricClassName: "w-[233px]",
    numberClassName: "w-[194px]",
    numberScaleClassName: "scale-x-[0.9]",
    title: "Products Shipped",
    value: "20",
  },
  {
    details:
      "Design systems and AI-assisted workflows reducing design-to-dev time.",
    itemClassName: "w-[224px]",
    mark: <PercentMark />,
    markClassName: "w-[29px]",
    markLeftClassName: "left-[195px]",
    metricClassName: "w-[224px]",
    numberClassName: "w-[195px]",
    numberScaleClassName: "scale-x-[0.9]",
    title: "Faster Handoff",
    value: "35",
  },
];

function HeroSection() {
  return (
    <section
      id="home"
      className={`relative h-[900px] w-full bg-transparent max-[1200px]:h-[calc(100svh-80px)] max-[1200px]:max-h-[1120px] max-[1200px]:min-h-[900px] max-[640px]:h-auto max-[640px]:min-h-0 max-[640px]:max-h-none ${heroStyles.section}`}
      aria-labelledby="hero-title"
    >
      <MobileVisualViewport />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[120] h-px bg-white/12 max-[640px]:z-[150]"
      />

      <div
        className={`pointer-events-none absolute inset-y-0 left-[50vw] z-[135] box-content -translate-x-1/2 border-x border-white/12 ${frameWidth} ${heroStyles.frame}`}
        aria-hidden="true"
      >
        <CrossMark className="top-0 left-0 -translate-x-1/2" topHalf />
        <CrossMark className="top-0 right-0 translate-x-1/2" topHalf />
        <CrossMark className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CrossMark className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
      </div>

      <HeroGradient />

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-[max(calc((100vw-1400px)/2),24px)] bottom-[48px] z-[130] h-[939px] w-[697px] overflow-hidden min-[768px]:z-[253] min-[641px]:max-[1200px]:right-[-140px] max-[1200px]:opacity-55 max-[640px]:right-[-220px] max-[640px]:bottom-auto max-[640px]:left-auto max-[640px]:z-[130] max-[640px]:h-[621px] max-[640px]:w-[460px] ${heroStyles.portrait}`}
        data-hero-portrait
      >
        <Image
          alt=""
          className={`absolute right-0 bottom-0 h-[939px] w-[697px] max-[640px]:h-[621px] max-[640px]:w-[460px] select-none object-cover ${heroStyles.portraitImage}`}
          priority
          height={939}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 697px"
          src="/images/hero-portrait-highres.webp"
          width={697}
          quality={100}
          unoptimized={true}
        />
      </div>
      <div aria-hidden="true" className={heroStyles.mobileAtmosphere}>
        <span
          className={`${heroStyles.mobileGradientLayer} ${heroStyles.mobileGradientSecondary}`}
        />
        <span
          className={`${heroStyles.mobileGradientLayer} ${heroStyles.mobileGradientMask}`}
        />
        <span
          className={`${heroStyles.mobileGradientLayer} ${heroStyles.mobileGradientHero}`}
        />
      </div>
      <div
        data-mobile-hero-content
        className={`relative z-[140] flex min-[640px]:h-full min-[768px]:z-[254] flex-col items-start px-8 pt-[143px] pb-8 max-[1279px]:pt-[clamp(104px,10vw,128px)] max-[640px]:z-[140] max-[640px]:px-5 ${frameWidth} ${frameMargin} ${heroStyles.content}`}
      >
        <div data-mobile-hero-lead className={`flex flex-col items-start min-[640px]:gap-14 max-[640px]:gap-8 max-[640px]:w-full ${heroStyles.leadGroup}`}>
          <div className={`flex flex-col items-start gap-[23px] max-[640px]:w-full ${heroStyles.copyGroup}`}>
            <div className="flex flex-col items-start gap-4 max-[640px]:w-full max-[640px]:gap-3">
              <p className={`m-0 w-[720px] origin-top-left translate-y-px scale-x-[0.939] scale-y-[1.025] font-playfair text-[40px] leading-none font-normal tracking-[-0.5px] text-white italic max-[1279px]:w-[min(720px,100%)] max-[1279px]:text-[clamp(32px,3.1vw,40px)] ${heroStyles.eyebrow}`}>
                For 12+ years, I&rsquo;ve designed
              </p>
              <h1
                id="hero-title"
                className={`m-0 w-[720px] font-display text-[200px] leading-[0.9] font-black tracking-[-8px] whitespace-nowrap text-white uppercase [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] max-[1279px]:w-[min(720px,100%)] max-[1279px]:text-[clamp(154px,15vw,176px)] max-[1279px]:tracking-[-0.03em] max-[1024px]:text-[clamp(88px,17vw,154px)] max-[640px]:leading-[0.86] ${heroStyles.title}`}
              >
                <span className="block w-max origin-left translate-x-[3px] -translate-y-0.5 scale-x-[0.888] scale-y-[0.964]">
                  PRODUCTS
                </span>
                <span className="block w-max origin-left translate-x-[3px] -translate-y-0.5 scale-x-[0.898] scale-y-[0.964]">
                  THAT SHIP
                  <span className="relative top-0 left-0.5 ml-[-4px] inline-block origin-bottom-left scale-x-[1.09] scale-y-[0.75] text-primary">
                    .
                  </span>
                </span>
              </h1>
            </div>

            <p className={`m-0 w-[720px] origin-top-left translate-x-px -translate-y-px scale-x-[0.978] scale-y-[1.05] font-sans text-2xl leading-[1.2] font-light tracking-[-0.5px] text-white max-[1279px]:w-[min(720px,100%)] max-[640px]:relative max-[640px]:z-[170] max-[640px]:max-w-none ${heroStyles.description}`}>
              I turn SaaS, AI, and ecommerce ideas into clear flows, polished
              interfaces, and ready systems.
            </p>
          </div>

          <div className={`-translate-y-px flex items-center gap-3 max-[640px]:mt-[30px] max-[640px]:relative max-[640px]:z-[195] max-[640px]:w-full max-[640px]:flex-col max-[640px]:items-stretch ${heroStyles.actions}`}>
            <a
              className={`${buttonBase} w-[189px] border-0 bg-white text-black hover:bg-primary hover:text-white max-[640px]:w-full ${heroStyles.button}`}
              href="#work"
            >
              View My Work
              <span className="inline-flex h-[22px] w-[22px] items-center justify-center">
                <ArrowUpRight />
              </span>
            </a>
            <a
              className={`group ${buttonBase} w-[238px] border-0 bg-transparent text-white hover:text-primary max-[640px]:w-full ${heroStyles.button}`}
              href="/Ashadul_Islam_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-white/62 transition-colors duration-200 group-hover:text-primary"
                preserveAspectRatio="none"
                viewBox="0 0 238 52"
              >
                <path
                  d="M1 1H226L237 12V51H13L1 39V1Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="miter"
                  strokeWidth="1.15"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              Download My Resume
              <span className="inline-flex h-6 w-6 items-center justify-center">
                <Download />
              </span>
            </a>
          </div>
        </div>

        <AvailabilityBadge />

        <FeedbackWidget />
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section
      id="experience"
      className="relative z-[120] h-[617px] w-full text-white max-[1200px]:h-auto max-[1200px]:min-h-[617px] max-[640px]:z-[140]"
      aria-labelledby="stats-heading"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-px bg-white/12"
      />

      <div
        className={`relative z-3 flex h-[617px] flex-col justify-center border-x border-white/12 px-[31px] py-[120px] max-[1200px]:h-auto max-[1200px]:py-[clamp(72px,8vw,96px)] max-[640px]:min-h-0 max-[640px]:px-5 max-[640px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        <CrossMark className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 z-20" />
        <CrossMark className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-20" />
        <div className="flex h-[377px] w-[1336px] flex-col items-start gap-8 max-[1439px]:w-full max-[1200px]:h-auto">
          <div className="flex h-[22px] w-[1271px] items-center gap-[50px] max-[1439px]:w-full max-[640px]:gap-4">
            <h2
              id="stats-heading"
              className="m-0 w-[205px] font-sans text-base leading-[22px] font-normal tracking-[-0.32px] whitespace-nowrap text-white uppercase max-[640px]:w-auto max-[640px]:text-[13px]"
            >
              {"// Proof Behind the Work"}
            </h2>
          </div>

          <div className="flex h-[323px] w-[1336px] items-center justify-between max-[1439px]:w-full max-[1200px]:grid max-[1200px]:h-auto max-[1200px]:grid-cols-2 max-[1200px]:items-start max-[1200px]:gap-x-[clamp(40px,8vw,96px)] max-[1200px]:gap-y-16 max-[640px]:gap-x-[clamp(20px,6vw,36px)] max-[640px]:gap-y-12 max-[359px]:grid-cols-1">
            {stats.map((stat) => (
              <article
                className={`flex h-[323px] flex-col items-start gap-3 ${stat.itemClassName} max-[1200px]:w-full max-[640px]:h-auto`}
                key={stat.title}
              >
                <div className="flex h-[199px] flex-col items-start gap-9 max-[640px]:h-[111px] max-[640px]:w-full max-[640px]:gap-6">
                  <div
                    className={`flex h-40 items-end ${stat.metricClassName} max-[640px]:h-[72px] max-[640px]:w-full`}
                  >
                    <span
                      className={`block shrink-0 overflow-visible ${stat.numberClassName} max-[640px]:w-auto`}
                    >
                      <span
                        className={`block origin-left-bottom font-display text-[200px] leading-[0.9] font-black tracking-[-8px] whitespace-nowrap text-white uppercase [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] max-[640px]:text-[clamp(80px,24vw,96px)] max-[640px]:tracking-[-3px] ${stat.numberScaleClassName}`}
                      >
                        {stat.value}
                      </span>
                    </span>
                    <span
                      className={`flex h-10 shrink-0 origin-bottom-left text-primary max-[640px]:scale-[0.7] [&_svg]:block [&_svg]:h-10 ${stat.markClassName}`}
                    >
                      {stat.mark}
                    </span>
                  </div>
                  <span
                    className="block h-[3px] w-14 bg-primary"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex w-full flex-col items-start gap-4">
                  <h3 className="m-0 w-full font-sans text-xl leading-[1.2] font-medium tracking-[-0.5px] text-white max-[640px]:text-base">
                    {stat.title}
                  </h3>
                  <p className="m-0 w-[203px] font-sans text-base leading-normal font-light tracking-[-0.32px] text-white/60 max-[1200px]:w-full max-[640px]:text-sm">
                    {stat.details}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [testimonials, recentArticles] = await Promise.all([
    getTestimonials(),
    getRecentArticles(3),
  ]);
  const notes = recentArticles.map(sanityArticleToNoteCard);
  return (
    <>
      <HeroSection />
      <StatsSection />
      <LogoListSection />
      <SelectedWork />
      <ProjectGallerySection />
      <CalloutNotesSection testimonials={testimonials} />
      <WhyMeCardsSection />
      <ServicesSection />
      <WorkProcessFolderRefinedSection />
      <RecognitionSection />
      <NotesSection notes={notes} />
      <ContactFooterSection />
    </>
  );
}
