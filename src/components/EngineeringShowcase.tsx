"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DigitalArtifacts } from "./canvas/DigitalArtifacts";
import { motion, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    title: "DATA INGESTION & ENRICHMENT",
    tag: "Ingest v3",
    desc: "Stream, batch, or real-time data from any source. Automatic schema inference, deduplication, and enrichment with AI-powered entity extraction.",
    color: "#22d3a8",
  },
  {
    id: "02",
    title: "AI MODEL TRAINING & EVALUATION",
    tag: "Train v4",
    desc: "Distributed training on any architecture — LLMs, vision transformers, tabular models. Automated hyperparameter tuning and comprehensive eval suites.",
    color: "#1e5fff",
  },
  {
    id: "03",
    title: "INFERENCE ENGINE & SERVING",
    tag: "Serve v3",
    desc: "Sub-2ms latency at any scale. Custom CUDA kernels, model quantization, and intelligent request batching. Blue-green deployments with zero downtime.",
    color: "#a855f7",
  },
  {
    id: "04",
    title: "MONITORING & CONTINUOUS LEARNING",
    tag: "Monitor v2",
    desc: "Real-time model drift detection, data quality alerts, and automated retraining triggers. Close the loop between production signals and model improvement.",
    color: "#f59e0b",
  },
];

export function EngineeringShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<SVGLineElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);
    const handleResize = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !leftColumnRef.current) return;

    const sections = leftColumnRef.current.querySelectorAll(".timeline-step");

    if (isReducedMotion || isMobile) {
      sections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
            scrollTrigger: { trigger: section, start: "top 80%" }
          }
        );
      });
      return;
    }

    // Pin right column
    if (rightColumnRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: rightColumnRef.current,
      });
    }

    sections.forEach((section, index) => {
      gsap.fromTo(section,
        { opacity: 0, x: -60, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play reverse play reverse",
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index),
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isReducedMotion, isMobile]);

  return (
    <section ref={containerRef} className="relative bg-[#050810] text-white py-28 md:py-40 px-6 md:px-12 overflow-visible">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] bg-[#1e5fff] rounded-full mix-blend-screen filter blur-[200px] opacity-[0.04] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="mb-24 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e5fff] animate-pulse" />
            <span className="text-[#1e5fff] font-mono text-xs tracking-widest uppercase">AI Pipeline Architecture</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
          >
            From data to{" "}
            <span className="text-gradient-blue-teal">production AI,</span>
            <br />engineered flawlessly.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-zinc-400 max-w-2xl"
          >
            A fully composable AI pipeline — designed for extreme throughput, enterprise reliability, and developer joy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Left Column Timeline */}
          <div ref={leftColumnRef} className="md:col-span-5 flex flex-col pt-12 pb-[50vh] relative">
            {/* Animated vertical progress line */}
            <div className="absolute left-[31px] top-0 bottom-0 w-[2px] hidden md:block overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(180deg, #1e5fff 0%, #22d3a8 50%, #a855f7 100%)",
                  opacity: 0.2,
                }}
              />
            </div>

            <div className="flex flex-col gap-28">
              {steps.map((step, index) => (
                <div key={step.id} className="timeline-step flex flex-col md:flex-row items-start gap-6 relative z-10" style={{ opacity: 0 }}>
                  {/* Step number circle */}
                  <div
                    className="w-16 h-16 rounded-full bg-[#0a0f1a] border flex items-center justify-center text-lg font-bold shrink-0 shadow-lg relative transition-all duration-500"
                    style={{
                      borderColor: activeStep === index ? step.color : "rgba(255,255,255,0.08)",
                      color: activeStep === index ? step.color : "#555",
                      boxShadow: activeStep === index ? `0 0 20px ${step.color}40` : "none",
                    }}
                  >
                    {step.id}
                    {activeStep === index && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-20"
                        style={{ background: step.color }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="glass border rounded-2xl p-6 w-full shadow-2xl transition-all duration-500"
                    style={{
                      borderColor: activeStep === index ? `${step.color}40` : "rgba(255,255,255,0.06)",
                      boxShadow: activeStep === index ? `0 0 30px ${step.color}20` : "none",
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-sm font-bold tracking-wider" style={{ color: step.color }}>
                        {step.title}
                      </h3>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded border"
                        style={{ color: step.color, borderColor: `${step.color}40`, background: `${step.color}10` }}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Pinned Canvas) */}
          {!isReducedMotion && !isMobile && (
            <div className="md:col-span-7 relative hidden md:block">
              <div ref={rightColumnRef} className="w-full h-screen flex flex-col justify-center sticky top-0">
                <div
                  className="w-full h-[580px] border rounded-3xl bg-[#050810] overflow-hidden relative transition-all duration-500"
                  style={{ borderColor: `${steps[activeStep]?.color ?? "#1e5fff"}30` }}
                >
                  <div className="absolute top-6 left-6 z-10 font-mono text-xs text-zinc-500 flex flex-col gap-1">
                    <span className="text-zinc-600">// AI PIPELINE VISUALIZATION</span>
                    <span style={{ color: steps[activeStep]?.color ?? "#1e5fff" }}>
                      STAGE: {activeStep + 1} / {steps.length} — {steps[activeStep]?.tag}
                    </span>
                  </div>
                  {/* Glow behind canvas */}
                  <div
                    className="absolute inset-0 transition-all duration-700 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 60px ${steps[activeStep]?.color ?? "#1e5fff"}15` }}
                  />
                  <DigitalArtifacts activeStep={activeStep} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
