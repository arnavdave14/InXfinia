"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Activity, Database, BarChart3 } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AnalysisPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Data Stream Animation
      const particles = gsap.utils.toArray<HTMLElement>(".data-particle");
      particles.forEach((p) => {
        // Randomize starting position on the client to avoid hydration mismatch
        gsap.set(p, { left: `${gsap.utils.random(0, 100)}%` });
        
        gsap.to(p, {
          y: "100vh",
          duration: gsap.utils.random(2, 5),
          repeat: -1,
          ease: "none",
          delay: gsap.utils.random(0, 2)
        });
      });

      // 2. Zoom-In Dashboard Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".zoom-container",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      });

      // Scale up the dashboard until it fills the screen
      tl.to(".dashboard-mockup", {
        scale: 5,
        opacity: 0,
        ease: "power2.in"
      }, 0);

      // Fade in the actual content that was "inside" the dashboard
      tl.fromTo(".inside-content", 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, ease: "power2.out" }
      , 0.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#FAFAFA] text-[#090A0F] selection:bg-[#F43F5E] selection:text-white font-inter overflow-hidden relative">
      
      {/* Background Data Stream Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="data-particle absolute w-px h-12 bg-gradient-to-b from-transparent via-[#F43F5E] to-transparent"
            style={{ top: '-10vh' }}
          ></div>
        ))}
      </div>

      <div className="fixed top-8 left-8 z-50">
        <Link href="/" className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/70 backdrop-blur-xl border border-[#F43F5E]/20 shadow-xl hover:scale-110 transition-all duration-300">
          <ArrowLeft className="text-[#F43F5E] group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ══════════ DATA STREAM HERO ══════════ */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center pt-20 z-10 px-6 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#F43F5E]/20 shadow-lg mb-8">
          <Activity size={16} className="text-[#F43F5E]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#F43F5E]">Real-Time Analysis</span>
        </div>

        <h1 className="text-[clamp(3.5rem,7vw,7rem)] font-black leading-none tracking-tight mb-6" style={{ fontFamily: "var(--font-syne)" }}>
          Data-driven <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F43F5E] to-[#5B21B6]">decision making.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#090A0F]/70 font-medium max-w-2xl mt-4">
          We transform raw infrastructure data into intuitive, actionable insights, making your systems transparent and highly optimizable.
        </p>

        <div className="absolute bottom-10 animate-bounce">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F43F5E]">Scroll to Dive In</span>
        </div>
      </section>

      {/* ══════════ ZOOM-IN SCROLL ══════════ */}
      <section className="zoom-container relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
        
        {/* The Dashboard Mockup (Matches User Image) */}
        <div className="dashboard-mockup absolute w-[80vw] md:w-[60vw] aspect-[1.8/1] bg-white border border-[#090A0F]/5 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* macOS Mock Header */}
          <div className="h-8 border-b border-[#090A0F]/5 flex items-center px-4 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
          </div>
          {/* Mock Body */}
          <div className="flex-1 p-4 flex gap-4 bg-white">
            {/* Left Sidebar */}
            <div className="w-1/3 h-full border border-pink-200 rounded-lg bg-pink-50/50"></div>
            {/* Right Side */}
            <div className="flex-1 flex flex-col gap-4">
               {/* Top Chart Area */}
               <div className="h-1/2 border border-pink-200 rounded-lg bg-pink-50/50 relative overflow-hidden flex items-end">
                 {/* Pink Spline Curve */}
                 <svg className="absolute w-full h-[80%] bottom-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                   <path d="M0 100 Q 25 50 50 80 T 100 20" fill="none" stroke="#FFA7B5" strokeWidth="3" strokeLinecap="round" />
                 </svg>
               </div>
               {/* Bottom Data Area */}
               <div className="flex-1 border border-pink-200 rounded-lg bg-pink-50/50"></div>
            </div>
          </div>
        </div>

        {/* The Content "Inside" the dashboard (Changed to Light Theme for seamless transition) */}
        <div className="inside-content absolute inset-0 w-full h-full bg-white text-[#090A0F] flex items-center justify-center p-6 lg:p-24 opacity-0 pointer-events-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
            
            <div className="col-span-1 md:col-span-3 mb-12">
               <h2 className="text-5xl font-black mb-4" style={{ fontFamily: "var(--font-syne)" }}>Inside the <span className="text-[#F43F5E]">Matrix.</span></h2>
               <p className="text-xl text-[#090A0F]/60">Our analysis pipelines process petabytes of data.</p>
            </div>

            <div className="bg-white border border-[#090A0F]/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl p-8 hover:bg-[#FAFAFA] transition-colors pointer-events-auto">
              <Database size={40} className="text-[#F43F5E] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Data Ingestion</h3>
              <p className="text-[#090A0F]/60">High-throughput pipelines capable of ingesting petabytes of unstructured logs and metrics seamlessly.</p>
            </div>
            
            <div className="bg-white border border-[#090A0F]/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl p-8 hover:bg-[#FAFAFA] transition-colors pointer-events-auto">
              <Activity size={40} className="text-[#F43F5E] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Stream Processing</h3>
              <p className="text-[#090A0F]/60">Real-time transformation and aggregation using cutting-edge stream processing frameworks.</p>
            </div>
            
            <div className="bg-white border border-[#090A0F]/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl p-8 hover:bg-[#FAFAFA] transition-colors pointer-events-auto">
              <BarChart3 size={40} className="text-[#F43F5E] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Custom Dashboards</h3>
              <p className="text-[#090A0F]/60">Beautiful, intuitive interfaces that give you god-mode visibility into your entire tech stack.</p>
            </div>

          </div>
        </div>

      </section>

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="relative z-10 w-full py-32 bg-[#090A0F] text-white">
        <div className="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter" style={{ fontFamily: "var(--font-syne)" }}>
            Ready to <span style={{ color: "#F43F5E" }}>analyze?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mb-12">
            Let's discuss how our analytics can transform your architecture and accelerate your growth.
          </p>
          <button className="group relative px-10 py-5 rounded-full overflow-hidden shadow-2xl hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: "white" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: "#F43F5E" }}></div>
            <div className="relative flex items-center gap-3">
              <span className="text-[#090A0F] font-bold tracking-widest uppercase text-sm">Start the conversation</span>
            </div>
          </button>
        </div>
      </section>

    </main>
  );
}
