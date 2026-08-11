import Image from "next/image";
import type { SanityTestimonial } from "@/sanity/lib/types";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";

function QuoteMark({
  className,
  direction = "top",
}: {
  className: string;
  direction?: "top" | "bottom";
}) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute h-5 w-5 text-white ${className}`}
      fill="none"
      viewBox="0 0 20 20"
    >
      {direction === "top" ? (
        <path
          d="M7.5 2.5H1.875C0.84125 2.5 0 3.34125 0 4.375V10C0 11.0337 0.84125 11.875 1.875 11.875H4.39813L3.44938 16.7562C3.43188 16.8467 3.43458 16.9398 3.45729 17.0291C3.47999 17.1184 3.52215 17.2015 3.58073 17.2726C3.63932 17.3436 3.71288 17.4009 3.79617 17.4402C3.87945 17.4795 3.9704 17.4999 4.0625 17.5H6.0875C6.63125 17.5 7.11375 17.1444 7.27875 16.6294L9.0975 12.3137C9.10812 12.2887 9.11687 12.2638 9.12438 12.2388C9.29062 11.6394 9.375 11.02 9.375 10.3981V4.375C9.375 3.34125 8.53375 2.5 7.5 2.5ZM18.125 2.5H12.5C11.4663 2.5 10.625 3.34125 10.625 4.375V10C10.625 11.0337 11.4663 11.875 12.5 11.875H15.0231L14.0744 16.7562C14.0565 16.8467 14.059 16.94 14.0815 17.0294C14.1041 17.1188 14.1462 17.2021 14.2049 17.2732C14.2636 17.3444 14.3373 17.4016 14.4207 17.4408C14.5042 17.4801 14.5953 17.5003 14.6875 17.5H16.7125C17.2563 17.5 17.7394 17.1444 17.9031 16.6294L19.7231 12.3137C19.7331 12.2887 19.7419 12.2638 19.7494 12.2381C19.9156 11.6388 20 11.0194 20 10.3981V4.375C20 3.34125 19.1588 2.5 18.125 2.5Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M12.5 2.5H18.125C19.1588 2.5 20 3.34125 20 4.375V10C20 11.0337 19.1588 11.875 18.125 11.875H15.6019L16.5506 16.7562C16.5681 16.8467 16.5654 16.9398 16.5427 17.0291C16.52 17.1184 16.4779 17.2015 16.4193 17.2726C16.3607 17.3436 16.2871 17.4009 16.2038 17.4402C16.1205 17.4795 16.0296 17.4999 15.9375 17.5H13.9125C13.3688 17.5 12.8863 17.1444 12.7213 16.6294L10.9025 12.3137C10.8919 12.2887 10.8831 12.2638 10.8756 12.2388C10.7094 11.6394 10.625 11.02 10.625 10.3981V4.375C10.625 3.34125 11.4663 2.5 12.5 2.5ZM1.875 2.5L7.5 2.5C8.53375 2.5 9.375 3.34125 9.375 4.375V10C9.375 11.0337 8.53375 11.875 7.5 11.875H4.97687L5.92563 16.7562C5.94348 16.8467 5.94103 16.94 5.91845 17.0294C5.89588 17.1188 5.85375 17.2021 5.7951 17.2732C5.73645 17.3444 5.66273 17.4016 5.57928 17.4408C5.49582 17.4801 5.40471 17.5003 5.3125 17.5H3.2875C2.74375 17.5 2.26062 17.1444 2.09687 16.6294L0.276875 12.3137C0.266876 12.2887 0.258125 12.2638 0.250624 12.2381C0.0843735 11.6388 0 11.0194 0 10.3981V4.375C0 3.34125 0.841249 2.5 1.875 2.5Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function CrossMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-30 h-6 w-6 ${className}`}
    >
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/60" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white/60" />
    </span>
  );
}

function TestimonialCard({
  ariaHidden = false,
  testimonial,
}: {
  ariaHidden?: boolean;
  testimonial: SanityTestimonial;
}) {
  return (
    <article
      aria-hidden={ariaHidden || undefined}
      className="relative flex h-[360px] w-[427px] shrink-0 flex-col items-start gap-10 border border-white/14 bg-white/[0.03] p-12 backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.06] min-[641px]:max-[1200px]:h-[300px] min-[641px]:max-[1200px]:w-[360px] min-[641px]:max-[1200px]:gap-5 min-[641px]:max-[1200px]:p-7 max-[640px]:h-[360px] max-[640px]:w-[calc(100vw-88px)] max-[640px]:px-6 max-[640px]:py-8"
    >
      <p
        className="m-0 min-h-0 w-full break-words text-center font-sans text-[20px] leading-[1.2] font-medium tracking-[-0.5px] text-white min-[641px]:max-[1200px]:mx-auto min-[641px]:max-[1200px]:w-[calc(100%_-_48px)] min-[641px]:max-[1200px]:text-[17px] min-[641px]:max-[1200px]:leading-[1.28] max-[640px]:text-[17px] max-[640px]:leading-[1.35] max-[359px]:text-base"
        data-collab-quote-text
      >
        {testimonial.quote}
      </p>

      <div className="mt-auto flex w-full shrink-0 flex-col items-center gap-2">
        <div className="relative h-12 w-12">
          <Image
            alt={testimonial.name}
            className="h-full w-full rounded-full object-cover border border-white/20"
            height={48}
            loading="lazy"
            src={testimonial.avatar?.url ?? "/images/testimonial-shohanur-rahman.png"}
            width={48}
          />
        </div>
        <div className="flex w-full flex-col items-center gap-1">
          <p className="m-0 w-full text-center font-sans text-[16px] leading-[22px] font-medium tracking-[-0.32px] text-white">
            {testimonial.name}
          </p>
          <p className="m-0 w-full text-center font-sans text-[14px] leading-[1.2] font-normal tracking-[-0.5px] text-white/80">
            {testimonial.role}
          </p>
        </div>
      </div>

      <QuoteMark className="top-[21px] right-[21px] min-[641px]:max-[1200px]:top-4 min-[641px]:max-[1200px]:right-4 max-[640px]:top-2 max-[640px]:right-3 max-[640px]:h-4 max-[640px]:w-4" />
      <QuoteMark className="bottom-[24px] left-[23px] max-[640px]:bottom-2 max-[640px]:left-3 max-[640px]:h-4 max-[640px]:w-4" direction="bottom" />
    </article>
  );
}

export default function CalloutNotesSection({
  hideTopCrosshairs = false,
  testimonials = [],
}: {
  hideTopCrosshairs?: boolean;
  testimonials?: SanityTestimonial[];
}) {
  const firstRow = testimonials.filter((_, index) => index % 2 === 0);
  const secondRow = testimonials.filter((_, index) => index % 2 === 1);
  const marqueeRow = [...firstRow, ...firstRow];
  const reverseMarqueeRow = [...secondRow, ...secondRow];
  const mobileMarqueeRow = [...testimonials, ...testimonials];
  return (
    <section
      id="collab-notes"
      className="relative z-20 h-[1236px] w-full border-t border-white/20 bg-transparent text-white max-[1200px]:h-auto"
      aria-labelledby="collab-notes-heading"
    >
      <style>
        {`
          @keyframes collab-notes-scroll-left {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(calc(-50% - 12px), 0, 0); }
          }

          @keyframes collab-notes-scroll-right {
            from { transform: translate3d(calc(-50% - 12px), 0, 0); }
            to { transform: translate3d(0, 0, 0); }
          }

          @keyframes collab-notes-mobile-scroll-left {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(calc(-50% - 8px), 0, 0); }
          }

          @media (prefers-reduced-motion: reduce) {
            [data-collab-mobile-row],
            [data-collab-tablet-row] {
              animation-play-state: paused !important;
            }
          }

          [data-collab-quote-text] {
            display: -webkit-box;
            max-height: 6em;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
          }

          @media (max-width: 1023px) {
            [data-collab-quote-text] {
              max-height: 6.5em;
              -webkit-line-clamp: 5;
            }
          }

          @media (max-width: 639px) {
            [data-collab-quote-text] {
              max-height: 6.75em;
            }
          }
        `}
      </style>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-white/12"
      />

      <div
        className={`relative z-10 flex h-full flex-col items-start gap-8 overflow-hidden border-x border-white/12 px-8 py-[120px] max-[1200px]:h-auto max-[1200px]:py-24 max-[640px]:gap-6 max-[640px]:px-5 max-[640px]:py-14 ${frameWidth} ${frameMargin}`}
      >
        {!hideTopCrosshairs && (
          <>
            <CrossMark className="absolute top-0 left-0 z-20 -translate-x-1/2 -translate-y-1/2" />
            <CrossMark className="absolute top-0 right-0 z-20 translate-x-1/2 -translate-y-1/2" />
          </>
        )}
        <CrossMark className="absolute bottom-0 left-0 z-20 -translate-x-1/2 translate-y-1/2" />
        <CrossMark className="absolute right-0 bottom-0 z-20 translate-x-1/2 translate-y-1/2" />

        <p className="m-0 font-sans text-[15px] leading-none font-medium text-white uppercase max-[359px]:text-[13px]">
          {"// People I've Worked With"}
        </p>

        <div className="flex w-full flex-col items-start gap-14 max-[640px]:gap-10">
          <h2
            id="collab-notes-heading"
            className="m-0 whitespace-nowrap font-display text-[160px] leading-none font-black tracking-[-6px] text-white uppercase max-[1200px]:text-[clamp(52px,8.5vw,96px)] max-[640px]:text-[clamp(44px,12vw,68px)] max-[640px]:leading-[0.92] max-[640px]:tracking-[-3px]"
          >
            Collab Notes<span className="text-primary">.</span>
          </h2>

          <div className="-mx-8 flex w-[calc(100%+64px)] flex-col items-start gap-6 overflow-hidden max-[640px]:-mx-5 max-[640px]:w-[calc(100%+40px)]">
            <div className="hidden h-[360px] w-full min-[1200px]:block">
              <div
            className="flex w-max items-start gap-6 [animation:collab-notes-scroll-left_46.85s_linear_infinite]"
                data-collab-row="first"
              >
                {marqueeRow.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.name}-${index}-top`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>

            <div className="hidden h-[360px] w-full min-[1200px]:block">
              <div
            className="flex w-max items-start gap-6 [animation:collab-notes-scroll-right_46.85s_linear_infinite]"
                data-collab-row="second"
              >
                {reverseMarqueeRow.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.name}-${index}-bottom`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>

            <div className="hidden w-full flex-col gap-4 overflow-hidden min-[640px]:max-[1200px]:flex">
              <div className="h-[300px] w-full overflow-hidden">
                <div
                  className="flex w-max items-stretch gap-4 [animation:collab-notes-scroll-left_48s_linear_infinite]"
                  data-collab-tablet-row
                >
                  {marqueeRow.map((testimonial, index) => (
                    <TestimonialCard
                      ariaHidden={index >= firstRow.length}
                      key={`${testimonial.name}-${index}-tablet-top`}
                      testimonial={testimonial}
                    />
                  ))}
                </div>
              </div>
              <div className="h-[300px] w-full overflow-hidden">
                <div
                  className="flex w-max items-stretch gap-4 [animation:collab-notes-scroll-right_48s_linear_infinite]"
                  data-collab-tablet-row
                >
                  {reverseMarqueeRow.map((testimonial, index) => (
                    <TestimonialCard
                      ariaHidden={index >= secondRow.length}
                      key={`${testimonial.name}-${index}-tablet-bottom`}
                      testimonial={testimonial}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden w-full overflow-hidden max-[640px]:block">
              <div
                className="flex w-max items-stretch gap-4 [animation:collab-notes-mobile-scroll-left_62s_linear_infinite]"
                data-collab-mobile-row
              >
                {mobileMarqueeRow.map((testimonial, index) => (
                  <TestimonialCard
                    ariaHidden={index >= testimonials.length}
                    key={`${testimonial.name}-${index}-mobile`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
