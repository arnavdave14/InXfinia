"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Brain, Cloud, Cpu, Database, Globe, Shield, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Circle = ({
  children,
  ref,
  className,
  label,
  style,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
  label?: string;
  style?: React.CSSProperties;
}) => (
  <div
    ref={ref}
    style={style}
    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full glass border border-[rgba(9,10,15,0.05)] shadow-[0_8px_32px_-12px_rgba(9,10,15,0.15)] bg-white/50 backdrop-blur-xl ${className}`}
  >
    {children}
    {label && (
      <span className="absolute -bottom-8 whitespace-nowrap text-[10px] font-mono font-bold text-[#7b7485] tracking-widest uppercase pointer-events-none drop-shadow-sm">
        {label}
      </span>
    )}
  </div>
);

export function EcosystemSection() {
  const pinRef        = useRef<HTMLElement>(null);
  const triggerRef    = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const diagramRef    = useRef<HTMLDivElement>(null);
  const hubRef        = useRef<HTMLDivElement>(null);
  const mouseRef      = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const rafRef        = useRef<number>(0);

  // Node anchor refs
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const ref6 = useRef<HTMLDivElement>(null);
  const ref7 = useRef<HTMLDivElement>(null);
  const ref8 = useRef<HTMLDivElement>(null);

  /* ── Canvas: glowing particle trails ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      mouseRef.current.cx = canvas.width  / 2;
      mouseRef.current.cy = canvas.height / 2;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      color: string; size: number;
    }

    const particles: Particle[] = [];
    const COLORS = ["#5B21B6", "#1D4ED8", "#a855f7", "#22d3ee", "#F43F5E"];
    let tick = 0;

    function spawnParticle() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.8;
      const orbitR = 60 + Math.random() * 300;
      const sx = mouseRef.current.cx + Math.cos(angle) * orbitR;
      const sy = mouseRef.current.cy + Math.sin(angle) * orbitR;
      const dx = mouseRef.current.cx - sx;
      const dy = mouseRef.current.cy - sy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      particles.push({
        x: sx, y: sy,
        vx: (dx / dist) * speed,
        vy: (dy / dist) * speed,
        life: 0,
        maxLife: 80 + Math.random() * 80,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 1 + Math.random() * 2,
      });
    }

    function frame() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      if (tick % 3 === 0) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Pull toward hub
        const dx = mouseRef.current.cx - p.x;
        const dy = mouseRef.current.cy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        p.vx += (dx / dist) * 0.04;
        p.vy += (dy / dist) * 0.04;

        const progress = p.life / p.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        if (p.life >= p.maxLife || dist < 8) particles.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  /* ── Magnetic cursor: diagram and hub drift toward mouse ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const section = pinRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width  / 2;
    const my = e.clientY - rect.top  - rect.height / 2;

    // Diagram drifts subtly (max ±30px)
    gsap.to(diagramRef.current, {
      x: mx * 0.035,
      y: my * 0.035,
      duration: 1.2,
      ease: "power2.out",
    });

    // Hub drifts a bit more (max ±20px)
    gsap.to(hubRef.current, {
      x: mx * 0.055,
      y: my * 0.055,
      duration: 0.9,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to([diagramRef.current, hubRef.current], {
      x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.5)",
    });
  }, []);

  /* ── GSAP scroll animation ── */
  useEffect(() => {
    if (!pinRef.current || !triggerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
      (context) => {
        const { isMobile } = context.conditions as Record<string, boolean>;
        const targetScale = isMobile ? 0.45 : 1;
        const centerScale = isMobile ? 0.6  : 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=500%",
            scrub: 1,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        });

        gsap.set(".eco-word-1",     { yPercent: 100, opacity: 0, scale: 0.5 });
        gsap.set(".eco-word-2",     { yPercent: 100, opacity: 0, scale: 0.5 });
        gsap.set(".eco-word-3",     { yPercent: 100, opacity: 0, scale: 0.5 });
        gsap.set(".eco-tag-pinned", { y: -50, opacity: 0 });
        gsap.set(".eco-diagram",    { scale: 0, opacity: 0, rotation: -90 });
        gsap.set(".eco-card",       { xPercent: 100, opacity: 0 });
        gsap.set(".central-hub",    { scale: 0, opacity: 0 });
        gsap.set(".map-node",       { opacity: 0, scale: 0, transformOrigin: "center center", clearProps: "none" });

        const getDelta = (ref: React.RefObject<HTMLElement | null>) => {
          if (!ref.current) return { x: 0, y: 0 };
          const r = ref.current.getBoundingClientRect();
          return {
            x: window.innerWidth  / 2 - (r.left + r.width  / 2),
            y: window.innerHeight / 2 - (r.top  + r.height / 2),
          };
        };

        // Phase 1: words + diagram spin in
        tl.to(".eco-word-1",   { yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0)
          .to(".eco-word-2",   { yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.2)
          .to(".eco-word-3",   { yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.4)
          .to(".eco-diagram",  { scale: targetScale * 0.3, opacity: 1, rotation: -45, duration: 1.5, ease: "power2.inOut" }, 0)
          .to(".central-hub",  { scale: centerScale * 0.3, opacity: 1, duration: 1.5, ease: "power2.inOut" }, 0);

        // Phase 1b: text slides up, diagram expands
        tl.to(".eco-text-container", { xPercent: isMobile ? 0 : -20, yPercent: isMobile ? -35 : -25, scale: isMobile ? 0.8 : 0.6, duration: 1.5, ease: "power2.inOut" }, 1.5)
          .to(".eco-tag-pinned",     { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 1.5)
          .to(".eco-diagram",        { scale: targetScale, rotation: 0, duration: 1.5, ease: "power2.inOut" }, 1.5)
          .to(".central-hub",        { scale: centerScale, duration: 1.5, ease: "power2.inOut" }, 1.5);

        // Phase 1c: cards slide in
        tl.to(".eco-card", { xPercent: 0, opacity: 1, stagger: 0.3, duration: 1.5, ease: "power3.out" }, 2.5);

        // Phase 2: implosion
        tl.to([".eco-text-container", ".eco-card-container"], { opacity: 0, y: -50, duration: 1, ease: "power2.in" }, 4.5);
        tl.to(".animate-orbit-custom", { scale: 0, opacity: 0, duration: 1.5, stagger: 0.1, ease: "back.in(1.5)" }, 4.5)
          .to(".eco-diagram svg circle", { opacity: 0, duration: 1 }, 4.5)
          .to(".central-hub",            { scale: centerScale * 0.7, duration: 1.5, ease: "power2.inOut" }, 4.5);

        // Phase 3: nodes burst out from hub
        const animNode = (id: number, ref: React.RefObject<HTMLElement | null>, time: number) => {
          tl.fromTo(
            `.node-${id}`,
            { x: () => getDelta(ref).x, y: () => getDelta(ref).y, scale: 0, opacity: 0, immediateRender: false },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.2)" },
            time
          );
        };

        animNode(1, ref1, 6.0);
        animNode(5, ref5, 6.4);
        animNode(2, ref2, 6.8);
        animNode(6, ref6, 7.2);
        animNode(3, ref3, 7.6);
        animNode(7, ref7, 8.0);
        animNode(8, ref8, 8.4);

        tl.to({}, { duration: 1 });
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const MapNode = ({ id, label, icon: Icon, targetRef, colorClass }: {
    id: number; label: string; icon: React.ComponentType<{ className?: string; size?: number }>;
    targetRef: React.RefObject<HTMLDivElement | null>; colorClass: string;
  }) => (
    <div className="relative">
      <div className="flex flex-col items-center justify-center gap-2 invisible absolute inset-0 pointer-events-none">
        <div ref={targetRef} className="size-12" />
        <span className="text-[10px] tracking-wider uppercase">{label}</span>
      </div>
      <div className={`map-node node-${id}`}>
        <Circle label={label}>
          <Icon className={colorClass} size={24} />
        </Circle>
      </div>
    </div>
  );

  return (
    <div
      ref={triggerRef}
      className="relative w-full z-10 bg-transparent overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <section ref={pinRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">

        {/* ── Canvas particle layer ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
        />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Pulsing hub glow rings (CSS, always visible once hub is shown) */}
        <div className="central-hub-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[8]">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="absolute rounded-full border border-[#5B21B6]/20"
              style={{
                inset: `-${i * 28}px`,
                animation: `pulse-ring ${2 + i * 0.6}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Text container */}
        <div className="eco-text-container absolute z-20 flex flex-col items-center justify-center text-center origin-center w-full pointer-events-none">
          <div className="eco-tag-pinned section-tag w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse" /> UNIVERSAL INTEGRATIONS
          </div>
          <h2
            className="font-black leading-[0.9] tracking-tighter uppercase w-full break-words whitespace-normal px-2"
            style={{ fontSize: "clamp(2rem, 11vw, 10rem)", fontFamily: "var(--font-syne)", wordBreak: "break-word" }}
          >
            <div className="eco-word-1 overflow-hidden"><div className="text-[#090A0F]">Connect</div></div>
            <div className="eco-word-2 overflow-hidden"><div className="text-[#090A0F]">the whole</div></div>
            <div className="eco-word-3 overflow-hidden">
              <div className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #5B21B6, #1D4ED8)" }}>
                ecosystem.
              </div>
            </div>
          </h2>
        </div>

        {/* Info cards */}
        <div className="eco-card-container absolute right-[5%] lg:right-[10%] top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6 w-[90%] max-w-[400px]">
          <div className="eco-card glass p-8 rounded-3xl border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.05)] bg-white/40 backdrop-blur-2xl pointer-events-auto">
            <p className="text-[#4a4453] text-lg font-medium leading-relaxed">
              Stop worrying about custom API wrappers and webhook endpoints. InXfinia acts as your central intelligence hub, routing data seamlessly across leading AI services, vector databases, and automation platforms.
            </p>
          </div>
          <div className="eco-card glass p-8 rounded-3xl border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.05)] bg-white/40 backdrop-blur-2xl pointer-events-auto">
            <p className="text-[#6b6475] text-base leading-relaxed">
              From sending context to OpenAI, generating lifelike voice with ElevenLabs, to kicking off multi-step n8n workflows — everything works together instantly.
            </p>
          </div>
        </div>

        {/* Central Hub — magnetic, with pulsing shadow */}
        <div
          ref={hubRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <Circle
            ref={ref4}
            className="central-hub h-48 w-48 border border-white/60 bg-white/50 backdrop-blur-2xl"
            style={{
              boxShadow: "0 30px 60px -15px rgba(91,33,182,0.4), 0 0 0 1px rgba(91,33,182,0.1)",
              animation: "hub-breathe 3s ease-in-out infinite",
            }}
          >
            <div className="text-5xl font-black tracking-tight text-[#090A0F]" style={{ fontFamily: "var(--font-syne)" }}>
              In<span style={{ color: "#5B21B6" }}>X</span>
            </div>
          </Circle>
        </div>

        {/* Orbiting Diagram — magnetic */}
        <div
          ref={diagramRef}
          className="eco-diagram absolute z-10 flex h-[800px] w-[800px] flex-col items-center justify-center pointer-events-none transform-gpu origin-center"
        >
          <OrbitingCircles className="border border-black/5 glass shadow-[0_0_20px_-5px_rgba(29,78,216,0.3)]" iconSize={60} duration={20} delay={20} radius={140}>
            <div className="flex flex-col items-center justify-center gap-1">
              <Database className="text-[#1D4ED8]" size={20} />
              <span className="text-[7px] font-mono font-bold text-[#090A0F] tracking-wider">DATA</span>
            </div>
          </OrbitingCircles>
          <OrbitingCircles className="border border-black/5 glass shadow-[0_0_20px_-5px_rgba(244,63,94,0.3)]" iconSize={60} duration={20} delay={10} radius={140}>
            <div className="flex flex-col items-center justify-center gap-1">
              <Terminal className="text-[#F43F5E]" size={20} />
              <span className="text-[7px] font-mono font-bold text-[#090A0F] tracking-wider">CLI</span>
            </div>
          </OrbitingCircles>

          <OrbitingCircles className="border border-black/5 glass shadow-[0_0_20px_-5px_rgba(91,33,182,0.3)]" iconSize={75} radius={240} duration={30} delay={15} reverse>
            <div className="flex flex-col items-center justify-center gap-1">
              <Cloud className="text-[#5B21B6]" size={24} />
              <span className="text-[8px] font-mono font-bold text-[#090A0F] tracking-wider">CLOUD</span>
            </div>
          </OrbitingCircles>
          <OrbitingCircles className="border border-black/5 glass shadow-[0_0_20px_-5px_rgba(29,78,216,0.3)]" iconSize={75} radius={240} duration={30} delay={30} reverse>
            <div className="flex flex-col items-center justify-center gap-1">
              <Cpu className="text-[#1D4ED8]" size={24} />
              <span className="text-[8px] font-mono font-bold text-[#090A0F] tracking-wider">COMPUTE</span>
            </div>
          </OrbitingCircles>

          <OrbitingCircles className="border border-black/5 glass shadow-[0_0_20px_-5px_rgba(244,63,94,0.3)]" iconSize={90} radius={360} duration={40} delay={10}>
            <div className="flex flex-col items-center justify-center gap-1">
              <Globe className="text-[#F43F5E]" size={28} />
              <span className="text-[9px] font-mono font-bold text-[#090A0F] tracking-wider">EDGE</span>
            </div>
          </OrbitingCircles>
          <OrbitingCircles className="border border-black/5 glass shadow-[0_0_20px_-5px_rgba(91,33,182,0.3)]" iconSize={90} radius={360} duration={40} delay={30}>
            <div className="flex flex-col items-center justify-center gap-1">
              <Shield className="text-[#5B21B6]" size={28} />
              <span className="text-[9px] font-mono font-bold text-[#090A0F] tracking-wider">AUTH</span>
            </div>
          </OrbitingCircles>
          <OrbitingCircles className="border border-black/5 glass shadow-[0_0_20px_-5px_rgba(29,78,216,0.3)]" iconSize={90} radius={360} duration={40} delay={50}>
            <div className="flex flex-col items-center justify-center gap-1">
              <Brain className="text-[#1D4ED8]" size={28} />
              <span className="text-[9px] font-mono font-bold text-[#090A0F] tracking-wider">AI</span>
            </div>
          </OrbitingCircles>
        </div>

        {/* Phase 3: Network Map */}
        <div className="absolute inset-0 z-40 pointer-events-none" ref={mapContainerRef}>
          <div className="flex h-full w-full max-w-6xl mx-auto flex-row items-stretch justify-between px-4 md:px-12">
            <div className="flex flex-col justify-between items-center py-20 gap-8 z-20">
              <MapNode id={1} label="Data"  icon={Database} targetRef={ref1} colorClass="text-[#1D4ED8]" />
              <MapNode id={2} label="CLI"   icon={Terminal} targetRef={ref2} colorClass="text-[#F43F5E]" />
              <MapNode id={3} label="Cloud" icon={Cloud}    targetRef={ref3} colorClass="text-[#5B21B6]" />
            </div>
            <div className="flex flex-col justify-center items-center z-20 w-8 md:w-48 shrink-1" />
            <div className="flex flex-col justify-between items-center py-12 gap-6 z-20">
              <MapNode id={5} label="Compute" icon={Cpu}    targetRef={ref5} colorClass="text-[#1D4ED8]" />
              <MapNode id={6} label="Edge"    icon={Globe}  targetRef={ref6} colorClass="text-[#F43F5E]" />
              <MapNode id={7} label="Auth"    icon={Shield} targetRef={ref7} colorClass="text-[#5B21B6]" />
              <MapNode id={8} label="AI"      icon={Brain}  targetRef={ref8} colorClass="text-[#1D4ED8]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
