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
    <section className="relative w-full h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Video Element - Vibrant & High Opacity */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
          className="w-full h-full object-cover object-center filter brightness-100 contrast-105"
        >
          <source src="/video/gemini_generated_video_f2323285.mp4" type="video/mp4" />
          <source src="/video/hero-expo-loop.mp4" type="video/mp4" />
          <source src="/video/hero-expo-loop.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Soft Bottom Vignette for text contrast without dimming footage */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content - Anchored to Lower Left */}
      <div className="relative z-10 max-w-300 mx-auto px-6 sm:px-8 lg:px-10 w-full pb-10 sm:pb-16 pt-28 sm:pt-44 flex flex-col justify-end items-start text-left h-full min-h-[calc(100vh-5rem)]">
        {/* Date & Location Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 border border-sky-400/30 backdrop-blur-md text-sky-300 text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>AUG 8–9, 2026 • MULTAN REGION</span>
        </motion.div>

        {/* Shortened Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-base md:text-lg text-slate-100 max-w-xl sm:max-w-2xl font-normal leading-relaxed drop-shadow-md mb-6 sm:mb-8"
        >
          A premier business-focused technology event bringing together executives, companies, universities, and students in the Multan region to connect, showcase, and create opportunities.
        </motion.p>

        {/* Action Buttons on Lower Left */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Solid Tech Button - Partner With Us (Matching Reference 1) */}
          <Link
            href="/partner"
            className="relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#0055ff] hover:bg-[#1a6dff] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 group"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            }}
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary Outline Tech Button - Submit Your Project (Matching Reference 1) */}
          <Link
            href="/student-connect"
            className="relative inline-flex items-center justify-center p-[1px] bg-white/40 hover:bg-[#0055ff] transition-all duration-200 group cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            }}
          >
            <span
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-[13px] bg-[#030712] group-hover:bg-[#080e1e] text-white font-bold text-xs sm:text-sm tracking-wide transition-colors"
              style={{
                clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              }}
            >
              <span>Submit Your Project</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Third Button - Explore the Expo */}
          {/* <button
            onClick={scrollToExplore}
            className="relative inline-flex items-center justify-center p-[1px] bg-slate-700/60 hover:bg-sky-400/80 transition-all duration-200 group cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            }}
          >
            <span
              className="inline-flex items-center justify-center gap-2 px-5 py-[13px] bg-slate-900/90 group-hover:bg-slate-900 text-slate-200 group-hover:text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors"
              style={{
                clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              }}
            >
              <span>Explore the Expo</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 rotate-90 text-sky-400 transition-transform group-hover:translate-y-0.5" />
            </span>
          </button> */}
        </motion.div>
      </div>
    </section>
  );
}
