import { Inter, Sora } from "next/font/google";

/**
 * Configuration for Inter font
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

/**
 * Configuration for Sora font
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

/**
 * Font configuration object for easy access
 */
export const fonts = {
  inter,
  sora,
} as const;

/**
 * CSS variable names for fonts
 */
export const fontVariables = {
  inter: inter.variable,
  sora: sora.variable,
} as const;
