"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track the raw percentage (0-100) for display
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return smoothProgress.onChange((latest) => {
      setPercent(Math.round(latest * 100));
      // Show button after scrolling down a bit (e.g., 5%)
      if (latest > 0.05) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [smoothProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // The liquid fill height translates from 100% (empty, translated down) to 0% (full)
  const fillHeight = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[100]"
        >
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex h-[5.5rem] w-14 flex-col items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md transition-shadow hover:shadow-[0_8px_32px_rgba(91,33,182,0.2)]"
          >
            {/* Liquid Fill Background */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-violet-600 to-emerald-500 opacity-20"
              style={{ y: fillHeight }}
            />

            {/* Inner Content wrapper for masking */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#090A0F]">
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.div
                    key="arrow"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUp size={22} className="text-violet-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="text"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="font-syne text-[9px] font-black uppercase leading-none tracking-widest text-violet-600">
                      Top
                    </span>
                    <span className="font-mono text-[11px] font-bold tabular-nums">
                      {percent}%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
