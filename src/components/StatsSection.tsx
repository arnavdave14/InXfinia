"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: "10+", unit: "Years", desc: "A decade building enterprise AI infrastructure for teams that refuse to compromise on performance or reliability." },
  { number: "500M+", unit: "API Calls / Day", desc: "Our inference engine handles half a billion requests daily across 50+ countries with zero cold-start latency." },
  { number: "10×", unit: "Faster", desc: "InXfinia models serve results 10× faster than traditional cloud AI endpoints, measured at p99 across all regions." },
];

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numbersRef.current || !ref.current) return;
    const items = numbersRef.current.querySelectorAll(".stat-item");
    
    // 3D Card Reveal
    gsap.fromTo(items,
      { y: 100, opacity: 0, rotateX: -15, scale: 0.9 },
      {
        y: 0, opacity: 1, rotateX: 0, scale: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );

    // Subtle parallax float for the whole section
    gsap.to(ref.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  return (
    <section ref={ref} className="relative z-10 px-4 md:px-8 lg:px-16 py-20 md:py-28 lg:py-40 perspective-[1000px]">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="section-tag mb-16 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-[#5B21B6] animate-pulse" /> 
        <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">By the numbers</span>
      </motion.div>

      <div ref={numbersRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="stat-item relative rounded-3xl p-6 md:p-8 lg:p-14 flex flex-col gap-4 lg:gap-6 overflow-hidden border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.05)] bg-white/30 backdrop-blur-3xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] group transform-gpu"
            style={{ opacity: 0 }}
          >
            {/* Ambient hover glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <div
                className="font-black leading-none mb-3 tracking-tighter bg-clip-text text-transparent transform-gpu transition-transform duration-300 group-hover:scale-105 origin-left"
                style={{
                  fontSize: "clamp(3rem, 5.5vw, 5rem)",
                  fontFamily: "var(--font-syne)",
                  backgroundImage: "linear-gradient(135deg, #111111 0%, #5B21B6 100%)",
                }}
              >
                {stat.number}
              </div>
              <div className="text-[11px] font-bold tracking-[0.2em] text-[#555] uppercase">{stat.unit}</div>
            </div>
            <p className="relative z-10 text-[#444] text-sm md:text-base font-medium leading-relaxed border-t border-black/10 pt-6 group-hover:text-black transition-colors duration-300">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
