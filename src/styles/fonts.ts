import { EB_Garamond, Inter } from "next/font/google";

export const fontSerif = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});
