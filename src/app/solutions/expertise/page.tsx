"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Code2, Cloud, Zap } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ExpertisePage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".explosion-container",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      // 1. The Terminal Code blocks scale up wildly in Z-space and fade out
      tl.to(".code-layer-1", { z: 1000, scale: 5, opacity: 0, duration: 1 }, 0);
      tl.to(".code-layer-2", { z: 800, scale: 4, opacity: 0, duration: 1 }, 0.2);
      tl.to(".code-layer-3", { z: 600, scale: 3, opacity: 0, duration: 1 }, 0.4);

      // 2. The Terminal window borders shatter
      tl.to(".terminal-window", {
        scale: 1.5,
        opacity: 0,
        rotationX: 45,
        rotationY: 45,
        duration: 1,
        ease: "power2.inOut"
      }, 0.5);

      // 3. The actual UI Cards fly IN from the chaotic void
      tl.fromTo(".glass-card",
        { z: -1000, scale: 0.1, opacity: 0, rotationX: -90 },
        { z: 0, scale: 1, opacity: 1, rotationX: 0, stagger: 0.2, duration: 1.5, ease: "back.out(1.2)" },
        1
      );

      // Floating ambient code outside the scroll trigger
      const ambientNodes = gsap.utils.toArray<HTMLElement>(".ambient-code");
      ambientNodes.forEach((node) => {
        gsap.set(node, { top: `-${gsap.utils.random(0, 100)}vh` });
      });

      gsap.to(ambientNodes, {
        y: "100vh",
        duration: "random(10, 20)",
        repeat: -1,
        ease: "none",
        stagger: { each: 0.5, from: "random" }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#FAFAFA] text-[#090A0F] selection:bg-[#1D4ED8] selection:text-white font-inter overflow-hidden relative" style={{ perspective: "1000px" }}>
      
      {/* Premium Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link href="/" className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/70 backdrop-blur-xl border border-[#1D4ED8]/20 shadow-xl hover:scale-110 transition-all duration-300">
          <ArrowLeft className="text-[#1D4ED8] group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Ambient Falling Code */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 font-mono text-xs text-[#090A0F] overflow-hidden flex justify-around">
        {[...Array(20)].map((_, i) => (
           <div key={i} className="ambient-code relative">
             10101101<br/>01110010<br/>11010101<br/>function()<br/>await res
           </div>
        ))}
      </div>

      {/* ══════════ EXPLOSION SEQUENCE ══════════ */}
      <section className="explosion-container relative w-full h-screen flex flex-col items-center justify-center pt-20 z-10 px-6" style={{ transformStyle: "preserve-3d" }}>
        
        {/* The Hero Text that floats above it all */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 text-center w-full">
           <h1 className="text-[clamp(2rem,5vw,5rem)] font-black tracking-tighter" style={{ fontFamily: "var(--font-syne)" }}>
             Raw Talent. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] to-[#22d3a8]">Refined Product.</span>
           </h1>
           <p className="mt-4 text-[#090A0F]/50 tracking-widest uppercase font-bold animate-pulse text-sm">Scroll to compile</p>
        </div>

        {/* The Terminal Mockup (Shatters on scroll) */}
        <div className="terminal-window absolute w-full max-w-4xl aspect-video bg-white/80 backdrop-blur-3xl border border-[#090A0F]/5 rounded-2xl shadow-[0_30px_100px_rgba(29,78,216,0.15)] flex flex-col overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
           
           {/* Terminal Header */}
           <div className="h-10 bg-white/50 border-b border-[#090A0F]/5 flex items-center px-4 gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
             <div className="w-3 h-3 rounded-full bg-green-500"></div>
             <div className="ml-4 text-xs font-mono text-[#090A0F]/50">root@inxfinia:~/engineering</div>
           </div>
           
           {/* Terminal Body with 3D text layers */}
           <div className="flex-1 p-8 font-mono text-lg md:text-xl leading-relaxed relative" style={{ transformStyle: "preserve-3d" }}>
              <div className="code-layer-1 absolute text-[#1D4ED8]" style={{ transform: "translateZ(50px)" }}>
                export const scaleInfrastructure = async (load: LoadMetrics) =&gt; {'{'} <br/>
                &nbsp;&nbsp;const cluster = await k8s.provision(load); <br/>
                &nbsp;&nbsp;return cluster.optimize(); <br/>
                {'}'}
              </div>
              <div className="code-layer-2 absolute text-[#22d3a8] opacity-80" style={{ transform: "translateZ(20px)", top: "150px", left: "100px" }}>
                impl Engine for Core {'{'} <br/>
                &nbsp;&nbsp;fn execute(&amp;self) -&gt; Result&lt;(), Error&gt; {'{'} <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;self.ignite_threads(100_000) <br/>
                &nbsp;&nbsp;{'}'} <br/>
                {'}'}
              </div>
              <div className="code-layer-3 absolute text-[#090A0F] opacity-50" style={{ transform: "translateZ(-20px)", top: "250px", left: "50px" }}>
                SELECT * FROM neural_weights <br/>
                WHERE accuracy &gt; 0.999 <br/>
                ORDER BY latency ASC;
              </div>
              
              {/* Blinking cursor */}
              <div className="absolute bottom-8 left-8 w-4 h-6 bg-[#1D4ED8] animate-pulse"></div>
           </div>
        </div>

        {/* The UI Cards (Fly in from the void) */}
        <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-24 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl relative z-40 pointer-events-auto">
             
             <div className="glass-card bg-white/80 backdrop-blur-3xl border border-[#090A0F]/5 rounded-3xl p-10 shadow-2xl flex flex-col gap-6 transform-gpu">
                <div className="w-16 h-16 rounded-full bg-[#1D4ED8]/10 flex items-center justify-center border border-[#1D4ED8]/20">
                  <Code2 size={32} className="text-[#1D4ED8]" />
                </div>
                <h2 className="text-3xl font-black text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>Applied AI</h2>
                <p className="text-[#090A0F]/70 font-medium leading-relaxed">
                  Integrating LLMs and custom ML models into your product pipeline. We don't just use APIs; we build the foundational intelligence layers.
                </p>
             </div>

             <div className="glass-card bg-white/80 backdrop-blur-3xl border border-[#090A0F]/5 rounded-3xl p-10 shadow-2xl flex flex-col gap-6 transform-gpu mt-0 md:mt-24">
                <div className="w-16 h-16 rounded-full bg-[#22d3a8]/10 flex items-center justify-center border border-[#22d3a8]/20">
                  <Cloud size={32} className="text-[#22d3a8]" />
                </div>
                <h2 className="text-3xl font-black text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>Cloud Native</h2>
                <p className="text-[#090A0F]/70 font-medium leading-relaxed">
                  Deep expertise across AWS, GCP, and Azure. We engineer Kubernetes clusters that heal themselves under extreme load conditions.
                </p>
             </div>

             <div className="glass-card bg-[#1D4ED8] backdrop-blur-3xl border border-white/20 rounded-3xl p-10 shadow-2xl flex flex-col gap-6 transform-gpu">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                  <Zap size={32} className="text-white" />
                </div>
                <h2 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Edge APIs</h2>
                <p className="text-white/80 font-medium leading-relaxed">
                  Building ultra-low latency, globally distributed APIs serving millions of concurrent requests. We put compute milliseconds from your users.
                </p>
             </div>

           </div>
        </div>

      </section>

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="relative z-10 w-full py-40 border-t border-[#090A0F]/5 bg-white">
        <div className="absolute inset-0 bg-[#1D4ED8]/5 mix-blend-multiply"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>
            Ready to <span className="text-[#1D4ED8]">engineer?</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#090A0F]/60 font-medium max-w-2xl mb-12">
            Hire the elite talent that builds the infrastructure for industry leaders.
          </p>
          <button className="group relative px-10 py-5 rounded-full overflow-hidden shadow-2xl hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: "#090A0F" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: "#1D4ED8" }}></div>
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
