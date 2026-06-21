"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/mikey470-sai",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/saikiran",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/naturethe_vibes",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative w-full bg-[#121212] pt-32 pb-16 px-6 md:px-12 lg:px-24 border-t border-zinc-900/80 z-20 overflow-hidden">

      {/* Glow accent */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-brand-cyan/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">

          {/* Biography Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-4 block">
              [ ABOUT ME ]
            </span>
            <p className="font-sans text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-8 max-w-md">
              A creative developer translating complex, pixel-perfect visuals into high-performance web systems. Operating at the junction of interactive design and hardware-accelerated code.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-brand-cyan hover:border-zinc-700 flex items-center justify-center text-zinc-400 transition-all duration-300 pointer-events-auto"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Inquiry Column */}
          <div id="about" className="lg:col-span-6 flex flex-col items-start lg:items-end justify-between">
            <div className="w-full max-w-md lg:text-right">
              <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-4 block">
                [ LET'S COLLABORATE ]
              </span>
              <h3 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase leading-none mb-6">
                HAVE A VISION? <br />
                <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
                  LET'S WORK TOGETHER.
                </span>
              </h3>
              <a
                href="mailto:nsai60224@email.com"
                className="inline-flex items-center gap-3 font-mono text-sm font-semibold tracking-wider text-brand-cyan border-b border-brand-cyan/20 hover:border-brand-cyan py-2 transition-all duration-300 pointer-events-auto shadow-glow-cyan/5"
              >
                <Mail className="w-4 h-4" />
                <span>nsai60224@email.com</span>
              </a>
            </div>

            {/* Back to top button */}
            <a
              href="#"
              onClick={handleScrollTop}
              className="mt-12 lg:mt-0 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 text-xs font-mono tracking-widest uppercase pointer-events-auto group"
            >
              <span>BACK TO TOP</span>
              <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center transition-all duration-300 group-hover:border-zinc-500 group-hover:text-brand-cyan">
                <ArrowUp className="w-4 h-4" />
              </div>
            </a>
          </div>

        </div>

        {/* Bottom border & copyright */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-8 border-t border-zinc-900/60 text-zinc-600 text-xs font-mono tracking-wider">
          <p>© 2026 Sai Naidu. Designed &amp; Built with ❤️</p>
          <p className="mt-4 md:mt-0 flex items-center gap-2">
            <span>BUILT WITH NEXT.JS 16 &amp; CANVAS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
