"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Laptop,
  Settings,
  Sprout,
  Building2,
  Globe,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

interface NodeItem {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType;
  dotPosition: "top" | "bottom" | "left" | "right";
  // Desktop layout coords
  left?: number;
  top?: number;
  line: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

// Custom icons to precisely mirror reference design
function LaptopGearIcon() {
  return (
    <div className="relative flex items-center justify-center w-8 h-8">
      <Laptop className="w-8 h-8 stroke-[1.8]" />
      <Settings className="w-3.5 h-3.5 stroke-[2.2] absolute top-1.5 animate-[spin_12s_linear_infinite]" />
    </div>
  );
}

function PlantIcon() {
  return <Sprout className="w-8 h-8 stroke-[1.8]" />;
}

function TradingIcon() {
  return (
    <svg
      className="w-7 h-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
      <rect x="3" y="14" width="4" height="7" rx="1" fill="currentColor" fillOpacity="0.25" />
      <rect x="9" y="10" width="4" height="11" rx="1" fill="currentColor" fillOpacity="0.25" />
      <rect x="15" y="14" width="4" height="7" rx="1" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}

function RealEstateIcon() {
  return <Building2 className="w-8 h-8 stroke-[1.8]" />;
}

function GlobeIcon() {
  return <Globe className="w-8 h-8 stroke-[1.8]" />;
}

function TeamIcon() {
  return <Users className="w-8 h-8 stroke-[1.8]" />;
}

export default function WhoWillBeInRoom() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // 6 Radial Nodes matching reference image exactly
  // Canvas coordinate system: 1100 x 680, Hub center at (550, 340), Hub outer rim radius ~ 98
  const nodes: NodeItem[] = [
    {
      id: 0,
      title: "Fertilizer, Pesticides and Agri-inputs",
      subtitle: "Industry leaders and companies from the agricultural sector.",
      icon: PlantIcon,
      dotPosition: "right",
      left: 20,
      top: 160,
      line: { x1: 469, y1: 284, x2: 370, y2: 216 },
    },
    {
      id: 1,
      title: "IT & Tech Industry",
      subtitle: "Service provider and Digital Marketer",
      icon: LaptopGearIcon,
      dotPosition: "bottom",
      left: 375,
      top: 18,
      line: { x1: 550, y1: 242, x2: 550, y2: 130 },
    },
    {
      id: 2,
      title: "Real Estate",
      subtitle: "Builders, developers and real estate professionals.",
      icon: RealEstateIcon,
      dotPosition: "left",
      left: 730,
      top: 160,
      line: { x1: 631, y1: 284, x2: 730, y2: 216 },
    },
    {
      id: 3,
      title: "Trading",
      subtitle: "Importers, exporters and trading companies.",
      icon: TradingIcon,
      dotPosition: "right",
      left: 20,
      top: 408,
      line: { x1: 469, y1: 396, x2: 370, y2: 464 },
    },
    {
      id: 4,
      title: "IT & Technology Industry",
      subtitle: "Service provider and Digital Marketer",
      icon: TeamIcon,
      dotPosition: "top",
      left: 375,
      top: 550,
      line: { x1: 550, y1: 438, x2: 550, y2: 550 },
    },
    {
      id: 5,
      title: "Multinational Companies",
      subtitle: "Global and regional business leaders.",
      icon: GlobeIcon,
      dotPosition: "left",
      left: 730,
      top: 408,
      line: { x1: 631, y1: 396, x2: 730, y2: 464 },
    },
  ];

  return (
    <section className="w-full bg-[#f8fafc] text-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-300 mx-auto px-4 sm:px-8 lg:px-10 space-y-12 relative z-10">
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
            Our executive panel and audience are drawn from five key industry groups.
            Each gets technology content built around its own daily challenges.
          </p>
        </div>

        {/* Desktop Radial Hub-and-Spoke View (Precise Mirror of Reference Image) */}
        <div className="hidden lg:flex justify-center items-center py-4">
          <div className="relative w-[1100px] h-[680px] shrink-0 scale-[0.88] xl:scale-100 origin-center">
            {/* SVG Connector Lines and Concentric Circles */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1100 680"
            >
              {/* Subtle background tech orbit rings */}
              <circle
                cx="550"
                cy="340"
                r="160"
                fill="none"
                stroke="#bae6fd"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                opacity="0.5"
              />
              <circle
                cx="550"
                cy="340"
                r="230"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="1"
                opacity="0.3"
              />
              <circle
                cx="550"
                cy="340"
                r="300"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Central Hub Outer Radar/Aperture Ring */}
              <circle
                cx="550"
                cy="340"
                r="104"
                fill="none"
                stroke="#00a8ff"
                strokeWidth="1.8"
                strokeDasharray="4 6"
                opacity="0.85"
              />
              <circle
                cx="550"
                cy="340"
                r="98"
                fill="none"
                stroke="#0084ff"
                strokeWidth="2.5"
              />

              {/* 6 Radial Connector Lines */}
              {nodes.map((node) => {
                const isHovered = activeNode === node.id;
                return (
                  <g key={`line-${node.id}`}>
                    {/* Glowing under-stroke */}
                    <line
                      x1={node.line.x1}
                      y1={node.line.y1}
                      x2={node.line.x2}
                      y2={node.line.y2}
                      stroke="#38bdf8"
                      strokeWidth={isHovered ? 6 : 4}
                      strokeOpacity={isHovered ? 0.6 : 0.25}
                    />
                    {/* Crisp solid connector line */}
                    <line
                      x1={node.line.x1}
                      y1={node.line.y1}
                      x2={node.line.x2}
                      y2={node.line.y2}
                      stroke="#0084ff"
                      strokeWidth={isHovered ? 3 : 2.2}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Central Hub Emblem (Center coordinates 550, 340) */}
            <div className="absolute top-[340px] left-[550px] -translate-x-1/2 -translate-y-1/2 z-20">
              {/* Ambient Blue Pulse Glow */}
              <div className="absolute -inset-4 rounded-full bg-cyan-400/20 blur-xl pointer-events-none" />

              {/* Rotating outer cyan orbit with tech notches */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border-2 border-dashed border-sky-400/60 pointer-events-none"
              />

              {/* Central Circular Badge with dark core and HAT TECH EXPO Logo */}
              <div className="relative w-[190px] h-[190px] rounded-full bg-[#050c1e] border-4 border-[#0090ff] shadow-[0_0_30px_rgba(0,144,255,0.4)] flex flex-col items-center justify-center text-center p-4 overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105">
                {/* Subtle Inner Ring */}
                <div className="absolute inset-1.5 rounded-full border border-sky-400/40 pointer-events-none" />
                <div className="absolute inset-3 rounded-full border border-cyan-400/20 pointer-events-none" />

                {/* Ambient Center Glow */}
                <div className="absolute inset-0 bg-radial from-sky-500/20 via-transparent to-transparent pointer-events-none" />

                {/* Official HAT TECH EXPO Logo */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative w-36 h-16 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/hat-logo-trimmed.png"
                      alt="HAT TECH EXPO"
                      fill
                      className="object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Chamfered Cards Positioned Precisely */}
            {nodes.map((node) => (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                style={{
                  position: "absolute",
                  left: `${node.left}px`,
                  top: `${node.top}px`,
                  width: "350px",
                }}
                className="z-20"
              >
                <ChamferedCard
                  node={node}
                  isActive={activeNode === node.id}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Responsive Layout */}
        <div className="lg:hidden space-y-8">
          {/* Central Emblem for Mobile */}
          <div className="mx-auto relative w-48 h-48 rounded-full bg-[#050c1e] border-4 border-[#0090ff] shadow-xl p-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-36 h-16">
              <Image
                src="/images/hat-logo-trimmed.png"
                alt="HAT TECH EXPO"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {nodes.map((node) => (
              <ChamferedCard
                key={node.id}
                node={node}
                isActive={false}
                hideDot
              />
            ))}
          </div>
        </div>

        {/* Bottom Banner Note */}
        <div className="pt-6 text-center border-t border-slate-200">
          <p className="text-sm sm:text-base font-bold text-slate-700 tracking-wide">
            Beyond these key groups, the Expo is open to the whole community:{" "}
            <span className="text-sky-600 font-semibold">
              Entrepreneurs, Educators, Developers, and Students.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// Precision Chamfered Card Component
function ChamferedCard({
  node,
  isActive,
  hideDot = false,
}: {
  node: NodeItem;
  isActive: boolean;
  hideDot?: boolean;
}) {
  const IconComponent = node.icon;

  return (
    <div className="relative w-full">
      {/* Outer Chamfered Container (Border via 2px padding & vibrant electric blue) */}
      <div
        className={`relative p-[2px] transition-all duration-300 ${
          isActive
            ? "scale-[1.02] shadow-[0_6px_22px_rgba(0,144,255,0.3)]"
            : "hover:scale-[1.01] shadow-[0_4px_14px_rgba(0,144,255,0.12)]"
        }`}
        style={{
          clipPath:
            "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)",
          background: isActive
            ? "linear-gradient(135deg, #00d2ff 0%, #0084ff 100%)"
            : "#0084ff",
        }}
      >
        {/* Inner White Container */}
        <div
          className="w-full bg-white px-4 py-3.5 flex items-center gap-3.5 relative min-h-[110px]"
          style={{
            clipPath:
              "polygon(14.5px 0, calc(100% - 14.5px) 0, 100% 14.5px, 100% calc(100% - 14.5px), calc(100% - 14.5px) 100%, 14.5px 100%, 0 calc(100% - 14.5px), 0 14.5px)",
          }}
        >
          {/* Hexagon Icon Badge */}
          <div
            className="relative shrink-0 w-16 h-18 flex items-center justify-center p-[2px] transition-transform duration-300 group-hover:scale-105"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "#00d2ff",
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center text-white"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background:
                  "linear-gradient(180deg, #00b4d8 0%, #0077b6 45%, #0052cc 100%)",
              }}
            >
              <IconComponent />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 pr-6">
            <h4 className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug tracking-tight font-sans">
              {node.title}
            </h4>
            <p className="text-[12px] sm:text-[13px] text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">
              {node.subtitle}
            </p>
          </div>

          {/* 4 Diagonal Slanted Slashes in Bottom-Right Corner (Exact Reference Mirror) */}
          <div className="absolute bottom-2.5 right-3.5 flex items-center gap-[3px] pointer-events-none">
            <span className="w-1.5 h-3 bg-[#0084ff] -skew-x-[25deg] rounded-[1px] opacity-80" />
            <span className="w-1.5 h-3 bg-[#0084ff] -skew-x-[25deg] rounded-[1px] opacity-80" />
            <span className="w-1.5 h-3 bg-[#0084ff] -skew-x-[25deg] rounded-[1px] opacity-80" />
            <span className="w-1.5 h-3 bg-[#0084ff] -skew-x-[25deg] rounded-[1px] opacity-80" />
          </div>
        </div>
      </div>

      {/* Radial Connection Node Dot (outside clip-path) */}
      {!hideDot && (
        <>
          {node.dotPosition === "bottom" && (
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#0084ff] bg-white flex items-center justify-center shadow-[0_0_8px_#0084ff]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0084ff]" />
              </div>
            </div>
          )}
          {node.dotPosition === "top" && (
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#0084ff] bg-white flex items-center justify-center shadow-[0_0_8px_#0084ff]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0084ff]" />
              </div>
            </div>
          )}
          {node.dotPosition === "right" && (
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#0084ff] bg-white flex items-center justify-center shadow-[0_0_8px_#0084ff]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0084ff]" />
              </div>
            </div>
          )}
          {node.dotPosition === "left" && (
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#0084ff] bg-white flex items-center justify-center shadow-[0_0_8px_#0084ff]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0084ff]" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
