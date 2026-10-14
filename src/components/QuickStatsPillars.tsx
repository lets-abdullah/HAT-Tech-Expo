"use client";

import React from "react";
import {
  Building2,
  Users,
  Cpu,
  MapPin,
  Handshake,
  ScreenShare,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

export default function QuickStatsPillars() {
  const metaStats = [
    {
      label: "ORGANIZER",
      value: "HAT Tech Media",
      icon: Building2,
    },
    {
      label: "AUDIENCE",
      value: "Executives, students & job seekers",
      icon: Users,
    },
    {
      label: "FORMAT",
      value: "Expo, Project Display & Job Fair",
      icon: Cpu,
    },
    {
      label: "DATE & VENUE",
      value: "Multan region | TBA",
      icon: MapPin,
    },
  ];

  const pillars = [
    {
      title: "CONNECT",
      description: "Executives, students, companies & job seekers in one room",
      icon: Handshake,
      badge: "Network",
    },
    {
      title: "DEMONSTRATE",
      description: "Live technology, student projects & real industry problems",
      icon: ScreenShare,
      badge: "Showcase",
    },
    {
      title: "TRANSFORM",
      description: "Ideas into deals, careers & partnerships",
      icon: TrendingUp,
      badge: "Impact",
    },
  ];

  return (
    <section className="w-full bg-slate-50 text-slate-900 py-16 border-b border-slate-200">
      <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10 space-y-12">
        {/* Meta Stats Row (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metaStats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 stroke-2" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold tracking-widest text-slate-400 uppercase font-tech">
                      {item.label}
                    </span>
                    <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 font-tech tracking-tight">
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3 Strategic Pillars Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-400 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Top Accent line */}
                <div className="absolute top-0 inset-x-8 h-1 bg-linear-to-r from-sky-400 to-blue-600 rounded-b opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-sky-50 to-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-sky-500/20 transition-all duration-300">
                  <Icon className="w-8 h-8 stroke-2" />
                </div>

                <span className="text-xs uppercase tracking-widest font-extrabold text-sky-600 mb-1">
                  {pillar.badge}
                </span>

                <h3 className="text-xl font-extrabold text-slate-900 tracking-wide font-tech">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
