"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

const ARTICLES = [
  {
    title: "Clean Design. No Fluff.",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
    hasOverlayText: true,
  },
  {
    title: "The Mobile Revolution",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
  }
];

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Slide-in
    gsap.fromTo(".hero-line", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "power4.out", delay: 0.2 }
    );

    // Main Image Reveal (using clip-path instead of solid overlay over gradient)
    gsap.fromTo(".main-img-container",
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power3.inOut", scrollTrigger: {
        trigger: ".main-img-section",
        start: "top 80%"
      }}
    );

    gsap.fromTo(".main-img",
      { scale: 1.2 },
      { scale: 1, duration: 1.5, ease: "power3.inOut", scrollTrigger: {
        trigger: ".main-img-section",
        start: "top 80%"
      }}
    );

    // Grid Images Reveal & Parallax
    const gridItems = gsap.utils.toArray(".grid-img-wrapper");
    gridItems.forEach((item: any) => {
      const imgContainer = item.querySelector(".grid-img-container");
      const img = item.querySelector(".grid-img");

      // Reveal using clip-path
      gsap.fromTo(imgContainer,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power3.inOut", scrollTrigger: {
          trigger: item,
          start: "top 85%"
        }}
      );

      // Parallax
      gsap.fromTo(img,
        { yPercent: -15, scale: 1.1 },
        { yPercent: 15, scale: 1, ease: "none", scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }}
      );
    });

    // Circular Text Rotation
    gsap.to(".circular-text", {
      rotation: 360,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Restoring the global ambient background to match the site */}
      <div className="mesh-bg" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      <div ref={containerRef} className="relative z-10 min-h-screen text-[#090A0F] overflow-hidden pt-32 pb-40">
      
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto relative mb-24">
        
        {/* Massive Typography Block */}
        <div className="flex flex-col items-center md:items-end w-full relative z-10">
          
          <div className="flex items-center gap-4 overflow-hidden w-full md:w-auto justify-end">
            <span className="hero-line font-syne text-[clamp(3rem,10vw,12rem)] font-light leading-[0.8] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #5B21B6" }}>
              *IDEAS
            </span>
            <span className="hero-line font-syne text-[clamp(3rem,10vw,12rem)] font-bold leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">
              WORTH
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 overflow-hidden w-full md:w-auto justify-end mt-4">
            {/* Small info text left */}
            <p className="hero-line hidden md:block max-w-[200px] text-xs font-medium leading-relaxed font-sans mt-auto mb-4 mr-12 text-left">
              InXfinia® is a strategic AI agency that works with innovative, high-growth companies looking to launch, grow, or refresh their architecture.
            </p>
            <span className="hero-line font-syne text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.8] tracking-tighter text-center md:text-right text-[#090A0F]">
              RALLYING
            </span>
          </div>

          <div className="flex items-center justify-end overflow-hidden w-full md:w-auto mt-4">
            <span className="hero-line font-syne text-[clamp(3.5rem,13vw,15rem)] font-medium leading-[0.8] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #10b981" }}>
              AROUND™
            </span>
          </div>

        </div>

        {/* Small Navigation/Scroll indicators */}
        <div className="flex justify-between items-end mt-24 border-b border-[#111] pb-2">
          <Link href="#help" className="text-sm font-bold tracking-tight hover:opacity-60 transition-opacity">
            Here's how we can help
          </Link>
          <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">
            (SCROLL)
          </span>
        </div>
      </section>

      {/* Main Full-Width Image */}
      <section className="main-img-section px-6 md:px-12 max-w-[1600px] mx-auto mb-32">
        <div className="main-img-container relative w-full aspect-[21/9] overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Video Graphic"
            fill
            className="main-img object-cover object-center"
          />
        </div>
        <p className="mt-8 max-w-md mx-auto text-center text-xs font-bold uppercase tracking-widest leading-relaxed">
          THE WORLD'S GREATEST COMPANIES ARE MORE THAN FAMOUS NAMES AND COVETED PRODUCTS — THEY'RE IDEAS THAT STARTED FROM THE INSIDE OUT.
        </p>
      </section>

      {/* Secondary Hero / Side Layout */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto mb-48 flex flex-col lg:flex-row justify-between items-start gap-16">
        
        {/* Massive Text with Inline Image */}
        <div className="lg:w-1/2">
          <h2 className="font-syne text-[clamp(3rem,8vw,10rem)] font-bold leading-[0.85] tracking-tighter uppercase break-words">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">LET'S</span>
            <div className="inline-block mx-4 align-middle w-[20vw] h-[8vw] max-w-[200px] max-h-[80px] relative overflow-hidden bg-[#ccc]">
              <Image 
                src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop"
                alt="Inline graphic"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #5B21B6" }}>FIND YOUR MOTTO®</span>
          </h2>
        </div>

        {/* Text Block & Links */}
        <div className="lg:w-[40%] flex flex-col gap-8 pt-8">
          <h3 className="text-3xl font-bold leading-tight font-sans tracking-tight">
            InXfinia® works with leaders to create brands and Ideas Worth Rallying Around™
          </h3>
          <p className="text-sm font-medium leading-relaxed text-[#555] max-w-md">
            InXfinia is a strategic agency that works with innovative, high-growth companies looking to launch, grow, or refresh their architecture. Our unique method forges meaning in the belly of your business, so strategy, culture, and technical work together as one. You hire us to codify the mission, launch a product, pin a new strategy, articulate your position.
          </p>

          <div className="mt-12 flex flex-col gap-6 items-start">
            <span className="text-[10px] font-bold tracking-widest uppercase">
              (CHOOSE YOUR PURPOSE)
            </span>
            <Link href="#" className="text-sm font-bold border-b-2 border-[#111] pb-1 hover:text-violet-600 hover:border-violet-600 transition-colors">
              More about our branding services
            </Link>
            <Link href="#" className="text-sm font-bold border-b-2 border-[#111] pb-1 hover:text-violet-600 hover:border-violet-600 transition-colors">
              More about our workshops
            </Link>
            <Link href="#" className="text-sm font-bold border-b-2 border-[#111] pb-1 hover:text-violet-600 hover:border-violet-600 transition-colors">
              More about our speaking engagements
            </Link>
          </div>
        </div>

      </section>

      {/* Work Grid */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-[#111] pb-6">
          <h2 className="font-syne text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.8] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">
            WORK WE'RE<br />PROUD OF.
          </h2>
          <Link href="#" className="text-xs font-bold border-b-2 border-[#111] pb-1 hover:text-violet-600 hover:border-violet-600 transition-colors hidden md:block">
            See all of our work
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {ARTICLES.map((article, i) => (
            <div key={i} className="grid-img-wrapper flex flex-col gap-4 group cursor-pointer">
              <div className="grid-img-container relative w-full aspect-[4/5] overflow-hidden">
                <Image 
                  src={article.image}
                  alt={article.title}
                  fill
                  className="grid-img object-cover object-center"
                />
                
                {/* Rotating Text Overlay */}
                {article.hasOverlayText && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                     <svg className="circular-text w-[60%] h-[60%] animate-spin-slow origin-center drop-shadow-md" viewBox="0 0 100 100">
                      <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                      <text className="text-[12px] font-bold fill-yellow-400 font-mono tracking-widest uppercase">
                        <textPath href="#circlePath" startOffset="0%">
                          Skip boring stuff • Skip boring stuff • Skip boring stuff • 
                        </textPath>
                      </text>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      </div>
    </>
  );
}
