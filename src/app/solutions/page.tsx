"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { TrendingUp, Stethoscope, BrainCircuit, ShoppingBag } from "lucide-react";

const SOLUTIONS = [
  {
    title: "Financial Services",
    subtitle: "Fraud detection at the speed of transactions.",
    desc: "Process millions of events per second with sub-millisecond latency. Our specialized compute nodes are designed for the high-frequency demands of quantitative trading and real-time fraud detection.",
    color: "#22d3a8",
    icon: TrendingUp
  },
  {
    title: "Healthcare & Biotech",
    subtitle: "Accelerating drug discovery.",
    desc: "Train massive foundation models on genomic data securely. InXfinia provides HIPAA-compliant, single-tenant clusters with zero-trust networking baked in from the ground up.",
    color: "#1D4ED8",
    icon: Stethoscope
  },
  {
    title: "Autonomous Agents",
    subtitle: "Orchestration for multi-step reasoning.",
    desc: "Built-in memory stores, native vector search, and dynamic prompt routing allow you to deploy autonomous agents that can plan, execute, and learn without infrastructure overhead.",
    color: "#5B21B6",
    icon: BrainCircuit
  },
  {
    title: "E-Commerce",
    subtitle: "Hyper-personalized recommendations.",
    desc: "Serve tailored product recommendations to millions of concurrent users during peak flash sales. Our edge-caching layer ensures global availability without breaking a sweat.",
    color: "#D97706",
    icon: ShoppingBag
  }
];

export default function SolutionsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Horizontal Scroll Timeline
      const sections = gsap.utils.toArray<HTMLElement>(".solution-panel");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + scrollWrapperRef.current!.offsetWidth,
        }
      });

      tl.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none"
      });
      
      // Reveal animations for each panel
      sections.forEach((section, i) => {
        if (i === 0) return; // First is already visible
        gsap.fromTo(section.querySelectorAll(".stagger-reveal"), 
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              containerAnimation: tl,
              start: "left center",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(".solution-panel", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#090A0F] selection:bg-[#5B21B6] selection:text-white pb-20">
      {/* Animated mesh gradient background */}
      <div className="mesh-bg" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      {/* Spacer for navbar */}
      <div className="h-24"></div>
      
      {/* Intro */}
      <section className="relative px-8 md:px-16 pt-20 pb-10 max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6" style={{ fontFamily: "var(--font-syne)" }}>
            Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B21B6] to-[#22d3a8]">scale.</span>
          </h1>
          <p className="text-[#090A0F]/70 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
            From high-frequency trading to complex autonomous agents, see how industry leaders leverage InXfinia's raw power.
          </p>
        </motion.div>
      </section>

      {/* Horizontal Scroll Section */}
      <section ref={containerRef} className="relative w-full h-[80vh] md:h-screen flex items-center overflow-hidden z-20">
        
        <div ref={scrollWrapperRef} className="flex flex-col md:flex-row h-full w-full md:w-[400vw]">
          {SOLUTIONS.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <div key={i} className="solution-panel relative w-full md:w-screen h-full flex items-center justify-center p-4 md:p-12 lg:p-24 flex-shrink-0 group">
                
                {/* Background Number Watermark */}
                <div 
                  className="absolute left-[10%] top-[10%] text-[20vw] md:text-[15vw] font-black opacity-[0.03] pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.05]"
                  style={{ color: sol.color, fontFamily: "var(--font-syne)" }}
                >
                  0{i+1}
                </div>

                <div className="glass-strong bg-white/70 backdrop-blur-3xl border border-white shadow-2xl rounded-[3rem] w-full max-w-6xl overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-stretch p-8 md:p-16">
                    
                    {/* Content Left */}
                    <div className="flex flex-col justify-center relative z-10">
                      <div className="stagger-reveal flex items-center gap-4 mb-8">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: `${sol.color}15`, border: `1px solid ${sol.color}30` }}
                        >
                          <Icon color={sol.color} size={32} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>
                          {sol.title}
                        </h2>
                      </div>
                      
                      <h3 className="stagger-reveal text-xl md:text-2xl font-bold mb-6 tracking-tight" style={{ color: sol.color }}>
                        {sol.subtitle}
                      </h3>
                      <p className="stagger-reveal text-[#090A0F]/70 text-lg leading-relaxed font-medium">
                        {sol.desc}
                      </p>
                    </div>
                    
                    {/* Dynamic Visual Right */}
                    <div className="stagger-reveal hidden md:flex h-[350px] lg:h-[450px] w-full bg-white/40 border border-white/60 rounded-[2rem] items-center justify-center relative overflow-hidden shadow-inner">
                      {/* Ambient Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-opacity duration-1000" style={{ backgroundImage: `linear-gradient(to bottom right, transparent, ${sol.color})` }}></div>
                      
                      {/* Floating Dynamic Element */}
                      <motion.div 
                        animate={{ 
                          y: [0, -20, 0],
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                        className="relative z-10 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-white/80 shadow-2xl border border-white/50 backdrop-blur-md flex items-center justify-center"
                      >
                        <div 
                          className="absolute inset-0 rounded-full animate-ping opacity-20"
                          style={{ backgroundColor: sol.color, animationDuration: '3s' }}
                        />
                        <Icon color={sol.color} size={80} strokeWidth={1.5} className="opacity-80" />
                      </motion.div>

                      {/* Particles / Details */}
                      {[...Array(5)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          animate={{
                            y: ["-100%", "100%"],
                            x: Math.sin(idx) * 50,
                            opacity: [0, 0.5, 0]
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "linear"
                          }}
                          className="absolute w-1 h-1 rounded-full"
                          style={{ 
                            backgroundColor: sol.color,
                            left: `${20 + idx * 15}%`
                          }}
                        />
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </section>
    </main>
  );
}
