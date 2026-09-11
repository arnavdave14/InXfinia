"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight, Terminal, Cpu, Code2, Zap, Globe, Shield, GitBranch, Package } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────── */
const FEATURES = [
  { icon: Zap, label: "Sub-12ms latency", desc: "Edge-optimised inference with global CDN routing." },
  { icon: Shield, label: "Zero-trust security", desc: "SOC 2 compliant. End-to-end encryption by default." },
  { icon: Globe, label: "45 edge locations", desc: "Deploy to the region closest to your users automatically." },
  { icon: GitBranch, label: "Git-native deploys", desc: "Push to main, your model goes live. It's that simple." },
];

const TESTIMONIALS = [
  { quote: "InXfinia's SDK cut our ML deployment time from weeks to hours. The DX is genuinely exceptional.", author: "James Carter", role: "CTO, NeuralScale" },
  { quote: "The Python SDK is the most ergonomic AI client I've used. It just works, every time.", author: "Priya Mehta", role: "Lead ML Engineer, Synthex" },
  { quote: "45 edge nodes, 12ms latency, zero config. InXfinia is our unfair advantage.", author: "Marcus Lee", role: "Founder, Velocity AI" },
];

/* ─── VS Code Interactive Playground ────────────────────── */
const CODE_LINES = [
  { text: "import inxfinia", type: "keyword" },
  { text: "", type: "blank" },
  { text: "# Initialize the client", type: "comment" },
  { text: 'client = inxfinia.Client(api_key="ix_live_***")', type: "normal" },
  { text: "", type: "blank" },
  { text: "# Who are we building for?", type: "comment" },
  { text: 'name = "__INPUT__"   # ← type your name below', type: "input-line" },
  { text: "", type: "blank" },
  { text: "# Run intelligence on demand", type: "comment" },
  { text: "response = client.inference.create(", type: "normal" },
  { text: '    model="gemini-2-flash",', type: "normal" },
  { text: '    messages=[{"role": "user", "content":', type: "normal" },
  { text: '        f"Hello {name}, what can I build for you?"}]', type: "normal" },
  { text: ")", type: "normal" },
  { text: "", type: "blank" },
  { text: "print(response.text)", type: "normal" },
];

function VSCodePlayground() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);
  const [userName, setUserName] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Type lines one-by-one when in view
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= CODE_LINES.length) {
        clearInterval(interval);
        setTimeout(() => setOutputVisible(true), 400);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [inView]);

  const handleRun = () => {
    if (!userName.trim()) return;
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1800);
  };

  const displayName = userName.trim() || "Developer";

  const syntaxColor = (line: (typeof CODE_LINES)[0]) => {
    if (line.type === "comment") return "text-zinc-500 italic";
    if (line.type === "blank") return "";
    if (line.type === "input-line") return "text-amber-300";
    if (line.text.startsWith("import")) return "text-purple-400";
    if (line.text.startsWith("print")) return "text-blue-400";
    if (line.text.includes("=") && !line.text.startsWith(" ") && !line.text.startsWith("#")) return "text-cyan-300";
    return "text-zinc-200";
  };

  // Replace __INPUT__ placeholder with current name
  const renderText = (line: (typeof CODE_LINES)[0]) => {
    if (line.type === "input-line") {
      const filled = line.text.replace("__INPUT__", userName || "your_name");
      return filled;
    }
    return line.text;
  };

  return (
    <div ref={ref} className="w-full rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)] border border-black/10">
      {/* ── Window chrome ── */}
      <div className="flex items-center gap-0 bg-[#1e1e2e] border-b border-white/8">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 px-4 py-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        {/* Tabs */}
        <div className="flex">
          <div className="px-4 py-2.5 bg-[#1e1e2e] border-b-2 border-violet-500 text-zinc-200 text-xs font-mono flex items-center gap-2">
            <span className="text-yellow-400 text-[10px]">🐍</span> inference.py
          </div>
          <div className="px-4 py-2.5 bg-[#181825] text-zinc-600 text-xs font-mono">requirements.txt</div>
        </div>
        {/* Right actions */}
        <div className="ml-auto flex items-center gap-3 px-4">
          <motion.button
            onClick={handleRun}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500 text-black text-[11px] font-mono font-bold"
          >
            {isRunning ? (
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⟳</motion.span>
            ) : "▶"} Run
          </motion.button>
        </div>
      </div>

      {/* ── Main editor body ── */}
      <div className="flex bg-[#1e1e2e]" style={{ minHeight: 420 }}>
        {/* Sidebar file tree */}
        <div className="hidden md:flex flex-col w-48 bg-[#181825] border-r border-white/5 py-4 px-2 shrink-0">
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-2 mb-3">Explorer</div>
          <div className="text-[11px] font-mono">
            <div className="px-2 py-1 text-zinc-500">📁 inxfinia-project</div>
            <div className="px-4 py-1 text-zinc-400 bg-[#1e1e2e] rounded flex items-center gap-1.5">
              <span className="text-yellow-400">🐍</span> inference.py
            </div>
            <div className="px-4 py-1 text-zinc-600">📄 requirements.txt</div>
            <div className="px-4 py-1 text-zinc-600">⚙️ .env</div>
          </div>
        </div>

        {/* Code editor */}
        <div className="flex-1 overflow-auto p-5 font-mono text-xs leading-7">
          {CODE_LINES.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={idx < visibleLines ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.12 }}
              className="flex items-start group"
            >
              {/* Line number */}
              <span className="w-10 shrink-0 text-right text-zinc-600 text-[11px] leading-7 pr-4 select-none">
                {idx + 1}
              </span>

              {/* Line content */}
              {line.type === "input-line" ? (
                // This line has the interactive name input embedded
                <span className={`${syntaxColor(line)} flex-1 flex flex-wrap items-center gap-1`}>
                  <span className="text-cyan-300">name</span>
                  <span className="text-zinc-400">{" = "}</span>
                  <span className="text-amber-300">&quot;</span>
                  {/* ← REAL INPUT FIELD */}
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRun()}
                    placeholder="your_name"
                    maxLength={24}
                    className="bg-transparent border-none outline-none text-emerald-300 placeholder-zinc-600 font-mono text-xs w-32 caret-emerald-400"
                    style={{ caretColor: "#34d399" }}
                  />
                  <span className="text-amber-300">&quot;</span>
                  <span className="text-zinc-600 text-[10px] ml-2"># ← type your name here</span>
                </span>
              ) : (
                <span className={`${syntaxColor(line)} flex-1`}>
                  {renderText(line) || "\u00a0"}
                  {/* blinking cursor on the last typed line */}
                  {idx === visibleLines - 1 && visibleLines < CODE_LINES.length && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                      className="inline-block w-[2px] h-4 bg-violet-400 ml-0.5 align-middle"
                    />
                  )}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Terminal output panel ── */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={outputVisible ? { height: "auto", opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="bg-[#181825] border-t border-white/8">
          {/* Terminal tab strip */}
          <div className="flex items-center gap-4 px-4 py-2 border-b border-white/5">
            <span className="text-[11px] font-mono text-zinc-300 border-b border-emerald-500 pb-1.5">Terminal</span>
            <span className="text-[11px] font-mono text-zinc-600">Output</span>
            <span className="text-[11px] font-mono text-zinc-600">Problems</span>
            <button
              onClick={handleRun}
              className="ml-auto text-[11px] font-mono text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Terminal body */}
          <div className="p-4 font-mono text-xs leading-6 min-h-[120px]">
            <div className="text-zinc-500">$ python inference.py</div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="text-zinc-600">Loading model gemini-2-flash...</div>
              <div className="text-zinc-600">Connecting to edge node: Mumbai → 11ms</div>
            </motion.div>

            {/* The name-aware output */}
            <AnimatePresence mode="wait">
              {isRunning ? (
                <motion.div
                  key="running"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 mt-1"
                >
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                  <span className="text-zinc-500">Generating response...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2"
                >
                  <span className="text-emerald-400">✓ </span>
                  <span className="text-zinc-300">Hello, </span>
                  <span className="text-violet-400 font-bold">{displayName}</span>
                  <span className="text-zinc-300">! InXfinia is ready to build for you.</span>
                  <div className="mt-1">
                    <span className="text-blue-400">&gt;&gt;&gt; </span>
                    <span className="text-zinc-400">"{displayName} can deploy AI agents, ML pipelines, and production APIs — all in one platform."</span>
                  </div>
                  <div className="mt-1 text-zinc-600">Model: gemini-2-flash | Tokens: 42 | Latency: 11ms | Edge: Mumbai</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function DevelopersPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero words */
      gsap.fromTo(
        ".dev-word",
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 1.1, ease: "power4.out", delay: 0.1 }
      );

      /* Hero description */
      gsap.fromTo(
        ".dev-sub",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.7 }
      );

      /* Code tag spring */
      gsap.fromTo(
        ".code-tag",
        { scale: 0, rotate: -10 },
        { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(1.8)", delay: 0.9 }
      );

      /* Scroll-triggered PASSIONATE section */
      gsap.fromTo(
        ".passion-word",
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.07, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".passion-section", start: "top 75%" },
        }
      );

      /* Horizontal marquee */
      gsap.to(".dev-marquee-inner", {
        xPercent: -50, ease: "none", duration: 22, repeat: -1,
      });

      /* Scroll counter animation */
      ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 80%",
        onEnter: () => {
          document.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
            const target = parseInt(el.dataset.target || "0", 10);
            gsap.fromTo(el, { textContent: 0 }, {
              textContent: target,
              duration: 1.5,
              ease: "power2.out",
              snap: { textContent: 1 },
              onUpdate() { el.textContent = Math.floor(parseFloat(el.textContent || "0")).toString(); },
            });
          });
        }
      });

      /* Feature grid stagger */
      gsap.fromTo(
        ".feature-card",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".features-section", start: "top 75%" },
        }
      );

      /* Testimonials */
      gsap.fromTo(
        ".testi-card",
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".testi-section", start: "top 80%" },
        }
      );

      /* CTA reveal */
      gsap.fromTo(
        ".cta-word",
        { y: "105%", opacity: 0 },
        {
          y: "0%", opacity: 1, stagger: 0.06, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Light mesh background */}
      <div className="mesh-bg" aria-hidden>
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="orb orb-4" /><div className="orb orb-5" />
      </div>

      <div ref={pageRef} className="relative z-10 min-h-screen overflow-hidden">

        {/* ═══════════════════════════════════
            HERO — funky brutalist editorial
        ═══════════════════════════════════ */}
        <section className="relative pt-32 pb-6 overflow-visible">

          {/* Decorative curved SVG swoosh behind text */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <svg
              className="absolute top-16 left-0 w-full"
              viewBox="0 0 1440 480"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M-100 300 C200 80, 600 520, 900 200 S1300 50, 1540 280"
                stroke="url(#sw-grad)"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                opacity="0.25"
              />
              <path
                d="M-80 380 C300 150, 700 450, 1100 180 S1400 320, 1540 200"
                stroke="url(#sw-grad2)"
                strokeWidth="1.5"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="sw-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5B21B6" />
                  <stop offset="100%" stopColor="#22d3a8" />
                </linearGradient>
                <linearGradient id="sw-grad2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1e5fff" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* ── Giant type grid ── */}
          <div className="relative z-10 px-5 md:px-10 lg:px-16">

            {/* Row 1: BUILT — huge, filled */}
            <div className="overflow-hidden">
              <span
                className="dev-word block font-syne font-black leading-[0.85] tracking-[-0.04em] text-[#090A0F]"
                style={{ fontSize: "clamp(2.8rem, 13vw, 13rem)" }}
              >
                BUILT
              </span>
            </div>

            {/* Row 2: FOR + </> inline — mixed fill + stroke */}
            <div className="flex flex-wrap items-end gap-4 md:gap-8 overflow-visible">
              <div className="overflow-hidden">
                <span
                  className="dev-word block font-syne font-black leading-[0.85] tracking-[-0.04em] text-[#090A0F]"
                  style={{ fontSize: "clamp(2.8rem, 13vw, 13rem)" }}
                >
                  FOR
                </span>
              </div>

              {/* </> — big stroke-only outlined code tag */}
              <div className="overflow-hidden mb-2 md:mb-4">
                <span
                  className="code-tag block font-syne font-black leading-none tracking-tight"
                  style={{
                    fontSize: "clamp(2.5rem, 9vw, 9rem)",
                    WebkitTextStroke: "3px #5B21B6",
                    color: "transparent",
                  }}
                >
                  &lt;/&gt;
                </span>
              </div>

              {/* Floating rotated badge */}
              <motion.div
                className="code-tag mb-4 hidden md:flex items-center justify-center w-24 h-24 rounded-full border-4 border-dashed border-violet-400 bg-violet-50 rotate-12 shrink-0"
                animate={{ rotate: [12, 20, 12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="font-mono text-xs font-black text-violet-600 text-center leading-tight uppercase tracking-tighter">API<br />Ready</span>
              </motion.div>
            </div>

            {/* Row 3: DEVEL — outlined stroke (first half) */}
            <div className="overflow-hidden mt-0 md:-mt-4">
              <span
                className="dev-word block font-syne font-black leading-[0.85] tracking-[-0.04em]"
                style={{
                  fontSize: "clamp(2.8rem, 13vw, 13rem)",
                  WebkitTextStroke: "3px #090A0F",
                  color: "transparent",
                }}
              >
                DEVEL
              </span>
            </div>

            {/* Row 4: OPERS — gradient fill, intentionally overflows edge for drama */}
            <div className="overflow-visible mt-0 md:-mt-4">
              <span
                className="dev-word block font-syne font-black leading-[0.85] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-400 whitespace-nowrap"
                style={{ fontSize: "clamp(2.8rem, 13vw, 13rem)" }}
              >
                OPERS.
              </span>
            </div>

            {/* Descriptor + CTAs — positioned bottom right */}
            <div className="dev-sub flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mt-6 px-1">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/45 leading-relaxed max-w-xs">
                Integrate AI into your stack in minutes. Typesafe SDKs, gorgeous CLI, zero-config deploys.
              </p>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="#sdk"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#090A0F] text-white font-mono text-xs font-bold uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_20px_rgba(91,33,182,0.3)] transition-all duration-300"
                >
                  Explore SDKs <ArrowUpRight size={12} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/15 bg-white/60 backdrop-blur-sm text-[#090A0F] font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  Get API Key
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            MARQUEE STRIP
        ═══════════════════════════════════ */}
        <div className="relative overflow-hidden py-5 my-6 border-y border-black/8 bg-white/40 backdrop-blur-sm">
          <div className="dev-marquee-inner flex whitespace-nowrap will-change-transform">
            {[...Array(2)].map((_, ri) => (
              <span key={ri} className="flex items-center">
                {[
                  "Python SDK", "Node.js SDK", "REST API", "GraphQL", "CLI Tool",
                  "Webhooks", "TypeScript", "Edge Deploy", "45 Locations", "12ms P99",
                ].map((t, i) => (
                  <span key={`${ri}-${i}`} className="inline-flex items-center gap-5 px-6">
                    <span className="font-syne font-black text-xl md:text-2xl text-[#090A0F] uppercase tracking-tight">{t}</span>
                    <span className="text-violet-400 font-black text-lg">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════
            "PASSIONATE ABOUT DEVELOPMENT" editorial
        ═══════════════════════════════════ */}
        <section className="passion-section px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto py-16">
          <div className="relative">
            {/* Big background text */}
            <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
              {["PASSIONATE", "ABOUT", "DEVELOPER", "EXPERIENCE."].map((w, i) => (
                <span
                  key={i}
                  className={`passion-word inline-block font-syne font-black tracking-tighter leading-none text-[clamp(1.75rem,8vw,6.5rem)] ${
                    i === 2
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500"
                      : i === 3
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500"
                      : "text-[#090A0F]"
                  }`}
                >
                  {w}
                </span>
              ))}
            </div>

            {/* Editorial two-column below */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-black/8 p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-violet-500 mb-3 block">Philosophy</span>
                <p className="text-[#4a4453] leading-relaxed">
                  We obsess over developer experience. Every SDK, every endpoint, every error message is designed to get you from concept to production without friction — because your time is the most valuable resource we can protect.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden bg-[#090A0F] border border-white/10 p-8 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="text-zinc-500 text-xs ml-2">inxfinia-cli</span>
                </div>
                <pre className="text-xs leading-6 overflow-x-auto">
                  <span className="text-zinc-500"># Install the CLI</span>{"\n"}
                  <span className="text-emerald-400">$</span> <span className="text-white">npm install -g @inxfinia/cli</span>{"\n\n"}
                  <span className="text-zinc-500"># Authenticate</span>{"\n"}
                  <span className="text-emerald-400">$</span> <span className="text-white">inx auth login</span>{"\n"}
                  <span className="text-emerald-400">✓</span> <span className="text-zinc-400">Logged in as dev@acme.com</span>{"\n\n"}
                  <span className="text-zinc-500"># Deploy a model</span>{"\n"}
                  <span className="text-emerald-400">$</span> <span className="text-white">inx deploy --model llama-3-70b</span>{"\n"}
                  <span className="text-blue-400">→</span> <span className="text-zinc-400">Live in 214ms. 45 edge nodes.</span>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            STATS SECTION
        ═══════════════════════════════════ */}
        <section className="stats-section px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { target: 45, suffix: "+", label: "Edge Locations" },
              { target: 12, suffix: "ms", label: "P99 Latency" },
              { target: 99, suffix: ".99%", label: "Uptime SLA" },
              { target: 5, suffix: "min", label: "Time to First API Call" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/60 backdrop-blur-sm border border-black/8 px-4 sm:px-6 py-5">
                <div className="font-syne font-black text-[clamp(1.5rem,5vw,2.25rem)] text-[#090A0F] break-words leading-none mb-1">
                  <span className="stat-num" data-target={s.target}>0</span>
                  <span>{s.suffix}</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#6b5f7a] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            VS CODE INTERACTIVE PLAYGROUND
        ════════════════════════════════════════ */}
        <section id="sdk" className="relative px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto py-16">
          {/* Ghost background word */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-syne font-black text-[22vw] text-black/[0.02] uppercase tracking-tighter leading-none">CODE</span>
          </div>
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet-500 mb-3 block">Live Playground</span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <h2 className="font-syne text-[clamp(2.5rem,5vw,5rem)] font-extrabold text-[#090A0F] leading-tight tracking-tight">
                Type your name.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">Watch it run.</span>
              </h2>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 max-w-sm flex items-start gap-4 shadow-lg shadow-emerald-500/5 backdrop-blur-md transition-transform hover:scale-[1.02]">
                <Terminal className="text-emerald-600 shrink-0 mt-1" size={20} />
                <p className="font-medium text-sm text-[#090A0F]/90 leading-relaxed">
                  <strong className="text-emerald-700 font-bold block mb-1 uppercase tracking-wider text-xs">Interactive Demo</strong>
                  Scroll to watch the code write itself. Type your name in line 7, hit <span className="inline-block bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded mx-0.5">▶ Run</span> and see the AI respond to you personally.
                </p>
              </div>
            </div>
            <VSCodePlayground />
          </div>
        </section>


        {/* ═══════════════════════════════════
            FEATURES GRID
        ═══════════════════════════════════ */}
        <section className="features-section px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto py-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-500 mb-3 block">Infrastructure</span>
          <h2 className="font-syne text-[clamp(1.8rem,8vw,4.5rem)] font-extrabold text-[#090A0F] leading-[1.1] tracking-tight mb-10 hyphens-auto">
            Production-grade.<br />Out of the box.
          </h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.label} className="feature-card rounded-2xl border border-black/8 bg-white/60 backdrop-blur-sm p-7">
                <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5">
                  <f.icon size={18} className="text-violet-600" />
                </div>
                <h3 className="font-syne font-extrabold text-[#090A0F] mb-2">{f.label}</h3>
                <p className="text-sm text-[#6b5f7a] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            TESTIMONIALS — "WHAT PEOPLE SAYS"
        ═══════════════════════════════════ */}
        <section className="testi-section px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto py-16">
          {/* Giant section title */}
          <div className="mb-12 overflow-hidden">
            <h2 className="font-syne font-black text-[clamp(1.5rem,7vw,5.5rem)] text-[#090A0F] tracking-tighter leading-[1.1] uppercase">
              What developers<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500">say about us.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi-card rounded-2xl border border-black/8 bg-white/60 backdrop-blur-sm p-7">
                <p className="text-[#4a4453] leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="h-px bg-black/8 mb-5" />
                <div className="font-syne font-bold text-[#090A0F] text-sm">{t.author}</div>
                <div className="font-mono text-xs text-[#6b5f7a] mt-0.5">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            CTA — "HAVE AN IDEA? BUILD IT."
        ═══════════════════════════════════ */}
        <section className="cta-section px-6 md:px-12 lg:px-20 max-w-[88rem] mx-auto py-10 pb-36">
          <div className="border-t border-black/10 pt-14">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/35 block mb-5">Start Building</span>
            <div className="flex flex-wrap items-end gap-5">
              <div>
                {["HAVE AN", "IDEA?", "BUILD IT."].map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <span className={`cta-word inline-block font-syne font-black leading-none tracking-tight text-[clamp(2.2rem,10vw,8rem)] ${
                      i === 1
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500"
                        : i === 2
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500"
                        : "text-[#090A0F]"
                    }`}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="mb-4 w-20 h-20 rounded-full bg-[#090A0F] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_40px_rgba(91,33,182,0.35)] transition-all duration-300 shrink-0"
              >
                <ArrowUpRight size={24} className="text-white" />
              </Link>
            </div>
            <p className="mt-4 font-mono text-sm text-black/35 max-w-md">
              Free tier. No credit card. First 1M tokens on us.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
