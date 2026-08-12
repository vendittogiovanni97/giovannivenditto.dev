"use client";

import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8 text-center glass-panel rounded-2xl m-4">
            <p className="font-headline text-lg text-slate-400 mb-4">Something went wrong.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="font-code-snippet text-sm text-accent hover:underline"
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
