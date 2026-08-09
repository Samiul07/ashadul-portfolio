"use client";


function Mail() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 21.5 17.5" fill="none">
      <path
        d="M18.75 0a2.75 2.75 0 0 1 2.75 2.75v12a2.75 2.75 0 0 1-2.75 2.75h-16A2.75 2.75 0 0 1 0 14.75v-12A2.75 2.75 0 0 1 2.75 0h16Zm-1.352 4.372a.75.75 0 0 0-1.026-.27L11.38 7.015a1.25 1.25 0 0 1-1.26 0L5.128 4.102a.75.75 0 1 0-.756 1.296l4.992 2.913a2.75 2.75 0 0 0 2.772 0l4.992-2.913a.75.75 0 0 0 .27-1.026Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AvailabilityBadge() {
  return (
    <div
      data-mobile-hero-availability
      className="absolute bottom-8 left-8 z-[105] flex w-[448px] origin-left scale-x-[0.995] items-center gap-2.5 font-sans text-base leading-[1.4] font-light tracking-[-0.5px] text-white uppercase max-[640px]:bottom-4 max-[640px]:left-5 max-[640px]:z-[175] max-[640px]:w-auto max-[640px]:right-5 max-[640px]:origin-center max-[640px]:scale-x-100 max-[640px]:items-center max-[640px]:gap-2.5 max-[640px]:text-base max-[640px]:leading-[1.2] max-[640px]:tracking-[-0.55px]"
    >
      <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center text-white animate-envelope-bounce">
        {/* White pulsing overlay in the shape of the envelope */}
        <span
          className="pointer-events-none absolute inline-flex h-[17.5px] w-[21.5px] animate-ping text-white/30 motion-reduce:animate-none"
          aria-hidden="true"
        >
          <Mail />
        </span>
        {/* Static Mail icon */}
        <span className="relative inline-flex h-[17.5px] w-[21.5px] text-white">
          <Mail />
        </span>
      </span>
      <span className="max-[359px]:max-w-[210px]">
        Available for remote roles &middot; US hours overlap
      </span>
    </div>
  );
}
