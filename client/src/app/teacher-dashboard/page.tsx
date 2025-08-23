"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Enhanced color palette with better contrast
const COLORS = {
  primary: '#006d77',
  primaryLight: '#83c5be',
  secondary: '#edf6f9',
  accent: '#ffddd2',
  coral: '#e29578',
  white: '#ffffff',
  gray: '#f8fafc',
  darkGray: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  // Enhanced colors for better visibility
  darkPrimary: '#004952',
  lightCoral: '#f4a385',
  softTeal: '#a8d5d3'
};

// Icon Components (keeping the same)
const TimetableIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AttendanceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AnnouncementsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
  </svg>
);

const CommunityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const QuizzesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TrendingIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

// Keep all the interfaces and static data the same as in your code
interface TeacherClass {
  id: string;
  subject: string;
  className: string;
  time: string;
  room: string;
  day: string;
  studentCount: number;
  type: 'class' | 'lab' | 'exam';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
}

interface Quiz {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  totalQuestions: number;
  duration: number;
  status: 'active' | 'draft' | 'completed';
  submissionCount: number;
}

interface AttendanceRecord {
  classId: string;
  date: string;
  presentCount: number;
  totalStudents: number;
  percentage: number;
}

// Static data (keeping the same)
const TEACHER_CLASSES: TeacherClass[] = [
  {
    id: '1',
    subject: 'Advanced Mathematics',
    className: 'Grade 12-A',
    time: '9:00 AM',
    room: 'Room 101',
    day: 'Monday',
    studentCount: 28,
    type: 'class'
  },
  {
    id: '2',
    subject: 'Physics Lab',
    className: 'Grade 11-B',
    time: '10:30 AM',
    room: 'Physics Lab 2',
    day: 'Monday',
    studentCount: 24,
    type: 'lab'
  },
  {
    id: '3',
    subject: 'Calculus',
    className: 'Grade 12-B',
    time: '1:00 PM',
    room: 'Room 103',
    day: 'Tuesday',
    studentCount: 30,
    type: 'class'
  },
  {
    id: '4',
    subject: 'Physics Exam',
    className: 'Grade 11-A',
    time: '10:30 AM',
    room: 'Exam Hall A',
    day: 'Thursday',
    studentCount: 32,
    type: 'exam'
  }
];

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Parent-Teacher Conference',
    content: 'Scheduled for next Friday from 2:00 PM to 6:00 PM. Please prepare progress reports for all students.',
    date: '2025-08-20',
    priority: 'high',
    isRead: false
  },
  {
    id: '2',
    title: 'New Laboratory Equipment',
    content: 'Advanced microscopes have been installed in Biology Lab 3. Training session on Monday.',
    date: '2025-08-19',
    priority: 'medium',
    isRead: true
  },
  {
    id: '3',
    title: 'Curriculum Update',
    content: 'New mathematics curriculum guidelines are available in the staff portal.',
    date: '2025-08-18',
    priority: 'low',
    isRead: true
  }
];

const QUIZZES: Quiz[] = [
  {
    id: '1',
    title: 'Calculus Fundamentals',
    subject: 'Advanced Mathematics',
    dueDate: '2025-08-25',
    totalQuestions: 15,
    duration: 45,
    status: 'active',
    submissionCount: 18
  },
  {
    id: '2',
    title: 'Newton\'s Laws Practice',
    subject: 'Physics',
    dueDate: '2025-08-27',
    totalQuestions: 20,
    duration: 60,
    status: 'draft',
    submissionCount: 0
  },
  {
    id: '3',
    title: 'Trigonometry Assessment',
    subject: 'Mathematics',
    dueDate: '2025-08-20',
    totalQuestions: 12,
    duration: 30,
    status: 'completed',
    submissionCount: 25
  }
];

const ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { classId: '1', date: '2025-08-22', presentCount: 26, totalStudents: 28, percentage: 92.9 },
  { classId: '1', date: '2025-08-21', presentCount: 27, totalStudents: 28, percentage: 96.4 },
  { classId: '2', date: '2025-08-22', presentCount: 22, totalStudents: 24, percentage: 91.7 },
  { classId: '3', date: '2025-08-22', presentCount: 28, totalStudents: 30, percentage: 93.3 }
];

const AI_SUMMARY_DATA = {
  overallPerformance: {
    attendanceScore: 94.2,
    engagementLevel: "High",
    improvementAreas: ["Late submissions", "Class participation"],
    strengths: ["Consistent attendance", "Strong quiz performance"]
  },
  weeklyInsights: [
    {
      metric: "Student Engagement",
      value: "87%",
      trend: "up",
      insight: "Students are more engaged during interactive sessions"
    },
    {
      metric: "Assignment Quality", 
      value: "B+",
      trend: "stable",
      insight: "Consistent quality with room for creativity improvement"
    },
    {
      metric: "Class Participation",
      value: "72%",
      trend: "down", 
      insight: "Consider more interactive teaching methods"
    }
  ],
  recommendations: [
    "Schedule more hands-on lab sessions to boost engagement",
    "Implement peer review sessions for assignment improvement", 
    "Use gamification elements to encourage participation",
    "Consider smaller group discussions for shy students"
  ],
  upcomingChallenges: [
    "Mid-term preparation starts next week",
    "Parent-teacher conferences require progress reports",
    "New curriculum implementation training needed"
  ]
};


type TabType = 'timetable' | 'attendance' | 'announcements' | 'community' | 'quizzes' | 'ai-summary';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('timetable');
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', priority: 'medium' as const });
  const [newQuiz, setNewQuiz] = useState({ title: '', subject: '', dueDate: '', totalQuestions: '', duration: '' });
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    // setTimeout(() => setIsLoading(false), 800);
    return () => clearInterval(timer);
  }, []);

  const handleClassClick = (classItem: TeacherClass) => {
  // Enhanced routing with query parameters
  const params = new URLSearchParams({
    subject: classItem.subject,
    class: classItem.className,
    room: classItem.room,
    time: classItem.time,
    day: classItem.day,
    studentCount: classItem.studentCount.toString(),
    type: classItem.type
  });
  
  router.push(`/teacher-dashboard/attendance/${classItem.id}?${params.toString()}`);
};


  const getClassTypeStyle = (type: string) => {
    switch (type) {
      case 'class':
        return { backgroundColor: COLORS.primaryLight, icon: '📚' };
      case 'lab':
        return { backgroundColor: COLORS.coral, icon: '🔬' };
      case 'exam':
        return { backgroundColor: COLORS.warning, icon: '📝' };
      default:
        return { backgroundColor: COLORS.primaryLight, icon: '📅' };
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return { backgroundColor: COLORS.coral, color: COLORS.white };
      case 'medium':
        return { backgroundColor: COLORS.warning, color: COLORS.white };
      case 'low':
        return { backgroundColor: COLORS.success, color: COLORS.white };
      default:
        return { backgroundColor: COLORS.primaryLight, color: COLORS.primary };
    }
  };

  const getQuizStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return { backgroundColor: COLORS.success, color: COLORS.white };
      case 'draft':
        return { backgroundColor: COLORS.warning, color: COLORS.white };
      case 'completed':
        return { backgroundColor: COLORS.darkGray, color: COLORS.white };
      default:
        return { backgroundColor: COLORS.primaryLight, color: COLORS.primary };
    }
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US');
  };

  const sidebarItems = [
    { key: 'timetable', icon: TimetableIcon, label: 'Timetable', active: activeTab === 'timetable', count: TEACHER_CLASSES.length },
    // { key: 'attendance', icon: AttendanceIcon, label: 'Attendance', active: activeTab === 'attendance', count: null },
    { key: 'announcements', icon: AnnouncementsIcon, label: 'Announcements', active: activeTab === 'announcements', count: ANNOUNCEMENTS.filter(a => !a.isRead).length },
    { key: 'community', icon: CommunityIcon, label: 'Community', active: activeTab === 'community', count: null },
    { key: 'quizzes', icon: QuizzesIcon, label: 'Quizzes', active: activeTab === 'quizzes', count: QUIZZES.filter(q => q.status === 'active').length },
    { key: 'ai-summary', icon: AIIcon, label: 'AI Summary', active: activeTab === 'ai-summary', count: null },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 sm:p-3 md:p-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#83c5be]/10 to-[#006d77]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#ffddd2]/20 to-[#e29578]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#83c5be]/5 to-[#006d77]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* FIXED: Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ENHANCED: Premium Sidebar with better colors */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-all duration-300 ease-in-out shadow-2xl`}
        style={{ background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.darkPrimary} 100%)` }}
      >
        {/* EduMitra Logo Section */}
        <div className="relative h-16 sm:h-24 flex items-center justify-center border-b border-white/10"
          style={{ background: `linear-gradient(135deg, ${COLORS.primaryLight}20 0%, ${COLORS.coral}20 100%)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#83c5be]/20 to-transparent"></div>
          <div className="relative z-10 group flex items-center space-x-3 hover:scale-105 transition-all duration-300">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)` }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-base sm:text-xl md:text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">EduMitra</span>
          </div>
        </div>

        {/* User Info Card */}
        <div className="m-3 sm:m-4 p-3 sm:p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xlbackdrop-blur-sm border border-white/10"
          style={{ background: `linear-gradient(135deg, ${COLORS.coral}30 0%, ${COLORS.primaryLight}20 100%)` }}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg"
                style={{ backgroundColor: COLORS.coral }}
                    >
                    S
                </div>
              <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2"
                style={{ borderColor: COLORS.primary }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate text-sm sm:text-base">Professor Smith</p>
              <p className="text-xs text-white/70">Mathematics • Department Head</p>
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
                onClick={() => {
                  // if (item.key === 'timetable') {
                  //   router.push('/timetable');
                  if (item.key === 'announcements') {
                    router.push('/announcements');
                  } else if (item.key === 'community') {
                    router.push('/community');
                  // } else if (item.key === 'attendance') {
                  //   router.push('/attendance');
                  // } else if (item.key === 'quizzes') {
                  //   router.push('/quiz-creator');
                  // } else if (item.key === 'ai-summary') {
                  //   router.push('/ai-summary');
                  } else {
                      setActiveTab(item.key as TabType);
                  }
                  setSidebarOpen(false);
                }}
                className={`flex items-center px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xltransition-all duration-300 group relative overflow-hidden w-full ${
                  item.active
                    ? 'shadow-lg transform scale-[1.02]'
                    : 'hover:transform hover:translate-x-1 sm:hover:translate-x-2'
                }`}
                style={{
                  backgroundColor: item.active 
                    ? `linear-gradient(135deg, ${COLORS.coral} 0%, ${COLORS.lightCoral} 100%)`
                    : 'rgba(255, 255, 255, 0.1)',
                  color: item.active ? COLORS.white : 'rgba(255, 255, 255, 0.9)'
                }}
              >
                {item.active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                )}
                <div className="relative z-10 flex items-center w-full">
                  <item.icon />
                  <span className="ml-3 flex-1">{item.label}</span>
                  {item.count && item.count > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      item.active 
                        ? 'text-white'
                        : 'bg-white/20 text-white'
                    }`}
                      style={{ backgroundColor: item.active ? `${COLORS.primary}40` : undefined }}
                    >
                      {item.count}
                    </span>
                  )}
                  {item.active && (
                    <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* Quick Stats Mini */}
        <div className="hidden sm:block m-4 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xlbackdrop-blur-sm border border-white/10"
          style={{ background: `linear-gradient(135deg, ${COLORS.primaryLight}20 0%, ${COLORS.coral}20 100%)` }}
        >
          <h3 className="text-sm font-semibold text-white/90 mb-3">Today's Focus</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/70">Attendance Rate</span>
              <span className="text-sm font-bold" style={{ color: COLORS.accent }}>94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/70">Classes Today</span>
              <span className="text-sm font-bold" style={{ color: COLORS.coral }}>4</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-2 sm:p-3 md:p-4"
          style={{ background: `linear-gradient(to top, ${COLORS.darkPrimary} 0%, transparent 100%)` }}
        >
          <button className="flex items-center px-3 sm:px-4 py-3 text-sm font-medium rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlhover:bg-white/10 transition-all duration-300 group w-full">
            <LogoutIcon />
            <span className="ml-3 text-white/90">Logout</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* FIXED: Premium Top Bar with proper mobile sizing */}
        <header className="flex flex-wrap items-center justify-between bg-white/90 backdrop-blur-xl shadow-sm px-3 sm:px-6 border-b border-gray-100/50"
          style={{ minHeight: '4rem' }} // Fixed height instead of responsive
        >
          <div className="flex items-center space-x-2 sm:space-x-6 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-[#006d77] hover:bg-[#edf6f9] transition-all duration-200 shadow-sm"
            >
              <MenuIcon />
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <h1 className="text-sm sm:text-xl lg:text-lg sm:text-xl md:text-2xl truncate font-bold"
                  style={{ 
                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Hi, Professor! 
                </h1>
                <span className="text-base sm:text-lg sm:text-xl md:text-2xl">👩‍🏫</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1 flex flex-wrap items-center gap-1 sm:gap-2 sm:p-3 md:p-4">
                <span className="hidden sm:inline text-xs"
                  style={{ color: COLORS.primary }}
                >
                  Ready to inspire minds today?
                </span>
                {mounted && (
                  <>
                    <span className="flex items-center text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: `${COLORS.primaryLight}20`, color: COLORS.primary }}
                    >
                      <CalendarIcon />
                      <span className="ml-1">{formatDate(currentTime)}</span>
                    </span>
                    <span className="flex items-center text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: `${COLORS.primary}20`, color: COLORS.primary }}
                    >
                      <span>{formatTime(currentTime)}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-2 sm:space-x-3 md:space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 sm:p-3 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xltext-gray-500 hover:text-[#006d77] hover:bg-[#edf6f9] transition-all duration-200 relative">
                <BellIcon />
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: COLORS.coral }}
                >
                  <span className="text-xs text-white font-bold">{ANNOUNCEMENTS.filter(a => !a.isRead).length}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full animate-ping opacity-25"
                  style={{ backgroundColor: COLORS.coral }}
                ></div>
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 sm:space-x-2 sm:space-x-3 md:space-x-4 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlp-2 border border-gray-200/50 hover:shadow-md transition-all duration-300">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Professor Smith</p>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>Mathematics Dept</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg shadow-lg ring-2 ring-white"
                    style={{ backgroundColor: COLORS.coral }}
                    >
                    S
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 lg:p-4 sm:p-6 md:p-8 overflow-auto">
          {/* ENHANCED: Premium Quick Stats with better colors */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 sm:p-4 md:p-6 mb-3 sm:mb-3 sm:mb-4 md:mb-6 md:mb-8">
            {[
              { 
                title: "Overall Attendance", 
                value: "94.2%", 
                change: "+2.1%",
                bgGradient: `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.primaryLight}10 100%)`, 
                icon: "📊",
                iconBg: COLORS.primary,
                trend: "up"
              },
              { 
                title: "Active Quizzes", 
                value: QUIZZES.filter(q => q.status === 'active').length.toString(), 
                change: "2 pending",
                bgGradient: `linear-gradient(135deg, ${COLORS.coral}15 0%, ${COLORS.accent}10 100%)`, 
                icon: "📝",
                iconBg: COLORS.coral,
                trend: "neutral"
              },
              { 
                title: "Total Classes", 
                value: TEACHER_CLASSES.length.toString(), 
                change: "This semester",
                bgGradient: `linear-gradient(135deg, ${COLORS.primaryLight}15 0%, ${COLORS.softTeal}10 100%)`, 
                icon: "📚",
                iconBg: COLORS.primaryLight,
                trend: "up"
              },
              { 
                title: "New Announcements", 
                value: ANNOUNCEMENTS.filter(a => !a.isRead).length.toString(), 
                change: "Unread",
                bgGradient: `linear-gradient(135deg, ${COLORS.warning}15 0%, ${COLORS.accent}15 100%)`, 
                icon: "📢",
                iconBg: COLORS.warning,
                trend: "up"
              },
            ].map((stat, index) => (
              <div key={index} className="relative p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-lg sm:rounded-xl md:rounded-2xlmd:rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 group overflow-hidden"
                style={{ background: stat.bgGradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2 sm:mb-2 sm:mb-3 md:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${stat.iconBg}20` }}
                    >
                      <span className="text-lg sm:text-lg sm:text-xl md:text-2xl">{stat.icon}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {stat.trend === 'up' && (
                        <div className="flex items-center text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${COLORS.success}20`, color: COLORS.success }}
                        >
                          <TrendingIcon />
                          <span className="ml-1 hidden sm:inline">{stat.change}</span>
                        </div>
                      )}
                      {stat.trend === 'neutral' && (
                        <span className="text-xs px-2 py-1 rounded-full hidden sm:inline"
                          style={{ backgroundColor: `${COLORS.warning}20`, color: COLORS.warning }}
                        >
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    style={{ color: COLORS.darkGray }}
                  >
                    {stat.title}
                  </h3>
                  <p className="text-xl sm:text-xl sm:text-2xl md:text-3xl font-bold mb-1"
                    style={{ color: stat.iconBg }}
                  >
                    {stat.value}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-full -mr-8 sm:-mr-10 -mt-8 sm:-mt-10"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full -ml-6 sm:-ml-8 -mb-3 sm:mb-4 md:mb-6 sm:-mb-8"></div>
              </div>
            ))}
          </div>

          {/* ENHANCED: Main Content Area with better styling */}
          <div className="rounded-lg sm:rounded-lg sm:rounded-xl md:rounded-2xlmd:rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/50 shadow-xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${COLORS.white}90 0%, ${COLORS.secondary}50 100%)` }}
          >
            <div className="p-3 sm:p-3 sm:p-4 md:p-6 md:p-4 sm:p-6 md:p-8">
              {/* Tab content remains the same structure but with enhanced styling */}
              {activeTab === 'timetable' && (
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-3 sm:mb-4 md:mb-6 md:mb-8 gap-2 sm:p-3 md:p-4 sm:gap-0">
                    <div>
                      <h2 className="text-base sm:text-xl md:text-lg sm:text-xl md:text-2xl font-bold mb-2"
                        style={{ color: COLORS.primary }}
                      >
                        📚 Your Classes
                      </h2>
                      <p className="text-sm"
                        style={{ color: COLORS.darkGray }}
                      >
                        Manage your teaching schedule
                      </p>
                    </div>
                    <div className="text-sm px-4 py-2 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlfont-medium text-white shadow-lg"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      {TEACHER_CLASSES.length} Classes
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-2 sm:space-y-3 md:space-y-4">
                    {TEACHER_CLASSES.map((classItem) => {
                      const typeStyle = getClassTypeStyle(classItem.type);
                      return (
                        <div
                          key={classItem.id}
                          onClick={() => handleClassClick(classItem)}
                          className="group relative p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlborder border-gray-100/50 hover:shadow-lg transition-all duration-300 hover:border-[#83c5be]/30 overflow-hidden cursor-pointer"
                          style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.secondary}30 100%)` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#83c5be]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                                style={{ backgroundColor: `${typeStyle.backgroundColor}30` }}
                              >
                                <span className="text-xl">{typeStyle.icon}</span>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-sm font-bold px-3 py-1 rounded-full"
                                    style={{ 
                                      backgroundColor: `${COLORS.primary}15`,
                                      color: COLORS.primary 
                                    }}
                                  >
                                    {classItem.time} • {classItem.day}
                                  </div>
                                  <div className="text-xs font-medium px-2 py-1 rounded-full"
                                    style={{ 
                                      backgroundColor: `${typeStyle.backgroundColor}30`,
                                      color: typeStyle.backgroundColor
                                    }}
                                  >
                                    {classItem.type.toUpperCase()}
                                  </div>
                                </div>
                                
                                <div className="font-bold text-lg mb-2"
                                  style={{ color: COLORS.primary }}
                                >
                                  {classItem.subject}
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-sm">
                                    <span style={{ color: COLORS.darkGray }}>👥 {classItem.className}</span>
                                    <span style={{ color: COLORS.darkGray }}>📍 {classItem.room}</span>
                                  </div>
                                  <span className="px-2 py-1 rounded-full text-xs font-medium"
                                    style={{ backgroundColor: `${COLORS.success}20`, color: COLORS.success }}
                                  >
                                    {classItem.studentCount} students
                                  </span>
                                </div>
                              </div>

                              <div className="text-right">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                  style={{ color: COLORS.darkGray }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Continue with other tabs... */}
              {activeTab === 'attendance' && (
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-3 sm:mb-4 md:mb-6 md:mb-8 gap-2 sm:p-3 md:p-4 sm:gap-0">
                    <div>
                      <h2 className="text-base sm:text-xl md:text-lg sm:text-xl md:text-2xl font-bold mb-2"
                        style={{ color: COLORS.primary }}
                      >
                        ✅ Attendance Overview
                      </h2>
                      <p className="text-sm"
                        style={{ color: COLORS.darkGray }}
                      >
                        Monitor student attendance across all classes
                      </p>
                    </div>
                  </div>

                  <div className="p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlborder border-gray-100/50 mb-3 sm:mb-4 md:mb-6"
                    style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.secondary}30 100%)` }}
                  >
                    <h3 className="font-bold text-lg mb-2 sm:mb-3 md:mb-4"
                      style={{ color: COLORS.primary }}
                    >
                      📊 Today's Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:p-3 md:p-4">
                      <div className="text-center">
                        <div className="text-lg sm:text-xl md:text-2xl font-black"
                          style={{ color: COLORS.success }}
                        >
                          94.2%
                        </div>
                        <div className="text-sm font-medium"
                          style={{ color: COLORS.darkGray }}
                        >
                          Average Attendance
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-xl md:text-2xl font-black"
                          style={{ color: COLORS.coral }}
                        >
                          76/81
                        </div>
                        <div className="text-sm font-medium"
                          style={{ color: COLORS.darkGray }}
                        >
                          Present Students
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-2 sm:space-y-3 md:space-y-4">
                    {ATTENDANCE_RECORDS.map((record) => {
                      const classItem = TEACHER_CLASSES.find(c => c.id === record.classId);
                      return (
                        <div
                          key={`${record.classId}-${record.date}`}
                          className="p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlborder border-gray-100/50 hover:shadow-lg transition-all duration-300"
                          style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.secondary}30 100%)` }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-lg"
                                style={{ color: COLORS.primary }}
                              >
                                {classItem?.subject}
                              </h3>
                              <p className="text-sm font-medium"
                                style={{ color: COLORS.darkGray }}
                              >
                                {classItem?.className} • {record.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-black"
                                style={{ 
                                  color: record.percentage >= 90 ? COLORS.success : 
                                         record.percentage >= 80 ? COLORS.warning : COLORS.coral
                                }}
                              >
                                {record.percentage.toFixed(1)}%
                              </div>
                              <div className="text-sm font-medium"
                                style={{ color: COLORS.darkGray }}
                              >
                                {record.presentCount}/{record.totalStudents}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Continue with announcements, community, and quizzes tabs using similar enhanced styling patterns */}
              {activeTab === 'announcements' && (
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-3 sm:mb-4 md:mb-6 md:mb-8 gap-2 sm:p-3 md:p-4 sm:gap-0">
                    <div>
                      <h2 className="text-base sm:text-xl md:text-lg sm:text-xl md:text-2xl font-bold mb-2"
                        style={{ color: COLORS.primary }}
                      >
                        📢 Announcements
                      </h2>
                      <p className="text-sm"
                        style={{ color: COLORS.darkGray }}
                      >
                        Manage important school announcements
                      </p>
                    </div>
                    {/* <button
                      onClick={() => setShowAddAnnouncement(true)}
                      className="px-4 py-2 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlfont-medium text-white hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      + Add New
                    </button> */}
                    <Link href="/announcements">
                    <button
                   
                    className="px-4 py-2 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xl font-medium text-white hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    + Add New
                  </button>
                  </Link>
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-2 sm:space-y-3 md:space-y-4">
                    {ANNOUNCEMENTS.map((announcement) => {
                      const priorityStyle = getPriorityStyle(announcement.priority);
                      return (
                        <div
                          key={announcement.id}
                          className={`group relative p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlborder border-gray-100/50 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                            !announcement.isRead ? 'border-l-4' : ''
                          }`}
                          style={{ 
                            background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.secondary}30 100%)`,
                            borderLeftColor: !announcement.isRead ? COLORS.coral : undefined
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `linear-gradient(135deg, ${COLORS.primaryLight}10 0%, transparent 100%)` }}
                          ></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-bold text-lg"
                                  style={{ color: COLORS.primary }}
                                >
                                  {announcement.title}
                                </h3>
                                {!announcement.isRead && (
                                  <div className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: COLORS.coral }}
                                  ></div>
                                )}
                              </div>
                              <span className="text-xs font-bold px-2 py-1 rounded-full"
                                style={priorityStyle}
                              >
                                {announcement.priority.toUpperCase()}
                              </span>
                            </div>
                            
                            <p className="text-sm leading-relaxed mb-3"
                              style={{ color: COLORS.darkGray }}
                            >
                              {announcement.content}
                            </p>
                            
                            <div className="text-xs font-medium"
                              style={{ color: COLORS.darkGray }}
                            >
                              📅 {new Date(announcement.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'community' && (
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-3 sm:mb-4 md:mb-6 md:mb-8 gap-2 sm:p-3 md:p-4 sm:gap-0">
                    <div>
                      <h2 className="text-base sm:text-xl md:text-lg sm:text-xl md:text-2xl font-bold mb-2"
                        style={{ color: COLORS.primary }}
                      >
                        👥 Join Community
                      </h2>
                      <p className="text-sm"
                        style={{ color: COLORS.darkGray }}
                      >
                        Connect with fellow educators
                      </p>
                    </div>
                  </div>

                  <div className="p-3 sm:p-3 sm:p-4 md:p-6 md:p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlborder border-gray-100/50 text-center"
                    style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.secondary}30 100%)` }}
                  >
                    <div className="text-4xl mb-2 sm:mb-3 md:mb-4">🌟</div>
                    <h3 className="text-xl font-bold mb-3"
                      style={{ color: COLORS.primary }}
                    >
                      Connect with Fellow Educators
                    </h3>
                    <p className="text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6"
                      style={{ color: COLORS.darkGray }}
                    >
                      Join our vibrant community of educators to share resources, discuss teaching strategies, and collaborate on educational initiatives.
                    </p>
                    
                    <div className="space-y-3 mb-3 sm:mb-4 md:mb-6">
                      {[
                        { icon: '💬', text: 'Discussion Forums' },
                        { icon: '📚', text: 'Resource Sharing' },
                        { icon: '🎯', text: 'Professional Development' },
                        { icon: '🤝', text: 'Peer Collaboration' }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 text-left">
                          <span className="text-xl">{feature.icon}</span>
                          <span className="font-medium"
                            style={{ color: COLORS.darkGray }}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full py-4 px-4 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlfont-semibold text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
                      style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.darkPrimary} 100%)` }}
                    >
                      🚀 Join Community
                    </button>
                  </div>
                </div>
              )}

            {activeTab === 'ai-summary' && (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2 sm:gap-0">
      <div>
        <h2 className="text-base sm:text-xl md:text-2xl font-bold mb-2"
          style={{ color: COLORS.primary }}
        >
          🤖 AI Summary & Insights
        </h2>
        <p className="text-sm"
          style={{ color: COLORS.darkGray }}
        >
          AI-powered analysis of your teaching performance
        </p>
      </div>
      <div className="text-sm px-4 py-2 rounded-xl font-medium text-white shadow-lg"
        style={{ backgroundColor: COLORS.primary }}
      >
        Last Updated: Today
      </div>
    </div>

    {/* Overall Performance Card */}
    <div className="p-6 rounded-2xl border border-gray-100/50 mb-6"
      style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.secondary}30 100%)` }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: `${COLORS.primary}20` }}
        >
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-bold"
          style={{ color: COLORS.primary }}
        >
          Overall Performance
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="text-center p-4 rounded-xl"
          style={{ backgroundColor: `${COLORS.success}10` }}
        >
          <div className="text-2xl font-black mb-1"
            style={{ color: COLORS.success }}
          >
            {AI_SUMMARY_DATA.overallPerformance.attendanceScore}%
          </div>
          <div className="text-sm font-medium"
            style={{ color: COLORS.darkGray }}
          >
            Attendance Score
          </div>
        </div>
        <div className="text-center p-4 rounded-xl"
          style={{ backgroundColor: `${COLORS.coral}10` }}
        >
          <div className="text-2xl font-black mb-1"
            style={{ color: COLORS.coral }}
          >
            {AI_SUMMARY_DATA.overallPerformance.engagementLevel}
          </div>
          <div className="text-sm font-medium"
            style={{ color: COLORS.darkGray }}
          >
            Engagement Level
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-sm mb-2" style={{ color: COLORS.primary }}>✨ Strengths</h4>
          <div className="space-y-1">
            {AI_SUMMARY_DATA.overallPerformance.strengths.map((strength, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.success }}></div>
                <span style={{ color: COLORS.darkGray }}>{strength}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-2" style={{ color: COLORS.primary }}>🎯 Focus Areas</h4>
          <div className="space-y-1">
            {AI_SUMMARY_DATA.overallPerformance.improvementAreas.map((area, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.coral }}></div>
                <span style={{ color: COLORS.darkGray }}>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Weekly Insights */}
    <div className="p-6 rounded-2xl border border-gray-100/50 mb-6"
      style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.secondary}30 100%)` }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: `${COLORS.primaryLight}20` }}
        >
          <span className="text-2xl">📈</span>
        </div>
        <h3 className="text-lg font-bold"
          style={{ color: COLORS.primary }}
        >
          Weekly Insights
        </h3>
      </div>

      <div className="space-y-4">
        {AI_SUMMARY_DATA.weeklyInsights.map((insight, index) => (
          <div key={index} className="p-4 rounded-xl border border-gray-100/50"
            style={{ backgroundColor: COLORS.white }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm" style={{ color: COLORS.primary }}>
                {insight.metric}
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-bold" style={{ color: COLORS.coral }}>
                  {insight.value}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  insight.trend === 'up' ? `text-${COLORS.success}` : 
                  insight.trend === 'down' ? `text-${COLORS.coral}` : `text-${COLORS.warning}`
                }`}>
                  {insight.trend === 'up' ? '↗️' : insight.trend === 'down' ? '↘️' : '→'}
                </span>
              </div>
            </div>
            <p className="text-sm" style={{ color: COLORS.darkGray }}>
              {insight.insight}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Recommendations */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* AI Recommendations */}
      <div className="p-6 rounded-2xl border border-gray-100/50"
        style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.accent}20 100%)` }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">💡</span>
          <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
            Recommendations
          </h3>
        </div>
        <div className="space-y-3">
          {AI_SUMMARY_DATA.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-xl"
              style={{ backgroundColor: COLORS.white }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: COLORS.coral }}
              >
                {index + 1}
              </div>
              <span className="text-sm" style={{ color: COLORS.darkGray }}>
                {rec}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Challenges */}
      <div className="p-6 rounded-2xl border border-gray-100/50"
        style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.primaryLight}20 100%)` }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">⚠️</span>
          <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
            Upcoming Challenges
          </h3>
        </div>
        <div className="space-y-3">
          {AI_SUMMARY_DATA.upcomingChallenges.map((challenge, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-xl"
              style={{ backgroundColor: COLORS.white }}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                style={{ backgroundColor: COLORS.warning }}
              ></div>
              <span className="text-sm" style={{ color: COLORS.darkGray }}>
                {challenge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}


              {activeTab === 'quizzes' && (
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-3 sm:mb-4 md:mb-6 md:mb-8 gap-2 sm:p-3 md:p-4 sm:gap-0">
                    <div>
                      <h2 className="text-base sm:text-xl md:text-lg sm:text-xl md:text-2xl font-bold mb-2"
                        style={{ color: COLORS.primary }}
                      >
                        📝 Quiz Management
                      </h2>
                      <p className="text-sm"
                        style={{ color: COLORS.darkGray }}
                      >
                        Create and manage student assessments
                      </p>
                    </div>
                    <button
                      onClick={() => router.push('/quiz-creator')}
                      className="px-4 py-2 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlfont-medium text-white hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      + New Quiz
                    </button>
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-2 sm:space-y-3 md:space-y-4">
                    {/* {QUIZZES.map((quiz) => {
                      const statusStyle = getQuizStatusStyle(quiz.status);
                      return (
                        <div
                          key={quiz.id}
                          className="group relative p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlborder border-gray-100/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
                          style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.secondary}30 100%)` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `linear-gradient(135deg, ${COLORS.primaryLight}10 0%, transparent 100%)` }}
                          ></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-lg mb-1"
                                  style={{ color: COLORS.primary }}
                                >
                                  {quiz.title}
                                </h3>
                                <p className="text-sm font-medium"
                                  style={{ color: COLORS.darkGray }}
                                >
                                  {quiz.subject}
                                </p>
                              </div>
                              <span className="text-xs font-bold px-3 py-1 rounded-full"
                                style={statusStyle}
                              >
                                {quiz.status.toUpperCase()}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4">
                              <div>
                                <div className="text-lg font-black"
                                  style={{ color: COLORS.coral }}
                                >
                                  {quiz.totalQuestions}
                                </div>
                                <div className="text-xs font-medium"
                                  style={{ color: COLORS.darkGray }}
                                >
                                  Questions
                                </div>
                              </div>
                              <div>
                                <div className="text-lg font-black"
                                  style={{ color: COLORS.success }}
                                >
                                  {quiz.duration}m
                                </div>
                                <div className="text-xs font-medium"
                                  style={{ color: COLORS.darkGray }}
                                >
                                  Duration
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium"
                                style={{ color: COLORS.darkGray }}
                              >
                                📅 Due: {new Date(quiz.dueDate).toLocaleDateString()}
                              </span>
                              {quiz.status === 'active' && (
                                <span className="text-sm px-2 py-1 rounded-full font-medium"
                                  style={{ backgroundColor: `${COLORS.success}20`, color: COLORS.success }}
                                >
                                  {quiz.submissionCount} submissions
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })} */}

                    {QUIZZES.map((quiz) => {
  const statusStyle = getQuizStatusStyle(quiz.status);
  return (
    <div
      key={quiz.id}
      onClick={() => router.push(`/quiz`)}
      className="group relative p-2 sm:p-2 sm:p-3 md:p-4 md:p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xlborder border-gray-100/50 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
      style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.secondary}30 100%)` }}
    >
      {/* Keep all your existing quiz card content exactly the same */}
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${COLORS.primaryLight}10 0%, transparent 100%)` }}
      ></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg mb-1"
              style={{ color: COLORS.primary }}
            >
              {quiz.title}
            </h3>
            <p className="text-sm font-medium"
              style={{ color: COLORS.darkGray }}
            >
              {quiz.subject}
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full"
            style={statusStyle}
          >
            {quiz.status.toUpperCase()}
          </span>
        </div>
        
        {/* Rest of your existing quiz card content */}
        <div className="grid grid-cols-2 gap-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4">
          <div>
            <div className="text-lg font-black"
              style={{ color: COLORS.coral }}
            >
              {quiz.totalQuestions}
            </div>
            <div className="text-xs font-medium"
              style={{ color: COLORS.darkGray }}
            >
              Questions
            </div>
          </div>
          <div>
            <div className="text-lg font-black"
              style={{ color: COLORS.success }}
            >
              {quiz.duration}m
            </div>
            <div className="text-xs font-medium"
              style={{ color: COLORS.darkGray }}
            >
              Duration
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium"
            style={{ color: COLORS.darkGray }}
          >
            📅 Due: {new Date(quiz.dueDate).toLocaleDateString()}
          </span>
          {quiz.status === 'active' && (
            <span className="text-sm px-2 py-1 rounded-full font-medium"
              style={{ backgroundColor: `${COLORS.success}20`, color: COLORS.success }}
            >
              {quiz.submissionCount} submissions
            </span>
          )}
        </div>
      </div>
    </div>
  );
})}

                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* FIXED: Modals with proper z-index and backdrop */}
      {/* Add Announcement Modal */}
      {showAddAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="w-full max-w-md rounded-lg sm:rounded-xl md:rounded-2xlp-3 sm:p-4 md:p-6 shadow-2xl border border-gray-200/50"
            style={{ backgroundColor: COLORS.white }}
          >
            <h3 className="text-xl font-bold mb-2 sm:mb-3 md:mb-4"
              style={{ color: COLORS.primary }}
            >
              📢 New Announcement
            </h3>
            
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <input
                type="text"
                placeholder="Announcement title..."
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                className="w-full p-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: COLORS.primaryLight, 
                  color: COLORS.primary,
                }}
              />
              
              <textarea
                placeholder="Announcement content..."
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                rows={4}
                className="w-full p-3 rounded-xl border-2 font-medium resize-none focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: COLORS.primaryLight, 
                  color: COLORS.primary,
                }}
              />
              
              <select
                value={newAnnouncement.priority}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as any})}
                className="w-full p-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: COLORS.primaryLight, 
                  color: COLORS.primary,
                }}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddAnnouncement(false)}
                className="flex-1 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 border-2"
                style={{ 
                  borderColor: COLORS.primaryLight,
                  color: COLORS.primary,
                  backgroundColor: 'transparent'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddAnnouncement(false);
                  setNewAnnouncement({ title: '', content: '', priority: 'medium' });
                }}
                className="flex-1 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 text-white"
                style={{ backgroundColor: COLORS.coral }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Quiz Modal */}
      {showAddQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="w-full max-w-md rounded-lg sm:rounded-xl md:rounded-2xlp-3 sm:p-4 md:p-6 shadow-2xl border border-gray-200/50"
            style={{ backgroundColor: COLORS.white }}
          >
            <h3 className="text-xl font-bold mb-2 sm:mb-3 md:mb-4"
              style={{ color: COLORS.primary }}
            >
              📝 Create New Quiz
            </h3>
            
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <input
                type="text"
                placeholder="Quiz title..."
                value={newQuiz.title}
                onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                className="w-full p-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: COLORS.primaryLight, 
                  color: COLORS.primary,
                }}
              />
              
              <input
                type="text"
                placeholder="Subject..."
                value={newQuiz.subject}
                onChange={(e) => setNewQuiz({...newQuiz, subject: e.target.value})}
                className="w-full p-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: COLORS.primaryLight, 
                  color: COLORS.primary,
                }}
              />
              
              <input
                type="date"
                placeholder="Due date..."
                value={newQuiz.dueDate}
                onChange={(e) => setNewQuiz({...newQuiz, dueDate: e.target.value})}
                className="w-full p-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: COLORS.primaryLight, 
                  color: COLORS.primary,
                }}
              />
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Questions"
                  value={newQuiz.totalQuestions}
                  onChange={(e) => setNewQuiz({...newQuiz, totalQuestions: e.target.value})}
                  className="w-full p-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: COLORS.primaryLight, 
                    color: COLORS.primary,
                  }}
                />
                <input
                  type="number"
                  placeholder="Duration (min)"
                  value={newQuiz.duration}
                  onChange={(e) => setNewQuiz({...newQuiz, duration: e.target.value})}
                  className="w-full p-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: COLORS.primaryLight, 
                    color: COLORS.primary,
                  }}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddQuiz(false)}
                className="flex-1 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 border-2"
                style={{ 
                  borderColor: COLORS.primaryLight,
                  color: COLORS.primary,
                  backgroundColor: 'transparent'
                }}
              >
                Cancel
              </button>
              {/* <button
                onClick={() => {
                  setShowAddQuiz(false);
                  setNewQuiz({ title: '', subject: '', dueDate: '', totalQuestions: '', duration: '' });
                }}
                className="flex-1 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 text-white"
                style={{ backgroundColor: COLORS.coral }}
              >
                Create
              </button> */}
              <button
                onClick={() => {
                  // Redirect to quiz creator instead of showing modal
                  router.push('/quiz-creator');
                }}
                className="px-4 py-2 rounded-xl sm:rounded-lg sm:rounded-xl md:rounded-2xl font-medium text-white hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                style={{ backgroundColor: COLORS.primary }}
              >
                + New Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

