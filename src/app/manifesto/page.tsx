"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function ManifestoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Title reveal
    gsap.fromTo(".declare-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Left slide-in elements
    gsap.utils.toArray(".slide-left").forEach((el: any) => {
      gsap.fromTo(el,
        { x: -200, opacity: 0, rotateY: -45 },
        {
          x: 0, opacity: 1, rotateY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    });

    // Right slide-in elements
    gsap.utils.toArray(".slide-right").forEach((el: any) => {
      gsap.fromTo(el,
        { x: 200, opacity: 0, rotateY: 45 },
        {
          x: 0, opacity: 1, rotateY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    });

    // 3D Tilt Elements (Center)
    gsap.utils.toArray(".tilt-3d").forEach((el: any) => {
      gsap.fromTo(el,
        { rotateX: 60, opacity: 0, scale: 0.8 },
        {
          rotateX: 0, opacity: 1, scale: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );
    });

    // Spinners
    gsap.to(".spin-element", {
      rotate: 360,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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

      <main ref={containerRef} className="relative z-10 min-h-screen pt-24 md:pt-40 pb-0 overflow-hidden px-6 md:px-12 selection:bg-violet-600 selection:text-white" style={{ perspective: "1000px" }}>
        
        <div className="max-w-[1600px] mx-auto relative z-20">
          
          <div className="declare-title mb-16 md:mb-64">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#090A0F] font-bold block mb-4">
              Our Declaration
            </span>
            <div className="h-[2px] w-12 bg-black" />
          </div>

          <div className="flex flex-col gap-16 md:gap-48 w-full">
            
            {/* Block 1 */}
            <div className="flex flex-col w-full">
              <h2 className="slide-left font-syne text-[clamp(2.5rem,12vw,12rem)] font-black leading-[0.8] tracking-tighter uppercase text-transparent break-words w-full" style={{ WebkitTextStroke: "2px #5B21B6" }}>
                We Reject
              </h2>
              <h2 className="slide-right font-syne text-[clamp(2.5rem,12vw,12rem)] font-black leading-[0.8] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500 self-start md:self-end mt-2 md:mt-4 break-words w-full text-left md:text-right">
                The Black Box.
              </h2>
            </div>

            {/* Block 2 */}
            <div className="flex flex-col items-center justify-center w-full my-8 md:my-24">
              <h2 className="tilt-3d font-syne text-[clamp(1.8rem,7vw,8rem)] font-bold leading-[0.9] tracking-tighter uppercase text-left md:text-center text-[#090A0F] max-w-5xl mx-auto break-words w-full">
                AI infrastructure should be as <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">transparent</span> as it is powerful.
              </h2>
            </div>

            {/* Block 3 with Inline Graphic */}
            <div className="flex flex-col w-full">
              <h2 className="slide-left font-syne text-[clamp(2.5rem,10vw,10rem)] font-black leading-[0.85] tracking-tighter uppercase text-[#090A0F] break-words w-full">
                Latency is the
              </h2>
              <div className="slide-right flex flex-col md:flex-row items-start md:items-center justify-start md:justify-end gap-4 md:gap-8 mt-4 w-full">
                {/* Spinning abstract shape */}
                <svg viewBox="0 0 100 100" className="spin-element w-[15vw] h-[15vw] md:w-[12vw] md:h-[12vw] max-w-[150px] max-h-[150px] fill-emerald-500">
                  <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
                </svg>
                <h2 className="font-syne text-[clamp(2.5rem,10vw,10rem)] font-black leading-[0.85] tracking-tighter uppercase text-transparent break-words w-full md:w-auto text-left md:text-right" style={{ WebkitTextStroke: "2px #111" }}>
                  Enemy of Thought.
                </h2>
              </div>
            </div>

            {/* Block 4 */}
            <div className="flex flex-col w-full mt-8 md:mt-24">
              <h2 className="tilt-3d font-syne text-[clamp(3.5rem,15vw,16rem)] font-black leading-[0.75] tracking-tighter uppercase text-left md:text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500 break-words w-full">
                NO MORE
              </h2>
              <h2 className="tilt-3d font-syne text-[clamp(3.5rem,15vw,16rem)] font-black leading-[0.75] tracking-tighter uppercase text-left md:text-center text-transparent break-words w-full mt-2" style={{ WebkitTextStroke: "2px #10b981" }}>
                LOCK-IN.
              </h2>
            </div>

            {/* Block 5 */}
            <div className="flex flex-col items-start w-full relative mt-16 md:mt-32">
              <div className="absolute -left-4 md:-left-20 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-600 to-emerald-500 origin-top scale-y-0 slide-left" />
              <p className="slide-right font-mono text-sm md:text-base uppercase tracking-widest text-[#555] max-w-lg mb-8 pl-4 md:pl-0">
                We are building the open neural fabric of the internet.
              </p>
              <h2 className="slide-left font-syne text-[clamp(2.5rem,10vw,10rem)] font-black leading-[0.85] tracking-tighter uppercase text-[#090A0F] break-words w-full pl-4 md:pl-0">
                Intelligence <br/>
                <span className="text-transparent" style={{ WebkitTextStroke: "2px #5B21B6" }}>Redefined.</span>
              </h2>
            </div>

          </div>

          {/* CTA */}
          <motion.div 
            className="mt-32 md:mt-64 mb-16 flex justify-center tilt-3d"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={() => setIsWhitepaperOpen(!isWhitepaperOpen)}
              className="relative group overflow-hidden rounded-full bg-[#090A0F] text-white px-12 py-5 font-mono text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(91,33,182,0.3)]"
            >
              <span className="relative z-10 font-bold">
                {isWhitepaperOpen ? "Close Whitepaper" : "Read The Whitepaper"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </motion.div>

          {/* Expanded Whitepaper Section — THE DOSSIER */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isWhitepaperOpen ? "auto" : 0, 
              opacity: isWhitepaperOpen ? 1 : 0 
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden w-[100vw] relative left-1/2 -translate-x-1/2 px-6 md:px-12 bg-white/50 backdrop-blur-sm"
          >
            <motion.div
              initial="hidden"
              animate={isWhitepaperOpen ? "visible" : "hidden"}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
              className="w-full max-w-[1600px] mx-auto border-t-4 border-[#090A0F]"
            >

              {/* Dossier Header */}
              <motion.div
                variants={{ hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16,1,0.3,1] } } }}
                className="border-b-2 border-[#090A0F] flex flex-col items-center justify-center text-center py-8 px-0 gap-6"
              >
                <h3 className="font-syne text-[clamp(1.1rem,7vw,5rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#090A0F] w-full text-center">
                  The InXfinia<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">Architecture</span>
                </h3>
                <div className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#555] leading-relaxed">
                  <p>Draft v1.0 &nbsp;|&nbsp; Confidential</p>
                  <p className="text-violet-600 font-bold mt-1">InXfinia Research Lab</p>
                </div>
              </motion.div>

              {/* Section 01 */}
              <motion.div
                variants={{ hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16,1,0.3,1] } } }}
                className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-0 border-b-2 border-[#090A0F]"
              >
                <div className="md:border-r-2 border-[#090A0F] py-8 md:py-12 px-4 md:px-8 flex items-start justify-center">
                  <span className="font-syne text-[clamp(5rem,15vw,18rem)] font-black leading-none text-transparent" style={{ WebkitTextStroke: "2px #5B21B6" }}>
                    01
                  </span>
                </div>
                <div className="py-8 md:py-12 px-4 md:px-16 flex flex-col justify-center">
                  <h4 className="font-syne text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-[#090A0F]">The Compute Fabric</h4>
                  <p className="font-sans text-base md:text-lg leading-relaxed text-[#444] max-w-2xl mb-4">
                    Our approach dismantles the traditional monolithic bottlenecks. By orchestrating decentralized compute nodes through our proprietary neural fabric, we achieve unprecedented scalability with <strong>zero-latency overhead.</strong>
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-[#777] max-w-2xl">
                    Compute should be treated like a utility—always available, infinitely scalable, and totally invisible to the end user. Our fabric abstracts away the physical hardware layer entirely, making infrastructure a non-concern for the builders on top of it.
                  </p>
                </div>
              </motion.div>

              {/* Section 02 */}
              <motion.div
                variants={{ hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16,1,0.3,1] } } }}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0 border-b-2 border-[#090A0F]"
              >
                <div className="py-8 md:py-12 px-4 md:px-16 flex flex-col justify-center order-2 md:order-1">
                  <h4 className="font-syne text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">Zero-Latency Routing</h4>
                  <p className="font-sans text-base md:text-lg leading-relaxed text-[#444] max-w-2xl mb-4">
                    By utilizing predictive edge-caching and quantum-resistant packet tunneling, we ensure that API requests are served by the node physically closest to the requester.
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-[#777] max-w-2xl">
                    Latency should drop below human perception thresholds. The current paradigms of walled gardens and proprietary tensors only serve to artificially restrict innovation. InXfinia is built on an open standard, ensuring every cycle of compute is routed dynamically based on network topology and thermal efficiency.
                  </p>
                </div>
                <div className="md:border-l-2 border-[#090A0F] py-8 md:py-12 px-4 md:px-8 flex items-start justify-center order-1 md:order-2">
                  <span className="font-syne text-[clamp(5rem,15vw,18rem)] font-black leading-none text-transparent" style={{ WebkitTextStroke: "2px #10b981" }}>
                    02
                  </span>
                </div>
              </motion.div>

              {/* Closing Statement */}
              <motion.div
                variants={{ hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16,1,0.3,1] } } }}
                className="py-20 px-8 flex flex-col items-center justify-center text-center"
              >
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#555] mb-6">Final Declaration</p>
                <h2 className="font-syne text-[clamp(1.5rem,10vw,8rem)] font-black uppercase tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500 w-full text-center">
                  Welcome to the<br/>Post-Latency Era.
                </h2>
              </motion.div>

              {/* Rolling Ticker Bottom */}
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
                className="border-t-2 border-[#090A0F] py-4 overflow-hidden w-[100vw] relative left-1/2 -translate-x-1/2"
              >
                <div className="flex gap-16 whitespace-nowrap animate-[ticker_15s_linear_infinite]" style={{ width: "max-content" }}>
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="font-mono text-xs uppercase tracking-widest text-[#555]">
                      INXFINIA WHITEPAPER v1.0 &nbsp;&nbsp;•&nbsp;&nbsp; CONFIDENTIAL &nbsp;&nbsp;•&nbsp;&nbsp; ZERO-LATENCY ARCHITECTURE &nbsp;&nbsp;•&nbsp;&nbsp; OPEN NEURAL FABRIC &nbsp;&nbsp;•&nbsp;&nbsp;
                    </span>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </motion.div>

        </div>
      </main>
    </>
  );
}
