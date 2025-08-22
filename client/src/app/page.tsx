'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Enhanced Button Styles ---
  const primaryButtonClasses = "group relative flex justify-center items-center py-4 px-8 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-[#006d77] to-[#83c5be] hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#83c5be]/30 disabled:opacity-50 transition-all duration-300 overflow-hidden";
  const secondaryButtonClasses = "group relative flex justify-center items-center py-4 px-8 border-2 border-[#e29578] rounded-xl shadow-lg text-base font-semibold text-[#e29578] bg-white/90 backdrop-blur-sm hover:bg-[#e29578] hover:text-white hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#e29578]/30 transition-all duration-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#83c5be]/10 to-[#006d77]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#ffddd2]/20 to-[#e29578]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#83c5be]/5 to-[#006d77]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* --- Enhanced Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-white/20 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="group flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">EduMitra</span>
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link href="/login" className={`${secondaryButtonClasses} w-auto px-6 py-3`}>
                  <span>Login</span>
                </Link>
                <Link href="/signup" className={`${primaryButtonClasses} w-auto px-6 py-3`}>
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#83c5be] to-[#006d77] opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-3 text-[#006d77] hover:bg-[#83c5be]/10 focus:outline-none focus:ring-4 focus:ring-[#83c5be]/20 rounded-xl transition-all duration-300"
                aria-label="Open main menu"
              >
                <svg className={`h-6 w-6 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="md:hidden pb-6 animate-in slide-in-from-top-5 duration-300">
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="/login" className={`${secondaryButtonClasses} text-center w-full`}>
                  <span>Login</span>
                </Link>
                <Link href="/signup" className={`${primaryButtonClasses} text-center w-full`}>
                  <span className="relative z-10">Sign Up</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="animate-in fade-in zoom-in duration-1000">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#83c5be]/20 to-[#006d77]/20 text-[#006d77] border border-[#83c5be]/30 backdrop-blur-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Your Education Revolution Starts Here
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#006d77] via-[#83c5be] to-[#006d77] bg-clip-text text-transparent">Edu</span>Mitra
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-[#006d77] font-bold mb-6 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
              Your Unified Education & Career Companion
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-1000 delay-500">
              Transform your academic journey with personalized dashboards, smart career guidance, and comprehensive tools designed for the modern student.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-700">
              <Link href="/signup" className={`${primaryButtonClasses} w-full sm:w-auto`}>
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link href="#features" className={`${secondaryButtonClasses} w-full sm:w-auto`}>
                <span className="flex items-center">
                  Explore Features
                  <svg className="w-5 h-5 ml-2 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#ffddd2] to-[#e29578] rounded-2xl opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-10 w-16 h-16 bg-gradient-to-br from-[#83c5be] to-[#006d77] rounded-full opacity-60 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-[#e29578] to-[#ffddd2] rounded-xl opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </section>

      {/* --- Problem Statement --- */}
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#edf6f9]/50 to-[#ffddd2]/20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#e29578]/20 to-[#ffddd2]/20 text-[#e29578] rounded-full text-sm font-semibold mb-4 border border-[#e29578]/20">
              The Problem We Solve
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">The Challenge Students Face</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Today's students juggle academics, exams, and careers across fragmented platforms, struggling with poor connectivity and generic, one-size-fits-all solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffddd2]/20 to-[#e29578]/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ffddd2] to-[#e29578] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Multiple Apps Chaos</h3>
                <p className="text-gray-700 leading-relaxed">Students waste time switching between different platforms for academics, test prep, and career planning.</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#83c5be]/20 to-[#006d77]/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-[#83c5be] to-[#006d77] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Connectivity Barriers</h3>
                <p className="text-gray-700 leading-relaxed">Poor internet access limits educational opportunities, especially in underserved regions.</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e29578]/20 to-[#ffddd2]/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-[#e29578] to-[#ffddd2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Generic Solutions</h3>
                <p className="text-gray-700 leading-relaxed">One-size-fits-all content that ignores individual learning styles and career aspirations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Key Features --- */}
      <section id="features" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#83c5be]/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#006d77]/20 to-[#83c5be]/20 text-[#006d77] rounded-full text-sm font-semibold mb-4 border border-[#006d77]/20">
              Our Powerful Solution
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Comprehensive, intelligent features designed for the modern student's journey from academics to career success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Dashboard",
                description: "Smart analytics track your academic progress, attendance, goals, and applications with personalized insights.",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                gradient: "from-[#006d77] to-[#83c5be]"
              },
              {
                title: "Curated Content Hub",
                description: "Access premium courses, exam materials, scholarships, and internship opportunities in one place.",
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                gradient: "from-[#83c5be] to-[#ffddd2]"
              },
              {
                title: "Career Acceleration Tools",
                description: "Professional resume builder, skill mapping, mock interviews, and personalized career pathway guidance.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                gradient: "from-[#e29578] to-[#ffddd2]"
              },
              {
                title: "Vibrant Community",
                description: "Connect with peers, access expert mentorship, participate in study groups, and get answers in our Q&A forums.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20V-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                gradient: "from-[#006d77] to-[#e29578]"
              },
              {
                title: "Smart Notifications",
                description: "AI-driven reminders for deadlines, learning streaks, opportunities, and personalized study schedules.",
                icon: "M15 17h5l-5 5v-5z",
                gradient: "from-[#ffddd2] to-[#83c5be]"
              },
              {
                title: "Offline-First Learning",
                description: "Download lessons, notes, and quizzes for seamless learning even without internet connectivity.",
                icon: "M12 14l9-5-9-5-9 5 9 5z",
                gradient: "from-[#83c5be] to-[#006d77]"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 rounded-3xl transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-2xl"></div>
                <div className="relative p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/20 h-full flex flex-col">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#006d77] transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed flex-grow">{feature.description}</p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center text-sm font-semibold text-[#006d77]">
                      Learn more
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006d77] via-[#006d77] to-[#83c5be]"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Join 50,000+ Successful Students
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Ready to Transform<br />Your Education Journey?
          </h2>
          <p className="text-xl sm:text-2xl text-[#edf6f9] mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students who are already excelling with EduMitra's comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <Link href="/signup" className="group relative py-5 px-10 bg-white text-[#006d77] hover:bg-[#edf6f9] font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 w-full sm:w-auto">
              <span className="flex items-center justify-center">
                Start Your Journey
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link href="/login" className="group py-5 px-10 border-3 border-white text-white hover:bg-white hover:text-[#006d77] font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto backdrop-blur-sm">
              <span className="flex items-center justify-center">
                Sign In
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </span>
            </Link>
          </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Priya S.", role: "Engineering Student", quote: "EduMitra transformed my JEE prep completely!" },
              { name: "Rahul K.", role: "MBA Aspirant", quote: "The career tools helped me land my dream internship." },
              { name: "Ananya M.", role: "NEET Aspirant", quote: "Offline features saved my medical entrance prep." }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <p className="text-white/90 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-white/70 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-20 left-10 w-24 h-24 bg-white/10 rounded-3xl rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-white/10 rounded-2xl -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* --- Footer --- */}
      <footer className="relative py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M20 20c0 11-9 20-20 20s-20-9-20-20 9-20 20-20 20 9 20 20zm-4 0c0-8.837-7.163-16-16-16S-12 11.163-12 20s7.163 16 16 16 16-7.163 16-16z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-[#83c5be] to-white bg-clip-text text-transparent">EduMitra</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Empowering students with comprehensive tools for academic excellence and career success. Your trusted companion in the journey of learning and growth.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
                  <a key={social} href={`#${social}`} className="group w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-[#006d77] hover:to-[#83c5be] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Features', 'Pricing', 'Success Stories', 'Help Center'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-[#83c5be] transition-colors duration-300 flex items-center group">
                      <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#83c5be] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">support@edumitra.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#83c5be] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">+91 98765 43210</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#83c5be] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 EduMitra. All rights reserved. | Built with ❤️ for students
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-[#83c5be] transition-colors duration-300">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-[#83c5be] transition-colors duration-300">Terms of Service</a>
              <a href="#cookies" className="text-gray-400 hover:text-[#83c5be] transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
  );
}