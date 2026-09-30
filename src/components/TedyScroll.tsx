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
    x: "-35vw",
    y: "-20vh",
    rotation: -15,
    z: 100,
    shape: "aspect-[3/4] rounded-[3rem]",
  },
  {
    id: 2,
    title: "Aura E-commerce",
    image: "/portfolio_mockup_2_1788430491878.jpg",
    x: "35vw",
    y: "-15vh",
    rotation: 10,
    z: -50,
    shape: "aspect-square rounded-full",
  },
  {
    id: 3,
    title: "Brutalist Studio",
    image: "/portfolio_mockup_3_1788430514606.jpg",
    x: "-25vw",
    y: "25vh",
    rotation: -8,
    z: 50,
    shape: "aspect-video rounded-3xl",
  },
  {
    id: 4,
    title: "Apex Fintech",
    image: "/portfolio_mockup_4_1788430536399.jpg",
    x: "25vw",
    y: "30vh",
    rotation: 20,
    z: 150,
    shape: "aspect-[4/5] rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-xl rounded-bl-xl",
  },
  {
    id: 5,
    title: "Zenith Architecture",
    image: "/mockup5.jpg",
    x: "-10vw",
    y: "-35vh",
    rotation: 5,
    z: -100,
    shape: "aspect-video rounded-full",
  },
  {
    id: 6,
    title: "Lumina App",
    image: "/mockup6.jpg",
    x: "5vw",
    y: "38vh",
    rotation: -12,
    z: 80,
    shape: "aspect-[3/4] rounded-[2rem]",
  },
  {
    id: 7,
    title: "Velocity Dashboard",
    image: "/mockup7.jpg",
    x: "-45vw",
    y: "5vh",
    rotation: 25,
    z: -20,
    shape: "aspect-square rounded-[3rem]",
  },
  {
    id: 8,
    title: "Echo Social",
    image: "/mockup8.jpg",
    x: "45vw",
    y: "5vh",
    rotation: -15,
    z: 120,
    shape: "aspect-video rounded-[4rem]",
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
          z: item.z,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          opacity: 1,
          rotation: item.rotation,
          rotateX: item.rotation * 0.5,
          rotateY: item.rotation * 0.5,
          ease: "power3.out",
        },
        0
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] md:h-[350vh] bg-transparent perspective-[1000px]">
      
      {/* Playful background blur orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-fuchsia-400/20 blur-[120px] rounded-full pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-emerald-400/20 blur-[100px] rounded-full pointer-events-none mix-blend-multiply"></div>

      <div 
        ref={stickyRef} 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transform-style-3d"
      >
        
        {/* Massive Funky Gen-Z Text */}
        <div className="portfolio-text z-30 flex flex-col items-center text-center pointer-events-none w-full mix-blend-difference">
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-black tracking-tighter leading-[0.85] text-white uppercase" style={{ fontFamily: "var(--font-syne)" }}>
            Crazy.
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>
              Work.
            </span>
          </h1>
          <div className="mt-8 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-white rounded-full"></span>
            <p className="text-white font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-bold">
              Scroll into the chaos
            </p>
            <span className="w-12 h-[2px] bg-white rounded-full"></span>
          </div>
        </div>

        {/* The Floating Image Cards */}
        {portfolioItems.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className={`group absolute top-1/2 left-1/2 z-20 w-[180px] md:w-[350px] overflow-hidden bg-black shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/10 ${item.shape} cursor-none transition-transform duration-500 hover:z-50 hover:scale-[1.05]`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={i < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <span className="inline-block px-4 py-2 bg-emerald-500 text-black font-mono text-[10px] uppercase tracking-widest font-bold rounded-full mb-3 w-fit translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                View Project
              </span>
              <h3 className="text-white font-syne text-xl md:text-2xl font-bold tracking-tight translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
