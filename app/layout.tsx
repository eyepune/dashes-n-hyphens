import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Dashes n Hyphens | Preparing Tomorrow's Public Companies",
    template: "%s | Dashes n Hyphens",
  },
  description:
    "Expert IPO advisory, startup funding facilitation, and government grants consulting. We help ambitious startups become tomorrow's public companies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
