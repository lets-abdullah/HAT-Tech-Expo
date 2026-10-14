"use client";

import React from "react";
import {
  BrainCircuit,
  Database,
  CloudLightning,
  ShieldCheck,
  ShoppingBag,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function TechThemes() {
  const themes = [
    {
      title: "AI & Automation",
      description:
        "Generative models, business workflow automation, intelligent decision systems, and robotic process automation.",
      icon: BrainCircuit,
      stats: "18+ Talks & Demos",
    },
    {
      title: "ERP, CRM & Software",
      description:
        "Scalable enterprise software architectures, CRM pipelines, accounting, and supply chain digitalization.",
      icon: Database,
      stats: "12+ Enterprise Demos",
    },
    {
      title: "Cloud & Data Analytics",
      description:
        "Real-time BI dashboards, predictive analytics, hybrid cloud infrastructures, and data security.",
      icon: CloudLightning,
      stats: "20+ Solutions Showcased",
    },
    {
      title: "Cybersecurity & Trust",
      description:
        "Zero-trust security frameworks, enterprise data privacy, compliance, and threat mitigation systems.",
      icon: ShieldCheck,
      stats: "Executive Security Panel",
    },
    {
      title: "Digital Commerce & Marketing",
      description:
        "Omnichannel retail platforms, performance marketing stacks, fintech payments, and growth hacking.",
      icon: ShoppingBag,
      stats: "B2B & D2C Growth",
    },
    {
      title: "IoT & Smart Operations",
      description:
        "Industrial sensor networks, smart agriculture tech, connected hardware prototypes, and smart logistics.",
      icon: Cpu,
      stats: "Hardware & Agritech Demos",
    },
  ];

  return (
    <section className="w-full bg-white text-slate-900 py-20 border-b border-slate-200">
      <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-tech shadow-md shadow-sky-500/20">
              03
            </span>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-tech">
                Technology Themes
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Covering the critical technology verticals driving regional commerce and modernization.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Theme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => {
            const Icon = theme.icon;
            return (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-400 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-linear-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sky-500/30">
                    <Icon className="w-7 h-7 stroke-2" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors font-tech tracking-wide">
                    {theme.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                    {theme.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="text-sky-600 font-bold">{theme.stats}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
