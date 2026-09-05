"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, Brain, Shield, Zap, Box, Cpu, Database, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    name: "Platform",
    href: "/platform",
    mega: [
      { icon: <Brain size={18} />, title: "AI Engine", desc: "Zero-latency inference and model serving at scale.", color: "#22d3a8" },
      { icon: <Shield size={18} />, title: "Security", desc: "SOC 2, zero-trust, end-to-end encryption.", color: "#1e5fff" },
      { icon: <Database size={18} />, title: "Data Layer", desc: "Real-time streaming, vector stores, and analytics.", color: "#a855f7" },
    ]
  },
  {
    name: "Solutions",
    href: "/solutions",
    mega: [
      { icon: <Zap size={18} />, title: "MLOps Automation", desc: "End-to-end ML lifecycle management.", color: "#f59e0b" },
      { icon: <Box size={18} />, title: "AI Agents", desc: "Autonomous multi-step workflow orchestration.", color: "#22d3a8" },
      { icon: <Cpu size={18} />, title: "Edge Inference", desc: "Deploy models at the edge, globally.", color: "#1e5fff" },
    ]
  },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Developers", href: "/developers" },
  { name: "Services", href: "/services" },
  { name: "Marketing", href: "/digital-marketing" },
  { name: "Docs" },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMinimized = isScrolled && !isHovered && !isMobileMenuOpen;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 px-4 md:px-8 py-4 pointer-events-none flex justify-center"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ maxWidth: isMinimized ? 160 : 1200 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col items-center glass border border-white/10 rounded-2xl px-5 py-3 pointer-events-auto shadow-[0_0_30px_rgba(0,0,0,0.4)] overflow-hidden"
      >
        <div className="flex flex-row justify-between items-center w-full">
          {/* Logo */}
          <div className="flex items-center shrink-0 w-[120px]">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
            >
              In<span className="text-[#22d3a8]">X</span>finia
            </Link>
          </div>

          <motion.div
            animate={{ opacity: isMinimized ? 0 : 1, filter: isMinimized ? "blur(4px)" : "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ pointerEvents: isMinimized ? "none" : "auto" }}
            className="hidden md:flex flex-row justify-between items-center flex-1 ml-4"
          >
            {/* Navigation (Desktop) */}
            <div className="flex-1 flex justify-center">
              <nav className="flex flex-row gap-1 items-center relative">
                {navItems.map((item, index) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {item.href ? (
                      <Link href={item.href} className="flex items-center gap-1 px-3 lg:px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-xl hover:bg-white/[0.05]">
                        {item.name}
                        {item.mega && <ChevronDown size={12} className="opacity-40 transition-transform duration-200" style={{ transform: hoveredIndex === index ? "rotate(180deg)" : "rotate(0deg)" }} />}
                      </Link>
                    ) : (
                      <div className="flex items-center gap-1 px-3 lg:px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-xl hover:bg-white/[0.05]">
                        {item.name}
                        {item.mega && <ChevronDown size={12} className="opacity-40 transition-transform duration-200" style={{ transform: hoveredIndex === index ? "rotate(180deg)" : "rotate(0deg)" }} />}
                      </div>
                    )}

                    {/* Mega Menu */}
                    {item.mega && (
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                          >
                            <div className="flex flex-col gap-1">
                              {item.mega.map((link, i) => {
                                const targetHref = item.href ? `${item.href}#${link.title.toLowerCase().replace(/\s+/g, '-')}` : "#";
                                return (
                                  <Link
                                    key={i}
                                    href={targetHref}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer group"
                                  >
                                    <div
                                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                                      style={{
                                        background: `${link.color}15`,
                                        color: link.color,
                                      }}
                                    >
                                      {link.icon}
                                    </div>
                                    <div>
                                      <h4 className="text-white text-sm font-semibold">{link.title}</h4>
                                      <p className="text-zinc-500 text-xs mt-0.5 leading-relaxed">{link.desc}</p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right actions (Desktop) */}
            <div className="flex items-center gap-2 lg:gap-4 shrink-0">
              <button
                className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <Link href="#" className="hidden lg:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold px-4 lg:px-5 py-2 rounded-full text-white transition-all duration-300 hover:scale-105 inline-block whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #1e5fff, #22d3a8)",
                  boxShadow: "0 0 20px rgba(30,95,255,0.3)",
                }}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2 transition-opacity duration-300" style={{ opacity: isMinimized ? 0 : 1, pointerEvents: isMinimized ? "none" : "auto" }}>
            <button
              className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full md:hidden flex flex-col pt-4 overflow-hidden"
            >
              <nav className="flex flex-col gap-2 pb-4 border-b border-white/10">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    className="flex justify-between items-center px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3 pt-4 pb-2">
                <Link
                  href="#"
                  className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white text-center rounded-xl hover:bg-white/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-semibold px-4 py-3 rounded-xl text-white text-center transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #1e5fff, #22d3a8)",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
