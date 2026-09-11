"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Layers, Activity, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Animated terminal lines
const TERMINAL_LINES = [
  { text: "$ inxfinia init --project ai-platform", color: "#22d3a8", delay: 0 },
  { text: "✓ Connecting to InXfinia AI Engine...", color: "#ffffff", delay: 0.6 },
  { text: "✓ Provisioning GPU cluster (A100 × 8)", color: "#ffffff", delay: 1.1 },
  { text: "✓ Deploying model: llama-3.2-70b-instruct", color: "#ffffff", delay: 1.6 },
  { text: "✓ Configuring vector store (pgvector)", color: "#ffffff", delay: 2.0 },
  { text: "✓ Setting up inference pipeline...", color: "#ffffff", delay: 2.4 },
  { text: "→ Endpoint live: api.inxfinia.ai/v3/chat", color: "#1e5fff", delay: 3.0 },
  { text: "→ Latency: 1.2ms | Throughput: 12k req/s", color: "#a855f7", delay: 3.5 },
  { text: "✓ Platform ready. Go build something great.", color: "#22d3a8", delay: 4.0 },
];

const METRICS = [
  { label: "Models Deployed", value: 24800, suffix: "+" },
  { label: "AI Requests Daily", value: 500, suffix: "M+" },
  { label: "Avg Inference Latency", value: 1.2, suffix: "ms", isDecimal: true },
  { label: "Uptime SLA", value: 99.99, suffix: "%", isDecimal: true },
];

function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timers: NodeJS.Timeout[] = [];
    TERMINAL_LINES.forEach((line, idx) => {
      const t = setTimeout(() => {
        setVisibleLines(idx + 1);
      }, line.delay * 1000);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={ref} className="glass border border-white/10 rounded-2xl overflow-hidden h-full">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <Terminal size={12} className="ml-2 text-zinc-500" />
        <span className="text-xs font-mono text-zinc-500">inxfinia — ai-platform</span>
      </div>

      <div className="p-5 min-h-[260px] font-mono text-sm">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2 mb-1.5"
          >
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-[#22d3a8] animate-blink" />
        )}
      </div>
    </div>
  );
}

function AnimatedMetric({ metric, delay }: { metric: typeof METRICS[0]; delay: number }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const counterRef = useRef({ value: 0 });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      gsap.to(counterRef.current, {
        value: metric.value,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayed(
            metric.isDecimal
              ? parseFloat(counterRef.current.value.toFixed(2))
              : Math.floor(counterRef.current.value)
          );
        },
      });
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, metric, delay]);


  return (
    <div ref={ref} className="text-center">
      <div
        className="text-3xl md:text-4xl font-bold text-gradient-blue-teal mb-1"
        style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
      >
        {displayed}{metric.suffix}
      </div>
      <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{metric.label}</div>
    </div>
  );
}

// Neural visualization
function NeuralViz({ activeStep }: { activeStep: number }) {
  const NODES_VIZ = [
    [50, 80], [50, 160], [50, 240],         // input layer
    [130, 60], [130, 120], [130, 180], [130, 240],  // hidden 1
    [210, 80], [210, 160], [210, 240],       // hidden 2
    [290, 160],                              // output
  ];

  const CONNECTIONS = [
    [0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],
    [3,7],[4,7],[4,8],[5,8],[5,9],[6,9],
    [7,10],[8,10],[9,10],
  ];

  const activeNodes = [
    [0, 1, 2],
    [3, 4, 5, 6],
    [7, 8, 9],
    [10],
  ][Math.min(activeStep, 3)];

  return (
    <svg viewBox="0 0 340 300" className="w-full h-full">
      {CONNECTIONS.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES_VIZ[a][0]} y1={NODES_VIZ[a][1]}
          x2={NODES_VIZ[b][0]} y2={NODES_VIZ[b][1]}
          stroke="rgba(30,95,255,0.15)"
          strokeWidth="1"
        />
      ))}
      {NODES_VIZ.map(([cx, cy], i) => {
        const isActive = activeNodes.includes(i);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={isActive ? 10 : 6} fill={isActive ? "#1e5fff" : "#0a1428"}
              stroke={isActive ? "#22d3a8" : "rgba(255,255,255,0.1)"}
              strokeWidth={isActive ? "2" : "1"}
              style={{ transition: "all 0.5s ease" }}
            />
            {isActive && (
              <circle cx={cx} cy={cy} r="16" fill="none" stroke="rgba(34,211,168,0.3)" strokeWidth="1"
                style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
              />
            )}
          </g>
        );
      })}
      <text x="20" y="290" className="font-mono" style={{ fontSize: "8px", fill: "#555", fontFamily: "monospace" }}>
        INPUT → HIDDEN × 2 → OUTPUT
      </text>
    </svg>
  );
}

export function AIShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050810] py-20 md:py-28 lg:py-40 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-white/10 rounded-full text-xs font-mono text-[#1e5fff] uppercase tracking-widest mb-6">
            <Code2 size={12} /> Live Platform Preview
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
          >
            See it in{" "}
            <span className="text-gradient-teal-purple">action</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            From zero to production AI in minutes. No PhD required.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Terminal — large */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-7"
          >
            <AnimatedTerminal />
          </motion.div>

          {/* Neural viz */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 glass border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Layers size={14} className="text-[#a855f7]" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Neural Network Visualization</span>
            </div>
            <div className="h-[260px]">
              <NeuralViz activeStep={activeNode} />
            </div>
            <div className="flex gap-2 mt-2 justify-center">
              {["Input", "Hidden 1", "Hidden 2", "Output"].map((label, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider cursor-pointer transition-colors"
                  style={{ color: activeNode === i ? "#22d3a8" : "#555" }}
                  onClick={() => setActiveNode(i)}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: activeNode === i ? "#22d3a8" : "#333" }} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metrics row */}
          {METRICS.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
              className="md:col-span-3 glass border border-white/10 rounded-2xl p-6 flex items-center justify-center shimmer-effect"
            >
              <AnimatedMetric metric={metric} delay={i * 0.2} />
            </motion.div>
          ))}

          {/* Integration strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-12 glass border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <Activity size={14} className="text-[#22d3a8]" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Native Integrations</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Python SDK", "TypeScript SDK", "REST API", "GraphQL", "Webhooks",
                "Kafka", "Spark", "dbt", "Airflow", "Kubernetes", "Terraform", "GitHub Actions"
              ].map((int, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20 transition-colors cursor-default"
                >
                  {int}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
