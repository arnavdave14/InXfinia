"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── Data ─────────────────────────── */
const PANELS = [
  {
    id: "strategy",
    title: "Strategy",
    number: "01",
    subtitle: "Mapping the future of your infrastructure.",
    description:
      "We architect resilient, scalable systems designed to support exponential growth without compromising security or performance.",
    accent: "#5B21B6",
    accentRgb: "91,33,182",
    gradient: "linear-gradient(135deg, #5B21B6 0%, #1D4ED8 100%)",
    tag: "01 / Foundational",
    icon: "◈",
    href: "/solutions/strategy",
    metrics: ["99.99% Uptime", "Zero Trust", "Auto-Scale"],
  },
  {
    id: "expertise",
    title: "Expertise",
    number: "02",
    subtitle: "Decades of engineering excellence.",
    description:
      "Our team brings unparalleled knowledge in AI, cloud computing, and high-performance APIs to solve your most complex challenges.",
    accent: "#1D4ED8",
    accentRgb: "29,78,216",
    gradient: "linear-gradient(135deg, #1D4ED8 0%, #5B21B6 100%)",
    tag: "02 / Technical",
    icon: "◉",
    href: "/solutions/expertise",
    metrics: ["10+ Years", "200+ Engineers", "SOC 2"],
  },
  {
    id: "analysis",
    title: "Analysis",
    number: "03",
    subtitle: "Data-driven decision making.",
    description:
      "We transform raw infrastructure data into intuitive, actionable insights, making your systems transparent and highly optimizable.",
    accent: "#F43F5E",
    accentRgb: "244,63,94",
    gradient: "linear-gradient(135deg, #F43F5E 0%, #5B21B6 100%)",
    tag: "03 / Intelligence",
    icon: "◇",
    href: "/solutions/analysis",
    metrics: ["Real-time", "10M+ Events/s", "ML-Powered"],
  },
  {
    id: "consulting",
    title: "Consulting",
    number: "04",
    subtitle: "Your partner in digital transformation.",
    description:
      "Beyond just providing tools, we work alongside your team to ensure seamless integrations and long-term success.",
    accent: "#5B21B6",
    accentRgb: "91,33,182",
    gradient: "linear-gradient(135deg, #5B21B6 0%, #F43F5E 100%)",
    tag: "04 / Partnership",
    icon: "◎",
    href: "/solutions/consulting",
    metrics: ["24/7 Support", "Dedicated Team", "SLA Backed"],
  },
];

const NODE_TOPS = PANELS.map(
  (_, i) => `${12 + (i / (PANELS.length - 1)) * 76}%`
);

/* ─────────────────────────── Component ─────────────────────── */
export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Elements ───────────────────────────────────────────── */
      const kwGroups    = gsap.utils.toArray<HTMLElement>(".eco-kw-group");
      const kwOverlays  = kwGroups.map(g => g.querySelector<HTMLElement>(".eco-kw-overlay")!);
      const kwUnderlines= kwGroups.map(g => g.querySelector<HTMLElement>(".eco-underline")!);

      const cards = gsap.utils.toArray<HTMLElement>(".eco-card");

      const getItems = (c: HTMLElement) =>
        [
          c.querySelector(".eco-ct-tag"),
          c.querySelector(".eco-ct-title"),
          c.querySelector(".eco-ct-bar"),
          c.querySelector(".eco-ct-sub"),
          c.querySelector(".eco-ct-desc"),
          ...gsap.utils.toArray<HTMLElement>(".eco-metric", c),
        ].filter(Boolean) as HTMLElement[];

      const spineNodes  = gsap.utils.toArray<HTMLElement>(".eco-spine-node");
      const ringsOuter  = gsap.utils.toArray<HTMLElement>(".eco-ring-outer");
      const ringsMid    = gsap.utils.toArray<HTMLElement>(".eco-ring-mid");
      const energyOrb   = sectionRef.current!.querySelector<HTMLElement>(".eco-energy-orb");

      /* ── Initial states ─────────────────────────────────────── */

      // Keywords: overlay clipped away (hidden behind right wall)
      kwOverlays.forEach(o => gsap.set(o, { clipPath: "inset(0% 100% 0% 0%)" }));
      kwUnderlines.forEach(u => gsap.set(u, { scaleX: 0, transformOrigin: "left center" }));

      // Cards: off to the right, slightly below, invisible
      gsap.set(cards, { x: 90, y: 24, opacity: 0, scale: 0.88 });
      cards.forEach(c => gsap.set(getItems(c), { y: 26, opacity: 0 }));
      cards.forEach(c => {
        const b = c.querySelector<HTMLElement>(".eco-scan-beam");
        const g = c.querySelector<HTMLElement>(".eco-gloss");
        if (b) gsap.set(b, { y: 0, opacity: 0 });
        if (g) gsap.set(g, { x: "-110%", opacity: 0 });
      });

      // Spine
      gsap.set(spineNodes, { scale: 0.3, opacity: 0.15 });
      gsap.set([ringsOuter, ringsMid], { scale: 0.1, opacity: 0 });
      if (energyOrb) gsap.set(energyOrb, { top: NODE_TOPS[0], opacity: 0 });

      /* ── Master pinned timeline ─────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=700%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Fade in the energy orb
      tl.to(energyOrb ?? {}, { opacity: 1, duration: 0.4 }, 0);

      PANELS.forEach((_, i) => {
        const L = `p${i}`;
        const X = `x${i}`;

        /* ── Energy orb travels to node ─────────────────────── */
        if (energyOrb) {
          tl.to(
            energyOrb,
            { top: NODE_TOPS[i], duration: i === 0 ? 0.01 : 0.9, ease: "power2.inOut" },
            L
          );
        }

        /* ── Spine node activates ────────────────────────────── */
        tl.to(spineNodes[i], { scale: 1.5, opacity: 1, duration: 0.4, ease: "back.out(3)" }, L);

        /* ── Sonar rings burst ───────────────────────────────── */
        tl.fromTo(
          ringsMid[i],
          { scale: 0.1, opacity: 0.6 },
          { scale: 4, opacity: 0, duration: 1.5, ease: "power2.out" },
          `${L}+=0.05`
        );
        tl.fromTo(
          ringsOuter[i],
          { scale: 0.1, opacity: 0.3 },
          { scale: 7, opacity: 0, duration: 2.2, ease: "power2.out" },
          `${L}+=0.05`
        );

        /* ── KEYWORD HIGHLIGHT — clip-path LEFT → RIGHT wipe ─── */
        tl.to(
          kwOverlays[i],
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
          L
        );

        /* ── Laser underline sweeps ──────────────────────────── */
        tl.to(
          kwUnderlines[i],
          { scaleX: 1, duration: 1.0, ease: "expo.out" },
          `${L}+=0.3`
        );

        /* ── CARD swoops in ──────────────────────────────────── */
        tl.to(
          cards[i],
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
          `${L}+=0.1`
        );

        /* ── Scan beam sweeps card top → bottom ─────────────── */
        const beam = cards[i].querySelector<HTMLElement>(".eco-scan-beam");
        if (beam) {
          tl.to(beam, { opacity: 1, duration: 0.08 }, `${L}+=0.35`);
          tl.to(beam, { y: 600, duration: 1.1, ease: "power1.inOut" }, `${L}+=0.4`);
          tl.to(beam, { opacity: 0, duration: 0.12 }, `${L}+=1.45`);
        }

        /* ── Card content staggers in ────────────────────────── */
        tl.to(
          getItems(cards[i]),
          { y: 0, opacity: 1, stagger: 0.09, duration: 0.55, ease: "power3.out" },
          `${L}+=0.55`
        );

        /* ── Gloss shimmer ───────────────────────────────────── */
        const gloss = cards[i].querySelector<HTMLElement>(".eco-gloss");
        if (gloss) {
          tl.fromTo(
            gloss,
            { x: "-110%", opacity: 1 },
            { x: "210%", duration: 0.8, ease: "power2.out" },
            `${L}+=1.1`
          );
        }

        /* ── Hold ────────────────────────────────────────────── */
        tl.to({}, { duration: 2.2 });

        /* ── Exit (all except last panel) ────────────────────── */
        if (i < PANELS.length - 1) {
          // Keyword: wipe off to the right (reverse of entrance)
          tl.to(
            kwOverlays[i],
            { clipPath: "inset(0% 0% 0% 100%)", duration: 0.6, ease: "power2.in" },
            X
          );
          tl.to(kwUnderlines[i], {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.5,
            ease: "power2.in",
          }, X);

          // Card: fly out to the left + up
          tl.to(
            getItems(cards[i]),
            { y: -18, opacity: 0, stagger: 0.035, duration: 0.28, ease: "power2.in" },
            X
          );
          tl.to(
            cards[i],
            { x: -65, y: -20, opacity: 0, scale: 0.9, duration: 0.9, ease: "power3.in" },
            `${X}+=0.06`
          );

          // Spine node dims
          tl.to(spineNodes[i], { scale: 0.3, opacity: 0.15, duration: 0.35 }, X);
        }
      });
    }, sectionRef);

    /* ── 3-D hover tilt ─────────────────────────────────────────── */
    const cardInners = sectionRef.current!.querySelectorAll<HTMLElement>(".eco-card-inner");
    type H = { move: (e: MouseEvent) => void; leave: () => void };
    const map = new Map<HTMLElement, H>();
    cardInners.forEach(el => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientX - r.left) / r.width  - 0.5) * 20;
        const ry = ((e.clientY - r.top)  / r.height - 0.5) * -20;
        gsap.to(el, { rotateY: rx, rotateX: ry, duration: 0.3, ease: "power2.out", transformPerspective: 900 });
      };
      const leave = () =>
        gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
      map.set(el, { move, leave });
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      ctx.revert();
      cardInners.forEach(el => {
        const h = map.get(el);
        if (h) { el.removeEventListener("mousemove", h.move); el.removeEventListener("mouseleave", h.leave); }
      });
    };
  }, []);

  /* ─────────────────────────── JSX ───────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto relative z-10 flex h-full items-center px-6 lg:px-14 max-w-[88rem]">

        {/* ══════ LEFT — Stacked keywords ══════════════════════ */}
        <div className="flex-1 min-w-0 flex flex-col justify-center pr-6 lg:pr-10">

          {/* Eyebrow */}
          <div className="section-tag mb-10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B21B6] animate-pulse" />
            What We Bring
          </div>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              color: "#9d97a8",
              fontSize: "0.68rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "1.2rem",
            }}
          >
            We provide the
          </p>

          {/* ── Keywords ─────────────────────────────────────── */}
          <div className="flex flex-col" style={{ gap: "0.15rem" }}>
            {PANELS.map((panel) => (
              <div
                key={panel.id}
                className="eco-kw-group relative w-max"
                style={{ lineHeight: 1 }}
              >
                {/* Ghost (dim, sets layout height) */}
                <div
                  aria-hidden
                  className="whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(2.4rem, 5vw, 5.6rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.035em",
                    color: "rgba(9,10,15,0.07)",
                    userSelect: "none",
                    lineHeight: 1.02,
                  }}
                >
                  {panel.title}
                </div>

                {/* Animated gradient text overlay */}
                <div
                  className="eco-kw-overlay absolute inset-0 whitespace-nowrap"
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(2.4rem, 5vw, 5.6rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.035em",
                    lineHeight: 1.02,
                    backgroundImage: panel.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {panel.title}
                </div>

                {/* Underline (no extreme glow) */}
                <div
                  className="eco-underline rounded-full"
                  style={{
                    height: "3px",
                    width: "100%",
                    marginTop: "4px",
                    backgroundImage: panel.gradient,
                    // Subdued shadow instead of extreme glow
                    boxShadow: `0 2px 8px rgba(${panel.accentRgb},0.15)`,
                  }}
                />
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              color: "#9d97a8",
              fontSize: "0.8rem",
              lineHeight: 1.65,
              marginTop: "1.6rem",
              maxWidth: "28ch",
            }}
          >
            to completely transform your infrastructure.
          </p>
        </div>

        {/* ══════ CENTRE — Spine ════════════════════════════════ */}
        <div
          className="hidden lg:block relative flex-shrink-0 h-full"
          style={{ width: "4rem" }}
        >
          {/* Track */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: NODE_TOPS[0],
              bottom: `${100 - parseInt(NODE_TOPS[PANELS.length - 1])}%`,
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, rgba(91,33,182,0.15) 20%, rgba(91,33,182,0.15) 80%, transparent)",
            }}
          />

          {/* Clean energy orb */}
          <div
            className="eco-energy-orb absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full"
            style={{
              width: "10px",
              height: "10px",
              background: "radial-gradient(circle, #fff 0%, #5B21B6 80%)",
              boxShadow: `0 0 12px rgba(91,33,182,0.4)`, // Subdued
              top: NODE_TOPS[0],
            }}
          />

          {/* Nodes */}
          {PANELS.map((panel, i) => (
            <div
              key={panel.id}
              className="eco-spine-node absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ top: NODE_TOPS[i], width: "3rem", height: "3rem" }}
            >
              <div
                className="eco-ring-outer absolute rounded-full border"
                style={{
                  width: "2.6rem",
                  height: "2.6rem",
                  borderColor: `rgba(${panel.accentRgb},0.2)`,
                }}
              />
              <div
                className="eco-ring-mid absolute rounded-full border"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderColor: `rgba(${panel.accentRgb},0.4)`,
                }}
              />
              {/* Clean diamond node */}
              <div
                className="relative z-10 rotate-45"
                style={{
                  width: "8px",
                  height: "8px",
                  background: `rgba(${panel.accentRgb},1)`,
                  boxShadow: `0 0 8px rgba(${panel.accentRgb},0.4)`, // Subdued
                }}
              />
            </div>
          ))}
        </div>

        {/* ══════ RIGHT — Stacked reveal cards ════════════════ */}
        <div className="flex-1 min-w-0 relative h-full flex items-center justify-end">
          {PANELS.map((panel, i) => (
            <div
              key={panel.id}
              className="eco-card absolute w-full"
              style={{ maxWidth: "min(510px,100%)", perspective: "1100px" }}
            >
              <div
                className="eco-card-inner will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="relative overflow-hidden rounded-[28px]"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(40px) saturate(200%)",
                    WebkitBackdropFilter: "blur(40px) saturate(200%)",
                    border: `1px solid rgba(${panel.accentRgb},0.15)`,
                    boxShadow:
                      `0 24px 80px -12px rgba(${panel.accentRgb},0.12),` +
                      ` 0 8px 24px -6px rgba(9,10,15,0.06),` +
                      " inset 0 1px 0 rgba(255,255,255,1)",
                  }}
                >
                  {/* ── Scan beam ─────────────────────────────── */}
                  <div
                    className="eco-scan-beam pointer-events-none absolute inset-x-0 top-0 z-30"
                    style={{
                      height: "2px",
                      background: `linear-gradient(90deg, transparent 0%, rgba(${panel.accentRgb},0.8) 40%, rgba(${panel.accentRgb},0.8) 60%, transparent 100%)`,
                      boxShadow: `0 0 16px 4px rgba(${panel.accentRgb},0.2)`, // Subdued
                    }}
                  />

                  {/* ── Gloss shimmer ─────────────────────────── */}
                  <div
                    className="eco-gloss pointer-events-none absolute inset-0 z-20"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.65) 50%, transparent 80%)",
                    }}
                  />

                  {/* ── Gradient colour wash ──────────────────── */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(145deg, rgba(${panel.accentRgb},0.03) 0%, transparent 50%)`,
                    }}
                  />

                  {/* Thick gradient left border */}
                  <div
                    className="absolute left-0 top-0 bottom-0"
                    style={{
                      width: "4px",
                      backgroundImage: panel.gradient,
                      boxShadow: `2px 0 12px rgba(${panel.accentRgb},0.15)`, // Subdued
                    }}
                  />

                  {/* Watermark number */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-0 select-none font-black leading-none"
                    style={{
                      fontSize: "clamp(5rem,10vw,10rem)",
                      backgroundImage: panel.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      opacity: 0.05,
                      fontFamily: "var(--font-syne)",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    {panel.number}
                  </div>

                  {/* ── Content ───────────────────────────────── */}
                  <div className="relative z-10 px-9 py-9 md:px-11 md:py-11 flex flex-col gap-4 pl-12">

                    {/* Tag */}
                    <div className="eco-ct-tag flex items-center gap-3">
                      <span
                        style={{
                          fontSize: "1.3rem",
                          backgroundImage: panel.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {panel.icon}
                      </span>
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.26em",
                          textTransform: "uppercase",
                          color: panel.accent,
                          background: `rgba(${panel.accentRgb},0.06)`,
                          border: `1px solid rgba(${panel.accentRgb},0.2)`,
                          borderRadius: "9999px",
                          padding: "4px 12px",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {panel.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="eco-ct-title font-black leading-none tracking-tight"
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: "clamp(2.1rem,3.8vw,3.2rem)",
                        backgroundImage: panel.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {panel.title}
                    </h3>

                    {/* Accent bar */}
                    <div
                      className="eco-ct-bar rounded-full"
                      style={{
                        height: "3px",
                        width: "2.5rem",
                        backgroundImage: panel.gradient,
                        boxShadow: `0 2px 6px rgba(${panel.accentRgb},0.2)`, // Subdued
                      }}
                    />

                    {/* Subtitle */}
                    <p
                      className="eco-ct-sub font-semibold leading-snug"
                      style={{ color: "#090A0F", fontSize: "clamp(0.95rem,1.6vw,1.1rem)" }}
                    >
                      {panel.subtitle}
                    </p>

                    <div className="h-px" style={{ background: `rgba(${panel.accentRgb},0.1)` }} />

                    {/* Description */}
                    <p
                      className="eco-ct-desc leading-relaxed"
                      style={{ color: "#4a4453", fontSize: "clamp(0.8rem,1.1vw,0.92rem)" }}
                    >
                      {panel.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2">
                      {panel.metrics.map(m => (
                        <span
                          key={m}
                          className="eco-metric"
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: panel.accent,
                            background: `rgba(${panel.accentRgb},0.05)`,
                            border: `1px solid rgba(${panel.accentRgb},0.15)`,
                            borderRadius: "9999px",
                            padding: "4px 12px",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
