"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const tl = gsap.timeline();

    // Headline stagger reveal with slight rotation (more dynamic)
    const lines = headlineRef.current.querySelectorAll(".hero-line");
    tl.fromTo(lines,
      { yPercent: 120, rotate: 2, opacity: 0 },
      { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.15, duration: 1.4, ease: "power4.out" },
      0.2
    );

    // Bottom content reveal
    tl.fromTo(bottomRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      1.0
    );

    // Scroll parallax effect
    gsap.to(headlineRef.current, {
      y: -150,
      opacity: 0,
      scale: 0.95,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col z-10 mx-auto max-w-[84rem]">
      {/* ── Hero content ── */}
      <div className="flex-1 flex flex-col justify-center px-4 md:px-8 lg:px-12 pt-32 pb-32 relative">
        {/* Tag */}
        <div className="section-tag mb-10 w-fit self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] animate-pulse" />
          AI Infrastructure Platform — v3.0
        </div>

        {/* Giant headline */}
        <div ref={headlineRef} className="flex flex-col gap-2">
          {["STARTUP SPEED.", "ENTERPRISE SCALE.", "AI NATIVE."].map((line, i) => (
            <div key={i} className="overflow-hidden pb-4 -mb-4">
              <div
                className="hero-line font-black leading-[0.85]"
                style={{
                  fontSize: "clamp(3rem, 11vw, 10rem)",
                  letterSpacing: "-0.04em",
                  color: i === 1 ? "transparent" : "#090A0F",
                  WebkitTextStroke: i === 1 ? "2px rgba(9,10,15,0.15)" : "none",
                  transformOrigin: "left bottom"
                }}
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: desc + CTA */}
        <div
          ref={bottomRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mt-12 md:mt-16 items-end"
          style={{ opacity: 0 }}
        >
          <div className="md:col-span-5">
            <p className="text-[#4a4453] text-lg leading-relaxed">
              The complete AI stack from data ingestion to real-time inference. Deploy any model, at any scale, in minutes.
            </p>
          </div>
          <div className="md:col-span-7 flex flex-col sm:flex-row justify-start md:justify-end gap-4 w-full">
            <Link href="/platform" className="btn-primary px-8 py-4 text-base w-full sm:w-auto justify-center text-center">
              View Platform <ArrowUpRight size={16} className="inline ml-2" />
            </Link>
            <button className="btn-secondary px-8 py-4 text-base w-full sm:w-auto">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Floating badge (Parallax) */}
        <div
          className="absolute right-12 top-[40%] hidden lg:flex flex-col gap-4"
          data-speed="1.2"
        >
          <div className="glass rounded-[1.5rem] p-6 max-w-[240px] hover:border-[rgba(9,10,15,0.15)] transition-colors">
            <div className="text-4xl font-black text-[#090A0F] tracking-tighter mb-2" style={{ fontFamily: "var(--font-syne)" }}>99.9<span className="text-[#5B21B6]">%</span></div>
            <div className="label-caps text-[#7b7485]">Uptime SLA</div>
          </div>
          <div className="glass rounded-[1.5rem] p-6 max-w-[240px] hover:border-[rgba(9,10,15,0.15)] transition-colors">
            <div className="text-4xl font-black text-[#090A0F] tracking-tighter mb-2" style={{ fontFamily: "var(--font-syne)" }}>1.2<span className="text-[#1D4ED8]">ms</span></div>
            <div className="label-caps text-[#7b7485]">Avg Latency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
