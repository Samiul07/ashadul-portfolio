"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

type RevealVariant = "fade" | "left" | "right" | "rise" | "soft";

type RevealOptions = {
  delay?: number;
  pageLoad?: boolean;
  variant?: RevealVariant;
};

const revealAttribute = "data-reveal";
const revealedAttribute = "data-revealed";

function isRendered(element: HTMLElement) {
  const style = window.getComputedStyle(element);

  return (
    element.getClientRects().length > 0 &&
    style.display !== "none" &&
    style.visibility !== "hidden"
  );
}

export default function RevealMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;

    // Mobile: skip progressive reveals — sections stay visible/preloaded.
    // Desktop keeps the editorial scroll/page-load reveal system.
    if (isMobileViewport || reducedMotion) {
      root.classList.remove("reveal-motion-ready");
      return;
    }

    const registered = new Set<HTMLElement>();
    const pageLoadElements: HTMLElement[] = [];
    const observedElements: HTMLElement[] = [];
    const animationFrames: number[] = [];

    const register = (
      element: Element | null | undefined,
      {
        delay = 0,
        pageLoad = false,
        variant = "rise",
      }: RevealOptions = {},
    ) => {
      if (!(element instanceof HTMLElement) || !isRendered(element)) {
        return;
      }

      element.setAttribute(revealAttribute, variant);
      element.style.setProperty("--reveal-delay", `${delay}ms`);
      registered.add(element);

      if (pageLoad) {
        pageLoadElements.push(element);
      } else {
        observedElements.push(element);
      }
    };

    const registerAll = (
      selector: string,
      {
        delay = 0,
        stagger = 0,
        variant = "rise",
      }: RevealOptions & { stagger?: number } = {},
    ) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        register(element, {
          delay: delay + index * stagger,
          variant,
        });
      });
    };

    const registerHeading = (
      headingSelector: string,
      delay = 0,
      pageLoad = false,
    ) => {
      const heading = document.querySelector(headingSelector);
      const directPrevious = heading?.previousElementSibling;
      const contextualPrevious =
        directPrevious ?? heading?.parentElement?.previousElementSibling;
      const overline =
        contextualPrevious instanceof HTMLParagraphElement
          ? contextualPrevious
          : null;

      register(overline, { delay, pageLoad, variant: "fade" });
      register(heading, {
        delay: delay + 80,
        pageLoad,
        variant: "rise",
      });
    };

    // Opening composition: portrait establishes the canvas, then the editorial
    // copy, actions, and supporting details arrive in reading order.
    const heroHeading = document.querySelector("#hero-title");
    const heroCopyGroup = heroHeading?.parentElement?.parentElement;
    const heroContent = heroCopyGroup?.parentElement;
    const heroFrame = heroContent?.parentElement;
    const heroPortrait = document.querySelector("#home [data-hero-portrait]");

    register(document.querySelector('nav[aria-label="Primary navigation"]'), {
      delay: 20,
      pageLoad: true,
      variant: "fade",
    });
    register(heroPortrait, {
      delay: 60,
      pageLoad: true,
      variant: "soft",
    });
    register(heroFrame?.lastElementChild, {
      delay: 520,
      pageLoad: true,
      variant: "fade",
    });

    // Proof: compact label followed by a measured metric cadence.
    register(document.querySelector("#stats-heading"), {
      variant: "fade",
    });
    registerAll("#experience article", { delay: 70, stagger: 75 });

    // The marquee already owns horizontal motion; reveal its frame as one unit.
    register(
      document.querySelector(
        'section[aria-label="Brands I\'ve worked with"] > div:last-child',
      ),
      { variant: "soft" },
    );

    // Selected Work owns a scroll-driven card stack on desktop. Only its
    // editorial heading is layered in there; mobile cards can reveal normally.
    document.querySelectorAll("#work h2").forEach((heading) => {
      if (heading instanceof HTMLElement && isRendered(heading)) {
        register(heading.previousElementSibling, { variant: "fade" });
        register(heading, { delay: 80 });
      }
    });
    if (window.matchMedia("(max-width: 1023px)").matches) {
      registerAll("#work article", { delay: 120, stagger: 80 });
    }

    // Testimonial cards are moving marquees, so their internal animation stays
    // pristine while the section title introduces the content.
    registerHeading("#collab-notes-heading");

    // The protected Why Me component is not edited. Its stable outer landmarks
    // are enhanced from here, with the active responsive composition as a unit.
    registerHeading("#why-me-cards-heading");
    const aboutFrame = document.querySelector("#about > div");
    Array.from(aboutFrame?.children ?? [])
      .filter((element) => element.tagName === "DIV")
      .slice(1)
      .forEach((element, index) => {
        register(element, {
          delay: 130 + index * 60,
          variant: "soft",
        });
      });

    registerHeading("#services-heading");
    registerAll(
      'section[aria-labelledby="services-heading"] article',
      { delay: 120, stagger: 65 },
    );

    registerHeading("#process-folder-refined-heading");
    const processHeading = document.querySelector(
      "#process-folder-refined-heading",
    );
    const processGrid = processHeading?.parentElement?.nextElementSibling;
    register(processGrid?.firstElementChild, {
      delay: 130,
      variant: "left",
    });
    register(processGrid?.lastElementChild, {
      delay: 210,
      variant: "right",
    });

    registerHeading("#recognition-heading");
    registerAll("#recognition article", { delay: 110, stagger: 65 });

    registerHeading("#notes-heading");
    const notesHeading = document.querySelector("#notes-heading");
    register(notesHeading?.parentElement?.nextElementSibling, {
      delay: 130,
      variant: "fade",
    });
    registerAll("#notes article", { delay: 150, stagger: 85 });

    register(document.querySelector("#contact-heading"), {
      variant: "rise",
    });
    const contact = document.querySelector("#contact");
    const contactCards = Array.from(
      contact?.querySelectorAll('a[href^="mailto:"]') ?? [],
    )
      .map((link) => {
        let ancestor = link.parentElement;

        while (ancestor && ancestor !== contact) {
          if (ancestor.classList.contains("group")) {
            return ancestor;
          }

          ancestor = ancestor.parentElement;
        }

        return null;
      })
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && isRendered(element),
      );
    contactCards.slice(0, 1).forEach((card) => {
      register(card, { delay: 150, variant: "soft" });
    });
    registerAll("#contact footer > div:first-child > div", {
      delay: 80,
      stagger: 90,
    });
    registerAll("#contact footer > div:last-child > *", {
      delay: 120,
      stagger: 80,
      variant: "fade",
    });

    // Portfolio page landmarks (registered on route change too).
    register(document.querySelector("#portfolio-heading"), {
      delay: 40,
      pageLoad: true,
      variant: "rise",
    });
    registerAll("#portfolio-projects .grid > *", {
      delay: 100,
      stagger: 70,
      variant: "soft",
    });

    // Add the gate only after every target has been marked, preventing a
    // hydration flash while keeping the server-rendered page usable without JS.
    root.classList.add("reveal-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            entry.target.setAttribute(revealedAttribute, "true");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    observedElements.forEach((element) => observer.observe(element));

    animationFrames.push(
      window.requestAnimationFrame(() => {
        animationFrames.push(
          window.requestAnimationFrame(() => {
            pageLoadElements.forEach((element) =>
              element.setAttribute(revealedAttribute, "true"),
            );

            // After all reveal transitions finish (~1.2s is the longest
            // transition + delay), strip will-change so the browser can
            // tear down GPU compositing layers. Lingering will-change +
            // filter: blur(0) create stacking contexts that break mobile
            // touch hit-testing on position-fixed ancestors.
            setTimeout(() => {
              registered.forEach((el) => {
                el.style.willChange = "auto";
              });
            }, 1400);
          }),
        );
      }),
    );

    return () => {
      observer.disconnect();
      animationFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      root.classList.remove("reveal-motion-ready");
      registered.forEach((element) => {
        element.removeAttribute(revealAttribute);
        element.removeAttribute(revealedAttribute);
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
