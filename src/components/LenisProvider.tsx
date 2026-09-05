"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GSAPSync() {
  const lenis = useLenis(({ scroll }) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Disable GSAP lag smoothing to prevent jitter with Lenis
    gsap.ticker.lagSmoothing(0);
  }, []);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
    >
      <GSAPSync />
      {children}
    </ReactLenis>
  );
}
