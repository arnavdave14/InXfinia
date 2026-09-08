"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    id: "strategy",
    title: "Strategy",
    subtitle: "Mapping the future of your infrastructure.",
    description: "We architect resilient, scalable systems designed to support exponential growth without compromising security or performance.",
  },
  {
    id: "expertise",
    title: "Expertise",
    subtitle: "Decades of engineering excellence.",
    description: "Our team brings unparalleled knowledge in AI, cloud computing, and high-performance APIs to solve your most complex challenges.",
  },
  {
    id: "analysis",
    title: "Analysis",
    subtitle: "Data-driven decision making.",
    description: "We transform raw infrastructure data into intuitive, actionable insights, making your systems transparent and highly optimizable.",
  },
  {
    id: "consulting",
    title: "Consulting",
    subtitle: "Your partner in digital transformation.",
    description: "Beyond just providing tools, we work alongside your team to ensure seamless integrations and long-term success.",
  }
];

export function EcosystemSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // gsap.context handles safe React cleanup
    const ctx = gsap.context(() => {
      const keywords = gsap.utils.toArray<HTMLElement>(".spotlight-keyword");
      const cards = gsap.utils.toArray<HTMLElement>(".spotlight-card");

      // Set initial states for cards and text
      gsap.set(cards, { opacity: 0, y: 80 });
      gsap.set(keywords, { backgroundPosition: "100% 0%" }); // Start at the gray portion of the background

      // Create the main timeline for the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 cards = 400vh of scrolling depth for smooth scrubbing
          scrub: 1,      // Smooth 1-second easing on scrub
          pin: true,     // Locks the screen in place
          anticipatePin: 1,
        }
      });

      // Build the sequential animation
      keywords.forEach((keyword, i) => {
        // Step 1: Illuminate the current keyword with a sweeping gradient reveal
        tl.to(keyword, { 
          backgroundPosition: "0% 0%", // Sweeps to the gradient portion
          filter: "drop-shadow(0 8px 20px rgba(124,58,237,0.3))", // Subtle violet glow
          duration: 1 
        }, `step${i}`);
        
        tl.to(cards[i], { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out" 
        }, `step${i}`);
        
        // Step 2: Hold the state for a moment (gives the user time to read while scrolling)
        tl.to({}, { duration: 1.5 }); 
        
        // Step 3: Dim the keyword and slide out the card (unless it's the final one)
        if (i !== keywords.length - 1) {
          tl.to(keyword, { 
            backgroundPosition: "100% 0%", // Sweeps back to gray
            filter: "drop-shadow(0 0px 0px rgba(124,58,237,0))",
            duration: 1 
          }, `fade${i}`);
          
          tl.to(cards[i], { 
            opacity: 0, 
            y: -80, 
            duration: 1, 
            ease: "power3.in" 
          }, `fade${i}`);
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Left Side: The Massive Paragraph */}
        <div className="flex-1 max-w-4xl z-10 flex items-center h-full pt-20 lg:pt-0">
          <h1 className="text-4xl md:text-6xl lg:text-[75px] font-light leading-[1.1] text-gray-200 tracking-tight">
            We provide the{" "}
            <span 
              className="spotlight-keyword text-transparent bg-clip-text bg-[length:200%_100%]"
              style={{ backgroundImage: "linear-gradient(to right, #7C3AED 0%, #10B981 50%, #E5E7EB 50%, #E5E7EB 100%)" }}
            >
              Strategy
            </span>
            , the{" "}
            <span 
              className="spotlight-keyword text-transparent bg-clip-text bg-[length:200%_100%]"
              style={{ backgroundImage: "linear-gradient(to right, #7C3AED 0%, #10B981 50%, #E5E7EB 50%, #E5E7EB 100%)" }}
            >
              Expertise
            </span>
            , the{" "}
            <span 
              className="spotlight-keyword text-transparent bg-clip-text bg-[length:200%_100%]"
              style={{ backgroundImage: "linear-gradient(to right, #7C3AED 0%, #10B981 50%, #E5E7EB 50%, #E5E7EB 100%)" }}
            >
              Analysis
            </span>
            , and the{" "}
            <span 
              className="spotlight-keyword text-transparent bg-clip-text bg-[length:200%_100%]"
              style={{ backgroundImage: "linear-gradient(to right, #7C3AED 0%, #10B981 50%, #E5E7EB 50%, #E5E7EB 100%)" }}
            >
              Consulting
            </span>{" "}
            to completely transform your infrastructure.
          </h1>
        </div>

        {/* Right Side: The Detail Cards */}
        <div className="flex-1 relative w-full h-[50vh] lg:h-full flex items-center justify-center lg:justify-end z-20 pb-20 lg:pb-0">
          {PANELS.map((panel, i) => (
            <div 
              key={panel.id} 
              className="spotlight-card absolute w-full max-w-xl flex flex-col justify-center"
            >
              <div className="relative bg-white/95 backdrop-blur-2xl p-10 md:p-16 rounded-[40px] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
                
                {/* Giant faint number watermark inside the card */}
                <div className="absolute top-10 right-10 text-[120px] font-black text-gray-50/80 leading-none select-none pointer-events-none z-0 tracking-tighter">
                  0{i + 1}
                </div>

                <div className="relative z-10">
                  {/* Decorative neon accent */}
                  <div className="w-16 h-1.5 bg-[#00FF66] mb-12 shadow-[0_0_15px_rgba(0,255,102,0.3)]"></div>
                  
                  <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
                    {panel.title}
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
                    {panel.subtitle}
                  </h3>
                  
                  <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
                    {panel.description}
                  </p>

                  {/* Explore Link */}
                  <div className="mt-12 flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-gray-900 group cursor-pointer w-fit">
                    <span>Explore</span>
                    <div className="w-8 h-[2px] bg-gray-300 group-hover:w-16 group-hover:bg-[#00FF66] transition-all duration-500 ease-out"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
