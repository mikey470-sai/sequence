"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  icon: string;
  link: string;
  gitLink: string;
  accent: string;
}

const projects: ProjectItem[] = [
  {
    id: "01",
    title: "RTO Prediction Engine",
    category: "MACHINE LEARNING · FASTAPI",
    description: "Predicts vehicle registration trends using LightGBM. Integrated into a microservice deployed on Railway with MLflow tracking and Docker containerization.",
    tags: ["LightGBM", "FastAPI", "Railway", "MLflow", "Docker"],
    image: "/project_rto.png",
    icon: "🚗",
    link: "https://mikey470-sai.github.io/rto-prediction/",
    gitLink: "https://github.com/mikey470-sai",
    accent: "from-brand-cyan to-brand-purple",
  },
  {
    id: "02",
    title: "ML-Powered Data Pipeline",
    category: "DATA PIPELINE · REST API",
    description: "End-to-end processing pipeline handling 50,000+ records. Features Random Forest & SVM classifiers, OpenCV pre-processing, and automated database retraining.",
    tags: ["Scikit-learn", "Flask", "OpenCV", "PostgreSQL"],
    image: "/project_pipeline.png",
    icon: "🧠",
    link: "/projects/pipeline",
    gitLink: "https://github.com/mikey470-sai",
    accent: "from-brand-purple to-brand-accent",
  },
  {
    id: "03",
    title: "Real-Time Analytics Dashboard",
    category: "WEBSOCKETS · CACHING",
    description: "Bi-directional WebSocket server handling 200+ concurrent live analytics streams. Achieves sub-50ms message delivery via optimized in-memory cache structures.",
    tags: ["Flask-SocketIO", "WebSockets", "JWT Auth", "Docker", "Nginx"],
    image: "/project_analytics.png",
    icon: "📊",
    link: "/projects/analytics",
    gitLink: "https://github.com/mikey470-sai",
    accent: "from-emerald-400 to-brand-cyan",
  },
  {
    id: "04",
    title: "Microservices Backend",
    category: "SYSTEM ARCHITECTURE",
    description: "Distributed e-commerce architecture containing isolated microservices (User, Product, Order, Payment) with a centralized API gateway and distributed rollback.",
    tags: ["Microservices", "FastAPI", "Docker", "GitHub Actions"],
    image: "/project_microservices.png",
    icon: "🛒",
    link: "/projects/microservices",
    gitLink: "https://github.com/mikey470-sai",
    accent: "from-amber-400 to-brand-accent",
  },
  {
    id: "05",
    title: "Sentiment Analyzer",
    category: "NATURAL LANGUAGE PROCESSING",
    description: "Classifies 50,000 IMDB movie reviews as positive/negative using TF-IDF vectorization with Logistic Regression (90.21% accuracy) and Naive Bayes.",
    tags: ["NLP", "NLTK", "Scikit-learn", "TF-IDF"],
    image: "/project_sentiment.png",
    icon: "🎬",
    link: "/projects/sentiment",
    gitLink: "https://github.com/mikey470-sai/imdb-sentiment-analysis",
    accent: "from-red-500 to-brand-purple",
  },
  {
    id: "06",
    title: "Customer Churn Analysis",
    category: "DATA SCIENCE · EDA",
    description: "Full exploratory data analysis on 7,043 telecom accounts. Highlights key high-risk bands and predicts customer churn patterns via tenure matrices.",
    tags: ["EDA", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
    image: "/project_churn.png",
    icon: "📊",
    link: "/projects/churn",
    gitLink: "https://github.com/mikey470-sai",
    accent: "from-blue-500 to-emerald-400",
  },
  {
    id: "07",
    title: "CrowdWatch Stadium Monitor",
    category: "COMPUTER VISION",
    description: "Real-time crowd occupancy analysis system utilizing YOLOv8 object detection, structured with a React dashboard and high-performance FastAPI server.",
    tags: ["YOLOv8", "Computer Vision", "React", "PostgreSQL", "FastAPI"],
    image: "/project_crowdwatch.png",
    icon: "👁️",
    link: "/projects/crowdwatch",
    gitLink: "https://github.com/mikey470-sai",
    accent: "from-brand-cyan to-indigo-500",
  },
  {
    id: "08",
    title: "NOPhish Link Detector",
    category: "BROWSER SECURITY",
    description: "Browser extension tool for real-time phishing URL detection using static analysis logic. Client-side execution without external server calls.",
    tags: ["Vanilla JS", "Browser API", "HTML5", "CSS3 Reset"],
    image: "/project_nophish.png",
    icon: "🛡️",
    link: "/projects/nophish",
    gitLink: "https://github.com/mikey470-sai/NOPhish",
    accent: "from-teal-400 to-brand-cyan",
  },
  {
    id: "09",
    title: "Task Management System",
    category: "COLLABORATIVE WORKSPACE",
    description: "Interactive task manager featuring Kanban board workflows, task status updates, team assignment tools, and progress reporting metrics.",
    tags: ["React", "Python", "FastAPI", "SQLAlchemy", "Tailwind CSS"],
    image: "/project_taskmanager.png",
    icon: "📋",
    link: "https://task-manager-blush-alpha.vercel.app/login",
    gitLink: "https://github.com/mikey470-sai/task-manager",
    accent: "from-indigo-500 to-brand-purple",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-[#121212] overflow-hidden z-20 scroll-mt-24">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] rounded-full bg-brand-cyan/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] rounded-full bg-brand-purple/3 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-display font-black text-5xl md:text-7xl text-zinc-900 leading-none">
            03
          </span>
          <div>
            <span className="text-brand-cyan font-mono text-[10px] tracking-widest uppercase block mb-1">
              [ PORTFOLIO WORKS ]
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight uppercase">
              SELECTED PROJECTS
            </h2>
          </div>
          <div className="flex-grow h-[1px] bg-zinc-900" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="group glass-card rounded-2xl overflow-hidden flex flex-col relative"
            >
              {/* Project Cover Panel */}
              <div className="relative w-full h-[200px] overflow-hidden bg-zinc-950 flex items-center justify-center">
                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
                  </>
                ) : (
                  // Holographic gradient fallback for text projects
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/50" />
                    {/* Glowing colored core */}
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${project.accent} opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500`} />
                    <div className="relative w-16 h-16 rounded-full border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:border-zinc-700 transition-all duration-300">
                      <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        {project.icon}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Floating Indicator */}
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-wider text-zinc-400 bg-zinc-950/80 border border-zinc-900 px-2.5 py-1 rounded-full">
                  PROJECT {project.id}
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-zinc-900/10 to-[#121212]">
                
                {/* Visual Category Label */}
                <span className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase mb-2 block">
                  {project.category}
                </span>

                {/* Project Title */}
                <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-brand-cyan transition-colors duration-300 uppercase tracking-wide">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 font-sans text-xs leading-relaxed mb-6 font-light flex-grow">
                  {project.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-zinc-500 font-mono text-[9px] bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-900 mt-auto">
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors duration-300 text-[10px] font-mono tracking-wider uppercase pointer-events-auto"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>Source Code</span>
                  </a>
                  
                  {project.link.startsWith("/") ? (
                    <Link
                      href={project.link}
                      className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors duration-300 text-xs font-semibold pointer-events-auto group/btn"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brand-cyan transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors duration-300 text-xs font-semibold pointer-events-auto group/btn"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brand-cyan transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
