"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerInquirySchema, PartnerInquiryFormData } from "@/lib/schema";
import {
  Sparkles,
  Award,
  Briefcase,
  Sliders,
  Users,
  HeartHandshake,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Crown,
  Trophy,
  Medal,
  Shield,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function PartnerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PartnerInquiryFormData>({
    resolver: zodResolver(partnerInquirySchema),
    defaultValues: {
      companyName: "",
      industry: "",
      city: "",
      address: "",
      companyPhone: "",
      website: "",
      contactPerson: "",
      designation: "",
      phone: "",
      email: "",
      selectedPackage: "",
      goals: "",
    },
  });

  const onSubmit = async (data: PartnerInquiryFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/partner-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to submit partner inquiry");
      }

      setSubmittedSuccess(true);
      reset();
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    } catch (err: any) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const packages = [
    {
      id: "Platinum Sponsor",
      name: "PLATINUM",
      sub: "Title Sponsor",
      price: "PKR 1,500,000",
      desc: "Top billing across all platforms, keynote speaking slot, premium exhibition stall & 20 VIP passes.",
      icon: Crown,
      tag: "Top Tier",
      badgeClass: "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-sm shadow-sky-500/20",
      highlight: true,
    },
    {
      id: "Gold Sponsor",
      name: "GOLD",
      sub: "Gold Sponsor",
      price: "PKR 700,000",
      desc: "Executive panel seat, standard exhibition stall, hiring booth at Job Fair & 6 VIP passes.",
      icon: Trophy,
      tag: "Popular",
      badgeClass: "bg-linear-to-r from-amber-500 to-yellow-500 text-white shadow-sm shadow-amber-500/20",
      highlight: false,
    },
    {
      id: "Silver Sponsor",
      name: "SILVER",
      sub: "Silver Sponsor",
      price: "PKR 250,000",
      desc: "Basic exhibition stall, Job Fair hiring booth, regional media mention & 3 VIP passes.",
      icon: Medal,
      tag: "Exhibitor",
      badgeClass: "bg-slate-200 text-slate-800",
      highlight: false,
    },
    {
      id: "Supporting Sponsor",
      name: "SUPPORTING",
      sub: "Supporting Sponsor",
      price: "PKR 100,000",
      desc: "Logo on all printed event collaterals, digital campaign mention & executive entry pass.",
      icon: Shield,
      tag: "Partner",
      badgeClass: "bg-slate-100 text-slate-700",
      highlight: false,
    },
  ];

  const specialOpportunities = [
    {
      title: "Project Awards Sponsor",
      description:
        "Name the student project prize and present it directly to the winner during the grand finale ceremony.",
      icon: Award,
      tag: "Awards & Honors",
      packageName: "Project Awards Sponsor",
    },
    {
      title: "Job Fair Partner",
      description:
        "Premium hiring zone, dedicated interview pods, and prominent branding in the active job recruitment pavilion.",
      icon: Briefcase,
      tag: "Recruitment",
      packageName: "Job Fair Partner",
    },
    {
      title: "Custom Partnership",
      description:
        "Tell us your specific marketing or recruitment goals and our leadership will shape a bespoke package tailored for you.",
      icon: Sliders,
      tag: "Bespoke",
      packageName: "Custom Partnership",
    },
  ];

  const whySponsorReasons = [
    {
      title: "Executive Reach",
      description:
        "Executives from five prominent industries, plus high-growth enterprises from across Multan and Southern Punjab.",
      icon: Users,
      tag: "5+ Industries",
      stat: "1,500+ Attendees Expected",
    },
    {
      title: "Goodwill & Impact",
      description:
        "Support local universities, youth innovation, and regional economic empowerment by uplifting homegrown talent.",
      icon: HeartHandshake,
      tag: "Regional Impact",
      stat: "Youth & University Focus",
    },
    {
      title: "Talent & Dealflow",
      description:
        "Meet future employees, high-value enterprise clients, and strategic technology collaborators in one focused room.",
      icon: TrendingUp,
      tag: "B2B Deal-making",
      stat: "On-the-spot Hiring & Deals",
    },
  ];

  const comparisonRows = [
    {
      benefit: '"Presented by" title & top billing',
      plat: "✓",
      gold: "—",
      silver: "—",
      supp: "—",
    },
    {
      benefit: "Executive panel / speaking slot",
      plat: "Keynote",
      gold: "Panel seat",
      silver: "—",
      supp: "—",
    },
    {
      benefit: "Exhibition stall",
      plat: "Premium",
      gold: "Standard",
      silver: "Basic",
      supp: "—",
    },
    {
      benefit: "Hiring booth at the Job Fair",
      plat: "✓",
      gold: "✓",
      silver: "✓",
      supp: "—",
    },
    {
      benefit: "Project Exhibition & awards branding",
      plat: "✓",
      gold: "✓",
      silver: "—",
      supp: "—",
    },
    {
      benefit: "Logo on banners, backdrop & printed material",
      plat: "✓",
      gold: "✓",
      silver: "✓",
      supp: "✓",
    },
    {
      benefit: "Media & social media coverage",
      plat: "Featured",
      gold: "Featured",
      silver: "Mention",
      supp: "Mention",
    },
    {
      benefit: "Complimentary executive passes",
      plat: "20",
      gold: "6",
      silver: "3",
      supp: "1",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full py-20 border-b border-sky-950/60 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/partner-handshake.jpg"
            alt="Business Partnership"
            fill
            className="object-cover opacity-120 filter brightness-75"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-300 mx-auto px-6 sm:px-8 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-900/40 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPONSORSHIP & EXHIBITION</span>
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-tech">
              Partner With Us
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Join <strong className="text-white">HAT Tech Expo</strong> as a
              sponsor, exhibitor, or panel speaker and connect with
              decision-makers, top talent, and real opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* 01 Sponsorship Packages (Homepage Card Design & Hover Styling) */}
      <section className="w-full bg-white text-slate-900 py-20 border-b border-slate-200">
        <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-tech shadow-md shadow-sky-500/20">
                01
              </span>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-tech">
                  Sponsorship Packages
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Choose the level that fits your goals. Amounts are to be confirmed by HAT Tech Media.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Tier Cards with Homepage Styling & Hover Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`bg-white rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-400 hover:-translate-y-1.5 ${
                    pkg.highlight
                      ? "border-sky-500/80 ring-1 ring-sky-500/20"
                      : "border-slate-200"
                  }`}
                >
                  {/* Subtle top hover highlight matching homepage */}
                  <div
                    className={`absolute top-0 inset-x-0 h-1 bg-linear-to-r from-sky-500 to-blue-600 transition-opacity duration-300 ${
                      pkg.highlight
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-linear-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sky-500/30">
                        <Icon className="w-7 h-7 stroke-2" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {pkg.tag}
                      </span>
                    </div>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase mb-3 ${pkg.badgeClass}`}
                    >
                      {pkg.name}
                    </span>

                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      {pkg.sub}
                    </h3>

                    <div className="mt-2 text-2xl font-extrabold text-slate-900 font-tech group-hover:text-[#0055ff] transition-colors">
                      {pkg.price}
                    </div>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed font-normal">
                      {pkg.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <a
                      href="#partner-form"
                      onClick={() => setValue("selectedPackage", pkg.id)}
                      className="w-full py-2.5 rounded-xl border border-sky-600 text-sky-600 group-hover:bg-[#0055ff] group-hover:text-white group-hover:border-[#0055ff] text-xs font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs group-hover:shadow-md group-hover:shadow-blue-500/20 cursor-pointer"
                    >
                      <span>Select {pkg.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02 Package Comparison (Exact match to Image 1) */}
      <section className="w-full bg-white text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-[#0055ff] tracking-widest uppercase">
                02 / PROPOSED BENEFITS
              </span>
              <span className="w-8 h-0.5 bg-[#0055ff]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a1128] tracking-tight font-tech">
              Package comparison
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-3 max-w-3xl leading-relaxed">
              The sponsorship document outlines these proposed benefits by package; final terms remain subject to written confirmation.
            </p>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#09152e] text-white">
                  <th className="py-4 px-6 text-xs font-bold tracking-wider uppercase min-w-70">
                    Proposed benefit
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold tracking-wider uppercase min-w-30">
                    Platinum
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold tracking-wider uppercase min-w-30">
                    Gold
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold tracking-wider uppercase min-w-30">
                    Silver
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold tracking-wider uppercase min-w-30">
                    Supporting
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row) => (
                  <tr
                    key={row.benefit}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-slate-800">
                      {row.benefit}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <ComparisonCellValue val={row.plat} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <ComparisonCellValue val={row.gold} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <ComparisonCellValue val={row.silver} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <ComparisonCellValue val={row.supp} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 03 Special Opportunities & 04 Why Sponsor (Homepage Card Design & Hover Styling) */}
      <section className="w-full bg-slate-50 text-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-300 mx-auto space-y-16">
          {/* 03 Special Opportunities */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-tech shadow-md shadow-sky-500/20">
                03
              </span>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-tech">
                  Special Opportunities
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  High-visibility activations and tailored feature placements.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialOpportunities.map((opp, index) => {
                const Icon = opp.icon;
                return (
                  <motion.div
                    key={opp.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top hover highlight matching homepage */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-linear-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sky-500/30">
                          <Icon className="w-7 h-7 stroke-2" />
                        </div>
                        <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {opp.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0055ff] transition-colors">
                        {opp.title}
                      </h3>

                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                        {opp.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                      <a
                        href="#partner-form"
                        onClick={() => setValue("selectedPackage", opp.packageName)}
                        className="inline-flex items-center gap-1.5 hover:text-blue-700 font-bold transition-colors cursor-pointer"
                      >
                        <span>Inquire For This Role</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 04 Why Sponsor */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-tech shadow-md shadow-sky-500/20">
                04
              </span>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-tech">
                  Why Sponsor
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Tangible returns on brand awareness, talent acquisition, and deal generation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whySponsorReasons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top hover highlight matching homepage */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-linear-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sky-500/30">
                          <Icon className="w-7 h-7 stroke-2" />
                        </div>
                        <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0055ff] transition-colors">
                        {item.title}
                      </h3>

                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                      <span>{item.stat}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-xs text-slate-500 italic">
              Benefits shown are proposed and may be adjusted. Final terms are
              confirmed in writing once a package is selected.
            </p>
          </div>
        </div>
      </section>

      {/* 05 Sponsor Inquiry Form (Exact match to Image 2 in Light Theme) */}
      <section
        id="partner-form"
        className="w-full bg-[#f4f7fb] text-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200"
      >
        <div className="max-w-300 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-[#0055ff] tracking-widest uppercase">
                    05 / START A CONVERSATION
                  </span>
                  <span className="w-8 h-0.5 bg-[#0055ff]" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0a1128] tracking-tight font-tech">
                  Sponsor inquiry
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-3 leading-relaxed max-w-md">
                  Tell HAT Tech Media about your organization and the partnership
                  you have in mind. Submitting an inquiry does not create a
                  payment or commitment.
                </p>
              </div>

              {/* Dark Navy Callout Box */}
              <div className="bg-[#09152e] text-white rounded-xl p-6 sm:p-7 shadow-lg space-y-4 max-w-md">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Discuss a partnership
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Contact details as documented in the sponsorship material:
                </p>
                <div className="space-y-1.5 pt-1 text-sm">
                  <a
                    href="tel:03106111886"
                    className="block text-white font-semibold hover:text-sky-300 transition-colors"
                  >
                    0310-6111886
                  </a>
                  <a
                    href="mailto:info@hattechmedia.com"
                    className="block text-slate-200 hover:text-sky-300 transition-colors"
                  >
                    info@hattechmedia.com
                  </a>
                  <a
                    href="mailto:hattechmedia@gmail.com"
                    className="block text-slate-200 hover:text-sky-300 transition-colors"
                  >
                    hattechmedia@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols) Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                {submittedSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 text-[#0055ff] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 font-tech">
                      Partnership Inquiry Submitted!
                    </h3>
                    <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                      Thank you for your interest in partnering with HAT Tech Expo.
                      The HAT Tech Media organizing team will reach out with the
                      full partnership prospectus.
                    </p>
                    <button
                      onClick={() => setSubmittedSuccess(false)}
                      className="px-6 py-2.5 rounded-xl bg-[#0055ff] text-white text-xs font-bold hover:bg-[#1a6dff] transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {serverError && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                        {serverError}
                      </div>
                    )}

                    {/* Section 1: Company details */}
                    <div className="space-y-4">
                      <h4 className="text-base font-bold text-slate-900">
                        Company details
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Company name <span className="text-[#0055ff]">*</span>
                          </label>
                          <input
                            {...register("companyName")}
                            type="text"
                            placeholder="Organization name"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                          {errors.companyName && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.companyName.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Industry <span className="text-[#0055ff]">*</span>
                          </label>
                          <input
                            {...register("industry")}
                            type="text"
                            placeholder="Your industry"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                          {errors.industry && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.industry.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            City <span className="text-[#0055ff]">*</span>
                          </label>
                          <input
                            {...register("city")}
                            type="text"
                            placeholder="City"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                          {errors.city && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.city.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Address
                          </label>
                          <input
                            {...register("address")}
                            type="text"
                            placeholder="Optional"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Company phone
                          </label>
                          <input
                            {...register("companyPhone")}
                            type="text"
                            placeholder="Optional"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Company website
                          </label>
                          <input
                            {...register("website")}
                            type="text"
                            placeholder="https://"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Contact person */}
                    <div className="space-y-4 pt-2 border-t border-slate-100">
                      <h4 className="text-base font-bold text-slate-900">
                        Contact person
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Full name <span className="text-[#0055ff]">*</span>
                          </label>
                          <input
                            {...register("contactPerson")}
                            type="text"
                            placeholder="Contact person"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                          {errors.contactPerson && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.contactPerson.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Designation
                          </label>
                          <input
                            {...register("designation")}
                            type="text"
                            placeholder="Optional"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Mobile number <span className="text-[#0055ff]">*</span>
                          </label>
                          <input
                            {...register("phone")}
                            type="text"
                            placeholder="Contact mobile"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                          {errors.phone && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.phone.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Email address <span className="text-[#0055ff]">*</span>
                          </label>
                          <input
                            {...register("email")}
                            type="email"
                            placeholder="name@company.com"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                          {errors.email && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Partnership interest */}
                    <div className="space-y-4 pt-2 border-t border-slate-100">
                      <h4 className="text-base font-bold text-slate-900">
                        Partnership interest
                      </h4>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Select an area <span className="text-[#0055ff]">*</span>
                        </label>
                        <select
                          {...register("selectedPackage")}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all"
                        >
                          <option value="">Choose your interest</option>
                          <option value="Platinum Sponsor">Platinum Sponsor</option>
                          <option value="Gold Sponsor">Gold Sponsor</option>
                          <option value="Silver Sponsor">Silver Sponsor</option>
                          <option value="Supporting Sponsor">Supporting Sponsor</option>
                          <option value="Job Fair Partner">Job Fair Partner</option>
                          <option value="Project Awards Sponsor">Project Awards Sponsor</option>
                          <option value="Custom Partnership">Custom Partnership</option>
                        </select>
                        {errors.selectedPackage && (
                          <span className="text-red-500 text-xs mt-1 block">
                            {errors.selectedPackage.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Message (optional)
                        </label>
                        <textarea
                          {...register("goals")}
                          rows={4}
                          placeholder="Share your goals or questions."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0055ff] focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Signature Chamfered Tech Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-[#0055ff] hover:bg-[#1a6dff] text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit partnership inquiry</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ComparisonCellValue({ val }: { val: string }) {
  if (val === "—") {
    return <span className="text-slate-300 font-normal select-none">—</span>;
  }
  if (val === "✓") {
    return <span className="text-[#0055ff] font-bold text-base">✓</span>;
  }
  return <span className="text-[#0055ff] font-bold text-sm">{val}</span>;
}
