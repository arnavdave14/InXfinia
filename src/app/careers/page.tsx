"use client";

import { useEffect, useRef } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CareersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const zeroRolesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the hero text and scale it down slightly on scroll
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
        scale: 0.8,
        opacity: 0,
      });

      // Dramatically reveal the "0 Roles" section
      gsap.fromTo(zeroRolesRef.current, 
        { y: 200, opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: zeroRolesRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          y: 0,
          opacity: 1,
          scale: 1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa] selection:bg-purple-300 selection:text-black overflow-hidden" ref={containerRef}>
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-400/20 blur-[120px] mix-blend-multiply opacity-70 animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-[20%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-400/20 blur-[120px] mix-blend-multiply opacity-70 animate-[spin_15s_linear_infinite_reverse]" />
      </div>

      <MainNavbar />

      {/* Hero Section (Pinned) */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 md:px-8 text-center pt-20">
        <div ref={textRef} className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-black/5 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Join The Revolution
              </span>
            </div>
            
            <h1 className="font-syne text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-black mb-6">
              WORK AT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                INXFINIA.
              </span>
            </h1>
            
            <p className="font-mono text-black/50 text-lg md:text-2xl max-w-2xl mx-auto uppercase tracking-widest font-bold">
              Scroll down to view open roles ↓
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Reveal Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-32 bg-white/30 backdrop-blur-3xl rounded-t-[4rem] border-t border-white/50 shadow-[0_-20px_50px_rgba(0,0,0,0.03)]">
        <div ref={zeroRolesRef} className="max-w-4xl text-center">
          <h2 className="font-syne text-9xl md:text-[200px] font-black text-black leading-none mb-4 drop-shadow-xl">
            0
          </h2>
          <h3 className="font-syne text-4xl md:text-6xl font-bold text-black mb-8 tracking-tight">
            Roles currently available.
          </h3>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-xl md:text-2xl text-black/60 font-sans leading-relaxed">
              We move fast. Right now, our crew is fully stacked and perfectly balanced. 
              We don't have any open roles at this exact second.
            </p>
            
            <p className="text-xl md:text-2xl text-black/80 font-bold font-sans">
              But things change in a blink.
            </p>
          </div>

          <div className="mt-16 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-black/5 max-w-xl mx-auto transform hover:scale-[1.02] transition-transform duration-500">
            <h4 className="font-syne font-bold text-2xl mb-4 text-left text-black">
              Get notified when we expand
            </h4>
            <div className="relative">
              <input 
                type="email" 
                placeholder="you@genius.com" 
                className="w-full bg-gray-50 rounded-2xl py-5 pl-6 pr-16 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-lg font-medium transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center hover:bg-purple-600 transition-colors shadow-lg">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-black/40 mt-4 text-left font-mono uppercase tracking-wider font-bold">
              No spam. Only life-changing opportunities.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
