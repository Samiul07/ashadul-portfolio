"use client";

import Image from "next/image";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

type BrandLogo = {
  displayWidth: number;
  name: string;
  src: string;
};

const logos: BrandLogo[] = [
  {
    displayWidth: 240,
    name: "DayTranslations",
    src: "/images/brands/brand-01-day-translations.svg",
  },
  {
    displayWidth: 171,
    name: "MetaBolix",
    src: "/images/brands/brand-02-metabolix.svg",
  },
  {
    displayWidth: 116,
    name: "Dino",
    src: "/images/brands/brand-03-dino.svg",
  },
  {
    displayWidth: 166,
    name: "USACION",
    src: "/images/brands/brand-04-usaciq.svg",
  },
  {
    displayWidth: 207,
    name: "drivephase",
    src: "/images/brands/brand-05-drivephase.svg",
  },
  {
    displayWidth: 92,
    name: "betr",
    src: "/images/brands/brand-06-betr.svg",
  },
  {
    displayWidth: 155,
    name: "g15.media",
    src: "/images/brands/brand-07-g15-media.svg",
  },
  {
    displayWidth: 160,
    name: "orbix.studio",
    src: "/images/brands/brand-08-orbix-studio.svg",
  },
  {
    displayWidth: 131,
    name: "pethra",
    src: "/images/brands/brand-08-pethra.svg",
  },
  {
    displayWidth: 166,
    name: "Keukenglas",
    src: "/images/brands/brand-09-keukenglas.svg",
  },
  {
    displayWidth: 108,
    name: "SPEAK!",
    src: "/images/brands/brand-10-speak.svg",
  },
  {
    displayWidth: 147,
    name: "TechCare",
    src: "/images/brands/brand-11-techcare.svg",
  },
  {
    displayWidth: 154.295,
    name: "timerack",
    src: "/images/brands/brand-12-timerack.svg",
  },
  {
    displayWidth: 167,
    name: "Transparent",
    src: "/images/brands/brand-13-transparent.svg",
  },
  {
    displayWidth: 74,
    name: "Tante Alma",
    src: "/images/brands/brand-15-tante-alma.svg",
  },
  {
    displayWidth: 133,
    name: "Packsmile",
    src: "/images/brands/brand-16-packsmile.svg",
  },
];

const logoGap = 100;
const logoSourceHeight = 32;
const logoDisplayHeight = 30;
const logoScale = logoDisplayHeight / logoSourceHeight;
const marqueePixelsPerSecond = 22 * 1.3 * 1.4 * 1.2 * 1.2 * 1.1;
const marqueeLoopWidth =
  logos.reduce((total, logo) => total + logo.displayWidth * logoScale, 0) +
  logoGap * logos.length;
const marqueeDuration = marqueeLoopWidth / marqueePixelsPerSecond;

function LogoCell({ logo }: { logo: BrandLogo }) {
  const scaledWidth = logo.displayWidth * logoScale;

  return (
    <div
      className="flex h-[132px] shrink-0 items-center justify-center overflow-hidden max-[768px]:h-[96px]"
      style={{ width: `${scaledWidth}px` }}
    >
      <Image
        alt=""
        className="block max-w-none select-none"
        height={logoSourceHeight}
        // Eager: lazy images inside a translating marquee stay unloaded on mobile.
        loading="eager"
        decoding="async"
        src={logo.src}
        style={{ height: `${logoDisplayHeight}px`, width: `${scaledWidth}px` }}
        width={logo.displayWidth}
      />
    </div>
  );
}

function CrossMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-[25px] w-[25px] ${className}`}
    >
      <span className="absolute top-3 left-0 h-px w-6 bg-white" />
      <span className="absolute top-0 left-3 h-[25px] w-px bg-white" />
    </span>
  );
}

export default function LogoListSection({
  topBorder = false,
  transparent = false,
}: {
  topBorder?: boolean;
  transparent?: boolean;
} = {}) {
  return (
    <section
      aria-label="Brands I've worked with"
      className={`relative z-[120] w-full border-b border-white/12 text-white ${topBorder ? "border-t border-white/12" : ""} ${transparent ? "bg-transparent" : "bg-black"}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-[50vw] z-30 -translate-x-1/2 ${frameWidth}`}
      >
        <CrossMark className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <CrossMark className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <CrossMark className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CrossMark className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
      </div>

      <style>{`
        @-webkit-keyframes marquee-loop {
          0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          100% {
            -webkit-transform: translate3d(-50%, 0, 0);
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes marquee-loop {
          0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          100% {
            -webkit-transform: translate3d(-50%, 0, 0);
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee-loop {
          -webkit-animation: marquee-loop ${marqueeDuration}s linear infinite;
          animation: marquee-loop ${marqueeDuration}s linear infinite;
        }
        .marquee-loop-track {
          --logo-gap: 100px;
        }
        @media (max-width: 767px) {
          .marquee-loop-track {
            --logo-gap: 50px;
          }
        }
      `}</style>

      <div
        className={`relative h-[132px] overflow-hidden border-x border-white/12 ${transparent ? "bg-transparent" : "bg-black"} pl-8 max-[768px]:h-auto max-[768px]:min-h-[172px] max-[768px]:flex-col max-[768px]:items-start max-[768px]:py-6 max-[768px]:pl-5 ${frameWidth} ${frameMargin}`}
      >

        <div className="flex h-full items-center max-[768px]:h-auto max-[768px]:w-full max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-6">
          <p className="m-0 w-[118px] shrink-0 font-overline text-base leading-none font-medium text-white uppercase max-[768px]:w-full max-[640px]:text-sm">
            <span className="hidden max-[768px]:inline">{"// "}</span>
            Brands I&apos;ve Worked With
          </p>

          <div className="relative h-[132px] min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,transparent_2%,#000_14%,#000_86%,transparent_98%,transparent_100%)] max-[768px]:h-[96px] max-[768px]:w-full max-[768px]:[mask-image:linear-gradient(to_right,transparent_0%,transparent_3%,#000_18%,#000_82%,transparent_97%,transparent_100%)]">
            <div
              aria-hidden="true"
              className="flex h-full w-max items-center animate-marquee-loop"
              style={{ willChange: "transform" }}
            >
              {[0, 1].map((loopIndex) => (
                <div
                  className="flex h-full shrink-0 items-center marquee-loop-track"
                  key={loopIndex}
                  style={{ gap: "var(--logo-gap)", paddingRight: "var(--logo-gap)" }}
                >
                  {logos.map((logo) => (
                    <LogoCell
                      key={`${loopIndex}-${logo.name}`}
                      logo={logo}
                    />
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
