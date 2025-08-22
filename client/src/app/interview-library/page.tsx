"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const STATIC_RESOURCES = [
  {
    id: "r1",
    title: "Common Behavioral Questions",
    category: "Guides",
    description: "STAR method examples and how to structure answers for behavioral interviews.",
    href: "/interview-resources/behavioral",
    emoji: "💬",
  },
  {
    id: "r2",
    title: "Top 50 Technical Questions",
    category: "Technical",
    description: "Core CS and role-specific technical questions with concise solutions.",
    href: "/interview-resources/technical",
    emoji: "🧠",
  },
  {
    id: "r3",
    title: "Phone Screen Tips",
    category: "Guides",
    description: "How to prepare for phone screens and make a great first impression.",
    href: "/interview-resources/phone-screen",
    emoji: "📞",
  },
  {
    id: "r4",
    title: "System Design Primer",
    category: "Technical",
    description: "High-level system design templates and example case studies.",
    href: "/interview-resources/system-design",
    emoji: "🗺️",
  },
  {
    id: "r5",
    title: "Negotiation Checklist",
    category: "Career",
    description: "Key things to know when you receive an offer and how to negotiate.",
    href: "/interview-resources/negotiation",
    emoji: "🤝",
  },
  {
    id: "r6",
    title: "Mock Interview Playbook",
    category: "Practice",
    description: "How to run mock interviews, rubric templates and feedback notes.",
    href: "/interview-resources/mock-playbook",
    emoji: "🎯",
  },
];

export default function InterviewLibraryPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(STATIC_RESOURCES.map((r) => r.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return STATIC_RESOURCES.filter((r) => {
      if (activeCategory && activeCategory !== "All" && r.category !== activeCategory) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20 p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Decorative orbs similar to career-resources */}
      <div className="absolute -top-36 -right-36 w-72 h-72 bg-gradient-to-br from-[#83c5be]/10 to-[#006d77]/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute -bottom-36 -left-36 w-72 h-72 bg-gradient-to-tr from-[#ffddd2]/20 to-[#e29578]/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ background: 'linear-gradient(90deg,#006d77,#83c5be)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Interview Library
          </h1>
          <p className="text-sm text-gray-600 mt-1">Curated guides, question banks and practice playbooks to help you prepare.</p>
        </header>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm bg-white/80 backdrop-blur-sm text-gray-700"
              />
            </div>
            <div className="hidden sm:block">
              <Link href="/career-resources" className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(90deg,#006d77,#83c5be)' }}>
                Back
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto py-2">
            <div className="flex space-x-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === "All" ? null : cat)}
                  className={`whitespace-nowrap px-3 py-2 rounded-xl text-sm font-medium transition ${activeCategory === cat || (!activeCategory && cat === 'All') ? 'bg-[#006d77] text-white' : 'bg-white/80 text-gray-700 border border-white/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((res) => (
              <Link key={res.id} href={res.href} className="group block">
                <article className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-md hover:shadow-lg transition">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-lg" style={{ background: 'linear-gradient(135deg,#ffddd2,#e29578)' }}>
                      <span className="text-xl">{res.emoji}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{res.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{res.description}</p>

                      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                        <span className="px-2 py-1 rounded-full bg-[#83c5be]/10 text-[#006d77] font-semibold">{res.category}</span>
                        <span className="font-semibold text-[#006d77]">Open</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No resources found for "{query}".
              </div>
            )}
          </div>

          {/* small mobile footer CTA */}
          <div className="mt-6 text-center sm:hidden">
            <Link href="/career-resources" className="inline-flex items-center px-4 py-3 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(90deg,#006d77,#83c5be)' }}>
              Back to Career Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
