"use client";

import Link from "next/link";
import { Button, GlassPanel } from "@/components/ui";
import { useI18n } from "@/i18n";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-gutter">
      <GlassPanel padding="lg" className="rounded-3xl text-center max-w-md p-12">
        <div className="[font-family:var(--font-display)] text-7xl text-accent mb-4 tracking-tighter">404</div>
        <p className="text-lg text-slate-400 mb-8">
          {t.common.pageNotFound}
        </p>
        <Button variant="primary" asChild size="lg">
          <Link href="/">{t.common.returnHome}</Link>
        </Button>
      </GlassPanel>
    </div>
  );
}
