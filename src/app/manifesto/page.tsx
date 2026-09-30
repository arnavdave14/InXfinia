"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function ManifestoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Title reveal
    gsap.fromTo(".declare-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Left slide-in elements
    gsap.utils.toArray(".slide-left").forEach((el: any) => {
      gsap.fromTo(el,
        { x: -200, opacity: 0, rotateY: -45 },
        {
          x: 0, opacity: 1, rotateY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    });

    // Right slide-in elements
    gsap.utils.toArray(".slide-right").forEach((el: any) => {
      gsap.fromTo(el,
        { x: 200, opacity: 0, rotateY: 45 },
        {
          x: 0, opacity: 1, rotateY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    });

    // 3D Tilt Elements (Center)
    gsap.utils.toArray(".tilt-3d").forEach((el: any) => {
      gsap.fromTo(el,
        { rotateX: 60, opacity: 0, scale: 0.8 },
        {
          rotateX: 0, opacity: 1, scale: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );
    });

    // Spinners
    gsap.to(".spin-element", {
      rotate: 360,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
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

      <main ref={containerRef} className="relative z-10 min-h-screen pt-24 md:pt-40 pb-0 overflow-hidden px-6 md:px-12 selection:bg-violet-600 selection:text-white" style={{ perspective: "1000px" }}>
        
        <div className="max-w-[1600px] mx-auto relative z-20">
          
          <div className="declare-title mb-16 md:mb-48">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#090A0F] font-bold block mb-4">
              Our Manifesto
            </span>
            <div className="h-[2px] w-12 bg-black" />
          </div>

          <div className="flex flex-col gap-16 md:gap-32 w-full">
            
            {/* Hero Block 1 */}
            <div className="flex flex-col w-full">
              <h2 className="slide-left font-syne text-[clamp(2.5rem,10vw,12rem)] font-black leading-[0.8] tracking-tighter uppercase text-transparent break-words w-full" style={{ WebkitTextStroke: "2px #5B21B6" }}>
                WE DON'T BUILD
              </h2>
              <h2 className="slide-right font-syne text-[clamp(2.5rem,10vw,12rem)] font-black leading-[0.8] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500 self-start md:self-end mt-2 md:mt-4 break-words w-full text-left md:text-right">
                FOR TODAY.
              </h2>
            </div>

            {/* Hero Block 2 */}
            <div className="flex flex-col items-center justify-center w-full my-8 md:my-16">
              <h2 className="tilt-3d font-syne text-[clamp(2rem,8vw,10rem)] font-bold leading-[0.9] tracking-tighter uppercase text-left md:text-center text-[#090A0F] max-w-7xl mx-auto break-words w-full">
                WE BUILD FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">WHAT'S NEXT.</span>
              </h2>
            </div>

          </div>

          {/* Principles Section */}
          <div className="w-full max-w-[1600px] mx-auto border-t-4 border-[#090A0F] mt-24 md:mt-48">
            
            <div className="border-b-2 border-[#090A0F] flex flex-col items-center justify-center text-center py-12 px-0 gap-6 tilt-3d">
              <h3 className="font-syne text-[clamp(2rem,7vw,5rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#090A0F] w-full text-center">
                Our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">Principles</span>
              </h3>
            </div>

            {[
              { id: "01", title: "START WITH THE PROBLEM", desc: "Technology is the tool. Understanding the problem comes first.", color: "#5B21B6" },
              { id: "02", title: "THINK BEYOND THE OBVIOUS", desc: "The best solutions often begin with a better question.", color: "#10b981" },
              { id: "03", title: "MAKE IT REAL", desc: "Ideas matter when they become something people can actually use.", color: "#5B21B6" },
              { id: "04", title: "BUILD TO EVOLVE", desc: "Nothing stays still. Our products and solutions shouldn't either.", color: "#10b981" },
              { id: "05", title: "USE INTELLIGENCE WITH PURPOSE", desc: "AI and technology should create meaningful outcomes, not just impressive demos.", color: "#5B21B6" },
              { id: "06", title: "KEEP MOVING", desc: "Learn. Build. Test. Improve. Repeat.", color: "#10b981" }
            ].map((principle, index) => (
              <div key={principle.id} className={`grid grid-cols-1 md:grid-cols-[${index % 2 === 0 ? 'auto_1fr' : '1fr_auto'}] gap-0 border-b-2 border-[#090A0F] slide-${index % 2 === 0 ? 'left' : 'right'}`}>
                {index % 2 === 0 ? (
                  <>
                    <div className="md:border-r-2 border-[#090A0F] py-12 md:py-16 px-6 md:px-12 flex items-start justify-center">
                      <span className="font-syne text-[clamp(4rem,10vw,12rem)] font-black leading-none text-transparent" style={{ WebkitTextStroke: `2px ${principle.color}` }}>
                        {principle.id}
                      </span>
                    </div>
                    <div className="py-12 md:py-16 px-6 md:px-16 flex flex-col justify-center">
                      <h4 className="font-syne text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-[#090A0F]">{principle.title}</h4>
                      <p className="font-sans text-xl md:text-3xl font-medium leading-relaxed text-[#444] max-w-3xl">
                        {principle.desc}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-12 md:py-16 px-6 md:px-16 flex flex-col justify-center order-2 md:order-1 items-start md:items-end text-left md:text-right">
                      <h4 className="font-syne text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">{principle.title}</h4>
                      <p className="font-sans text-xl md:text-3xl font-medium leading-relaxed text-[#444] max-w-3xl">
                        {principle.desc}
                      </p>
                    </div>
                    <div className="md:border-l-2 border-[#090A0F] py-12 md:py-16 px-6 md:px-12 flex items-start justify-center order-1 md:order-2">
                      <span className="font-syne text-[clamp(4rem,10vw,12rem)] font-black leading-none text-transparent" style={{ WebkitTextStroke: `2px ${principle.color}` }}>
                        {principle.id}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Closing Statement */}
            <div className="py-24 md:py-32 px-8 flex flex-col items-center justify-center text-center tilt-3d">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#555] mb-6">Final Statement</p>
              <h2 className="font-syne text-[clamp(1.5rem,5vw,4.5rem)] font-black uppercase tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500 w-full text-center max-w-6xl mx-auto">
                We are here to turn possibility into reality — and keep pushing beyond what already exists.
              </h2>
            </div>
            
            {/* Rolling Ticker Bottom */}
            <div className="border-t-2 border-[#090A0F] py-4 overflow-hidden w-[100vw] relative left-1/2 -translate-x-1/2">
              <div className="flex gap-16 whitespace-nowrap animate-[ticker_15s_linear_infinite]" style={{ width: "max-content" }}>
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="font-mono text-xs uppercase tracking-widest text-[#555]">
                    INXFINIA MANIFESTO &nbsp;&nbsp;•&nbsp;&nbsp; WHAT WE BELIEVE &nbsp;&nbsp;•&nbsp;&nbsp; BUILT TO EVOLVE &nbsp;&nbsp;•&nbsp;&nbsp; BEYOND THE OBVIOUS &nbsp;&nbsp;•&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
