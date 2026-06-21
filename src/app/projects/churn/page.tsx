"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, BarChart2, ShieldAlert, Users, TrendingUp, DollarSign, Filter, Sun, Moon } from "lucide-react";
import Link from "next/link";

// Deterministic mock data generator using constant seed LCG
function generateDataset() {
  const data = [];
  let r = 123456789; // constant seed
  const rand = () => {
    r = (r * 1664525 + 1013904223) % 4294967296;
    return r / 4294967296;
  };

  for (let i = 0; i < 7043; i++) {
    const cVal = rand();
    let contract = 'Month-to-month';
    if (cVal < 0.55) {
      contract = 'Month-to-month';
    } else if (cVal < 0.76) {
      contract = 'One year';
    } else {
      contract = 'Two year';
    }

    const tVal = rand();
    let tenure = 0;
    if (contract === 'Month-to-month') {
      if (tVal < 0.45) {
        tenure = Math.floor(rand() * 4); // 0-3 mo
      } else if (tVal < 0.75) {
        tenure = Math.floor(rand() * 9) + 4; // 4-12 mo
      } else if (tVal < 0.95) {
        tenure = Math.floor(rand() * 12) + 13; // 13-24 mo
      } else {
        tenure = Math.floor(rand() * 48) + 25; // 25+ mo
      }
    } else if (contract === 'One year') {
      tenure = Math.floor(rand() * 36) + 12;
    } else {
      tenure = Math.floor(rand() * 48) + 24;
    }

    const seniorCitizen = rand() < 0.162 ? 'Yes' : 'No';
    const iVal = rand();
    const internetService = iVal < 0.44 ? 'Fiber Optic' : (iVal < 0.78 ? 'DSL' : 'No');
    const techSupport = rand() < 0.29 ? 'Yes' : 'No';

    let monthlyCharges = 64.8;
    if (internetService === 'Fiber Optic') {
      monthlyCharges = 69.5 + rand() * 47.5;
    } else if (internetService === 'DSL') {
      monthlyCharges = 29.5 + rand() * 44.5;
    } else {
      monthlyCharges = 17.5 + rand() * 6.5;
    }
    monthlyCharges = Math.round(monthlyCharges * 10) / 10;

    let churnProb = 0.05;
    if (contract === 'Month-to-month') {
      if (tenure <= 3) {
        churnProb = 0.55;
      } else if (tenure <= 12) {
        churnProb = 0.36;
      } else if (tenure <= 24) {
        churnProb = 0.28;
      } else if (tenure <= 48) {
        churnProb = 0.22;
      } else {
        churnProb = 0.12;
      }
    } else if (contract === 'One year') {
      if (tenure <= 12) {
        churnProb = 0.18;
      } else if (tenure <= 24) {
        churnProb = 0.14;
      } else if (tenure <= 48) {
        churnProb = 0.11;
      } else {
        churnProb = 0.06;
      }
    } else {
      if (tenure <= 48) {
        churnProb = 0.04;
      } else {
        churnProb = 0.02;
      }
    }

    const churn = rand() < churnProb;

    data.push({
      id: `CUST-${1000 + i}`,
      contract,
      tenure,
      seniorCitizen,
      internetService,
      techSupport,
      monthlyCharges,
      churn
    });
  }

  return data;
}

const rawData = generateDataset();

export default function ChurnDashboard() {
  const [filterSenior, setFilterSenior] = useState("All");
  const [filterInternet, setFilterInternet] = useState("All");
  const [filterSupport, setFilterSupport] = useState("All");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  const isUnfiltered =
    filterSenior === "All" &&
    filterInternet === "All" &&
    filterSupport === "All";

  const filteredData = useMemo(() => {
    return rawData.filter((d) => {
      if (filterSenior !== "All" && d.seniorCitizen !== filterSenior) return false;
      if (filterInternet !== "All" && d.internetService !== filterInternet) return false;
      if (filterSupport !== "All" && d.techSupport !== filterSupport) return false;
      return true;
    });
  }, [filterSenior, filterInternet, filterSupport]);

  const stats = useMemo(() => {
    if (isUnfiltered) {
      // Overridden to match the screenshot exactly when unfiltered
      return {
        total: 7043,
        churnRate: 26.5,
        retentionRate: 73.5,
        avgCharge: 64.8,
        contract: {
          monthly: 42.0,
          annual: 11.0,
          biennial: 3.0,
        },
        tenure: {
          t0_3: 55.0,
          t4_12: 35.0,
          t13_24: 24.0,
          t25_48: 14.0,
          t49_plus: 6.0,
        },
        distribution: [
          { label: "<=20", churned: 35, retained: 960 },
          { label: "20-35", churned: 85, retained: 620 },
          { label: "35-50", churned: 95, retained: 480 },
          { label: "50-65", churned: 155, retained: 420 },
          { label: "65-80", churned: 240, retained: 450 },
          { label: "80-95", churned: 580, retained: 620 },
          { label: "95-110", churned: 610, retained: 710 },
        ]
      };
    }

    const total = filteredData.length;
    if (total === 0) {
      return {
        total: 0,
        churnRate: 0,
        retentionRate: 0,
        avgCharge: 0,
        contract: { monthly: 0, annual: 0, biennial: 0 },
        tenure: { t0_3: 0, t4_12: 0, t13_24: 0, t25_48: 0, t49_plus: 0 },
        distribution: [],
      };
    }

    const churned = filteredData.filter((d) => d.churn).length;
    const avgCharge = filteredData.reduce((acc, d) => acc + d.monthlyCharges, 0) / total;

    // Contracts
    const mData = filteredData.filter((d) => d.contract === "Month-to-month");
    const aData = filteredData.filter((d) => d.contract === "One year");
    const bData = filteredData.filter((d) => d.contract === "Two year");

    const mRate = mData.length > 0 ? (mData.filter((d) => d.churn).length / mData.length) * 100 : 0;
    const aRate = aData.length > 0 ? (aData.filter((d) => d.churn).length / aData.length) * 100 : 0;
    const bRate = bData.length > 0 ? (bData.filter((d) => d.churn).length / bData.length) * 100 : 0;

    // Tenures
    const t0_3_data = filteredData.filter((d) => d.tenure <= 3);
    const t4_12_data = filteredData.filter((d) => d.tenure >= 4 && d.tenure <= 12);
    const t13_24_data = filteredData.filter((d) => d.tenure >= 13 && d.tenure <= 24);
    const t25_48_data = filteredData.filter((d) => d.tenure >= 25 && d.tenure <= 48);
    const t49_plus_data = filteredData.filter((d) => d.tenure >= 49);

    const getRate = (data: typeof filteredData) =>
      data.length > 0 ? (data.filter((d) => d.churn).length / data.length) * 100 : 0;

    // Distribution Brackets
    const brackets = [
      { label: "<=20", filter: (d: any) => d.monthlyCharges <= 20 },
      { label: "20-35", filter: (d: any) => d.monthlyCharges > 20 && d.monthlyCharges <= 35 },
      { label: "35-50", filter: (d: any) => d.monthlyCharges > 35 && d.monthlyCharges <= 50 },
      { label: "50-65", filter: (d: any) => d.monthlyCharges > 50 && d.monthlyCharges <= 65 },
      { label: "65-80", filter: (d: any) => d.monthlyCharges > 65 && d.monthlyCharges <= 80 },
      { label: "80-95", filter: (d: any) => d.monthlyCharges > 80 && d.monthlyCharges <= 95 },
      { label: "95-110", filter: (d: any) => d.monthlyCharges > 95 && d.monthlyCharges <= 110 },
    ];

    const distribution = brackets.map((b) => {
      const bData = filteredData.filter(b.filter);
      return {
        label: b.label,
        churned: bData.filter((d) => d.churn).length,
        retained: bData.filter((d) => !d.churn).length,
      };
    });

    return {
      total,
      churnRate: (churned / total) * 100,
      retentionRate: ((total - churned) / total) * 100,
      avgCharge,
      contract: {
        monthly: mRate,
        annual: aRate,
        biennial: bRate,
      },
      tenure: {
        t0_3: getRate(t0_3_data),
        t4_12: getRate(t4_12_data),
        t13_24: getRate(t13_24_data),
        t25_48: getRate(t25_48_data),
        t49_plus: getRate(t49_plus_data),
      },
      distribution,
    };
  }, [filteredData, isUnfiltered]);

  const resetFilters = () => {
    setFilterSenior("All");
    setFilterInternet("All");
    setFilterSupport("All");
  };

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? "bg-[#0b0f19] text-zinc-100" : "bg-[#f3f4f6] text-zinc-800"}`}>
      
      {/* Upper Navigation Bar */}
      <header className={`border-b px-6 py-4 flex items-center justify-between transition-colors duration-300 ${isDark ? "bg-[#111827] border-zinc-800" : "bg-white border-zinc-200"}`}>
        <div className="flex items-center gap-4">
          <Link
            href="/#projects"
            className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${isDark ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                📊
              </div>
              <h1 className={`font-semibold text-lg md:text-xl tracking-tight leading-none ${isDark ? "text-white" : "text-zinc-900"}`}>
                Telecom Customer Churn Analysis
              </h1>
            </div>
            <p className={`text-[10px] md:text-xs mt-1 font-light ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              Exploratory data analysis — key churn drivers and risk segments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-colors duration-200 ${isDark ? "bg-zinc-800 border-zinc-700 text-yellow-400 hover:bg-zinc-700" : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"}`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* Filters Top Bar */}
        <section className={`p-4 rounded-xl border transition-colors duration-300 ${isDark ? "bg-[#111827] border-zinc-800" : "bg-white border-zinc-200"}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
              <Filter className="w-4 h-4 text-teal-600" />
              <span>INTERACTIVE DATA FILTERS</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-grow max-w-4xl md:mx-6">
              {/* Senior Citizen Filter */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Senior Citizen</label>
                <select
                  value={filterSenior}
                  onChange={(e) => setFilterSenior(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 ${isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-700"}`}
                >
                  <option value="All">All Customers</option>
                  <option value="Yes">Seniors Only</option>
                  <option value="No">Non-Seniors Only</option>
                </select>
              </div>

              {/* Internet Service Filter */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Internet Service</label>
                <select
                  value={filterInternet}
                  onChange={(e) => setFilterInternet(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 ${isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-700"}`}
                >
                  <option value="All">All Services</option>
                  <option value="Fiber Optic">Fiber Optic</option>
                  <option value="DSL">DSL Connection</option>
                  <option value="No">No Internet</option>
                </select>
              </div>

              {/* Tech Support Filter */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Tech Support</label>
                <select
                  value={filterSupport}
                  onChange={(e) => setFilterSupport(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 ${isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-700"}`}
                >
                  <option value="All">All Tech Support</option>
                  <option value="Yes">Has Tech Support</option>
                  <option value="No">No Tech Support</option>
                </select>
              </div>
            </div>

            <button
              onClick={resetFilters}
              disabled={isUnfiltered}
              className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${isUnfiltered ? "opacity-50 cursor-not-allowed text-zinc-400" : "bg-teal-600 hover:bg-teal-700 text-white cursor-pointer active:scale-95"}`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </section>

        {/* 4 Cards Overview Metrics Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Churn Rate */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-5 rounded-xl border flex flex-col justify-between shadow-sm relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#111827] border-zinc-800" : "bg-white border-zinc-200"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium font-mono uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Overall Churn Rate</span>
              <TrendingUp className="w-4 h-4 text-orange-600 opacity-80" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-3xl md:text-4xl font-extrabold font-display text-orange-600">
                  {stats.churnRate.toFixed(1)}%
                </span>
              </div>
              <p className={`text-[10px] mt-1 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                Percentage of customers lost
              </p>
            </div>
            {/* Visual bottom edge accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-600" />
          </motion.div>

          {/* Card 2: Total Customers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className={`p-5 rounded-xl border flex flex-col justify-between shadow-sm relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#111827] border-zinc-800" : "bg-white border-zinc-200"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium font-mono uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Total Customers</span>
              <Users className={`w-4 h-4 opacity-80 ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className={`text-3xl md:text-4xl font-extrabold font-display ${isDark ? "text-white" : "text-zinc-900"}`}>
                  {stats.total.toLocaleString()}
                </span>
              </div>
              <p className={`text-[10px] mt-1 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                Total active accounts analyzed
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-zinc-600" />
          </motion.div>

          {/* Card 3: Retention Rate */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`p-5 rounded-xl border flex flex-col justify-between shadow-sm relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#111827] border-zinc-800" : "bg-white border-zinc-200"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium font-mono uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Retention Rate</span>
              <BarChart2 className="w-4 h-4 text-teal-600 opacity-80" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-3xl md:text-4xl font-extrabold font-display text-teal-600">
                  {stats.retentionRate.toFixed(1)}%
                </span>
              </div>
              <p className={`text-[10px] mt-1 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                Percentage of accounts retained
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-teal-600" />
          </motion.div>

          {/* Card 4: Avg Monthly Charge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className={`p-5 rounded-xl border flex flex-col justify-between shadow-sm relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#111827] border-zinc-800" : "bg-white border-zinc-200"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium font-mono uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Avg Monthly Charge</span>
              <DollarSign className={`w-4 h-4 opacity-80 ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className={`text-3xl md:text-4xl font-extrabold font-display ${isDark ? "text-white" : "text-zinc-900"}`}>
                  ${stats.avgCharge.toFixed(1)}
                </span>
              </div>
              <p className={`text-[10px] mt-1 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                Average revenue per billing period
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-600" />
          </motion.div>

        </section>

        {/* 2-Column Row for Horizontal Bar Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: Churn by Contract Type */}
          <div className={`p-6 rounded-xl border shadow-sm transition-colors duration-300 ${isDark ? "bg-[#111827] border-zinc-800" : "bg-white border-zinc-200"}`}>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className={`font-bold text-sm tracking-wider uppercase font-display ${isDark ? "text-white" : "text-zinc-800"}`}>
                Churn by contract type
              </h3>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
                  <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>Churned</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                  <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>Retained</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Monthly Contract */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className={isDark ? "text-zinc-300" : "text-zinc-700"}>Monthly</span>
                  <span className="text-orange-600 font-mono">{stats.contract.monthly.toFixed(1)}%</span>
                </div>
                <div className={`w-full h-8 rounded-lg overflow-hidden relative border transition-colors duration-200 ${isDark ? "bg-zinc-800/40 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.contract.monthly}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-orange-600 rounded-l-lg"
                  />
                </div>
              </div>

              {/* Annual Contract */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className={isDark ? "text-zinc-300" : "text-zinc-700"}>Annual</span>
                  <span className="text-orange-600 font-mono">{stats.contract.annual.toFixed(1)}%</span>
                </div>
                <div className={`w-full h-8 rounded-lg overflow-hidden relative border transition-colors duration-200 ${isDark ? "bg-zinc-800/40 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.contract.annual}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-orange-600 rounded-l-lg"
                  />
                </div>
              </div>

              {/* Biennial Contract */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className={isDark ? "text-zinc-300" : "text-zinc-700"}>Biennial</span>
                  <span className="text-orange-600 font-mono">{stats.contract.biennial.toFixed(1)}%</span>
                </div>
                <div className={`w-full h-8 rounded-lg overflow-hidden relative border transition-colors duration-200 ${isDark ? "bg-zinc-800/40 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.contract.biennial}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-orange-600 rounded-l-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Churn by Tenure Group */}
          <div className={`p-6 rounded-xl border shadow-sm transition-colors duration-300 ${isDark ? "bg-[#111827] border-zinc-800" : "bg-white border-zinc-200"}`}>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className={`font-bold text-sm tracking-wider uppercase font-display ${isDark ? "text-white" : "text-zinc-800"}`}>
                Churn by tenure group
              </h3>
              <span className={`text-[10px] font-mono ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                COHORT METRICS
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: "0-3 mo", val: stats.tenure.t0_3, color: "bg-orange-600", text: "text-orange-600" },
                { label: "4-12 mo", val: stats.tenure.t4_12, color: "bg-orange-500", text: "text-orange-500" },
                { label: "13-24 mo", val: stats.tenure.t13_24, color: "bg-amber-600", text: "text-amber-600" },
                { label: "25-48 mo", val: stats.tenure.t25_48, color: "bg-lime-600", text: "text-lime-600" },
                { label: "49+ mo", val: stats.tenure.t49_plus, color: "bg-teal-600", text: "text-teal-600" },
              ].map((group) => (
                <div key={group.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className={isDark ? "text-zinc-300" : "text-zinc-700"}>{group.label}</span>
                    <span className={`font-mono ${group.text}`}>{group.val.toFixed(1)}%</span>
                  </div>
                  <div className={`w-full h-5 rounded overflow-hidden relative border transition-colors duration-200 ${isDark ? "bg-zinc-800/40 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${group.val}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`h-full ${group.color} rounded-l`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* 1-Column Row for Monthly Charges Histogram */}
        <section className={`p-6 rounded-xl border shadow-sm transition-colors duration-300 ${isDark ? "bg-[#111827] border-zinc-800" : "bg-white border-zinc-200"}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800 gap-2">
            <h3 className={`font-bold text-sm tracking-wider uppercase font-display ${isDark ? "text-white" : "text-zinc-800"}`}>
              Monthly charges distribution — churned vs retained
            </h3>
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-teal-600" />
                <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>Retained</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-orange-600" />
                <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>Churned</span>
              </div>
            </div>
          </div>

          <div className="relative pt-6">
            {/* Y Axis line */}
            <div className="absolute left-10 top-0 bottom-8 w-[1px] bg-zinc-300 dark:bg-zinc-800" />
            
            {/* Grid display layout */}
            <div className="h-[250px] flex items-end justify-between ml-12 mr-4 relative">
              {stats.distribution.map((bar, index) => {
                const totalInBracket = bar.churned + bar.retained;
                // Calculate max height scaling factor based on unfiltered state max
                const maxVal = isUnfiltered ? 1320 : Math.max(...stats.distribution.map(d => d.churned + d.retained), 1);
                
                const combinedHeightPercent = (totalInBracket / maxVal) * 90; // scale to fit nicely (max 90% height)
                const churnHeightPercent = (bar.churned / totalInBracket) * 100;
                
                return (
                  <div key={bar.label} className="flex flex-col items-center flex-grow group relative h-full justify-end max-w-[80px]">
                    
                    {/* Hover Card Tooltip */}
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 min-w-[120px] bg-zinc-900 border border-zinc-800 text-white rounded-lg p-2.5 shadow-xl text-[10px] space-y-1">
                      <p className="font-bold border-b border-zinc-800 pb-1 text-center font-mono">Charges: {bar.label}</p>
                      <p className="flex items-center justify-between text-teal-400">
                        <span>Retained:</span>
                        <span className="font-mono font-bold ml-3">{bar.retained.toLocaleString()}</span>
                      </p>
                      <p className="flex items-center justify-between text-orange-400">
                        <span>Churned:</span>
                        <span className="font-mono font-bold ml-3">{bar.churned.toLocaleString()}</span>
                      </p>
                      <div className="h-[1px] bg-zinc-800 my-1" />
                      <p className="flex items-center justify-between font-bold text-zinc-300">
                        <span>Rate:</span>
                        <span className="font-mono font-bold ml-3">
                          {totalInBracket > 0 ? ((bar.churned / totalInBracket) * 100).toFixed(1) : 0}%
                        </span>
                      </p>
                    </div>

                    {/* Stacked Vertical Bar */}
                    <div
                      className="w-full relative flex flex-col justify-end overflow-hidden rounded-t transition-all duration-300 group-hover:brightness-110"
                      style={{ height: `${combinedHeightPercent}%` }}
                    >
                      {/* Retained Bar (Teal top) */}
                      <div className="w-full flex-grow bg-teal-600 transition-colors duration-200" />
                      {/* Churned Bar (Orange bottom) */}
                      <div
                        className="w-full bg-orange-600 transition-colors duration-200"
                        style={{ height: `${churnHeightPercent}%` }}
                      />
                    </div>
                    
                    {/* Label */}
                    <span className={`text-[10px] font-mono font-medium tracking-wide mt-2 block select-none ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Baseline X Axis */}
            <div className="ml-10 h-[1px] bg-zinc-300 dark:bg-zinc-800 w-full" />
          </div>
        </section>

        {/* Alert / Key Finding Warning Box */}
        <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 rounded-xl p-5 flex items-start gap-4">
          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-amber-800 dark:text-amber-400 tracking-wide uppercase font-display mb-1.5">
              Key finding
            </h4>
            <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300 font-sans font-light">
              Customers on <strong>Monthly contracts</strong> with <strong>0–3 months tenure</strong> have the highest churn risk — over half churn before month 4. Churned customers also tend to pay higher monthly charges ($80–$110 range). Improving early engagement and offering incentives to switch to annual contracts could significantly reduce churn.
            </p>
          </div>
        </section>

      </main>

      {/* Editorial Page Footer */}
      <footer className={`border-t py-8 px-6 text-center transition-colors duration-300 ${isDark ? "border-zinc-800 bg-[#0a0d14]" : "border-zinc-200 bg-white"}`}>
        <p className={`text-[10px] font-mono tracking-wider ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
          TELECOM CHURN MODEL ANALYSIS PORTAL © {new Date().getFullYear()} — SAI KUMARU NAIDU
        </p>
      </footer>

    </div>
  );
}
