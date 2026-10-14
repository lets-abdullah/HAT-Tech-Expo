"use client";

import React from "react";
import {
  Users2,
  Tv2,
  GitFork,
  Trophy,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WhatYouWillExperience() {
  const experiences = [
    {
      title: "Executive Panels",
      description: "Industry leaders on adoption, trade-offs and real outcomes",
      icon: Users2,
      tag: "Strategy",
    },
    {
      title: "Live Demo Zones",
      description: "Technology running in realistic business scenarios",
      icon: Tv2,
      tag: "Live Tech",
    },
    {
      title: "B2B Matchmaking",
      description: "Pre-arranged meetings with relevant decision-makers",
      icon: GitFork,
      tag: "Networking",
    },
    {
      title: "Project Exhibition",
      description: "Student projects on display; the winner receives a prize",
      icon: Trophy,
      tag: "Innovation",
    },
    {
      title: "Job Fair",
      description: "Companies hire on the spot; open to every job seeker",
      icon: Briefcase,
      tag: "Careers",
    },
    {
      title: "University & Student Zone",
      description: "Workshops, talks and career guidance for students",
      icon: GraduationCap,
      tag: "Education",
    },
  ];

  return (
    <section className="w-full bg-slate-50 text-slate-900 py-20 border-b border-slate-200">
      <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-tech shadow-md shadow-sky-500/20">
              02
            </span>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-tech">
                What You Will Experience
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Curated formats engineered for actionable value, deal-making, and talent discovery.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-400 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top hover highlight */}
                <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-linear-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sky-500/30">
                      <Icon className="w-7 h-7 stroke-2" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {exp.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors font-tech tracking-wide">
                    {exp.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                  <span>Explore Format</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
