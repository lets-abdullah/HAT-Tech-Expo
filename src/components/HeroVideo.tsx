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
      {/* Background Video Element - Vibrant & High Opacity */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center">
        {/* Ambient Blurred Video Background for Mobile Screens (eliminates black bars without cropping) */}
        <div className="absolute inset-0 w-full h-full sm:hidden pointer-events-none opacity-40 blur-2xl scale-125 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center filter brightness-75"
          >
            <source src="/video/gemini_generated_video_f2323285.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Main Hero Video: object-contain on mobile to prevent cropping text, object-cover on desktop */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
          className="w-full h-full object-contain sm:object-cover object-center filter brightness-100 contrast-105 relative z-1"
        >
          <source src="/video/gemini_generated_video_f2323285.mp4" type="video/mp4" />
          <source src="/video/hero-expo-loop.mp4" type="video/mp4" />
          <source src="/video/hero-expo-loop.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Soft Vignette for text contrast without dimming footage */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-none z-2" />
      </div>

      {/* Main Hero Content - Anchored to Lower Left */}
      <div className="relative z-10 max-w-300 mx-auto px-4 sm:px-8 lg:px-10 w-full pb-8 sm:pb-16 pt-20 sm:pt-44 flex flex-col justify-end items-center sm:items-start text-center sm:text-left h-full min-h-[calc(100svh-5rem)] sm:min-h-[calc(100vh-5rem)]">

        {/* Action Buttons on Mobile (full-width stacked) and Desktop (side-by-side row) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          {/* Primary Solid Tech Button - Partner With Us */}
          <Link
            href="/partner"
            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#0055ff] hover:bg-[#1a6dff] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 group"
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
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.25 bg-[#030712] group-hover:bg-[#080e1e] text-white font-bold text-xs sm:text-sm tracking-wide transition-colors"
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
