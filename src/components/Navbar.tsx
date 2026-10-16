"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Partner With Us", href: "/partner" },
    { name: "Student Connect", href: "/student-connect" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030712] border-b border-slate-900">
      <div className="max-w-300 mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Seamless Integrated Logo */}
          <Link href="/" className="flex items-center group -ml-1 sm:ml-0">
            <div className="relative h-11 w-36 sm:h-13 sm:w-48 md:h-14 md:w-56 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/hat-logo-trimmed.png"
                alt="HAT TECH EXPO"
                fill
                priority
                className="object-contain object-left mix-blend-screen"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-all duration-200 relative py-2 ${
                    isActive
                      ? "text-sky-400 font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-sky-500 to-blue-600 rounded-full shadow-[0_0_8px_#38bdf8]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/student-connect"
              className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0055ff] hover:bg-[#1a6dff] text-white font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              }}
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-sky-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030712] border-b border-slate-900 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-sky-950/60 text-sky-400 font-semibold border-l-4 border-sky-400"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/student-connect"
              onClick={() => setMobileMenuOpen(false)}
              className="relative w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#0055ff] hover:bg-[#1a6dff] text-white font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-md shadow-blue-600/30"
              style={{
                clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              }}
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
