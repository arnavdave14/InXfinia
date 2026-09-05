"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contentArray = [
  "InXfinia", "exists", "to", "redefine", "how", "businesses", "build,", "operate,", "and", "scale", "in", "the", "era", "of",
  { h: "Artificial Intelligence.", g: "from-emerald-400 to-cyan-400", speech: "I'm WatX — your always-on AI co-pilot." },
  "BR",
  "By", "combining",
  { h: "intelligent automation,", g: "from-purple-400 to-blue-400", speech: "Workflows that run themselves ⚡️" },
  { h: "real-time ML inference,", g: "from-orange-400 to-pink-400", speech: "Decisions in under 2ms. 🧠" },
  "and",
  { h: "sovereign cloud compute,", g: "from-lime-400 to-green-400", speech: "Your data. Your infrastructure. ☁️" },
  "we", "engineer",
  { h: "AI-native products", g: "from-sky-400 to-cyan-400", speech: "Built for the speed of thought. 🚀" },
  "that", "are",
  { h: "faster,", g: "from-emerald-400 to-cyan-400" },
  { h: "smarter,", g: "from-purple-400 to-blue-400" },
  "and",
  { h: "built for what comes next.", g: "from-orange-400 to-pink-400", speech: "The future is already here. 🔮" },
  "BR",
  "The", "result?"
];

export function ValueProposition() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const robotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !cardsRef.current || !robotsRef.current) return;

    const words = textRef.current.querySelectorAll(".word");
    const whiteTexts = textRef.current.querySelectorAll(".highlight-white");
    const bgPills = textRef.current.querySelectorAll(".highlight-bg");
    const gradientTexts = textRef.current.querySelectorAll(".highlight-gradient");
    const cards = cardsRef.current.querySelectorAll(".result-card");
    const allRevealItems = textRef.current.querySelectorAll(".reveal-item");

    gsap.set(words, { y: 20, scale: 0.95, opacity: 0.15, filter: "blur(8px)", color: "#a1a1aa" });
    gsap.set(whiteTexts, { y: 20, opacity: 0.15, filter: "blur(8px)", color: "#a1a1aa" });
    gsap.set([bgPills, gradientTexts], { clipPath: "inset(0% 100% 0% 0%)", opacity: 1 });
    gsap.set(cards, { y: 80, opacity: 0, filter: "blur(16px)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=650%",
        pin: true,
        scrub: 1.5,
      }
    });

    let timeCursor = 0;

    allRevealItems.forEach((item) => {
      if (item.classList.contains("word")) {
        tl.to(item, {
          color: "#ffffff",
          filter: "blur(0px)",
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }, timeCursor);
        timeCursor += 0.14;
      } else if (item.classList.contains("highlight-container")) {
        const bgPill = item.querySelector(".highlight-bg");
        const gradientText = item.querySelector(".highlight-gradient");
        const whiteText = item.querySelector(".highlight-white");
        const speechIndex = item.getAttribute("data-speech-index");

        tl.to(whiteText, {
          color: "#ffffff",
          filter: "blur(0px)",
          y: 0,
          opacity: 1,
          duration: 0.8,
        }, timeCursor);

        tl.to([bgPill, gradientText], {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power2.inOut",
        }, timeCursor);

        tl.to(item, {
          scale: 1.04,
          duration: 0.75,
          ease: "power1.out",
        }, timeCursor);

        let robotCombo = null;
        if (speechIndex !== null && robotsRef.current) {
          robotCombo = robotsRef.current.querySelector(`.robot-${speechIndex}`);
          if (robotCombo) {
            const isAI = speechIndex === "0";
            tl.to(robotCombo, {
              opacity: 1,
              y: 0,
              x: isAI ? "-50%" : 0,
              scale: 1,
              duration: isAI ? 1.2 : 1,
              ease: isAI ? "back.out(1.2)" : "back.out(1.5)",
            }, timeCursor);
          }
        }

        tl.to(item, { scale: 1, duration: 0.75, ease: "power1.in" }, timeCursor + 0.75);

        timeCursor += 1.6;

        tl.to([gradientText, bgPill], {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        }, timeCursor);

        if (robotCombo) {
          const isAI = speechIndex === "0";
          tl.to(robotCombo, {
            opacity: 0,
            y: isAI ? -50 : 20,
            x: isAI ? "100vw" : 0,
            scale: isAI ? 0.5 : 0.9,
            duration: isAI ? 1 : 0.8,
            ease: "power2.in",
          }, timeCursor);
        }
      }
    });

    timeCursor += 2.0;

    tl.to(cards, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 1.0,
      duration: 2.5,
      ease: "power3.out",
    }, timeCursor);

    tl.to([gradientTexts, bgPills], {
      opacity: 1,
      duration: 2.5,
      ease: "power2.inOut",
    }, timeCursor);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  let speechCounter = 0;

  return (
    <section
      ref={containerRef}
      className="min-h-[100svh] w-full bg-[#050810] text-white flex flex-col justify-center items-center py-12 md:py-20 px-4 overflow-hidden relative"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e5fff]/5 via-[#050810] to-[#22d3a8]/5 pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-[#1e5fff] opacity-[0.05] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vh] bg-[#22d3a8] opacity-[0.05] blur-[120px] pointer-events-none rounded-full" />

      {/* Robot Speech Bubbles */}
      <div ref={robotsRef} className="absolute inset-0 z-50 pointer-events-none hidden md:block">
        {contentArray.map((item) => {
          if (typeof item === "object" && item.speech) {
            const index = speechCounter++;
            const isAI = index === 0;
            return (
              <div
                key={`robot-${index}`}
                className={`robot-${index} absolute flex gap-3 opacity-0 w-max max-w-[320px] ${
                  isAI
                    ? "top-[15%] left-1/2 flex-col items-center text-center -translate-x-[200vw] scale-50"
                    : "bottom-10 right-10 items-end translate-y-10 scale-90"
                }`}
              >
                <div className={`glass border border-white/10 text-white px-5 py-3 rounded-2xl shadow-xl ${
                  isAI ? "rounded-b-sm mb-2" : "rounded-br-sm mb-3 origin-bottom-right"
                }`}>
                  <p className="text-sm font-semibold leading-relaxed">{item.speech}</p>
                </div>
                <div
                  className={`${isAI ? "w-24 h-24" : "w-16 h-16"} drop-shadow-2xl animate-bounce relative flex-shrink-0`}
                  style={{ animationDuration: "3s" }}
                >
                  <img src="/nano_bot.png" alt="AI Bot" className="w-full h-full object-contain" />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="max-w-5xl w-full text-center z-10 flex flex-col items-center justify-center h-full">
        <div
          ref={textRef}
          className="text-xl md:text-3xl lg:text-[38px] font-bold leading-[1.5] tracking-tight"
        >
          {(() => {
            let itemSpeechCounter = 0;
            return contentArray.map((item, index) => {
              if (item === "BR") return <div key={index} className="h-3 md:h-6 w-full block" />;

              if (typeof item === "string") {
                return (
                  <span key={index} className="reveal-item word inline-block mr-[0.3em] mb-[0.15em] will-change-transform">
                    {item}
                  </span>
                );
              }

              const currentSpeechIndex = item.speech ? itemSpeechCounter++ : undefined;

              return (
                <span
                  key={index}
                  data-speech-index={currentSpeechIndex}
                  className="reveal-item highlight-container relative inline-block mr-[0.3em] mb-[0.15em] will-change-transform"
                >
                  <span className="highlight-white relative z-10 inline-block px-3 py-1">{item.h}</span>
                  <span className={`highlight-gradient absolute top-0 left-0 z-20 px-3 py-1 text-transparent bg-clip-text bg-gradient-to-r ${item.g}`}>
                    {item.h}
                  </span>
                  <span className="highlight-bg absolute inset-0 z-0 bg-white/[0.08] border border-white/15 rounded-full shadow-[0_0_30px_rgba(30,95,255,0.15)]" />
                </span>
              );
            });
          })()}
        </div>

        {/* Result cards */}
        <div ref={cardsRef} className="mt-10 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-4xl">
          {[
            { emoji: "✨", title: "Intelligent Solutions", sub: "AI-native from day one", color: "from-emerald-400/20 to-cyan-400/20", glow: "rgba(34,211,168,0.15)" },
            { emoji: "🚀", title: "Smarter Businesses", sub: "10× faster decisions", color: "from-blue-400/20 to-purple-400/20", glow: "rgba(30,95,255,0.15)" },
            { emoji: "∞", title: "Infinite Scale", sub: "No ceiling, ever", color: "from-pink-400/20 to-orange-400/20", glow: "rgba(168,85,247,0.15)" },
          ].map((card, i) => (
            <div
              key={i}
              className="result-card flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl glass border border-white/10 flex-1 w-full relative overflow-hidden group hover:-translate-y-2 hover:border-white/20 transition-all duration-500 shimmer-effect"
              style={{ boxShadow: `0 0 40px ${card.glow}` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <span className="text-3xl md:text-4xl mb-3 relative z-10">{card.emoji}</span>
              <h3 className="text-base md:text-lg font-bold text-white text-center relative z-10">{card.title}</h3>
              <p className="text-xs text-zinc-500 mt-1 relative z-10">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
