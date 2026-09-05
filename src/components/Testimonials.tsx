"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "From ML Engineer → Head of AI Products",
    company: "Navi Technologies",
    quote: "InXfinia didn't just change how we deploy models — it changed how we think about AI product development entirely. We went from 3-week sprint cycles to shipping new AI features in an afternoon.",
    color1: "#5B21B6",
    color2: "#1D4ED8",
  },
  {
    name: "Sarah Okonkwo",
    role: "From Data Analyst → VP Engineering",
    company: "Tencent Cloud APAC",
    quote: "The inference engine processes 200M events a day for us. Not once have we hit a cold start. InXfinia is the only AI platform that I'd genuinely call production-grade.",
    color1: "#1D4ED8",
    color2: "#F43F5E",
  },
  {
    name: "David Chen",
    role: "Lead DevOps Engineer",
    company: "Scale Systems",
    quote: "I was skeptical about another 'AI platform', but their Kubernetes operator is a work of art. The auto-scaling triggers are flawless and have saved us thousands on AWS bills.",
    color1: "#059669",
    color2: "#10B981",
  },
  {
    name: "Elena Rodriguez",
    role: "Chief Data Scientist",
    company: "Fintech Global",
    quote: "The observability features alone are worth it. Being able to trace a single prediction back to the exact model version and training data slice has made our compliance audits a breeze.",
    color1: "#D97706",
    color2: "#F59E0B",
  },
  {
    name: "Marcus Johnson",
    role: "Staff Software Engineer",
    company: "HealthAI",
    quote: "The DX is unmatched. Their CLI feels like it was built by developers who actually ship software, not just researchers. Everything is right where you expect it to be.",
    color1: "#7C3AED",
    color2: "#C026D3",
  },
  {
    name: "Priya Patel",
    role: "Director of Engineering",
    company: "Quantum Logistics",
    quote: "We ripped out our entire custom ML infrastructure and replaced it with InXfinia in less than a month. Uptime is at 99.999% and the team is finally sleeping through the night.",
    color1: "#0EA5E9",
    color2: "#3B82F6",
  },
];

// Sub-component for the isolated 3D hover effect
function TestimonialCard({ t, index }: { t: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // Disable on mobile
    if (!cardRef.current || !glareRef.current || !glowRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (-1 to 1)
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    // Tilt card
    gsap.to(cardRef.current, {
      rotateX: -yPct * 10,
      rotateY: xPct * 10,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center",
      zIndex: 50,
      boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
      overwrite: "auto",
    });

    // Move Glare (White overlay)
    gsap.to(glareRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: 0.15,
      duration: 0.4,
      overwrite: "auto",
    });
    
    // Move Glow (Colored aura)
    gsap.to(glowRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: 0.4,
      duration: 0.4,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      zIndex: 1,
      duration: 0.7,
      ease: "power3.out",
      boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
      overwrite: "auto",
    });

    gsap.to([glareRef.current, glowRef.current], {
      opacity: 0,
      duration: 0.7,
      overwrite: "auto",
    });
  };

  return (
    <div className="testi-card-wrapper" style={{ perspective: "1500px" }}>
      <div
        ref={cardRef}
        className="glass rounded-[1.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col gap-6 h-full bg-white/40 backdrop-blur-2xl border border-white/50 cursor-crosshair will-change-transform"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Glare & Glow */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 left-1/2 w-64 h-64 -mt-32 -ml-32 rounded-full blur-[60px] pointer-events-none opacity-0 mix-blend-screen"
          style={{ background: t.color1 }}
        />
        <div 
          ref={glareRef}
          className="absolute top-1/2 left-1/2 w-96 h-96 -mt-48 -ml-48 rounded-full bg-white blur-[50px] pointer-events-none opacity-0 mix-blend-overlay"
        />

        {/* Avatar */}
        <div className="flex items-center gap-4 relative z-10">
          <div
            className="w-14 h-14 rounded-full flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${t.color1}, ${t.color2})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              fontWeight: 900,
              color: "white",
              fontFamily: "var(--font-syne)",
              boxShadow: `0 8px 24px ${t.color1}40`
            }}
          >
            {t.name.split(" ").map((n: string) => n[0]).join("")}
          </div>
          <div>
            <div className="font-bold text-[#090A0F] text-base">{t.name}</div>
            <div className="text-[11px] text-[#4a4453] font-mono mt-1">{t.role}</div>
            <div className="text-[10px] text-[#7b7485] font-mono">{t.company}</div>
          </div>
        </div>

        <blockquote className="text-[#4a4453] leading-relaxed text-base italic relative z-10 flex-grow">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        {/* Decorative quotation marks */}
        <div
          className="absolute -bottom-6 -right-4 text-[140px] font-serif font-black leading-none select-none pointer-events-none"
          style={{ color: "rgba(9,10,15,0.03)" }}
        >
          "
        </div>
      </div>
    </div>
  );
}

export function TeamSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headerRef.current) return;
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Extended scroll duration for the cinematic effect
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // INITIAL STATES
      // Header starts huge and centered
      gsap.set(headerRef.current, { scale: 1.5, y: "30vh", transformOrigin: "center center" });
      
      // Cards start deep in 3D space, tilted back, blurred, and low opacity
      gsap.set(".testi-card-wrapper", { 
        z: -1000, 
        rotateX: 60, 
        y: 800, 
        opacity: 0,
        scale: 0.5,
        filter: "blur(20px)"
      });

      gsap.set(ctaRef.current, { opacity: 0, y: 50, scale: 0.9 });

      // ANIMATION SEQUENCE
      // 1. Move Header up and scale to normal
      tl.to(headerRef.current, { scale: 1, y: 0, duration: 1, ease: "power2.inOut" }, 0);
      
      // 2. Fly cards in from the abyss! (Staggered)
      tl.to(".testi-card-wrapper", {
        z: 0,
        rotateX: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        stagger: 0.15,
        ease: "power3.out"
      }, 0.5); // Starts half-way through header movement

      // 3. Fade in CTA at the very end
      tl.to(ctaRef.current, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.5)" }, 2.5);
      
      tl.to({}, { duration: 0.5 }); // buffer at end
    });

    mm.add("(max-width: 767px)", () => {
      // MOBILE: Simple stagger fade-in to prevent layout clipping
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
      );
      
      gsap.fromTo(".testi-card-wrapper", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".testi-grid", start: "top 80%" } }
      );

      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ctaRef.current, start: "top 90%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-transparent overflow-hidden">
      <div className="px-8 md:px-16 py-20 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-screen">
        
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center justify-center text-center mb-16 relative z-20">
          <div className="section-tag mb-6 w-fit mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" /> People & Stories
          </div>
          <h2
            className="font-black leading-[1.0] tracking-tight text-[#090A0F]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Built by people who{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #1D4ED8, #5B21B6)",
              }}
            >
              ship.
            </span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="testi-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        {/* Bottom banner */}
        <div
          ref={ctaRef}
          className="mt-12 glass rounded-[1.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-20 bg-white/60 backdrop-blur-3xl border border-white/80 shadow-2xl"
        >
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#090A0F] tracking-tight mb-2">Join 300+ engineers.</div>
            <div className="text-[#4a4453] text-sm font-medium">We&apos;re growing fast. Every role is open to remote.</div>
          </div>
          <button className="btn-primary flex-shrink-0 shadow-[0_10px_20px_rgba(29,78,216,0.3)] hover:shadow-[0_15px_30px_rgba(29,78,216,0.4)] transition-all">
            View Open Roles
          </button>
        </div>
      </div>
    </section>
  );
}
