"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/Hero";
import { MarqueeBanner } from "@/components/PartnersMarquee";
import { StatsSection } from "@/components/StatsSection";
import { EcosystemSection } from "@/components/EcosystemSection";
import { CoreValuesCards } from "@/components/FeatureList";
import { TeamSection } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { ScrollTextGradient } from "@/components/ScrollTextGradient";

export default function Home() {
  const [ready, setReady] = useState(false);

  // Lock scroll to top while preloader is active
  useEffect(() => {
    if (!ready) {
      // Prevent scrolling during preloader
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      // Snap scroll to top immediately
      window.scrollTo(0, 0);
    } else {
      // Restore scroll and reset position
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [ready]);

  const handleComplete = () => {
    setReady(true);
  };

  return (
    <>
      {/* Animated mesh gradient background — always present */}
      <div className="mesh-bg" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      {/* Preloader — sits above everything at z-[200] */}
      <Preloader onComplete={handleComplete} />

      {/* Main content — always in DOM but invisible until ready
          This prevents the footer from being the only visible element */}
      <main
        className="relative z-10 min-h-screen"
        style={{
          opacity: ready ? 1 : 0,
          pointerEvents: ready ? "auto" : "none",
          transition: "opacity 0.5s ease",
        }}
      >
        <Hero />
        <MarqueeBanner />
        <StatsSection />
        <EcosystemSection />
        <ScrollTextGradient text="Build anything. We handle the complexity." />
        <CoreValuesCards />
        <TeamSection />
        <CTASection />
      </main>
    </>
  );
}
