"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const trailLayers = [
  { color: "#ff1e00", points: 40 },
  { color: "rgba(255, 255, 255, 0.16)", points: 32 },
  { color: "rgba(255, 255, 255, 0.32)", points: 24 },
  { color: "rgba(255, 255, 255, 0.52)", points: 16 },
  { color: "rgba(255, 255, 255, 0.64)", points: 8 },
] as const;

type Point = {
  x: number;
  y: number;
};

type TrailPath = SVGPathElement & {
  points?: Point[];
};

const smoothingDuration = 300;

export default function CursorTrail() {
  const pathRefs = useRef<Array<TrailPath | null>>([]);
  const currentPoint = useRef<Point | null>(null);
  const targetPoint = useRef<Point | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const paths = pathRefs.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (reducedMotion.matches || !finePointer.matches) return;

    let followerFrame = 0;
    let trailFrame = 0;
    let hasStarted = false;

    const updateFollower = () => {
      const current = currentPoint.current;
      const target = targetPoint.current;

      if (current && target) {
        gsap.to(current, {
          duration: smoothingDuration / 1000,
          ease: "power2.out",
          x: target.x,
          y: target.y,
        });
      }

      followerFrame = requestAnimationFrame(updateFollower);
    };

    const drawTrails = () => {
      const current = currentPoint.current;

      if (current) {
        paths.forEach((path, index) => {
          if (!path) return;

          const points = path.points ?? [];
          points.unshift({ ...current });
          points.length = Math.min(points.length, trailLayers[index].points);
          path.points = points;

          if (points.length > 1) {
            path.setAttribute(
              "d",
              points
                .map(
                  (point, pointIndex) =>
                    `${pointIndex === 0 ? "M" : "L"} ${point.x} ${point.y}`,
                )
                .join(" "),
            );
          }
        });
      }

      trailFrame = requestAnimationFrame(drawTrails);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!hasStarted) {
        const initialPoint = { x: event.clientX, y: event.clientY };
        currentPoint.current = { ...initialPoint };
        targetPoint.current = { ...initialPoint };
        hasStarted = true;
        setIsVisible(true);
        followerFrame = requestAnimationFrame(updateFollower);
        trailFrame = requestAnimationFrame(drawTrails);
      }

      targetPoint.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(followerFrame);
      cancelAnimationFrame(trailFrame);
      if (currentPoint.current) {
        gsap.killTweensOf(currentPoint.current);
      }
      paths.forEach((path) => {
        if (path) path.points = [];
      });
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none max-[768px]:hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {trailLayers.map((layer, index) => (
        <svg
          className="absolute inset-0 h-full w-full"
          key={layer.color}
          preserveAspectRatio="none"
        >
          <path
            className="trail"
            fill="none"
            ref={(path) => {
              pathRefs.current[index] = path as TrailPath | null;
            }}
            stroke={layer.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ))}
    </div>
  );
}
