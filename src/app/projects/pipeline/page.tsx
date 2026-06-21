"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Cpu, Database, Settings, Terminal, CheckCircle2, RefreshCw } from "lucide-react";
import Link from "next/link";

interface LogLine {
  time: string;
  service: string;
  msg: string;
  type: "info" | "success" | "warn";
}

const PRESETS = {
  receipts: {
    name: "OCR Receipts Dataset",
    records: 4210,
    features: "Grayscale pixels, text bounding box ratios",
    rf: { acc: 94.2, precision: 93.8, recall: 94.6, latency: 180 },
    svm: { acc: 91.8, precision: 92.5, recall: 91.2, latency: 250 },
    featuresList: [
      { name: "Aspect Ratio", val: 32 },
      { name: "Contrast Ratio", val: 24 },
      { name: "Word Count", val: 21 },
      { name: "Line Density", val: 15 },
      { name: "Edge Count", val: 8 }
    ]
  },
  crm: {
    name: "Customer CRM Dataset",
    records: 12500,
    features: "Purchase frequency, tenure, support tickets, age",
    rf: { acc: 89.6, precision: 88.9, recall: 90.2, latency: 120 },
    svm: { acc: 90.4, precision: 91.1, recall: 89.8, latency: 310 },
    featuresList: [
      { name: "Purchase Freq", val: 42 },
      { name: "Tenure Months", val: 28 },
      { name: "Total Spent", val: 18 },
      { name: "Support Count", val: 9 },
      { name: "Age Category", val: 3 }
    ]
  },
  housing: {
    name: "Housing Price Index",
    records: 33400,
    features: "Bedrooms, square footage, zip code median, school rating",
    rf: { acc: 92.1, precision: 92.6, recall: 91.5, latency: 220 },
    svm: { acc: 88.5, precision: 88.9, recall: 88.1, latency: 450 },
    featuresList: [
      { name: "Square Footage", val: 51 },
      { name: "Zip Code Value", val: 23 },
      { name: "Rooms Count", val: 14 },
      { name: "School Rating", val: 8 },
      { name: "Year Built", val: 4 }
    ]
  }
};

export default function PipelineDemo() {
  const [selectedDataset, setSelectedDataset] = useState<keyof typeof PRESETS>("crm");
  const [selectedModel, setSelectedModel] = useState<"rf" | "svm">("rf");
  const [pipelineState, setPipelineState] = useState<"idle" | "ingest" | "preprocess" | "train" | "db" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [runStats, setRunStats] = useState<any>(null);

  const dataset = PRESETS[selectedDataset];
  const modelStats = selectedModel === "rf" ? dataset.rf : dataset.svm;

  const addLog = (service: string, msg: string, type: "info" | "success" | "warn" = "info") => {
    const time = new Date().toLocaleTimeString().split(" ")[0];
    setLogs((prev) => [...prev, { time, service, msg, type }]);
  };

  useEffect(() => {
    if (pipelineState === "idle") {
      setLogs([]);
      setRunStats(null);
      setProgress(0);
      return;
    }

    let timer: NodeJS.Timeout;
    
    if (pipelineState === "ingest") {
      addLog("INGESTION", `Loading dataset: ${dataset.name}...`, "info");
      addLog("INGESTION", `Found ${dataset.records.toLocaleString()} raw database records`, "info");
      timer = setTimeout(() => {
        addLog("INGESTION", "Raw record loading finished successfully", "success");
        setPipelineState("preprocess");
        setProgress(25);
      }, 1000);
    } 
    
    else if (pipelineState === "preprocess") {
      addLog("PREPROCESS", "Triggering MinMaxScaler and standardizing values...", "info");
      if (selectedDataset === "receipts") {
        addLog("PREPROCESS", "Applying OpenCV adaptive thresholding & binarization...", "info");
      }
      timer = setTimeout(() => {
        addLog("PREPROCESS", "Preprocessing finished: null values handled, data scaled", "success");
        setPipelineState("train");
        setProgress(50);
      }, 1200);
    } 
    
    else if (pipelineState === "train") {
      const modelName = selectedModel === "rf" ? "RandomForestClassifier" : "SVC (RBF Kernel)";
      addLog("TRAINING", `Initializing training sequence using ${modelName}...`, "info");
      addLog("TRAINING", `Fitting model weights across parameters...`, "info");
      timer = setTimeout(() => {
        addLog("TRAINING", `Training sequence finished: Cross-validation Accuracy: ${modelStats.acc}%`, "success");
        setPipelineState("db");
        setProgress(75);
      }, 1500);
    } 
    
    else if (pipelineState === "db") {
      addLog("DATABASE", "Exporting model weights to PostgreSQL storage layer...", "info");
      addLog("DATABASE", "Updating training versioning tags and metrics indexes...", "info");
      timer = setTimeout(() => {
        addLog("DATABASE", "Database index update complete", "success");
        setPipelineState("complete");
        setProgress(100);
      }, 1000);
    } 
    
    else if (pipelineState === "complete") {
      addLog("PIPELINE", "Execution pipeline run finished successfully", "success");
      setRunStats(modelStats);
    }

    return () => clearTimeout(timer);
  }, [pipelineState]);

  const handleStartPipeline = () => {
    setPipelineState("ingest");
  };

  const handleReset = () => {
    setPipelineState("idle");
  };

  return (
    <div className="min-h-screen bg-[#09070f] text-zinc-200 selection:bg-brand-purple selection:text-white font-sans pb-16">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-10 w-[400px] h-[400px] rounded-full bg-brand-purple/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-brand-accent/2 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-[#09070f]/80 backdrop-blur px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center justify-center p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <h1 className="font-display font-bold text-lg md:text-xl text-white tracking-tight uppercase leading-none">
                ML-Powered Data Pipeline
              </h1>
            </div>
            <p className="text-[10px] md:text-xs text-zinc-400 font-mono mt-1">
              AUTOMATED ETL · MODEL INFERENCE RETRAINING PIPELINE
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        
        {/* Controls and Pipeline Visualizer row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Settings panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40 relative">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-brand-purple mb-6 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Pipeline Settings
              </h3>

              {/* Dataset Selection */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Input Dataset</label>
                  <select
                    value={selectedDataset}
                    onChange={(e) => {
                      setSelectedDataset(e.target.value as any);
                      handleReset();
                    }}
                    disabled={pipelineState !== "idle"}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-white text-xs font-semibold focus:outline-none focus:border-brand-purple disabled:opacity-50"
                  >
                    <option value="crm">Customer CRM Profiles</option>
                    <option value="receipts">Receipt OCR Scans</option>
                    <option value="housing">Housing Index Matrix</option>
                  </select>
                </div>

                {/* Model Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">ML Classifier model</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedModel("rf")}
                      disabled={pipelineState !== "idle"}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${selectedModel === "rf" ? "border-brand-purple bg-brand-purple/10 text-white" : "border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:text-white disabled:opacity-50"}`}
                    >
                      Random Forest
                    </button>
                    <button
                      onClick={() => setSelectedModel("svm")}
                      disabled={pipelineState !== "idle"}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${selectedModel === "svm" ? "border-brand-purple bg-brand-purple/10 text-white" : "border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:text-white disabled:opacity-50"}`}
                    >
                      SVM Classifier
                    </button>
                  </div>
                </div>
              </div>

              {/* Execution details */}
              <div className="mt-8 pt-4 border-t border-zinc-900 space-y-3 font-mono text-[10px] text-zinc-400">
                <div className="flex justify-between">
                  <span>RECORDS COUNT:</span>
                  <span className="text-white font-bold">{dataset.records.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>TARGET FEATURES:</span>
                  <span className="text-white font-bold truncate max-w-[150px]">{dataset.features}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-4 border-t border-zinc-900 flex gap-3">
                <button
                  onClick={handleReset}
                  disabled={pipelineState === "idle"}
                  className="flex-1 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset
                </button>
                <button
                  onClick={handleStartPipeline}
                  disabled={pipelineState !== "idle"}
                  className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-accent text-white text-xs font-extrabold uppercase tracking-wider hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Pipeline</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pipeline trace visualizer */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-6 pb-2 border-b border-zinc-900">
                  Execution Visualizer
                </h3>

                {/* Progress bar */}
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                    <span>FLOW RUNNING PROGRESS</span>
                    <span className="text-white font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden relative border border-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-brand-purple to-brand-accent rounded-full"
                    />
                  </div>
                </div>

                {/* Pipeline visual blocks flowchart */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {[
                    { id: "ingest", label: "DATA INGESTION", desc: "Retrieve records", icon: <Cpu className="w-5 h-5" /> },
                    { id: "preprocess", label: "PREPROCESSING", desc: "MinMax Scaling", icon: <Database className="w-5 h-5" /> },
                    { id: "train", label: "MODEL TRAINING", desc: "Fit validation folds", icon: <Settings className="w-5 h-5" /> },
                    { id: "db", label: "METRICS EXPORT", desc: "Update PostgreSQL", icon: <CheckCircle2 className="w-5 h-5" /> }
                  ].map((step, idx) => {
                    const isPassed =
                      pipelineState === "complete" ||
                      (step.id === "ingest" && (pipelineState === "preprocess" || pipelineState === "train" || pipelineState === "db")) ||
                      (step.id === "preprocess" && (pipelineState === "train" || pipelineState === "db")) ||
                      (step.id === "train" && pipelineState === "db");
                      
                    const isActive = pipelineState === step.id;

                    return (
                      <div
                        key={step.id}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-between text-center relative transition-all duration-300 ${isActive ? "border-brand-purple bg-brand-purple/5 shadow-[0_0_15px_rgba(189,0,255,0.1)] scale-102" : isPassed ? "border-emerald-500/30 bg-emerald-950/5 text-zinc-400" : "border-zinc-800 bg-zinc-900/10 text-zinc-500"}`}
                      >
                        <div className={`p-2.5 rounded-lg mb-3 ${isActive ? "bg-brand-purple/20 text-brand-purple" : isPassed ? "bg-emerald-950/20 text-emerald-400" : "bg-zinc-900 text-zinc-600"}`}>
                          {step.icon}
                        </div>
                        <span className="text-[10px] font-bold tracking-wider font-display uppercase block">{step.label}</span>
                        <span className="text-[9px] font-mono mt-1 opacity-70 block">{step.desc}</span>
                        
                        {/* Connecting arrows on desktop */}
                        {idx < 3 && (
                          <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-zinc-800 z-10 select-none">
                            →
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                <span>PIPELINE ENGINE: ACTIVE</span>
                <span>STATUS: {pipelineState === "idle" ? "IDLE" : pipelineState === "complete" ? "SUCCESS" : "PROCESSING..."}</span>
              </div>
            </div>
          </div>

        </section>

        {/* Real-time system logs console & Results metrics row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Logs terminal console */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40 h-[360px] flex flex-col justify-between">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-4 pb-2 border-b border-zinc-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-purple" /> Dynamic execution Logs
              </h3>

              {/* Logs area */}
              <div className="bg-[#040306] border border-zinc-900 rounded-xl p-4 flex-grow overflow-y-auto font-mono text-[10.5px] space-y-1.5 max-h-[220px]">
                {logs.length === 0 ? (
                  <p className="text-zinc-600 italic">Logs console empty. Start the pipeline execution to view system outputs...</p>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-zinc-600">[{log.time}]</span>
                      <span className={`font-bold ${log.type === "success" ? "text-emerald-400" : log.type === "warn" ? "text-amber-500" : "text-brand-purple"}`}>
                        [{log.service}]
                      </span>
                      <span className={log.type === "success" ? "text-emerald-300" : "text-zinc-300"}>{log.msg}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Results performance gauges and feature importances */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40 h-[360px] flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-6 pb-2 border-b border-zinc-900">
                  Model retraining outputs
                </h3>

                <AnimatePresence mode="wait">
                  {!runStats ? (
                    <motion.div
                      key="no-stats"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center text-zinc-500 italic text-xs"
                    >
                      <RefreshCw className="w-8 h-8 text-zinc-700 animate-spin mb-3" />
                      <span>Retraining results will populate here after pipeline execution finishes...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="has-stats"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-2 gap-6"
                    >
                      {/* Metric widgets */}
                      <div className="space-y-4">
                        <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-xl relative overflow-hidden">
                          <span className="text-[9px] font-mono text-zinc-500 block uppercase">Cross-Val Accuracy</span>
                          <span className="text-2xl font-black font-display text-emerald-400">{runStats.acc}%</span>
                        </div>
                        <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-xl relative overflow-hidden">
                          <span className="text-[9px] font-mono text-zinc-500 block uppercase">Pipeline Latency</span>
                          <span className="text-2xl font-black font-display text-white">{runStats.latency}ms</span>
                        </div>
                        <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-xl relative overflow-hidden">
                          <span className="text-[9px] font-mono text-zinc-500 block uppercase">F1 Validation Score</span>
                          <span className="text-2xl font-black font-display text-brand-purple">
                            {((runStats.precision * runStats.recall) / (runStats.precision + runStats.recall) * 2).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Feature Importances bar chart */}
                      <div className="space-y-3 font-mono text-[10px]">
                        <span className="text-zinc-500 text-[9px] block uppercase border-b border-zinc-900 pb-1">FEATURE IMPORTANTANCES (%)</span>
                        <div className="space-y-2">
                          {dataset.featuresList.map((f) => (
                            <div key={f.name} className="space-y-1">
                              <div className="flex justify-between text-[9px]">
                                <span className="text-zinc-400 truncate max-w-[80px]">{f.name}</span>
                                <span className="text-zinc-300 font-bold">{f.val}%</span>
                              </div>
                              <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-purple" style={{ width: `${f.val * 1.8}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status stamp */}
              <div className="text-[9px] font-mono text-zinc-600 text-right uppercase mt-4">
                POST-TRAINING COMPILATION STAMP: RETR_VER_1.02.5
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-16 pt-8 text-center">
        <p className="text-[10px] font-mono tracking-wider text-zinc-700">
          AUTOMATED MACHINE LEARNING PIPELINE ENGINE © {new Date().getFullYear()} — SAI KUMARU NAIDU
        </p>
      </footer>

    </div>
  );
}
