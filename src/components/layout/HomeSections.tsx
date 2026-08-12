"use client";

import dynamic from "next/dynamic";
import type { ProjectMetadata } from "@/lib/content";
import { config } from "@/lib/config";
import { SelectedWork } from "@/components/work/SelectedWork";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ImpactMetrics } from "@/components/home/ImpactMetrics";
import { TechRadar } from "@/components/tech-stack/TechRadar";
import { ExperienceTimeline } from "@/components/studio/ExperienceTimeline";

const ScrollDivider = dynamic(
  () => import("@/components/ui/ScrollDivider").then((m) => ({ default: m.ScrollDivider })),
  { ssr: false }
);

const ContributionWall = dynamic(
  () => import("@/components/open-source/ContributionWall").then((m) => ({ default: m.ContributionWall })),
  {
    loading: () => (
      <section className="w-full py-[120px]">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-panel rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

export function HomeSections({ projects }: { projects: ProjectMetadata[] }) {
  return (
    <>
      <ImpactMetrics />
      <ScrollDivider color="#b8ff3c" height={80} />
      <SelectedWork projects={projects} />
      <ScrollDivider color="#b8ff3c" height={80} />
      <TechRadar />
      <ScrollDivider color="#b8ff3c" height={80} />
      <ExperienceTimeline />
      <ScrollDivider color="#b8ff3c" height={80} />
      <ErrorBoundary>
        <ContributionWall username={config.github} />
      </ErrorBoundary>
    </>
  );
}

