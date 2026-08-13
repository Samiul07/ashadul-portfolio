"use client";

import { useEffect, useRef, useState } from "react";

const trailLayers = [
  { color: "#ff1e00", points: 18 },
  { color: "rgba(255, 255, 255, 0.2)", points: 14 },
  { color: "rgba(255, 255, 255, 0.4)", points: 10 },
  { color: "rgba(255, 255, 255, 0.65)", points: 6 },
] as const;

type Point = {
  x: number;
  y: number;
};

export default function CursorTrail() {
  const lineRefs = useRef<Array<Array<SVGLineElement | null>>>(
    trailLayers.map((layer) => new Array(layer.points - 1).fill(null)),
  );
  const layerPoints = useRef<Array<Point[]>>(
    trailLayers.map(() => []),
  );
  const currentPoint = useRef<Point | null>(null);
  const targetPoint = useRef<Point | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
        current.x += (target.x - current.x) / 5;
        current.y += (target.y - current.y) / 5;
      }

      followerFrame = requestAnimationFrame(updateFollower);
    };

    const drawTrails = () => {
      const current = currentPoint.current;

      if (current) {
        trailLayers.forEach((layer, layerIndex) => {
          const points = layerPoints.current[layerIndex];
          points.unshift({ x: current.x, y: current.y });
          if (points.length > layer.points) {
            points.length = layer.points;
          }

          const lines = lineRefs.current[layerIndex];
          const totalSegments = layer.points - 1;

          for (let i = 0; i < totalSegments; i++) {
            const line = lines?.[i];
            if (!line) continue;

            if (i < points.length - 1) {
              const p1 = points[i];
              const p2 = points[i + 1];
              line.setAttribute("x1", String(p1.x));
              line.setAttribute("y1", String(p1.y));
              line.setAttribute("x2", String(p2.x));
              line.setAttribute("y2", String(p2.y));
              line.style.display = "";
            } else {
              line.style.display = "none";
            }
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
      layerPoints.current.forEach((points) => {
        points.length = 0;
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
      {trailLayers.map((layer, layerIndex) => {
        const totalSegments = layer.points - 1;
        return (
          <svg
            className="absolute inset-0 h-full w-full"
            key={layer.color + layer.points}
            preserveAspectRatio="none"
          >
            {Array.from({ length: totalSegments }).map((_, segmentIndex) => {
              // Diminishes smoothly from 100% opacity at head to ~5% at tail tip
              const opacity = Math.max(
                0.05,
                1 - segmentIndex / totalSegments,
              );

              return (
                <line
                  key={segmentIndex}
                  ref={(el) => {
                    if (lineRefs.current[layerIndex]) {
                      lineRefs.current[layerIndex][segmentIndex] = el;
                    }
                  }}
                  stroke={layer.color}
                  strokeLinecap="round"
                  strokeOpacity={opacity}
                  strokeWidth="2"
                  style={{ display: "none" }}
                />
              );
            })}
          </svg>
        );
      })}
    </div>
  );
}
