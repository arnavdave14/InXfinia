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
      id: "product",
      title: "Product Engineering",
      desc: "Build scalable digital products and software systems.",
      icon: <Cpu size={40} />,
      color: "#F43F5E",
      bg: "from-[#F43F5E]/5 to-transparent",
      features: ["Web & Mobile Development", "Custom Software Applications", "Scalable Product Architecture"]
    },
    {
      id: "ai",
      title: "AI Intelligence",
      desc: "AI systems built to understand context, knowledge, and business workflows.",
      icon: <Sparkles size={40} />,
      color: "#1D4ED8",
      bg: "from-[#1D4ED8]/5 to-transparent",
      features: ["Business Knowledge Ingestion", "Context-Aware AI", "AI Workflow Orchestration"]
    },
    {
      id: "data",
      title: "Connected Data",
      desc: "Bring business data, systems, and operations together for real-time visibility.",
      icon: <Database size={40} />,
      color: "#059669",
      bg: "from-[#059669]/5 to-transparent",
      features: ["Business Intelligence", "Dashboards & Reporting", "Data Integration"]
    },
    {
      id: "automation",
      title: "Automation & Integration",
      desc: "Connect systems, automate workflows, and reduce repetitive business operations.",
      icon: <ServerCog size={40} />,
      color: "#D97706",
      bg: "from-[#D97706]/5 to-transparent",
      features: ["Business Process Automation", "CRM & Workflow Integration", "AI-Powered Automation"]
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
            <motion.span custom={0} variants={textVariants} initial="hidden" animate="visible">The Modern</motion.span>
            <motion.div custom={1} variants={textVariants} initial="hidden" animate="visible" className="h-[80px] md:h-[120px] w-full flex items-center justify-center">
               <MorphingText texts={["Digital Platform.", "AI Engine.", "Automation Layer.", "Data Intelligence.", "Product Infrastructure."]} className="text-[#5B21B6] !h-[80px] md:!h-[120px]" />
            </motion.div>
          </h1>
          <motion.p 
            custom={2} variants={textVariants} initial="hidden" animate="visible"
            className="text-[#090A0F]/60 max-w-2xl mx-auto text-lg md:text-2xl font-medium mt-6"
          >
            A unified technology foundation for building intelligent products/services, powering AI, automating workflows, and transforming data into scalable digital solutions.
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
              <div className={`w-full bg-white/80 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 relative group`}
                   style={{ boxShadow: `0 30px 60px -15px ${card.color}20` }}>
                
                {/* Subtle gradient background for each card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-50 pointer-events-none`} />
                
                {/* Icon Container */}
                <div className="shrink-0 w-24 h-24 md:w-48 md:h-48 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
                     style={{ backgroundColor: `${card.color}15`, color: card.color, border: `1px solid ${card.color}30` }}>
                  {card.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-center relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/50 bg-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 w-fit shadow-sm"
                       style={{ color: card.color }}>
                    <Sparkles size={14} /> Layer {index + 1}
                  </div>
                  <h2 className="text-[clamp(2.2rem,8vw,3.75rem)] font-black tracking-tighter mb-3 md:mb-4 text-[#090A0F] leading-[1.1]">{card.title}</h2>
                  <p className="text-base md:text-xl text-[#090A0F]/60 font-medium mb-6 md:mb-8 leading-relaxed max-w-2xl">{card.desc}</p>
                  
                  {/* Features */}
                  <ul className="flex flex-col gap-2 md:gap-3">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#090A0F]/80 font-medium text-sm md:text-lg">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0" style={{ backgroundColor: card.color }} />
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-[#090A0F] leading-[1.1] break-words">
                Built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B21B6] via-[#1D4ED8] to-[#22d3a8]">turn ideas into technology.</span>
              </h2>
              <p className="text-[#090A0F]/60 font-medium leading-relaxed text-lg lg:text-xl mb-10 max-w-xl">
                A unified foundation for transforming complex ideas into intelligent, scalable technology built around real-world needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-strong bg-white/80 border border-[rgba(9,10,15,0.05)] px-6 py-5 lg:px-8 lg:py-6 rounded-3xl shadow-xl flex-1"
                >
                  <div className="text-3xl lg:text-4xl font-black text-[#5B21B6] tracking-tight mb-2">
                    BUILD
                  </div>
                  <div className="text-[10px] lg:text-xs font-bold text-[#090A0F]/50 uppercase tracking-widest">For Intelligence & Evolve</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-strong bg-white/80 border border-[rgba(9,10,15,0.05)] px-6 py-5 lg:px-8 lg:py-6 rounded-3xl shadow-xl flex-1"
                >
                  <div className="text-3xl lg:text-4xl font-black text-[#22d3a8] tracking-tight mb-2">
                    AUTOMATE
                  </div>
                  <div className="text-[10px] lg:text-xs font-bold text-[#090A0F]/50 uppercase tracking-widest">To Scale</div>
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
            <h3 className="font-bold text-lg lg:text-xl text-[#090A0F] tracking-tight">Global Network Load</h3>
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
          <p className="text-sm sm:text-lg font-bold text-[#090A0F]">24.8%</p>
        </div>
        <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-[rgba(9,10,15,0.05)] shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#090A0F]/50 font-bold mb-1">Bandwidth</p>
          <p className="text-sm sm:text-lg font-bold text-[#090A0F]">12.4 TB/s</p>
        </div>
        <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-[rgba(9,10,15,0.05)] shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#090A0F]/50 font-bold mb-1">Active Nodes</p>
          <p className="text-sm sm:text-lg font-bold text-[#22d3a8]">14,092</p>
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
