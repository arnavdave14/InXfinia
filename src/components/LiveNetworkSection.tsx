"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODE_CONFIGS = [
  { id: "data",   label: "DATA",   metric: "500M+ /day", detail: "Streaming ingestion, vector stores & real-time analytics",  color: "#22d3ee", angle: -90  },
  { id: "ai",     label: "AI",     metric: "10× faster", detail: "Sub-millisecond inference with dynamic batching",            color: "#a855f7", angle: -30  },
  { id: "cloud",  label: "CLOUD",  metric: "50 regions", detail: "Multi-cloud fabric with zero-egress intelligent routing",   color: "#3b82f6", angle:  30  },
  { id: "edge",   label: "EDGE",   metric: "< 1ms P99",  detail: "Models deployed at the network perimeter, globally",        color: "#f43f5e", angle:  90  },
  { id: "auth",   label: "AUTH",   metric: "Zero trust", detail: "SOC2 Type II, GDPR compliant, end-to-end encryption",      color: "#22c55e", angle: 150  },
  { id: "devkit", label: "DEVKIT", metric: "20+ SDKs",   detail: "Type-safe SDKs, CLI, REST & GraphQL — ready in minutes",   color: "#f59e0b", angle: -150 },
];

interface CanvasNode {
  id: string; label: string; color: string;
  restX: number; restY: number;
  x: number; y: number;
  vx: number; vy: number;
  scale: number; targetScale: number;
  alpha: number; targetAlpha: number;
  isHovered: boolean;
}

interface Particle {
  t: number; speed: number; size: number; color: string; nodeIdx: number;
}

export function LiveNetworkSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  const stateRef = useRef<{
    nodes: CanvasNode[];
    particles: Particle[];
    mouse: { x: number; y: number };
    cx: number; cy: number;
    hubScale: number; hubAlpha: number; hubPulse: number;
    time: number;
  }>({
    nodes: [], particles: [],
    mouse: { x: -9999, y: -9999 },
    cx: 0, cy: 0,
    hubScale: 0, hubAlpha: 0, hubPulse: 0,
    time: 0,
  });

  const [hoveredInfo, setHoveredInfo] = useState<(typeof NODE_CONFIGS[0] & { sx: number; sy: number }) | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const W = container.offsetWidth;
    const H = Math.round(W * 0.62);
    canvas.width = W;
    canvas.height = H;

    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) * 0.37;

    stateRef.current.cx = cx;
    stateRef.current.cy = cy;

    stateRef.current.nodes = NODE_CONFIGS.map(cfg => {
      const rad = (cfg.angle * Math.PI) / 180;
      return {
        id: cfg.id, label: cfg.label, color: cfg.color,
        restX: cx + radius * Math.cos(rad),
        restY: cy + radius * Math.sin(rad),
        x: cx, y: cy,
        vx: 0, vy: 0,
        scale: 0, targetScale: 0,
        alpha: 0, targetAlpha: 0,
        isHovered: false,
      };
    });

    stateRef.current.particles = NODE_CONFIGS.flatMap((_, ni) =>
      Array.from({ length: 12 }, (__, i) => ({
        t: i / 12,
        speed: 0.003 + Math.random() * 0.003,
        size: Math.random() * 1.8 + 0.5,
        color: NODE_CONFIGS[ni].color,
        nodeIdx: ni,
      }))
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setupCanvas();

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const qBez = (t: number, p0: number, p1: number, p2: number) =>
      (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

    function frame() {
      if (!canvas || !ctx) return;
      const s = stateRef.current;
      const { cx, cy, mouse } = s;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      s.time += 0.016;
      s.hubPulse += 0.018;

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.6);
      bg.addColorStop(0, "rgba(91,33,182,0.10)");
      bg.addColorStop(0.5, "rgba(29,78,216,0.04)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const nodeR = Math.min(W, H) * 0.055;
      const magnetR = Math.min(W, H) * 0.28;

      s.nodes.forEach(node => {
        node.vx += (node.restX - node.x) * 0.055;
        node.vy += (node.restY - node.y) * 0.055;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < magnetR && dist > 0) {
          const force = Math.pow(1 - dist / magnetR, 1.4) * 0.06;
          node.vx += dx * force;
          node.vy += dy * force;
        }

        node.vx *= 0.76;
        node.vy *= 0.76;
        node.x += node.vx;
        node.y += node.vy;

        node.scale = lerp(node.scale, node.targetScale, 0.1);
        node.alpha = lerp(node.alpha, node.targetAlpha, 0.07);

        const hd = Math.sqrt((mouse.x - node.x) ** 2 + (mouse.y - node.y) ** 2);
        node.isHovered = hd < nodeR * 1.6;
        node.targetScale = node.isHovered ? 1.25 : 1.0;
      });

      s.nodes.forEach(node => {
        if (node.alpha < 0.02) return;
        const cpx = (node.x + cx) / 2 + (node.y - cy) * 0.22;
        const cpy = (node.y + cy) / 2 - (node.x - cx) * 0.22;

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.quadraticCurveTo(cpx, cpy, cx, cy);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = node.isHovered ? 1.8 : 0.7;
        ctx.globalAlpha = node.alpha * (node.isHovered ? 0.7 : 0.18);
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.isHovered ? 14 : 3;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      s.particles.forEach(p => {
        const node = s.nodes[p.nodeIdx];
        if (!node || node.alpha < 0.08) return;

        p.t += p.speed * (node.isHovered ? 1.8 : 1);
        if (p.t > 1) p.t -= 1;

        const cpx = (node.x + cx) / 2 + (node.y - cy) * 0.22;
        const cpy = (node.y + cy) / 2 - (node.x - cx) * 0.22;
        const px = qBez(p.t, node.x, cpx, cx);
        const py = qBez(p.t, node.y, cpy, cy);

        const alpha = Math.sin(p.t * Math.PI) * node.alpha * (node.isHovered ? 1 : 0.55);
        if (alpha < 0.01) return;

        ctx.beginPath();
        ctx.arc(px, py, p.size * node.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = node.isHovered ? 12 : 5;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      if (s.hubAlpha > 0.01) {
        const hr = Math.min(W, H) * 0.075 * s.hubScale;

        [1.8, 1.4, 1.1].forEach((mult, i) => {
          const pr = hr * (mult + 0.08 * Math.sin(s.hubPulse - i * 1.1));
          ctx.beginPath();
          ctx.arc(cx, cy, pr, 0, Math.PI * 2);
          ctx.strokeStyle = "#5B21B6";
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = s.hubAlpha * (0.22 - i * 0.06);
          ctx.stroke();
          ctx.globalAlpha = 1;
        });

        const hg = ctx.createRadialGradient(cx - hr * 0.2, cy - hr * 0.2, 0, cx, cy, hr);
        hg.addColorStop(0, "#1e0a35");
        hg.addColorStop(1, "#08041a");
        ctx.beginPath();
        ctx.arc(cx, cy, hr, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.globalAlpha = s.hubAlpha;
        ctx.shadowColor = "#5B21B6";
        ctx.shadowBlur = 25;
        ctx.fill();
        ctx.strokeStyle = "#7c3aed";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        const fs = hr * 0.52;
        ctx.font = `900 ${fs}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = s.hubAlpha;
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.fillText("In", cx - fs * 0.28, cy);
        ctx.fillStyle = "#7c3aed";
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 10;
        ctx.fillText("X", cx + fs * 0.5, cy);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      s.nodes.forEach(node => {
        if (node.alpha < 0.01) return;
        const r = nodeR * node.scale;

        if (node.isHovered) {
          const halo = ctx.createRadialGradient(node.x, node.y, r * 0.5, node.x, node.y, r * 2.2);
          halo.addColorStop(0, node.color + "28");
          halo.addColorStop(1, node.color + "00");
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.globalAlpha = node.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        const ng = ctx.createRadialGradient(node.x - r * 0.3, node.y - r * 0.3, 0, node.x, node.y, r);
        ng.addColorStop(0, "#1c1c2e");
        ng.addColorStop(1, "#0b0b18");
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.globalAlpha = node.alpha;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.isHovered ? 22 : 8;
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = node.isHovered ? 2 : 1;
        ctx.globalAlpha = node.alpha * (node.isHovered ? 1 : 0.7);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        const labelFs = Math.min(W, H) * 0.022 * node.scale;
        ctx.font = `700 ${labelFs}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = node.isHovered ? node.color : "rgba(255,255,255,0.55)";
        ctx.globalAlpha = node.alpha;
        ctx.shadowColor = node.isHovered ? node.color : "transparent";
        ctx.shadowBlur = node.isHovered ? 8 : 0;
        ctx.fillText(node.label, node.x, node.y + r + 6);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [setupCanvas]);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 65%",
      once: true,
      onEnter: () => {
        setIsVisible(true);
        const s = stateRef.current;
        gsap.to(s, { hubScale: 1, hubAlpha: 1, duration: 0.9, ease: "back.out(1.7)" });
        s.nodes.forEach((node, i) => {
          setTimeout(() => { node.targetAlpha = 1; }, 300 + i * 110);
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    stateRef.current.mouse = { x: mx, y: my };

    const nodeR = Math.min(canvas.width, canvas.height) * 0.055;
    const hov = stateRef.current.nodes.find(n =>
      Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2) < nodeR * 1.6
    );

    if (hov) {
      const cfg = NODE_CONFIGS.find(c => c.id === hov.id);
      if (cfg) {
        setHoveredInfo({
          ...cfg,
          sx: (hov.x / canvas.width) * rect.width,
          sy: (hov.y / canvas.height) * rect.height,
        });
      }
    } else {
      setHoveredInfo(null);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    stateRef.current.mouse = { x: -9999, y: -9999 };
    setHoveredInfo(null);
  }, []);

  useEffect(() => {
    setupCanvas();
    const ro = new ResizeObserver(() => setupCanvas());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [setupCanvas]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#06060a] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10">
        <div className="text-center pt-20 pb-2 px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-7"
            style={{ border: "1px solid rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.08)", color: "#c084fc" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
            Live Infrastructure Pulse
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="font-black tracking-tighter text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontFamily: "var(--font-syne)" }}
          >
            Everything{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #a855f7 0%, #22d3ee 100%)" }}>
              connected.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/25 text-sm mt-3 tracking-wide"
          >
            Move your cursor — feel the magnetic pull
          </motion.p>
        </div>

        <div ref={containerRef} className="relative mx-auto w-full" style={{ maxWidth: 960 }}>
          <canvas ref={canvasRef} className="w-full h-auto block" />

          <AnimatePresence>
            {hoveredInfo && (
              <motion.div
                key={hoveredInfo.id}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.18 }}
                className="absolute pointer-events-none z-30"
                style={{ left: hoveredInfo.sx, top: hoveredInfo.sy - 128, transform: "translateX(-50%)", width: 200 }}
              >
                <div
                  className="rounded-2xl p-4 backdrop-blur-xl border"
                  style={{
                    background: "rgba(8,8,14,0.92)",
                    borderColor: hoveredInfo.color + "35",
                    boxShadow: `0 0 32px ${hoveredInfo.color}18, 0 12px 40px rgba(0,0,0,0.6)`,
                  }}
                >
                  <div className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5" style={{ color: hoveredInfo.color }}>
                    {hoveredInfo.label}
                  </div>
                  <div className="text-white font-black text-xl mb-2 leading-none" style={{ fontFamily: "var(--font-syne)" }}>
                    {hoveredInfo.metric}
                  </div>
                  <p className="text-white/35 text-[11px] leading-relaxed">{hoveredInfo.detail}</p>
                </div>
                <div className="mx-auto w-0 h-0"
                  style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${hoveredInfo.color}35` }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto mb-24 mt-2 px-6 md:px-0"
          style={{ borderRadius: "1.25rem", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}
        >
          {[
            { val: "500M+", label: "API calls / day" },
            { val: "< 1ms",  label: "P99 latency"    },
            { val: "99.9%",  label: "uptime SLA"      },
            { val: "50+",    label: "global regions"  },
          ].map((s) => (
            <div key={s.val} className="flex flex-col items-center py-7 px-4" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{s.val}</div>
              <div className="text-[10px] text-white/25 uppercase tracking-[0.14em] mt-1.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
