"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactInquirySchema, ContactInquiryFormData } from "@/lib/schema";
import { X, Send, Mail, Phone, Globe, CheckCircle2, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInquiryFormData>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: ContactInquiryFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit message");
      }

      setIsSuccess(true);
      reset();
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {}

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    } catch (err: any) {
      setServerError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-950 text-white flex items-center justify-between border-b border-sky-900/60">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
              HAT TECH MEDIA
            </span>
            <h3 className="text-xl font-bold font-tech">Contact & Inquiries</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                Message Sent!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for reaching out to HAT Tech Media. Our team will review
                your inquiry and contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {serverError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    {...register("phone")}
                    type="text"
                    placeholder="0310-0000000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject *
                  </label>
                  <input
                    {...register("subject")}
                    type="text"
                    placeholder="General inquiry, speaker, booth..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none"
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.subject.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Message / Details *
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="How can we help you or collaborate?"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-none resize-none"
                />
                {errors.message && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Direct: <span className="font-semibold text-slate-800">info@hattechmedia.com</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#0055ff] hover:bg-[#1a6dff] text-white font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send to the organizing team</span>
                      <Send className="w-4 h-4 ml-1 shrink-0" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Quick info badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-500" />
              <span>hattechmedia.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-500" />
              <span>hattechmedia@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-500" />
              <span>0310-6111886</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
