"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative z-10 px-8 md:px-16 py-28 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong rounded-[2rem] p-14 md:p-20 relative overflow-hidden text-center"
      >
        {/* Inner glow orbs */}
        <div className="absolute top-0 left-1/4 w-[40%] h-[60%] bg-[#5B21B6] rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[30%] h-[50%] bg-[#F43F5E] rounded-full blur-[100px] opacity-[0.08] pointer-events-none" />

        <div className="relative z-10">
          <div className="section-tag mb-8 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse" />
            Free tier — no credit card required
          </div>

          <h2
            className="font-black leading-[0.95] tracking-tight mb-8 text-[#090A0F]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Ready to build with AI{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #090A0F 0%, #5B21B6 50%, #1D4ED8 100%)",
              }}
            >
              that scales?
            </span>
          </h2>

          <p className="text-[#4a4453] max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
            10,000+ AI teams trust InXfinia for their most demanding workloads. Start in minutes, scale to billions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-base px-10 py-5">
              Start Building Free <ArrowUpRight size={18} />
            </button>
            <button className="btn-secondary text-base px-10 py-5">
              Talk to Sales
            </button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-8 mt-14 label-caps text-[#7b7485]">
            {["SOC 2 Type II", "GDPR Compliant", "ISO 27001", "HIPAA Ready"].map((b) => (
              <span key={b} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[rgba(9,10,15,0.2)]" />{b}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
