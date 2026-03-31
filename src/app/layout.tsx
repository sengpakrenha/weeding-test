import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Moul, Siemreap } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const moul = Moul({
  subsets: ["khmer"],
  weight: "400",
  variable: "--font-khmer-heading",
  display: "swap",
});

const siemreap = Siemreap({
  subsets: ["khmer"],
  weight: "400",
  variable: "--font-khmer-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.couple.partner1} & ${siteConfig.couple.partner2} · Wedding`,
  description: `Join us on ${siteConfig.weddingDateDisplay}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="km"
      className={`${playfair.variable} ${greatVibes.variable} ${moul.variable} ${siemreap.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body" suppressHydrationWarning>{children}</body>
    </html>
  );
}