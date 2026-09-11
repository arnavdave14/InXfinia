"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Search, Share2, Mail, Target, BarChart3,
  ArrowUpRight, Star, CheckCircle2,
  MousePointer, Users, TrendingUp, Zap
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Marketing Services Data ─────────────────────────────── */
const MARKETING_SERVICES = [
  {
    id: "01",
    title: "SEO & Content",
    tagline: "Rank #1. Stay #1.",
    description: "We engineer content ecosystems that dominate search rankings. Technical audits, keyword architecture, link building — all aligned to drive organic traffic that compounds over time.",
    icon: Search,
    color: "#5B21B6",
    bg: "rgba(91,33,182,0.08)",
    metrics: "3.2× avg traffic growth",
    features: ["Technical SEO Audits", "Content Strategy & Copywriting", "Link Building Campaigns", "Local SEO Domination"],
  },
  {
    id: "02",
    title: "Paid Advertising",
    tagline: "Every rupee, maximized.",
    description: "Google Ads, Meta, LinkedIn — we design performance-driven campaigns with laser-targeted audiences, A/B-tested creatives, and obsessive ROAS optimization.",
    icon: Target,
    color: "#1e5fff",
    bg: "rgba(30,95,255,0.08)",
    metrics: "4.8× average ROAS",
    features: ["Google & Bing Ads", "Meta & Instagram Ads", "LinkedIn B2B Campaigns", "Retargeting Funnels"],
  },
  {
    id: "03",
    title: "Social Media Marketing",
    tagline: "Scroll-stopping content.",
    description: "We craft brand narratives that build communities, not just followers. Platform-native content, viral hooks, and engagement strategies that turn audiences into advocates.",
    icon: Share2,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.08)",
    metrics: "10× engagement lift",
    features: ["Content Calendar & Strategy", "Reel & Video Production", "Community Management", "Influencer Partnerships"],
  },
  {
    id: "04",
    title: "Email Marketing",
    tagline: "Inbox → Revenue.",
    description: "Automated sequences, hyper-segmented campaigns, and lifecycle journeys that convert subscribers into loyal customers — with open rates that embarrass industry benchmarks.",
    icon: Mail,
    color: "#22d3a8",
    bg: "rgba(34,211,168,0.08)",
    metrics: "62% average open rate",
    features: ["Drip & Nurture Sequences", "Behavioural Segmentation", "A/B Subject Line Testing", "Klaviyo / HubSpot Integration"],
  },
  {
    id: "05",
    title: "Brand Strategy",
    tagline: "Identity that commands attention.",
    description: "We develop brand positioning, messaging frameworks, and visual identities that cut through noise and make your brand impossible to ignore in any market.",
    icon: Star,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    metrics: "Brand recall +280%",
    features: ["Brand Positioning & Voice", "Visual Identity Design", "Messaging Framework", "Competitive Differentiation"],
  },
  {
    id: "06",
    title: "Conversion Rate Optimisation",
    tagline: "More traffic. More revenue.",
    description: "We turn your existing traffic into a revenue machine. Heatmaps, user session analysis, funnel audits, and data-driven UI improvements that compound your marketing ROI.",
    icon: MousePointer,
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    metrics: "+178% conversion avg.",
    features: ["Landing Page Redesigns", "Heatmap & Session Analysis", "Sales Funnel Optimization", "Multivariate A/B Testing"],
  },
  {
    id: "07",
    title: "Influencer & Creator Marketing",
    tagline: "Authentic reach, at scale.",
    description: "We connect your brand with the right creators across niches — from nano-influencers driving tight community trust to macro-creators building mass awareness.",
    icon: Users,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    metrics: "2.1B+ combined reach",
    features: ["Influencer Vetting & Outreach", "UGC Campaign Management", "Creator Brief Production", "ROI Attribution & Reporting"],
  },
  {
    id: "08",
    title: "Analytics & Growth Intelligence",
    tagline: "Data you can act on.",
    description: "We build custom analytics dashboards and attribution models that show you exactly what's working, what's not, and where to double down for maximum growth.",
    icon: BarChart3,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    metrics: "100% attribution clarity",
    features: ["GA4 & Custom Dashboards", "Multi-touch Attribution", "Monthly Growth Reports", "Revenue Forecasting Models"],
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Deep-dive audit of your brand, competitors, market, and existing performance data." },
  { num: "02", title: "Strategise", desc: "We craft a data-backed roadmap with clear KPIs, timelines, and channel mix tailored to your goals." },
  { num: "03", title: "Execute", desc: "Our integrated team ships campaigns fast — copy, design, targeting, and tracking all in sync." },
  { num: "04", title: "Optimise", desc: "We iterate relentlessly — testing, learning, and compounding gains until results are undeniable." },
];

/* ─── Spring Scroll Arrow ─────────────────────────────────── */
function SpringArrow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <div ref={ref} className="flex flex-col items-center py-16 gap-3">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.1 }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-black/40"
      >
        What we deliver
      </motion.div>
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.25 }}
        className="w-14 h-14 rounded-full bg-[#090A0F] flex items-center justify-center shadow-lg"
      >
        <ArrowUpRight size={20} className="text-white rotate-90" />
      </motion.div>
      {/* Bouncing dots */}
      <div className="flex flex-col items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-black/25"
            animate={inView ? { opacity: [0.3, 1, 0.3], y: [0, 4, 0] } : { opacity: 0.3 }}
            transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Funky Service Section ───────────────────────────────── */
const CARD_CONFIGS = [
  { visual: "traffic",   accentShape: "circle", initVariant: { x: -100, opacity: 0, rotate: -4 },        animVariant: { x: 0, opacity: 1, rotate: 0 },        transition: { type: "spring" as const, stiffness: 80,  damping: 16, delay: 0.1 } },
  { visual: "roas",      accentShape: "star",   initVariant: { x: 120,  opacity: 0, skewX: 8 },          animVariant: { x: 0, opacity: 1, skewX: 0 },         transition: { type: "spring" as const, stiffness: 90,  damping: 18, delay: 0.1 } },
  { visual: "engage",    accentShape: "badge",  initVariant: { scale: 0.6, opacity: 0, rotate: 6 },      animVariant: { scale: 1, opacity: 1, rotate: 0 },    transition: { type: "spring" as const, stiffness: 120, damping: 14, delay: 0.1 } },
  { visual: "open",      accentShape: "pill",   initVariant: { y: 80,   opacity: 0, rotateX: 30 },       animVariant: { y: 0, opacity: 1, rotateX: 0 },       transition: { type: "spring" as const, stiffness: 100, damping: 16, delay: 0.1 } },
  { visual: "brand",     accentShape: "star",   initVariant: { x: -80,  y: -40, opacity: 0 },            animVariant: { x: 0, y: 0, opacity: 1 },             transition: { type: "spring" as const, stiffness: 85,  damping: 15, delay: 0.1 } },
  { visual: "cro",       accentShape: "circle", initVariant: { scale: 0.3, opacity: 0, rotate: -12 },    animVariant: { scale: 1, opacity: 1, rotate: 0 },    transition: { type: "spring" as const, stiffness: 140, damping: 12, delay: 0.1 } },
  { visual: "influencer",accentShape: "badge",  initVariant: { y: -80,  opacity: 0, rotate: 8 },         animVariant: { y: 0, opacity: 1, rotate: 0 },        transition: { type: "spring" as const, stiffness: 90,  damping: 17, delay: 0.1 } },
  { visual: "analytics", accentShape: "pill",   initVariant: { x: 60,   scale: 0.85, opacity: 0 },       animVariant: { x: 0, scale: 1, opacity: 1 },         transition: { type: "spring" as const, stiffness: 95,  damping: 14, delay: 0.1 } },
];

/* ─── Unique per-service animated data-art visuals ──────── */
function AccentVisual({ type, color, inView }: { type: string; color: string; inView: boolean }) {
  const bars = [65, 80, 50, 90, 70, 100];

  if (type === "traffic") return (
    // Animated bar chart — organic traffic growth
    <div className="flex items-end gap-2 h-20">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-5 rounded-t-lg"
          style={{ background: color, opacity: 0.7 + i * 0.05 }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${h}%` } : { height: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: "easeOut" }}
        />
      ))}
      <div className="absolute bottom-0 right-3 font-syne font-black text-4xl opacity-90" style={{ color }}>
        3.2×
      </div>
    </div>
  );

  if (type === "roas") return (
    // Concentric pulsing rings — ROAS multiplier
    <div className="relative w-28 h-28 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{ borderColor: color, width: 48 + i * 28, height: 48 + i * 28 }}
          animate={inView ? { opacity: [0.6, 0.1, 0.6], scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <span className="relative z-10 font-syne font-black text-2xl" style={{ color }}>4.8×</span>
    </div>
  );

  if (type === "engage") return (
    // Horizontal engagement bar with fill
    <div className="w-full max-w-[160px] flex flex-col gap-3">
      {[["Reach", 82], ["Engage", 94], ["Share", 68]].map(([label, val]) => (
        <div key={label as string}>
          <div className="flex justify-between font-mono text-[10px] mb-1" style={{ color }}>
            <span>{label}</span><span>{val}%</span>
          </div>
          <div className="h-2 rounded-full bg-black/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: color }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${val}%` } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  if (type === "open") return (
    // Envelope opening animation
    <div className="relative w-24 h-20 flex items-center justify-center">
      {/* Envelope body */}
      <div className="w-20 h-14 rounded-lg border-2 relative overflow-hidden" style={{ borderColor: `${color}60`, background: `${color}10` }}>
        {/* animated line pattern = email content */}
        {[0,1,2].map(i => (
          <motion.div key={i} className="absolute left-3 right-3 h-0.5 rounded-full" style={{ top: 20 + i*10, background: `${color}50` }}
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          />
        ))}
      </div>
      {/* Open rate badge */}
      <motion.div
        className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center font-syne font-black text-xs"
        style={{ background: color, color: "#fff" }}
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
      >
        62%
      </motion.div>
    </div>
  );

  if (type === "brand") return (
    // Bold typographic "B" with orbiting dot
    <div className="relative w-24 h-24 flex items-center justify-center">
      <span className="font-syne font-black text-7xl leading-none" style={{ color, opacity: 0.9 }}>B</span>
      <motion.div
        className="absolute w-4 h-4 rounded-full"
        style={{ background: color, transformOrigin: "50px 50px" }}
        animate={inView ? { rotate: 360 } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-4 h-4 rounded-full" style={{ background: color, transform: "translateX(36px)" }} />
      </motion.div>
    </div>
  );

  if (type === "cro") return (
    // Upward arrow with fill progress
    <div className="relative flex flex-col items-center gap-1">
      <motion.div
        className="font-syne font-black text-5xl leading-none"
        style={{ color }}
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
      >
        +178%
      </motion.div>
      <div className="flex items-center gap-1 mt-1">
        {[0,1,2,3,4].map(i => (
          <motion.div key={i} className="w-5 rounded-sm"
            style={{ background: color, height: 8 + i * 6 }}
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
          />
        ))}
        <motion.div
          className="ml-1 font-mono text-lg font-black"
          style={{ color }}
          animate={inView ? { y: [-4, 0, -4] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >↑</motion.div>
      </div>
    </div>
  );

  if (type === "influencer") return (
    // Network dots connected by lines
    <div className="relative w-28 h-20">
      {[
        { cx: 14,  cy: 10,  r: 6  },
        { cx: 56,  cy: 4,   r: 8  },
        { cx: 100, cy: 14,  r: 5  },
        { cx: 28,  cy: 56,  r: 7  },
        { cx: 80,  cy: 60,  r: 6  },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ background: color, width: dot.r * 2, height: dot.r * 2, left: dot.cx, top: dot.cy }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.8 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 + i * 0.1 }}
        />
      ))}
      {/* Connection lines via absolute divs */}
      {[[14,13, 56,8], [56,8, 100,17], [56,8, 28,63], [28,63, 80,66]].map(([x1,y1,x2,y2], i) => (
        <motion.div
          key={`l${i}`}
          className="absolute origin-left"
          style={{
            left: x1, top: y1,
            width: Math.hypot(x2-x1, y2-y1),
            height: 1.5,
            background: `${color}50`,
            transform: `rotate(${Math.atan2(y2-y1, x2-x1) * 180 / Math.PI}deg)`,
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
        />
      ))}
    </div>
  );

  // analytics — live dashboard sparkline
  const sparkPoints = [20, 45, 30, 60, 40, 80, 55, 95, 70, 100];
  const w = 140, h = 60;
  const pts = sparkPoints.map((v, i) =>
    `${(i / (sparkPoints.length - 1)) * w},${h - (v / 100) * h}`
  ).join(" ");

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={w} height={h} className="overflow-visible">
        <motion.polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        />
        <motion.circle
          cx={(9 / 9) * w} cy={h - (100 / 100) * h}
          r={5} fill={color}
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, delay: 1.3 }}
        />
      </svg>
      <span className="font-syne font-black text-3xl" style={{ color }}>100%</span>
    </div>
  );
}

function FunkyServiceSection({
  s,
  i,
}: {
  s: (typeof MARKETING_SERVICES)[0];
  i: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cfg = CARD_CONFIGS[i % CARD_CONFIGS.length];

  const isEven = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={cfg.initVariant}
      animate={inView ? cfg.animVariant : cfg.initVariant}
      transition={cfg.transition}
      className="relative rounded-[2rem] overflow-hidden border border-black/8 bg-white/70 backdrop-blur-md shadow-sm"
      style={{ perspective: 1000 }}
    >
      {/* BIG colored background number */}
      <span
        className="absolute top-0 right-4 font-syne font-black leading-none select-none pointer-events-none opacity-[0.055] text-[10rem]"
        style={{ color: s.color }}
      >
        {s.id}
      </span>

      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-0`}>
        {/* Left / Right accent panel */}
        <div
          className="relative flex flex-col items-center justify-center p-10 md:p-14 min-h-[220px] md:w-[42%] overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${s.color}14, ${s.color}06)` }}
        >
          {/* Animated data-art visual — unique per service */}
          <AccentVisual type={cfg.visual} color={s.color} inView={inView} />

          {/* Metric badge - funky sticker style */}
          <div
            className="inline-block px-4 py-2 rounded-full font-mono text-xs font-black uppercase tracking-widest shadow-md"
            style={{ background: s.color, color: "#fff" }}
          >
            {s.metrics}
          </div>

          {/* Decorative shape */}
          {cfg.accentShape === "circle" && (
            <div
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-20"
              style={{ background: s.color }}
            />
          )}
          {cfg.accentShape === "star" && (
            <div className="absolute top-4 right-4 text-3xl opacity-20" style={{ color: s.color }}>✦</div>
          )}
          {cfg.accentShape === "badge" && (
            <div
              className="absolute top-4 left-4 w-10 h-10 rotate-12 rounded-lg opacity-20"
              style={{ background: s.color }}
            />
          )}
          {cfg.accentShape === "pill" && (
            <div
              className="absolute bottom-4 right-4 w-16 h-5 rounded-full opacity-15"
              style={{ background: s.color }}
            />
          )}
        </div>

        {/* Content panel */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div>
            {/* Icon + title */}
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                <s.icon size={18} />
              </div>
              <div>
                <h3
                  className="font-syne text-xl sm:text-2xl md:text-3xl font-extrabold leading-[1.1] break-words hyphens-auto"
                  style={{ color: "#090A0F" }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest md:tracking-[0.2em] mt-1 break-words"
                  style={{ color: s.color }}
                >
                  {s.tagline}
                </p>
              </div>
            </div>

            <p className="text-[#4a4453] text-sm leading-relaxed mb-6 max-w-md">{s.description}</p>

            {/* Feature tags - funky pill style */}
            <div className="flex flex-wrap gap-2 mb-7">
              {s.features.map((f, fi) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 14,
                    delay: 0.3 + fi * 0.07,
                  }}
                  className="px-3 py-1.5 rounded-full text-[11px] font-mono font-bold border"
                  style={{
                    color: s.color,
                    borderColor: `${s.color}40`,
                    background: `${s.color}0d`,
                  }}
                >
                  {f}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA arrow button */}
          <Link href="/contact">
            <motion.div
              whileHover={{ scale: 1.04, x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-white"
              style={{ background: s.color }}
            >
              Start this service <ArrowUpRight size={14} />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function DigitalMarketingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* HERO word-by-word reveal */
      const words = gsap.utils.toArray<HTMLElement>(".dm-hero-word");
      gsap.fromTo(
        words,
        { y: "110%", opacity: 0, rotateZ: 4 },
        {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          duration: 1,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      /* Floating badges */
      gsap.fromTo(
        ".dm-badge",
        { scale: 0, opacity: 0, rotate: -15 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.7)",
          delay: 0.9,
        }
      );

      /* Headline label */
      gsap.fromTo(
        ".dm-label",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15 }
      );

      /* Process steps scroll-driven */
      gsap.fromTo(
        ".process-step",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.18,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 75%",
          },
        }
      );

      /* Marquee marquee-track */
      gsap.to(".dm-marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Shared light mesh background ── */}
      <div className="mesh-bg" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      <div ref={heroRef} className="relative z-10 min-h-screen">
        {/* ════════════════════════════════════════
            HERO — giant typographic splash
        ════════════════════════════════════════ */}
        <section className="relative pt-36 pb-10 px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto overflow-hidden">

          {/* top label strip */}
          <div className="dm-label flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="font-mono text-xs text-black/50 uppercase tracking-widest">Digital Marketing Agency</span>
            </div>
            <span className="font-mono text-xs text-black/30 hidden md:block">EST. 2023 · INXFINIA</span>
          </div>

          {/* ── Huge headline ── */}
          <div className="relative overflow-hidden pb-2">
            <h1 className="font-syne leading-[0.88] tracking-tighter select-none">
              {/* Line 1 */}
              <div className="overflow-hidden flex flex-wrap gap-x-4 md:gap-x-6 mb-1">
                {["We", "GROW"].map((w, i) => (
                  <span key={i} className={`dm-hero-word inline-block text-[clamp(2.4rem,11vw,9rem)] font-black ${w === "GROW" ? "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-400" : "text-[#090A0F]"}`}>
                    {w}
                  </span>
                ))}
                <span className="dm-hero-word inline-block text-[clamp(2.4rem,11vw,9rem)] font-black text-[#090A0F]">brands,</span>
                {/* floating badge 1 */}
                <span className="dm-badge inline-flex self-center items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-full bg-amber-400 text-black font-black text-sm md:text-xl shadow-lg shrink-0">😎</span>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden flex flex-wrap gap-x-4 md:gap-x-6 mb-1 items-center">
                <span className="dm-hero-word inline-block text-[clamp(2.4rem,11vw,9rem)] font-black text-[#090A0F]">CREATE</span>
                <span className="dm-hero-word inline-block text-[clamp(2.4rem,11vw,9rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">results</span>
                {/* badge ampersand */}
                <span className="dm-badge inline-flex self-center items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-dashed border-emerald-500 text-emerald-500 font-black text-lg md:text-2xl shrink-0">
                  &amp;
                </span>
              </div>

              {/* Line 3 */}
              <div className="overflow-hidden flex flex-wrap gap-x-4 md:gap-x-6">
                <span className="dm-hero-word inline-block text-[clamp(2.4rem,11vw,9rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">SCALE</span>
                <span className="dm-hero-word inline-block text-[clamp(2.4rem,11vw,9rem)] font-black text-[#090A0F]">your</span>
                <span className="dm-hero-word inline-block text-[clamp(2.4rem,11vw,9rem)] font-black text-[#090A0F]">business.</span>
              </div>
            </h1>
          </div>

          {/* ── Sub row ── */}
          <div className="mt-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <p className="max-w-md text-[#4a4453] text-base leading-relaxed dm-label">
              InXfinia's digital marketing arm fuses data science with creative excellence — turning clicks into customers and campaigns into compounding growth engines.
            </p>

            <div className="flex flex-wrap gap-3 dm-badge">
              {/* CTA badge sticker */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-7 md:py-3.5 rounded-full bg-[#090A0F] text-white font-mono text-xs md:text-sm font-bold uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_30px_rgba(91,33,182,0.35)] transition-all duration-300"
              >
                Let's Talk <ArrowUpRight size={14} />
              </Link>

              <div className="inline-flex flex-col items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full border-[3px] md:border-4 border-amber-400 bg-amber-50 dm-badge shadow-md rotate-12 shrink-0">
                <span className="font-black text-sm md:text-xl text-amber-600 leading-none">100%</span>
                <span className="font-mono text-[6px] md:text-[8px] text-amber-700 uppercase tracking-tight text-center leading-tight">ROI Focused</span>
              </div>
            </div>
          </div>

          {/* ── Stats strip ── */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 dm-label">
            {[
              { v: "480%", l: "Average ROAS" },
              { v: "62%", l: "Email Open Rate" },
              { v: "3.2×", l: "Organic Traffic Growth" },
              { v: "50+", l: "Brands Scaled" },
            ].map((s) => (
              <div key={s.l} className="px-5 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/8">
                <div className="font-syne text-3xl font-black text-[#090A0F]">{s.v}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#6b5f7a] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            MARQUEE
        ════════════════════════════════════════ */}
        <div ref={marqueeRef} className="relative overflow-hidden py-6 my-4 border-y border-black/8 bg-white/40 backdrop-blur-sm">
          <div className="dm-marquee-track flex whitespace-nowrap will-change-transform">
            {[...Array(2)].map((_, ri) => (
              <span key={ri} className="flex items-center gap-0">
                {[
                  "SEO Domination", "Paid Performance", "Social Growth", "Email Automation",
                  "Brand Strategy", "CRO & Analytics", "Influencer Reach", "Content Engine",
                  "Lead Generation", "Data-driven Growth",
                ].map((label, i) => (
                  <span key={`${ri}-${i}`} className="inline-flex items-center gap-4 px-6">
                    <span className="font-syne font-black text-lg md:text-2xl text-[#090A0F] uppercase tracking-tight whitespace-nowrap">{label}</span>
                    <span className="text-violet-400 font-black text-xl">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            SPRING ARROW + FUNKY SERVICE SECTIONS
        ════════════════════════════════════════ */}
        <SpringArrow />

        <section className="px-6 md:px-12 lg:px-20 pb-10 max-w-[88rem] mx-auto">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <h2 className="font-syne text-[clamp(2rem,6vw,4.5rem)] font-extrabold text-[#090A0F] leading-tight tracking-tight">
              Marketing that<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-500">actually converts.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {MARKETING_SERVICES.map((s, i) => (
              <FunkyServiceSection key={s.id} s={s} i={i} />
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            BELIEF STATEMENT — editorial full-bleed
        ════════════════════════════════════════ */}
        <section className="px-6 md:px-12 lg:px-20 py-24 max-w-[88rem] mx-auto">
          <div className="rounded-[2.5rem] overflow-hidden relative border border-black/8 bg-white/50 backdrop-blur-md p-10 md:p-16">
            {/* decorative background glyph */}
            <div className="absolute right-8 top-8 font-syne text-[14rem] font-black text-black/[0.02] leading-none select-none pointer-events-none">
              "
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/40 mb-6 block">Our Belief</span>
              <p className="font-syne text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[1.1] text-[#090A0F] tracking-tight">
                We believe marketing should be{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500">simple,</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">smart,</span>{" "}
                and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">brutally effective.</span>
              </p>
              <p className="mt-6 text-[#4a4453] text-lg leading-relaxed max-w-2xl">
                No vanity metrics. No fluff reports. Every strategy we craft is engineered to drive one outcome: measurable, compounding revenue growth for your business.
              </p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#090A0F] text-white font-mono text-sm font-bold uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_30px_rgba(91,33,182,0.3)] transition-all duration-300">
                Work with us <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PROCESS
        ════════════════════════════════════════ */}
        <section ref={processRef} className="px-6 md:px-12 lg:px-20 py-20 max-w-[88rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-500 mb-3 block">How it works</span>
            <h2 className="font-syne text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#090A0F] tracking-tight">Our process.</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className="process-step relative">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-black/15 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white border border-black/10 flex items-center justify-center mb-5 shadow-sm">
                    <span className="font-mono text-sm font-black text-[#090A0F]">{step.num}</span>
                  </div>
                  <h3 className="font-syne text-xl font-extrabold text-[#090A0F] mb-2">{step.title}</h3>
                  <p className="text-[#6b5f7a] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════ */}
        <section className="px-6 md:px-12 lg:px-20 pb-32 max-w-[88rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-[2.5rem] overflow-hidden relative border border-violet-200/60 p-14 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(91,33,182,0.07) 0%, rgba(30,95,255,0.06) 50%, rgba(34,211,168,0.07) 100%)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle at 15% 60%, rgba(91,33,182,0.12) 0%, transparent 50%), radial-gradient(circle at 85% 40%, rgba(34,211,168,0.12) 0%, transparent 50%)"
            }} />
            <div className="relative z-10">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet-500 mb-4 block">Ready to scale?</span>
              <h2 className="font-syne text-[clamp(2rem,6vw,5rem)] font-extrabold text-[#090A0F] mb-4 tracking-tight leading-[1.1]">
                Let's grow your<br />brand together.
              </h2>
              <p className="text-[#4a4453] max-w-lg mx-auto mb-10 leading-relaxed">
                Book a free strategy call and we'll show you exactly how we'd scale your brand in 90 days.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-center gap-3 px-6 py-3.5 md:px-10 md:py-4 rounded-[2rem] font-bold text-white font-mono text-xs md:text-sm tracking-wider md:tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #5B21B6, #1e5fff)",
                  boxShadow: "0 0 40px rgba(91,33,182,0.25)",
                }}
              >
                <span>Book Free<br className="sm:hidden" /> Strategy Call</span> <ArrowUpRight className="w-5 h-5 md:w-4 md:h-4 shrink-0" />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
