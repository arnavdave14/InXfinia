"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ShieldCheck, Search, Route } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function StrategyPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial extreme zoom state
      gsap.set(".macro-grid", { scale: 30, opacity: 0.1, transformOrigin: "center center" });
      gsap.set(".ui-card", { opacity: 0, y: 100, scale: 0.8 });
      gsap.set(".hero-title", { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-sequence",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      // Step 1: Fade out the hero text and violently zoom out the macro grid
      tl.to(".hero-title", { opacity: 0, scale: 1.5, duration: 0.5, ease: "power2.in" }, 0)
        .to(".macro-grid", { 
          scale: 1, 
          opacity: 1, 
          duration: 2, 
          ease: "power4.out" 
        }, 0);

      // Step 2: Draw connecting SVG lines in the grid
      tl.fromTo(".path-line", 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1, ease: "none", stagger: 0.2 },
        1.5
      );

      // Step 3: Fade in the UI cards perfectly aligned to the grid
      tl.to(".ui-card", { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        stagger: 0.3, 
        duration: 1.5, 
        ease: "back.out(1.5)" 
      }, 2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#FAFAFA] text-[#090A0F] selection:bg-[#5B21B6] selection:text-white font-inter overflow-hidden relative">
      
      {/* Premium Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link href="/" className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/70 backdrop-blur-xl border border-[#5B21B6]/20 shadow-xl hover:scale-110 transition-all duration-300">
          <ArrowLeft className="text-[#5B21B6] group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ══════════ REVERSE ZOOM SEQUENCE ══════════ */}
      <section className="scroll-sequence relative w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* The Macro Grid (Starts huge, zooms out) */}
        <div className="macro-grid absolute w-[200vw] h-[200vh] flex items-center justify-center pointer-events-none">
          {/* Base Grid Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(91, 33, 182, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(91, 33, 182, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: 'center center'
          }}></div>

          {/* SVG Connections (Drawn via GSAP) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 2000 2000">
            <path className="path-line" d="M 500,1000 L 1000,1000 L 1000,500 L 1500,500" fill="none" stroke="#22d3a8" strokeWidth="4" />
            <path className="path-line" d="M 1000,1000 L 1000,1500 L 1500,1500" fill="none" stroke="#F43F5E" strokeWidth="4" />
            <path className="path-line" d="M 1000,1000 L 500,1500" fill="none" stroke="#1D4ED8" strokeWidth="4" />
            
            {/* Glowing Node at center */}
            <circle cx="1000" cy="1000" r="20" fill="#5B21B6" className="animate-pulse" />
            <circle cx="1000" cy="1000" r="40" fill="none" stroke="#5B21B6" strokeWidth="2" className="animate-ping" style={{ animationDuration: '3s' }} />
            
            {/* Terminal nodes */}
            <circle cx="500" cy="1000" r="10" fill="#22d3a8" />
            <circle cx="1500" cy="500" r="10" fill="#22d3a8" />
            <circle cx="1500" cy="1500" r="10" fill="#F43F5E" />
            <circle cx="500" cy="1500" r="10" fill="#1D4ED8" />
          </svg>
        </div>

        {/* Initial Hero Text (Fades out) */}
        <div className="hero-title absolute z-20 text-center flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-[#5B21B6] animate-pulse mb-8 blur-[2px] shadow-[0_0_50px_20px_#5B21B6]"></div>
          <h1 className="text-[clamp(4rem,10vw,9rem)] font-black leading-none tracking-tighter" style={{ fontFamily: "var(--font-syne)" }}>
            The Big <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-[#090A0F] to-[#5B21B6]">Picture.</span>
          </h1>
          <p className="mt-8 text-xl text-[#090A0F]/50 tracking-widest uppercase font-bold animate-bounce">Scroll to zoom out</p>
        </div>

        {/* UI Cards (Fade in at the end of the zoom) */}
        <div className="absolute z-30 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto">
          
          <div className="ui-card bg-white/60 backdrop-blur-2xl border border-[#090A0F]/5 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:bg-white/80 transition-colors">
            <Search size={40} className="text-[#22d3a8] mb-8" />
            <h2 className="text-3xl font-black mb-4 text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>System Audit</h2>
            <p className="text-[#090A0F]/70 leading-relaxed font-medium">
              We reverse-engineer your entire monolithic structure, identifying massive bottlenecks and critical security flaws before laying down the new blueprint.
            </p>
          </div>

          <div className="ui-card bg-white/60 backdrop-blur-2xl border border-[#090A0F]/5 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:bg-white/80 transition-colors md:translate-y-16">
            <Route size={40} className="text-[#1D4ED8] mb-8" />
            <h2 className="text-3xl font-black mb-4 text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>Tech Roadmap</h2>
            <p className="text-[#090A0F]/70 leading-relaxed font-medium">
              A step-by-step masterplan for scale. We plot the critical path ensuring absolutely zero downtime during the migration of live data.
            </p>
          </div>

          <div className="ui-card bg-white/60 backdrop-blur-2xl border border-[#090A0F]/5 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:bg-white/80 transition-colors md:translate-y-32">
            <ShieldCheck size={40} className="text-[#F43F5E] mb-8" />
            <h2 className="text-3xl font-black mb-4 text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>Phased Execution</h2>
            <p className="text-[#090A0F]/70 leading-relaxed font-medium">
              Flawless rollout with continuous real-time monitoring. Automated rollback triggers are integrated natively to guarantee zero-risk deployments.
            </p>
          </div>

        </div>

      </section>

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="relative z-10 w-full py-40 border-t border-[#090A0F]/5 bg-white">
        <div className="absolute inset-0 bg-[#5B21B6]/5 mix-blend-multiply"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>
            Ready to <span className="text-[#5B21B6]">architect?</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#090A0F]/60 font-medium max-w-2xl mb-12">
            Let's discuss how our blueprint can transform your architecture and accelerate your growth.
          </p>
          <button className="group relative px-10 py-5 rounded-full overflow-hidden shadow-2xl hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: "#090A0F" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: "#5B21B6" }}></div>
            <div className="relative flex items-center gap-3">
              <span className="text-white font-bold tracking-widest uppercase text-sm">Start the conversation</span>
              <ArrowRight className="text-white group-hover:translate-x-1 transition-all" size={18} />
            </div>
          </button>
        </div>
      </section>

    </main>
  );
}
