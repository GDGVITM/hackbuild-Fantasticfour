"use client";
import "@liveblocks/react-ui/styles.css";

import Link from "next/link";
import React from "react";
import {
  Users,
  MessageSquare,
  Bell,
  Search,
  Plus,
  Home,
  BookMarked,
  Sparkles,
  Star,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Globe,
  Hash,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

type Props = {
  children: React.ReactNode;
  activeTab?: "Feed" | "Discussions" | "My Groups" | "Mentors";
};

export default function CommunityLayout({ children, activeTab = "Feed" }: Props) {
  const tabs = [
    { label: "Feed", href: "/community", icon: Users },
    { label: "Discussions", href: "/community/discussions", icon: MessageSquare },
    { label: "My Groups", href: "/community/groups", icon: HeartHandshake },
    { label: "Mentors", href: "/community/mentors", icon: Star },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20">
      {/* Ambient background (mobile-friendly) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-56 w-56 animate-pulse rounded-full bg-gradient-to-br from-[#83c5be]/12 to-[#006d77]/7 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 animate-pulse rounded-full bg-gradient-to-tr from-[#ffddd2]/22 to-[#e29578]/10 blur-3xl" style={{ animationDelay: "2s" }} />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-[#83c5be]/7 to-[#006d77]/7 blur-3xl" style={{ animationDelay: "4s" }} />
      </div>

      {/* Header (mobile-first sizes) */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between gap-2 sm:h-16 md:h-20">
            {/* Brand */}
            <Link
              href="/"
              className="group flex items-center gap-2 transition-all duration-300 hover:scale-105"
              aria-label="EduMitra Home"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#006d77] to-[#83c5be] shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl sm:h-10 sm:w-10">
                <svg className="h-4 w-4 text-white sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent sm:text-2xl">
                EduMitra
              </span>
            </Link>

            {/* Breadcrumb (hidden on mobile) */}
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/" className="text-xs text-gray-500 transition-colors hover:text-[#006d77] sm:text-sm">Home</Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500 sm:text-sm">Community</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-xs font-medium text-transparent sm:text-sm">
                {activeTab}
              </span>
            </div>

            {/* Actions (mobile-first) */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {/* Search (hidden until lg) */}
              <div className="hidden items-center rounded-xl border border-gray-200/60 bg-gray-50/80 px-2 py-1 backdrop-blur-sm transition-all hover:bg-white/80 lg:flex lg:rounded-2xl lg:px-3 lg:py-2">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  placeholder="Search"
                  className="ml-2 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none sm:text-sm"
                  aria-label="Search community"
                />
              </div>

              {/* Notifications */}
              <button
                className="relative rounded-lg p-2 text-[#006d77] transition-all hover:bg-[#edf6f9] focus:outline-none focus:ring-4 focus:ring-[#83c5be]/30 sm:rounded-xl"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#e29578] to-[#ffddd2] text-[10px] text-white shadow-md">
                  3
                </span>
              </button>

              {/* Saved (hidden on mobile) */}
              <Link
                href="/community/saved"
                className="hidden items-center gap-2 rounded-xl border border-gray-200/60 bg-white/80 px-3 py-2 transition-all hover:shadow-sm sm:flex sm:rounded-2xl"
              >
                <BookMarked className="h-4 w-4 text-[#006d77]" />
                <span className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-xs font-medium text-transparent sm:text-sm">Saved</span>
              </Link>

              {/* New Post (hidden on mobile) */}
              <Link
                href="/community/new"
                className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-[#006d77] to-[#83c5be] px-3 py-2 text-white transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#83c5be]/30 sm:flex sm:rounded-2xl sm:px-4"
              >
                <Plus className="h-4 w-4" />
                <span className="text-xs font-semibold sm:text-sm">New Post</span>
              </Link>

              {/* Home (mobile-only) */}
              <Link
                href="/"
                className="rounded-lg p-2 text-[#006d77] transition-all hover:bg-[#edf6f9] sm:hidden"
                aria-label="Go Home"
              >
                <Home className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Subnav (STACK on mobile; horizontal from sm) */}
        <div className="border-t border-white/40 bg-white/60 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-stretch gap-2 py-2 sm:flex-row sm:items-center sm:gap-3">
              {tabs.map((tab) => {
                const active = tab.label === activeTab;
                return (
                  <Link
                    key={tab.label}
                    href={tab.href}
                    className={`w-full sm:w-auto flex items-center rounded-lg border px-3 py-2 text-xs transition-all focus:outline-none focus:ring-4 focus:ring-[#83c5be]/20 sm:rounded-xl sm:px-4 sm:text-sm ${
                      active
                        ? "border-[#83c5be]/30 bg-gradient-to-r from-[#006d77]/10 to-[#83c5be]/10"
                        : "border-gray-200/60 bg-white/70 backdrop-blur-sm hover:bg-white"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <tab.icon className="h-4 w-4 text-[#006d77]" />
                    <span className="ml-2 bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">
                      {tab.label}
                    </span>
                  </Link>
                );
              })}
              <div className="mt-2 hidden items-center gap-2 sm:ml-auto sm:mt-0 md:flex">
                <span className="rounded-lg border border-[#83c5be]/30 bg-[#83c5be]/10 px-2 py-1 text-xs text-[#006d77]">
                  250 online
                </span>
                <span className="rounded-lg border border-[#e29578]/30 bg-[#ffddd2]/30 px-2 py-1 text-xs text-[#e29578]">
                  AMA at 7 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero (mobile-first sizes) */}
      <section className="mx-auto mt-3 max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl border border-white/30 bg-white/70 p-4 shadow-md backdrop-blur-xl transition-all hover:shadow-lg sm:rounded-3xl sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#83c5be]/30 bg-[#83c5be]/10 px-3 py-1">
                <Sparkles className="h-4 w-4 text-[#006d77]" />
                <span className="text-xs font-medium text-[#006d77]">Community Highlights</span>
              </div>
              <h2 className="mt-2 text-xl font-black bg-gradient-to-r from-[#006d77] via-[#83c5be] to-[#006d77] bg-clip-text text-transparent sm:mt-3 sm:text-3xl">
                Welcome to EduMitra Community
              </h2>
              <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
                Learn together, grow faster. Join discussions, discover study groups, and connect with mentors.
              </p>
              <div className="mt-3 flex items-center gap-2 sm:mt-4 sm:gap-3">
                <Link
                  href="/community/new"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#006d77] to-[#83c5be] px-3 py-2 text-xs text-white transition-all hover:scale-[1.02] hover:shadow-lg sm:rounded-2xl sm:px-4 sm:text-sm"
                >
                  Start a Discussion <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/community/groups"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200/60 bg-white/80 px-3 py-2 transition-all hover:shadow-sm sm:rounded-2xl sm:px-4"
                >
                  <Hash className="h-4 w-4 text-[#006d77]" />
                  <span className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-xs font-semibold text-transparent sm:text-sm">
                    Explore Groups
                  </span>
                </Link>
              </div>
            </div>

            {/* Stats (3 columns on mobile, stable) */}
            <div className="grid w-full grid-cols-3 gap-2 md:w-auto md:min-w-[340px] md:gap-3">
              {[
                { label: "Members", value: "12k", color: "from-[#006d77] to-[#83c5be]", icon: Users },
                { label: "Threads", value: "3.1k", color: "from-[#83c5be] to-[#e29578]", icon: MessageSquare },
                { label: "Mentors", value: "120+", color: "from-[#e29578] to-[#ffddd2]", icon: Star },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-gray-100/60 bg-gradient-to-br from-[#edf6f9]/60 to-white/70 p-3 sm:rounded-2xl">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r ${stat.color} shadow-sm`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-1.5">
                    <div className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-lg font-black text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Context bar (STACK on mobile; horizontal from sm) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="sticky top-[58px] z-40 mt-3 flex flex-col items-start gap-2 rounded-xl border border-white/30 bg-white/75 p-2 shadow-sm backdrop-blur-xl sm:top-[72px] sm:flex-row sm:items-center sm:gap-3 sm:rounded-2xl sm:p-3 md:top-[92px]">
          {/* Public */}
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Globe className="h-4 w-4 text-[#006d77]" />
            <span className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-xs font-semibold text-transparent sm:text-sm">Public</span>
          </div>

          <div className="hidden h-5 w-px bg-gray-200/70 sm:block" />

          {/* Safe & Moderated */}
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <ShieldCheck className="h-4 w-4 text-[#83c5be]" />
            <span className="break-words text-xs text-gray-600 sm:text-sm">Safe & Moderated</span>
          </div>

          <div className="hidden h-5 w-px bg-gray-200/70 sm:block" />

          {/* Trending */}
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <TrendingUp className="h-4 w-4 text-[#e29578]" />
            <span className="break-words text-xs text-gray-600 sm:text-sm">Trending: #placements #dsa #notion</span>
          </div>

          {/* Pager buttons (full width on mobile, right-aligned on sm+) */}
          <div className="mt-1 flex w-full items-center gap-1 sm:ml-auto sm:mt-0 sm:w-auto sm:gap-2">
            <button className="w-full rounded-lg border border-gray-200/60 bg-white/80 p-2 transition-all hover:shadow-sm sm:w-auto" aria-label="Previous">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button className="w-full rounded-lg border border-gray-200/60 bg-white/80 p-2 transition-all hover:shadow-sm sm:w-auto" aria-label="Next">
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main (mobile-first grids, paddings) */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Content */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-xl transition-all hover:shadow-2xl sm:rounded-3xl sm:p-6">
              {children}
            </div>
          </div>

          {/* Sidebar (stacks cards on mobile) */}
          <aside className="space-y-5 sm:space-y-6">
            {/* About */}
            <div className="rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:rounded-3xl sm:p-5">
              <h3 className="mb-2 text-base font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent sm:text-lg">
                About the Community
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Connect with peers, discuss topics, share resources, and get mentorship—all in one place.
              </p>
              <div className="mt-3 flex items-center gap-2 sm:mt-4 sm:gap-3">
                <div className="rounded-full border border-[#83c5be]/30 bg-[#83c5be]/10 px-2.5 py-1 text-[11px] text-[#006d77] sm:px-3 sm:text-xs">
                  12k members
                </div>
                <div className="rounded-full border border-[#e29578]/30 bg-[#ffddd2]/30 px-2.5 py-1 text-[11px] text-[#e29578] sm:px-3 sm:text-xs">
                  250 online
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:rounded-3xl sm:p-5">
              <h3 className="mb-3 text-base font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent sm:text-lg">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { label: "Create Post", href: "/community/new" },
                  { label: "My Posts", href: "/community/mine" },
                  { label: "Guidelines", href: "/community/guidelines" },
                  { label: "Report", href: "/community/report" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-lg border border-gray-100/60 bg-white/70 px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-90 sm:rounded-xl sm:text-sm"
                  >
                    <span className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Spotlight */}
            <div className="rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:rounded-3xl sm:p-5">
              <h3 className="mb-3 text-base font-bold bg-gradient-to-r from-[#e29578] to-[#ffddd2] bg-clip-text text-transparent sm:text-lg">
                Spotlight
              </h3>
              <div className="rounded-xl border border-gray-100/60 bg-gradient-to-br from-[#edf6f9] to-white p-3 sm:rounded-2xl sm:p-4">
                <p className="text-sm text-gray-700">
                  Weekly AMA with industry mentors this Friday. Prepare your questions!
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Fri, 7 PM IST</span>
                  <Link
                    href="/community/events"
                    className="rounded-lg bg-gradient-to-r from-[#006d77] to-[#83c5be] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:shadow-md"
                  >
                    View Events
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust & Safety */}
            <div className="rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:rounded-3xl sm:p-5">
              <div className="mb-2 flex items-center gap-2 sm:mb-3">
                <ShieldCheck className="h-4 w-4 text-[#83c5be]" />
                <h3 className="text-base font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent sm:text-lg">
                  Safety First
                </h3>
              </div>
              <p className="text-sm text-gray-700">
                Be respectful. Follow the community guidelines. Report issues so we can keep this space healthy and helpful.
              </p>
              <Link
                href="/community/guidelines"
                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-80 sm:mt-3 sm:text-sm"
              >
                <span className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">Read Guidelines</span>
                <ArrowRight className="h-4 w-4 text-[#006d77]" />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {/* Floating composer CTA (mobile-only) */}
      <div className="fixed bottom-4 right-4 z-50 sm:hidden">
        <Link
          href="/community/new"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#006d77] to-[#83c5be] px-4 py-3 text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#83c5be]/30"
        >
          <Plus className="h-4 w-4" />
          Post
        </Link>
      </div>

      {/* Footer (mobile-first spacing) */}
      <footer className="py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/30 bg-white/60 p-4 text-center shadow-md backdrop-blur-xl sm:flex-row sm:rounded-3xl sm:p-6 sm:text-left">
            <div className="text-xs text-gray-600 sm:text-sm">
              © {new Date().getFullYear()} EduMitra • Built for students with ❤️
            </div>
            <div className="flex items-center gap-3 text-xs sm:gap-4 sm:text-sm">
              <Link href="/privacy" className="transition-opacity hover:opacity-80">
                <span className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">Privacy</span>
              </Link>
              <Link href="/terms" className="transition-opacity hover:opacity-80">
                <span className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">Terms</span>
              </Link>
              <Link href="/" className="flex items-center gap-2 rounded-xl border border-gray-200/60 bg-white/70 px-3 py-1.5 transition-all hover:shadow-sm">
                <Home className="h-4 w-4 text-[#006d77]" />
                <span className="bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">Home</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Hide scrollbar utility (kept available) */}
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
      `}</style>
    </div>
  );
}
