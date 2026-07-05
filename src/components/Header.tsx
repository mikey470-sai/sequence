"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      setTheme("dark");
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.startsWith("#") ? href.slice(1) : href;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "py-4 bg-[#121212]/75 border-b border-zinc-900/60 backdrop-blur-md"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 group pointer-events-auto"
        >
          <span className="font-display font-black text-xl tracking-tighter text-white group-hover:text-brand-cyan transition-colors duration-300">
            SAI<span className="text-brand-cyan">.</span>
          </span>
        </a>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300 relative py-1 group pointer-events-auto"
            >
              {link.name}
              {/* Sleek bottom slide-in line */}
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-cyan scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
            </a>
          ))}
          {/* Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full p-1 border transition-colors duration-300 flex items-center cursor-pointer pointer-events-auto relative focus:outline-none ${
              theme === "dark" ? "bg-zinc-950 border-zinc-800" : "bg-zinc-200 border-zinc-300"
            }`}
            aria-label="Toggle Theme Mode"
          >
            <Sun className={`w-3 h-3 absolute left-1.5 transition-opacity duration-300 ${theme === "dark" ? "opacity-30 text-zinc-600" : "opacity-0"}`} />
            <Moon className={`w-3 h-3 absolute right-1.5 transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-30 text-zinc-500"}`} />
            
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              className={`w-4 h-4 rounded-full flex items-center justify-center shadow-md absolute ${
                theme === "dark" ? "left-1 bg-brand-purple text-white" : "right-1 bg-brand-cyan text-[#121212]"
              }`}
            >
              {theme === "dark" ? (
                <Moon className="w-2.5 h-2.5 text-white fill-current" />
              ) : (
                <Sun className="w-2.5 h-2.5 text-[#121212]" />
              )}
            </motion.div>
          </button>
          
          <a
            href="/Sai_Kumaru_resume.pdf"
            download
            className="text-xs font-semibold tracking-wider text-brand-purple font-mono border border-brand-purple/30 hover:border-brand-purple bg-brand-purple/5 hover:bg-brand-purple/15 px-4 py-2 rounded-full transition-all duration-300 pointer-events-auto shadow-glow-purple/10 hover:shadow-glow-purple"
          >
            RESUME ↴
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="text-xs font-semibold tracking-wider text-brand-cyan font-mono border border-brand-cyan/30 hover:border-brand-cyan bg-brand-cyan/5 hover:bg-brand-cyan/15 px-4 py-2 rounded-full transition-all duration-300 pointer-events-auto shadow-glow-cyan/10 hover:shadow-glow-cyan"
          >
            GET IN TOUCH
          </a>
        </nav>

        {/* Mobile menu trigger and toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full p-1 border transition-colors duration-300 flex items-center cursor-pointer pointer-events-auto relative focus:outline-none ${
              theme === "dark" ? "bg-zinc-950 border-zinc-800" : "bg-zinc-200 border-zinc-300"
            }`}
            aria-label="Toggle Theme Mode"
          >
            <Sun className={`w-3 h-3 absolute left-1.5 transition-opacity duration-300 ${theme === "dark" ? "opacity-30 text-zinc-600" : "opacity-0"}`} />
            <Moon className={`w-3 h-3 absolute right-1.5 transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-30 text-zinc-500"}`} />
            
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              className={`w-4 h-4 rounded-full flex items-center justify-center shadow-md absolute ${
                theme === "dark" ? "left-1 bg-brand-purple text-white" : "right-1 bg-brand-cyan text-[#121212]"
              }`}
            >
              {theme === "dark" ? (
                <Moon className="w-2.5 h-2.5 text-white fill-current" />
              ) : (
                <Sun className="w-2.5 h-2.5 text-[#121212]" />
              )}
            </motion.div>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="text-zinc-400 hover:text-white focus:outline-none pointer-events-auto"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Backdrop & Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] h-[calc(100vh-60px)] bg-[#121212] z-30 flex flex-col items-center justify-center gap-8 md:hidden px-6 animate-fade-in border-t border-zinc-900">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { setMobileMenuOpen(false); handleScrollTo(e, link.href); }}
              className="text-2xl font-display font-bold text-zinc-300 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/Sai_Kumaru_resume.pdf"
            download
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold tracking-wider text-brand-purple font-mono border border-brand-purple/40 bg-brand-purple/5 px-6 py-3 rounded-full mt-4"
          >
            DOWNLOAD RESUME ↴
          </a>
          <a
            href="#contact"
            onClick={(e) => { setMobileMenuOpen(false); handleScrollTo(e, "#contact"); }}
            className="text-sm font-semibold tracking-wider text-brand-cyan font-mono border border-brand-cyan/40 bg-brand-cyan/5 px-6 py-3 rounded-full mt-2"
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </header>
  );
}
