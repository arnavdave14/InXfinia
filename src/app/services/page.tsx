"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Services Data ──────────────────────────────────────── */
const SERVICES = [
  {
    id: "01",
    name: "AI & Machine Learning",
    short: "AI / ML",
    desc: "Production-ready ML systems — from LLM fine-tuning and RAG pipelines to real-time inference engines processing millions of events per second.",
    color: "#5B21B6",
    accent: "rgba(91,33,182,0.15)",
    tags: ["LLM Fine-tuning", "Real-time Inference", "RAG Pipelines", "AutoML"],
    image: "/mockup5.jpg",
  },
  {
    id: "02",
    name: "Full-Stack Development",
    short: "DEVELOPMENT",
    desc: "Complete, production-grade digital products with a focus on performance, scalability, and extraordinary user experience using the latest technologies.",
    color: "#1e5fff",
    accent: "rgba(30,95,255,0.15)",
    tags: ["Next.js & React", "Node.js Backends", "Mobile-first Design", "CI/CD Pipelines"],
    image: "/mockup6.jpg",
  },
  {
    id: "03",
    name: "Autonomous AI Agents",
    short: "AI AGENTS",
    desc: "Multi-step autonomous agents with persistent memory, tool use, and dynamic planning. From customer service bots to fully automated workflows.",
    color: "#22d3a8",
    accent: "rgba(34,211,168,0.15)",
    tags: ["Multi-agent Orchestration", "Tool Use & APIs", "Memory Stores", "Workflow Automation"],
    image: "/mockup7.jpg",
  },
  {
    id: "04",
    name: "Cloud Infrastructure",
    short: "CLOUD / MLOPS",
    desc: "Sovereign, multi-cloud environments optimized for AI training and serving. Managed MLOps ensures your models are monitored, versioned, and always online.",
    color: "#D97706",
    accent: "rgba(217,119,6,0.15)",
    tags: ["AWS / GCP / Azure", "GPU Clusters", "Model Monitoring", "Zero-downtime Deploy"],
    image: "/mockup8.jpg",
  },
  {
    id: "05",
    name: "Cybersecurity",
    short: "SECURITY",
    desc: "Zero-trust networking, penetration testing, SOC 2 readiness, and HIPAA compliance — security embedded into every layer of your infrastructure from day one.",
    color: "#059669",
    accent: "rgba(5,150,105,0.15)",
    tags: ["Zero-Trust Networking", "Pen Testing", "SOC 2 Compliance", "AI Security Audits"],
    image: "/portfolio_mockup_1_1788430472316.jpg",
  },
  {
    id: "06",
    name: "Data Engineering",
    short: "DATA",
    desc: "End-to-end data pipelines that collect, transform, and serve insights in real time. Custom analytics platforms for confident, data-driven decision making.",
    color: "#DB2777",
    accent: "rgba(219,39,119,0.15)",
    tags: ["Real-time Pipelines", "Data Warehouse", "Analytics Dashboards", "Revenue Forecasting"],
    image: "/portfolio_mockup_2_1788430491878.jpg",
  },
  {
    id: "07",
    name: "Growth Engineering",
    short: "GROWTH",
    desc: "Ship faster. Grow smarter. Product engineering fused with growth strategy to build systems that acquire, activate, and retain users — all data-driven.",
    color: "#7C3AED",
    accent: "rgba(124,58,237,0.15)",
    tags: ["Experimentation Platforms", "CRO", "Behavioral Analytics", "Performance SEO"],
    image: "/portfolio_mockup_3_1788430514606.jpg",
  },
  {
    id: "08",
    name: "API Integration",
    short: "INTEGRATION",
    desc: "Robust, event-driven integration layers connecting your SaaS stack, legacy systems, and third-party APIs. Reliability and observability are non-negotiable.",
    color: "#0891B2",
    accent: "rgba(8,145,178,0.15)",
    tags: ["REST & GraphQL APIs", "Event-driven Architecture", "Legacy Modernization", "Webhook Orchestration"],
    image: "/portfolio_mockup_4_1788430536399.jpg",
  },
];

/* ─── Service Row ────────────────────────────────────────── */
function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  /* hover image slide-in */
  const handleEnter = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" });
    }
  };
  const handleLeave = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, { opacity: 0, x: 40, duration: 0.4, ease: "power3.in" });
    }
  };

  return (
    <div
      ref={rowRef}
      className="service-row border-b border-black/10 group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ── Main clickable row ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-7 md:py-9 px-0 text-left cursor-pointer"
      >
        {/* Left: index + title */}
        <div className="flex items-baseline gap-6 md:gap-10">
          <span className="font-mono text-xs text-black/25 w-6 shrink-0 translate-y-[-2px]">
            {service.id}
          </span>
          <h2
            className="font-syne font-extrabold tracking-tight leading-none transition-colors duration-300 text-[clamp(2rem,5.5vw,5.5rem)] group-hover:text-transparent group-hover:bg-clip-text"
            style={
              {
                "--color": service.color,
              } as React.CSSProperties
            }
          >
            <span
              className="group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
              style={{
                WebkitTextFillColor: "inherit",
                backgroundImage: `linear-gradient(90deg, ${service.color}, ${service.color}cc)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {service.name}
            </span>
          </h2>
        </div>

        {/* Right: image preview + toggle */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Hover image pill */}
          <div
            ref={imgRef}
            className="hidden md:block w-36 h-20 rounded-2xl overflow-hidden opacity-0 translate-x-10 pointer-events-none shadow-lg"
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Short label */}
          <span
            className="hidden lg:block font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border font-semibold"
            style={{ color: service.color, borderColor: `${service.color}40`, background: service.accent }}
          >
            {service.short}
          </span>

          {/* Plus/Minus */}
          <div
            className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center transition-colors duration-300 group-hover:border-black/30 shrink-0"
          >
            {open ? <Minus size={16} /> : <Plus size={16} />}
          </div>
        </div>
      </button>

      {/* ── Accordion detail panel ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 ml-12 md:ml-24 grid md:grid-cols-3 gap-8">
              {/* Image */}
              <div className="md:col-span-1 rounded-2xl overflow-hidden h-48 shadow-md">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <p className="text-[#4a4453] text-base leading-relaxed mb-5 max-w-xl">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono font-semibold border"
                      style={{ color: service.color, borderColor: `${service.color}40`, background: service.accent }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#090A0F] hover:text-black transition-colors"
                >
                  Start this project <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function ServicesPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header reveal */
      gsap.fromTo(
        ".srv-header-line",
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.1,
        }
      );

      /* Service rows stagger in on scroll */
      gsap.fromTo(
        ".service-row",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-list",
            start: "top 80%",
          },
        }
      );

      /* Featured work title */
      gsap.fromTo(
        ".featured-title",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".featured-section",
            start: "top 80%",
          },
        }
      );

      /* Portfolio images cascade */
      gsap.fromTo(
        ".featured-img",
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".featured-section",
            start: "top 70%",
          },
        }
      );

      /* CTA parallax */
      gsap.fromTo(
        ".cta-section",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Mesh background */}
      <div className="mesh-bg" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      <div ref={mainRef} className="relative z-10 min-h-screen">

        {/* ════════════════════
            HEADER
        ════════════════════ */}
        <section className="pt-36 pb-16 px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Left: big title */}
            <div>
              <div className="srv-header-line font-mono text-xs uppercase tracking-[0.3em] text-black/40 mb-4">
                Our Services
              </div>
              <h1 className="srv-header-line font-syne text-[clamp(3rem,7vw,6.5rem)] font-extrabold leading-[0.92] tracking-tight text-[#090A0F]">
                InXfinia<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500">
                  Services!
                </span>
              </h1>
            </div>

            {/* Right: descriptor */}
            <div className="srv-header-line max-w-xs">
              <div className="w-2 h-2 rounded-full bg-violet-500 mb-3 animate-pulse" />
              <p className="text-[#6b5f7a] text-sm leading-relaxed">
                We combine AI engineering, full-stack development, and growth intelligence to build products and systems that define the next generation of digital business.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════
            SERVICE ACCORDION
        ════════════════════ */}
        <section className="px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto services-list border-t border-black/10">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </section>

        {/* ════════════════════
            FEATURED WORK
        ════════════════════ */}
        <section className="featured-section px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto pt-24 pb-20">
          {/* Header row */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/35 block mb-2">Our Work</span>
              <h2 className="featured-title font-syne text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold text-[#090A0F] leading-tight tracking-tight">
                Selected<br />Projects
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#090A0F] hover:text-violet-700 transition-colors"
            >
              All Works <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Scattered image grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/mockup5.jpg", h: "h-52 md:h-72", delay: 0 },
              { src: "/portfolio_mockup_1_1788430472316.jpg", h: "h-64 md:h-80 mt-0 md:mt-8", delay: 1 },
              { src: "/portfolio_mockup_2_1788430491878.jpg", h: "h-52 md:h-64 mt-0 md:-mt-4", delay: 2 },
              { src: "/mockup8.jpg", h: "h-64 md:h-72 mt-0 md:mt-6", delay: 3 },
            ].map((img, i) => (
              <div
                key={i}
                className={`featured-img ${img.h} rounded-2xl overflow-hidden shadow-md group cursor-pointer`}
              >
                <img
                  src={img.src}
                  alt={`Project ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Navigation pills */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/8">
            <div className="flex gap-4">
              <span className="font-mono text-xs text-black/35 flex items-center gap-1.5 cursor-pointer hover:text-black/60 transition-colors">
                <span className="w-1 h-1 rounded-full bg-black/30" /> Explore
              </span>
              <span className="font-mono text-xs text-black/35 flex items-center gap-1.5 cursor-pointer hover:text-black/60 transition-colors">
                <span className="w-1 h-1 rounded-full bg-black/30" /> Gallery
              </span>
            </div>
            <Link href="/portfolio" className="font-mono text-xs font-bold text-black/50 hover:text-black transition-colors flex items-center gap-1">
              :: All Works <ArrowUpRight size={12} />
            </Link>
          </div>
        </section>

        {/* ════════════════════
            GET IN TOUCH CTA
        ════════════════════ */}
        <section className="cta-section px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto pb-36">
          <div className="border-t border-black/10 pt-14">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/35 block mb-4">Hire us</span>
            <div className="flex items-end gap-8 flex-wrap">
              <h2 className="font-syne text-[clamp(3rem,8vw,7rem)] font-extrabold leading-none tracking-tight text-[#090A0F]">
                Get In Touch
              </h2>
              <Link
                href="/contact"
                className="mb-2 w-16 h-16 rounded-full bg-[#090A0F] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(91,33,182,0.35)] transition-all duration-300 shrink-0"
              >
                <ArrowUpRight size={20} className="text-white" />
              </Link>
            </div>
            <p className="mt-5 font-mono text-sm text-black/40 max-w-md">
              Ready to build something extraordinary? Tell us about your project.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
