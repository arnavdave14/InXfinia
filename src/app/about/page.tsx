"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { 
  Code2, Paintbrush, BarChart3, Zap, BrainCircuit, Rocket, 
  MessageSquare, Scale, ArrowUpRight, ArrowRight
} from "lucide-react";

const VISION_TEXT = "Build technology that outgrows the original idea.";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  // Refs for new sections
  const ringRef = useRef<HTMLDivElement>(null);
  const portalContainerRef = useRef<HTMLDivElement>(null);
  const visionTextRef = useRef<HTMLDivElement>(null);
  const abyssRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Original Timeline line drawing
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".svg-container",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }

      // 2. Timeline text blocks
      const textBlocks = gsap.utils.toArray(".about-text");
      textBlocks.forEach((block: any) => {
        gsap.fromTo(block, 
          { opacity: 0, filter: "blur(20px)", y: 80 },
          {
            opacity: 1, filter: "blur(0px)", y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            }
          }
        );
      });

      // ==========================================
      // NEW "NEVER SEEN BEFORE" ANIMATIONS
      // ==========================================

      // A. "What We Do" - The 3D Scroll Ring
      // Instead of a grid, the cards form a 3D cylinder that rotates as you scroll.
      if (ringRef.current) {
        const cards = gsap.utils.toArray(".ring-card");
        const radius = window.innerWidth < 768 ? 250 : 450;
        
        // Position cards in a circle
        cards.forEach((card: any, i: number) => {
          const angle = (i / cards.length) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          gsap.set(card, {
            x: x,
            z: z,
            rotationY: (i / cards.length) * 360,
            transformOrigin: "50% 50%"
          });
        });

        // Rotate the entire ring on scroll
        gsap.to(ringRef.current, {
          rotationY: -360,
          ease: "none",
          scrollTrigger: {
            trigger: ".wwd-section",
            start: "top top",
            end: "+=2000", // 2000px of scrolling
            pin: true,
            scrub: 1,
          }
        });
      }

      // B. "Our Products" - Smooth Card Stack Effect
      if (portalContainerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: portalContainerRef.current,
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: 1,
          }
        });

        // WotXai Card (Front) - slides up and fades
        tl.to(".portal-card-1", {
          yPercent: -100,
          scale: 0.95,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1
        }, 0);

        // Weighbridge Card (Back) - scales up and moves into place
        tl.fromTo(".portal-card-2", 
          { yPercent: 30, scale: 0.85, opacity: 0 },
          { yPercent: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1 },
          0.1
        );
      }

      // C. "Our Vision" - Scattered 3D Particle Reassembly
      // Words are randomly scattered in 3D space, and snap together on scroll.
      if (visionTextRef.current) {
        const words = gsap.utils.toArray(".scatter-word");
        words.forEach((word: any) => {
          // Set random initial positions
          gsap.set(word, {
            x: () => gsap.utils.random(-800, 800),
            y: () => gsap.utils.random(-800, 800),
            z: () => gsap.utils.random(-1000, 1000),
            rotationX: () => gsap.utils.random(-180, 180),
            rotationY: () => gsap.utils.random(-180, 180),
            rotationZ: () => gsap.utils.random(-180, 180),
            opacity: 0,
            scale: () => gsap.utils.random(0.5, 3)
          });
        });

        // Assemble them
        gsap.to(words, {
          x: 0, y: 0, z: 0,
          rotationX: 0, rotationY: 0, rotationZ: 0,
          opacity: 1,
          scale: 1,
          duration: 2,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".vision-section",
            start: "top 60%",
            end: "center center",
            scrub: 1,
          }
        });
      }

      // The Abyss
      if (abyssRef.current) {
        gsap.to(".abyss-container", {
          z: 1500,
          rotateX: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".abyss-wrapper",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
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

      <main ref={containerRef} className="relative z-10 pt-0 pb-0 overflow-clip">
        {/* Giant Hero Title */}
        <div className="min-h-[100svh] flex flex-col items-center justify-center max-w-[84rem] mx-auto text-center relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-syne text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.85] tracking-tighter text-[#090A0F] mix-blend-overlay"
          >
            WE BUILD<br />WHAT'S NEXT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-8 font-mono text-sm uppercase tracking-widest text-violet-600 font-bold max-w-2xl px-4"
          >
            INXFINIA is a technology and product company built around one simple idea — great technology should solve real problems, create new possibilities, and keep evolving.
          </motion.p>
        </div>

        {/* Floating Bubble Content */}
        <div className="relative max-w-[84rem] mx-auto h-[350vh] md:h-[200vh]">
          {/* The Winding Timeline SVG */}
          <div className="svg-container absolute -top-[40vh] bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[40rem] pointer-events-none z-0 opacity-60">
            <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full stroke-violet-500 overflow-visible">
              <path
                ref={pathRef}
                d="M50,0 C80,100 20,200 50,300 C80,400 20,500 50,600 C80,700 20,800 50,900 C80,1000 50,1000 50,1000"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* Text Block 1 */}
          <div data-speed="1.2" className="about-text absolute top-[5%] md:left-[10%] w-[90%] md:w-full max-w-[28rem] p-4 left-1/2 -translate-x-1/2 md:translate-x-0">
            <span className="text-sm font-mono font-black text-violet-600 mb-2 block uppercase tracking-widest">01 — WHO WE ARE</span>
            <h3 className="font-syne text-3xl md:text-4xl font-black mb-3 text-[#090A0F]">Technology is our medium.</h3>
            <p className="text-lg text-[#333333] leading-relaxed font-medium">
              INXFINIA brings together technology, creativity, intelligence, and business thinking to turn ideas and challenges into meaningful digital products, solutions, and experiences.
            </p>
          </div>

          {/* Text Block 2 */}
          <div data-speed="0.8" className="about-text absolute top-[30%] md:right-[5%] w-[90%] md:w-full max-w-[32rem] p-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto">
            <span className="text-sm font-mono font-black text-violet-600 mb-2 block uppercase tracking-widest">02 — WHY INXFINIA</span>
            <h3 className="font-syne text-4xl md:text-5xl font-black mb-3 text-[#090A0F]">Technology that works.</h3>
            <p className="text-lg text-[#333333] leading-relaxed font-medium">
              The digital world changes quickly. New technologies appear, customer expectations shift, and yesterday's solutions can become tomorrow's limitations. We build with that reality in mind.
            </p>
          </div>

          {/* Text Block 3 */}
          <div data-speed="1.5" className="about-text absolute top-[55%] md:left-[15%] w-[90%] md:w-full max-w-[32rem] p-4 left-1/2 -translate-x-1/2 md:translate-x-0">
            <span className="text-sm font-mono font-black text-violet-600 mb-2 block uppercase tracking-widest">05 — HOW WE THINK</span>
            <h3 className="font-syne text-5xl md:text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">
              Curious by nature.
            </h3>
            <p className="text-xl text-[#333333] leading-relaxed font-medium">
              We start with the problem, not the technology. Every product, system, and experience should have a reason to exist. Launch is not the finish line.
            </p>
          </div>

          {/* Text Block 4 */}
          <div data-speed="1.1" className="about-text absolute top-[80%] md:right-[15%] w-[90%] md:w-full max-w-[30rem] p-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto">
            <span className="text-sm font-mono font-black text-violet-600 mb-2 block uppercase tracking-widest">06 — HOW WE BUILD</span>
            <h3 className="font-syne text-4xl md:text-5xl font-black mb-4 text-[#090A0F]">
              Think → Create → Build
            </h3>
            <p className="text-lg text-[#333333] leading-relaxed mb-8 font-medium">
              We understand the context, explore possibilities, create the right direction, build the solution, learn from reality, and keep improving it.
            </p>
          </div>
        </div>

        {/* 
          =========================================================================
          NEW "NEVER SEEN BEFORE" SECTIONS
          =========================================================================
        */}

        {/* 03 WHAT WE DO - The 3D Scroll Ring */}
        <section className="wwd-section relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-10 left-10 md:top-20 md:left-20 z-20">
            <div className="font-mono text-xs font-black uppercase tracking-widest text-violet-600 mb-4">03 — What We Do</div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold max-w-sm text-[#090A0F]">
              From an idea to something real.
            </h2>
          </div>
          
          <div className="perspective-container w-full h-full flex items-center justify-center" style={{ perspective: "1500px" }}>
            <div ref={ringRef} className="relative w-0 h-0" style={{ transformStyle: "preserve-3d" }}>
              {[
                { title: "BUILD", icon: Code2, desc: "Web • Mobile • Software" },
                { title: "DESIGN", icon: Paintbrush, desc: "UI/UX • Branding" },
                { title: "UNDERSTAND", icon: BarChart3, desc: "Data • Intelligence" },
                { title: "AUTOMATE", icon: Zap, desc: "Workflows • AI" },
                { title: "INTELLIGENT", icon: BrainCircuit, desc: "Custom Models • Apps" },
                { title: "GROW", icon: Rocket, desc: "SEO • Conversion" }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="ring-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[300px] h-[340px] md:h-[400px] bg-white/40 backdrop-blur-xl border border-black/5 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-lg"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mb-6 border border-violet-200">
                    <item.icon size={36} className="text-violet-600" />
                  </div>
                  <h3 className="font-syne text-2xl font-bold mb-3 text-[#090A0F]">{item.title}</h3>
                  <p className="font-mono text-xs font-bold text-black/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 OUR PRODUCTS - The Infinite Dive Portal */}
        <section ref={portalContainerRef} className="relative w-full h-screen overflow-hidden">
          {/* Card 2 (Weighbridge) - Starts small and grows */}
          <div className="portal-card-2 absolute inset-0 flex items-center justify-center p-6 md:p-12 z-10">
            <div className="w-full h-full max-w-[80rem] bg-gradient-to-br from-violet-600 to-blue-900 rounded-[3rem] p-8 md:p-16 lg:p-24 text-white flex flex-col lg:flex-row justify-between items-center shadow-[0_0_100px_rgba(91,33,182,0.5)] relative overflow-hidden">
               <div className="lg:w-1/2 relative z-10 w-full mb-10 lg:mb-0">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono font-bold mb-6 lg:mb-8 border border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" /> Live Product
                  </div>
                  <h3 className="font-syne text-[clamp(2.5rem,7vw,5.5rem)] font-black mb-4 leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white break-words">
                    Weighbridge
                  </h3>
                  <p className="text-white/80 text-xl md:text-2xl lg:text-3xl max-w-xl font-medium mt-4 lg:mt-6">
                    Technology-driven solutions for smarter weighbridge operations.
                  </p>
                  
                  <div className="mt-8 lg:mt-12 flex items-center gap-3 text-sm font-mono font-bold uppercase text-cyan-400 group-hover:gap-6 transition-all duration-300 cursor-pointer">
                    Explore Ecosystem <ArrowRight size={18} />
                  </div>
                </div>

                {/* Dummy UI for Weighbridge */}
                <div className="lg:w-[45%] w-full h-[250px] lg:h-[400px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col shadow-2xl relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-[10px] lg:text-xs font-bold text-white/50 font-mono uppercase tracking-widest">Live Terminal API</div>
                    <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-mono border border-cyan-500/30">v2.1 Connected</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                    <div className="bg-black/20 rounded-2xl p-4 lg:p-5 border border-white/5">
                      <div className="text-[10px] lg:text-xs text-cyan-400 font-mono mb-1.5 lg:mb-2">Gross Weight</div>
                      <div className="text-xl lg:text-3xl font-black text-white">42,500 <span className="text-xs lg:text-sm text-white/50 font-normal">KG</span></div>
                    </div>
                    <div className="bg-black/20 rounded-2xl p-4 lg:p-5 border border-white/5">
                      <div className="text-[10px] lg:text-xs text-blue-400 font-mono mb-1.5 lg:mb-2">Vehicle Status</div>
                      <div className="text-lg lg:text-xl font-bold text-white flex items-center gap-2 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"/> Cleared
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-black/20 rounded-2xl border border-white/5 p-3 lg:p-4 flex items-end gap-1.5 overflow-hidden">
                    {[40, 70, 45, 90, 65, 80, 50, 100, 60, 30].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500/60 to-blue-500/30 rounded-t-sm hover:opacity-70 transition-opacity" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
            </div>
          </div>

          {/* Card 1 (WotXai) - Starts normal, slides up */}
          <div className="portal-card-1 absolute inset-0 flex items-center justify-center p-6 md:p-12 z-20">
            <div className="w-full h-full max-w-[80rem] bg-[#090A0F] rounded-[3rem] p-8 md:p-16 lg:p-24 text-white flex flex-col lg:flex-row justify-between items-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-auto lg:-translate-x-0 lg:right-0 p-8 opacity-[0.03] scale-150 -translate-y-10 lg:translate-x-10 pointer-events-none">
                 <MessageSquare size={400} />
               </div>
               
               <div className="lg:w-1/2 relative z-10 w-full mb-10 lg:mb-0">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono font-bold mb-6 lg:mb-8 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" /> Live Product
                  </div>
                  <h3 className="font-syne text-[clamp(2.5rem,7vw,5.5rem)] font-black mb-4 leading-none text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-100 break-words">
                    WotXai
                  </h3>
                  <p className="text-white/80 text-xl md:text-2xl lg:text-3xl max-w-xl font-medium mt-4 lg:mt-6">
                    AI-powered WhatsApp intelligence, automation, and customer communication.
                  </p>
                  <div className="mt-12 text-xs lg:text-sm font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-4 z-20 hidden lg:flex">
                    Keep Scrolling <ArrowRight className="animate-bounce-x" size={16} />
                  </div>
                </div>

                <div className="lg:w-[45%] w-full max-h-[300px] lg:max-h-[500px] overflow-y-auto custom-scrollbar bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col gap-8 shadow-2xl relative z-10">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg lg:text-xl font-medium text-emerald-100 leading-relaxed">
                      Welcome to <strong className="text-white">WotXAi</strong>, a cutting-edge AI software solution designed to seamlessly integrate into modern websites and digital platforms.
                    </p>

                    <h4 className="text-emerald-400 font-bold text-lg mt-8 mb-3 font-syne uppercase tracking-wider">What is WotXAi?</h4>
                    <p className="text-white/80 leading-relaxed text-sm lg:text-base">
                      WotXAi is an intelligent, automated digital companion built to enhance user interaction and streamline complex processes. By embedding WotXAi into your website, you unlock a powerful layer of artificial intelligence that understands user intent, provides instant and accurate responses, and elevates the overall digital experience. It acts as the intelligent core of your platform, ready to assist and engage users dynamically.
                    </p>

                    <h4 className="text-emerald-400 font-bold text-lg mt-8 mb-3 font-syne uppercase tracking-wider">What is the Use of WotXAi?</h4>
                    <p className="text-white/80 leading-relaxed text-sm lg:text-base mb-4">
                      WotXAi serves as a versatile tool with multiple applications:
                    </p>
                    <ul className="space-y-3 text-white/80 text-sm lg:text-base">
                      <li><strong className="text-white">Intelligent Assistance:</strong> Provides real-time, smart responses to users, guiding them through your website efficiently.</li>
                      <li><strong className="text-white">Workflow Automation:</strong> Handles repetitive queries and tasks, allowing human resources to focus on more complex, strategic work.</li>
                      <li><strong className="text-white">Enhanced Engagement:</strong> Keeps users engaged with interactive, context-aware conversations that feel natural and highly responsive.</li>
                      <li><strong className="text-white">Seamless Website Integration:</strong> Designed specifically to be embedded into websites, offering a native feel without disrupting the user journey.</li>
                    </ul>

                    <h4 className="text-emerald-400 font-bold text-lg mt-8 mb-3 font-syne uppercase tracking-wider">Why is WotXAi Essential in This Era?</h4>
                    <p className="text-white/80 leading-relaxed text-sm lg:text-base mb-4">
                      In today's fast-paced digital era, attention spans are short and the demand for instant gratification is high. Traditional, static websites are no longer enough to meet user expectations. WotXAi provides the critical edge needed to succeed:
                    </p>
                    <ul className="space-y-3 text-white/80 text-sm lg:text-base">
                      <li><strong className="text-white">24/7 Availability:</strong> It operates around the clock, ensuring that no user inquiry goes unanswered, regardless of time zones.</li>
                      <li><strong className="text-white">Scalability at the Speed of Light:</strong> As traffic grows, WotXAi scales effortlessly, providing consistent quality without the need for proportional staffing increases.</li>
                      <li><strong className="text-white">Data-Driven Intelligence:</strong> It processes vast amounts of information instantly, making it an indispensable asset in an era where data and speed are paramount.</li>
                    </ul>

                    <h4 className="text-emerald-400 font-bold text-lg mt-8 mb-3 font-syne uppercase tracking-wider">About the Theme</h4>
                    <p className="text-white/80 leading-relaxed text-sm lg:text-base mb-4">
                      WotXAi is complemented by a visually stunning, meticulously crafted theme.
                    </p>
                    <ul className="space-y-3 text-white/80 text-sm lg:text-base">
                      <li><strong className="text-white">Modern & Sleek:</strong> The design language speaks to the future—clean lines, sophisticated typography, and a layout that breathes.</li>
                      <li><strong className="text-white">Responsive & Fluid:</strong> Whether accessed on a desktop, tablet, or mobile device, the theme adapts flawlessly, ensuring a premium experience across all touchpoints.</li>
                      <li><strong className="text-white">Engaging Aesthetics:</strong> With thoughtful micro-interactions, dark/light mode adaptability, and a vibrant yet professional color palette, the theme doesn't just look good; it actively enhances usability and user retention.</li>
                    </ul>

                    <div className="mt-10 pt-6 border-t border-white/10 italic text-emerald-200/80 text-sm lg:text-base text-center">
                      Elevate your digital presence with WotXAi—where intelligence meets flawless design.
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* 07 OUR VISION - Scattered 3D Particle Assembly */}
        <section className="vision-section relative min-h-[150vh] flex flex-col items-center justify-center overflow-hidden px-6">
          <div className="font-mono text-xs font-black uppercase tracking-widest text-violet-600 mb-20">07 — Our Vision</div>
          
          <div ref={visionTextRef} className="relative w-full max-w-6xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-4" style={{ perspective: "2000px" }}>
            {VISION_TEXT.split(" ").map((word, i) => (
              <span 
                key={i} 
                className="scatter-word font-syne text-[clamp(3rem,8vw,7rem)] font-black leading-none text-[#090A0F] inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </span>
            ))}
          </div>

          <div className="mt-32 max-w-3xl mx-auto text-center text-xl md:text-3xl text-[#4a4453] leading-relaxed font-medium">
            <p className="mb-8">
              We want INXFINIA to become a place where ambitious ideas can move from imagination to execution.
            </p>
            <p className="font-syne font-black text-violet-600">
              We're building for what could exist tomorrow.
            </p>
          </div>
        </section>

        {/* FINAL ABOUT CTA */}
        <section className="pb-32 max-w-[88rem] mx-auto px-6 md:px-12 lg:px-20 relative z-20">
          <div className="group rounded-[3rem] bg-gradient-to-br from-[#090A0F] to-[#1a1c29] p-12 md:p-32 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Hypnotic expanding rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full group-hover:scale-[1.5] transition-transform duration-1000 ease-out" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full group-hover:scale-[1.5] transition-transform duration-1000 delay-100 ease-out" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="font-syne text-[clamp(3rem,8vw,6rem)] font-black mb-8 leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                Got an idea?
              </h2>
              <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
                Bring us the challenge. We'll explore what's possible and figure out what it takes to make it real.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-white text-[#090A0F] font-mono text-sm font-bold uppercase tracking-widest hover:scale-110 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-500">
                START BUILDING <ArrowUpRight size={24} />
              </Link>
            </div>
          </div>
        </section>

        {/* The Abyss - 3D Text Tunnel */}
        <div ref={abyssRef} className="abyss-wrapper relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mb-12" style={{ perspective: "1000px" }}>
          <div className="abyss-container relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute font-syne text-[clamp(2.5rem,12vw,20rem)] font-black uppercase tracking-tighter text-transparent select-none whitespace-nowrap"
                style={{ 
                  WebkitTextStroke: `1.5px rgba(91,33,182,${1 - i * 0.15})`,
                  transform: `translateZ(${-i * 400}px)` 
                }}
              >
                INXFINIA
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}
