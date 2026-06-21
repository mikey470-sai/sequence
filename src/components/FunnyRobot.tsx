"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";

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
  const [isJumping, setIsJumping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Custom offset coordinates for screen dodging/movement
  const [positionOffset, setPositionOffset] = useState({ x: 0, y: 0 });

  // Scroll detection to display ONLY after scrolling past About section
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        // Visible when the bottom of About section is scrolled past the top of viewport
        if (rect.bottom < 120) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setShowBubble(false); // Hide bubble when invisible
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRobotClick = () => {
    // 1. Pick a random joke
    const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
    setBubbleText(randomJoke);
    setShowBubble(true);

    // 2. Dodge/Move to a random nearby position
    const randomX = Math.floor(Math.random() * 240) - 120; // -120px to +120px
    const randomY = Math.floor(Math.random() * 200) - 200; // -200px to 0px (vertical hop)
    setPositionOffset({ x: randomX, y: randomY });

    // 3. Spin robot on Y axis (3D feel) and jump state
    setSpinDegree((prev) => prev + 360);
    setIsJumping(true);
    setCurrentFace("excited");

    // 4. Reset jump and expression after action
    setTimeout(() => {
      setIsJumping(false);
      const faces: (keyof typeof FACES)[] = ["cool", "cute", "normal", "love"];
      setCurrentFace(faces[Math.floor(Math.random() * faces.length)]);
    }, 600);
  };

  const handleMouseEnter = () => {
    setCurrentFace("cute");
  };

  const handleMouseLeave = () => {
    setCurrentFace("normal");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none select-none"
        >
          
          {/* Animated Position Wrapper for dynamic flights */}
          <motion.div
            animate={{ x: positionOffset.x, y: positionOffset.y }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            className="flex flex-col items-end"
          >

            {/* Speech Bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="mb-3 max-w-[200px] bg-zinc-950/95 border border-zinc-800 text-zinc-200 text-[10px] p-3 rounded-2xl shadow-xl pointer-events-auto relative text-center leading-relaxed backdrop-blur-md"
                >
                  {bubbleText}
                  <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-950 border-r border-b border-zinc-800 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3D Perspective Container */}
            <div style={{ perspective: "800px" }}>
              
              {/* Floating Animation */}
              <motion.div
                animate={isJumping ? { y: [-15, -45, 0] } : { y: [0, -8, 0] }}
                transition={
                  isJumping
                    ? { duration: 0.6, ease: "easeInOut" }
                    : { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }
                className="pointer-events-auto cursor-pointer"
              >
                
                {/* 3D Isometric Card Container with rotation */}
                <motion.div
                  animate={{ rotateY: spinDegree }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleRobotClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateX(15deg) rotateY(-15deg)"
                  }}
                  className="relative flex flex-col items-center justify-center p-4 rounded-2xl border border-brand-cyan/40 hover:border-brand-cyan bg-[#141416]/90 shadow-[5px_5px_30px_rgba(0,0,0,0.5),_0_0_20px_rgba(0,240,255,0.06)] hover:shadow-[5px_5px_30px_rgba(0,0,0,0.5),_0_0_25px_rgba(0,240,255,0.25)] backdrop-blur-md transition-all duration-300"
                >
                  
                  {/* Glowing Antenna - translateZ for depth */}
                  <div 
                    style={{ transform: "translateZ(15px)" }}
                    className="w-1.5 h-3 bg-brand-cyan/60 rounded-t-full relative flex items-center justify-center mb-1.5"
                  >
                    <span className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-brand-purple animate-ping opacity-75" />
                    <span className="absolute -top-1 w-2 h-2 rounded-full bg-brand-cyan shadow-glow-cyan" />
                  </div>

                  {/* 3D Styled Robo Screen / Head */}
                  <div 
                    style={{ transform: "translateZ(30px)" }}
                    className="w-22 py-3 bg-[#0a0a0c] border border-zinc-800 rounded-xl flex items-center justify-center px-2 relative overflow-hidden shadow-inner"
                  >
                    {/* Retro line grid filter */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                    
                    <span className="font-mono text-[11px] font-bold text-brand-cyan tracking-wider select-none filter drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
                      {FACES[currentFace]}
                    </span>
                  </div>

                  {/* Robo Wheels / feet - translateZ for depth */}
                  <div 
                    style={{ transform: "translateZ(10px)" }}
                    className="flex gap-4 mt-2"
                  >
                    <div className="w-3 h-2 bg-zinc-800 rounded-full border border-zinc-700 shadow-md" />
                    <div className="w-3 h-2 bg-zinc-800 rounded-full border border-zinc-700 shadow-md" />
                  </div>

                </motion.div>

              </motion.div>
            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
