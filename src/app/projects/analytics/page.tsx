"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Wifi, WifiOff, Send, Activity, Users, ShieldAlert, Thermometer } from "lucide-react";
import Link from "next/link";

export default function AnalyticsDemo() {
  const [isConnected, setIsConnected] = useState(true);
  const [trafficMode, setTrafficMode] = useState<"normal" | "spike" | "idle">("normal");
  const [sentPackets, setSentPackets] = useState<{ id: number; timestamp: string; payload: string; latency: number }[]>([]);
  const [customPayload, setCustomPayload] = useState("");
  
  // Real-time telemetry metrics
  const [metrics, setMetrics] = useState({
    cpu: 18,
    ram: 42,
    traffic: 120,
    clients: 184,
    latency: 28
  });

  // Track past data points for streaming mini-chart
  const [chartData, setChartData] = useState<number[]>(Array(15).fill(25));
  const packetIdRef = useRef(0);

  // Interval simulation for live chart stream
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setMetrics((prev) => {
        let cpuOffset = 0;
        let trafficBase = 120;
        let ramOffset = 0;

        if (trafficMode === "spike") {
          cpuOffset = Math.floor(Math.random() * 20) + 55;
          trafficBase = Math.floor(Math.random() * 100) + 450;
          ramOffset = Math.floor(Math.random() * 10) + 20;
        } else if (trafficMode === "idle") {
          cpuOffset = Math.floor(Math.random() * 5) + 3;
          trafficBase = Math.floor(Math.random() * 15) + 10;
          ramOffset = -Math.floor(Math.random() * 5) - 10;
        } else {
          cpuOffset = Math.floor(Math.random() * 10) + 12;
          trafficBase = Math.floor(Math.random() * 40) + 100;
        }

        const newCpu = Math.max(5, Math.min(99, cpuOffset));
        const newRam = Math.max(10, Math.min(95, 42 + ramOffset));
        const newClients = prev.clients + (trafficMode === "spike" ? 2 : trafficMode === "idle" ? -2 : Math.random() > 0.5 ? 1 : -1);
        
        // Append value to chart data
        setChartData((prevChart) => {
          const nextChart = [...prevChart.slice(1), trafficBase];
          return nextChart;
        });

        return {
          cpu: newCpu,
          ram: newRam,
          traffic: trafficBase,
          clients: Math.max(2, newClients),
          latency: trafficMode === "spike" ? Math.floor(Math.random() * 15) + 40 : Math.floor(Math.random() * 12) + 15
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected, trafficMode]);

  const handleSendPacket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPayload.trim() || !isConnected) return;

    packetIdRef.current += 1;
    const latency = trafficMode === "spike" ? Math.floor(Math.random() * 25) + 42 : Math.floor(Math.random() * 12) + 15;
    const time = new Date().toLocaleTimeString().split(" ")[0];

    const newPacket = {
      id: packetIdRef.current,
      timestamp: time,
      payload: customPayload,
      latency
    };

    setSentPackets((prev) => [newPacket, ...prev.slice(0, 9)]);
    setCustomPayload("");

    // Simulate instant latency impact to stats
    setMetrics(prev => ({ ...prev, latency }));
  };

  return (
    <div className="min-h-screen bg-[#070b09] text-zinc-200 selection:bg-emerald-400 selection:text-[#070b09] font-sans pb-16">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-10 w-[400px] h-[400px] rounded-full bg-emerald-400/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-cyan-400/2 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-[#070b09]/80 backdrop-blur px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center justify-center p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h1 className="font-display font-bold text-lg md:text-xl text-white tracking-tight uppercase leading-none">
                Real-Time Analytics Dashboard
              </h1>
            </div>
            <p className="text-[10px] md:text-xs text-zinc-400 font-mono mt-1">
              WEBSOCKET COMPRESSION STREAM · TELEMETRY INJECTOR
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        
        {/* Connection status and controller controls bar */}
        <section className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {isConnected ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-emerald-900/60 bg-emerald-950/20 text-emerald-400 text-xs font-semibold tracking-wide">
                <Wifi className="w-4 h-4 animate-pulse" /> WebSocket Connection Active
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-rose-900/60 bg-rose-950/20 text-rose-400 text-xs font-semibold tracking-wide">
                <WifiOff className="w-4 h-4" /> Connection Terminated
              </div>
            )}
            
            <button
              onClick={() => setIsConnected(!isConnected)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors duration-200 cursor-pointer active:scale-95 ${isConnected ? "border-rose-900 hover:bg-rose-950/20 text-rose-400" : "border-emerald-950 bg-emerald-600 hover:bg-emerald-700 text-white"}`}
            >
              {isConnected ? "Disconnect Stream" : "Connect Stream"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">TRAFFIC INJECTION LOAD:</span>
            <div className="flex bg-zinc-900 rounded-lg p-0.5 border border-zinc-800 text-xs font-bold">
              {(["idle", "normal", "spike"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTrafficMode(mode)}
                  disabled={!isConnected}
                  className={`px-3 py-1 rounded-md uppercase tracking-wider text-[10px] transition-colors duration-200 cursor-pointer ${trafficMode === mode ? "bg-emerald-600 text-white" : "text-zinc-500 hover:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Telemetry Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Connections", val: isConnected ? metrics.clients.toLocaleString() : "0", sub: "Live socket connections", icon: <Users className="w-4 h-4" />, color: "text-white", bar: "bg-zinc-700" },
            { label: "Network Throughput", val: isConnected ? `${metrics.traffic} pkt/s` : "0 pkt/s", sub: "Incoming message load", icon: <Activity className="w-4 h-4 text-emerald-400" />, color: "text-emerald-400", bar: "bg-emerald-600" },
            { label: "Server Latency", val: isConnected ? `${metrics.latency} ms` : "-- ms", sub: "Round-trip processing latency", icon: <Thermometer className="w-4 h-4 text-cyan-400" />, color: "text-cyan-400", bar: "bg-cyan-600" },
            { label: "CPU Server Load", val: isConnected ? `${metrics.cpu}%` : "0%", sub: "Core thread consumption", icon: <ShieldAlert className="w-4 h-4 text-amber-500" />, color: "text-amber-500", bar: "bg-amber-600" }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/30 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">{item.label}</span>
                {item.icon}
              </div>
              <div>
                <span className={`text-2xl md:text-3xl font-extrabold font-display ${item.color}`}>
                  {item.val}
                </span>
                <p className="text-[9px] text-zinc-500 mt-1 font-light">{item.sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Streaming Chart and WS packet injector row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Telemetry Stream Chart (SVG based) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40 h-[360px] flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-6 pb-2 border-b border-zinc-900">
                  Throughput Telemetry stream
                </h3>

                {/* SVG Polyline Chart */}
                <div className="relative pt-6">
                  <div className="h-[180px] w-full flex items-end justify-between relative px-2">
                    {/* SVG canvas */}
                    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      <line x1="0" y1="45" x2="100%" y2="45" stroke="#1c1917" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="90" x2="100%" y2="90" stroke="#1c1917" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="135" x2="100%" y2="135" stroke="#1c1917" strokeWidth="1" strokeDasharray="4 4" />

                      {/* Area under curve */}
                      <path
                        d={`M 0 180 ${chartData.map((d, i) => `L ${(i / 14) * 100}% ${180 - Math.min(170, (d / 600) * 160)}`).join(" ")} L 100% 180 Z`}
                        fill="url(#chartGrad)"
                      />

                      {/* Line plot */}
                      <path
                        d={chartData.map((d, i) => `${i === 0 ? "M" : "L"} ${(i / 14) * 100}% ${180 - Math.min(170, (d / 600) * 160)}`).join(" ")}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase mt-4">
                <span>Chart interval: 1s refresh</span>
                <span>Max Capacity: 600 pkts/s</span>
              </div>
            </div>
          </div>

          {/* WS custom Payload Sender */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40 h-[360px] flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-6 pb-2 border-b border-zinc-900">
                  WebSocket Payload injector
                </h3>

                <form onSubmit={handleSendPacket} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Inject custom JSON packet</label>
                    <input
                      type="text"
                      value={customPayload}
                      onChange={(e) => setCustomPayload(e.target.value)}
                      placeholder='{"message": "Hello Server", "command": "fetch_user"}'
                      disabled={!isConnected}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isConnected || !customPayload.trim()}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-800 text-[#070b09] disabled:text-zinc-500 font-extrabold uppercase text-[10px] tracking-wider rounded-xl transition-colors duration-200 active:scale-97 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 fill-current" />
                    <span>Send Package</span>
                  </button>
                </form>
              </div>

              {/* Package history */}
              <div className="space-y-2 flex-grow overflow-y-auto max-h-[140px] border-t border-zinc-900 pt-4 mt-4 font-mono text-[9px] text-zinc-500">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Packet transmission log</span>
                {sentPackets.length === 0 ? (
                  <p className="italic text-zinc-700">No custom packets injected yet.</p>
                ) : (
                  sentPackets.map((pkt) => (
                    <div key={pkt.id} className="flex justify-between items-center border-b border-zinc-900/60 pb-1 font-mono">
                      <span className="text-zinc-300 truncate max-w-[150px]">P#{pkt.id} "{pkt.payload}"</span>
                      <div className="flex gap-2">
                        <span className="text-emerald-400">{pkt.latency}ms</span>
                        <span className="text-zinc-600">[{pkt.timestamp}]</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-16 pt-8 text-center">
        <p className="text-[10px] font-mono tracking-wider text-zinc-700">
          REAL-TIME WEBSOCKET TELEMETRY SYSTEM © {new Date().getFullYear()} — SAI KUMARU NAIDU
        </p>
      </footer>

    </div>
  );
}
