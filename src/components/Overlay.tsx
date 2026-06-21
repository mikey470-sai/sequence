"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowDown, Cpu, Globe } from "lucide-react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // --- Section 1: Hero (Scroll 0% to 20%) ---
  const opacity1 = useTransform(scrollYProgress, [0, 0.08, 0.14, 0.2], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.14, 0.2], [0, 0, -100]);
  const scale1 = useTransform(scrollYProgress, [0, 0.14], [1, 0.95]);

  // --- Section 2: Profile (Scroll 28% to 50%) ---
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.42, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.3, 0.42, 0.48], [80, 0, 0, -80]);
  const x2 = useTransform(scrollYProgress, [0.25, 0.3, 0.42, 0.48], [-30, 0, 0, -10]);

  // --- Section 3: Focus (Scroll 58% to 80%) ---
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.72, 0.78], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.6, 0.72, 0.78], [80, 0, 0, -80]);
  const x3 = useTransform(scrollYProgress, [0.55, 0.6, 0.72, 0.78], [30, 0, 0, 10]);

  // Scroll indicator at the bottom (only visible near the start)
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none select-none">
      
      {/* SECTION 1: HERO */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <span className="text-brand-cyan font-mono text-xs tracking-[0.3em] uppercase mb-4 shadow-glow-cyan bg-brand-cyan/5 px-3 py-1 rounded-full border border-brand-cyan/20">
          Available for Work
        </span>
        <h1 className="font-display font-black text-5xl md:text-7xl tracking-tight text-white mb-6 leading-none">
          SAI KUMARU NAIDU
        </h1>
        <p className="font-sans text-zinc-400 text-sm md:text-lg tracking-[0.3em] uppercase font-light">
          Full Stack Developer &amp; AI Agent Enthusiast
        </p>
      </motion.div>

      {/* SECTION 2: PROFILE */}
      <motion.div
        style={{ opacity: opacity2, y: y2, x: x2 }}
        className="absolute inset-0 flex flex-col justify-center items-start text-left px-8 md:px-24 max-w-4xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-brand-cyan" />
          <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
            01 / PROFILE
          </span>
        </div>
        <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight leading-tight mb-6">
          BUILDING INTELLIGENT <br />
          <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
            WEB SYSTEMS
          </span>
        </h2>
        <p className="font-sans text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-xl">
          Harnessing modern Python Full Stack Development and machine learning workflows. Shaping applications by integrating intelligent prediction layers, real-time data pipelines, and responsive web backends.
        </p>
      </motion.div>

      {/* SECTION 3: CAPABILITIES */}
      <motion.div
        style={{ opacity: opacity3, y: y3, x: x3 }}
        className="absolute inset-0 flex flex-col justify-center items-end text-right px-8 md:px-24 ml-auto max-w-4xl"
      >
        <div className="flex items-center gap-3 justify-end mb-4">
          <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
            02 / CAPABILITIES
          </span>
          <Cpu className="w-5 h-5 text-brand-purple" />
        </div>
        <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight leading-tight mb-6">
          PYTHON &amp; MACHINE <br />
          <span className="bg-gradient-to-r from-brand-purple to-brand-accent bg-clip-text text-transparent">
            LEARNING PIPELINES
          </span>
        </h2>
        <p className="font-sans text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-xl">
          Implementing advanced machine learning algorithms, training predictive engines (LightGBM, SVM, Random Forests), and deploying highly scalable FastAPI backends with sub-50ms latency.
        </p>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-brand-cyan" />
        </motion.div>
      </motion.div>

    </div>
  );
}
