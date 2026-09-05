"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_TEXT = "TO LEARN ✦ TO BUILD ✦ TO SCALE WITH AI ✦ READY FOR THE FUTURE ✦ INTELLIGENT AUTOMATION ✦ REAL-TIME INFERENCE ✦ ";
const REPEATED = Array(8).fill(MARQUEE_TEXT).join(" ");

export function MarqueeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    let direction = -1; // 1 = right, -1 = left
    
    // Infinite horizontal movement
    const marqueeTween = gsap.to(textRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 60, // Slower base speed
      repeat: -1,
    });

    // React to scroll velocity
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Change direction based on scroll up/down
        if (self.direction !== direction) {
          direction = self.direction;
          gsap.to(marqueeTween, {
            timeScale: direction,
            overwrite: true,
          });
        }
        
        // Temporarily speed up based on scroll velocity (less aggressive)
        gsap.to(marqueeTween, {
          timeScale: direction * (1 + Math.abs(self.getVelocity() / 2000)),
          duration: 0.5,
          overwrite: true,
          onComplete: () => {
            gsap.to(marqueeTween, {
              timeScale: direction,
              duration: 1,
              overwrite: true,
            });
          }
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 -rotate-[2deg] my-20 overflow-hidden transform-gpu origin-center scale-110">
      {/* Blurred background track */}
      <div className="bg-white/30 backdrop-blur-xl py-6 overflow-hidden border-y border-white/50 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex whitespace-nowrap overflow-hidden">
          
          <div ref={textRef} className="flex whitespace-nowrap shrink-0 items-center">
            <span
              className="text-3xl md:text-5xl font-black uppercase tracking-widest shrink-0 bg-clip-text text-transparent px-4"
              style={{
                fontFamily: "var(--font-syne)",
                backgroundImage: "linear-gradient(90deg, #111111, #5B21B6, #1D4ED8, #111111)",
                backgroundSize: "200% 100%",
              }}
            >
              {REPEATED}
            </span>
            <span
              className="text-3xl md:text-5xl font-black uppercase tracking-widest shrink-0 bg-clip-text text-transparent px-4"
              style={{
                fontFamily: "var(--font-syne)",
                backgroundImage: "linear-gradient(90deg, #111111, #5B21B6, #1D4ED8, #111111)",
                backgroundSize: "200% 100%",
              }}
            >
              {REPEATED}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
