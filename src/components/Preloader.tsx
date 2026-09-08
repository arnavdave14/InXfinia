"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const SEQUENCE = [
  {
    text: "Presenting",
    sub: null as string | null,
    size: "text-[clamp(1.5rem,4vw,3rem)]",
    weight: "font-light",
    color: "text-[#090A0F]/50",
    duration: 1400,
  },
  {
    text: "Infinite possibilities",
    sub: "of successful solutions." as string | null,
    size: "text-[clamp(1.6rem,3.8vw,3.2rem)]",
    weight: "font-medium",
    color: "text-[#090A0F]/80",
    duration: 1800,
  },
  {
    text: "InXfinia",
    sub: null as string | null,
    size: "text-[clamp(3rem,9vw,8rem)]",
    weight: "font-black",
    color: "text-[#090A0F]",
    duration: 1200,
  },
];

/* Word-by-word spring slide-up */
function WordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`flex flex-wrap justify-center items-center max-w-full gap-x-[0.3em] ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.6, delay: delay + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {word === "InXfinia" ? (
              <>In<span className="text-[#5B21B6]">X</span>finia</>
            ) : (
              word
            )}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  /* Drive through the sequence */
  useEffect(() => {
    let totalTime = 0;
    SEQUENCE.forEach((s, i) => {
      setTimeout(() => { setStep(i); setShowContent(true); }, totalTime);
      if (i < SEQUENCE.length - 1) {
        setTimeout(() => setShowContent(false), totalTime + s.duration - 220);
      }
      totalTime += s.duration;
    });
    const exitTime = totalTime + 900;
    setTimeout(() => { setVisible(false); setTimeout(onComplete, 700); }, exitTime);
  }, [onComplete]);

  /* Smooth progress bar */
  useEffect(() => {
    const total = SEQUENCE.reduce((a, s) => a + s.duration, 0) + 900;
    const start = Date.now();
    let raf: number;
    const frame = () => {
      const pct = Math.min(((Date.now() - start) / total) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const current = SEQUENCE[step];
  const isLast = step === SEQUENCE.length - 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#faf8ff" }}
        >
          {/* ── Ambient glow ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              animate={{
                width: isLast ? "70vw" : "38vw",
                height: isLast ? "70vw" : "38vw",
                opacity: isLast ? 0.13 : 0.05,
              }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{ background: "radial-gradient(circle, #5B21B6, #1D4ED8)", filter: "blur(90px)" }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 rounded-full"
              animate={{ opacity: isLast ? 0.09 : 0.03 }}
              transition={{ duration: 0.8 }}
              style={{ width: "40vw", height: "40vw", background: "radial-gradient(circle, #22d3a8, transparent)", filter: "blur(60px)" }}
            />
          </div>

          {/* ── Text stage ── */}
          <div className="relative z-10 w-full max-w-[90vw] mx-auto flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden">
            <AnimatePresence mode="wait">
              {showContent && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col items-center gap-3 w-full"
                >
                  {/* Step accent line */}
                  {!isLast && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="h-px w-10 bg-violet-400 mb-1 origin-left"
                    />
                  )}

                  {/* Main text */}
                  <h1 className={`font-syne leading-[0.95] tracking-tight text-center w-full max-w-full ${current.size} ${current.weight} ${current.color}`}>
                    <WordReveal text={current.text} delay={0.05} />
                  </h1>

                  {/* Sub-line (step 3 only) */}
                  {current.sub && (
                    <p className="font-syne text-[clamp(1.2rem,3vw,2.5rem)] font-light text-[#090A0F]/60 leading-tight text-center w-full max-w-full mt-2">
                      <WordReveal text={current.sub} delay={0.35} />
                    </p>
                  )}

                  {/* InXfinia tagline */}
                  {isLast && (
                    <motion.span
                      className="font-mono text-xs uppercase tracking-[0.35em] text-violet-500 mt-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, duration: 0.5, ease: "easeOut" }}
                    >
                      Intelligence Redefined
                    </motion.span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Step dots ── */}
          <div className="absolute bottom-[5.5rem] left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
            {SEQUENCE.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === step ? 22 : 6,
                  background: i === step ? "#5B21B6" : i < step ? "#5B21B650" : "#09090B15",
                  opacity: i <= step ? 1 : 0.35,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-[5px] rounded-full"
              />
            ))}
          </div>

          {/* ── Progress bar ── */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[240px] z-10">
            <div className="flex justify-between font-mono text-[12px] text-black font-semibold tracking-widest uppercase mb-2">
              <span>InXfinia</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #5B21B6, #1D4ED8, #22d3a8)",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



