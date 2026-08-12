"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "floating";
  padding?: "none" | "sm" | "md" | "lg";
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = "default", padding = "md", children, ...props }, ref) => {
    const baseStyles = "glass-panel";
    
    const variants = {
      default: "",
      hover: "group hover:-translate-y-2 transition-transform duration-300",
      floating: "backdrop-blur-[20px] bg-slate-900/60 border-border-slate-700/20",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassPanel.displayName = "GlassPanel";

export { GlassPanel };