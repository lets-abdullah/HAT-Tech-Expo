"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyThisExpo() {
  return (
    <section className="w-full bg-white text-slate-900 py-20 relative overflow-hidden">
      <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Number badge and heading */}
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-tech shadow-md shadow-sky-500/20">
                01
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-tech">
                Why This Expo
              </h2>
            </div>

            {/* Paragraph 1 */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Many proven businesses still run on legacy tools because they are
              familiar, not because they are best. Technology can feel costly,
              complex, or irrelevant without context. We close that gap by
              showing it working, with its limits as well as its strengths.
            </p>

            {/* Distinctive Callout Quote Box */}
            <div className="relative rounded-2xl bg-linear-to-r from-sky-50 to-blue-50/60 border border-sky-200/80 p-6 sm:p-7 shadow-sm">
              <p className="text-base sm:text-lg font-bold text-sky-950 italic leading-snug">
                From &ldquo;This is how we have always done it&rdquo; to &ldquo;How can we
                do it better, more securely, and with greater impact?&rdquo;
              </p>
            </div>

            {/* Paragraph 2 */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Moreover with the industry engaging concept and spreading the
              awareness of the new technologies and their products, we are also
              focusing the new generation and making more ways to strengthen their
              future by proving their skills and grab the opportunity to stand
              tall in the society.
            </p>

            {/* Key highlights pills */}
            <div className="pt-2 flex flex-wrap gap-3">
              {[
                "Bridging Enterprise & Next-Gen Talent",
                "Practical Case Studies & Demos",
                "Regional Growth in Southern Punjab",
              ].map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual Heritage Landmark Integration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-900/10 group bg-slate-950">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/images/multan-monument.jpg"
                  alt="Tomb of Shah Rukn-e-Alam, Multan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
