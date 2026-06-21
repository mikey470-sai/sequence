"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Server, RefreshCw, Send, Terminal, HelpCircle } from "lucide-react";
import Link from "next/link";

interface MicroserviceNode {
  id: string;
  name: string;
  desc: string;
  status: "idle" | "active" | "success" | "fail";
}

interface LogEntry {
  time: string;
  service: string;
  msg: string;
  type: "info" | "success" | "error" | "warn";
}

export default function MicroservicesDemo() {
  const [selectedFlow, setSelectedFlow] = useState<"success" | "saga_payment_fail" | "saga_inventory_fail">("success");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  const [nodes, setNodes] = useState<MicroserviceNode[]>([
    { id: "gateway", name: "API Gateway", desc: "Kong / Fast API Gateway", status: "idle" },
    { id: "user", name: "User Service", desc: "User Accounts & JWT", status: "idle" },
    { id: "product", name: "Product Service", desc: "Inventory Catalogs", status: "idle" },
    { id: "order", name: "Order Service", desc: "Order Creation", status: "idle" },
    { id: "payment", name: "Payment Service", desc: "Stripe Integrations", status: "idle" },
    { id: "kafka", name: "Kafka Broker", desc: "Event Broker / Saga Coordinator", status: "idle" }
  ]);

  const addLog = (service: string, msg: string, type: "info" | "success" | "error" | "warn" = "info") => {
    const time = new Date().toLocaleTimeString().split(" ")[0];
    setLogs((prev) => [...prev, { time, service, msg, type }]);
  };

  const updateNodeStatus = (id: string, status: MicroserviceNode["status"]) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, status } : n)));
  };

  const resetAllNodes = () => {
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));
    setLogs([]);
    setIsPlaying(false);
    setActiveStep(0);
  };

  // Execution flow logic
  useEffect(() => {
    if (!isPlaying) return;

    let timer: NodeJS.Timeout;

    // --- SUCCESS FLOW ---
    if (selectedFlow === "success") {
      if (activeStep === 1) {
        updateNodeStatus("gateway", "active");
        addLog("API_GATEWAY", "POST /api/v1/orders received. Validating auth token...", "info");
        timer = setTimeout(() => {
          updateNodeStatus("gateway", "success");
          updateNodeStatus("user", "active");
          addLog("USER_SERVICE", "Verifying customer profile balance & permissions...", "info");
          setActiveStep(2);
        }, 1000);
      } else if (activeStep === 2) {
        timer = setTimeout(() => {
          updateNodeStatus("user", "success");
          updateNodeStatus("product", "active");
          addLog("PRODUCT_SERVICE", "Locking 1 unit of Item SKU_4200 (Inventory count: 24)...", "info");
          setActiveStep(3);
        }, 1000);
      } else if (activeStep === 3) {
        timer = setTimeout(() => {
          updateNodeStatus("product", "success");
          updateNodeStatus("order", "active");
          addLog("ORDER_SERVICE", "Writing temporary order ID order_512 to PostgreSQL...", "info");
          setActiveStep(4);
        }, 1000);
      } else if (activeStep === 4) {
        timer = setTimeout(() => {
          updateNodeStatus("order", "success");
          updateNodeStatus("kafka", "active");
          addLog("KAFKA_BROKER", "Dispatched topic: order_pending. Tracing payment listener...", "info");
          setActiveStep(5);
        }, 1000);
      } else if (activeStep === 5) {
        timer = setTimeout(() => {
          updateNodeStatus("kafka", "success");
          updateNodeStatus("payment", "active");
          addLog("PAYMENT_SERVICE", "Triggering payment checkout. Card charged $120.00", "success");
          setActiveStep(6);
        }, 1000);
      } else if (activeStep === 6) {
        timer = setTimeout(() => {
          updateNodeStatus("payment", "success");
          addLog("ORDER_SERVICE", "Order state changed to: APPROVED. Dispatched confirmation mail", "success");
          addLog("API_GATEWAY", "Returned HTTP 201 Created.", "success");
          setIsPlaying(false);
        }, 1000);
      }
    } 
    
    // --- SAGA PAYMENT FAIL FLOW ---
    else if (selectedFlow === "saga_payment_fail") {
      if (activeStep === 1) {
        updateNodeStatus("gateway", "active");
        addLog("API_GATEWAY", "POST /api/v1/orders received.", "info");
        timer = setTimeout(() => {
          updateNodeStatus("gateway", "success");
          updateNodeStatus("product", "active");
          addLog("PRODUCT_SERVICE", "Locking 1 unit of Item SKU_4200 (Inventory count: 24)...", "info");
          setActiveStep(2);
        }, 1000);
      } else if (activeStep === 2) {
        timer = setTimeout(() => {
          updateNodeStatus("product", "success");
          updateNodeStatus("order", "active");
          addLog("ORDER_SERVICE", "Writing order ID order_513 to PostgreSQL...", "info");
          setActiveStep(3);
        }, 1000);
      } else if (activeStep === 3) {
        timer = setTimeout(() => {
          updateNodeStatus("order", "success");
          updateNodeStatus("kafka", "active");
          addLog("KAFKA_BROKER", "Dispatched topic: order_pending. Activating payment executor...", "info");
          setActiveStep(4);
        }, 1000);
      } else if (activeStep === 4) {
        timer = setTimeout(() => {
          updateNodeStatus("kafka", "fail");
          updateNodeStatus("payment", "active");
          addLog("PAYMENT_SERVICE", "Attempting payment checkout charge...", "info");
          timer = setTimeout(() => {
            updateNodeStatus("payment", "fail");
            addLog("PAYMENT_SERVICE", "Charge failed: Insufficient account funds (HTTP 402)", "error");
            setActiveStep(5);
          }, 1000);
        }, 1000);
      } else if (activeStep === 5) {
        // Triggers Saga Rollback Compensation
        timer = setTimeout(() => {
          updateNodeStatus("kafka", "active");
          addLog("KAFKA_BROKER", "Dispatched topic: payment_failed. Triggering compensating transactions!", "warn");
          setActiveStep(6);
        }, 1000);
      } else if (activeStep === 6) {
        timer = setTimeout(() => {
          updateNodeStatus("order", "fail");
          addLog("ORDER_SERVICE", "SAGA COMPENSATOR: Cancelling order ID order_513. PostgreSQL row updated: CANCELLED", "warn");
          updateNodeStatus("product", "fail");
          addLog("PRODUCT_SERVICE", "SAGA COMPENSATOR: Unlocking Item SKU_4200. Inventory restored +1", "warn");
          setActiveStep(7);
        }, 1200);
      } else if (activeStep === 7) {
        timer = setTimeout(() => {
          updateNodeStatus("gateway", "fail");
          addLog("API_GATEWAY", "Returned HTTP 402 Payment Required. Distributed Saga Rollback transaction finished successfully.", "error");
          setIsPlaying(false);
        }, 1000);
      }
    }

    // --- SAGA INVENTORY FAIL FLOW ---
    else if (selectedFlow === "saga_inventory_fail") {
      if (activeStep === 1) {
        updateNodeStatus("gateway", "active");
        addLog("API_GATEWAY", "POST /api/v1/orders received.", "info");
        timer = setTimeout(() => {
          updateNodeStatus("gateway", "success");
          updateNodeStatus("product", "active");
          addLog("PRODUCT_SERVICE", "Checking inventory for Item SKU_9999 (Out of stock!)...", "warn");
          setActiveStep(2);
        }, 1000);
      } else if (activeStep === 2) {
        timer = setTimeout(() => {
          updateNodeStatus("product", "fail");
          addLog("PRODUCT_SERVICE", "ERROR: Request item SKU_9999 is out of stock", "error");
          setActiveStep(3);
        }, 1000);
      } else if (activeStep === 3) {
        timer = setTimeout(() => {
          updateNodeStatus("gateway", "fail");
          addLog("API_GATEWAY", "Returned HTTP 400 Bad Request: Item out of stock. Terminating request.", "error");
          setIsPlaying(false);
        }, 1000);
      }
    }

    return () => clearTimeout(timer);
  }, [isPlaying, activeStep]);

  const handleStartTrace = () => {
    resetAllNodes();
    setIsPlaying(true);
    setActiveStep(1);
  };

  return (
    <div className="min-h-screen bg-[#0d0a07] text-zinc-200 selection:bg-amber-400 selection:text-[#0d0a07] font-sans pb-16">
      
      {/* Decorative glows */}
      <div className="absolute top-0 right-10 w-[400px] h-[400px] rounded-full bg-amber-400/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-brand-accent/2 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-[#0d0a07]/80 backdrop-blur px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center justify-center p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <h1 className="font-display font-bold text-lg md:text-xl text-white tracking-tight uppercase leading-none">
                Microservices Backend
              </h1>
            </div>
            <p className="text-[10px] md:text-xs text-zinc-400 font-mono mt-1">
              DISTRIBUTED SAGA ROLLBACK FLOW TRACER
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        
        {/* Scenario Controls Bar */}
        <section className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Send className="w-4 h-4 text-amber-500" /> Choose Saga Flow Scenario
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-grow max-w-3xl md:mx-6">
            <button
              onClick={() => {
                setSelectedFlow("success");
                resetAllNodes();
              }}
              disabled={isPlaying}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 cursor-pointer ${selectedFlow === "success" ? "border-amber-500 bg-amber-500/10 text-white" : "border-zinc-800 bg-zinc-900/20 text-zinc-500 hover:text-zinc-300 disabled:opacity-50"}`}
            >
              Successful Order Flow
            </button>
            <button
              onClick={() => {
                setSelectedFlow("saga_payment_fail");
                resetAllNodes();
              }}
              disabled={isPlaying}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 cursor-pointer ${selectedFlow === "saga_payment_fail" ? "border-amber-500 bg-amber-500/10 text-white" : "border-zinc-800 bg-zinc-900/20 text-zinc-500 hover:text-zinc-300 disabled:opacity-50"}`}
            >
              Payment Fails (Saga Rollback)
            </button>
            <button
              onClick={() => {
                setSelectedFlow("saga_inventory_fail");
                resetAllNodes();
              }}
              disabled={isPlaying}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 cursor-pointer ${selectedFlow === "saga_inventory_fail" ? "border-amber-500 bg-amber-500/10 text-white" : "border-zinc-800 bg-zinc-900/20 text-zinc-500 hover:text-zinc-300 disabled:opacity-50"}`}
            >
              Inventory Fails (Quick Error)
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetAllNodes}
              className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900 text-[10px] font-bold tracking-wider uppercase text-zinc-400 hover:text-white cursor-pointer active:scale-95"
            >
              Reset
            </button>
            <button
              onClick={handleStartTrace}
              disabled={isPlaying}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-brand-accent text-white text-[10px] font-extrabold tracking-wider uppercase hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Run Transaction
            </button>
          </div>
        </section>

        {/* Node Topology and logs console row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Microservices Node Diagram Layout */}
          <div className="lg:col-span-8">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40 min-h-[360px] flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-6 pb-2 border-b border-zinc-900">
                  Microservices Architecture Topology Map
                </h3>

                {/* Nodes Display Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 relative">
                  
                  {nodes.map((node) => {
                    const isActive = node.status === "active";
                    const isSuccess = node.status === "success";
                    const isFail = node.status === "fail";

                    return (
                      <div
                        key={node.id}
                        className={`p-4 rounded-xl border flex flex-col justify-between items-start transition-all duration-300 relative ${isActive ? "border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.1)] scale-102" : isSuccess ? "border-emerald-500/30 bg-emerald-950/5" : isFail ? "border-rose-500 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.1)]" : "border-zinc-800 bg-zinc-900/10 text-zinc-500"}`}
                      >
                        <div className="flex items-center gap-2 mb-2 w-full">
                          <div className={`p-2 rounded-lg ${isActive ? "bg-amber-500/20 text-amber-500" : isSuccess ? "bg-emerald-950/30 text-emerald-400" : isFail ? "bg-rose-950/30 text-rose-400" : "bg-zinc-900 text-zinc-600"}`}>
                            <Server className="w-4 h-4" />
                          </div>
                          <span className={`text-[10px] font-bold font-display uppercase truncate ${isActive ? "text-amber-500" : isSuccess ? "text-emerald-400" : isFail ? "text-rose-400" : "text-zinc-400"}`}>
                            {node.name}
                          </span>
                        </div>

                        <p className={`text-[9.5px] font-light leading-relaxed truncate w-full ${isActive ? "text-zinc-300" : isSuccess ? "text-zinc-400" : "text-zinc-600"}`}>
                          {node.desc}
                        </p>

                        {/* Status tag */}
                        <div className="mt-3 flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${isActive ? "bg-amber-500 animate-ping" : isSuccess ? "bg-emerald-500" : isFail ? "bg-rose-500 animate-pulse" : "bg-zinc-800"}`} />
                          <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                            {node.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase mt-4">
                <span>Distributed Saga Pattern: Orchestrated</span>
                <span>Active Nodes: {nodes.filter((n) => n.status !== "idle").length}/6</span>
              </div>
            </div>
          </div>

          {/* Logs console */}
          <div className="lg:col-span-4">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40 h-[385px] flex flex-col justify-between">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-4 pb-2 border-b border-zinc-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-500" /> Aggregated System Logs
              </h3>

              <div className="bg-[#050302] border border-zinc-900 rounded-xl p-4 flex-grow overflow-y-auto font-mono text-[9px] space-y-2 max-h-[240px]">
                {logs.length === 0 ? (
                  <p className="text-zinc-700 italic">No transactions executed yet. Run a transaction to see logs...</p>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="flex flex-col space-y-0.5 border-b border-zinc-950 pb-1.5">
                      <div className="flex justify-between text-[8px] text-zinc-600">
                        <span className={`font-bold ${log.type === "success" ? "text-emerald-500" : log.type === "error" ? "text-rose-500" : log.type === "warn" ? "text-amber-500" : "text-amber-400"}`}>
                          {log.service}
                        </span>
                        <span>{log.time}</span>
                      </div>
                      <span className={log.type === "success" ? "text-emerald-300" : log.type === "error" ? "text-rose-300" : log.type === "warn" ? "text-amber-300" : "text-zinc-300"}>
                        {log.msg}
                      </span>
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
          MICROSERVICE NETWORK TRACER CONSOLE © {new Date().getFullYear()} — SAI KUMARU NAIDU
        </p>
      </footer>

    </div>
  );
}
