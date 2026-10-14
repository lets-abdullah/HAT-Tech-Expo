"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomCTA() {
  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden border-t border-sky-900/40">
      {/* Background Cyber Glow & Neon Lighting */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-sky-600/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Laser Light Rays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-900/40 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE MOVEMENT</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight font-tech"
        >
          Be part of the room where{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            industry meets technology
          </span>
          .
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl font-medium"
        >
          Redefining Technology. Challenging Convention. Building the Future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/partner"
            className="relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#0055ff] hover:bg-[#1a6dff] text-white font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 group w-full sm:w-auto"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            }}
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/student-connect"
            className="relative inline-flex items-center justify-center p-px bg-white/40 hover:bg-[#0055ff] transition-all duration-200 group cursor-pointer hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            }}
          >
            <span
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.25 bg-[#030712] group-hover:bg-[#080e1e] text-white font-bold text-sm tracking-wide transition-colors w-full"
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
