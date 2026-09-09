"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Handshake, Network, ShieldCheck } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ConsultingPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mitosis-container",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      // 1. Fade out intro text
      tl.to(".intro-text", { opacity: 0, scale: 1.2, duration: 1 }, 0);

      // 2. The Mitosis (Cell division of the glass spheres)
      tl.to(".sphere-left", { 
        xPercent: -70, 
        scale: 1.2,
        borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        duration: 2, 
        ease: "power2.inOut" 
      }, 0.5);
      
      tl.to(".sphere-right", { 
        xPercent: 70, 
        scale: 1.2,
        borderRadius: "60% 40% 30% 70% / 50% 40% 50% 60%",
        duration: 2, 
        ease: "power2.inOut" 
      }, 0.5);

      // 3. Reveal the inner content inside the spheres
      tl.fromTo(".inner-content-left", 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, 
        1.5
      );
      
      tl.fromTo(".inner-content-right", 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, 
        1.5
      );
      
      // 4. Reveal bottom central text
      tl.fromTo(".central-conclusion",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        2
      );

      // Ambient floating of the main container to feel like liquid
      gsap.to(".liquid-container", {
        y: 20,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#FAFAFA] text-[#090A0F] selection:bg-[#5B21B6] selection:text-white font-inter overflow-hidden relative">
      
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5B21B6]/10 via-[#FAFAFA] to-[#FAFAFA]"></div>
      </div>

      <div className="fixed top-8 left-8 z-50">
        <Link href="/" className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/70 backdrop-blur-xl border border-[#5B21B6]/20 shadow-xl hover:scale-110 transition-all duration-300">
          <ArrowLeft className="text-[#5B21B6] group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ══════════ MITOSIS SCROLL SEQUENCE ══════════ */}
      <section className="mitosis-container relative w-full h-screen flex items-center justify-center pt-20 z-10 px-6">
        
        {/* Intro Text (Fades out) */}
        <div className="intro-text absolute z-50 text-center pointer-events-none flex flex-col items-center">
           <h1 className="text-[clamp(4rem,8vw,8rem)] font-black leading-[0.9] tracking-tighter" style={{ fontFamily: "var(--font-syne)" }}>
             Partnership <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B21B6] to-[#1D4ED8]">Redefined.</span>
           </h1>
           <p className="mt-6 text-xl md:text-2xl text-[#090A0F]/50 font-medium max-w-xl">
             We don't just hand over code. We merge with your team to guarantee absolute success.
           </p>
           <p className="mt-12 text-sm text-[#5B21B6] tracking-[0.3em] uppercase font-bold animate-pulse">Scroll to merge</p>
        </div>

        {/* The Liquid Spheres */}
        <div className="liquid-container absolute inset-0 flex items-center justify-center pointer-events-none">
           
           {/* LEFT SPHERE */}
           <div className="sphere-left absolute w-[80vw] md:w-[40vw] aspect-square rounded-full bg-white/40 backdrop-blur-3xl shadow-[0_0_100px_rgba(91,33,182,0.15)] border border-white/60 flex items-center justify-center p-12 overflow-hidden pointer-events-auto">
              <div className="inner-content-left text-center opacity-0 flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full bg-[#5B21B6]/10 flex items-center justify-center mb-8 border border-[#5B21B6]/20">
                   <Network size={40} className="text-[#5B21B6]" />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-syne)" }}>Deep Discovery</h2>
                 <p className="text-[#090A0F]/70 text-lg md:text-xl leading-relaxed font-medium">
                   Immersive workshops with your stakeholders to align technical architecture with overarching business goals before writing a single line of code.
                 </p>
              </div>
           </div>

           {/* RIGHT SPHERE */}
           <div className="sphere-right absolute w-[80vw] md:w-[40vw] aspect-square rounded-full bg-[#5B21B6]/80 backdrop-blur-3xl shadow-[0_0_100px_rgba(91,33,182,0.3)] border border-[#5B21B6]/50 flex items-center justify-center p-12 overflow-hidden pointer-events-auto text-white">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
              <div className="inner-content-right text-center opacity-0 flex flex-col items-center relative z-10">
                 <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/20">
                   <Handshake size={40} className="text-white" />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-syne)" }}>Embedded Teams</h2>
                 <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium">
                   Our senior engineers embed directly within your squads. We upskill your team and build a lasting engineering culture of excellence.
                 </p>
              </div>
           </div>

        </div>

        {/* Central Conclusion Text (Appears between the separated spheres) */}
        <div className="central-conclusion absolute z-40 text-center pointer-events-none mt-96 hidden md:block">
           <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-2xl border border-[#090A0F]/5">
             <ShieldCheck size={24} className="text-[#1D4ED8]" />
             <span className="text-lg font-bold tracking-widest text-[#090A0F]">99.99% SLA BACKED SUPPORT</span>
           </div>
        </div>

      </section>

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="relative z-10 w-full py-40 bg-white border-t border-[#090A0F]/5">
        <div className="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter" style={{ fontFamily: "var(--font-syne)" }}>
            Ready to <span className="text-[#5B21B6]">partner?</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#090A0F]/60 font-medium max-w-2xl mb-12">
            Let's discuss how our consulting can transform your architecture and accelerate your growth.
          </p>
          <button className="group relative px-10 py-5 rounded-full overflow-hidden shadow-2xl hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: "#090A0F" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: "#5B21B6" }}></div>
            <div className="relative flex items-center gap-3">
              <span className="text-white font-bold tracking-widest uppercase text-sm">Start the conversation</span>
              <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={18} />
            </div>
          </button>
        </div>
      </section>

    </main>
  );
}
