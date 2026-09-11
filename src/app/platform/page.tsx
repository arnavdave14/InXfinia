"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Sparkles, Shield, Globe, ServerCog, Activity, Zap } from "lucide-react";
import { MorphingText } from "@/components/ui/morphing-text";

export default function PlatformPage() {
  const containerRef = useRef<HTMLElement>(null);

  const textVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const cards = [
    {
      id: "compute",
      title: "Hyperscale Compute",
      desc: "H100 GPU clusters & optimized TensorRT kernels.",
      icon: <Cpu size={40} />,
      color: "#F43F5E",
      bg: "from-[#F43F5E]/5 to-transparent",
      features: ["Auto-scaling Node Pools", "Custom CUDA Kernels", "Zero-downtime Deployments"]
    },
    {
      id: "data",
      title: "Vector Streams",
      desc: "Real-time Kafka & embedding integrations.",
      icon: <Database size={40} />,
      color: "#1D4ED8",
      bg: "from-[#1D4ED8]/5 to-transparent",
      features: ["Distributed Vector Search", "Real-time Sync", "Multi-region Replication"]
    },
    {
      id: "edge",
      title: "Global Edge",
      desc: "Zero-latency distributed deployment.",
      icon: <Globe size={40} />,
      color: "#059669",
      bg: "from-[#059669]/5 to-transparent",
      features: ["250+ PoPs Worldwide", "Intelligent Routing", "Edge Caching"]
    },
    {
      id: "api",
      title: "Secure Gateway",
      desc: "Unified GraphQL routing and caching layer.",
      icon: <Shield size={40} />,
      color: "#D97706",
      bg: "from-[#D97706]/5 to-transparent",
      features: ["DDoS Protection", "Rate Limiting", "Schema Stitching"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#090A0F] selection:bg-[#5B21B6] selection:text-white pb-8 md:pb-32">
      {/* Animated mesh gradient background — matches home page */}
      <div className="mesh-bg" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>


      
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 z-10">
        <div className="relative w-full text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(91,33,182,0.15)] bg-white/60 text-[#5B21B6] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm backdrop-blur-md"
          >
            <Sparkles size={14} className="animate-pulse" /> Platform Architecture
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-[#090A0F] drop-shadow-xl flex flex-col items-center justify-center">
            <motion.span custom={0} variants={textVariants} initial="hidden" animate="visible">The modern</motion.span>
            <motion.div custom={1} variants={textVariants} initial="hidden" animate="visible" className="h-[80px] md:h-[120px] w-full flex items-center justify-center">
               <MorphingText texts={["AI Engine.", "Data Layer.", "Orchestrator.", "Inference."]} className="text-[#5B21B6] !h-[80px] md:!h-[120px]" />
            </motion.div>
          </h1>
          <motion.p 
            custom={2} variants={textVariants} initial="hidden" animate="visible"
            className="text-[#090A0F]/60 max-w-xl mx-auto text-lg md:text-2xl font-medium mt-6"
          >
            A unified stack for inference, data streaming, and orchestration. Built for zero latency.
          </motion.p>
        </div>
      </section>

      {/* Sticky Stacking Cards Section */}
      <section className="relative w-full max-w-6xl mx-auto px-4 pt-16 md:pt-32 pb-32 md:pb-[50vh] z-20 flex flex-col gap-12">
        {cards.map((card, index) => {
          // Calculate the top offset based on index to create the stacking effect
          const topOffset = 140 + (index * 40); // Base top offset + staggering
          
          return (
            <div 
              key={card.id}
              className="sticky transition-all duration-500 ease-out"
              style={{ top: `${topOffset}px` }}
            >
              <div className={`w-full bg-white/80 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[3rem] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-12 relative group`}
                   style={{ boxShadow: `0 30px 60px -15px ${card.color}20` }}>
                
                {/* Subtle gradient background for each card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-50 pointer-events-none`} />
                
                {/* Icon Container */}
                <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
                     style={{ backgroundColor: `${card.color}15`, color: card.color, border: `1px solid ${card.color}30` }}>
                  {card.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-center relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/50 bg-white/60 text-xs font-bold uppercase tracking-widest mb-6 w-fit shadow-sm"
                       style={{ color: card.color }}>
                    <Sparkles size={14} /> Node {index + 1}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-[#090A0F]">{card.title}</h2>
                  <p className="text-xl text-[#090A0F]/60 font-medium mb-8 leading-relaxed max-w-2xl">{card.desc}</p>
                  
                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#090A0F]/80 font-medium text-lg">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Detail Section - Built for extreme scale */}
      <section className="pt-16 pb-8 md:py-32 px-4 md:px-16 max-w-7xl mx-auto relative z-10 mt-16 md:mt-32">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight text-[#090A0F] leading-[1.1]">
                Built for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B21B6] via-[#1D4ED8] to-[#22d3a8]">extreme scale.</span>
              </h2>
              <p className="text-[#090A0F]/60 font-medium leading-relaxed text-xl mb-10">
                The platform is designed from the ground up to handle massive throughput with predictable sub-millisecond latencies. By removing virtualization overhead, we achieve unparalleled performance metrics.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-strong bg-white/80 border border-[rgba(9,10,15,0.05)] px-8 py-6 rounded-3xl shadow-xl flex-1 min-w-[200px]"
                >
                  <div className="text-4xl lg:text-5xl font-black text-[#5B21B6] tracking-tighter mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                    <PlatformAnimatedCounter value={100} suffix="M+" />
                  </div>
                  <div className="text-sm font-bold text-[#090A0F]/50 uppercase tracking-widest">Requests / Sec</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-strong bg-white/80 border border-[rgba(9,10,15,0.05)] px-8 py-6 rounded-3xl shadow-xl flex-1 min-w-[200px]"
                >
                  <div className="text-4xl lg:text-5xl font-black text-[#22d3a8] tracking-tighter mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                    <PlatformAnimatedCounter value={1.2} suffix="ms" decimals={1} />
                  </div>
                  <div className="text-sm font-bold text-[#090A0F]/50 uppercase tracking-widest">P99 Latency</div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative h-[500px] w-full rounded-[3rem] glass-strong bg-gradient-to-br from-white/60 to-white/20 border border-white/40 shadow-[0_30px_60px_rgba(9,10,15,0.05)] overflow-hidden flex items-center justify-center group transform-gpu"
              style={{ perspective: 1000 }}
            >
               {/* 3D floating elements effect */}
               <motion.div 
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-50%] bg-gradient-to-br from-[#1D4ED8]/20 via-transparent to-[#22d3a8]/20 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl"
               ></motion.div>
               
               <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-white"></div>
               
               <ServerMetricsDashboard />
            </motion.div>
         </div>
      </section>
    </main>
  );
}

function ServerMetricsDashboard() {
  return (
    <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between z-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5B21B6]/10 to-[#22d3a8]/20 flex items-center justify-center border border-[#22d3a8]/30 shadow-inner">
            <Activity className="text-[#5B21B6]" size={24} />
          </div>
          <div>
            <h3 className="font-black text-xl text-[#090A0F] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>Global Network Load</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22d3a8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22d3a8]"></span>
              </span>
              <p className="text-[10px] text-[#090A0F]/60 uppercase tracking-[0.2em] font-bold">All Systems Operational</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-[#090A0F]/5 px-3 py-1.5 rounded-full border border-[rgba(9,10,15,0.05)]">
          <Zap className="text-[#D97706]" size={14} />
          <span className="text-xs font-bold text-[#090A0F]/70">Auto-Scaling Active</span>
        </div>
      </div>

      {/* Live Graph Area */}
      <div className="flex-1 w-full bg-white/40 rounded-3xl border border-white/60 p-4 sm:p-6 flex items-end justify-between gap-1 sm:gap-2 overflow-hidden relative group shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-t from-[#5B21B6]/5 to-transparent opacity-50" />
        
        {/* Animated Bars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full bg-gradient-to-t from-[#5B21B6] to-[#22d3a8] rounded-t-sm origin-bottom opacity-80"
            initial={{ height: "20%" }}
            animate={{ 
              height: [`${20 + Math.random() * 30}%`, `${60 + Math.random() * 40}%`, `${20 + Math.random() * 30}%`] 
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
        <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-[rgba(9,10,15,0.05)] shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#090A0F]/50 font-bold mb-1">CPU Load</p>
          <p className="text-base sm:text-lg font-black text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>24.8%</p>
        </div>
        <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-[rgba(9,10,15,0.05)] shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#090A0F]/50 font-bold mb-1">Bandwidth</p>
          <p className="text-base sm:text-lg font-black text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>12.4 TB/s</p>
        </div>
        <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-[rgba(9,10,15,0.05)] shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#090A0F]/50 font-bold mb-1">Active Nodes</p>
          <p className="text-base sm:text-lg font-black text-[#22d3a8]" style={{ fontFamily: "var(--font-syne)" }}>14,092</p>
        </div>
      </div>
    </div>
  );
}

// Simple Animated Counter Component
function PlatformAnimatedCounter({ value, suffix = "", decimals = 0 }: { value: number, suffix?: string, decimals?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const end = value;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const updateCounter = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function (easeOutQuart)
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          const currentCount = start + (end - start) * easeProgress;
          
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };
        
        requestAnimationFrame(updateCounter);
        observer.disconnect();
      }
    });
    
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    return () => observer.disconnect();
  }, [value]);
  
  return (
    <span ref={nodeRef}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}
