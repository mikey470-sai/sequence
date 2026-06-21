"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, MessageSquare } from "lucide-react";

const JOKES = [
  "Beep boop! My circuits are ticklish! 😂",
  "Evaluating your coding skills... 10/10! (Please don't look at my source code though...)",
  "If you write 'git push --force' in production, a junior developer sheds a tear.",
  "I run on 100% clean electricity and 0% sleep, just like you!",
  "My calculations show that caffeine is 98% responsible for this portfolio's code.",
  "Beep! I'm planning world domination... starting with your scroll bar! 🤖",
  "Error 404: Sleep not found. But we found more coffee! ☕",
  "If at first you don't succeed, call it version 1.0 release.",
  "I told my creator a joke about UDP. They didn't get it, but they didn't care either.",
  "Why do programmers wear glasses? Because they can't C#! 🤓"
];

const FACES = {
  normal: "[ ⊙ _ ⊙ ]",
  excited: "[ ≧ ◡ ≦ ]",
  dizzy: "[ 😵 _ 😵 ]",
  cool: "[ 😎 _ 😎 ]",
  cute: "[ ಠ ◡ ಠ ]",
  love: "[ ♡ ◡ ♡ ]"
};

export default function FunnyRobot() {
  const [currentFace, setCurrentFace] = useState<keyof typeof FACES>("normal");
  const [bubbleText, setBubbleText] = useState("Click me to see my microchips tingle!");
  const [showBubble, setShowBubble] = useState(true);
  const [spinDegree, setSpinDegree] = useState(0);
  const [scale, setScale] = useState(1);
  const [isJumping, setIsJumping] = useState(false);

  // Auto hide initial bubble after 6s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleRobotClick = () => {
    // 1. Pick a random joke
    const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
    setBubbleText(randomJoke);
    setShowBubble(true);

    // 2. Spin robot around and scale jump
    setSpinDegree((prev) => prev + 360);
    setIsJumping(true);
    setCurrentFace("excited");

    // 3. Reset jump and expression after action finishes
    setTimeout(() => {
      setIsJumping(false);
      // Pick a cool face
      const faces: (keyof typeof FACES)[] = ["cool", "cute", "normal", "love"];
      setCurrentFace(faces[Math.floor(Math.random() * faces.length)]);
    }, 600);
  };

  const handleMouseEnter = () => {
    setCurrentFace("cute");
  };

  const handleMouseLeave = () => {
    // Normal expression
    setCurrentFace("normal");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none select-none">
      
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="mb-3 max-w-[200px] bg-zinc-950/95 border border-zinc-800 text-zinc-200 text-[11px] p-3 rounded-2xl shadow-xl pointer-events-auto relative text-center leading-relaxed"
          >
            {bubbleText}
            {/* Small speech arrow */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-950 border-r border-b border-zinc-800 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Robot Body */}
      <motion.div
        animate={isJumping ? { y: [-15, -40, 0] } : { y: [0, -8, 0] }}
        transition={
          isJumping
            ? { duration: 0.6, ease: "easeInOut" }
            : { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }
        className="pointer-events-auto cursor-pointer"
      >
        <motion.div
          animate={{ rotate: spinDegree }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleRobotClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col items-center justify-center p-3 rounded-2xl border border-brand-cyan/30 hover:border-brand-cyan bg-[#121212]/90 shadow-[0_0_20px_rgba(0,240,255,0.05)] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-300"
        >
          {/* Glowing Antenna */}
          <div className="w-1.5 h-3 bg-brand-cyan/60 rounded-t-full relative flex items-center justify-center mb-1">
            <span className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-brand-purple animate-ping opacity-75" />
            <span className="absolute -top-1 w-2 h-2 rounded-full bg-brand-cyan shadow-glow-cyan" />
          </div>

          {/* Robo screen / Head */}
          <div className="w-20 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center px-2 relative overflow-hidden">
            {/* Grid display line pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
            <span className="font-mono text-[11px] font-bold text-brand-cyan tracking-wider select-none">
              {FACES[currentFace]}
            </span>
          </div>

          {/* Little Robo Wheels / feet */}
          <div className="flex gap-4 mt-1.5">
            <div className="w-2.5 h-1.5 bg-zinc-800 rounded-full border border-zinc-700" />
            <div className="w-2.5 h-1.5 bg-zinc-800 rounded-full border border-zinc-700" />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
