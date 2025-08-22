"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function CareerResourcesPage() {
  const items = [
    { key: "resume", label: "Resume Completion", progress: 75, color: "from-[#006d77] to-[#004f56]" },
    { key: "mock", label: "Mock Interviews", progress: 40, color: "from-[#83c5be] to-[#006d77]" },
    { key: "ats", label: "ATS Compatibility", progress: 62, color: "from-[#e29578] to-[#83c5be]" },
    { key: "interview", label: "Interview Resources", progress: 28, color: "from-[#ffddd2] to-[#e29578]" },
  ];

  const [animated, setAnimated] = useState<number[]>(() => items.map(() => 0));

  useEffect(() => {
    // Simple animation: increment each progress a bit until it reaches its target
    const timers: number[] = [];

    items.forEach((it, idx) => {
      const step = Math.max(1, Math.floor(it.progress / 20));
      timers[idx] = window.setInterval(() => {
        setAnimated((prev) => {
          const copy = [...prev];
          if (copy[idx] < it.progress) {
            copy[idx] = Math.min(it.progress, copy[idx] + step);
          }
          return copy;
        });
      }, 40 + idx * 30);
    });

    // stop intervals once all reached
    const allChecker = window.setInterval(() => {
      if (animated.every((v, i) => v >= items[i].progress)) {
        timers.forEach((t) => clearInterval(t));
        clearInterval(allChecker);
      }
    }, 250);

    return () => {
      timers.forEach((t) => clearInterval(t));
      clearInterval(allChecker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20 p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 lg:p-10 relative overflow-hidden">
      {/* Decorative gradient orbs like dashboard */}
      <div className="absolute -top-36 -right-36 w-72 h-72 bg-gradient-to-br from-[#83c5be]/10 to-[#006d77]/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute -bottom-36 -left-36 w-72 h-72 bg-gradient-to-tr from-[#ffddd2]/20 to-[#e29578]/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-3 sm:mb-3 sm:mb-4 md:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl sm:text-xl sm:text-2xl md:text-3xl font-extrabold" style={{ background: 'linear-gradient(90deg,#006d77,#83c5be)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Career Resources
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Tools to craft your professional profile and practice for interviews. Tap any card to open its tool.
          </p>
        </header>

        {/* Progress overview - stacked on mobile */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-6">
          {items.map((it, idx) => (
            <div key={it.key} className="bg-white/80 backdrop-blur-xl p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xlborder border-white/50 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-gray-800">{it.label}</div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
                <div className="text-sm font-bold text-gray-800">{animated[idx] || 0}%</div>
              </div>

              <div className="w-full">
                <div className="relative w-full h-2 rounded-full bg-gray-200/50 overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 h-full rounded-full bg-gradient-to-r ${it.color} transition-all duration-700`} style={{ width: `${animated[idx] || 0}%` }} />
                </div>
                {/* small helper for accessibility: hidden native progress for screen readers */}
                <div className="sr-only" aria-hidden>
                  <Progress value={animated[idx] || 0} />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 4 Panels linking to tools */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:p-3 md:p-4">
            <Link href="/resume-builder" className="group block">
              <div className="p-5 rounded-lg sm:rounded-xl md:rounded-2xlbg-white/90 backdrop-blur-sm border border-white/50 shadow-lg hover:scale-102 transition-transform duration-200 active:scale-98 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg,#006d77,#83c5be)' }}>
                  📄
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Resume Builder</div>
                  <div className="text-sm text-gray-500">Create and export ATS-friendly resumes.</div>
                </div>
                <div className="text-xs text-[#006d77] font-semibold">Open</div>
              </div>
            </Link>

            <Link href="/ats" className="group block">
              <div className="p-5 rounded-lg sm:rounded-xl md:rounded-2xlbg-white/90 backdrop-blur-sm border border-white/50 shadow-lg hover:scale-102 transition-transform duration-200 active:scale-98 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg,#e29578,#ffddd2)' }}>
                  🧾
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">ATS Checker</div>
                  <div className="text-sm text-gray-500">Verify resume compatibility with common ATS filters.</div>
                </div>
                <div className="text-xs text-[#e29578] font-semibold">Try</div>
              </div>
            </Link>

            <Link href="/mock-interview" className="group block">
              <div className="p-5 rounded-lg sm:rounded-xl md:rounded-2xlbg-white/90 backdrop-blur-sm border border-white/50 shadow-lg hover:scale-102 transition-transform duration-200 active:scale-98 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg,#83c5be,#006d77)' }}>
                  🎙️
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Mock Interview</div>
                  <div className="text-sm text-gray-500">Practice live or recorded interviews with feedback.</div>
                </div>
                <div className="text-xs text-[#83c5be] font-semibold">Start</div>
              </div>
            </Link>

            <Link href="/interview-library" className="group block">
              <div className="p-5 rounded-lg sm:rounded-xl md:rounded-2xlbg-white/90 backdrop-blur-sm border border-white/50 shadow-lg hover:scale-102 transition-transform duration-200 active:scale-98 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg,#ffddd2,#e29578)' }}>
                  📚
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Interview Resources</div>
                  <div className="text-sm text-gray-500">Guides, common questions and tips for interviews.</div>
                </div>
                <div className="text-xs text-[#e29578] font-semibold">View</div>
              </div>
            </Link>
          </div>

          {/* small footer CTA */}
          <div className="mt-6 text-center">
            <Link href="/dashboard" className="inline-flex items-center px-5 py-3 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(90deg,#006d77,#83c5be)' }}>
              Back to Dashboard
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
