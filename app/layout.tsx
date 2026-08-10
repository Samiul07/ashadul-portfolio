import type { Metadata } from "next";
import {
  Big_Shoulders,
  Playfair_Display,
} from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/layout/navbar";
import RevealMotion from "@/components/providers/reveal-motion";
import SmoothScroll from "@/components/providers/smooth-scroll";
import CursorTrail from "@/components/ui/cursor-trail";
import PageLoadCurtain from "@/components/ui/page-load-curtain";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: "italic",
  weight: "400",
});

const bigShoulders = Big_Shoulders({
  // Impact is a close metric fallback for the display face, so text can paint
  // immediately on slow mobile connections without a hidden-font delay.
  display: "swap",
  fallback: ["Impact"],
  variable: "--font-display",
  subsets: ["latin"],
});

const switzer = localFont({
  src: [
    {
      path: "../public/fonts/switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Variable.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
});

export const metadata: Metadata = {
  title: "ASHADUL | Premium SaaS Product Designer",
  description:
    "Brutalist portfolio of Ashadul, showcasing high-impact design and engineering systems for SaaS products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${bigShoulders.variable} ${switzer.variable} overflow-x-clip bg-background [font-synthesis-weight:none] [scrollbar-width:none]`}>
      <body suppressHydrationWarning className="m-0 overflow-x-clip bg-background font-sans text-foreground antialiased">
      <Navbar />
      <SmoothScroll>
        <div className="relative">
          <main>{children}</main>
        </div>
      </SmoothScroll>
      <RevealMotion />
      <CursorTrail />
      <PageLoadCurtain />
    </body>
    </html>
  );
}
