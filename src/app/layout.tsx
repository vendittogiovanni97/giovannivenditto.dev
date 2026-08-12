import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { PageTransition } from "@/components/layout/PageTransition";
import { I18nProvider } from "@/i18n";
import { EasterEggs } from "@/components/ui/EasterEggs";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import Script from "next/script";
import { getLocale } from "@/i18n/server";
import "./globals.css";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_AUTHOR_NAME || "Giovanni Venditto"} | Creative Engineering`,
  description: "Senior Frontend Developer & Creative Engineer. Tech Lead at Agilae. Building interfaces that bridge high-end design and robust technical architecture.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "WebGL", "Creative Engineering", "Design Systems", "Agilae", "Tech Lead"],
  authors: [{ name: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Giovanni Venditto" }],
  creator: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Giovanni Venditto",
  publisher: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Giovanni Venditto",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://giovannivenditto.dev",
    title: `${process.env.NEXT_PUBLIC_AUTHOR_NAME || "Giovanni Venditto"} | Creative Engineering`,
    description: "Senior Frontend Developer & Creative Engineer. Tech Lead at Agilae.",
    siteName: `${process.env.NEXT_PUBLIC_AUTHOR_NAME || "Giovanni Venditto"} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${process.env.NEXT_PUBLIC_AUTHOR_NAME || "Giovanni Venditto"} | Creative Engineering`,
    description: "Senior Frontend Developer & Creative Engineer. Tech Lead at Agilae.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.json",
  other: {
    "rss.xml": "/rss.xml",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1410",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="h-full antialiased" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script id="register-sw" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
              navigator.serviceWorker.register('/sw.js');
            });
          }`}
        </Script>
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
                background: "#0f1b14",
                border: "1px solid rgba(184, 255, 60, 0.2)",
                color: "#e7efe9",
                fontFamily: "var(--font-headline)",
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
