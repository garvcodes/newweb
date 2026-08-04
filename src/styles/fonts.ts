import { Labrada } from "next/font/google";

export const fontSerif = Labrada({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "variable",
  style: ["normal", "italic"],
  adjustFontFallback: false,
});

export const fontSans = Labrada({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "variable",
  style: ["normal", "italic"],
  adjustFontFallback: false,
});
