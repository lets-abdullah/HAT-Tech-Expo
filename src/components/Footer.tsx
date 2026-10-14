"use client";

import React from "react";
import Image from "next/image";
import { Globe, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 items-start">
          {/* Col 1: Logo & Mission */}
          <div className="space-y-4 max-w-sm">
            <div className="relative h-12 w-48">
              <Image
                src="/images/hat-logo-transparent.png"
                alt="HAT TECH EXPO"
                fill
                className="object-contain mix-blend-screen"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Redefining Technology. Challenging Convention. Building the Future.
              A premier regional tech conference and exhibition connecting
              enterprises, founders, and the next generation.
            </p>
          </div>

          {/* Col 2: Direct Contact Information */}
          <div className="space-y-3 md:justify-self-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 font-tech">
              Contact & Inquiries
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a
                  href="https://hattechmedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  hattechmedia.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a
                  href="mailto:info@hattechmedia.com"
                  className="hover:text-sky-400 transition-colors"
                >
                  info@hattechmedia.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a
                  href="mailto:hattechmedia@gmail.com"
                  className="hover:text-sky-400 transition-colors"
                >
                  hattechmedia@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-slate-300">
                  0310-6111886 | 03321302069
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Host Initiative */}
          <div className="space-y-3 md:justify-self-end max-w-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 font-tech">
              Host Initiative
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              An initiative by{" "}
              <span className="text-sky-400 font-semibold">
                HAT Tech Media
              </span>
              .
            </p>
            <div className="pt-2 flex items-start gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>Multan Regional Technology Hub</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 HAT Tech Expo. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for <span className="text-sky-400 font-semibold">HAT Tech Media</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
