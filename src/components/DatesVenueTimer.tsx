"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";

export default function DatesVenueTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // Target date: August 8, 2026, 09:30 AM
    const targetDate = new Date("2026-08-08T09:30:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="dates-venue-section"
      className="w-full bg-white text-slate-900 border-y border-slate-200 py-10 sm:py-14 relative shadow-sm"
    >
      <div className="max-w-300 mx-auto px-6 sm:px-8 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left & Middle Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:gap-12 w-full lg:w-auto">
          {/* Dates Item */}
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-sky-50 text-blue-600 mt-0.5">
              <Calendar className="w-6 h-6 stroke-2" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider font-semibold text-slate-400 font-tech">
                DATES
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900">
                August 8–9, 2026 · 9:30 AM – 5:00 PM
              </p>
            </div>
          </div>

          {/* Venue Item */}
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600 mt-0.5">
              <MapPin className="w-6 h-6 stroke-2" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider font-semibold text-slate-400 font-tech">
                VENUE
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900">
                San Mateo County Event Center
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                1346 Saratoga Dr, San Mateo, CA{" "}
                <span className="text-sky-600 font-semibold">(Multan Regional Edition)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Live Countdown Timer with Corner HUD Brackets */}
        <div className="flex items-center gap-3 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto justify-center">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg">
              {/* Corner tick brackets matching image */}
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-blue-600" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-blue-600" />
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-blue-600" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-600" />
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-tech tracking-tight">
                {timeLeft.days}
              </span>
            </div>
            <span className="mt-2 text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase font-tech">
              DAYS
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg">
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-blue-600" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-blue-600" />
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-blue-600" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-600" />
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-tech tracking-tight">
                {timeLeft.hours}
              </span>
            </div>
            <span className="mt-2 text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase font-tech">
              HOURS
            </span>
          </div>

          {/* Mins */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg">
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-blue-600" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-blue-600" />
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-blue-600" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-600" />
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-tech tracking-tight">
                {timeLeft.minutes}
              </span>
            </div>
            <span className="mt-2 text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase font-tech">
              MINS
            </span>
          </div>

          {/* Secs */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg">
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-blue-600" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-blue-600" />
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-blue-600" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-600" />
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-tech tracking-tight">
                {timeLeft.seconds}
              </span>
            </div>
            <span className="mt-2 text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase font-tech">
              SECS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
