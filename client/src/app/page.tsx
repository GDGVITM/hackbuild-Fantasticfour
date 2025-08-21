'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Reusable Button Styles ---
  const primaryButtonClasses = "flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#006d77] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006d77] disabled:opacity-50 transition-all";
  const secondaryButtonClasses = "flex justify-center py-3 px-6 border border-[#e29578] rounded-lg shadow-sm text-base font-medium text-[#e29578] bg-white hover:bg-[#ffddd2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e29578] transition-all";


  return (
    <div className="min-h-screen bg-[#edf6f9]">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-[#006d77] hover:opacity-80 transition-colors">EduMitra</Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/login" className={`${secondaryButtonClasses} w-auto`}>Login</Link>
                <Link href="/signup" className={`${primaryButtonClasses} w-auto`}>Sign Up</Link>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#006d77] hover:opacity-80 focus:outline-none p-2"
                aria-label="Open main menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-3 mt-2">
                <Link href="/login" className={`${secondaryButtonClasses} text-center w-full`}>Login</Link>
                <Link href="/signup" className={`${primaryButtonClasses} text-center w-full`}>Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
              EduMitra
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#006d77] font-semibold mb-6">
              Your Unified Education & Career Companion
            </p>
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Manage academics, exams, and careers all in one place. Get personalized dashboards and smart career guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link href="/signup" className={`${primaryButtonClasses} w-full sm:w-auto`}>
                Get Started Free
              </Link>
              <Link href="#features" className={`${secondaryButtonClasses} w-full sm:w-auto`}>
                Learn More
              </Link>
            </div>
        </div>
      </section>

      {/* --- Problem Statement --- */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The Challenge Students Face</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students manage academics, exams, and careers across multiple apps, often struggling with connectivity and a lack of personalization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card */}
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#ffddd2] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#e29578]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Apps</h3>
              <p className="text-gray-600">Juggling different platforms for academics and career prep.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#ffddd2] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#e29578]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connectivity Issues</h3>
              <p className="text-gray-600">Poor internet limiting access to educational resources.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#ffddd2] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#e29578]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lack of Personalization</h3>
              <p className="text-gray-600">Generic content that doesn&apos;t adapt to individual learning styles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Key Features --- */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Solution</h2>
            <p className="text-lg text-gray-600">Comprehensive features designed for modern students.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#006d77] mb-2">Personalized Dashboard</h3>
              <p className="text-gray-600">Track academics, attendance, goals, and applications in one place.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#006d77] mb-2">Content Hub</h3>
              <p className="text-gray-600">Courses, exam prep materials, scholarships, and internships.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#006d77] mb-2">Career Tools</h3>
              <p className="text-gray-600">Resume builder, skill mapping, mock tests, and interview prep.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#006d77] mb-2">Community & Mentorship</h3>
              <p className="text-gray-600">Connect with peers, join mentor sessions, and Q&A forums.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#006d77] mb-2">Smart Notifications</h3>
              <p className="text-gray-600">Intelligent reminders for deadlines, learning streaks, and updates.</p>
            </div>
             <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#006d77] mb-2">Offline-First Learning</h3>
              <p className="text-gray-600">Access lessons, notes, and quizzes even without internet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-16 px-4 bg-[#006d77]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Education?</h2>
          <p className="text-lg sm:text-xl text-[#edf6f9] mb-8">Join thousands of students excelling with EduMitra.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link href="/signup" className="py-3 px-6 bg-white text-[#006d77] hover:bg-gray-100 font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto">
              Start Your Journey
            </Link>
            <Link href="/login" className="py-3 px-6 border-2 border-white text-white hover:bg-white hover:text-[#006d77] font-semibold rounded-lg transition-all duration-200 w-full sm:w-auto">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-8 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-[#006d77] mb-4">EduMitra</h3>
          <p className="text-gray-600 mb-4">Your trusted education and career companion.</p>
          <p className="text-sm text-gray-500">© 2024 EduMitra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
