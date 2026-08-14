"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";

interface Card {
  id: number;
  image: string;
  title: string;
}

const galleryCards: Card[] = [
  { id: 1, image: "/images/gallery-project-01.png", title: "Phone on Stone stand" },
  { id: 2, image: "/images/gallery-project-02.png", title: "Runner in desert" },
  { id: 3, image: "/images/gallery-project-03.png", title: "Girl close up face" },
  { id: 4, image: "/images/gallery-project-04.png", title: "Orange house mockup" },
  { id: 5, image: "/images/gallery-project-05.png", title: "Phone held in hand" },
  { id: 6, image: "/images/gallery-project-06.png", title: "Dashboard laptop mockup" },
  { id: 7, image: "/images/gallery-project-07.png", title: "Goggles front view" },
  { id: 8, image: "/images/gallery-project-08.png", title: "Forest field landscape" },
  { id: 9, image: "/images/gallery-project-09.png", title: "Goggles side profile" },
  { id: 10, image: "/images/gallery-project-10.png", title: "Northwind Finance" },
  { id: 11, image: "/images/gallery-project-11.png", title: "Luminix Home" },
  { id: 12, image: "/images/gallery-project-12.png", title: "Folio Dashboard" },
  { id: 13, image: "/images/gallery-project-13.png", title: "Traffic Management" },
  { id: 14, image: "/images/gallery-project-14.png", title: "AI Judgment Note" },
  { id: 15, image: "/images/gallery-project-15.png", title: "Conversion Thinking Note" },
  { id: 16, image: "/images/gallery-project-16.png", title: "Product Flows Note" },
];

function MobileGalleryButton() {
  return (
    <a
      className="relative flex w-[calc(100%_-_96px)] max-w-[560px] items-center justify-center overflow-visible p-2 outline-none focus-visible:ring-2 focus-visible:ring-white max-[640px]:w-[calc(100%_-_48px)] max-[640px]:max-w-[330px]"
      href="/portfolio"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/5 shadow-[inset_0_-1px_0_rgba(255,255,255,0.25),inset_0_2px_2px_rgba(189,22,0,0.49),inset_0_7px_10px_rgba(0,0,0,0.04)] backdrop-blur-[1px] [clip-path:polygon(0_0,calc(100%_-_26px)_0,100%_26px,100%_100%,26px_100%,0_calc(100%_-_26px))]"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M 0 0 L 74 0 L 100 26 L 100 100 L 26 100 L 0 74 Z"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.45"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="relative flex min-h-[112px] w-full items-center justify-center bg-[linear-gradient(#fff6f5_32%,#ffaea6_100%)] px-6 py-5 text-center shadow-[inset_0_2px_0_#fff,inset_0_-12px_34px_17px_rgba(255,30,0,0.45),inset_0_-5px_0_#ff6452] [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%_-_20px))] max-[640px]:min-h-[96px] max-[640px]:px-4">
        <span className="bg-[linear-gradient(0deg,#b51200_14%,#ff1e00_87%)] bg-clip-text font-sans text-[clamp(28px,4vw,44px)] leading-[1.08] font-semibold tracking-[-0.5px] text-transparent max-[640px]:text-[clamp(20px,6.2vw,28px)]">
          View All My Projects
        </span>
      </span>
    </a>
  );
}

export default function ProjectGallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [windowWidth, setWindowWidth] = useState(1920);
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonRevealed, setIsButtonRevealed] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const buttonOuterRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!buttonOuterRef.current) return;

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const updateDimensions = () => {
      if (buttonOuterRef.current) {
        setDimensions({
          width: buttonOuterRef.current.offsetWidth,
          height: buttonOuterRef.current.offsetHeight,
        });
      }
    };

    const scheduleDimensionsUpdate = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 150);
    };

    updateDimensions();
    const observer = new ResizeObserver(scheduleDimensionsUpdate);
    observer.observe(buttonOuterRef.current);
    return () => {
      clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, []);

  // Responsive scale handler to adapt base dimensions on smaller viewports
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const updateViewport = () => {
      const width = document.documentElement.clientWidth;
      setWindowWidth(width);

      if (width < 640) {
        setScaleMultiplier(0.28); // Mobile
      } else if (width < 1024) {
        setScaleMultiplier(0.48); // Tablet
      } else if (width < 1440) {
        setScaleMultiplier(0.72); // Small Laptop
      } else {
        setScaleMultiplier(1); // Large Screen
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateViewport, 150);
    };

    resizeTimer = setTimeout(updateViewport, 0);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // Track scroll progress of the entire section height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll progress using a spring for physics, damping, and inertia
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 48,
    mass: 1.15,
  });

  // 1. Dynamic card sizes (initial zoomed-in vs final zoomed-out 4:3 ratio)
  const initialCardWidth = 750 * 1.55 * scaleMultiplier;
  const initialCardHeight = 562.5 * 1.55 * scaleMultiplier;
  const finalCardWidth = (windowWidth - 60) / 4;
  const finalCardHeight = finalCardWidth * 0.75;

  // 2. Entire grid translation Y
  const gridY = 0;

  // 3. Autonomous synchronized trigger: when user scrolls into section, animate everything together
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.25) {
      setIsButtonRevealed(true);
    } else if (latest <= 0.12) {
      setIsButtonRevealed(false);
    }
  });

  const buttonOutlinePath = useMemo(() => {
    const width = dimensions.width || 500;
    const height = dimensions.height || 180;
    return `M 0 0 L ${width - 56} 0 L ${width} 56 L ${width} ${height} L 56 ${height} L 0 ${height - 56} Z`;
  }, [dimensions.height, dimensions.width]);

  // Split cards into 4 columns (matches 4x4 layout: 4 horizontal rows of 4 cards each)
  const col1Cards = [galleryCards[0], galleryCards[4], galleryCards[8], galleryCards[12]];
  const col2Cards = [galleryCards[1], galleryCards[5], galleryCards[9], galleryCards[13]];
  const col3Cards = [galleryCards[2], galleryCards[6], galleryCards[10], galleryCards[14]];
  const col4Cards = [galleryCards[3], galleryCards[7], galleryCards[11], galleryCards[15]];
  return (
    <>
      <section
        aria-label="More Selected Projects"
        className="relative z-[100] hidden h-[100svh] min-h-[680px] w-full overflow-hidden bg-black max-[1200px]:block max-[640px]:min-h-[600px]"
      >
        <div className="absolute top-0 left-1/2 z-10 grid w-[112vw] -translate-x-1/2 grid-cols-4 gap-2 bg-black max-[640px]:w-[122vw] max-[640px]:grid-cols-3 max-[640px]:gap-1.5">
          {galleryCards.map((card) => (
            <div
              className="relative aspect-[4/3] overflow-hidden bg-neutral-900"
              key={card.id}
            >
              <Image
                alt={card.title}
                className="object-cover"
                fill
                loading="lazy"
                quality={60}
                sizes="(max-width: 639px) 42vw, 30vw"
                src={card.image.replace(".png", "-mobile.webp")}
              />
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 38%, rgba(0, 0, 0, 0.16) 47%, rgba(0, 0, 0, 0.68) 58%, black 69%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 38%, rgba(0, 0, 0, 0.16) 47%, rgba(0, 0, 0, 0.68) 58%, black 69%)",
          }}
        />

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-25 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
        >
          <defs>
            <linearGradient id="mobile-gallery-red-field" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff7568" stopOpacity="0.26" />
              <stop offset="18%" stopColor="#ff4736" stopOpacity="0.62" />
              <stop offset="42%" stopColor="#ff2814" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d91600" stopOpacity="0.96" />
            </linearGradient>
            <filter id="mobile-gallery-red-haze" x="-12%" y="-12%" width="124%" height="124%">
              <feGaussianBlur stdDeviation="68" />
            </filter>
            <filter id="mobile-gallery-red-edge" x="-8%" y="-8%" width="116%" height="116%">
              <feGaussianBlur stdDeviation="30" />
            </filter>
            <filter id="mobile-gallery-red-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="24" />
            </filter>
          </defs>
          <path
            d="M-60 500 C142 492 255 419 426 438 C603 458 742 391 1060 458 L1060 1040 L-60 1040 Z"
            fill="#ff3d2a"
            filter="url(#mobile-gallery-red-haze)"
            opacity="0.42"
          />
          <path
            d="M-60 535 C151 524 271 447 438 465 C614 484 753 414 1060 486"
            fill="none"
            filter="url(#mobile-gallery-red-glow)"
            opacity="0.58"
            stroke="#ff6b5a"
            strokeWidth="24"
          />
          <path
            d="M-60 535 C151 524 271 447 438 465 C614 484 753 414 1060 486 L1060 1040 L-60 1040 Z"
            fill="url(#mobile-gallery-red-field)"
            filter="url(#mobile-gallery-red-edge)"
          />
        </svg>

        <div className="pointer-events-auto absolute inset-x-0 top-[68%] z-30 flex -translate-y-1/2 justify-center max-[640px]:top-[calc(70%_-_20px)]">
          <MobileGalleryButton />
        </div>
      </section>

      <section
        ref={containerRef}
        aria-label="More Selected Projects"
        className="relative z-[100] mt-[calc(1217px-100vh)] hidden h-[180vh] w-full overflow-visible bg-black min-[1200px]:block"
      >
        {/* Sticky wrapper aligned to the bottom of the hovering header (top-[86px]) with height adjusted and overflow-hidden to prevent grid from going under navbar */}
        <div className="sticky top-[86px] max-[768px]:top-[70px] h-[calc(100vh-86px)] max-[768px]:h-[calc(100vh-70px)] w-full overflow-hidden flex items-start justify-center bg-transparent z-[20]">
          {/* Borders matching other portfolio layout frames (inside sticky wrapper for proper masking and z-index below cards) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[50vw] z-[10] box-content w-[1400px] -translate-x-1/2 border-x border-white/12 max-[1439px]:w-[calc(100%_-_48px)]"
          />

          {/* 4x3 Grid Wrapper (Full screen layout with 4 columns of 3 rows) */}
          <motion.div
            className="relative flex flex-row gap-5 items-center justify-center overflow-visible select-none z-[20]"
            style={{ y: gridY }}
          >
            {/* Column 1 */}
            <div className="flex flex-col gap-5 h-full overflow-visible shrink-0">
              {col1Cards.map((card) => (
                <motion.div
                  key={card.id}
                  animate={{
                    width: isButtonRevealed ? finalCardWidth : initialCardWidth,
                    height: isButtonRevealed ? finalCardHeight : initialCardHeight,
                  }}
                  initial={false}
                  transition={{
                    duration: isButtonRevealed ? 1.2 : 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative overflow-hidden rounded-none border border-white/10 bg-neutral-900 select-none shrink-0"
                >
                  <Image
                    alt={card.title}
                    className="object-cover"
                    fill
                    loading="lazy"
                    sizes="750px"
                    src={card.image}
                  />
                </motion.div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-5 h-full overflow-visible shrink-0">
              {col2Cards.map((card) => (
                <motion.div
                  key={card.id}
                  animate={{
                    width: isButtonRevealed ? finalCardWidth : initialCardWidth,
                    height: isButtonRevealed ? finalCardHeight : initialCardHeight,
                  }}
                  initial={false}
                  transition={{
                    duration: isButtonRevealed ? 1.2 : 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative overflow-hidden rounded-none border border-white/10 bg-neutral-900 select-none shrink-0"
                >
                  <Image
                    alt={card.title}
                    className="object-cover"
                    fill
                    loading="lazy"
                    sizes="750px"
                    src={card.image}
                  />
                </motion.div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-5 h-full overflow-visible shrink-0">
              {col3Cards.map((card) => (
                <motion.div
                  key={card.id}
                  animate={{
                    width: isButtonRevealed ? finalCardWidth : initialCardWidth,
                    height: isButtonRevealed ? finalCardHeight : initialCardHeight,
                  }}
                  initial={false}
                  transition={{
                    duration: isButtonRevealed ? 1.2 : 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative overflow-hidden rounded-none border border-white/10 bg-neutral-900 select-none shrink-0"
                >
                  <Image
                    alt={card.title}
                    className="object-cover"
                    fill
                    loading="lazy"
                    sizes="750px"
                    src={card.image}
                  />
                </motion.div>
              ))}
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-5 h-full overflow-visible shrink-0">
              {col4Cards.map((card) => (
                <motion.div
                  key={card.id}
                  animate={{
                    width: isButtonRevealed ? finalCardWidth : initialCardWidth,
                    height: isButtonRevealed ? finalCardHeight : initialCardHeight,
                  }}
                  initial={false}
                  transition={{
                    duration: isButtonRevealed ? 1.2 : 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative overflow-hidden rounded-none border border-white/10 bg-neutral-900 select-none shrink-0"
                >
                  <Image
                    alt={card.title}
                    className="object-cover"
                    fill
                    loading="lazy"
                    sizes="750px"
                    src={card.image}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Blur only the portion of the grid that has entered the red field. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-24"
            animate={{ opacity: isButtonRevealed ? 1 : 0 }}
            initial={false}
            transition={{
              duration: isButtonRevealed ? 1.1 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              maskImage:
                "radial-gradient(ellipse 78% 55% at 51% 0%, transparent 0%, transparent 33%, rgba(0, 0, 0, 0.16) 45%, rgba(0, 0, 0, 0.68) 63%, black 79%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 78% 55% at 51% 0%, transparent 0%, transparent 33%, rgba(0, 0, 0, 0.16) 45%, rgba(0, 0, 0, 0.68) 63%, black 79%)",
            }}
          />

          {/* Asymmetric red field with a soft, intentionally irregular edge. */}
          <motion.svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-25 h-full w-full"
            preserveAspectRatio="none"
            animate={{ opacity: isButtonRevealed ? 1 : 0 }}
            initial={false}
            transition={{
              duration: isButtonRevealed ? 1.1 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewBox="0 0 1000 1000"
          >
            <defs>
              <linearGradient id="gallery-red-field" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ff7568" stopOpacity="0.26" />
                <stop offset="18%" stopColor="#ff4736" stopOpacity="0.62" />
                <stop offset="42%" stopColor="#ff2814" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d91600" stopOpacity="0.96" />
              </linearGradient>
              <filter id="gallery-red-haze" x="-12%" y="-12%" width="124%" height="124%">
                <feGaussianBlur stdDeviation="68" />
              </filter>
              <filter id="gallery-red-soft-edge" x="-8%" y="-8%" width="116%" height="116%">
                <feGaussianBlur stdDeviation="30" />
              </filter>
              <filter id="gallery-red-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="24" />
              </filter>
            </defs>
            <path
              d="M-40 28 C82 83 145 247 269 349 C350 416 425 378 501 390 C581 402 629 443 713 407 C826 359 903 142 1040 6 L1040 1040 L-40 1040 Z"
              fill="#ff3d2a"
              filter="url(#gallery-red-haze)"
              opacity="0.42"
            />
            <path
              d="M-40 127 C91 181 163 347 291 438 C375 498 444 466 516 476 C591 486 641 522 726 488 C835 444 912 225 1040 94"
              fill="none"
              filter="url(#gallery-red-glow)"
              opacity="0.58"
              stroke="#ff6b5a"
              strokeWidth="24"
            />
            <path
              d="M-40 127 C91 181 163 347 291 438 C375 498 444 466 516 476 C591 486 641 522 726 488 C835 444 912 225 1040 94 L1040 1040 L-40 1040 Z"
              fill="url(#gallery-red-field)"
              filter="url(#gallery-red-soft-edge)"
            />
          </motion.svg>

          <motion.div
            animate={
              isButtonRevealed
                ? { filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }
                : { filter: "blur(16px)", opacity: 0, scale: 0.82, y: 32 }
            }
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
            initial={false}
            transition={
              isButtonRevealed
                ? {
                    duration: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.72, ease: "easeOut" },
                  }
                : { duration: 0.42, ease: [0.4, 0, 1, 1] }
            }
          >
            {/* The Framer shadow stack sits outside the two clipped surfaces. */}
            <div
              className={`relative ${
                isButtonRevealed ? "pointer-events-auto" : "pointer-events-none"
              }`}
              style={{
                filter: isHovered
                  ? `
                    drop-shadow(0px 7.9px 14.2px rgba(153, 0, 0, 0.075))
                    drop-shadow(0px 21.2px 38.2px rgba(153, 0, 0, 0.094))
                    drop-shadow(0px 59.9px 107.8px rgba(153, 0, 0, 0.16))
                    drop-shadow(0px 109px 196.2px rgba(153, 0, 0, 0.24))
                  `
                  : `
                    drop-shadow(0px 7.9px 14.2px rgba(153, 0, 0, 0.06))
                    drop-shadow(0px 21.2px 38.2px rgba(153, 0, 0, 0.075))
                    drop-shadow(0px 59.9px 107.8px rgba(153, 0, 0, 0.12))
                    drop-shadow(0px 109px 196.2px rgba(153, 0, 0, 0.18))
                  `,
                transform: "none",
                transition: "filter 300ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <a
                ref={buttonOuterRef}
                href="/portfolio"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                className="relative flex items-center justify-center overflow-visible p-[12px] pointer-events-auto outline-none"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backdropFilter: "blur(1px)",
                    WebkitBackdropFilter: "blur(1px)",
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    boxShadow:
                      "rgba(255, 255, 255, 0.25) 0 -1px 0 inset, rgba(189, 22, 0, 0.49) 0 2px 2px inset, rgba(0, 0, 0, 0.04) 0 7px 10px inset",
                    clipPath:
                      "polygon(0 0, calc(100% - 56px) 0, 100% 56px, 100% 100%, 56px 100%, 0 calc(100% - 56px))",
                    transform: isHovered ? "scale(1.042, 1.12)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: 0,
                  }}
                />

                {/* A vector outline keeps the border clean along both diagonal cuts. */}
                <svg
                  className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
                  style={{
                    transform: isHovered ? "scale(1.042, 1.12)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: 1,
                  }}
                >
                  <path
                    d={buttonOutlinePath}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.17)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <span
                  className="relative flex items-center justify-center px-12 py-8 md:px-20 md:py-12 select-none cursor-pointer"
                  style={{
                    background: isHovered
                      ? "linear-gradient(rgb(255, 255, 255) 32%, rgb(255, 147, 135) 100%)"
                      : "linear-gradient(rgb(255, 246, 245) 32%, rgb(255, 174, 166) 100%)",
                    boxShadow: isHovered
                      ? "rgb(255, 255, 255) 0 2px 0 inset, rgba(255, 30, 0, 0.52) 0 -22px 34px 16px inset, rgb(255, 82, 64) 0 -2px 0 inset"
                      : "rgb(255, 255, 255) 0 2px 0 inset, rgba(255, 30, 0, 0.45) 0 -12px 34px 17px inset, rgb(255, 100, 82) 0 -5px 0 inset",
                    clipPath:
                      "polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 44px 100%, 0 calc(100% - 44px))",
                    transition: "background 300ms ease, box-shadow 300ms ease",
                    zIndex: 2,
                  }}
                >
                  <span
                    className="block bg-clip-text pb-3 font-sans text-[36px] leading-[1.25] font-semibold tracking-[-0.01em] text-transparent select-none sm:text-[48px] md:text-[64px] lg:text-[77px]"
                    style={{
                      backgroundImage: "linear-gradient(0deg, rgb(181, 18, 0) 14%, rgb(255, 30, 0) 87%)",
                    }}
                  >
                    View All My Projects
                  </span>
                </span>
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
