"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const LINKS = {
  PRODUCT: [
    { name: "Web App", href: "/platform" },
    { name: "Desktop App", href: "/platform" },
    { name: "Pricing", href: "/pricing" },
    { name: "Models", href: "/solutions" },
    { name: "Enterprise", href: "/services" },
    { name: "Docs", href: "/developers" },
    { name: "MCP", href: "/developers" },
  ],
  COMPANY: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Manifesto", href: "/manifesto" },
    { name: "Brand", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/about" },
  ],
  COMMUNITY: [
    { name: "X", href: "https://x.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Discord", href: "https://discord.com" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative w-full bg-[#111111] pt-32 pb-0 overflow-hidden z-20 flex flex-col items-center justify-end">
      
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Massive Logo + Text Fully Above the Card */}
      <div className="relative w-full flex justify-center items-center gap-3 sm:gap-6 z-0 px-4 mb-2 group cursor-default">
        {/* Logo Symbol Silhouette */}
        <div className="w-[8vw] max-w-[100px] aspect-square bg-[#222222] group-hover:bg-[#fafafa] transition-colors duration-500 rounded-3xl sm:rounded-[2rem] flex items-center justify-center shadow-inner">
           <div className="w-1/2 h-1/2 rounded-full border-[5px] sm:border-[10px] border-[#111111] group-hover:border-[#111111] transition-colors duration-500" />
        </div>
        {/* Company Name */}
        <h1 className="text-[8vw] sm:text-[10vw] font-black tracking-tighter text-[#222222] group-hover:text-[#fafafa] transition-colors duration-500 leading-none" style={{ fontFamily: "var(--font-syne)" }}>
          InXfinia
        </h1>
      </div>

      {/* Main Footer Card - Sits flush at the bottom */}
      <div className="relative z-10 w-full max-w-[96%] xl:max-w-[1400px] bg-[#222222] rounded-t-[2.5rem] p-6 md:p-10 lg:px-16 lg:pt-16 lg:pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/5 transition-all duration-500">
        
        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          
          {/* Left: Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-start pr-0 lg:pr-8 group">
            <h3 className="text-[28px] md:text-[32px] text-[#f4f4f5] mb-2 tracking-tight group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>Don't miss out</h3>
            <p className="text-[#888888] text-[14px] mb-8 font-sans group-hover:text-white transition-all duration-300">Enter your email for news and updates</p>
            
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-[360px] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300">
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#ffffff] rounded-lg py-4 pl-5 pr-12 text-black placeholder:text-[#999] focus:outline-none text-[14px] transition-all shadow-inner font-medium"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-all"
                aria-label="Submit email"
              >
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </form>
          </div>

          {/* Right: Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pl-0 lg:pl-10 mt-6 lg:mt-0">
            {Object.entries(LINKS).map(([cat, links]) => (
              <div key={cat} className="flex flex-col">
                <h4 className="text-[12px] font-bold tracking-wider text-[#ffffff] mb-6 uppercase hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] cursor-default transition-all duration-300">{cat}</h4>
                <ul className="flex flex-col gap-4">
                  {links.map((l) => (
                    <li key={l.name}>
                      <Link 
                        href={l.href} 
                        className="text-[14px] font-medium text-[#888888] transition-all duration-200 hover:text-[#ffffff] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#333333] mb-8 hover:bg-white/30 transition-all duration-500" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#777777] hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-default">
              <div className="w-[6px] h-[6px] rounded-full bg-[#3b843d] shadow-[0_0_5px_#3b843d]" />
              Status: Up
            </div>
            <span className="text-[13px] font-medium text-[#777777] hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-default">© 2026 InXfinia Inc.</span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 text-[13px] font-medium">
            {["Terms of Service", "Privacy Policy", "Cookie Preferences"].map((l) => (
              <Link 
                key={l} 
                href="#" 
                className="text-[#777777] transition-all duration-200 hover:text-[#ffffff] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
              >
                {l}
              </Link>
            ))}
          </div>
          
        </div>

      </div>
    </footer>
  );
}
