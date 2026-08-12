"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "tech" | "status" | "credential";
  size?: "sm" | "md";
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center font-code-snippet rounded";
    
    const variants = {
      default: "bg-slate-900 text-slate-100 border border-accent/10",
      tech: "bg-slate-900/50 backdrop-blur-sm text-accent border border-accent/20",
      status: "bg-accent/10 text-accent border border-accent/30",
      credential: "bg-accent/10 text-accent border border-accent/30 backdrop-blur-md",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-3xs rounded",
      md: "px-3 py-1 text-2xs rounded-full",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Chip.displayName = "Chip";

export { Chip };