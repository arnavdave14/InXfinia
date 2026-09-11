"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !pathRef.current) return;

    // Timeline line drawing
    const pathLength = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".svg-container",
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
      },
    });

    const textBlocks = gsap.utils.toArray(".about-text");
    textBlocks.forEach((block: any) => {
      const speed = block.dataset.speed || 1;
      
      // Combine parallax and fade into one scrubbed animation
      gsap.fromTo(block, 
        { 
          opacity: 0, 
          filter: "blur(20px)",
          y: 80 
        },
        {
          opacity: 1, 
          filter: "blur(0px)",
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "top 50%",
            scrub: 1, // Smooth scrubbing
          }
        }
      );
    });

    // The 3D Abyss text tunnel
    gsap.to(".abyss-container", {
      z: 1500,
      rotateX: 10,
      ease: "none",
      scrollTrigger: {
        trigger: ".abyss-wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div className="mesh-bg" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      <main ref={containerRef} className="relative z-10 pt-0 pb-0 overflow-hidden px-6 md:px-12">
        {/* Giant Hero Title */}
        <div className="min-h-[100svh] flex flex-col items-center justify-center max-w-[84rem] mx-auto text-center relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-syne text-[clamp(2.5rem,10vw,9rem)] font-black leading-[0.85] tracking-tighter text-[#090A0F] mix-blend-overlay"
          >
            ORIGIN<br />STORY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 font-mono text-sm uppercase tracking-widest text-violet-600 font-bold"
          >
            The birth of InXfinia
          </motion.p>
        </div>

        {/* Floating Bubble Content */}
        <div className="relative max-w-[84rem] mx-auto h-[350vh] md:h-[200vh]">
          {/* The Winding Timeline SVG */}
          <div className="svg-container absolute -top-[40vh] bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[40rem] pointer-events-none z-0 opacity-60">
            <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full stroke-violet-500 overflow-visible">
              <path
                ref={pathRef}
                d="M50,0 C80,100 20,200 50,300 C80,400 20,500 50,600 C80,700 20,800 50,900 C80,1000 50,1000 50,1000"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* Text Block 1 */}
          <div data-speed="1.2" className="about-text absolute top-[5%] md:left-[10%] w-[90%] md:w-full max-w-[28rem] p-4 left-1/2 -translate-x-1/2 md:translate-x-0">
            <span className="text-4xl md:text-5xl mb-4 block">🌌</span>
            <h3 className="font-syne text-3xl md:text-4xl font-black mb-3 text-[#090A0F]">The Big Bang</h3>
            <p className="text-lg text-[#333333] leading-relaxed font-medium">
              We realized AI infrastructure was a fragmented mess. We set out to build a unified fabric. No boxes. No limits. Just pure compute elegance.
            </p>
          </div>

          {/* Text Block 2 */}
          <div data-speed="0.8" className="about-text absolute top-[30%] md:right-[5%] w-[90%] md:w-full max-w-[32rem] p-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto">
            <span className="text-4xl md:text-5xl mb-4 block">🧬</span>
            <h3 className="font-syne text-4xl md:text-5xl font-black mb-3 text-[#090A0F]">The DNA</h3>
            <p className="text-lg text-[#333333] leading-relaxed font-medium">
              Our core team came together from deep learning labs and distributed systems engineering. We speak latency, throughput, and tensor shapes natively.
            </p>
          </div>

          {/* Text Block 3 */}
          <div data-speed="1.5" className="about-text absolute top-[55%] md:left-[15%] w-[90%] md:w-full max-w-[32rem] p-4 left-1/2 -translate-x-1/2 md:translate-x-0">
            <h3 className="font-syne text-5xl md:text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">
              Future
            </h3>
            <p className="text-xl text-[#333333] leading-relaxed font-medium">
              We aren't just building tools; we are shaping the architecture of tomorrow's intelligence.
            </p>
          </div>

          {/* Text Block 4 */}
          <div data-speed="1.1" className="about-text absolute top-[80%] md:right-[15%] w-[90%] md:w-full max-w-[30rem] p-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto">
            <h3 className="font-syne text-4xl md:text-5xl font-black mb-4 text-[#090A0F]">
              Join the Flow
            </h3>
            <p className="text-lg text-[#333333] leading-relaxed mb-8 font-medium">
              We are a collective of misfits and visionaries. Come build the unthinkable with us.
            </p>
            <button className="px-8 py-3 rounded-full bg-[#090A0F] text-white font-mono text-xs uppercase tracking-widest hover:bg-violet-600 transition-colors">
              Open Roles
            </button>
          </div>
        </div>

        {/* The Abyss - 3D Text Tunnel to fill the gap */}
        <div className="abyss-wrapper relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
          <div className="abyss-container relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute font-syne text-[clamp(2.5rem,12vw,20rem)] font-black uppercase tracking-tighter text-transparent select-none whitespace-nowrap"
                style={{ 
                  WebkitTextStroke: `1px rgba(91,33,182,${1 - i * 0.15})`,
                  transform: `translateZ(${-i * 400}px)` 
                }}
              >
                INXFINIA
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}
