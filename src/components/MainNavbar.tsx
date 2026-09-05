"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { name: "Platform",   href: "/platform"        },
  { name: "Portfolio",  href: "/portfolio"        },
  { name: "Developers", href: "/developers"       },
  { name: "Services",   href: "/services"         },
  { name: "Marketing",  href: "/digital-marketing"},
  { name: "About",      href: "/about"            },
  { name: "Blog",       href: "/blog"             },
  { name: "Manifesto",  href: "/manifesto"        },
];

export function MainNavbar() {
  const navRef        = useRef<HTMLElement>(null);
  const dropdownRef   = useRef<HTMLDivElement>(null);
  const bar1Ref       = useRef<HTMLSpanElement>(null);
  const bar2Ref       = useRef<HTMLSpanElement>(null);
  const bar3Ref       = useRef<HTMLSpanElement>(null);
  const linksRef      = useRef<HTMLAnchorElement[]>([]);
  const pathname      = usePathname();
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAnimating = useRef(false);

  /* ── Entrance animation ── */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP hamburger → X morph + menu open/close ── */
  const toggleMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const opening = !isMobileMenuOpen;
    setIsMobileMenuOpen(opening);

    const b1 = bar1Ref.current;
    const b2 = bar2Ref.current;
    const b3 = bar3Ref.current;
    const dd = dropdownRef.current;
    if (!b1 || !b2 || !b3 || !dd) { isAnimating.current = false; return; }

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    if (opening) {
      /* bars → X */
      tl.to(b2, { scaleX: 0, opacity: 0, duration: 0.15, ease: "power2.in" })
        .to(b1, { y: 7,  rotation: 45,  duration: 0.25, ease: "power3.out" }, "<0.05")
        .to(b3, { y: -7, rotation: -45, duration: 0.25, ease: "power3.out" }, "<")
        /* dropdown slides down */
        .set(dd, { display: "flex" })
        .fromTo(dd,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" },
          "<0.1"
        )
        /* stagger links in */
        .fromTo(linksRef.current,
          { x: -16, opacity: 0 },
          { x: 0,   opacity: 1, stagger: 0.055, duration: 0.28, ease: "power3.out" },
          "<0.05"
        );
    } else {
      /* links out */
      tl.to(linksRef.current,
          { x: -12, opacity: 0, stagger: 0.03, duration: 0.18, ease: "power2.in" }
        )
        /* dropdown slides up */
        .to(dd, { height: 0, opacity: 0, duration: 0.28, ease: "power3.in" }, "<0.1")
        .set(dd, { display: "none" })
        /* X → bars */
        .to(b1, { y: 0, rotation: 0, duration: 0.25, ease: "power3.out" }, "<0.05")
        .to(b3, { y: 0, rotation: 0, duration: 0.25, ease: "power3.out" }, "<")
        .to(b2, { scaleX: 1, opacity: 1, duration: 0.2, ease: "power2.out" }, "<0.1");
    }
  }, [isMobileMenuOpen]);

  const baseClasses    = "fixed inset-x-0 mx-auto z-[150] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";
  const scrolledClasses = "top-4 w-[calc(100%-2rem)] max-w-[64rem] bg-[#faf8ff]/90 backdrop-blur-md border border-black/10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.08)]";
  const topClasses      = "top-0 w-full max-w-[84rem] bg-transparent border-transparent rounded-none shadow-none pt-4";

  return (
    <header
      ref={navRef}
      className={`${baseClasses} ${isScrolled ? scrolledClasses : topClasses}`}
      style={{ opacity: 0 }}
    >
      {/* ── Main bar ── */}
      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tighter text-[#090A0F] shrink-0" style={{ fontFamily: "var(--font-syne)" }}>
          In<span style={{ color: "#5B21B6" }}>X</span>finia
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link key={l.name} href={l.href}
                className={`text-[13px] font-medium transition-colors px-2.5 py-1.5 rounded-full whitespace-nowrap ${
                  isActive ? "bg-[#5B21B6]/10 text-[#5B21B6]" : "text-[#4a4453] hover:text-[#090A0F] hover:bg-black/5"
                }`}>
                {l.name}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Desktop CTA — hidden on mobile via wrapper div */}
          <div className="hidden md:flex">
            <Link href="/contact" className="btn-primary">
              Get Started <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* ── Hamburger (mobile only) — no box, pure lines, GSAP morph ── */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-0 outline-none border-none bg-transparent p-0"
            onClick={toggleMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            style={{ cursor: "pointer" }}
          >
            <span ref={bar1Ref}
              className="block w-6 h-[2px] rounded-full"
              style={{ background: "#090A0F", marginBottom: 5, transformOrigin: "center center" }}
            />
            <span ref={bar2Ref}
              className="block w-6 h-[2px] rounded-full"
              style={{ background: "#090A0F", transformOrigin: "center center" }}
            />
            <span ref={bar3Ref}
              className="block w-6 h-[2px] rounded-full"
              style={{ background: "#090A0F", marginTop: 5, transformOrigin: "center center" }}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown — GSAP controlled, hidden by default ── */}
      <div
        ref={dropdownRef}
        className="md:hidden flex-col overflow-hidden border-t border-black/5"
        style={{ display: "none", height: 0, opacity: 0 }}
      >
        <div className="flex flex-col px-6 pt-2 pb-6 bg-[#faf8ff]" style={{ borderRadius: "0 0 2rem 2rem" }}>
          {NAV_LINKS.map((l, i) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.name}
                href={l.href}
                ref={(el) => { if (el) linksRef.current[i] = el; }}
                onClick={() => { if (isMobileMenuOpen) toggleMenu(); }}
                className={`py-3.5 text-sm font-medium border-b border-black/5 last:border-0 transition-colors ${
                  isActive ? "text-[#5B21B6]" : "text-[#4a4453] hover:text-[#090A0F]"
                }`}
              >
                {l.name}
              </Link>
            );
          })}

          {/* CTA only inside the dropdown — never in the top bar on mobile */}
          <Link
            href="/contact"
            ref={(el) => { if (el) linksRef.current[NAV_LINKS.length] = el; }}
            onClick={() => { if (isMobileMenuOpen) toggleMenu(); }}
            className="mt-4 btn-primary w-full text-center justify-center"
          >
            Get Started <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
