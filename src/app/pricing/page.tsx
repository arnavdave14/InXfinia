"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Hobby",
    price: "$0",
    desc: "For side projects and experiments.",
    features: ["100k API calls / mo", "Community Support", "Standard Models (Llama 3 8B)", "Shared Cluster"],
    color: "#a855f7"
  },
  {
    name: "Pro",
    price: "$49",
    desc: "For production apps scaling up.",
    features: ["5M API calls / mo", "Priority Email Support", "Premium Models (Llama 3 70B)", "Dedicated Inference Nodes", "Fine-tuning access"],
    color: "#22d3a8",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For massive scale and compliance.",
    features: ["Unlimited API calls", "24/7 Phone Support", "Custom Model Deployment", "VPC Peering & SOC2", "Dedicated Account Manager"],
    color: "#1e5fff"
  }
];

export default function PricingPage() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Desktop fan out animation
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray(".pricing-card");
      
      // Initial state: Stacked in the center, rotated, opacity 0
      gsap.set(cards, { 
        xPercent: -50, 
        yPercent: 50, 
        left: "50%", 
        rotationZ: (i) => (i - 1) * 15,
        opacity: 0,
        scale: 0.8
      });

      // Fan out animation
      gsap.to(cards, {
        xPercent: 0,
        yPercent: 0,
        left: "0%", // Reverts absolute positioning essentially by CSS layout taking over (we animate x instead)
        x: (i) => (i - 1) * 350, // Space them out
        rotationZ: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.2
      });
      
      // Magnetic Hover effect for cards
      cards.forEach((card: any) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -20, scale: 1.02, duration: 0.4, ease: "back.out(2)" });
          gsap.to(card.querySelector('.glow-bg'), { opacity: 0.15, duration: 0.4 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(card.querySelector('.glow-bg'), { opacity: 0, duration: 0.4 });
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile staggered fade in
      gsap.fromTo(".pricing-card", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#090A0F] overflow-hidden selection:bg-[#22d3a8] selection:text-black">
      {/* Spacer for navbar */}
      <div className="h-24"></div>
      
      <section ref={containerRef} className="relative w-full min-h-[90vh] flex flex-col items-center pt-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 z-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3a8] to-[#1e5fff]">pricing.</span>
          </h1>
          <p className="max-w-xl mx-auto text-[#4a4453] text-lg md:text-xl">
            No hidden fees. No compute markup. Pay only for the tokens you generate.
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative w-full max-w-5xl h-auto md:h-[600px] flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0 mt-10 md:mt-0">
          {TIERS.map((tier, i) => (
            <div 
              key={i} 
              className={`pricing-card relative w-full md:w-[320px] glass bg-white/40 border border-black/5 rounded-3xl p-8 shadow-xl backdrop-blur-xl md:absolute z-${20 - i}`}
            >
              {/* Hover Glow */}
              <div 
                className="glow-bg absolute inset-0 rounded-3xl pointer-events-none opacity-0 transition-colors"
                style={{ background: `radial-gradient(circle at top right, ${tier.color}, transparent)` }}
              />

              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#22d3a8] text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-[0_5px_15px_rgba(34,211,168,0.4)]">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-[#4a4453] text-sm h-10">{tier.desc}</p>
              
              <div className="my-8">
                <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-[#4a4453] font-medium">/month</span>}
              </div>

              <button 
                className="w-full py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 mb-8"
                style={{
                  background: tier.popular ? "linear-gradient(135deg, #1e5fff, #22d3a8)" : "transparent",
                  color: tier.popular ? "white" : "#090A0F",
                  border: tier.popular ? "none" : "2px solid #e4e4e7"
                }}
              >
                Get Started
              </button>

              <div className="space-y-4">
                {tier.features.map((feat, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check size={18} style={{ color: tier.color }} className="shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-[#4a4453]">{feat}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
