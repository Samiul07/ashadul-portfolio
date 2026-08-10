import type { Metadata } from "next";
import ContactFaqSection from "@/components/contact/contact-faq-section";
import ContactHeroSection from "@/components/contact/contact-hero-section";
import ContactFooterSection from "@/components/sections/contact-footer-section";
import LogoListSection from "@/components/sections/logo-list-section";

export const metadata: Metadata = {
  title: "Contact Ashadul Islam | Product Designer",
  description:
    "Get in touch with Ashadul Islam about product design, collaboration, opportunities, or a new project.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactFaqSection />
      <LogoListSection topBorder transparent />
      <ContactFooterSection workHref="/portfolio" />
    </>
  );
}
