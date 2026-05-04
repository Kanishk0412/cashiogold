"use client";

import { Component, ReactNode } from "react";

interface Props  { children: ReactNode }
interface State  { hasError: boolean; message: string }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    console.error("[ErrorBoundary]", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl"
              style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
            >
              ⚠️
            </div>
            <h2
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Something went wrong
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              We&apos;re sorry for the inconvenience. Please refresh the page or contact us directly.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-black"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}
              >
                Refresh Page
              </button>
              <a
                href="tel:+918130145962"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-[#D4AF37] border"
                style={{ border: "1px solid rgba(212,175,55,0.3)" }}
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
