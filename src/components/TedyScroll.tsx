"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    title: "NovaLeads SaaS",
    image: "/portfolio_mockup_1_1788430472316.jpg",
    x: "-30vw",
    y: "-25vh",
    rotation: -12,
  },
  {
    id: 2,
    title: "Aura E-commerce",
    image: "/portfolio_mockup_2_1788430491878.jpg",
    x: "30vw",
    y: "-20vh",
    rotation: 8,
  },
  {
    id: 3,
    title: "Brutalist Studio",
    image: "/portfolio_mockup_3_1788430514606.jpg",
    x: "-35vw",
    y: "25vh",
    rotation: -6,
  },
  {
    id: 4,
    title: "Apex Fintech",
    image: "/portfolio_mockup_4_1788430536399.jpg",
    x: "30vw",
    y: "28vh",
    rotation: 14,
  },
  {
    id: 5,
    title: "Zenith Architecture",
    image: "/mockup5.jpg",
    x: "-10vw",
    y: "-35vh",
    rotation: 5,
  },
  {
    id: 6,
    title: "Lumina App",
    image: "/mockup6.jpg",
    x: "10vw",
    y: "35vh",
    rotation: -10,
  },
  {
    id: 7,
    title: "Velocity Dashboard",
    image: "/mockup7.jpg",
    x: "-45vw",
    y: "0vh",
    rotation: 15,
  },
  {
    id: 8,
    title: "Echo Social",
    image: "/mockup8.jpg",
    x: "45vw",
    y: "0vh",
    rotation: -8,
  }
];

export function TedyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    // We create a timeline that is scrubbed over the course of the container's scroll height
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // Near-instant responsiveness
      },
    });

    // The text fades out slightly or scales up as we scroll (optional)
    tl.to(".portfolio-text", {
      scale: 1.2,
      opacity: 0.4,
      ease: "power1.inOut",
    }, 0);

    // Animate each card from the center (scale 0, opacity 0, x 0, y 0) 
    // to their designated final scattered positions.
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const item = portfolioItems[index];

      // Initial state: hidden in the center
      gsap.set(card, {
        x: "0vw",
        y: "0vh",
        xPercent: -50,
        yPercent: -50,
        scale: 0.3,
        opacity: 0,
        rotation: 0,
      });

      // Scrubbed animation to final state
      tl.to(
        card,
        {
          x: item.x,
          y: item.y,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          opacity: 1,
          rotation: item.rotation,
          ease: "power2.out",
        },
        0 // All start at time 0 of the timeline
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    // The giant scrollable parent container
    <div ref={containerRef} className="relative w-full h-[120vh] md:h-[300vh] bg-transparent">
      
      {/* The sticky frame that stays fixed to the viewport */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        
        {/* Central Text */}
        <div className="portfolio-text z-30 flex flex-col items-center text-center pointer-events-none drop-shadow-2xl px-4 w-full">
          <h1 className="text-[clamp(2.5rem,11vw,8rem)] md:text-9xl font-black text-black tracking-tighter leading-[1]" style={{ fontFamily: "var(--font-syne)" }}>
            SELECTED<br />WORKS
          </h1>
          <p className="mt-4 text-black/60 font-mono text-sm tracking-widest uppercase">
            Scroll to explore
          </p>
        </div>

        {/* The Floating Image Cards */}
        {portfolioItems.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="absolute top-1/2 left-1/2 z-20 w-[160px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={i < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-white font-bold tracking-tight">{item.title}</h3>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
