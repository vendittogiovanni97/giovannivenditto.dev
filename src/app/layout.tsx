import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { PageTransition } from "@/components/layout/PageTransition";
import { I18nProvider } from "@/i18n";
import { EasterEggs } from "@/components/ui/EasterEggs";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import Script from "next/script";
import { getLocale } from "@/i18n/server";
import { displayFont, bodyFont } from "@/lib/fonts";
import { config } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: `${config.authorName} — Fullstack & AI-Ready Engineer`,
    template: `%s | ${config.authorName}`,
  },
  description:
    "Fullstack Engineer specializzato in React 19, Next.js 16, Node.js e soluzioni AI-first certificate Anthropic Claude. Sviluppo piattaforme enterprise, CRM su misura e automazioni ad alte prestazioni.",
  keywords: [
    "Giovanni Venditto",
    "Fullstack Engineer",
    "AI Engineer",
    "Next.js 16",
    "React 19",
    "Anthropic Claude Certified",
    "Sviluppatore Fullstack",
    "Napoli",
    "Node.js",
    "TypeScript",
    "CRM Custom",
    "Enterprise Web Apps",
    "OCR Automation",
    "Agilae",
  ],
  authors: [{ name: config.authorName, url: config.siteUrl }],
  creator: config.authorName,
  publisher: config.authorName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_US"],
    url: config.siteUrl,
    title: `${config.authorName} — Fullstack & AI-Ready Engineer`,
    description:
      "Fullstack Engineer specializzato in React 19, Next.js 16 e soluzioni AI-first certificate Anthropic Claude. Piattaforme enterprise e automazioni ad alte prestazioni.",
    siteName: `${config.authorName} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    creator: `@${config.twitter}`,
    title: `${config.authorName} — Fullstack & AI-Ready Engineer`,
    description:
      "Fullstack Engineer specializzato in Next.js 16, Node.js e soluzioni AI-first certificate Anthropic Claude.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#14100b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`h-full antialiased ${displayFont.variable} ${bodyFont.variable}`} data-theme="dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script id="register-sw" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
              navigator.serviceWorker.register('/sw.js');
            });
          }`}
        </Script>
        <SmoothScroll />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: config.authorName,
              jobTitle: "Fullstack & AI-Ready Engineer",
              url: config.siteUrl,
              email: `mailto:${config.email}`,
              sameAs: [
                `https://linkedin.com/in/${config.linkedin}`,
                `https://github.com/${config.github}`,
                `https://twitter.com/${config.twitter}`,
              ],
              knowsAbout: [
                "Next.js",
                "React",
                "TypeScript",
                "Node.js",
                "Anthropic Claude",
                "AI Engineering",
                "Fullstack Development",
                "AG Grid",
                "OCR Pipelines",
                "Docker",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Agilae",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Università degli Studi Link Campus",
              },
            }),
          }}
        />
        <I18nProvider initialLocale={locale}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-slate-950 focus:px-4 focus:py-2 focus:rounded-lg focus:font-label-technical focus:text-sm"
          >
            Skip to main content
          </a>
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1c1712",
                border: "1px solid rgba(202,164,86, 0.2)",
                color: "#f3ece0",
                fontFamily: "var(--font-body)",
              },
            }}
          />
          <NavBar />
          <main id="main-content" className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <EasterEggs />
          <CursorSpotlight />
        </I18nProvider>
      </body>
    </html>
  );
}
