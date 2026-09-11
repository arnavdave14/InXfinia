"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollTextGradient({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !textRef.current) return;

    // 1. Initial State: The gradient is shifted to the right, showing the unrevealed color
    gsap.set(textRef.current, {
      backgroundPosition: "100% center"
    });

    // 2. Scroll Animation: Smoothly shift the gradient position to reveal the colors
    const tl = gsap.to(textRef.current, {
      backgroundPosition: "0% center", // Shifts to the left edge of the gradient
      ease: "none",                    // Linear progress for 1:1 scroll linking
      scrollTrigger: {
        trigger: containerRef.current, 
        start: "top 60%",              // Start slightly earlier
        end: "75% center",             // Finish before the text starts scrolling away
        scrub: 1,                      
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[30vh] md:min-h-[120vh] py-16 md:py-0 flex items-center justify-center bg-transparent w-full"
    >
      <div className="w-full max-w-5xl mx-auto text-center md:sticky md:top-1/2 md:-translate-y-1/2">
        <h1 
          ref={textRef}
          className="text-[clamp(1.75rem,8vw,6rem)] font-black leading-[1.1] tracking-tight text-transparent bg-clip-text px-4"
          style={{
            // Updated for light theme: unrevealed text is a light gray (#cbd5e1)
            backgroundImage: "linear-gradient(to right, #ec4899, #a855f7, #3b82f6, #cbd5e1 50%, #cbd5e1 100%)",
            backgroundSize: "200% auto", 
            fontFamily: "var(--font-syne, sans-serif)",
          }}
        >
          {text}
        </h1>
      </div>
    </section>
  );
}
