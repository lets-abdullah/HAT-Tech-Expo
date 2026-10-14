"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import DatesVenueTimer from "@/components/DatesVenueTimer";
import QuickStatsPillars from "@/components/QuickStatsPillars";
import WhyThisExpo from "@/components/WhyThisExpo";
import WhatYouWillExperience from "@/components/WhatYouWillExperience";
import TechThemes from "@/components/TechThemes";
import WhoWillBeInRoom from "@/components/WhoWillBeInRoom";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Global Navbar */}
      <Navbar />

      {/* Hero Section with Looping Tech Video & Official Logo */}
      <HeroVideo />

      {/* Dates, Venue & Interactive Real-time Countdown Timer (Image 3) */}
      <DatesVenueTimer />

      {/* Organizer / Audience / Format / Date Info + Connect, Demonstrate, Transform Pillars (Red Area 1 - Light Theme) */}
      <QuickStatsPillars />

      {/* 01 Why This Expo (Light Theme) */}
      <WhyThisExpo />

      {/* 02 What You Will Experience (Red Area 2 - Light Theme) */}
      <WhatYouWillExperience />

      {/* 03 Technology Themes (Light Theme) */}
      <TechThemes />

      {/* 04 Who Will Be in the Room (Replaced by Image 4 Radial Hub - Light Theme) */}
      <WhoWillBeInRoom />

      {/* Bottom Call to Action Arena Banner */}
      <BottomCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
