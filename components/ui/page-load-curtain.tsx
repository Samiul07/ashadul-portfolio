"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const panels = [
  "page-load-curtain__panel--outer",
  "page-load-curtain__panel--inner",
  "page-load-curtain__panel--center",
  "page-load-curtain__panel--inner",
  "page-load-curtain__panel--outer",
];

export default function PageLoadCurtain() {
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // First render of a given route shows the curtain exactly once; navigating
  // to a different route replays it. Re-renders of the same route never do.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsComplete(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [lastPathname]);

  if (isComplete) return null;

  return (
    <div className="page-load-curtain" aria-hidden="true">
      {panels.map((panelClassName, index) => (
        <div className="page-load-curtain__column" key={index}>
          <span
            className={`page-load-curtain__panel ${panelClassName}`}
          />
        </div>
      ))}
    </div>
  );
}
