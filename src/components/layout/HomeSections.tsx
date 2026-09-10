"use client";

import dynamic from "next/dynamic";
import type { ProjectMetadata } from "@/lib/content";
import { SelectedWork } from "@/components/work/SelectedWork";
import { ImpactMetrics } from "@/components/home/ImpactMetrics";
import { TechRadar } from "@/components/tech-stack/TechRadar";
import { ExperienceTimeline } from "@/components/studio/ExperienceTimeline";
import { Credentials } from "@/components/credentials/Credentials";
import { HowIWork } from "@/components/home/HowIWork";
import { Services } from "@/components/home/Services";

const ScrollDivider = dynamic(
  () => import("@/components/ui/ScrollDivider").then((m) => ({ default: m.ScrollDivider })),
  { ssr: false }
);

export function HomeSections({ projects }: { projects: ProjectMetadata[] }) {
  return (
    <>
      <ImpactMetrics />
      <ScrollDivider color="#caa456" height={80} />
      <Credentials />
      <ScrollDivider color="#caa456" height={80} />
      <HowIWork />
      <ScrollDivider color="#caa456" height={80} />
      <Services />
      <ScrollDivider color="#caa456" height={80} />
      <SelectedWork projects={projects} />
      <ScrollDivider color="#caa456" height={80} />
      <TechRadar />
      <ScrollDivider color="#caa456" height={80} />
      <ExperienceTimeline />
    </>
  );
}
