"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    num: "01",
    title: "People First",
    desc: "Every architectural decision starts with the team using the platform. We obsess over developer experience, clear APIs, and documentation that actually helps.",
    accent: "#5B21B6", // Primary
    tags: ["DX", "API Design", "Documentation"],
  },
  {
    num: "02",
    title: "Transparency",
    desc: "No black boxes. Every model prediction comes with explainability scores, confidence intervals, and a full audit trail. You always know why your AI did what it did.",
    accent: "#1D4ED8", // Secondary
    tags: ["Explainability", "Audit Log", "Confidence"],
  },
  {
    num: "03",
    title: "Data Driven",
    desc: "Decisions at InXfinia are made from production metrics, not intuition. A/B testing, feature flags, and real-time dashboards are in the hands of every engineer.",
    accent: "#F43F5E", // Tertiary
    tags: ["A/B Testing", "Feature Flags", "Observability"],
  },
];

export function CoreValuesCards() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !triggerRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // DESKTOP: Pinned Fan-Out Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "center center",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial state: Cards stacked in the center column
      gsap.set(".core-header", { opacity: 0, y: -30 });
      gsap.set(".wrapper-0", { x: "calc(100% + 24px)", rotation: -6, y: 20, zIndex: 1 });
      gsap.set(".wrapper-1", { y: 20, zIndex: 3 });
      gsap.set(".wrapper-2", { x: "calc(-100% - 24px)", rotation: 6, y: 20, zIndex: 2 });
      gsap.set(".value-card-wrapper", { opacity: 0, scale: 0.85 });
      gsap.set(".card-glow", { opacity: 0 });
      gsap.set(".core-desc", { opacity: 0 });

      // 1. Reveal Header
      tl.to(".core-header", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0);
      
      // 2. Fade in the stacked wrappers
      tl.to(".value-card-wrapper", { opacity: 1, y: 0, scale: 0.95, duration: 1, ease: "power2.out" }, 0.3);

      // 3. Fan out! (Translate X to 0, reset rotation)
      tl.to(".wrapper-0", { x: 0, rotation: 0, scale: 1, duration: 1.5, ease: "power3.inOut" }, 1.5)
        .to(".wrapper-2", { x: 0, rotation: 0, scale: 1, duration: 1.5, ease: "power3.inOut" }, 1.5)
        .to(".wrapper-1", { scale: 1, duration: 1.5, ease: "power3.inOut" }, 1.5)
        .to(".core-desc", { opacity: 1, duration: 1 }, 1.8);

      // 4. Ignite glows
      tl.to(".card-glow", { opacity: 0.15, duration: 0.8, stagger: 0.2 }, 2.5);

      tl.to({}, { duration: 0.5 }); // buffer
    });

    mm.add("(max-width: 767px)", () => {
      // MOBILE: Simple scroll fade-in
      gsap.fromTo(".core-header", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: triggerRef.current, start: "top 80%" } }
      );
      
      gsap.fromTo(".value-card-wrapper", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".cards-grid", start: "top 80%" } }
      );
    });

    return () => mm.revert();
  }, []);

  const handleMouseEnter = (i: number) => {
    if (window.innerWidth < 768) return;
    
    // Bring hovered wrapper to front to prevent stacking context clipping
    gsap.utils.toArray(".value-card-wrapper").forEach((el: any, idx: number) => {
      gsap.set(el, { zIndex: idx === i ? 50 : 1 });
    });

    // Animate the inner elements so we don't fight with ScrollTrigger
    gsap.utils.toArray(".value-card-inner").forEach((el: any, idx: number) => {
      if (idx === i) {
        // Delta x to center of the 3-column grid
        const xMove = i === 0 ? "calc(100% + 24px)" : i === 2 ? "calc(-100% - 24px)" : 0;
        gsap.to(el, {
          x: xMove,
          y: -20,
          scale: 1.1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
          overwrite: "auto",
        });
      } else {
        // Push non-hovered cards back and fade them out slightly
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 0.9,
          opacity: 0.3,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    
    // Restore original wrapper z-indexes based on initial stack state
    gsap.utils.toArray(".value-card-wrapper").forEach((el: any, idx: number) => {
      gsap.set(el, { zIndex: idx === 1 ? 3 : idx === 0 ? 1 : 2 });
    });

    // Restore inner elements
    gsap.utils.toArray(".value-card-inner").forEach((el: any) => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
        overwrite: "auto",
      });
    });
  };

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-transparent">
      <div ref={triggerRef} className="px-8 md:px-16 py-32 w-full max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="core-header">
            <div className="section-tag mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E]" /> Core Values
            </div>
            <h2
              className="font-black leading-[1.0] tracking-tight text-[#090A0F]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              What we stand{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #5B21B6, #1D4ED8, #F43F5E)",
                }}
              >
                for.
              </span>
            </h2>
          </div>
          <p className="core-desc text-[#4a4453] max-w-xs text-sm leading-relaxed">
            300+ engineers across 20 time zones — united by three principles that don&apos;t bend.
          </p>
        </div>

        {/* Cards */}
        <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={`value-card-wrapper wrapper-${i} origin-bottom relative`}
            >
              <div 
                className={`value-card-inner inner-${i} h-full glass rounded-[1.5rem] p-8 md:p-10 flex flex-col gap-6 group relative overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-pointer will-change-transform`}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Accent glow in corner */}
                <div
                  className="card-glow absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[40px] pointer-events-none"
                  style={{ background: card.accent }}
                />

                {/* Top row */}
                <div className="flex items-start justify-between relative z-10">
                  <span className="text-6xl font-black leading-none font-mono" style={{ color: `${card.accent}30` }}>
                    {card.num}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: card.accent, boxShadow: `0 0 12px ${card.accent}40` }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-[#090A0F] mb-4 tracking-tight">{card.title}</h3>
                  <p className="text-[#4a4453] text-sm leading-relaxed">{card.desc}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[rgba(9,10,15,0.06)] relative z-10">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="label-caps px-3 py-1.5 rounded-full"
                      style={{ background: `${card.accent}10`, color: card.accent, border: `1px solid ${card.accent}20` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
