"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, ShieldAlert, ShieldCheck, Search, Link2, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";

interface ScanResult {
  url: string;
  isSafe: boolean;
  score: number; // 0 to 100 risk score
  ssl: boolean;
  brandMimic: boolean;
  suspiciousTld: boolean;
  highEntropy: boolean;
}

const PRESET_URLS = [
  { label: "Wells Fargo Phishing", url: "http://wellsfargo-accounts-verification.net/signin" },
  { label: "Paypal Clone Scam", url: "https://paypal-secure-checkouts.com/login" },
  { label: "Official Google Search", url: "https://google.com" },
  { label: "Steam Trade Scam", url: "http://steamcommunity-giftcards.tk/trade" },
  { label: "Official GitHub Repo", url: "https://github.com/mikey470-sai" }
];

function analyzeUrl(inputUrl: string): ScanResult {
  const url = inputUrl.trim().toLowerCase();
  
  if (!url) {
    return { url, isSafe: true, score: 0, ssl: true, brandMimic: false, suspiciousTld: false, highEntropy: false };
  }

  let score = 0;
  const ssl = url.startsWith("https://");
  const hasHttp = url.startsWith("http://");

  // SSL penalty
  if (hasHttp) score += 25;

  // Brand mimic check
  const brands = ["paypal", "wellsfargo", "bankofamerica", "steam", "netflix", "amazon", "google", "apple"];
  let brandMimic = false;
  
  // Exclude official sites
  const isOfficial = url.includes("paypal.com") || url.includes("wellsfargo.com") || url.includes("google.com") || url.includes("github.com");
  
  if (!isOfficial) {
    brands.forEach((brand) => {
      if (url.includes(brand) && !url.endsWith(`${brand}.com`) && !url.includes(`${brand}.com/`)) {
        brandMimic = true;
      }
    });
  }

  if (brandMimic) score += 40;

  // Suspicious TLD check
  const badTlds = [".tk", ".cf", ".gq", ".ml", ".ga", ".xyz", ".club", ".click", ".info", ".net"];
  let suspiciousTld = false;
  badTlds.forEach((tld) => {
    if (url.includes(tld) && !url.includes(`${tld}.com`)) {
      suspiciousTld = true;
    }
  });

  if (suspiciousTld) score += 20;

  // Entropy check (dashes or random looking characters)
  const domainPart = url.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
  const dashCount = (domainPart.match(/-/g) || []).length;
  const highEntropy = dashCount >= 2 || domainPart.length > 28;

  if (highEntropy) score += 15;

  // Final validation
  score = Math.min(100, score);
  const isSafe = score < 45;

  return {
    url: inputUrl,
    isSafe,
    score,
    ssl,
    brandMimic,
    suspiciousTld,
    highEntropy
  };
}

export default function NoPhishDemo() {
  const [urlInput, setUrlInput] = useState(PRESET_URLS[0].url);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [strictMode, setStrictMode] = useState(false);
  const [whitelist, setWhitelist] = useState<string[]>(["google.com", "github.com"]);
  const [newWhitelistUrl, setNewWhitelistUrl] = useState("");

  useEffect(() => {
    // Initial scan
    setScanResult(analyzeUrl(PRESET_URLS[0].url));
  }, []);

  const handleScan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      // Check if domain is in whitelist
      const domain = urlInput.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
      if (whitelist.includes(domain)) {
        setScanResult({
          url: urlInput,
          isSafe: true,
          score: 5,
          ssl: true,
          brandMimic: false,
          suspiciousTld: false,
          highEntropy: false
        });
      } else {
        setScanResult(analyzeUrl(urlInput));
      }
      setIsScanning(false);
    }, 600);
  };

  const handlePresetSelect = (url: string) => {
    setUrlInput(url);
    setIsScanning(true);
    setTimeout(() => {
      setScanResult(analyzeUrl(url));
      setIsScanning(false);
    }, 500);
  };

  const handleAddWhitelist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWhitelistUrl.trim()) return;
    setWhitelist((prev) => [...prev, newWhitelistUrl.trim().toLowerCase()]);
    setNewWhitelistUrl("");
  };

  const handleRemoveWhitelist = (domain: string) => {
    setWhitelist((prev) => prev.filter((d) => d !== domain));
  };

  return (
    <div className="min-h-screen bg-[#070b0b] text-zinc-200 selection:bg-teal-400 selection:text-[#070b0b] font-sans pb-16">
      
      {/* Decorative glows */}
      <div className="absolute top-0 right-10 w-[400px] h-[400px] rounded-full bg-teal-400/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-cyan-500/2 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-[#070b0b]/80 backdrop-blur px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center justify-center p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <h1 className="font-display font-bold text-lg md:text-xl text-white tracking-tight uppercase leading-none">
                NOPhish Link Detector
              </h1>
            </div>
            <p className="text-[10px] md:text-xs text-zinc-400 font-mono mt-1">
              STATIC HEURISTIC ANALYSIS · BROWSER EXTENSION SANDBOX
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        
        {/* URL scanning layout & Chrome Extension frame row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Preset scanning tools */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-teal-400 mb-6 flex items-center gap-2">
                <Search className="w-4 h-4" /> Link Scan Database
              </h3>

              {/* Custom input */}
              <form onSubmit={handleScan} className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Enter URL to analyze (e.g. http://scamdomain.tk)..."
                  className="flex-grow px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  disabled={isScanning || !urlInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-[#070b0b] font-bold text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-all"
                >
                  Scan URL
                </button>
              </form>

              {/* Presets List */}
              <div className="mt-6">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">SCAM & LEGITIMATE PRESET LINKS:</span>
                <div className="space-y-2">
                  {PRESET_URLS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => handlePresetSelect(p.url)}
                      className="w-full text-left p-2.5 rounded-lg border border-zinc-900 bg-zinc-900/30 hover:border-zinc-800 text-[11px] font-mono transition-colors flex justify-between items-center group cursor-pointer"
                    >
                      <span className="text-zinc-400 group-hover:text-white truncate max-w-[200px] sm:max-w-md">{p.url}</span>
                      <span className="text-[9.5px] font-semibold text-zinc-500 shrink-0 font-sans">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Extension settings simulation */}
            <div className="glass-card rounded-2xl p-6 border border-zinc-800/60 bg-zinc-950/40">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-6 pb-2 border-b border-zinc-900 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Sandbox Preferences
              </h3>

              <div className="space-y-6">
                {/* Toggle strict mode */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-zinc-300 block">Strict Scanning Mode</span>
                    <span className="text-[10px] text-zinc-500 font-light mt-0.5 block">Flags suspicious domain entropy thresholds aggressively</span>
                  </div>
                  <button
                    onClick={() => setStrictMode(!strictMode)}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {strictMode ? <ToggleRight className="w-8 h-8 text-teal-500" /> : <ToggleLeft className="w-8 h-8 text-zinc-700" />}
                  </button>
                </div>

                {/* Whitelist Manager */}
                <div className="space-y-3 pt-4 border-t border-zinc-900">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Whitelist domain registry</span>
                  
                  <form onSubmit={handleAddWhitelist} className="flex gap-2">
                    <input
                      type="text"
                      value={newWhitelistUrl}
                      onChange={(e) => setNewWhitelistUrl(e.target.value)}
                      placeholder="e.g. facebook.com"
                      className="flex-grow px-2 py-1.5 bg-zinc-900 border border-zinc-900 rounded-lg text-[11px] text-white focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="submit"
                      disabled={!newWhitelistUrl.trim()}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[10px] uppercase font-bold tracking-wider text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Add Domain
                    </button>
                  </form>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {whitelist.map((domain) => (
                      <span
                        key={domain}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center gap-1.5"
                      >
                        {domain}
                        <button
                          onClick={() => handleRemoveWhitelist(domain)}
                          className="hover:text-rose-400 font-bold transition-colors cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Browser Extension popup mock */}
          <div className="lg:col-span-5">
            <div className="w-full bg-[#18181c] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Mock Address Bar */}
              <div className="bg-[#121214] border-b border-zinc-900 px-4 py-2 flex items-center gap-2 text-xs text-zinc-500 font-mono select-none">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <div className="bg-zinc-950 border border-zinc-900 rounded-md flex-grow px-2 py-0.5 truncate text-[10.5px]">
                  {urlInput || "https://"}
                </div>
              </div>

              {/* Extension Window Content */}
              <div className="p-6 bg-zinc-950 min-h-[380px] flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-900 mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base text-teal-400 font-black">🛡️</span>
                      <span className="text-xs font-bold font-display uppercase tracking-widest text-white">NOPhish Extension</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[8px] font-mono text-zinc-500">V1.2 ACTIVE</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {isScanning ? (
                      <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 space-y-3"
                      >
                        <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">Scanning heuristic database...</span>
                      </motion.div>
                    ) : scanResult ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        
                        {/* Risk Gauge Header */}
                        <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-900 bg-zinc-900/20">
                          <div className="flex items-center gap-3">
                            {scanResult.isSafe ? (
                              <div className="w-10 h-10 rounded-full bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                <ShieldCheck className="w-6 h-6" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-rose-950/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                                <ShieldAlert className="w-6 h-6 animate-pulse" />
                              </div>
                            )}

                            <div>
                              <span className="text-[9px] font-mono text-zinc-500 uppercase block">SECURITY STATUS</span>
                              <span className={`text-sm font-black tracking-wide ${scanResult.isSafe ? "text-emerald-400" : "text-rose-400"}`}>
                                {scanResult.isSafe ? "VERIFIED SAFE" : "PHISHING SUSPECT"}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase block">RISK SCORE</span>
                            <span className={`text-base font-mono font-black ${scanResult.isSafe ? "text-emerald-400" : "text-rose-400"}`}>
                              {scanResult.score}%
                            </span>
                          </div>
                        </div>

                        {/* Parameter list */}
                        <div className="space-y-2.5 text-[10px] font-mono">
                          {[
                            { label: "SSL Protocol Check", status: scanResult.ssl, passMsg: "HTTPS Secure Certificate", failMsg: "Plaintext HTTP Connection (Risky)" },
                            { label: "Lookalike Brand check", status: !scanResult.brandMimic, passMsg: "No mimicry flagged", failMsg: " mimics popular financial/gaming brands" },
                            { label: "TLD Registry Assessment", status: !scanResult.suspiciousTld, passMsg: "Standard domain registry", failMsg: "Suspicious or high-risk TLD extension" },
                            { label: "Domain Entropy Score", status: !scanResult.highEntropy, passMsg: "Natural domain syntax", failMsg: "High dash counts / long syntax pattern" }
                          ].map((crit, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-zinc-950 pb-1.5">
                              <span className="text-zinc-500">{crit.label}:</span>
                              <span className={`font-bold ${crit.status ? "text-emerald-500" : "text-rose-500"}`}>
                                {crit.status ? crit.passMsg : crit.failMsg}
                              </span>
                            </div>
                          ))}
                        </div>

                      </motion.div>
                    ) : (
                      <div className="text-center py-20 text-zinc-600 text-xs italic">
                        Ready to scan address domain.
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* extension Footer */}
                <div className="border-t border-zinc-900 pt-4 text-[9px] font-mono text-zinc-600 flex justify-between uppercase">
                  <span>SANDBOX SIM: ACTIVE</span>
                  <span>SSL STAMP: AUTO_VER_0.4</span>
                </div>

              </div>

            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-16 pt-8 text-center">
        <p className="text-[10px] font-mono tracking-wider text-zinc-700">
          NOPHISH EXTENSION SANDBOX INTERFACE © {new Date().getFullYear()} — SAI KUMARU NAIDU
        </p>
      </footer>

    </div>
  );
}
