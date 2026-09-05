"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const parallaxItems = [
  // Very Close (Fastest)
  { id: 1, image: "/portfolio_mockup_1_1788430472316.jpg", link: "https://example.com/1", x: "-20vw", y: "40vh", z: 400, scale: 1.2, rotation: -5 },
  { id: 2, image: "/mockup5.jpg", link: "https://example.com/2", x: "25vw", y: "80vh", z: 300, scale: 1.1, rotation: 8 },
  
  // Mid-ground (Medium)
  { id: 3, image: "/mockup6.jpg", link: "https://example.com/3", x: "-35vw", y: "10vh", z: 0, scale: 0.9, rotation: -12 },
  { id: 4, image: "/portfolio_mockup_4_1788430536399.jpg", link: "https://example.com/4", x: "35vw", y: "20vh", z: -100, scale: 0.85, rotation: 15 },
  { id: 5, image: "/mockup7.jpg", link: "https://example.com/5", x: "0vw", y: "90vh", z: 100, scale: 1, rotation: 3 },
  { id: 6, image: "/portfolio_mockup_2_1788430491878.jpg", link: "https://example.com/6", x: "-25vw", y: "110vh", z: -50, scale: 0.95, rotation: -8 },

  // Background (Slowest)
  { id: 7, image: "/mockup8.jpg", link: "https://example.com/7", x: "20vw", y: "-10vh", z: -600, scale: 0.6, rotation: -20 },
  { id: 8, image: "/portfolio_mockup_3_1788430514606.jpg", link: "https://example.com/8", x: "-40vw", y: "-20vh", z: -800, scale: 0.5, rotation: 10 },
  { id: 9, image: "/portfolio_mockup_1_1788430472316.jpg", link: "https://example.com/9", x: "40vw", y: "50vh", z: -1000, scale: 0.45, rotation: 25 },
  { id: 10, image: "/mockup5.jpg", link: "https://example.com/10", x: "-10vw", y: "130vh", z: -1200, scale: 0.4, rotation: -15 },
];

export function ParallaxGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2, // Lowered to 0.2 for buttery smooth, highly responsive scrolling
      },
    });

    // Central text parallax (moves slightly up and fades)
    tl.to(".parallax-title", {
      y: "-20vh",
      opacity: 0,
      ease: "power1.inOut",
    }, 0);

    // Image Cards Parallax
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const item = parallaxItems[index];

      // Set initial 3D position
      gsap.set(card, {
        x: item.x,
        y: item.y,
        z: item.z,
        scale: item.scale,
        rotation: item.rotation,
        xPercent: -50,
        yPercent: -50,
      });

      // Calculate parallax speed based on Z depth
      const baseDistance = -150; // vh
      const zFactor = 1 + (item.z / 1000); 
      
      const travelDistance = baseDistance * Math.max(zFactor, 0.2); // keep a minimum movement

      tl.to(
        card,
        {
          y: `+=${travelDistance}vh`,
          ease: "none",
        },
        0 // All start at 0
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    // 400vh for massive scrolling room
    <div ref={containerRef} className="relative w-full h-[400vh] bg-transparent">
      
      {/* Sticky viewport with high perspective for 3D space */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-[1000px]"
      >
        
        {/* Central Text */}
        <div className="parallax-title z-30 flex flex-col items-center text-center pointer-events-none">
          <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text tracking-tighter"
              style={{ 
                fontFamily: "var(--font-syne)", 
                backgroundImage: "linear-gradient(135deg, #111111 0%, #71717a 100%)",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))"
              }}>
            INTO THE<br />
            <span style={{ backgroundImage: "linear-gradient(90deg, #5B21B6, #1D4ED8)", WebkitBackgroundClip: "text" }}>
              MULTIVERSE
            </span>
          </h2>
        </div>

        {/* 3D Scattered Image Cards */}
        {parallaxItems.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="absolute top-1/2 left-1/2 w-[260px] md:w-[360px] aspect-video rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/5 bg-white transform-gpu"
            style={{
              // Fallback z-index sorting based on z depth to ensure closer items overlap further ones
              zIndex: Math.round(item.z + 1000)
            }}
          >
            {/* The scale effect is placed on the inner wrapper so it doesn't fight GSAP's transform */}
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="relative w-full h-full block transform transition-transform duration-300 hover:scale-110 overflow-hidden rounded-xl">
              <Image
                src={item.image}
                alt="Gallery item"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
