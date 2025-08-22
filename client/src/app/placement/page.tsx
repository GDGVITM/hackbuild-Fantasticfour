"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PlacementRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to announcements page to view all placement opportunities
    router.push('/announcements?type=placement');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2 sm:mb-3 md:mb-4"></div>
        <p className="text-gray-600">Redirecting to placement opportunities...</p>
      </div>
    </div>
  );
}
