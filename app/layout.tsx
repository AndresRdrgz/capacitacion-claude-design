import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

// Display — Bricolage Grotesque (variable: full wght range incl. 600/700/800).
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-display",
});

// Sans — Geist (variable: covers 400/500/600 used by the deck).
const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-sans",
});

// Mono — Geist Mono (variable: covers 400/500).
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-mono",
});

// Serif accents — Instrument Serif (single weight 400, italic is load-bearing).
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--ff-serif",
});

export const metadata: Metadata = {
  title: "Claude Design · Del diseño a producción",
  description:
    "Capacitación 'Claude Design. Del diseño a producción' — deck interactivo de 4 slides.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = [
    bricolage.variable,
    geistSans.variable,
    geistMono.variable,
    instrumentSerif.variable,
  ].join(" ");

  return (
    <html lang="es" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
