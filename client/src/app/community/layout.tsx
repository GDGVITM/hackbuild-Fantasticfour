"use client";
import "@liveblocks/react-ui/styles.css";

import Link from "next/link";
import React from "react";

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#edf6f9]">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#006d77]">
            EduMitra
          </Link>
          <h1 className="text-lg font-semibold text-gray-800">Community</h1>
          <div />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

