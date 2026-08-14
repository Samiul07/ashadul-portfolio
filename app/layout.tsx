import type { Metadata } from "next";
import {
  Big_Shoulders,
  Playfair_Display,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: "italic",
  weight: "400",
  display: "swap",
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
  display: "swap",
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
  metadataBase: new URL("https://ashadul.design"),
  title: {
    default: "Ashadul | Design, Vibe Code & Deploy Products 🔥",
    template: "%s | Ashadul",
  },
  description:
    "Looking for your next senior product builder? I bring 12+ years of UI/UX experience to design, vibe code, and successfully deploy your next big idea.",
  openGraph: {
    title: "Ashadul | Design, Vibe Code & Deploy Products 🔥",
    description:
      "Looking for your next senior product builder? I bring 12+ years of UI/UX experience to design, vibe code, and successfully deploy your next big idea.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashadul | Design, Vibe Code & Deploy Products 🔥",
    description:
      "Looking for your next senior product builder? I bring 12+ years of UI/UX experience to design, vibe code, and successfully deploy your next big idea.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${bigShoulders.variable} ${switzer.variable} overflow-x-clip bg-background [font-synthesis-weight:none] [scrollbar-width:none]`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-portrait-highres.webp"
          fetchPriority="high"
        />
      </head>
      <body suppressHydrationWarning className="m-0 overflow-x-clip bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
