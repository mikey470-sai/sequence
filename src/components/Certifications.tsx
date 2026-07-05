"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";

export default function Certifications() {
  const certificationsList = [
    { title: "Relational Database Basics", organization: "FreeCodeCamp / Database Training" },
    { title: "Data Analytics on AWS", organization: "Amazon Web Services (AWS)" },
    { title: "Switching, Routing & Wireless Essentials", organization: "Cisco Networking Academy" },
    { title: "Introduction to Networks", organization: "Cisco Networking Academy" },
    { title: "Core Organising Team Member", organization: "College Tech Events (Vignan)" }
  ];

  const achievementsList = [
    { title: "NCC Certification (13A Batch)", detail: "Completed national cadet corps training modules" },
    { title: "Hackathon Organizer & Developer", detail: "Coordinated and developed projects for college hackathons" },
    { title: "CodeChef 1-Star Rating", detail: "Active competitive coder on the CodeChef platform" }
  ];

  return (
    <section 
      id="certifications" 
      className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-zinc-950 overflow-hidden z-20"
    >
      
      {/* 3D Perspective Grid Background (Static, No Animation) */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          perspective: "1000px",
          transformStyle: "preserve-3d",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
            backgroundImage: `
              linear-gradient(to right, rgba(0, 240, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(189, 0, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: "rotateX(55deg) translateZ(-160px)",
            maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
      </div>

      {/* Decorative glows */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-brand-cyan/2 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-brand-purple/2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-display font-black text-5xl md:text-7xl text-zinc-900 leading-none">
            03
          </span>
          <div>
            <span className="text-brand-cyan font-mono text-[10px] tracking-widest uppercase block mb-1">
              [ CREDENTIALS &amp; MILESTONES ]
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight uppercase">
              CERTIFICATIONS &amp; ACHIEVEMENTS
            </h2>
          </div>
          <div className="flex-grow h-[1px] bg-zinc-900" />
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Certifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 border border-zinc-900/60"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/35 flex items-center justify-center text-brand-cyan">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                Certifications
              </h3>
            </div>
            
            <ul className="space-y-6">
              {certificationsList.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="text-brand-cyan text-base leading-none select-none mt-1">•</span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-zinc-200 uppercase tracking-wide">
                      {cert.title}
                    </h4>
                    <p className="font-sans text-xs text-zinc-500 font-light mt-0.5">
                      {cert.organization}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Achievements Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-8 border border-zinc-900/60"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/35 flex items-center justify-center text-brand-purple">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                Achievements
              </h3>
            </div>
            
            <ul className="space-y-6">
              {achievementsList.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="text-brand-purple text-base leading-none select-none mt-1">•</span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-zinc-200 uppercase tracking-wide">
                      {ach.title}
                    </h4>
                    <p className="font-sans text-xs text-zinc-500 font-light mt-0.5">
                      {ach.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
