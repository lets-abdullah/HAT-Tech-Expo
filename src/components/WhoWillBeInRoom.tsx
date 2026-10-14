"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Laptop,
  Settings,
  Sprout,
  Building2,
  Globe,
  Users,
} from "lucide-react";

interface NodeData {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType;
}

// Fixed Station Definitions precisely matching Image 1
// Canvas: 1100 x 680, Center: (550, 340)
interface StationDef {
  cardCenterX: number;
  cardCenterY: number;
  hubX: number;
  hubY: number;
  anchorX: number;
  anchorY: number;
}

const STATIONS: StationDef[] = [
  // Station 0: Top (IT & Tech Industry)
  {
    cardCenterX: 550,
    cardCenterY: 74,
    hubX: 550,
    hubY: 242,
    anchorX: 550,
    anchorY: 130,
  },
  // Station 1: Top-Right (Real Estate)
  {
    cardCenterX: 905,
    cardCenterY: 216,
    hubX: 631,
    hubY: 284,
    anchorX: 730,
    anchorY: 216,
  },
  // Station 2: Bottom-Right (Multinational Companies)
  {
    cardCenterX: 905,
    cardCenterY: 464,
    hubX: 631,
    hubY: 396,
    anchorX: 730,
    anchorY: 464,
  },
  // Station 3: Bottom (IT & Technology Industry)
  {
    cardCenterX: 550,
    cardCenterY: 606,
    hubX: 550,
    hubY: 438,
    anchorX: 550,
    anchorY: 550,
  },
  // Station 4: Bottom-Left (Trading)
  {
    cardCenterX: 195,
    cardCenterY: 464,
    hubX: 469,
    hubY: 396,
    anchorX: 370,
    anchorY: 464,
  },
  // Station 5: Top-Left (Fertilizer, Pesticides and Agri-inputs)
  {
    cardCenterX: 195,
    cardCenterY: 216,
    hubX: 469,
    hubY: 284,
    anchorX: 370,
    anchorY: 216,
  },
];

// Smooth continuous Catmull-Rom closed spline evaluation
const catmull = (p0: number, p1: number, p2: number, p3: number, t: number) => {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  const t2 = t * t;
  const t3 = t * t2;
  return (
    (2 * p1 - 2 * p2 + v0 + v1) * t3 +
    (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 +
    v0 * t +
    p1
  );
};

function getTrackState(pos: number) {
  const normPos = ((pos % 6) + 6) % 6;
  const k = Math.floor(normPos);
  const p = normPos - k;

  const prevK = (k + 5) % 6;
  const nextK = (k + 1) % 6;
  const next2K = (k + 2) % 6;

  const s0 = STATIONS[prevK];
  const s1 = STATIONS[k];
  const s2 = STATIONS[nextK];
  const s3 = STATIONS[next2K];

  return {
    cx: catmull(s0.cardCenterX, s1.cardCenterX, s2.cardCenterX, s3.cardCenterX, p),
    cy: catmull(s0.cardCenterY, s1.cardCenterY, s2.cardCenterY, s3.cardCenterY, p),
    hubX: catmull(s0.hubX, s1.hubX, s2.hubX, s3.hubX, p),
    hubY: catmull(s0.hubY, s1.hubY, s2.hubY, s3.hubY, p),
    anchorX: catmull(s0.anchorX, s1.anchorX, s2.anchorX, s3.anchorX, p),
    anchorY: catmull(s0.anchorY, s1.anchorY, s2.anchorY, s3.anchorY, p),
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
  // 6 Information cards arranged in exact order of Image 1
  const cards: NodeData[] = [
    {
      id: 0,
      title: "IT & Tech Industry",
      subtitle: "Service provider and Digital Marketer",
      icon: LaptopGearIcon,
    },
    {
      id: 1,
      title: "Real Estate",
      subtitle: "Builders, developers and real estate professionals.",
      icon: RealEstateIcon,
    },
    {
      id: 2,
      title: "Multinational Companies",
      subtitle: "Global and regional business leaders.",
      icon: GlobeIcon,
    },
    {
      id: 3,
      title: "IT & Technology Industry",
      subtitle: "Service provider and Digital Marketer",
      icon: TeamIcon,
    },
    {
      id: 4,
      title: "Trading",
      subtitle: "Importers, exporters and trading companies.",
      icon: TradingIcon,
    },
    {
      id: 5,
      title: "Fertilizer, Pesticides and Agri-inputs",
      subtitle: "Industry leaders and companies from the agricultural sector.",
      icon: PlantIcon,
    },
  ];

  // Continuous Clockwise Floating Position
  const [trackPos, setTrackPos] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const hoveredRef = useRef(hoveredCardId);
  hoveredRef.current = hoveredCardId;

  // Pure, uninterrupted continuous clockwise rotation loop
  useEffect(() => {
    let animFrame: number;
    let lastTime = performance.now();
    // 36 seconds for a full 360-degree rotation (6 stations)
    const SPEED = 6 / 36000; // positions per millisecond

    const loop = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      // When hovering over any card, pause rotation smoothly so user can read
      if (hoveredRef.current === null) {
        setTrackPos((prev) => (prev + delta * SPEED) % 6);
      }

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Compute live positions and connector line coordinates for all 6 cards
  const renderedItems = cards.map((card, i) => {
    const cardTrackPos = (i + trackPos) % 6;
    const state = getTrackState(cardTrackPos);

    const left = state.cx - 175; // Card width 350px
    const top = state.cy - 56; // Card height 112px
    const isHovered = hoveredCardId === card.id;

    return {
      card,
      left,
      top,
      hubX: state.hubX,
      hubY: state.hubY,
      anchorX: state.anchorX,
      anchorY: state.anchorY,
      isHovered,
    };
  });

  return (
    <section className="w-full bg-[#f8fafc] text-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative overflow-hidden">
      {/* Background radial ambient cyber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-180 h-180 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-300 mx-auto px-4 sm:px-8 lg:px-10 space-y-10 relative z-10">
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
            Our executive panel and audience are drawn from six key industry groups.
            Each gets technology content built around its own daily challenges.
          </p>
        </div>

        {/* Desktop Radial Continuous Clockwise Infographic Loop View */}
        <div className="hidden lg:flex flex-col items-center">
          {/* Main 1100 x 680 Orbital Stage (Exact Proportions of Image 1) */}
          <div className="relative w-275 h-170 shrink-0 scale-[0.88] xl:scale-100 origin-center select-none">
            {/* SVG Layer: Tech Orbit Circles & Continuously Connected Neon Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1100 680"
            >
              <defs>
                {/* Glow Filter for Cyber Neon Lines */}
                <filter id="neonBlueGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Faint Background Orbit Grid Lines */}
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
                r="305"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Central Hub Outer Radar/Aperture Ring with Tech Tick Marks */}
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

              {/* 6 Seamless Continuous Clockwise Rotating Glowing Neon Connector Lines */}
              {renderedItems.map(({ card, hubX, hubY, anchorX, anchorY, isHovered }) => (
                <g key={`line-group-${card.id}`}>
                  {/* Outer Cyan Neon Glow Under-stroke */}
                  <line
                    x1={hubX}
                    y1={hubY}
                    x2={anchorX}
                    y2={anchorY}
                    stroke="#00e5ff"
                    strokeWidth={isHovered ? 7 : 4.5}
                    strokeOpacity={isHovered ? 0.75 : 0.35}
                    filter="url(#neonBlueGlow)"
                  />
                  {/* Crisp Solid High-Tech Blue Connector Line */}
                  <line
                    x1={hubX}
                    y1={hubY}
                    x2={anchorX}
                    y2={anchorY}
                    stroke="#0084ff"
                    strokeWidth={isHovered ? 3.2 : 2.4}
                  />

                  {/* Animated Cybernetic Data Pulse Particle Traveling Outward */}
                  <circle
                    r="3.5"
                    fill="#ffffff"
                    stroke="#00e5ff"
                    strokeWidth="1.5"
                    className="filter drop-shadow-[0_0_8px_#00e5ff]"
                  >
                    <animateMotion
                      path={`M ${hubX} ${hubY} L ${anchorX} ${anchorY}`}
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </svg>

            {/* Central Dark Circular Emblem: COMPLETELY FIXED & STATIC AT CENTER */}
            <div className="absolute top-85 left-137.5 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
              {/* Ambient Blue Pulse Glow Behind Logo */}
              <div className="absolute -inset-4 rounded-full bg-cyan-400/20 blur-xl pointer-events-none" />

              {/* Fixed Concentric Cyan Border Ring */}
              <div className="absolute -inset-2.5 rounded-full border border-sky-400/50 pointer-events-none" />

              {/* Central Fixed Circular Badge with dark core and HAT TECH EXPO Logo */}
              <div className="relative w-47.5 h-47.5 rounded-full bg-[#050c1e] border-4 border-[#0090ff] shadow-[0_0_35px_rgba(0,144,255,0.45)] flex flex-col items-center justify-center text-center p-4 overflow-hidden group">
                {/* Subtle Inner Rings */}
                <div className="absolute inset-1.5 rounded-full border border-sky-400/40 pointer-events-none" />
                <div className="absolute inset-3 rounded-full border border-cyan-400/20 pointer-events-none" />

                {/* Ambient Center Glow */}
                <div className="absolute inset-0 bg-radial from-sky-500/20 via-transparent to-transparent pointer-events-none" />

                {/* Completely Fixed HAT TECH EXPO Logo */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative w-36 h-16">
                    <Image
                      src="/images/hat-logo-trimmed.png"
                      alt="HAT TECH EXPO"
                      fill
                      priority
                      className="object-contain drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Seamlessly Rotating Chamfered Cards */}
            {renderedItems.map(
              ({ card, left, top, anchorX, anchorY, isHovered }) => (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{
                    position: "absolute",
                    left: `${left}px`,
                    top: `${top}px`,
                    width: "350px",
                    willChange: "left, top",
                  }}
                  className="z-20 pointer-events-auto cursor-pointer"
                >
                  <ChamferedCard
                    card={card}
                    isHovered={isHovered}
                  />

                  {/* Dynamic Radial Connection Node Dot Locked at Anchor */}
                  <div
                    style={{
                      position: "absolute",
                      left: `${anchorX - left}px`,
                      top: `${anchorY - top}px`,
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                    }}
                    className="z-30"
                  >
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#0084ff] bg-white flex items-center justify-center shadow-[0_0_10px_#00e5ff]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0084ff]" />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Mobile / Tablet Responsive Layout */}
        <div className="lg:hidden space-y-6">
          {/* Central Fixed Emblem for Mobile */}
          <div className="mx-auto relative w-44 h-44 rounded-full bg-[#050c1e] border-4 border-[#0090ff] shadow-xl p-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-14">
              <Image
                src="/images/hat-logo-trimmed.png"
                alt="HAT TECH EXPO"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.id}>
                <ChamferedCard
                  card={card}
                  isHovered={false}
                />
              </div>
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

// Precision Chamfered Card Component (Always level & upright)
function ChamferedCard({
  card,
  isHovered,
}: {
  card: NodeData;
  isHovered: boolean;
}) {
  const IconComponent = card.icon;

  return (
    <div className="relative w-full">
      {/* Outer Chamfered Container (Border via 2px padding & vibrant electric blue) */}
      <div
        className={`relative p-0.5 transition-all duration-300 ${
          isHovered
            ? "scale-[1.03] shadow-[0_8px_25px_rgba(0,144,255,0.35)]"
            : "shadow-[0_4px_14px_rgba(0,144,255,0.12)]"
        }`}
        style={{
          clipPath:
            "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)",
          background: isHovered
            ? "linear-gradient(135deg, #00e5ff 0%, #0084ff 100%)"
            : "#0084ff",
        }}
      >
        {/* Inner White Container */}
        <div
          className="w-full bg-white px-4 py-3 flex items-center gap-3.5 relative min-h-28"
          style={{
            clipPath:
              "polygon(14.5px 0, calc(100% - 14.5px) 0, 100% 14.5px, 100% calc(100% - 14.5px), calc(100% - 14.5px) 100%, 14.5px 100%, 0 calc(100% - 14.5px), 0 14.5px)",
          }}
        >
          {/* Hexagon Icon Badge */}
          <div
            className="relative shrink-0 w-16 h-18 flex items-center justify-center p-0.5 transition-transform duration-300"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: isHovered ? "#38bdf8" : "#00d2ff",
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
              {card.title}
            </h4>
            <p className="text-[12px] sm:text-[13px] text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">
              {card.subtitle}
            </p>
          </div>

          {/* 4 Diagonal Slanted Slashes in Bottom-Right Corner (Exact Reference Mirror) */}
          <div className="absolute bottom-2.5 right-3.5 flex items-center gap-0.75 pointer-events-none">
            <span className="w-1.5 h-3 bg-[#0084ff] skew-x-[-25deg] rounded-[1px] opacity-80" />
            <span className="w-1.5 h-3 bg-[#0084ff] skew-x-[-25deg] rounded-[1px] opacity-80" />
            <span className="w-1.5 h-3 bg-[#0084ff] skew-x-[-25deg] rounded-[1px] opacity-80" />
            <span className="w-1.5 h-3 bg-[#0084ff] skew-x-[-25deg] rounded-[1px] opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
