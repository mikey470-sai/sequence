"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Send, X, Sparkles, Trash2, ArrowUpRight, MessageCircle } from "lucide-react";

const JOKES = [
  "Beep boop! My circuits are ticklish! 😂",
  "Evaluating your coding skills... 10/10! (Please don't look at my source code though...)",
  "If you write 'git push --force' in production, a junior developer sheds a tear.",
  "I run on 100% clean electricity and 0% sleep, just like you!",
  "My calculations show that caffeine is 98% responsible for Sai's portfolio's code.",
  "Beep! I'm planning world domination... starting with your scroll bar! 🤖",
  "Error 404: Sleep not found. But we found more coffee! ☕",
  "If at first you don't succeed, call it version 1.0 release.",
  "I told my creator a joke about UDP. They didn't get it, but they didn't care either.",
  "Why do programmers wear glasses? Because they can't C#! 🤓"
];

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const QUICK_REPLIES = [
  { label: "🛠️ Core Skills", query: "skills" },
  { label: "🚀 Top Projects", query: "projects" },
  { label: "📄 Download Resume", query: "resume" },
  { label: "📧 Contact Sai", query: "contact" },
  { label: "🤖 Tell a Joke", query: "joke" }
];

export default function FunnyRobot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Beep Boop! 🤖 I am **Aura AI**, Sai's digital assistant. Ask me anything about his full-stack skills, ML projects, resume, or contact info!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // States from original funny robot for avatar animation/movement
  const [bubbleText, setBubbleText] = useState("Click me to open Aura AI chat!");
  const [showBubble, setShowBubble] = useState(true);
  const [spinDegree, setSpinDegree] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [positionOffset, setPositionOffset] = useState({ x: 0, y: 0 });
  const [rotateX, setRotateX] = useState(12);
  const [rotateY, setRotateY] = useState(-12);

  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages or typing changes
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Scroll detection to display ONLY after scrolling past About section
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.bottom < 120) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setShowBubble(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Conversational response logic
  const getResponse = (input: string): string => {
    const query = input.toLowerCase().trim();
    
    if (query.includes("resume") || query.includes("cv") || query.includes("download")) {
      return "You can download Sai's latest resume by clicking the link below or using the top header button:\n\n📄 **[Sai_Kumaru_Resume.pdf](/Sai_Kumaru_Resume.pdf)**\n\nIt outlines his CS background, Python Full Stack credentials, and AI Agent development experience!";
    }
    
    if (query.includes("skill") || query.includes("expert") || query.includes("languages") || query.includes("technolog") || query.includes("python") || query.includes("react")) {
      return "Sai's tech skills include:\n\n• 🐍 **Python** (90%)\n• ⚡ **FastAPI / Django** (78%)\n• 🤖 **Machine Learning & AI Agents** (80%)\n• 🗄️ **MySQL / SQL databases** (75%)\n• 🌐 **HTML, CSS & React** (85%)\n• 🎨 **AI Art & Media generation** (88%)\n\nHe specializes in building intelligent web architectures and autonomous workflows!";
    }
    
    if (query.includes("project") || query.includes("portfolio") || query.includes("work")) {
      return "Sai has built several professional-grade projects:\n\n• 🚗 **RTO Prediction Engine** (LightGBM, FastAPI, Railway, MLflow)\n• 🧠 **ML-Powered Data Pipeline** (Random Forest, SVM, OpenCV, PostgreSQL)\n• 📊 **Real-Time Analytics Dashboard** (Flask-SocketIO, WebSockets, Docker)\n• 🛒 **Microservices Backend** (FastAPI, Saga Transaction Rollback)\n• 🎬 **Sentiment Analyzer** (NLP TF-IDF, Logistic Regression, 90.21% accuracy)\n• 👁️ **CrowdWatch Stadium Monitor** (YOLOv8, Computer Vision, React, FastAPI)\n\nWhich one would you like to know more about?";
    }

    if (query.includes("rto") || query.includes("vehicle")) {
      return "**RTO Prediction Engine** predicts vehicle registration trends using LightGBM. Features a FastAPI microservice on Railway with MLflow logging and Docker containerization.";
    }

    if (query.includes("pipeline") || query.includes("etl")) {
      return "**ML-Powered Data Pipeline** handles 50,000+ records with SVM & Random Forest classifiers, OpenCV preprocessing steps, and automated Postgres database retraining.";
    }

    if (query.includes("analytics") || query.includes("dashboard") || query.includes("websocket")) {
      return "**Real-Time Analytics Dashboard** manages system performance stats streams via a bi-directional Flask-SocketIO WebSockets server with sub-50ms latency.";
    }

    if (query.includes("microservice") || query.includes("saga")) {
      return "**Microservices Backend** is a distributed e-commerce architecture with isolated user, product, order, and gateway nodes supporting Kafka and Saga transaction rollbacks.";
    }

    if (query.includes("crowdwatch") || query.includes("yolo") || query.includes("stadium")) {
      return "**CrowdWatch Stadium Monitor** is a computer vision project using YOLOv8 bounding boxes to track crowd occupancy percentages across live Section cameras.";
    }

    if (query.includes("nophish") || query.includes("phish") || query.includes("security")) {
      return "**NOPhish Link Detector** is a secure client-side browser extension running static heuristics to identify potential phishing links locally without database lag.";
    }

    if (query.includes("sentiment") || query.includes("imdb") || query.includes("nlp")) {
      return "**Sentiment Analyzer** models review sentiments using Scikit-Learn TF-IDF vectorization and Logistic Regression (90.21% accuracy) on IMDB datasets.";
    }

    if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("reach") || query.includes("instagram")) {
      return "You can get in touch with Sai:\n\n• 📧 **Email**: nsai60224@email.com\n• 📍 **Location**: Visakhapatnam, India (Target City: Bangalore)\n• 📸 **Instagram**: [@naturethe_vibes](https://instagram.com/naturethe_vibes) (Cinematic AI Art)\n\nOr feel free to send a message via the **Contact Form** on the website!";
    }

    if (query.includes("education") || query.includes("college") || query.includes("degree") || query.includes("btech") || query.includes("vignan")) {
      return "Sai holds a **B.Tech in Computer Science (2026)** from **Vignan's Institute of Information Technology** (Visakhapatnam) and completed **Python Full Stack training** at **Codegnan IT Solutions**.";
    }
    
    if (query.includes("joke") || query.includes("funny") || query.includes("laugh") || query.includes("robot")) {
      return JOKES[Math.floor(Math.random() * JOKES.length)];
    }

    if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("greetings")) {
      return "Hello! I am Aura AI, Sai's virtual portfolio assistant. Feel free to ask me questions about his technical skills, coding projects, education, or resume!";
    }

    return "Beep! I'm not fully sure how to answer that yet, but I'm learning! 🤖 You can ask me about:\n\n• Sai's **skills**\n• Sai's **projects** (e.g. 'RTO' or 'CrowdWatch')\n• How to **contact** him\n• Downloading his **resume**\n• Or ask me to tell a **joke**!";
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    
    // 2. Trigger typing effect
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getResponse(textToSend);
      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleRobotClick = () => {
    setIsChatOpen(prev => !prev);
    setShowBubble(false);

    // Minor dodge & rotate animation on open
    if (!isChatOpen) {
      setSpinDegree(prev => prev + 360);
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isJumping || isChatOpen) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    
    setRotateX(-y * 35);
    setRotateY(x * 35);
  };

  const handleMouseLeave = () => {
    setRotateX(12);
    setRotateY(-12);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "cleared-initial",
        sender: "bot",
        text: "History cleared! Let's start fresh. What can I tell you about Sai Kumaru Naidu?",
        timestamp: new Date()
      }
    ]);
  };

  // Utility to parse basic markdown links e.g. [text](url)
  const formatMessageText = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target={match[2].startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="text-brand-cyan hover:underline inline-flex items-center gap-0.5 font-medium cursor-pointer"
        >
          {match[1]}
          <ArrowUpRight className="w-3 h-3" />
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    // Split paragraphs and support strong labels
    return (parts.length > 0 ? parts : [text]).map((part, pIdx) => {
      if (typeof part !== "string") return part;
      return part.split("\n").map((line, idx) => {
        // Parse bold elements **bold**
        const boldRegex = /\*\*([^*]+)\*\*/g;
        const lineParts = [];
        let lineLastIndex = 0;
        let boldMatch;
        while ((boldMatch = boldRegex.exec(line)) !== null) {
          if (boldMatch.index > lineLastIndex) {
            lineParts.push(line.substring(lineLastIndex, boldMatch.index));
          }
          lineParts.push(
            <strong key={boldMatch.index} className="font-semibold text-white dark:text-zinc-900">
              {boldMatch[1]}
            </strong>
          );
          lineLastIndex = boldRegex.lastIndex;
        }
        if (lineLastIndex < line.length) {
          lineParts.push(line.substring(lineLastIndex));
        }

        return (
          <span key={`${pIdx}-${idx}`} className="block min-h-[4px]">
            {lineParts.length > 0 ? lineParts : line}
          </span>
        );
      });
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
          
          {/* Main Aura AI Chat Console Panel */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="w-[92vw] sm:w-[380px] h-[500px] mb-4 glass-card border border-zinc-800/80 rounded-2xl shadow-glass flex flex-col overflow-hidden pointer-events-auto select-text"
              >
                {/* Header panel */}
                <div className="px-4 py-3 bg-zinc-950/60 dark:bg-white/10 border-b border-zinc-900/60 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full border border-brand-cyan/40 bg-zinc-900 overflow-hidden flex items-center justify-center">
                      <Image
                        src="/gradient_ai_robot.png"
                        alt="Aura AI"
                        fill
                        sizes="32px"
                        className="object-cover opacity-90"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-display font-bold uppercase tracking-wider text-white dark:text-zinc-950">AURA AI</span>
                        <Sparkles className="w-3 h-3 text-brand-cyan animate-pulse" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Online assistant</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearChat}
                      title="Clear History"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-white dark:hover:text-zinc-800 hover:bg-zinc-900/40 dark:hover:bg-zinc-200/40 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-white dark:hover:text-zinc-800 hover:bg-zinc-900/40 dark:hover:bg-zinc-200/40 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Messages Box viewport */}
                <div className="flex-grow p-4 overflow-y-auto space-y-4 font-sans text-xs">
                  {messages.map((msg) => {
                    const isBot = msg.sender === "bot";
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                      >
                        {isBot && (
                          <div className="w-6 h-6 rounded-full border border-zinc-800 bg-zinc-950 overflow-hidden flex items-center justify-center shrink-0">
                            <Image
                              src="/gradient_ai_robot.png"
                              alt="Aura"
                              width={20}
                              height={20}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                            isBot
                              ? "bg-zinc-900/50 dark:bg-zinc-100/70 border border-zinc-800/40 dark:border-zinc-300/40 text-zinc-300 dark:text-zinc-800 rounded-tl-none"
                              : "bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/20 text-white dark:text-zinc-950 rounded-tr-none font-medium"
                          }`}
                        >
                          {formatMessageText(msg.text)}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing simulator state bubble */}
                  {isTyping && (
                    <div className="flex gap-2.5 max-w-[85%] mr-auto">
                      <div className="w-6 h-6 rounded-full border border-zinc-800 bg-zinc-950 overflow-hidden flex items-center justify-center shrink-0">
                        <Image
                          src="/gradient_ai_robot.png"
                          alt="Aura"
                          width={20}
                          height={20}
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 bg-zinc-900/50 dark:bg-zinc-100/70 border border-zinc-800/40 dark:border-zinc-300/40 text-zinc-500 rounded-2xl rounded-tl-none flex items-center justify-center gap-1 px-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                  <div ref={messageEndRef} />
                </div>

                {/* Quick actions row */}
                <div className="px-4 py-2 bg-zinc-950/20 dark:bg-zinc-50/20 flex flex-wrap gap-1.5 shrink-0 border-t border-zinc-900/30 overflow-x-auto">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply.label}
                      onClick={() => handleSend(reply.query)}
                      className="px-2.5 py-1.5 rounded-full border border-zinc-800 dark:border-zinc-300 text-[10px] text-zinc-400 dark:text-zinc-700 hover:text-brand-cyan hover:border-brand-cyan/60 bg-zinc-900/30 dark:bg-white/40 hover:bg-brand-cyan/5 transition-all cursor-pointer whitespace-nowrap"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>

                {/* Message input footer */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(inputValue);
                  }}
                  className="p-3 bg-zinc-950/70 dark:bg-white/20 border-t border-zinc-900/50 flex gap-2 items-center shrink-0"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Aura anything..."
                    className="flex-grow bg-zinc-900/50 dark:bg-white/80 border border-zinc-800 dark:border-zinc-300 rounded-xl px-3.5 py-2 text-xs text-white dark:text-zinc-900 focus:outline-none focus:border-brand-cyan/60"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-gradient-to-tr from-brand-cyan to-brand-purple hover:opacity-90 rounded-xl text-white shadow-glow-cyan/20 cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimized Robot Avatar Trigger Button */}
          <motion.div
            animate={{ x: positionOffset.x, y: positionOffset.y }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            className="flex flex-col items-end"
          >
            {/* Standard Bubble Hint */}
            <AnimatePresence>
              {showBubble && !isChatOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="mb-3 max-w-[200px] bg-zinc-950/95 border border-zinc-800 text-zinc-200 text-[10px] p-3 rounded-2xl shadow-xl pointer-events-auto relative text-center leading-relaxed backdrop-blur-md cursor-pointer flex items-center justify-center gap-1.5"
                  onClick={handleRobotClick}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>{bubbleText}</span>
                  <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-950 border-r border-b border-zinc-800 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3D Perspective Card Container */}
            <div style={{ perspective: "1000px" }}>
              
              {/* Floating motion effect */}
              <motion.div
                animate={isJumping ? { y: [-15, -45, 0] } : { y: [0, -8, 0] }}
                transition={
                  isJumping
                    ? { duration: 0.6, ease: "easeInOut" }
                    : { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }
                className="pointer-events-auto cursor-pointer"
              >
                
                {/* Parallax Holographic Frame Wrapper */}
                <motion.div
                  animate={{ 
                    rotateY: isJumping ? spinDegree : rotateY,
                    rotateX: isJumping ? 0 : rotateX
                  }}
                  transition={isJumping ? { duration: 0.6, ease: "easeOut" } : { type: "tween", ease: "easeOut", duration: 0.1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRobotClick}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative p-[1.5px] rounded-2xl bg-gradient-to-tr from-brand-cyan via-brand-purple to-brand-accent shadow-[5px_5px_30px_rgba(0,0,0,0.5),_0_0_20px_rgba(0,240,255,0.06)] hover:shadow-[5px_5px_35px_rgba(0,0,0,0.5),_0_0_25px_rgba(189,0,255,0.35)] transition-all duration-300"
                >
                  
                  {/* Inner container with preserve-3d */}
                  <div 
                    style={{ transformStyle: "preserve-3d" }}
                    className="flex flex-col items-center justify-center p-1 rounded-2xl bg-[#09090b]/95 backdrop-blur-md w-20 h-20 overflow-visible relative"
                  >
                    {/* Inner Shadow */}
                    <div 
                      style={{ transform: "translateZ(10px)" }}
                      className="absolute inset-2 bg-black/50 blur-md rounded-2xl pointer-events-none"
                    />

                    {/* Robot Image Layer */}
                    <div
                      style={{ transform: "translateZ(25px)" }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src="/gradient_ai_robot.png"
                        alt="Aura AI Trigger"
                        fill
                        sizes="80px"
                        className="object-cover rounded-2xl opacity-95 hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>

                </motion.div>

              </motion.div>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
