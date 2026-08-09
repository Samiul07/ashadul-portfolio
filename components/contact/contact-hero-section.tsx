"use client";

import type { CSSProperties, FormEvent, ReactNode } from "react";
import Image from "next/image";
import MobileVisualViewport from "@/components/hero/mobile-visual-viewport";
import SectionCrosshairs from "@/components/ui/section-crosshairs";

const frameWidth =
  "w-[1400px] max-[1439px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_40px)]";
const frameMargin = "ml-[calc((100vw-1400px)/2)] max-[1439px]:mx-auto";
const buttonShape =
  "[clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]";
const buttonInnerShape =
  "[clip-path:polygon(0_0,calc(100%_-_11px)_0,100%_11px,100%_100%,11px_100%,0_calc(100%_-_11px))]";

const whatsappHref =
  "https://wa.me/?text=Hi%20Ashadul%2C%20I%27d%20like%20to%20get%20in%20touch.";

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://dribbble.com", label: "Dribbble" },
  { href: "https://behance.net", label: "Behance" },
  { href: "https://instagram.com", label: "Instagram" },
];

function ArrowUpRight({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 17 17 7M17 7H8M17 7v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M3.5 6.5h17v11h-17z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4.5 7.5 7.5 6 7.5-6" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function Field({
  autoComplete,
  children,
  className = "",
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  autoComplete?: string;
  children?: ReactNode;
  className?: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label
      className={`group flex min-h-[104px] flex-col justify-center gap-3 px-5 py-4 transition-colors duration-200 focus-within:bg-white/[0.025] ${className}`}
    >
      <span className="font-sans text-[11px] leading-none font-medium tracking-[0.1em] text-white/48 uppercase transition-colors group-focus-within:text-primary">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {children ?? (
        <input
          autoComplete={autoComplete}
          className="h-8 min-w-0 border-0 bg-transparent p-0 font-sans text-lg leading-[1.2] font-normal tracking-[-0.35px] text-white outline-none placeholder:text-white/28"
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
        />
      )}
    </label>
  );
}

export default function ContactHeroSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const company = String(formData.get("company") || "Not provided");
    const message = String(formData.get("message") || "");
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`,
    );

    const mailtoHref = `mailto:ashadulislamsamiul@gmail.com?subject=${subject}&body=${body}`;
    const mailtoLink = document.createElement("a");
    mailtoLink.href = mailtoHref;
    mailtoLink.style.display = "none";
    document.body.appendChild(mailtoLink);
    mailtoLink.click();
    mailtoLink.remove();
  };

  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="relative z-10 isolate border-b border-white/12 bg-black text-white"
      id="contact-hero"
    >
      <MobileVisualViewport />
      <div
        className={`relative border-x border-white/12 ${frameWidth} ${frameMargin}`}
        style={
          {
            "--contact-mobile-heading-height":
              "clamp(220px, calc(var(--mobile-visual-height, 100svh) * 0.31), 270px)",
          } as CSSProperties
        }
      >
        <SectionCrosshairs />

        <header className="flex min-h-[270px] flex-col items-center justify-center px-8 py-12 text-center max-[1200px]:min-h-[240px] max-[640px]:h-[var(--contact-mobile-heading-height)] max-[640px]:min-h-0 max-[640px]:px-5 max-[640px]:py-0">
          <p className="m-0 font-sans text-sm leading-none font-medium tracking-[0.12em] text-white/64 uppercase">
            <span className="text-primary">{"//"}</span> Contact
          </p>
          <h1
            className="m-0 mt-7 font-display text-[clamp(104px,10.2vw,154px)] leading-[0.86] font-black tracking-[-0.055em] whitespace-nowrap text-white uppercase max-[1200px]:text-[clamp(78px,10.5vw,116px)] max-[640px]:mt-5 max-[640px]:text-[clamp(58px,18vw,78px)] max-[640px]:leading-[0.86] max-[640px]:whitespace-normal"
            id="contact-hero-heading"
          >
            Let&rsquo;s make it real<span className="text-primary">.</span>
          </h1>
        </header>

        <div className="grid min-h-[680px] grid-cols-[0.88fr_1.12fr] grid-rows-[minmax(576px,1fr)_104px] border-t border-white/12 max-[1024px]:grid-cols-1 max-[1024px]:grid-rows-none max-[640px]:min-h-0 max-[640px]:border-t-0">
          <div
            className="relative order-1 col-start-1 row-span-2 row-start-1 overflow-hidden border-r border-b border-white/12 max-[1024px]:col-start-1 max-[1024px]:row-auto max-[1024px]:row-span-1 max-[1024px]:h-[680px] max-[1024px]:border-r-0 max-[640px]:h-[calc(var(--mobile-visual-height,100svh)-70px-var(--contact-mobile-heading-height))] max-[640px]:border-white/14"
            data-image-stage
          >
            <Image
              alt="Ashadul Islam"
              className="absolute inset-0 h-full w-full select-none object-cover object-center max-[640px]:object-[center_35%]"
              height={1448}
              priority
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 48px), 620px"
              src="/images/contact-portrait.png"
              width={1086}
            />

            <aside
              aria-label="Email and social profiles"
              className="absolute inset-x-0 bottom-[-1px] z-10 flex h-[105px] flex-col items-center justify-center gap-3 bg-transparent px-7 text-center max-[1200px]:px-5 max-[640px]:h-[113px]"
              data-contact-rail
            >
              <div className="pointer-events-none absolute inset-x-0 -top-12 bottom-0 z-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.44)_42%,transparent_100%)]" />
              <a
                className="group/mail relative z-1 flex min-w-0 items-center justify-center gap-2.5 font-sans text-[13px] font-medium tracking-[-0.15px] text-white/88 no-underline transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none max-[640px]:text-sm"
                href="mailto:ashadulislamsamiul@gmail.com"
              >
                <span className="shrink-0 text-white/38 transition-colors group-hover/mail:text-primary">
                  <MailIcon />
                </span>
                <span className="truncate">ashadulislamsamiul@gmail.com</span>
              </a>

              <div className="relative z-1 flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1" aria-label="Social profiles">
                {socialLinks.map((social, index) => (
                  <div className="contents" key={social.label}>
                    {index > 0 ? <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-white/24" /> : null}
                    <a
                      className="font-sans text-xs font-medium tracking-[-0.1px] text-white/62 no-underline transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none max-[640px]:text-[13px]"
                      href={social.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {social.label}
                    </a>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <form
            aria-label="Contact message"
            className="contents"
            id="contact-form"
            onSubmit={handleSubmit}
          >
              <div className="order-3 col-start-2 row-start-1 flex min-h-0 flex-col max-[1024px]:col-start-1 max-[1024px]:row-auto" data-contact-fields>
                <div className="grid grid-cols-3 border-b border-white/14 max-[1200px]:grid-cols-2 max-[640px]:grid-cols-1">
                  <Field
                    autoComplete="name"
                    className="min-h-[128px] border-r border-white/14 px-7 max-[1200px]:px-5 max-[640px]:min-h-[96px] max-[640px]:border-r-0 max-[640px]:border-b"
                    label="Full name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                  <Field
                    autoComplete="email"
                    className="min-h-[128px] border-r border-white/14 px-7 max-[1200px]:border-r-0 max-[1200px]:px-5 max-[640px]:min-h-[96px] max-[640px]:border-b"
                    label="Email address"
                    name="email"
                    placeholder="you@company.com"
                    required
                    type="email"
                  />
                  <Field
                    autoComplete="organization"
                    className="min-h-[128px] px-7 max-[1200px]:col-span-2 max-[1200px]:border-t max-[1200px]:border-white/14 max-[1200px]:px-5 max-[640px]:col-span-1 max-[640px]:min-h-[96px] max-[640px]:border-t-0"
                    label="Company (optional)"
                    name="company"
                    placeholder="Your company"
                  />
                </div>
                <Field
                  className="min-h-[300px] flex-1 px-7 max-[1200px]:px-5 max-[640px]:min-h-[240px]"
                  label="Your message"
                  name="message"
                  placeholder="What would you like to talk about?"
                  required
                >
                  <textarea
                    className="min-h-[210px] w-full flex-1 resize-none border-0 bg-transparent p-0 font-sans text-lg leading-[1.4] font-normal tracking-[-0.35px] text-white outline-none placeholder:text-white/28 max-[640px]:min-h-[154px]"
                    name="message"
                    placeholder="What would you like to talk about?"
                    required
                  />
                </Field>
              </div>

              <div
                className="order-4 col-start-2 row-start-2 flex h-[104px] items-center gap-3 px-7 max-[1200px]:px-5 max-[1024px]:col-start-1 max-[1024px]:row-auto max-[640px]:h-auto max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:py-5"
                data-action-rail
              >
                <button
                  className={`inline-flex h-[56px] min-w-[188px] cursor-pointer items-center justify-center gap-3 border-0 bg-white px-6 font-sans text-base font-semibold tracking-[-0.32px] text-black transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary max-[640px]:w-full ${buttonShape}`}
                  type="submit"
                >
                  Send message
                  <ArrowUpRight className="h-[22px] w-[22px]" />
                </button>

                <a
                  className={`group/whatsapp inline-flex h-[56px] min-w-[148px] bg-white/28 p-px text-white no-underline transition-colors hover:bg-white/70 focus-visible:bg-white focus-visible:outline-none max-[640px]:w-full ${buttonShape}`}
                  href={whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className={`flex h-full w-full items-center justify-center gap-2.5 bg-black px-5 font-sans text-sm font-semibold tracking-[-0.2px] transition-colors group-hover/whatsapp:bg-[#080808] ${buttonInnerShape}`}>
                    <Image alt="" className="h-[18px] w-[18px]" height={20} src="/images/portfolio/icon-whatsapp.svg" width={20} />
                    WhatsApp
                  </span>
                </a>

              </div>
          </form>
        </div>
      </div>
    </section>
  );
}
