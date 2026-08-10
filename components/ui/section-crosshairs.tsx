function CrossMark({
  className,
  topAsT = false,
}: {
  className: string;
  topAsT?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 h-[25px] w-[25px] ${className}`}
    >
      <span className="absolute top-3 left-0 h-px w-6 bg-white" />
      <span
        className={`absolute left-3 w-px bg-white ${
          topAsT ? "top-3 h-[13px]" : "top-0 h-[25px]"
        }`}
      />
    </span>
  );
}

export default function SectionCrosshairs({
  hideBottom = false,
  hideTop = false,
  topAsT = false,
}: {
  hideBottom?: boolean;
  hideTop?: boolean;
  topAsT?: boolean;
}) {
  return (
    <>
      {!hideTop && (
        <>
          <CrossMark
            className="top-0 left-0 -translate-x-1/2 -translate-y-1/2"
            topAsT={topAsT}
          />
          <CrossMark
            className="top-0 right-0 translate-x-1/2 -translate-y-1/2"
            topAsT={topAsT}
          />
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
