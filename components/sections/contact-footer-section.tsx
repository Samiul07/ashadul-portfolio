"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionCrosshairs from "../ui/section-crosshairs";

const progressiveBlurLayers = [
  { blur: "0.5px", start: 0, end: 37.5 },
  { blur: "1px", start: 12.5, end: 50 },
  { blur: "2px", start: 25, end: 62.5 },
  { blur: "4px", start: 37.5, end: 75 },
  { blur: "8px", start: 50, end: 87.5 },
  { blur: "16px", start: 62.5, end: 100 },
  { blur: "32px", start: 75, end: 100 },
  { blur: "64px", start: 87.5, end: 100 },
] as const;

function BrandingBackgroundBlur() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-[236px] overflow-hidden max-[1200px]:h-[100px]"
    >
      {progressiveBlurLayers.map((layer, idx) => {
        const isLastTwo = idx >= 6;
        const mask = isLastTwo
          ? `linear-gradient(to bottom, transparent ${layer.start}%, black ${layer.start + 12.5}%, black 100%)`
          : `linear-gradient(to bottom, transparent ${layer.start}%, black ${layer.start + 12.5}%, black ${layer.end - 12.5}%, transparent ${layer.end}%)`;

        return (
          <div
            className="absolute inset-0"
            key={idx}
            style={{
              backdropFilter: `blur(${layer.blur})`,
              WebkitBackdropFilter: `blur(${layer.blur})`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}

export function FooterWordmark() {
  return (
    <div className="relative z-1 h-[360px] w-full overflow-hidden max-[1200px]:h-[30vw] max-[640px]:h-[150px]">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 m-0 -translate-x-1/2 bg-gradient-to-b from-white to-[#999] bg-clip-text text-center font-display text-[400px] leading-none font-black tracking-[-6px] whitespace-nowrap text-transparent uppercase [text-box-edge:cap_alphabetic] [text-box-trim:trim-end] max-[1439px]:text-[28vw] max-[640px]:tracking-[-3px]"
      >
        Ashadul
      </p>
      <BrandingBackgroundBlur />
    </div>
  );
}

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const contactCardShape =
  "[clip-path:polygon(0_0,calc(100%_-_18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%_-_18px))]";
const contactCardInnerShape =
  "[clip-path:polygon(0_0,calc(100%_-_16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%_-_16px))]";
const contactButtonShape =
  "[clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]";
const footerTextLink =
  "relative inline-flex min-h-11 w-fit items-center text-white no-underline outline-none after:pointer-events-none after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-white after:content-[''] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:after:transition-none";

const socials: Array<{
  className?: string;
  height: number;
  href: string;
  icon: string;
  label: string;
  width: number;
}> = [
  {
    height: 20,
    href: "https://x.com",
    icon: "/images/social-x.svg",
    label: "X",
    width: 20,
  },
  {
    height: 22,
    href: "https://linkedin.com",
    icon: "/images/social-linkedin.svg",
    label: "LinkedIn",
    width: 22,
  },
  {
    className: "[transform:scaleY(-1)]",
    height: 15.5,
    href: "https://behance.net",
    icon: "/images/figma-social-behance.svg",
    label: "Behance",
    width: 21.5,
  },
  {
    height: 22,
    href: "https://dribbble.com",
    icon: "/images/social-dribbble.svg",
    label: "Dribbble",
    width: 22,
  },
  {
    className: "[transform:scaleY(-1)]",
    height: 20.5,
    href: "https://instagram.com",
    icon: "/images/figma-social-instagram.svg",
    label: "Instagram",
    width: 20.5,
  },
];

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[22px] w-[22px]"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        d="M3.667 6.417 11 11.917l7.333-5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <rect
        height="14.667"
        rx="2.75"
        stroke="currentColor"
        strokeWidth="1.4"
        width="17.417"
        x="2.292"
        y="3.667"
      />
    </svg>
  );
}

function ProfileContactCard({
  className,
  reduceMotion,
}: {
  className: string;
  reduceMotion: boolean | null;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This mount gate intentionally keeps Framer Motion attributes out of the
    // server render so the floating card hydrates without an attribute mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // The motion.div writes transform/translate style attributes on the client
  // during hydration that the server never rendered, which React reports as a
  // hydration attribute mismatch (visible in the dev overlay on phones).
  // Rendering the motion element only after mount keeps server HTML and the
  // first client paint identical, then the float animation kicks in.
  if (!mounted) {
    return (
      <div
        className={`group z-4 h-[224px] w-[276px] max-[1200px]:w-[316px] max-[359px]:w-[280px] bg-white/16 p-1 backdrop-blur-[14px] ${contactCardShape} ${className}`}
      >
        <div className={`flex h-full w-full flex-col gap-1.5 overflow-hidden ${contactCardInnerShape}`}>
          <div className="relative h-[158px] w-full shrink-0 overflow-hidden bg-black/25">
            <Image
              alt="Portrait of Ashadul Islam"
              className="h-full w-full origin-top scale-[1.08] transform-gpu object-cover object-center brightness-[1.05] contrast-[0.98] [backface-visibility:hidden]"
              fill
              sizes="268px"
              src="/images/cta-profile-ashadul-wide.png"
            />
          </div>
          <div className="flex h-[52px] w-full shrink-0 items-center justify-center">
            <a
              className={`relative inline-flex h-[52px] w-full transform-gpu items-center justify-center overflow-hidden bg-[linear-gradient(#fff6f5_32%,#ffaea6_100%)] font-sans text-base leading-[1.2] font-semibold tracking-[-0.32px] text-[#c71900] shadow-[inset_0_2px_0_#fff,inset_0_-12px_34px_17px_rgba(255,30,0,0.45),inset_0_-5px_0_#ff6452] outline-none transition-[box-shadow,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[#a81200] group-hover:shadow-[inset_0_2px_0_#fff,inset_0_-22px_34px_16px_rgba(255,30,0,0.52),inset_0_-2px_0_#ff5240] group-focus-within:text-[#a81200] group-focus-within:shadow-[inset_0_2px_0_#fff,inset_0_-22px_34px_16px_rgba(255,30,0,0.52),inset_0_-2px_0_#ff5240] focus-visible:ring-2 focus-visible:ring-white ${contactButtonShape}`}
              href="mailto:ashadulislamsamiul@gmail.com"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(#fff_32%,#ff9387_100%)] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
              />
              <span className="relative z-1 inline-flex items-center gap-2">
                Contact Me <MailIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      className={`group z-4 h-[224px] w-[276px] max-[1200px]:w-[316px] max-[359px]:w-[280px] bg-white/16 p-1 backdrop-blur-[14px] ${contactCardShape} ${className}`}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              scale: {
                type: "spring",
                stiffness: 160,
                damping: 20,
                mass: 0.8,
              },
              y: {
                duration: 4.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              },
            }
      }
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
    >
      <div className={`flex h-full w-full flex-col gap-1.5 overflow-hidden ${contactCardInnerShape}`}>
        <div className="relative h-[158px] w-full shrink-0 overflow-hidden bg-black/25">
          <Image
            alt="Portrait of Ashadul Islam"
            className="h-full w-full origin-top scale-[1.08] transform-gpu object-cover object-center brightness-[1.05] contrast-[0.98] [backface-visibility:hidden]"
            fill
            sizes="268px"
            src="/images/cta-profile-ashadul-wide.png"
          />
        </div>
        <div className="flex h-[52px] w-full shrink-0 items-center justify-center">
          <a
            className={`relative inline-flex h-[52px] w-full transform-gpu items-center justify-center overflow-hidden bg-[linear-gradient(#fff6f5_32%,#ffaea6_100%)] font-sans text-base leading-[1.2] font-semibold tracking-[-0.32px] text-[#c71900] shadow-[inset_0_2px_0_#fff,inset_0_-12px_34px_17px_rgba(255,30,0,0.45),inset_0_-5px_0_#ff6452] outline-none transition-[box-shadow,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[#a81200] group-hover:shadow-[inset_0_2px_0_#fff,inset_0_-22px_34px_16px_rgba(255,30,0,0.52),inset_0_-2px_0_#ff5240] group-focus-within:text-[#a81200] group-focus-within:shadow-[inset_0_2px_0_#fff,inset_0_-22px_34px_16px_rgba(255,30,0,0.52),inset_0_-2px_0_#ff5240] focus-visible:ring-2 focus-visible:ring-white ${contactButtonShape}`}
            href="mailto:ashadulislamsamiul@gmail.com"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(#fff_32%,#ff9387_100%)] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
            />
            <span className="relative z-1 inline-flex items-center gap-2">
              Contact Me <MailIcon />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

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

export default function ContactFooterSection({
  ctaOnly = false,
  workHref = "/portfolio",
}: {
  ctaOnly?: boolean;
  workHref?: string;
} = {}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-[1] bg-black">
      {/* Render top crosshairs outside the overflow-clip section to prevent clipping of the top leg */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-1/2 z-20 h-px -translate-x-1/2 ${frameWidth}`}
      >
        <CrossMark className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <CrossMark className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-400px] bottom-0 -z-10 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 280px, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 280px, black 100%)",
        }}
      >
        <div className="absolute top-[160px] left-1/2 h-[1377.22px] w-[5053.16px] max-w-none -translate-x-1/2 max-[1200px]:hidden">
          <div className="absolute inset-[-23.2%_-4.04%_-14.81%_-4.04%]">
            <Image
              alt=""
              className="object-fill"
              fill
              sizes="5462px"
              src="/images/cta-gradient-figma-wide.svg"
            />
          </div>
        </div>

        <div className="absolute top-[80px] left-[calc(50%_-_44px)] hidden h-[1528px] w-[3048px] max-w-none -translate-x-1/2 max-[640px]:block">
          <Image
            alt=""
            className="object-fill max-[640px]:brightness-90"
            fill
            sizes="3048px"
            src="/images/figma-footer-mobile-gradient.svg"
          />
        </div>

        <div className="absolute top-[80px] left-1/2 hidden h-[1528px] w-[3048px] max-w-none -translate-x-1/2 min-[641px]:max-[1200px]:block">
          <Image
            alt=""
            className="object-fill brightness-90"
            fill
            sizes="3048px"
            src="/images/figma-footer-mobile-gradient.svg"
          />
        </div>
      </div>

      <section
        aria-labelledby="contact-heading"
        className="relative z-1 w-full overflow-clip border-t border-white/12 max-[640px]:border-white/28 text-white"
        id="contact"
      >
      <div
        className={`relative flex flex-col items-center gap-20 border-x border-b border-white/12 max-[640px]:border-white/28 max-[1200px]:gap-16 max-[640px]:gap-14 max-[640px]:pt-14 ${ctaOnly ? "min-h-[720px] pt-[120px] pb-[120px] max-[1200px]:min-h-[900px] max-[1200px]:pt-24 max-[1200px]:pb-24 max-[640px]:min-h-0 max-[640px]:pb-20" : "pt-[120px] pb-0 max-[1200px]:pt-24"} ${frameWidth} ${frameMargin}`}
      >
        <SectionCrosshairs hideTop />
        <div className="relative flex h-[420px] w-full justify-center max-[1200px]:h-auto">
          <h2
            className="m-0 w-[654px] max-w-full text-left font-display text-[160px] leading-[140px] font-black tracking-[-6px] whitespace-nowrap text-white uppercase max-[1200px]:text-center max-[1200px]:text-[clamp(82px,14vw,132px)] max-[1200px]:leading-[0.875] max-[640px]:text-[clamp(58px,19vw,88px)] max-[640px]:tracking-[-4px]"
            id="contact-heading"
          >
            <span className="block">Let&rsquo;s Build</span>
            <span className="block pl-[58px] max-[1200px]:pl-0">Products</span>
            <span className="block">
              That Ship<span className="text-primary">.</span>
            </span>
          </h2>

          <ProfileContactCard
            className="absolute top-[135.25px] left-[182px] rotate-[-5.67deg] max-[1200px]:left-[82px] max-[1200px]:hidden"
            reduceMotion={reduceMotion}
          />
        </div>

        <ProfileContactCard
          className="hidden max-[1200px]:relative max-[1200px]:block max-[1200px]:shrink-0"
          reduceMotion={reduceMotion}
        />

        {!ctaOnly ? <footer className="flex w-full flex-col gap-12 border-t border-white/12 py-8 text-white max-[640px]:border-white/28 min-[1201px]:gap-10 min-[1201px]:py-10">
          <div className="flex w-full items-start justify-between px-8 max-[1200px]:flex-col max-[1200px]:gap-10 max-[640px]:px-5">
            <div className="flex flex-col gap-4 text-white">
              <p className="m-0 font-sans text-base leading-[22px] font-medium tracking-[-0.32px] opacity-80">
                Email
              </p>
              <a
                className={`${footerTextLink} font-sans text-[32px] leading-[1.2] font-semibold tracking-[-0.5px] max-[640px]:text-xl`}
                href="mailto:ashadulislamsamiul@gmail.com"
              >
                ashadulislamsamiul@gmail.com
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <p className="m-0 font-sans text-base leading-[22px] font-medium tracking-[-0.32px] text-white opacity-80">
                Social
              </p>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    aria-label={social.label}
                    className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full text-black outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    href={social.href}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full bg-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-[transform,box-shadow] duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.34),0_10px_28px_rgba(0,0,0,0.24)] group-focus-visible:scale-[1.06] group-focus-visible:shadow-[0_0_0_1px_rgba(255,255,255,0.34),0_10px_28px_rgba(0,0,0,0.24)] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-1 scale-75 rounded-full border border-white/0 opacity-0 transition-[transform,border-color,opacity] duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:border-white/55 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:border-white/55 group-focus-visible:opacity-100 motion-reduce:transition-none"
                    />
                    <Image
                      alt=""
                      className={`relative z-1 shrink-0 transition-none [filter:none] ${social.className ?? ""}`}
                      height={social.height}
                      src={social.icon}
                      style={{ height: social.height, width: social.width }}
                      width={social.width}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/12 max-[640px]:bg-white/28" />

          <div className="flex min-h-[136px] w-full items-center justify-between px-8 font-sans text-xl leading-[1.2] tracking-[-0.5px] max-[1200px]:flex-col max-[1200px]:items-start max-[1200px]:gap-10 max-[640px]:gap-12 max-[640px]:px-5 max-[640px]:text-base min-[1201px]:min-h-[104px] min-[1201px]:grid min-[1201px]:grid-cols-[1fr_auto] min-[1201px]:items-start">
            <p className="m-0 w-[560px] max-w-full font-normal opacity-80 max-[640px]:order-2 max-[640px]:w-full max-[640px]:text-[clamp(10px,3.25vw,14px)] max-[640px]:tracking-[-0.2px] max-[640px]:whitespace-nowrap min-[1201px]:mt-10">
              © 2026 Ashadul. Designed &amp; built with care.
            </p>
            <div className="flex items-start gap-16 max-[640px]:order-1 max-[640px]:flex-col max-[640px]:gap-8 min-[1201px]:grid min-[1201px]:grid-cols-2 min-[1201px]:gap-x-16">
              <div className="flex flex-col gap-3 min-[1201px]:gap-4">
                <p className="m-0 font-normal opacity-80">Quick Links</p>
                <a
                  className={`${footerTextLink} font-semibold min-[1201px]:min-h-6 min-[1201px]:leading-6`}
                  download
                  href="/resume.pdf"
                >
                  My Resume
                </a>
                <a
                  className={`${footerTextLink} font-semibold min-[1201px]:min-h-6 min-[1201px]:leading-6`}
                  href={workHref}
                >
                  My Work
                </a>
              </div>
              <div className="flex flex-col gap-3 min-[1201px]:gap-4">
                <p className="m-0 font-normal opacity-80">Legal</p>
                <span
                  aria-disabled="true"
                  className={`${footerTextLink} font-semibold min-[1201px]:min-h-6 min-[1201px]:leading-6`}
                >
                  Privacy Policy
                </span>
                <span
                  aria-disabled="true"
                  className={`${footerTextLink} font-semibold min-[1201px]:min-h-6 min-[1201px]:leading-6`}
                >
                  Term of service
                </span>
              </div>
            </div>
          </div>
        </footer> : null}
      </div>

      {!ctaOnly ? <FooterWordmark /> : null}
      </section>
    </div>
  );
}
