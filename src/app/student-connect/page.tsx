"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  studentSubmissionSchema,
  StudentSubmissionFormData,
} from "@/lib/schema";
import {
  Sparkles,
  GraduationCap,
  Trophy,
  Briefcase,
  Users,
  Presentation,
  CheckCircle2,
  Send,
  Loader2,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function StudentConnectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<StudentSubmissionFormData>({
    resolver: zodResolver(studentSubmissionSchema),
    defaultValues: {
      submissionType: "submit_project",
      fullName: "",
      university: "",
      email: "",
      projectTitle: "",
      message: "",
      projectLink: "",
    },
  });

  const selectedType = watch("submissionType");

  const onSubmit = async (data: StudentSubmissionFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/student-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to submit student form");
      }

      setSubmittedSuccess(true);
      reset();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) { }
    } catch (err: any) {
      setServerError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const studentBenefits = [
    { text: "Workshops, talks and career guidance", icon: GraduationCap },
    { text: "Student projects on display", icon: Presentation },
    { text: "Winner receives an official prize & certificate", icon: Trophy },
    { text: "Connect with industry professionals", icon: Users },
    { text: "Direct job opportunities & on-spot interviews", icon: Briefcase },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full py-20 border-b border-sky-950/60 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/student-connect-hero.jpg"
            alt="Student Innovation and Technology"
            fill
            className="object-cover opacity-120 filter brightness-90"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-300 mx-auto px-6 sm:px-8 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-900/40 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEXT GENERATION INNOVATION</span>
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-tech">
              Student Connect
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Showcase your project, contribute to{" "}
              <strong className="text-white">HAT Tech Expo</strong>, or get in
              touch with the organizing team to launch your tech career.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Student Zone Card Section (Light / Clean Modern Theme) */}
      <section className="w-full bg-slate-50 text-slate-900 py-20 border-b border-slate-200">
        <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Student Project & Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
              <div className="space-y-2 mb-8">
                <span className="text-[11px] font-bold tracking-widest text-sky-600 uppercase">
                  PARTICIPATION PORTAL
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-tech">
                  Student Project & Contact Form
                </h2>
                <p className="text-sm text-slate-500">
                  Select your objective and share details about your university work.
                </p>
              </div>

              {submittedSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-tech text-slate-900">
                    Application Submitted!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm">
                    Thank you! The HAT Tech Expo student committee will review
                    your submission and reach out with event scheduling details.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="px-6 py-2.5 rounded-full bg-sky-600 text-white text-xs font-bold hover:bg-sky-500 cursor-pointer transition-colors"
                  >
                    Submit Another Project
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {serverError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                      {serverError}
                    </div>
                  )}

                  {/* Full Name & University */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        {...register("fullName")}
                        type="text"
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none"
                      />
                      {errors.fullName && (
                        <span className="text-red-500 text-xs mt-1 block">
                          {errors.fullName.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        University *
                      </label>
                      <input
                        {...register("university")}
                        type="text"
                        placeholder="Your university"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none"
                      />
                      {errors.university && (
                        <span className="text-red-500 text-xs mt-1 block">
                          {errors.university.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email & Project Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-xs mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Project Title
                      </label>
                      <input
                        {...register("projectTitle")}
                        type="text"
                        placeholder="Enter your project title"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Description / Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Description / Your Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Brief description of your project or your message to organizers"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none resize-none"
                    />
                    {errors.message && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Project Link */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Link (optional)
                    </label>
                    <input
                      {...register("projectLink")}
                      type="url"
                      placeholder="Link to your project or demo (GitHub, Figma, Video...)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none"
                    />
                    {errors.projectLink && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.projectLink.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button matching official reference design (Image 2) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 bg-[#0055ff] hover:bg-[#1a6dff] text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send to the organizing team</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: University & Student Zone Side Card */}
            <div className="lg:col-span-5 bg-slate-950 rounded-3xl p-7 border border-sky-900/50 shadow-2xl text-white space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">
                    STUDENT ECOSYSTEM
                  </span>
                  <h3 className="text-xl font-bold font-tech text-white">
                    University & Student Zone
                  </h3>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3.5 text-sm text-slate-300">
                {studentBenefits.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <div className="p-1 rounded bg-sky-950 text-sky-400 mt-0.5 border border-sky-800">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="leading-snug">{item.text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Lab Photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 w-full border border-sky-500/30">
                <Image
                  src="/images/student-team.jpg"
                  alt="Student Team Hackathon"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-sky-500/20 flex items-center justify-between">
                  <span className="font-semibold">Live Project Showcase</span>
                  <span className="text-sky-400 font-mono text-[10px]">
                    HAT Expo &apos;26
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
