import { Anton, Manrope } from "next/font/google";

// Display face: ultra-bold condensed poster type — the new editorial identity's
// one loud voice. Self-hosted automatically by next/font at build time.
export const displayFont = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Body/UI face: humanist, warm, quiet counterpart to the shouting display face.
export const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});
