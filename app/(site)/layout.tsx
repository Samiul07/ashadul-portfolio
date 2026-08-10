import Navbar from "@/components/layout/navbar";
import RevealMotion from "@/components/providers/reveal-motion";
import SmoothScroll from "@/components/providers/smooth-scroll";
import CursorTrail from "@/components/ui/cursor-trail";
import PageLoadCurtain from "@/components/ui/page-load-curtain";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <div className="relative">
          <main>{children}</main>
        </div>
      </SmoothScroll>
      <RevealMotion />
      <CursorTrail />
      <PageLoadCurtain />
    </>
  );
}
