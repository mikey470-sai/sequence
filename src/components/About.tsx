"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Award, BookOpen, CheckCircle, Phone, Trophy, Video } from "lucide-react";
import Image from "next/image";

interface SkillItem {
  name: string;
  percentage: number;
  icon: string;
}

const skills: SkillItem[] = [
  { name: "Python", percentage: 90, icon: "🐍" },
  { name: "Flask", percentage: 80, icon: "🧪" },
  { name: "MySQL", percentage: 75, icon: "🗄️" },
  { name: "React & JS", percentage: 85, icon: "⚛️" },
  { name: "AI Agent", percentage: 82, icon: "🤖" },
  { name: "Machine Learning", percentage: 80, icon: "🧠" },
  { name: "HTML & CSS", percentage: 85, icon: "🌐" }
];

export default function About() {
  const tableData = [
    { label: "Degree", value: "B.Tech – Computer Science (2026)", icon: <Award className="w-4 h-4 text-brand-cyan" /> },
    { label: "College", value: "Vignan's Institute of IT", icon: <BookOpen className="w-4 h-4 text-brand-cyan" /> },
    { label: "Location", value: "Visakhapatnam, India", icon: <MapPin className="w-4 h-4 text-brand-cyan" /> },
    { label: "Target City", value: "Bangalore,Hyderbad,Coimbatore", icon: <MapPin className="w-4 h-4 text-brand-purple" /> },
    { label: "Email", value: "nsai60224@email.com", icon: <Mail className="w-4 h-4 text-brand-cyan" /> },
    { label: "Phone", value: "+91 86399 74773", icon: <Phone className="w-4 h-4 text-brand-cyan" /> },
    { label: "Status", value: "Open to Work ✅", icon: <CheckCircle className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <section id="about" className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-zinc-950 overflow-hidden z-20">

      {/* Glow elements */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-display font-black text-5xl md:text-7xl text-zinc-900 leading-none">
            01
          </span>
          <div>
            <span className="text-brand-cyan font-mono text-[10px] tracking-widest uppercase block mb-1">
              [ WHO I AM ]
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight uppercase">
              ABOUT ME
            </h2>
          </div>
          <div className="flex-grow h-[1px] bg-zinc-900" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">

          {/* Column 1: Profile Photo Card */}
          <div className="lg:col-span-4 flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 bg-[#161616] group"
            >
              <Image
                src="/IMG-20260215-WA0016.jpg"
                alt="Sai Naidu"
                fill
                sizes="(max-width: 768px) 340px, 340px"
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 flex flex-col">
                <span className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase">
                  ROLE
                </span>
                <span className="text-white font-display font-bold text-sm tracking-wide uppercase">
                  Full Stack Dev
                </span>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Biography Text */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h3 className="font-display font-bold text-xl text-white mb-6 uppercase tracking-wide">
              Sai Naidu
            </h3>
            <div className="font-sans text-zinc-400 text-sm md:text-base leading-relaxed space-y-6 font-light">
              <p>
                Hello! I'm <strong className="text-brand-cyan font-medium">Sai Naidu</strong>, a Computer Science Engineering student at <strong className="text-white font-medium">Vignan's Institute of Information Technology</strong>, Visakhapatnam.
              </p>
              <p>
                I am highly passionate about <strong className="text-brand-cyan font-medium">Artificial Intelligence</strong>, <strong className="text-brand-purple font-medium">Machine Learning</strong>, <strong className="text-white font-medium">AI Agents</strong>, and <strong className="text-brand-cyan font-medium">Full Stack Development</strong>. I continuously learn modern technologies and build projects to strengthen my practical skills.
              </p>
              <p>
                When I'm not coding, I design cinematic AI art and edit videos. You can view my video editing portfolio here:
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              {/* Download Resume CTA */}
              <a
                href="/Sai_Kumaru_Resume_ai.pdf"
                download
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors duration-300 font-mono text-xs tracking-wider uppercase border border-brand-cyan/30 hover:border-brand-cyan/60 bg-brand-cyan/5 px-5 py-3 rounded-full w-fit pointer-events-auto shadow-glow-cyan/5 hover:shadow-glow-cyan/15"
              >
                <svg className="w-4 h-4 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Resume</span>
              </a>

              {/* Video Portfolio Link CTA */}
              <a
                href="https://portifilo-gamma.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300 font-mono text-xs tracking-wider uppercase border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 px-4 py-3 rounded-full w-fit pointer-events-auto"
              >
                <Video className="w-4 h-4 text-brand-purple" />
                <span>Video Editing Portfolio</span>
              </a>
            </div>
          </div>

          {/* Column 3: Info Table Card */}
          <div className="lg:col-span-4 w-full">
            <div className="glass-card rounded-2xl p-8 border border-zinc-900">
              <h4 className="font-display font-bold text-xs tracking-widest text-zinc-500 uppercase mb-6">
                [ PERSONAL CREDENTIALS ]
              </h4>
              <div className="divide-y divide-zinc-900">
                {tableData.map((row) => (
                  <div key={row.label} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {row.icon}
                      <span className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
                        {row.label}
                      </span>
                    </div>
                    <span className="text-zinc-300 font-sans text-xs md:text-sm font-light text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* SKILLS SUBSECTION */}
        <div id="skills" className="scroll-mt-24">

          {/* Sub Header */}
          <div className="flex items-center gap-6 mb-16">
            <span className="font-display font-black text-5xl md:text-7xl text-zinc-900 leading-none">
              02
            </span>
            <div>
              <span className="text-brand-purple font-mono text-[10px] tracking-widest uppercase block mb-1">
                [ TECH SPECTRUM ]
              </span>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight uppercase">
                SKILLS &amp; EXPERTISE
              </h3>
            </div>
            <div className="flex-grow h-[1px] bg-zinc-900" />
          </div>

          {/* Skills Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-xl p-6 border border-zinc-900/60"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={skill.name}>
                      {skill.icon}
                    </span>
                    <span className="font-display font-bold text-sm text-white uppercase tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-brand-cyan">{skill.percentage}%</span>
                </div>

                {/* Custom animated progress bar */}
                <div className="w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple shadow-glow-cyan"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
