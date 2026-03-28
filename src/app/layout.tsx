import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
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
    <html lang="en" className={`${serif.variable} ${script.variable}`}>
      <body className="font-serif">{children}</body>
    </html>
  );
}
