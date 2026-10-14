"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Laptop,
  Settings,
  Sprout,
  Building2,
  Globe,
  Users,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  RotateCw,
} from "lucide-react";

interface NodeData {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType;
}

// Fixed slot specification on the 1100 x 680 layout canvas
// Center of canvas: (550, 340)
interface SlotDef {
  cardCenterX: number;
  cardCenterY: number;
  angle: number; // in radians
  anchorOffset: { x: number; y: number };
}

const SLOTS: SlotDef[] = [
  // Slot 0: Top
  {
    cardCenterX: 550,
    cardCenterY: 74,
    angle: -Math.PI / 2, // -90 deg
    anchorOffset: { x: 0, y: 56 }, // bottom edge
  },
  // Slot 1: Top-Right
  {
    cardCenterX: 905,
    cardCenterY: 216,
    angle: -Math.PI / 6, // -30 deg
    anchorOffset: { x: -175, y: 0 }, // left edge
  },
  // Slot 2: Bottom-Right
  {
    cardCenterX: 905,
    cardCenterY: 464,
    angle: Math.PI / 6, // +30 deg
    anchorOffset: { x: -175, y: 0 }, // left edge
  },
  // Slot 3: Bottom
  {
    cardCenterX: 550,
    cardCenterY: 606,
    angle: Math.PI / 2, // +90 deg
    anchorOffset: { x: 0, y: -56 }, // top edge
  },
  // Slot 4: Bottom-Left
  {
    cardCenterX: 195,
    cardCenterY: 464,
    angle: (5 * Math.PI) / 6, // +150 deg
    anchorOffset: { x: 175, y: 0 }, // right edge
  },
  // Slot 5: Top-Left
  {
    cardCenterX: 195,
    cardCenterY: 216,
    angle: (7 * Math.PI) / 6, // +210 deg
    anchorOffset: { x: 175, y: 0 }, // right edge
  },
];

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
  // 6 Information cards
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

  // Animation State
  // rotationStep: current integer slot shift (0 to 5)
  // progress: 0 to 1 during transition
  const [rotationStep, setRotationStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const hoveredRef = useRef(hoveredCardId);
  hoveredRef.current = hoveredCardId;

  const currentStepRef = useRef(0);

  // Smooth animation loop driving clockwise rotation
  useEffect(() => {
    let animFrame: number;
    let state: "dwell" | "transition" = "dwell";
    let stateStartTime = performance.now();
    const DWELL_DURATION = 3200; // 3.2s dwell at each position
    const TRANSITION_DURATION = 1400; // 1.4s smooth arc glide to next position

    const tick = (now: number) => {
      // If hovered or manually paused, hold current time
      if (isPausedRef.current || hoveredRef.current !== null) {
        stateStartTime = now - (state === "transition" ? (progress * TRANSITION_DURATION) : 0);
        animFrame = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - stateStartTime;

      if (state === "dwell") {
        setProgress(0);
        if (elapsed >= DWELL_DURATION) {
          state = "transition";
          stateStartTime = now;
        }
      } else if (state === "transition") {
        const rawP = Math.min(1, elapsed / TRANSITION_DURATION);
        // High-precision cubic-bezier easing for smooth start & finish
        const easedP =
          rawP < 0.5
            ? 4 * rawP * rawP * rawP
            : 1 - Math.pow(-2 * rawP + 2, 3) / 2;

        setProgress(easedP);

        if (rawP >= 1) {
          const nextStep = (currentStepRef.current + 1) % 6;
          currentStepRef.current = nextStep;
          setRotationStep(nextStep);
          setProgress(0);
          state = "dwell";
          stateStartTime = now;
        }
      }

      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Manual next/prev navigation
  const handleNext = useCallback(() => {
    const nextStep = (currentStepRef.current + 1) % 6;
    currentStepRef.current = nextStep;
    setRotationStep(nextStep);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    const prevStep = (currentStepRef.current + 5) % 6;
    currentStepRef.current = prevStep;
    setRotationStep(prevStep);
    setProgress(0);
  }, []);

  // Calculate position & connector coordinates for each card at current rotation
  const renderedItems = cards.map((card, i) => {
    // Current slot index that card `i` is currently in or transitioning from
    const fromSlotIdx = (i + rotationStep) % 6;
    const toSlotIdx = (fromSlotIdx + 1) % 6;

    const fromSlot = SLOTS[fromSlotIdx];
    const toSlot = SLOTS[toSlotIdx];

    // Angular arc interpolation in clockwise direction
    let a0 = fromSlot.angle;
    let a1 = toSlot.angle;
    if (a1 <= a0) a1 += 2 * Math.PI; // ensure strictly clockwise progression

    const currentAngle = a0 + progress * (a1 - a0);

    // Radial distance interpolation
    const r0 = Math.hypot(fromSlot.cardCenterX - 550, fromSlot.cardCenterY - 340);
    const r1 = Math.hypot(toSlot.cardCenterX - 550, toSlot.cardCenterY - 340);
    const currentR = r0 + progress * (r1 - r0);

    // Card center on elliptical arc
    const cardCenterX = 550 + currentR * Math.cos(currentAngle);
    const cardCenterY = 340 + currentR * Math.sin(currentAngle);

    const left = cardCenterX - 175; // Card width is 350
    const top = cardCenterY - 56; // Card height is 112

    // Hub rim point pointing directly towards card
    const hubX = 550 + 98 * Math.cos(currentAngle);
    const hubY = 340 + 98 * Math.sin(currentAngle);

    // Anchor point on the inner boundary of the card
    const anchorX =
      cardCenterX +
      (1 - progress) * fromSlot.anchorOffset.x +
      progress * toSlot.anchorOffset.x;
    const anchorY =
      cardCenterY +
      (1 - progress) * fromSlot.anchorOffset.y +
      progress * toSlot.anchorOffset.y;

    const isHovered = hoveredCardId === card.id;

    return {
      card,
      left,
      top,
      hubX,
      hubY,
      anchorX,
      anchorY,
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

        {/* Desktop Radial Continuous Infographic Loop View */}
        <div className="hidden lg:flex flex-col items-center">
          {/* Main 1100 x 680 Orbital Stage */}
          <div className="relative w-275 h-170 shrink-0 scale-[0.88] xl:scale-100 origin-center select-none">
            {/* SVG Layer: Tech Orbit Circles & Dynamically Connected Glowing Lines */}
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
                <linearGradient id="cyberLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00d2ff" />
                  <stop offset="100%" stopColor="#0077ff" />
                </linearGradient>
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

              {/* 6 Seamless Clockwise Rotating Glowing Neon Connector Lines */}
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

          {/* Sleek Cybernetic Infographic Controls Bar */}
          <div className="mt-4 flex items-center gap-4 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200/80 shadow-sm text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isPaused ? "bg-amber-400" : "bg-sky-400"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isPaused ? "bg-amber-500" : "bg-sky-500"
                  }`}
                />
              </span>
              <span className="font-tech tracking-wider uppercase text-[11px] text-slate-500">
                {isPaused || hoveredCardId !== null ? "Paused (Hover)" : "Clockwise Orbit Loop"}
              </span>
            </div>

            <div className="h-3.5 w-px bg-slate-200" />

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-600 transition-colors cursor-pointer"
              title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span>Pause</span>
                </>
              )}
            </button>

            {/* Step Shift Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Rotate counter-clockwise by 1 slot"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Rotate clockwise by 1 slot"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
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
            {cards.map((card, index) => {
              const isCurrent = (index + rotationStep) % 6 === 0;
              return (
                <div
                  key={card.id}
                  onClick={() => setRotationStep(index)}
                  className="transition-transform duration-300"
                >
                  <ChamferedCard
                    card={card}
                    isHovered={isCurrent}
                  />
                </div>
              );
            })}
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
