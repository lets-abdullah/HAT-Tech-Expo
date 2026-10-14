"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Laptop,
  Building,
  Globe2,
  Users2,
  TrendingUp,
  Sprout,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WhoWillBeInRoom() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 0,
      position: "top-left",
      title: "Fertilizer, Pesticides and Agri-inputs",
      description: "Industry leaders and companies from the agricultural sector.",
      icon: Sprout,
      color: "from-emerald-500 to-teal-600",
      stats: "Agritech, IoT soil sensors & supply tracking",
    },
    {
      id: 1,
      position: "top",
      title: "IT & Tech Industry",
      description: "Service provider and Digital Marketer",
      icon: Laptop,
      color: "from-sky-500 to-blue-600",
      stats: "Software exports, AI agents & cloud infrastructure",
    },
    {
      id: 2,
      position: "top-right",
      title: "Real Estate",
      description: "Builders, developers and real estate professionals.",
      icon: Building,
      color: "from-blue-600 to-indigo-600",
      stats: "Smart proptech, digital sales & virtual showrooms",
    },
    {
      id: 3,
      position: "bottom-left",
      title: "Trading",
      description: "Importers, exporters and trading companies.",
      icon: TrendingUp,
      color: "from-amber-500 to-orange-600",
      stats: "ERP logistics, cross-border payment tech & automation",
    },
    {
      id: 4,
      position: "bottom",
      title: "IT & Technology Industry",
      description: "Service provider and Digital Marketer",
      icon: Users2,
      color: "from-cyan-500 to-blue-500",
      stats: "Digital agencies, tech incubators & talent pools",
    },
    {
      id: 5,
      position: "bottom-right",
      title: "Multinational Companies",
      description: "Global and regional business leaders.",
      icon: Globe2,
      color: "from-purple-500 to-indigo-600",
      stats: "Enterprise modernization, B2B procurement & scale",
    },
  ];

  return (
    <section className="w-full bg-slate-50 text-slate-900 py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative overflow-hidden">
      {/* Subtle Background Cyber Grid in Light Theme */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }} 
      />

      <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10 space-y-14 relative z-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-tech shadow-md shadow-sky-500/20">
              04
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-tech">
              Who Will Be in the Room
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed pl-16">
            Our executive panel and audience are drawn from five industry groups.
            Each gets technology content built around its own daily challenges.
          </p>
        </div>

        {/* Desktop Radial Hub-and-Spoke Interactive View (Hidden on small mobile) */}
        <div className="hidden lg:block relative w-full max-w-5xl mx-auto h-170">
          {/* Central Radial SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 680">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#0284c7" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            {/* Hub Center is at (500, 340) */}
            {/* Top Node (500, 80) */}
            <line x1="500" y1="340" x2="500" y2="155" stroke="url(#lineGrad)" strokeWidth={activeNode === 1 ? "3" : "1.8"} strokeDasharray={activeNode === 1 ? "none" : "6 4"} />
            {/* Top-Right Node (800, 160) */}
            <line x1="500" y1="340" x2="720" y2="190" stroke="url(#lineGrad)" strokeWidth={activeNode === 2 ? "3" : "1.8"} strokeDasharray={activeNode === 2 ? "none" : "6 4"} />
            {/* Bottom-Right Node (800, 520) */}
            <line x1="500" y1="340" x2="720" y2="490" stroke="url(#lineGrad)" strokeWidth={activeNode === 5 ? "3" : "1.8"} strokeDasharray={activeNode === 5 ? "none" : "6 4"} />
            {/* Bottom Node (500, 600) */}
            <line x1="500" y1="340" x2="500" y2="525" stroke="url(#lineGrad)" strokeWidth={activeNode === 4 ? "3" : "1.8"} strokeDasharray={activeNode === 4 ? "none" : "6 4"} />
            {/* Bottom-Left Node (200, 520) */}
            <line x1="500" y1="340" x2="280" y2="490" stroke="url(#lineGrad)" strokeWidth={activeNode === 3 ? "3" : "1.8"} strokeDasharray={activeNode === 3 ? "none" : "6 4"} />
            {/* Top-Left Node (200, 160) */}
            <line x1="500" y1="340" x2="280" y2="190" stroke="url(#lineGrad)" strokeWidth={activeNode === 0 ? "3" : "1.8"} strokeDasharray={activeNode === 0 ? "none" : "6 4"} />

            {/* Orbit rings */}
            <circle cx="500" cy="340" r="160" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="8 8" />
            <circle cx="500" cy="340" r="230" fill="none" stroke="#bae6fd" strokeWidth="1" opacity="0.4" />
          </svg>

          {/* Central Hub Emblem (Center coordinates 500, 340) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border-2 border-dashed border-sky-400/40 pointer-events-none"
            />
            <div className="relative w-56 h-56 rounded-full bg-white border-4 border-sky-500 shadow-2xl shadow-sky-500/20 p-5 flex flex-col items-center justify-center text-center group cursor-pointer">
              {/* Inner ambient glow */}
              <div className="absolute inset-2 rounded-full bg-linear-to-b from-sky-50 to-blue-50 border border-sky-200" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-36 h-16 mb-1">
                  <Image
                    src="/images/hat-logo.png"
                    alt="HAT TECH EXPO"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="h-0.5 w-24 bg-linear-to-r from-transparent via-sky-500 to-transparent my-1" />
                <span className="text-[10px] font-extrabold tracking-widest text-slate-800 uppercase font-tech">
                  TECH EXPO
                </span>
                <span className="text-[8px] font-bold tracking-widest text-sky-600 uppercase mt-0.5">
                  INDUSTRY • TECHNOLOGY • TALENT
                </span>
              </div>
            </div>
          </div>

          {/* Node 1: Top (IT & Tech Industry) */}
          <div 
            onMouseEnter={() => setActiveNode(1)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute top-4 left-1/2 -translate-x-1/2 w-80 z-10"
          >
            <NodeCard node={nodes[1]} isActive={activeNode === 1} />
          </div>

          {/* Node 0: Top-Left (Fertilizer, Pesticides) */}
          <div 
            onMouseEnter={() => setActiveNode(0)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute top-14 left-0 w-80 z-10"
          >
            <NodeCard node={nodes[0]} isActive={activeNode === 0} />
          </div>

          {/* Node 2: Top-Right (Real Estate) */}
          <div 
            onMouseEnter={() => setActiveNode(2)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute top-14 right-0 w-80 z-10"
          >
            <NodeCard node={nodes[2]} isActive={activeNode === 2} />
          </div>

          {/* Node 3: Bottom-Left (Trading) */}
          <div 
            onMouseEnter={() => setActiveNode(3)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute bottom-14 left-0 w-80 z-10"
          >
            <NodeCard node={nodes[3]} isActive={activeNode === 3} />
          </div>

          {/* Node 4: Bottom (IT & Technology Industry) */}
          <div 
            onMouseEnter={() => setActiveNode(4)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-80 z-10"
          >
            <NodeCard node={nodes[4]} isActive={activeNode === 4} />
          </div>

          {/* Node 5: Bottom-Right (Multinational Companies) */}
          <div 
            onMouseEnter={() => setActiveNode(5)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute bottom-14 right-0 w-80 z-10"
          >
            <NodeCard node={nodes[5]} isActive={activeNode === 5} />
          </div>
        </div>

        {/* Mobile / Tablet Responsive Layout */}
        <div className="lg:hidden space-y-6">
          {/* Central Badge */}
          <div className="mx-auto w-48 h-48 rounded-full bg-white border-4 border-sky-500 shadow-xl p-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-14 mb-1">
              <Image
                src="/images/hat-logo.png"
                alt="HAT TECH EXPO"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[10px] font-extrabold tracking-widest text-slate-800 uppercase font-tech">
              TECH EXPO
            </span>
            <span className="text-[8px] font-bold tracking-widest text-sky-600 uppercase mt-0.5">
              INDUSTRY • TECHNOLOGY • TALENT
            </span>
          </div>

          {/* Node Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nodes.map((node) => (
              <NodeCard key={node.id} node={node} isActive={false} />
            ))}
          </div>
        </div>

        {/* Bottom Banner Note as in image */}
        <div className="pt-6 text-center border-t border-slate-200">
          <p className="text-sm sm:text-base font-bold text-slate-700 tracking-wide">
            Beyond these five groups, the Expo is open to the whole community:{" "}
            <span className="text-sky-600 font-semibold">
              Entrepreneurs, Educators, Developers, and Students.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function NodeCard({
  node,
  isActive,
}: {
  node: {
    id: number;
    title: string;
    description: string;
    icon: any;
    color: string;
    stats: string;
  };
  isActive: boolean;
}) {
  const Icon = node.icon;
  return (
    <div
      className={`bg-white rounded-2xl p-5 border transition-all duration-300 shadow-sm cursor-pointer ${
        isActive
          ? "border-sky-500 shadow-lg shadow-sky-500/15 -translate-y-1"
          : "border-slate-200 hover:border-sky-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
          <Icon className="w-6 h-6 stroke-2" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-extrabold text-slate-900 leading-snug font-tech tracking-wide">
            {node.title}
          </h4>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {node.description}
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-sky-600">
            <Sparkles className="w-3 h-3" />
            <span className="truncate">{node.stats}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
