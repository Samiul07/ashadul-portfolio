"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";

const navLinks = [
  { label: "My Work", href: "/portfolio" },
  { label: "About Me", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Process", href: "#process" },
  { label: "Product Notes", href: "/blog" },
];

/**
 * Read the REAL scroll top from every possible source.
 * Lenis in "native" mode keeps window.scrollY accurate,
 * but some older builds or wrapper modes zero it out.
 * We try every source and take the largest non-zero value.
 */
type PortfolioLenis = {
  scroll?: number;
  on?: (event: "scroll", callback: () => void) => void;
  off?: (event: "scroll", callback: () => void) => void;
};

type PortfolioWindow = Window & {
  __portfolioLenis?: PortfolioLenis;
};

function getScrollTop(): number {
  const a = window.scrollY ?? 0;
  const b = window.pageYOffset ?? 0;
  const c = document.scrollingElement?.scrollTop ?? 0;
  const d = document.documentElement?.scrollTop ?? 0;
  const e = document.body?.scrollTop ?? 0;

  // Also try reading from the Lenis instance
  const lenis = (window as PortfolioWindow).__portfolioLenis;
  const f = lenis?.scroll ?? 0;

  return Math.max(a, b, c, d, e, f);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLElement>(null);
  const scrolledRef = useRef(false);
  const mobileMenuDisclosureRef = useRef<HTMLDetailsElement>(null);
  const mobileMenuSummaryRef = useRef<HTMLElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 0;
    if (scrolledRef.current !== scrolled) {
      scrolledRef.current = scrolled;
      setIsScrolled(scrolled);
    }
  });

  const links =
    pathname === "/portfolio"
      ? [
          { label: "My Work", href: "#portfolio-projects" },
          { label: "About Me", href: "/#about" },
          { label: "Expertise", href: "/#expertise" },
          { label: "Process", href: "/#process" },
          { label: "Product Notes", href: "/blog" },
        ]
      : pathname === "/blog" || pathname.startsWith("/blog/")
        ? [
            { label: "My Work", href: "/portfolio" },
            { label: "About Me", href: "/#about" },
            { label: "Expertise", href: "/#expertise" },
            { label: "Process", href: "/#process" },
            {
              label: "Product Notes",
              href: pathname === "/blog" ? "#blog-posts" : "/blog",
            },
          ]
        : pathname === "/contact"
          ? [
              { label: "My Work", href: "/portfolio" },
              { label: "About Me", href: "/#about" },
              { label: "Expertise", href: "/#expertise" },
              { label: "Process", href: "/#process" },
              { label: "Product Notes", href: "/blog" },
            ]
        : navLinks;

  const contactHref = pathname === "/contact" ? "#contact-form" : "/contact";

  const progressScale = useSpring(scrollYProgress, {
    damping: 34,
    mass: 0.35,
    stiffness: 280,
  });

  const syncScrollState = useCallback(() => {
    const scrollTop = getScrollTop();
    const scrolled = scrollTop > 0;

    if (scrolledRef.current !== scrolled) {
      scrolledRef.current = scrolled;
      setIsScrolled(scrolled);
    }
  }, []);

  useEffect(() => {
    const visualViewport = window.visualViewport;
    const portfolioWindow = window as PortfolioWindow;
    const lenis = portfolioWindow.__portfolioLenis;
    const sentinel = sentinelRef.current;
    const observer = sentinel
      ? new IntersectionObserver(syncScrollState, { threshold: [0, 1] })
      : null;

    syncScrollState();
    observer?.observe(sentinel as HTMLElement);
    lenis?.on?.("scroll", syncScrollState);
    window.addEventListener("scroll", syncScrollState, { passive: true });
    document.addEventListener("scroll", syncScrollState, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", syncScrollState, { passive: true });
    window.addEventListener("orientationchange", syncScrollState, {
      passive: true,
    });
    window.addEventListener("pageshow", syncScrollState);
    document.addEventListener("visibilitychange", syncScrollState);
    visualViewport?.addEventListener("scroll", syncScrollState, {
      passive: true,
    });
    visualViewport?.addEventListener("resize", syncScrollState, {
      passive: true,
    });

    return () => {
      observer?.disconnect();
      lenis?.off?.("scroll", syncScrollState);
      window.removeEventListener("scroll", syncScrollState);
      document.removeEventListener("scroll", syncScrollState, true);
      window.removeEventListener("resize", syncScrollState);
      window.removeEventListener("orientationchange", syncScrollState);
      window.removeEventListener("pageshow", syncScrollState);
      document.removeEventListener("visibilitychange", syncScrollState);
      visualViewport?.removeEventListener("scroll", syncScrollState);
      visualViewport?.removeEventListener("resize", syncScrollState);
    };
  }, [syncScrollState]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1200px)");
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        mobileMenuDisclosureRef.current?.removeAttribute("open");
        setIsMobileMenuOpen(false);
      }
    };
    const closeMenuOnOrientationChange = () => {
      mobileMenuDisclosureRef.current?.removeAttribute("open");
      setIsMobileMenuOpen(false);
    };

    desktopQuery.addEventListener("change", closeMenuOnDesktop);
    window.addEventListener("orientationchange", closeMenuOnOrientationChange);

    return () => {
      desktopQuery.removeEventListener("change", closeMenuOnDesktop);
      window.removeEventListener("orientationchange", closeMenuOnOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector("main");
    const panel = mobileMenuPanelRef.current;
    const firstLink = panel?.querySelector<HTMLAnchorElement>("a[href]");

    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        mobileMenuDisclosureRef.current?.removeAttribute("open");
        setIsMobileMenuOpen(false);
        requestAnimationFrame(() => mobileMenuSummaryRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = [
        mobileMenuSummaryRef.current,
        ...(panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? []),
      ].filter((element): element is HTMLElement => Boolean(element));

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Closing through React is an enhancement; the native disclosure still
  // opens and closes when JavaScript is unavailable or hydration has failed.
  const closeMobileMenu = () => {
    mobileMenuDisclosureRef.current?.removeAttribute("open");
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        ref={sentinelRef}
        className="h-[86px] w-full max-[1200px]:h-[70px]"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[196] hidden h-[70px] bg-black max-[1200px]:block"
        data-mobile-header-background
      />
      <header
        className="fixed inset-x-0 top-0 z-[1100] h-[86px] w-full pointer-events-auto max-[1200px]:h-[70px]"
        data-scroll-state={isScrolled ? "scrolled" : "top"}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 max-[1200px]:hidden"
          data-header-surface
          style={{
            backgroundColor: "rgba(0,0,0,0.78)",
            boxShadow: isScrolled
              ? "0 18px 70px rgba(0,0,0,0.42)"
              : "none",
            opacity: isScrolled ? 1 : 0,
            WebkitBackdropFilter: isScrolled
              ? "blur(18px) saturate(125%)"
              : "none",
            backdropFilter: isScrolled
              ? "blur(18px) saturate(125%)"
              : "none",
          }}
        />
        <nav
          className="relative z-[250] ml-[calc((100vw-1400px)/2)] grid h-[86px] w-[1400px] grid-cols-[250px_1fr_250px] items-center max-[1439px]:mx-auto max-[1439px]:w-[calc(100%_-_48px)] max-[1200px]:h-[70px] max-[1200px]:w-[calc(100%_-_48px)] max-[1200px]:grid-cols-[auto_1fr_auto] max-[640px]:w-[calc(100%_-_40px)] pointer-events-auto"
          aria-label="Primary navigation"
        >
          <div className="flex items-center">
            <Link
              href="/"
              className="block h-10 w-[131px] no-underline max-[1200px]:h-9 max-[1200px]:w-[118px] max-[359px]:w-[104px]"
              aria-label="Ashadul home"
            >
              <Image
                alt="Ashadul"
                className="block h-10 w-[131px] object-contain object-left max-[1200px]:h-9 max-[1200px]:w-[118px] max-[359px]:w-[104px]"
                height={40}
                loading="eager"
                quality={60}
                src="/images/logo.png"
                width={131}
              />
            </Link>
          </div>

          <div className="relative flex h-11 items-center justify-center gap-7 max-[1200px]:hidden">
            {links.map((link) => (
              <Link
                key={link.label}
                className="relative z-2 font-sans text-[15px] font-light leading-[1.4] tracking-[-0.5px] uppercase no-underline text-white/68 transition-[color,opacity] duration-200 hover:text-white"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <Link
              className="relative inline-flex h-[52px] w-[146px] items-center justify-center gap-2 overflow-hidden rounded-[2px] bg-white px-6 py-3 font-sans text-base leading-[22px] font-normal tracking-[-0.32px] whitespace-nowrap text-black no-underline transition-[color,background-color] duration-200 [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))] hover:bg-primary hover:text-white max-[1200px]:h-11 max-[1200px]:w-auto max-[1200px]:gap-1.5 max-[1200px]:px-3.5 max-[1200px]:text-[13px] max-[1200px]:[clip-path:polygon(0_0,calc(100%_-_10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%_-_10px))] max-[359px]:px-3"
              href={contactHref}
            >
              Let&apos;s Talk
              <svg aria-hidden="true" className="h-6 w-6 shrink-0 max-[359px]:hidden" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17 17 7M17 7H8M17 7v9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <details
              ref={mobileMenuDisclosureRef}
              className="group relative z-[260] hidden shrink-0 max-[1200px]:block"
              data-mobile-menu-disclosure
            >
              <summary
                ref={mobileMenuSummaryRef}
                aria-controls="mobile-primary-navigation"
                aria-label="Toggle navigation menu"
                className="relative flex h-11 w-11 touch-manipulation select-none cursor-pointer list-none items-center justify-center border border-white/20 bg-black text-white [-webkit-tap-highlight-color:transparent] transition-[border-color,background-color,color] duration-200 hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"
                data-mobile-menu-button
                onClick={(event) => {
                  event.preventDefault();
                  const nextOpenState = !isMobileMenuOpen;
                  if (mobileMenuDisclosureRef.current) {
                    mobileMenuDisclosureRef.current.open = nextOpenState;
                  }
                  setIsMobileMenuOpen(nextOpenState);
                }}
              >
                <span className="sr-only">Menu</span>
                <span aria-hidden="true" className="relative block h-4 w-5">
                  <span className="absolute left-0 top-[3px] block h-px w-5 bg-current transition-transform duration-300 group-open:translate-y-[5px] group-open:rotate-45" />
                  <span className="absolute bottom-[3px] left-0 block h-px w-5 bg-current transition-transform duration-300 group-open:-translate-y-[5px] group-open:-rotate-45" />
                </span>
              </summary>

              <div
                className="fixed inset-x-0 bottom-0 top-[70px] z-[1099] overflow-hidden bg-black text-white"
                data-mobile-menu-overlay
                id="mobile-primary-navigation"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_82%,rgba(255,34,0,0.22),transparent_38%)]"
                />
                <div
                  ref={mobileMenuPanelRef}
                  className="relative mx-auto flex h-full w-[calc(100%_-_40px)] flex-col overflow-y-auto border-x border-white/12"
                >
                  <nav
                    aria-label="Mobile primary navigation"
                    className="flex flex-1 flex-col justify-center py-6"
                  >
                    {links.map((link, index) => (
                      <Link
                        className="group flex min-h-[66px] items-center gap-4 border-b border-white/12 px-5 py-3 no-underline first:border-t hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none"
                        href={link.href}
                        key={link.label}
                        onClick={closeMobileMenu}
                      >
                        <span className="w-7 shrink-0 font-sans text-[11px] font-medium tracking-[0.12em] text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[clamp(34px,10vw,48px)] leading-[0.92] font-black tracking-[-0.04em] text-white uppercase transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t border-white/12 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-5">
                    <div className="mb-4 flex items-center gap-2 font-sans text-[11px] font-medium tracking-[0.12em] text-white/55 uppercase">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#39ff88] shadow-[0_0_12px_rgba(57,255,136,0.65)]" />
                      Available for select projects
                    </div>
                    <Link
                      className="flex h-14 w-full items-center justify-between bg-white px-5 font-sans text-base font-medium text-black no-underline transition-colors duration-200 [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))] hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      href={contactHref}
                      onClick={closeMobileMenu}
                    >
                      <span className="max-[359px]:hidden">Let&apos;s build something meaningful</span>
                      <span className="hidden max-[359px]:inline">Let&apos;s Talk</span>
                      <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 17 17 7M17 7H8M17 7v9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </nav>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden h-px bg-white/12 max-[1200px]:block"
          data-mobile-header-divider
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-white/12 max-[1200px]:hidden"
          data-desktop-header-divider
        />
      </header>

      {/* Scroll Progress Bar */}
      <div
        className={`pointer-events-none fixed inset-x-0 top-[85px] h-[3px] min-[641px]:max-[1200px]:top-[69px] max-[640px]:hidden ${isScrolled ? "z-[302]" : "z-[9]"}`}
        data-scroll-progress
        style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] origin-left bg-primary"
          style={{ scaleX: progressScale }}
        />
      </div>

    </>
  );
}
