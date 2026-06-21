"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, ShieldAlert, Eye, Server, RefreshCw, BarChart } from "lucide-react";
import Link from "next/link";

interface CameraSection {
  id: string;
  name: string;
  capacity: number;
  occupants: number;
  alert: string | null;
  seed: number;
}

const SECTIONS: CameraSection[] = [
  { id: "sec_a", name: "Section A - Gate Entrance", capacity: 1500, occupants: 1240, alert: null, seed: 1 },
  { id: "sec_b", name: "Section B - West Balcony", capacity: 1200, occupants: 540, alert: null, seed: 2 },
  { id: "sec_c", name: "Section C - South Bleachers", capacity: 1800, occupants: 1710, alert: "CONGESTION ALERT: Crowd density exceeds 90% threshold!", seed: 3 },
  { id: "sec_d", name: "Section D - Corporate Box", capacity: 800, occupants: 120, alert: null, seed: 4 }
];

export default function CrowdWatchDemo() {
  const [selectedSecId, setSelectedSecId] = useState<string>("sec_a");
  const [isCctvActive, setIsCctvActive] = useState(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedSec = SECTIONS.find((s) => s.id === selectedSecId) || SECTIONS[0];
  const occupancyRate = (selectedSec.occupants / selectedSec.capacity) * 100;

  // Custom YOLOv8 Bounding Boxes Simulation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset canvas dimensions
    canvas.width = canvas.parentElement?.clientWidth || 640;
    canvas.height = 360;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isCctvActive) {
      // Offline/Static Display
      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "mono 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CAMERA STREAM FEED OFFLINE", canvas.width / 2, canvas.height / 2);
      return;
    }

    // Draw Mock Stadium seating layout backgrounds
    const seed = selectedSec.seed;
    let r = seed * 456789;
    const rand = () => {
      r = (r * 1664525 + 1013904223) % 4294967296;
      return r / 4294967296;
    };

    // Columns & Rows of Seats
    const cols = 12;
    const rows = 6;
    const colStep = canvas.width / (cols + 1);
    const rowStep = canvas.height / (rows + 1);

    // Draw seating grid
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = colStep * (col + 1);
        const y = rowStep * (row + 1);
        
        // Deterministically assign if seat is occupied based on occupants count
        const isOccupied = rand() < (selectedSec.occupants / selectedSec.capacity);

        // Draw seat circles
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = isOccupied ? "#10b981" : "#3f3f46"; // Green if occupied, gray empty
        ctx.fill();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw bounding boxes around detections
        if (showBoundingBoxes && isOccupied) {
          ctx.strokeStyle = "#ef4444"; // Red YOLO box
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x - 12, y - 16, 24, 32);
          
          // Tiny label
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(x - 12, y - 26, 24, 10);
          ctx.fillStyle = "#ffffff";
          ctx.font = "8px monospace";
          ctx.textAlign = "center";
          ctx.fillText("P", x, y - 18);
        }
      }
    }

    // Visual camera overlays
    ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
    ctx.lineWidth = 2;
    // Corners
    const offset = 15;
    const len = 20;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(offset, offset + len); ctx.lineTo(offset, offset); ctx.lineTo(offset + len, offset);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(canvas.width - offset - len, offset); ctx.lineTo(canvas.width - offset, offset); ctx.lineTo(canvas.width - offset, offset + len);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(offset, canvas.height - offset - len); ctx.lineTo(offset, canvas.height - offset); ctx.lineTo(offset + len, canvas.height - offset);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(canvas.width - offset - len, canvas.height - offset); ctx.lineTo(canvas.width - offset, canvas.height - offset); ctx.lineTo(canvas.width - offset, canvas.height - offset - len);
    ctx.stroke();

    // blinking dot
    ctx.beginPath();
    ctx.arc(offset + 8, offset + 8, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ef4444";
    ctx.fill();

    // label text
    ctx.fillStyle = "#00f0ff";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";
    ctx.fillText("YOLOv8x LIVE STREAM DETECTOR", offset + 18, offset + 12);

  }, [selectedSecId, isCctvActive, showBoundingBoxes]);

  return (
    <div className="min-h-screen bg-[#07090b] text-zinc-200 selection:bg-brand-cyan selection:text-[#07090b] font-sans pb-16">
      
      {/* Decorative glows */}
      <div className="absolute top-0 right-10 w-[400px] h-[400px] rounded-full bg-brand-cyan/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-indigo-500/2 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-[#07090b]/80 backdrop-blur px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center justify-center p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">👁️</span>
              <h1 className="font-display font-bold text-lg md:text-xl text-white tracking-tight uppercase leading-none">
                CrowdWatch Stadium Monitor
              </h1>
            </div>
            <p className="text-[10px] md:text-xs text-zinc-400 font-mono mt-1">
              YOLOv8 OBJECT DETECTOR · REAL-TIME STADIUM OCCUPANCY
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        
        {/* Alerts / Section Congestion Warnings */}
        <AnimatePresence mode="wait">
          {selectedSec.alert && (
            <motion.section
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-rose-950/20 border border-rose-900/60 rounded-xl p-4 flex items-start gap-4"
            >
              <div className="p-2 rounded-lg bg-rose-900/40 text-rose-400 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-rose-400 tracking-wide uppercase font-display mb-0.5">
                  Occupancy threshold alert
                </h4>
                <p className="text-xs text-rose-300 font-sans font-light">
                  {selectedSec.alert}
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Video feed and metrics widgets row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Visual camera feed layout */}
          <div className="lg:col-span-8 space-y-4">
            <div className="glass-card rounded-2xl p-4 border border-zinc-800/60 bg-zinc-950/40 relative">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-zinc-500 uppercase">CAMERA ANCHOR FEED: {selectedSec.name}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                    disabled={!isCctvActive}
                    className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold border transition-colors cursor-pointer ${showBoundingBoxes ? "border-rose-500 bg-rose-500/10 text-rose-400" : "border-zinc-800 text-zinc-500 disabled:opacity-50"}`}
                  >
                    YOLO Boxes
                  </button>
                  <button
                    onClick={() => setIsCctvActive(!isCctvActive)}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {isCctvActive ? "Freeze Feed" : "Unfreeze Feed"}
                  </button>
                </div>
              </div>

              {/* Canvas Renderer */}
              <div className="w-full h-[360px] bg-zinc-950 rounded-xl overflow-hidden relative border border-zinc-900 flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Section sidebar controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40 min-h-[416px] flex flex-col justify-between">
              
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-4 pb-2 border-b border-zinc-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-brand-cyan" /> Camera Anchor Feeds
                </h3>

                <div className="space-y-3">
                  {SECTIONS.map((sec) => {
                    const isSelected = sec.id === selectedSecId;
                    const secOcc = (sec.occupants / sec.capacity) * 100;

                    return (
                      <button
                        key={sec.id}
                        onClick={() => setSelectedSecId(sec.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer active:scale-98 ${isSelected ? "border-brand-cyan bg-brand-cyan/5" : "border-zinc-900 bg-zinc-900/10 text-zinc-400 hover:border-zinc-800 hover:text-white"}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-bold uppercase truncate max-w-[150px]">{sec.name}</span>
                          <span className={`text-[10px] font-mono font-bold ${secOcc > 90 ? "text-rose-500" : secOcc > 70 ? "text-amber-500" : "text-emerald-400"}`}>
                            {secOcc.toFixed(0)}% OCC
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                          <span>HEADCOUNT: {sec.occupants.toLocaleString()}</span>
                          <span>MAX CAP: {sec.capacity.toLocaleString()}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected stats summary */}
              <div className="border-t border-zinc-900 pt-4 mt-6 space-y-3 font-mono text-[10px] text-zinc-400">
                <div className="flex justify-between">
                  <span>CAPACITY COEFFICIENT:</span>
                  <span className="text-white font-bold">{selectedSec.capacity.toLocaleString()} seats</span>
                </div>
                <div className="flex justify-between">
                  <span>DETECTED OCCUPANTS:</span>
                  <span className="text-white font-bold">{selectedSec.occupants.toLocaleString()} people</span>
                </div>
                <div className="flex justify-between">
                  <span>YOLO DETECTORS COUNT:</span>
                  <span className="text-brand-cyan font-bold">{showBoundingBoxes ? selectedSec.occupants : 0} frames</span>
                </div>
              </div>

            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-16 pt-8 text-center">
        <p className="text-[10px] font-mono tracking-wider text-zinc-700">
          CROWDWATCH COMPUTER VISION INTERFACE © {new Date().getFullYear()} — SAI KUMARU NAIDU
        </p>
      </footer>

    </div>
  );
}
