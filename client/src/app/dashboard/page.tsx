'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { SAMPLE_TIMETABLE, DAYS } from '@/lib/timetableData';
import { getStoredUsername } from '@/lib/auth';

// --- AI Summary Data ---
const AI_SUMMARY_DATA = {
  overallPerformance: {
    gpa: 3.7,
    attendanceRate: 94.2,
    academicStanding: "Good Standing",
    improvementAreas: ["Time management", "Study consistency", "Test anxiety"],
    strengths: ["Strong analytical skills", "Creative problem solving", "Collaborative teamwork"]
  },
  weeklyInsights: [
    {
      metric: "Study Hours",
      value: "28hrs",
      trend: "up",
      insight: "You're spending more time studying - great progress!"
    },
    {
      metric: "Assignment Scores", 
      value: "85%",
      trend: "stable",
      insight: "Consistent performance with room for improvement in research depth"
    },
    {
      metric: "Quiz Performance",
      value: "B+",
      trend: "up", 
      insight: "Your quiz scores are improving - keep up the momentum!"
    },
    {
      metric: "Participation Rate",
      value: "68%",
      trend: "down",
      insight: "Try to engage more actively in class discussions"
    }
  ],
  recommendations: [
    "Create a structured study schedule to improve consistency",
    "Join study groups for subjects you find challenging", 
    "Use active learning techniques like flashcards and practice tests",
    "Visit professor office hours for personalized guidance",
    "Consider stress management techniques for test preparation"
  ],
  upcomingChallenges: [
    "Midterm exams in Mathematics and Physics next week",
    "Research project proposal due in 10 days",
    "Group presentation scheduled for next Friday",
    "Scholarship application deadline approaching"
  ],
  goalTracking: [
    {
      goal: "Raise GPA to 3.8",
      progress: 75,
      targetDate: "End of semester"
    },
    {
      goal: "Complete all assignments on time",
      progress: 60,
      targetDate: "Ongoing"
    },
    {
      goal: "Improve test scores by 10%",
      progress: 40,
      targetDate: "Next month"
    }
  ],
  subjectBreakdown: [
    {
      subject: "Mathematics",
      grade: "A-",
      trend: "stable",
      nextAssignment: "Calculus Problem Set - Due Friday"
    },
    {
      subject: "Physics", 
      grade: "B+",
      trend: "up",
      nextAssignment: "Lab Report - Due Tuesday"
    },
    {
      subject: "Computer Science",
      grade: "A",
      trend: "up", 
      nextAssignment: "Programming Project - Due Next Week"
    }
  ]
};

// --- Premium Icon Components ---
const OverviewIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CoursesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m6-6.126L12 15.5l-6-2.373M12 6.253L18 8.126V19.5L12 17.123 6 19.5V8.126L12 6.253z" />
  </svg>
);

const CareerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const TrendingIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PrevIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const NextIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const UpdateIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.962 8.962 0 0120 13c0 4.97-4.03 9-9 9a8.962 8.962 0 01-2.92-5M4 12h5m-5 0l5 5m5-5h5m-5 0l5-5" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

// --- Trend Icon Component ---
const TrendIcon = ({ trend }: { trend: string }) => (
  <div className={`flex items-center space-x-1 text-xs ${
    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
  }`}>
    {trend === 'up' && (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )}
    {trend === 'down' && (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17H5m0 0V9m0 8l8-8 4 4 6-6" />
      </svg>
    )}
    {trend === 'stable' && (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    )}
  </div>
);

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timetableDate, setTimetableDate] = useState(new Date());
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await getStoredUsername();
        if (mounted) setUsername(u);
      } catch {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const sidebarItems = [
    { href: "#", icon: OverviewIcon, label: "Overview", tab: "overview", count: null },
    { href: "#", icon: CoursesIcon, label: "My Courses", tab: "courses", count: 5 },
    { href: "#", icon: AIIcon, label: "AI Summary", tab: "ai-summary", count: null },
    { href: "#", icon: CareerIcon, label: "Career Prep", tab: "career", count: 3 },
    { href: "#", icon: SettingsIcon, label: "Settings", tab: "settings", count: null },
  ];
  
  const bottomNavItems = [
    { label: "Overview", icon: OverviewIcon, tab: "overview" },
    { label: "Courses", icon: CoursesIcon, tab: "courses" },
    { label: "Lectures", icon: ClockIcon, tab: "lectures" },
    { label: "Career", icon: CareerIcon, tab: "career" },
    { label: "AI Summary", icon: AIIcon, tab: "ai-summary" },
  ];

  const goToPreviousDay = () => {
    setTimetableDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const goToNextDay = () => {
    setTimetableDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };
  
  const dayOfWeek = DAYS[timetableDate.getDay()];
  const lecturesForSelectedDate = SAMPLE_TIMETABLE[dayOfWeek] || [];

  // --- AI Summary Content ---
  const renderAISummary = () => (
    <div className="space-y-6">
      {/* Overall Performance Card */}
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <AIIcon />
            <h2 className="text-2xl font-bold text-gray-800">AI Academic Analysis</h2>
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {AI_SUMMARY_DATA.overallPerformance.academicStanding}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-[#006d77]/10 to-[#006d77]/5 rounded-2xl">
            <p className="text-3xl font-bold text-[#006d77]">{AI_SUMMARY_DATA.overallPerformance.gpa}</p>
            <p className="text-sm text-gray-600">Current GPA</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-[#83c5be]/10 to-[#83c5be]/5 rounded-2xl">
            <p className="text-3xl font-bold text-[#006d77]">{AI_SUMMARY_DATA.overallPerformance.attendanceRate}%</p>
            <p className="text-sm text-gray-600">Attendance Rate</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-[#e29578]/10 to-[#ffddd2]/20 rounded-2xl">
            <p className="text-3xl font-bold text-[#006d77]">{AI_SUMMARY_DATA.goalTracking.length}</p>
            <p className="text-sm text-gray-600">Active Goals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">💪 Your Strengths</h3>
            <ul className="space-y-2">
              {AI_SUMMARY_DATA.overallPerformance.strengths.map((strength, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">🎯 Improvement Areas</h3>
            <ul className="space-y-2">
              {AI_SUMMARY_DATA.overallPerformance.improvementAreas.map((area, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Weekly Insights */}
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6">📊 Weekly Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_SUMMARY_DATA.weeklyInsights.map((insight, index) => (
            <div key={index} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{insight.metric}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-[#006d77]">{insight.value}</span>
                  <TrendIcon trend={insight.trend} />
                </div>
              </div>
              <p className="text-sm text-gray-600">{insight.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6">📖 Subject Performance</h3>
        <div className="space-y-4">
          {AI_SUMMARY_DATA.subjectBreakdown.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50/70 rounded-2xl border border-gray-100">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{subject.subject}</h4>
                <p className="text-sm text-gray-600">{subject.nextAssignment}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#006d77]">{subject.grade}</p>
                  <TrendIcon trend={subject.trend} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Tracking */}
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🎯 Goal Progress</h3>
        <div className="space-y-4">
          {AI_SUMMARY_DATA.goalTracking.map((goal, index) => (
            <div key={index} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{goal.goal}</h4>
                <span className="text-sm text-gray-600">{goal.targetDate}</span>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-[#006d77] to-[#83c5be] h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{goal.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6">💡 AI Recommendations</h3>
        <div className="space-y-3">
          {AI_SUMMARY_DATA.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-[#006d77]/5 to-[#83c5be]/5 rounded-xl">
              <div className="w-6 h-6 bg-[#006d77] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-sm text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Challenges */}
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6">⚡ Upcoming Challenges</h3>
        <div className="space-y-3">
          {AI_SUMMARY_DATA.upcomingChallenges.map((challenge, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">⚠️</div>
              <p className="text-sm text-gray-700">{challenge}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20 relative overflow-hidden">
      {/* Enhanced Animated Background - Matching Landing Page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 sm:p-3 md:p-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#83c5be]/10 to-[#006d77]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#ffddd2]/20 to-[#e29578]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#83c5be]/5 to-[#006d77]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* --- Premium Sidebar with EduMitra Branding --- */}
      <aside className={`fixed inset-y-0 left-0 bg-gradient-to-b from-[#006d77] via-[#005a65] to-[#004752] text-white w-72 sm:w-80 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-all duration-300 ease-in-out z-30 shadow-2xl backdrop-blur-xl`}>
        {/* EduMitra Logo Section - Matching Landing Page */}
        <div className="relative h-16 sm:h-24 flex items-center justify-center border-b border-white/10 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-[#83c5be]/20 to-transparent"></div>
          <Link href="/" className="relative z-10 group flex items-center space-x-3 hover:scale-105 transition-all duration-300">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-base sm:text-xl md:text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-[#83c5be] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">EduMitra</span>
          </Link>
        </div>

        {/* User Info Card */}
        <div className="m-3 sm:m-4 p-3 sm:p-2 sm:p-3 md:p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e29578] rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                P
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-[#006d77]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate text-sm sm:text-base">{username ?? ''}</p>
              <p className="text-xs text-white/70">Computer Science • Year 3</p>
              <div className="flex items-center mt-1 text-xs text-white/60">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Online
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-2 px-3 sm:px-4">
          <div className="space-y-1 sm:space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium rounded-xl sm:rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  activeTab === item.tab
                    ? 'bg-gradient-to-r from-[#83c5be] to-[#83c5be]/80 text-[#006d77] shadow-lg transform scale-[1.02]'
                    : 'hover:bg-white/10 hover:transform hover:translate-x-1 sm:hover:translate-x-2'
                }`}
              >
                {activeTab === item.tab && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                )}
                <div className="relative z-10 flex items-center w-full">
                  <item.icon />
                  <span className="ml-3 flex-1">{item.label}</span>
                  {item.count && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === item.tab 
                        ? 'bg-[#006d77]/20 text-[#006d77]' 
                        : 'bg-white/20 text-white'
                    }`}>
                      {item.count}
                    </span>
                  )}
                  {activeTab === item.tab && (
                    <div className="ml-2 w-2 h-2 bg-[#006d77] rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* Quick Stats Mini - Hidden on mobile for space */}
        <div className="hidden sm:block m-4 p-2 sm:p-3 md:p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-3">Today's Focus</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/70">Study Time</span>
              <span className="text-sm font-bold text-[#83c5be]">2h 45m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/70">Tasks Done</span>
              <span className="text-sm font-bold text-[#e29578]">4/7</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-2 sm:p-3 md:p-4 bg-gradient-to-t from-[#004752] to-transparent">
          <Link
            href="/login"
            className="flex items-center px-3 sm:px-4 py-3 text-sm font-medium rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300 group w-full"
          >
            <LogoutIcon />
            <span className="ml-3">Logout</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 pb-16 md:pb-0">
        {/* --- Premium Top Bar --- */}
        <header className="flex flex-wrap items-center justify-between min-h-16 sm:min-h-20 lg:min-h-24 bg-white/80 backdrop-blur-xl shadow-sm px-4 sm:px-6 border-b border-gray-100/50">
          <div className="flex items-center space-x-2 sm:space-x-6 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 sm:p-3 rounded-xl sm:rounded-2xl text-[#006d77] hover:bg-[#edf6f9] transition-all duration-200 shadow-sm"
            >
              <MenuIcon />
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <h1 className="text-base sm:text-xl lg:text-lg sm:text-xl md:text-2xl truncate font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">
                  {activeTab === 'ai-summary' ? 'AI Academic Summary' : 'Hi, Prathamesh!'} 
                </h1>
                <span className="text-lg sm:text-lg sm:text-xl md:text-2xl">
                  {activeTab === 'ai-summary' ? '🤖' : '🌟'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-2 sm:space-x-3 md:space-x-4">
            {/* Search Bar - Hidden on mobile, shown as icon */}
            <div className="hidden lg:flex items-center bg-gray-50/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-gray-200/50 hover:bg-white/80 transition-all duration-200 min-w-[200px] sm:min-w-[300px]">
              <SearchIcon />
              <input 
                type="text" 
                placeholder="Search courses, assignments..." 
                className="ml-3 bg-transparent outline-none text-xs sm:text-sm text-gray-600 placeholder-gray-400 flex-1"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono bg-gray-200/50 text-gray-500 rounded">
                ⌘K
              </kbd>
            </div>

            {/* Mobile Search Button */}
            <button className="lg:hidden p-2 sm:p-3 rounded-xl sm:rounded-2xl text-gray-500 hover:text-[#006d77] hover:bg-[#edf6f9] transition-all duration-200">
              <SearchIcon />
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <Link href="/announcements">
              <button className="p-2 sm:p-3 rounded-xl sm:rounded-2xl text-gray-500 hover:text-[#006d77] hover:bg-[#edf6f9] transition-all duration-200 relative">
                <BellIcon />
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-5 sm:h-5 bg-[#e29578] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-5 sm:h-5 bg-[#e29578] rounded-full animate-ping opacity-25"></div>
              </button>
              </Link>
            </div>

            {/* User Profile */}
            <Link href="/dashboard/profile">
            <div className="flex items-center space-x-2 sm:space-x-2 sm:space-x-3 md:space-x-4 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 border border-gray-200/50 hover:shadow-md transition-all duration-300">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Prathamesh Sankhe</p>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>Computer Science</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-[#e29578] flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg shadow-lg ring-2 ring-white">
                  P
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 lg:p-4 sm:p-6 md:p-8 overflow-auto">
          {activeTab === 'ai-summary' ? (
            renderAISummary()
          ) : (
            <>
              {/* --- Premium Quick Stats with Timetable Viewer --- */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 sm:p-4 md:p-6 mb-3 sm:mb-3 sm:mb-4 md:mb-6 md:mb-8">
                {[
                  { 
                  title: "Overall Attendance", 
                  value: "92%", 
                  color: "text-[#006d77]", 
                  bgColor: "from-[#006d77]/10 to-[#006d77]/5", 
                  icon: "📊",
                  trend: "up"
                  },
                  { 
                  title: "Courses Enrolled", 
                  value: "5", 
                  color: "text-[#006d77]", 
                  bgColor: "from-[#83c5be]/10 to-[#83c5be]/5", 
                  icon: "📚",
                  trend: "up"
                  },
                  { 
                  title: "Upcoming Deadlines", 
                  value: "12 Days", 
                  color: "text-[#006d77]", 
                  bgColor: "from-[#e29578]/10 to-[#ffddd2]/20", 
                  icon: "📅",
                  trend: "up"
                  },
                ].map((stat, index) => (
                  <div
                  key={index}
                  className={`relative p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-lg sm:rounded-2xl md:rounded-3xl border border-white/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 group overflow-hidden ${
                    index === 2 ? 'col-span-2 lg:col-span-1' : 'col-span-1'
                  }`}
                  >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2 sm:mb-2 sm:mb-3 md:mb-4">
                    <span className="text-xl sm:text-xl sm:text-2xl md:text-3xl transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                    <div className="flex items-center space-x-1">
                     
                    </div>
                    </div>
                    
                    <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">{stat.title}</h3>
                    <p className={`text-xl sm:text-xl sm:text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                  </div>

                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-full -mr-8 sm:-mr-10 -mt-8 sm:-mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full -ml-6 sm:-ml-8 -mb-3 sm:mb-4 md:mb-6 sm:-mb-8"></div>
                  </div>
                ))}
              </div>

              {/* --- Enhanced Main Dashboard Sections --- */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:p-4 md:p-6 sm:gap-2 sm:gap-3 md:gap-4 sm:p-6 md:p-8">
                
                <div className="col-span-1 lg:col-span-2 bg-white/70 backdrop-blur-xl p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-2xl md:rounded-3xl border border-white/50 shadow-xl">
                  <div className="flex items-center justify-between mb-2 sm:mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-5 h-5 text-gray-600" />
                    <h3 className="text-sm sm:text-base font-bold text-gray-800">Today's Lectures</h3>
                  </div>
                  </div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                  <button onClick={goToPreviousDay} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-all duration-200">
                    <PrevIcon />
                  </button>
                  <div className="text-center">
                    <p className="text-sm sm:text-lg font-bold text-gray-800">{format(timetableDate, 'EEE, MMM d')}</p>
                  </div>
                  <button onClick={goToNextDay} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-all duration-200">
                    <NextIcon />
                  </button>
                  </div>
                  <div className="space-y-3 h-48 overflow-y-auto">
                  {lecturesForSelectedDate.length > 0 ? (
                    lecturesForSelectedDate.map((lecture, index) => (
                    <div key={index} className="p-3 bg-gray-50/70 backdrop-blur-sm rounded-xl border border-gray-100">
                      <p className="text-xs font-semibold text-gray-800">{lecture.subject}</p>
                      <p className="text-[10px] text-gray-600">{lecture.room} • {lecture.time}</p>
                    </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                    <p>No lectures today.</p>
                    </div>
                  )}
                  </div>

                  <Link
                  href="/timetable"
                  className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 bg-[#006d77] text-white rounded-xl sm:rounded-2xl font-medium hover:bg-[#004f56] transition-all duration-200"
                  >
                  View Full Timetable
                  </Link>
                </div>
                
                {/* Premium Career Progress */}
                <div className="bg-white/70 backdrop-blur-xl p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-2xl md:rounded-3xl border border-white/50 shadow-xl w-full flex flex-col">
                  <div className="mb-2 sm:mb-3 md:mb-4 sm:mb-8">
                    <h2 className="text-lg sm:text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">Career Prep Progress</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Building your professional future</p>
                  </div>

                  <div className="space-y-3 sm:space-y-6 w-full">
                    {[
                      { label: "Resume Completion", progress: 75, color: "from-[#006d77] to-[#004f56]", bgColor: "bg-[#006d77]/10" },
                      { label: "Mock Interviews", progress: 40, color: "from-[#83c5be] to-[#006d77]", bgColor: "bg-[#83c5be]/10" },
                      { label: "Skills Assessment", progress: 90, color: "from-[#e29578] to-[#83c5be]", bgColor: "bg-[#e29578]/10" },
                    ].map((item, index) => (
                      <div key={index} className={`p-3 sm:p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl ${item.bgColor} border border-white/50 w-full`}>
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <label className="text-sm font-semibold text-gray-700 truncate">{item.label}</label>
                          <span className="text-sm sm:text-lg font-bold text-gray-800">{item.progress}%</span>
                        </div>
                        <div className="relative w-full bg-gray-200/50 rounded-full h-2 sm:h-3 overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${item.color} h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-sm`}
                            style={{ width: `${item.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent pointer-events-none"></div>
                            <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-4 sm:mt-6 p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 bg-gradient-to-r from-[#006d77]/10 to-[#83c5be]/10 rounded-xl sm:rounded-2xl border border-[#83c5be]/20 w-full">
                    <p className="text-sm text-gray-600 mb-3 sm:mb-2 sm:mb-3 md:mb-4 text-center">Ready to boost your career prep?</p>
                    <Link href="/career-resources">
                      <button className="w-full bg-gradient-to-r from-[#006d77] to-[#004f56] text-white py-2 sm:py-3 px-4 rounded-xl sm:rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base">
                        Explore Career Resources
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* --- Mobile Bottom Navigation --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-xl shadow-2xl rounded-t-3xl border-t border-gray-100">
        <div className="flex justify-around items-center h-16 sm:h-20 py-2">
          {bottomNavItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${activeTab === item.tab ? 'text-[#006d77] font-semibold' : 'text-gray-500 hover:text-[#006d77]'}`}
            >
              <item.icon />
              <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden transition-all duration-300"
        />
      )}
    </div>
  );
}
