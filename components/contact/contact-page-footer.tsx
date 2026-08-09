import Link from "next/link";
import { FooterWordmark } from "@/components/sections/contact-footer-section";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const footerLink =
  "font-sans text-base font-semibold tracking-[-0.3px] text-white/86 no-underline transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none max-[640px]:text-sm";

export default function ContactPageFooter() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,#ef2a10_0%,#b71508_30%,#300402_68%,#000_100%)]"
      />

      <div
        className={`relative z-1 border-x border-y border-white/12 ${frameWidth} ${frameMargin}`}
      >
        <div className="flex min-h-[224px] items-center justify-between gap-12 px-8 py-10 max-[900px]:items-start max-[640px]:min-h-0 max-[640px]:flex-col max-[640px]:gap-10 max-[640px]:px-5 max-[640px]:py-10">
          <p className="m-0 font-sans text-base tracking-[-0.3px] text-white/68 max-[640px]:text-sm">
            © 2026 Ashadul. Designed &amp; built with care.
          </p>

          <div className="grid grid-cols-2 gap-x-14 gap-y-3 max-[640px]:gap-x-10">
            <div className="flex flex-col items-start gap-3">
              <p className="m-0 font-sans text-base tracking-[-0.3px] text-white/60 max-[640px]:text-sm">
                Quick Links
              </p>
              <Link className={footerLink} href="/portfolio">My Work</Link>
              <a className={footerLink} download href="/resume.pdf">Resume</a>
            </div>
            <div className="flex flex-col items-start gap-3">
              <p className="m-0 font-sans text-base tracking-[-0.3px] text-white/60 max-[640px]:text-sm">
                Legal
              </p>
              <span
                aria-disabled="true"
                className={`${footerLink} cursor-default opacity-80`}
              >
                Privacy
              </span>
              <span
                aria-disabled="true"
                className={`${footerLink} cursor-default opacity-80`}
              >
                Terms
              </span>
            </div>
          </div>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
