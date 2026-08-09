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

export default function SectionCrosshairs({
  hideBottom = false,
  hideTop = false,
}: {
  hideBottom?: boolean;
  hideTop?: boolean;
}) {
  return (
    <>
      {!hideTop && (
        <>
          <CrossMark className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
          <CrossMark className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        </>
      )}
      {!hideBottom && (
        <>
          <CrossMark className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <CrossMark className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
        </>
      )}
    </>
  );
}
