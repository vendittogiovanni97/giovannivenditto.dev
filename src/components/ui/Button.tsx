"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "magnetic";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const baseStyles = "inline-flex items-center justify-center font-label-technical transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-accent text-slate-950 hover:bg-accent hover:text-slate-950 shadow-[0_0_15px_rgba(184,255,60,0.2)]",
      secondary: "border border-accent/30 text-accent hover:bg-accent/10",
      ghost: "border border-slate-400/30 text-slate-400 hover:bg-slate-400/5",
      magnetic: "btn-magnetic",
    };

    const sizes = {
      sm: "h-9 px-3 text-2xs rounded-full",
      md: "h-10 px-4 text-2xs rounded-full",
      lg: "h-12 px-6 text-label-technical rounded-full",
      icon: "h-10 w-10 rounded-full",
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };