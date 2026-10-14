"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => { });
        }
      });
    }
  }, []);

  const scrollToExplore = () => {
    const el = document.getElementById("dates-venue-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[calc(100svh-5rem)] min-h-[calc(100svh-5rem)] sm:h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Video Element - Cinematic Motion Canvas */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
          className="w-full h-full object-cover object-center filter brightness-50 contrast-115 scale-105"
        >
          <source src="/video/gemini_generated_video_f2323285.mp4" type="video/mp4" />
          <source src="/video/hero-expo-loop.mp4" type="video/mp4" />
          <source src="/video/hero-expo-loop.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Cinematic Gradient Overlays for live text contrast & depth */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/70 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content - Responsive Live HTML/CSS Overlay */}
      <div className="relative z-10 max-w-300 mx-auto px-5 sm:px-8 lg:px-10 w-full pb-8 sm:pb-16 pt-20 sm:pt-36 flex flex-col justify-end items-start text-left h-full min-h-[calc(100svh-5rem)] sm:min-h-[calc(100vh-5rem)]">

        {/* High-tech Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900/80 border border-sky-500/40 text-sky-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase font-tech backdrop-blur-md mb-3 sm:mb-4 shadow-lg shadow-sky-950/50"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>SOUTHERN PUNJAB TECH EXPO 2026</span>
        </motion.div>

        {/* Live Vector Headline in Orbitron - 100% Responsive, Zero Text Cropping */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-tech tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] select-none"
        >
          <span className="block sm:inline text-white">HAT </span>
          <span className="block sm:inline text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-blue-400 to-[#0055ff] drop-shadow-[0_0_35px_rgba(0,140,255,0.7)]">
            TECH EXPO
          </span>
        </motion.h1>

        {/* Dynamic Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 sm:mt-5 text-sm sm:text-lg md:text-xl text-slate-200 max-w-xl font-normal leading-relaxed drop-shadow-md"
        >
          Redefining Technology. Challenging Convention. Building the Future.
        </motion.p>

        {/* Event Dates & Location Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-tech text-sky-400 font-semibold tracking-wider mb-6 sm:mb-8"
        >
          <span className="text-white">August 8–9, 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          <span>Multan, Pakistan</span>
        </motion.div>

        {/* Action Buttons - Stacked on Mobile, Row on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          {/* Primary Solid Tech Button - Partner With Us */}
          <Link
            href="/partner"
            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#0055ff] hover:bg-[#1a6dff] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 group"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            }}
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary Outline Tech Button - Submit Your Project */}
          <Link
            href="/student-connect"
            className="w-full sm:w-auto relative inline-flex items-center justify-center p-px bg-white/40 hover:bg-[#0055ff] transition-all duration-200 group cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            }}
          >
            <span
              className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.25 bg-[#030712] group-hover:bg-[#080e1e] text-white font-bold text-xs sm:text-sm tracking-wide transition-colors"
              style={{
                clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              }}
            >
              <span>Submit Your Project</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
