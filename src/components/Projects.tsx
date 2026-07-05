"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles, Terminal, Play, Check, ChevronRight, MessageSquare, Bot } from "lucide-react";
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



interface ProjectDetailData {
  summary: string;
  stats: { label: string; value: string }[];
  insights: string;
  architecture: string[];
}

const projectDetailsData: Record<string, ProjectDetailData> = {
  "01": {
    summary: "A high-performance vehicle registration prediction service utilizing LightGBM algorithms. Deployed as an isolated FastAPI microservice, it processes regional registry backlogs and projects future vehicle acquisition trends with extreme speed.",
    stats: [
      { label: "LightGBM Accuracy", value: "87.4%" },
      { label: "Prediction Latency", value: "<12ms" },
      { label: "Hyperparameter Runs", value: "42 tracked" }
    ],
    insights: "LightGBM outperforms deep neural networks for tabular datasets. By combining histogram-based splits and gradient-based leaf growth, it yields high predictive speed while maintaining a minimal CPU footprint.",
    architecture: ["LightGBM Classifier", "FastAPI microservice endpoints", "MLflow tracking registry", "Docker Containerization", "Railway Deployment"]
  },
  "02": {
    summary: "Automated end-to-end data pipelines for continuous ETL ingestion. Implements image binarization and thresholding via OpenCV, feeds normalized feature vectors to Random Forest / SVM classifiers, and triggers automated database sync.",
    stats: [
      { label: "Volume Handled", value: "50,000+ recs" },
      { label: "Retraining Cycle", value: "Daily (Auto)" },
      { label: "F1 Validation Score", value: "93.4%" }
    ],
    insights: "Using OpenCV thresholding filters out background noise from scan files, yielding much cleaner feature vectors. The pipeline automatically evaluates validation score drift before committing weights to production.",
    architecture: ["OpenCV Binarization", "Scikit-Learn Classifier Folds", "SQLAlchemy ORM Data Store", "PostgreSQL database engine"]
  },
  "03": {
    summary: "A WebSockets dashboard displaying telemetry metrics stream. Employs bi-directional Flask-SocketIO event handlers running on eventlet-coroutine workers to process concurrent signals without threading locks.",
    stats: [
      { label: "Bi-directional Latency", value: "<50ms" },
      { label: "Max Concurrent Streams", value: "200+" },
      { label: "Memory Overhead", value: "Minimal" }
    ],
    insights: "Standard HTTP polling creates severe database load. Event-driven Socket.IO channels establish persistent TCP handshakes, broadcasting connection metrics with sub-50ms round-trips.",
    architecture: ["Flask-SocketIO Server", "Bi-directional WebSocket Protocol", "JWT Session authorization", "Nginx reverse proxy buffer", "Docker compose stacks"]
  },
  "04": {
    summary: "A decoupled, resilient e-commerce backend built with isolated services. Implements the Saga orchestration pattern with manual/auto rollback handlers, preventing database inconsistencies during network disruptions.",
    stats: [
      { label: "Microservices", value: "4 decoupled nodes" },
      { label: "Rollback Reliability", value: "100% (Saga)" },
      { label: "Coverage", value: "92.3% unit tests" }
    ],
    insights: "Distributed transactions cannot rely on standard database locks. Saga orchestrates local database commits sequentially; if a step (e.g. Payment) fails, matching compensation APIs execute rollback queries.",
    architecture: ["FastAPI Service Engines", "SQLAlchemy Session Isolation", "Central API Routing Gateway", "Saga Orchestrator Workflow"]
  },
  "05": {
    summary: "High-accuracy natural language classifier model trained on 50,000 IMDB records. Evaluates word frequency patterns and produces immediate positive or negative labels using optimized Logistic Regression models.",
    stats: [
      { label: "Logistic Accuracy", value: "90.21%" },
      { label: "Vocabulary Size", value: "25,000 tokens" },
      { label: "Classification Latency", value: "0.2ms" }
    ],
    insights: "Applying TF-IDF limits the importance of common English words (like 'the', 'is'), highlighting sentiment-bearing terms (like 'stellar', 'dreadful') to achieve 90.21% test accuracy.",
    architecture: ["NLTK Regex Tokenizer", "TF-IDF Vectorization", "Logistic Regression Classifiers", "Naive Bayes comparison controls"]
  },
  "06": {
    summary: "A data science exploratory analysis mapping customer churn predictors for 7,043 telecom accounts. Builds demographic, billing, and subscription matrices to identify churn warning correlations.",
    stats: [
      { label: "Sample size", value: "7,043 clients" },
      { label: "Plots Generated", value: "15+ seaborn maps" },
      { label: "Key churn risk factor", value: "Month-to-month" }
    ],
    insights: "Exploratory plots reveal that month-to-month contract holders with paperless billing are the highest risk churn sector. Promoting long-term contracts can reduce churn risk by up to 70%.",
    architecture: ["Pandas Data manipulation", "NumPy Matrix computing", "Seaborn/Matplotlib maps", "Correlation metrics"]
  },
  "07": {
    summary: "Computer vision occupancy tracker integrating YOLOv8 model layers. Analyzes camera feeds to detect individual humans and reports section-by-section seat filling metrics in real-time.",
    stats: [
      { label: "Inference Speed", value: "30 FPS" },
      { label: "YOLO Layer Confidence", value: "91.5%" },
      { label: "API payload delivery", value: "Instant JSON" }
    ],
    insights: "YOLOv8 runs deep convolutional neural networks directly on image frames to locate bounding boxes. Our FastAPI wrapper caches counts before delivering to the React frontend.",
    architecture: ["YOLOv8 medium models", "OpenCV frame buffers", "FastAPI analytics endpoints", "React client viewboards"]
  },
  "08": {
    summary: "Lightweight client-side browser plugin detecting malicious links on page load. Runs heuristic validation rules locally, safeguarding browsing privacy with zero remote server connections.",
    stats: [
      { label: "Size in memory", value: "<150KB" },
      { label: "Inspection speed", value: "<2ms (Local)" },
      { label: "Phish Detection rate", value: "96.8%" }
    ],
    insights: "Security plugins that query remote databases leak user browsing history. This local heuristic checks domain age, SSL status, and keyword discrepancies fully on-client.",
    architecture: ["Chrome extension Manifest V3", "Vanilla Javascript script hooks", "Local heuristic keyword matrices", "Secure regex checks"]
  },
  "09": {
    summary: "An interactive project management dashboard featuring drag-and-drop Kanban layouts. Built with Python FastAPI endpoints and secure token session stores for team coordination.",
    stats: [
      { label: "Kanban Columns", value: "3 dynamic phases" },
      { label: "Session Security", value: "HTTPOnly JWT" },
      { label: "API Endpoints", value: "18 secure APIs" }
    ],
    insights: "Kanban updates must synchronize instantly across teams. Utilizing SQLAlchemy query operations provides low database latency for state transactions.",
    architecture: ["React UI components", "Tailwind CSS Layouts", "FastAPI Python endpoints", "SQLAlchemy session engines"]
  }
};

const glowColorMap: Record<string, string> = {
  "01": "from-brand-cyan/20 to-brand-purple/10",
  "02": "from-brand-purple/20 to-brand-accent/10",
  "03": "from-emerald-400/20 to-brand-cyan/10",
  "04": "from-amber-400/20 to-brand-accent/10",
  "05": "from-red-500/20 to-brand-purple/10",
  "06": "from-blue-500/20 to-emerald-400/10",
  "07": "from-brand-cyan/20 to-indigo-500/10",
  "08": "from-teal-400/20 to-brand-cyan/10",
  "09": "from-indigo-500/20 to-brand-purple/10",
};

// 1. RTO Simulator
function RTOPredictorSimulator() {
  const [vehicle, setVehicle] = useState("LMV Car");
  const [state, setState] = useState("AP");
  const [prediction, setPrediction] = useState<{ growth: string; confidence: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setPrediction(null);
    setTimeout(() => {
      setLoading(false);
      const growthValues: Record<string, string> = {
        "Two Wheeler": "+14.8% growth next quarter",
        "LMV Car": "+8.2% growth next quarter",
        "Transport Truck": "-3.1% decline next quarter"
      };
      setPrediction({
        growth: growthValues[vehicle] || "+5.0% growth",
        confidence: (85 + Math.random() * 10).toFixed(1) + "% model confidence"
      });
    }, 800);
  };

  return (
    <div className="p-5 bg-zinc-900/60 border border-zinc-805 rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
        <span className="font-bold text-white uppercase tracking-wider">Predictive ML Inference Mock</span>
        <span className="text-[10px] text-zinc-500 font-mono">LIGHTGBM</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[9px] font-mono text-zinc-500 uppercase">Vehicle Class</label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-white font-semibold outline-none"
          >
            <option>Two Wheeler</option>
            <option>LMV Car</option>
            <option>Transport Truck</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[9px] font-mono text-zinc-500 uppercase">Registry State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-white font-semibold outline-none"
          >
            <option value="AP">Andhra Pradesh</option>
            <option value="TS">Telangana</option>
            <option value="KA">Karnataka</option>
            <option value="MH">Maharashtra</option>
          </select>
        </div>
      </div>
      <button
        onClick={handlePredict}
        disabled={loading}
        className="w-full py-2 bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 active:scale-98 text-white font-bold rounded uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Running LightGBM Inference..." : "Predict Trend"}
      </button>

      {prediction && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-zinc-950/80 border border-zinc-800/50 rounded-xl space-y-1 text-center"
        >
          <div className="text-sm font-black text-brand-cyan">{prediction.growth}</div>
          <div className="text-[10px] text-zinc-500 font-mono">{prediction.confidence}</div>
        </motion.div>
      )}
    </div>
  );
}

// 2. Data Pipeline Simulator
function DataPipelineSimulator() {
  const [status, setStatus] = useState<"idle" | "running" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const runPipeline = () => {
    setStatus("running");
    setLogs([]);
    
    const logsSequence = [
      "[INFO] Ingesting telemetry data from local sources...",
      "[INFO] Retrieved 48,210 raw database entries.",
      "[INFO] Running OpenCV image threshold adjustments...",
      "[INFO] Rescaling pixel dimensions to normalized float arrays.",
      "[INFO] Initializing Cross-Validation folds training (K=5)...",
      "[INFO] Fitting SVM Classifier & Random Forest Decision Trees...",
      "[SUCCESS] Random Forest accuracy: 94.2%. SVM accuracy: 91.8%.",
      "[INFO] Committing optimized model weights to PostgreSQL...",
      "[SUCCESS] Pipeline ETL run finished. Model retrained."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logsSequence.length) {
        setLogs((prev) => [...prev, logsSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setStatus("success");
      }
    }, 450);
  };

  return (
    <div className="p-5 bg-zinc-900/60 border border-zinc-805 rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
        <span className="font-bold text-white uppercase tracking-wider">ETL & Retraining Logs</span>
        <span className="text-[10px] text-zinc-500 font-mono">POSTGRES + SCIKIT</span>
      </div>
      
      <div className="h-[120px] bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-[9px] text-zinc-400 overflow-y-auto space-y-1">
        {logs.length === 0 ? (
          <span className="text-zinc-600 italic">Press Execute Pipeline to view streaming console logs...</span>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className={log.includes("[SUCCESS]") ? "text-emerald-400 font-semibold" : ""}>
              {log}
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>

      <button
        onClick={runPipeline}
        disabled={status === "running"}
        className="w-full py-2 bg-brand-purple hover:brightness-110 active:scale-98 text-white font-bold rounded uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
      >
        {status === "running" ? "ETL Pipeline Executing..." : "Execute Pipeline"}
      </button>
    </div>
  );
}

// 3. Analytics Simulator
function AnalyticsSimulator() {
  const [active, setActive] = useState(true);
  const [connections, setConnections] = useState(192);
  const [latency, setLatency] = useState(42);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setConnections((prev) => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 4));
      setLatency(() => Math.floor(35 + Math.random() * 12));
    }, 1200);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="p-5 bg-zinc-900/60 border border-zinc-805 rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
        <span className="font-bold text-white uppercase tracking-wider">WebSocket Telemetry Mock</span>
        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE STREAM
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-950/60 border border-zinc-800/50 rounded-xl p-3 text-center space-y-1">
          <span className="text-[8px] font-mono text-zinc-500 uppercase block">CONNECTIONS</span>
          <span className="text-xl font-black text-brand-cyan">{active ? connections : 0}</span>
        </div>
        <div className="bg-zinc-950/60 border border-zinc-800/50 rounded-xl p-3 text-center space-y-1">
          <span className="text-[8px] font-mono text-zinc-500 uppercase block">LATENCY (MS)</span>
          <span className="text-xl font-black text-brand-purple">{active ? `${latency}ms` : "--"}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-zinc-400">
        <span>BROADCAST STREAM STATE</span>
        <button
          onClick={() => setActive(!active)}
          className={`px-3 py-1 rounded-full font-bold uppercase transition-colors duration-200 cursor-pointer ${active ? "bg-brand-cyan/20 border border-brand-cyan text-brand-cyan" : "bg-zinc-950 border border-zinc-800 text-zinc-500"}`}
        >
          {active ? "DISCONNECT" : "CONNECT"}
        </button>
      </div>
    </div>
  );
}

// 4. Microservices Simulator
function MicroservicesSimulator() {
  const [step, setStep] = useState<"idle" | "gateway" | "users" | "orders" | "payment" | "success" | "rollback">("idle");
  
  const triggerFlow = (simulateFailure: boolean) => {
    setStep("gateway");
    
    const sequence = ["gateway", "users", "orders", "payment"];
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setStep(sequence[i] as any);
        i++;
      } else {
        clearInterval(interval);
        if (simulateFailure) {
          setStep("rollback");
        } else {
          setStep("success");
        }
      }
    }, 600);
  };

  return (
    <div className="p-5 bg-zinc-900/60 border border-zinc-805 rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
        <span className="font-bold text-white uppercase tracking-wider">Saga Orchestrator Map</span>
        <span className="text-[10px] text-zinc-500 font-mono">DOCKER COMPOSE</span>
      </div>

      <div className="flex flex-col gap-3 py-2">
        {[
          { key: "gateway", label: "Central API Gateway" },
          { key: "users", label: "User Database Service" },
          { key: "orders", label: "Order Placement Service" },
          { key: "payment", label: "Payment Gateway Service" }
        ].map((node, idx) => {
          const isActive = step === node.key;
          const isPassed = 
            step === "success" || 
            (step === "payment" && idx < 3) || 
            (step === "orders" && idx < 2) || 
            (step === "users" && idx < 1);
            
          const isRollback = step === "rollback" && idx >= 2; 
          
          return (
            <div
              key={node.key}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-300 ${isActive ? "border-brand-purple bg-brand-purple/10 text-white font-bold scale-[1.02]" : isRollback ? "border-red-500/40 bg-red-950/10 text-red-400 animate-pulse" : isPassed ? "border-brand-cyan/40 bg-brand-cyan/5 text-brand-cyan" : "border-zinc-800 text-zinc-500"}`}
            >
              <span>{idx + 1}. {node.label}</span>
              <span className="text-[9px] font-mono uppercase font-black">
                {isActive ? "PROCESSING" : isRollback ? "COMPENSATING" : isPassed ? "COMMIT OK" : "IDLE"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => triggerFlow(false)}
          disabled={step !== "idle" && step !== "success" && step !== "rollback"}
          className="py-2 border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-white font-bold rounded uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
        >
          Normal Flow
        </button>
        <button
          onClick={() => triggerFlow(true)}
          disabled={step !== "idle" && step !== "success" && step !== "rollback"}
          className="py-2 border border-red-900/50 bg-red-950/10 hover:bg-red-950/20 text-red-450 font-bold rounded uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
        >
          Fail + Rollback
        </button>
      </div>
    </div>
  );
}

// 5. Sentiment Simulator
function SentimentSimulator() {
  const [text, setText] = useState("This web application design is absolutely stellar and runs smoothly!");
  const [result, setResult] = useState<{ label: string; score: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClassify = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      const textLower = text.toLowerCase();
      const posWords = ["stellar", "brilliant", "great", "smooth", "love", "amazing", "beautiful", "clean", "outstanding", "premium", "accurate", "happy", "excellent", "nice", "fast", "awesome"];
      const negWords = ["bad", "worst", "slow", "dreadful", "awful", "hate", "terrible", "ugly", "phishing", "buggy", "error", "fail", "broke", "difficult"];

      let score = 0.5; 
      posWords.forEach(w => {
        if (textLower.includes(w)) score += 0.15;
      });
      negWords.forEach(w => {
        if (textLower.includes(w)) score -= 0.18;
      });

      score = Math.max(0.02, Math.min(0.98, score));
      
      setResult({
        label: score > 0.52 ? "POSITIVE" : score < 0.48 ? "NEGATIVE" : "NEUTRAL",
        score: Math.round(score * 100)
      });
    }, 600);
  };

  return (
    <div className="p-5 bg-zinc-900/60 border border-zinc-850 rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
        <span className="font-bold text-white uppercase tracking-wider">NLP Sentiment Classifier</span>
        <span className="text-[10px] text-zinc-500 font-mono">SCIKIT + TF-IDF</span>
      </div>

      <div className="space-y-1.5">
        <label className="text-[9px] font-mono text-zinc-500 uppercase">Input Text (Review / Sentence)</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white font-sans text-xs focus:border-brand-cyan outline-none resize-none"
        />
      </div>

      <button
        onClick={handleClassify}
        disabled={loading}
        className="w-full py-2 bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 active:scale-98 text-white font-bold rounded uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Tokenizing & Vectorizing..." : "Analyze Sentiment"}
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-zinc-950/80 border border-zinc-800/50 rounded-xl flex items-center justify-between"
        >
          <div>
            <span className="text-[9px] font-mono text-zinc-500 block uppercase">CLASSIFICATION</span>
            <span className={`text-sm font-black ${result.label === "POSITIVE" ? "text-emerald-400" : result.label === "NEGATIVE" ? "text-red-400" : "text-amber-400"}`}>
              {result.label}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-mono text-zinc-500 block uppercase">CONFIDENCE</span>
            <span className="text-sm font-black text-white">
              {result.label === "POSITIVE" ? result.score : result.label === "NEGATIVE" ? (100 - result.score) : 50}%
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// 6. Churn Simulator
function ChurnSimulator() {
  const [contract, setContract] = useState("Month-to-month");
  const [tenure, setTenure] = useState(12);

  const computeRisk = () => {
    let base = 50; 
    if (contract === "Month-to-month") base += 30;
    if (contract === "One year") base -= 15;
    if (contract === "Two year") base -= 35;

    base -= tenure * 0.85;
    const riskVal = Math.max(2, Math.min(97, Math.round(base)));
    return {
      percentage: riskVal,
      status: riskVal > 65 ? "CRITICAL RISK" : riskVal > 30 ? "MODERATE RISK" : "STABLE ACCOUNT"
    };
  };

  const risk = computeRisk();

  return (
    <div className="p-5 bg-zinc-900/60 border border-zinc-805 rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
        <span className="font-bold text-white uppercase tracking-wider">EDA Churn Predictor</span>
        <span className="text-[10px] text-zinc-500 font-mono">EDA MATRICES</span>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <label className="text-[9px] font-mono text-zinc-500 uppercase">Contract Term</label>
          <div className="grid grid-cols-3 gap-2">
            {["Month-to-month", "One year", "Two year"].map((c) => (
              <button
                key={c}
                onClick={() => setContract(c)}
                className={`py-1.5 rounded-lg border text-[10px] font-bold uppercase cursor-pointer transition-all duration-200 ${contract === c ? "border-brand-cyan bg-brand-cyan/10 text-white" : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-white"}`}
              >
                {c.split("-")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase">
            <span>Customer Tenure</span>
            <span className="text-white font-bold">{tenure} Months</span>
          </div>
          <input
            type="range"
            min="1"
            max="72"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-brand-cyan cursor-pointer"
          />
        </div>
      </div>

      <div className="p-3.5 bg-zinc-950/80 border border-zinc-800/50 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-[9px] font-mono text-zinc-500 block uppercase">CHURN RISK RATE</span>
          <span className={`text-xl font-black ${risk.percentage > 65 ? "text-red-500" : risk.percentage > 30 ? "text-amber-500" : "text-emerald-400"}`}>
            {risk.percentage}%
          </span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono text-zinc-500 block uppercase">CLASSIFICATION</span>
          <span className="text-[10px] font-bold text-white uppercase bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
            {risk.status}
          </span>
        </div>
      </div>
    </div>
  );
}

// 7. CrowdWatch Simulator
function CrowdWatchSimulator() {
  const [camera, setCamera] = useState("Section 104");
  const camData: Record<string, { count: number; capacity: number; status: string; code: string }> = {
    "Gate E Entry": { count: 32, capacity: 100, status: "Normal flow", code: "CAM_GATE_01" },
    "Section 104": { count: 482, capacity: 550, status: "High density", code: "CAM_SECT_104" },
    "VIP Box Lounge": { count: 18, capacity: 80, status: "Low occupancy", code: "CAM_VIP_LOUNGE" }
  };

  const current = camData[camera] || camData["Section 104"];
  const pct = Math.round((current.count / current.capacity) * 100);

  return (
    <div className="p-5 bg-zinc-900/60 border border-zinc-805 rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
        <span className="font-bold text-white uppercase tracking-wider">YOLOv8 Occupancy Feeds</span>
        <span className="text-[10px] text-zinc-500 font-mono">YOLOv8 CV</span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[9px] font-mono text-zinc-500 uppercase">Active CCTV Cameras</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(camData).map((cam) => (
            <button
              key={cam}
              onClick={() => setCamera(cam)}
              className={`py-1.5 rounded-lg border text-[10px] font-bold uppercase cursor-pointer transition-all duration-200 ${camera === cam ? "border-brand-cyan bg-brand-cyan/10 text-white" : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-white"}`}
            >
              {cam.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-zinc-950/80 border border-zinc-800/50 rounded-xl space-y-2 font-mono text-[10px]">
        <div className="flex justify-between">
          <span className="text-zinc-500">CAMERA ID:</span>
          <span className="text-white font-bold">{current.code}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">DETECTIONS:</span>
          <span className="text-brand-cyan font-bold">{current.count} heads</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">OCCUPANCY RATE:</span>
          <span className="text-white font-bold">{pct}% ({current.count}/{current.capacity})</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80">
          <div className="h-full bg-brand-cyan rounded-full animate-pulse" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

// 8. NOPhish Simulator
function NOPhishSimulator() {
  const [url, setUrl] = useState("http://paypal-verification-account-update.com");
  const [report, setReport] = useState<{ safe: boolean; details: string[] } | null>(null);
  const [scanning, setScanning] = useState(false);

  const checkUrl = () => {
    setScanning(true);
    setReport(null);
    setTimeout(() => {
      setScanning(false);
      const urlLower = url.toLowerCase();
      const reasons: string[] = [];
      let safe = true;

      if (!url.startsWith("https://")) {
        reasons.push("🚨 Lacks HTTPS encryption (HTTP only)");
        safe = false;
      }
      
      const suspiciousKeywords = ["login", "verify", "secure", "update", "paypal", "bank", "account", "signin", "recovery"];
      const matches = suspiciousKeywords.filter(k => urlLower.includes(k));
      if (matches.length >= 2) {
        reasons.push(`🚨 High-risk phishing keywords matching: ${matches.join(", ")}`);
        safe = false;
      }

      if (urlLower.includes(".com") && (urlLower.split(".com")[0].includes("-") || urlLower.split(".com")[0].includes("."))) {
        reasons.push("🚨 Domain nesting / suspicious hyphens detected");
        safe = false;
      }

      if (safe) {
        reasons.push("✅ SSL certificate patterns standard");
        reasons.push("✅ Local heuristic matches clean white-list patterns");
      }

      setReport({ safe, details: reasons });
    }, 600);
  };

  return (
    <div className="p-5 bg-zinc-900/60 border border-zinc-805 rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
        <span className="font-bold text-white uppercase tracking-wider">Browser Sandbox Analyzer</span>
        <span className="text-[10px] text-zinc-500 font-mono">EXTENSION API</span>
      </div>

      <div className="space-y-1.5">
        <label className="text-[9px] font-mono text-zinc-500 uppercase">Suspicious Link to Inspect</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-1.5 text-white font-mono text-[10px] focus:border-brand-cyan outline-none"
        />
      </div>

      <button
        onClick={checkUrl}
        disabled={scanning}
        className="w-full py-2 bg-brand-cyan hover:brightness-110 active:scale-98 text-zinc-950 font-bold rounded uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
      >
        {scanning ? "Analyzing URL Heuristics..." : "Inspect URL"}
      </button>

      {report && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-3 border rounded-xl space-y-2 ${report.safe ? "bg-emerald-950/15 border-emerald-500/30" : "bg-red-950/15 border-red-500/30"}`}
        >
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono text-zinc-550 uppercase">SANDBOX VERDICT:</span>
            <span className={`font-black text-[10px] uppercase ${report.safe ? "text-emerald-400" : "text-red-400"}`}>
              {report.safe ? "CLEAN / SAFE" : "PHISHING DETECTED"}
            </span>
          </div>
          <div className="font-mono text-[9px] space-y-1 text-zinc-400 border-t border-zinc-900/50 pt-2">
            {report.details.map((d, idx) => (
              <div key={idx}>{d}</div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// 9. Task Manager Simulator
function TaskManagerSimulator() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Fix database memory leak", status: "todo" },
    { id: 2, text: "Write API endpoints in FastAPI", status: "progress" },
    { id: 3, text: "Style project details view", status: "done" }
  ]);

  const moveTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextStatus = t.status === "todo" ? "progress" : t.status === "progress" ? "done" : "todo";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  return (
    <div className="p-5 bg-zinc-900/60 border border-zinc-805 rounded-2xl text-xs space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
        <span className="font-bold text-white uppercase tracking-wider">Kanban Workflow Board</span>
        <span className="text-[10px] text-zinc-500 font-mono">REACT + FASTAPI</span>
      </div>

      <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono text-[8px] text-zinc-500 uppercase">
        <span className="border-b border-zinc-800 pb-1 block">To Do</span>
        <span className="border-b border-zinc-800 pb-1 block text-brand-cyan">In Progress</span>
        <span className="border-b border-zinc-800 pb-1 block text-emerald-400">Done</span>
      </div>

      <div className="grid grid-cols-3 gap-2 min-h-[90px]">
        {["todo", "progress", "done"].map((col) => {
          const colTasks = tasks.filter(t => t.status === col);
          return (
            <div key={col} className="bg-zinc-950/60 border border-zinc-900/85 rounded-lg p-1.5 space-y-1.5 flex flex-col justify-start">
              {colTasks.map(t => (
                <div
                  key={t.id}
                  onClick={() => moveTask(t.id)}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-[9px] text-zinc-300 font-medium cursor-pointer transition-all leading-normal select-none active:scale-95 text-center flex flex-col justify-between"
                  title="Click to advance status"
                >
                  <span className="break-words">{t.text}</span>
                  <span className="text-[7px] text-zinc-500 block mt-1 font-mono hover:text-white">ADVANCE →</span>
                </div>
              ))}
              {colTasks.length === 0 && (
                <div className="text-[8px] text-zinc-700 italic text-center my-auto">Empty</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const renderSimulator = (projectId: string) => {
  switch (projectId) {
    case "01": return <RTOPredictorSimulator />;
    case "02": return <DataPipelineSimulator />;
    case "03": return <AnalyticsSimulator />;
    case "04": return <MicroservicesSimulator />;
    case "05": return <SentimentSimulator />;
    case "06": return <ChurnSimulator />;
    case "07": return <CrowdWatchSimulator />;
    case "08": return <NOPhishSimulator />;
    case "09": return <TaskManagerSimulator />;
    default: return null;
  }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (project: ProjectItem) => {
    setSelectedProject(project);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const selectedDetails = selectedProject ? projectDetailsData[selectedProject.id] : null;

  return (
    <section id="projects" className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-[#121212] overflow-hidden z-20 scroll-mt-24">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] rounded-full bg-brand-cyan/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] rounded-full bg-brand-purple/3 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-display font-black text-5xl md:text-7xl text-zinc-900 leading-none">
            04
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
              onClick={() => handleProjectClick(project)}
              className={`group glass-card rounded-2xl overflow-hidden flex flex-col relative cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                selectedProject?.id === project.id 
                  ? "ring-2 ring-brand-cyan/80 bg-zinc-900/60 shadow-[0_0_30px_rgba(0,240,255,0.15)] scale-[1.02]" 
                  : ""
              }`}
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
                    onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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

        {/* Dynamic Project Details Section Trigger Ref */}
        <div ref={detailsRef} className="scroll-mt-28" />

        {/* Project Details Showcase Panel with AI Aura Glow */}
        <AnimatePresence mode="wait">
          {selectedProject && selectedDetails && (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 w-full relative rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950/75 backdrop-blur-xl shadow-glass"
            >
              {/* Dynamic Shifting AI Aura Background Gradient */}
              <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-3xl">
                <div className={`absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-tr ${glowColorMap[selectedProject.id] || "from-brand-cyan/20 to-brand-purple/10"} opacity-35 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-pulse`} style={{ animationDuration: "8s" }} />
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
              </div>

              {/* Details Content Container */}
              <div className="p-8 md:p-12 flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 relative z-10">
                
                {/* Header Row */}
                <div className="col-span-12 flex items-center justify-between pb-6 border-b border-zinc-900/60">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] tracking-wider text-zinc-550 bg-zinc-900 border border-zinc-855 px-3 py-1 rounded-full">
                      PROJECT {selectedProject.id}
                    </span>
                    <span className="text-brand-cyan font-mono text-[9px] tracking-widest uppercase hidden sm:block">
                      // {selectedProject.category}
                    </span>
                  </div>
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 hover:border-zinc-700 text-zinc-400 rounded-full cursor-pointer transition-all duration-300 active:scale-90"
                    title="Close Details"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Left Column: Details & Tech Specifications */}
                <div className="col-span-12 md:col-span-7 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-zinc-550 font-mono text-[10px] tracking-widest uppercase block md:hidden">
                      {selectedProject.category}
                    </span>
                    <h3 className={`font-display font-black text-3xl md:text-4xl text-white tracking-tight uppercase leading-none bg-gradient-to-r ${selectedProject.accent} bg-clip-text text-transparent`}>
                      {selectedProject.title}
                    </h3>

                    {/* Long description */}
                    <p className="text-zinc-300 font-sans text-xs md:text-sm leading-relaxed font-light">
                      {selectedDetails.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-zinc-500 font-mono text-[9px] bg-zinc-900/40 border border-zinc-805 px-2.5 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Architecture Matrix */}
                  <div className="space-y-3 pt-4">
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-brand-cyan" /> Core Architecture Elements
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400 font-sans text-[11px]">
                      {selectedDetails.architecture.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-emerald-450 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-900/65">
                    {selectedDetails.stats.map((stat, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-wider leading-none">
                          {stat.label}
                        </span>
                        <span className="text-base font-black font-display text-white block">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Links / Action Area */}
                  <div className="flex items-center gap-4 pt-6 border-t border-zinc-900/65 mt-auto">
                    <a
                      href={selectedProject.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-white font-mono text-[10px] tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span>Github Source</span>
                    </a>

                    {selectedProject.link.startsWith("/") ? (
                      <Link
                        href={selectedProject.link}
                        className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 text-white font-mono text-[10px] tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer text-center font-bold"
                      >
                        <span>Full Page Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 text-white font-mono text-[10px] tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer text-center font-bold"
                      >
                        <span>Launch Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Aura AI Insights & Interactive Simulator */}
                <div className="col-span-12 md:col-span-5 space-y-6">
                  
                  {/* Aura AI Insights Panel */}
                  <div className="p-4 bg-[#121212]/30 border border-zinc-800/40 rounded-2xl relative overflow-hidden flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-850 shrink-0 text-brand-cyan animate-bounce" style={{ animationDuration: "3s" }}>
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="space-y-1.5 font-sans">
                      <span className="text-[8px] font-mono font-bold text-brand-cyan uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: "6s" }} /> AURA AI INSIGHTS
                      </span>
                      <p className="text-[11px] text-zinc-400 leading-normal font-light italic">
                        "{selectedDetails.insights}"
                      </p>
                    </div>
                  </div>

                  {/* Interactive Simulator Container */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-brand-purple animate-pulse" /> Sandbox Simulation Console
                    </h4>
                    {renderSimulator(selectedProject.id)}
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}