import Link from "next/link";
import { Button, GlassPanel } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-gutter">
      <GlassPanel padding="lg" className="rounded-3xl text-center max-w-md p-12">
        <div className="font-headline text-7xl text-accent mb-4 tracking-tighter">404</div>
        <p className="font-headline text-lg text-slate-400 mb-8">
          This page has drifted into the void.
        </p>
        <Button variant="primary" asChild size="lg">
          <Link href="/">Return Home</Link>
        </Button>
      </GlassPanel>
    </div>
  );
}
