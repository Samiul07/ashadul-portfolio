import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Big_Shoulders,
  Playfair_Display,
} from "next/font/google";
import localFont from "next/font/local";
import {
  SITE_URL,
  SOCIAL_DESCRIPTION,
  sharedSocialMetadata,
} from "@/lib/social-metadata";
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
  metadataBase: SITE_URL,
  title: {
    default: "Ashadul | Design, Vibe Code & Deploy Products 🔥",
    template: "%s | Ashadul",
  },
  description: SOCIAL_DESCRIPTION,
  ...sharedSocialMetadata("/"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.ashadul.design/#website",
      name: "Ashadul",
      url: "https://www.ashadul.design",
      publisher: {
        "@id": "https://www.ashadul.design/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://www.ashadul.design/#person",
      name: "Ashadul Islam",
      alternateName: "Ashadul",
      jobTitle: "UI/UX Product Designer",
      url: "https://www.ashadul.design",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${bigShoulders.variable} ${switzer.variable} overflow-x-clip bg-background [font-synthesis-weight:none] [scrollbar-width:none]`}>
      <body suppressHydrationWarning className="m-0 overflow-x-clip bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
