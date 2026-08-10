"use client";

import { useLayoutEffect } from "react";

const viewportProperty = "--mobile-visual-height";
const gapProperty = "--mobile-hero-gap";
const actionGapProperty = "--mobile-hero-action-gap";
const bottomProperty = "--mobile-hero-bottom";
const topProperty = "--mobile-hero-top";

export default function MobileVisualViewport() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const readViewportWidth = () =>
      Math.round(window.visualViewport?.width ?? window.innerWidth);
    const readStableViewportHeight = () =>
      Math.round(
        Math.min(
          window.innerHeight,
          window.visualViewport?.height ?? window.innerHeight,
        ),
      );

    let lastWidth = readViewportWidth();
    let lockedHeight = readStableViewportHeight();
    let orientationTimer = 0;
    const updateLayout = () => {
      const currentWidth = readViewportWidth();
      const currentHeight = lockedHeight;

      const compact = currentHeight < 680;
      const roomy = currentHeight >= 760;

      // Read all geometry before writing CSS variables. Writing first would
      // invalidate layout and make the following offsetHeight reads force a
      // synchronous reflow on mobile.
      const content = document.querySelector<HTMLElement>("[data-mobile-hero-content]");
      const lead = document.querySelector<HTMLElement>("[data-mobile-hero-lead]");
      const availability = document.querySelector<HTMLElement>("[data-mobile-hero-availability]");
      let top: number | null = null;

      if (content && lead && currentWidth < 640) {
        const availableHeight = currentHeight - 70;
        const leadHeight = lead.offsetHeight;
        const availabilityHeight = availability ? availability.offsetHeight : 24;
        const bottomOffset = currentWidth < 360 ? 32 : 40;
        const remaining = availableHeight - leadHeight - availabilityHeight - bottomOffset;
        top = Math.max(32, Math.min(120, remaining / 2));
      }

      // Keep the initially visible mobile viewport locked. Expanding and
      // collapsing browser chrome must not move the Hero's bottom boundary.
      root.style.setProperty(viewportProperty, `${currentHeight}px`);
      root.style.setProperty(gapProperty, `${roomy ? "40px" : compact ? "28px" : "32px"}`);
      root.style.setProperty(actionGapProperty, `${roomy ? "36px" : "32px"}`);
      root.style.setProperty(bottomProperty, `${currentWidth < 360 ? "32px" : "40px"}`);
      if (top !== null) {
        root.style.setProperty(topProperty, `${Math.round(top)}px`);
      } else {
        root.style.removeProperty(topProperty);
      }
    };

    const handleResize = () => {
      const currentWidth = readViewportWidth();
      // ONLY re-evaluate on rotation/width resize, ignore all vertical scrolling bar collapse events
      if (Math.abs(currentWidth - lastWidth) > 5) {
        lastWidth = currentWidth;
        lockedHeight = readStableViewportHeight();
        updateLayout();
      }
    };

    const handleOrientationChange = () => {
      window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(() => {
        lastWidth = readViewportWidth();
        lockedHeight = readStableViewportHeight();
        updateLayout();
      }, 200);
    };

    // Calculate once on initial mount
    updateLayout();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.clearTimeout(orientationTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      root.style.removeProperty(viewportProperty);
      root.style.removeProperty(gapProperty);
      root.style.removeProperty(actionGapProperty);
      root.style.removeProperty(bottomProperty);
      root.style.removeProperty(topProperty);
    };
  }, []);

  return null;
}
