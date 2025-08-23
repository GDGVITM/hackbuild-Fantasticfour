"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, 
  User, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Activity,
  Bell,
  Star,
  Zap,
  Menu,
  X,
  ChevronRight,
  Brain // New AI icon
} from 'lucide-react';

// Color scheme constants
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
};

// --- AI Summary Data Structure ---
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
      insight: "Your child is spending more time studying - great progress!"
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
      insight: "Quiz scores are improving - excellent momentum!"
    },
    {
      metric: "Participation Rate",
      value: "68%",
      trend: "down",
      insight: "Consider encouraging more active class participation"
    }
  ],
  recommendations: [
    "Help establish a structured study schedule at home",
    "Encourage joining study groups for challenging subjects", 
    "Support use of active learning techniques like flashcards",
    "Facilitate regular communication with teachers",
    "Consider stress management techniques for test preparation"
  ],
  upcomingChallenges: [
    "Midterm exams in Mathematics and Physics next week",
    "Research project proposal due in 10 days",
    "Group presentation scheduled for next Friday",
    "Parent-teacher conferences approaching"
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

interface StudentProgress {
  id: string;
  name: string;
  grade: string;
  subjects: {
    name: string;
    progress: number;
    grade: string;
    lastActivity: string;
  }[];
  recentActivities: {
    type: string;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'overdue';
  }[];
  upcomingDeadlines: {
    title: string;
    subject: string;
    date: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  achievements: {
    title: string;
    description: string;
    date: string;
    icon: string;
  }[];
  weeklyStats: {
    studyHours: number;
    assignmentsCompleted: number;
    averageGrade: number;
    attendanceRate: number;
  };
}

type TabType = 'overview' | 'subjects' | 'activities' | 'progress' | 'ai-summary';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

// Animated Progress Bar Component
const AnimatedProgressBar = ({ progress, color, delay = 0 }: { progress: number; color: string; delay?: number }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, delay);
    return () => clearTimeout(timer);
  }, [progress, delay]);

  return (
    <div className="w-full rounded-full h-2 sm:h-3 overflow-hidden" style={{ backgroundColor: `${COLORS.primaryLight}20` }}>
      <div 
        className="h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out"
        style={{ 
          width: `${animatedProgress}%`,
          backgroundColor: color,
        }}
      >
      </div>
    </div>
  );
};

// --- Trend Icon Component ---
const TrendIcon = ({ trend }: { trend: string }) => (
  <div className={`flex items-center space-x-1 text-xs ${
    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
  }`}>
    {trend === 'up' && <TrendingUp className="w-3 h-3" />}
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

// Mock data
const mockStudentData: StudentProgress = {
  id: "1",
  name: "Prathamesh Sankhe", 
  grade: "Grade 10",
  subjects: [
    { name: "Mathematics", progress: 85, grade: "A", lastActivity: "2 hours ago" },
    { name: "Physics", progress: 78, grade: "B+", lastActivity: "1 day ago" },
    { name: "Chemistry", progress: 92, grade: "A+", lastActivity: "3 hours ago" },
    { name: "Computer Science", progress: 95, grade: "A+", lastActivity: "30 mins ago" },
    { name: "English", progress: 82, grade: "B+", lastActivity: "2 days ago" },
    { name: "History", progress: 75, grade: "B", lastActivity: "1 day ago" }
  ],
  recentActivities: [
    {
      type: "Assignment",
      description: "Completed Physics Lab Report - Wave Motion", 
      date: "2 hours ago",
      status: "completed"
    },
    {
      type: "Mock Interview",
      description: "Practiced technical interview questions",
      date: "1 day ago", 
      status: "completed"
    },
    {
      type: "Quiz",
      description: "Mathematics - Calculus Quiz",
      date: "2 days ago",
      status: "completed"
    },
    {
      type: "Assignment",
      description: "English Essay - Climate Change Impact",
      date: "3 days ago",
      status: "pending"
    }
  ],
  upcomingDeadlines: [
    {
      title: "Chemistry Project - Organic Compounds",
      subject: "Chemistry",
      date: "2024-08-25",
      priority: "high"
    },
    {
      title: "History Research Paper",
      subject: "History",
      date: "2024-08-28", 
      priority: "medium"
    },
    {
      title: "Math Problem Set - Chapter 15",
      subject: "Mathematics",
      date: "2024-08-30",
      priority: "low"
    }
  ],
  achievements: [
    {
      title: "Perfect Attendance",
      description: "100% attendance for the month",
      date: "August 2024",
      icon: "🏆"
    },
    {
      title: "Top Performer", 
      description: "Highest score in Computer Science class",
      date: "August 2024",
      icon: "⭐"
    },
    {
      title: "Interview Master",
      description: "Completed 10 mock interviews",
      date: "August 2024",
      icon: "💬"
    }
  ],
  weeklyStats: {
    studyHours: 28,
    assignmentsCompleted: 12,
    averageGrade: 87,
    attendanceRate: 100
  }
};

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedStudent] = useState(mockStudentData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return COLORS.primary;
    if (progress >= 80) return COLORS.primaryLight;
    if (progress >= 70) return COLORS.coral;
    return COLORS.accent;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return COLORS.coral;
      case 'medium': return COLORS.accent;
      case 'low': return COLORS.primaryLight;
      default: return COLORS.primaryLight;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" style={{ color: COLORS.primary }} />;
      case 'pending': return <Clock className="w-4 h-4" style={{ color: COLORS.coral }} />;
      case 'overdue': return <AlertCircle className="w-4 h-4" style={{ color: COLORS.coral }} />;
      default: return <Clock className="w-4 h-4" style={{ color: COLORS.coral }} />;
    }
  };

  const sidebarItems = [
    { key: 'overview', icon: BarChart3, label: 'Overview', active: activeTab === 'overview' },
    { key: 'subjects', icon: BookOpen, label: 'Subjects', active: activeTab === 'subjects' },
    { key: 'activities', icon: Activity, label: 'Activities', active: activeTab === 'activities' },
    { key: 'progress', icon: TrendingUp, label: 'Progress', active: activeTab === 'progress' },
    { key: 'ai-summary', icon: Brain, label: 'AI Summary', active: activeTab === 'ai-summary' },
  ];

  // --- AI Summary Content ---
  const renderAISummary = () => (
    <div className="space-y-6">
      {/* Overall Performance Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#83c5be]/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006d77] to-[#83c5be] flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#006d77]">AI Academic Analysis</h2>
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {AI_SUMMARY_DATA.overallPerformance.academicStanding}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-[#006d77]/10 to-[#006d77]/5 rounded-2xl">
            <p className="text-2xl font-bold text-[#006d77]">{AI_SUMMARY_DATA.overallPerformance.gpa}</p>
            <p className="text-sm text-gray-600">Current GPA</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-[#83c5be]/10 to-[#83c5be]/5 rounded-2xl">
            <p className="text-2xl font-bold text-[#006d77]">{AI_SUMMARY_DATA.overallPerformance.attendanceRate}%</p>
            <p className="text-sm text-gray-600">Attendance Rate</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-[#e29578]/10 to-[#ffddd2]/20 rounded-2xl">
            <p className="text-2xl font-bold text-[#006d77]">{AI_SUMMARY_DATA.goalTracking.length}</p>
            <p className="text-sm text-gray-600">Active Goals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-[#006d77] mb-3 flex items-center">
              <span className="mr-2">💪</span>
              Strengths
            </h3>
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
            <h3 className="font-semibold text-[#006d77] mb-3 flex items-center">
              <span className="mr-2">🎯</span>
              Areas for Improvement
            </h3>
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
      <div className="bg-white rounded-2xl shadow-sm border border-[#83c5be]/20 p-6">
        <h3 className="text-lg font-bold text-[#006d77] mb-6 flex items-center">
          <span className="mr-2">📊</span>
          Weekly Performance Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_SUMMARY_DATA.weeklyInsights.map((insight, index) => (
            <div key={index} className="p-4 bg-[#edf6f9] rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-[#006d77]">{insight.metric}</h4>
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
      <div className="bg-white rounded-2xl shadow-sm border border-[#83c5be]/20 p-6">
        <h3 className="text-lg font-bold text-[#006d77] mb-6 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Subject Performance
        </h3>
        <div className="space-y-4">
          {AI_SUMMARY_DATA.subjectBreakdown.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-[#edf6f9] rounded-2xl">
              <div className="flex-1">
                <h4 className="font-semibold text-[#006d77]">{subject.subject}</h4>
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
      <div className="bg-white rounded-2xl shadow-sm border border-[#83c5be]/20 p-6">
        <h3 className="text-lg font-bold text-[#006d77] mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Goal Progress
        </h3>
        <div className="space-y-4">
          {AI_SUMMARY_DATA.goalTracking.map((goal, index) => (
            <div key={index} className="p-4 bg-[#edf6f9] rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-[#006d77]">{goal.goal}</h4>
                <span className="text-sm text-gray-600">{goal.targetDate}</span>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-3 mb-1">
                <div
                  className="bg-gradient-to-r from-[#006d77] to-[#83c5be] h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{goal.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#83c5be]/20 p-6">
        <h3 className="text-lg font-bold text-[#006d77] mb-6 flex items-center">
          <span className="mr-2">💡</span>
          AI Recommendations for Parents
        </h3>
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
      <div className="bg-white rounded-2xl shadow-sm border border-[#83c5be]/20 p-6">
        <h3 className="text-lg font-bold text-[#006d77] mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Upcoming Challenges
        </h3>
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
    <div className="min-h-screen bg-[#edf6f9] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        transition-transform duration-300 ease-in-out shadow-xl bg-[#006d77]
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#83c5be] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#006d77]" />
            </div>
            <Link href="/" className="text-lg font-bold text-white">
              EduMitra
            </Link>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-[#83c5be] flex items-center justify-center">
              <User className="w-6 h-6 text-[#006d77]" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Parent Dashboard</p>
              <p className="text-xs text-white/70">{selectedStudent.name}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key as TabType);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  item.active
                    ? 'bg-[#83c5be] text-[#006d77]'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <item.icon className="w-5 h-5" />
                </div>
                {item.label}
                {item.active && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 mx-4 p-4 bg-white/10 rounded-xl">
          <h3 className="text-sm font-semibold text-white/90 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/70">Avg Grade</span>
              <span className="text-[#ffddd2] font-bold">{selectedStudent.weeklyStats.averageGrade}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/70">Attendance</span>
              <span className="text-[#ffddd2] font-bold">{selectedStudent.weeklyStats.attendanceRate}%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-[#83c5be]/20 sticky top-0 z-30">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile menu button & Title */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden p-2 text-[#006d77] hover:bg-[#edf6f9] rounded-lg"
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                <div>
                  <h1 className="text-lg font-bold text-[#006d77]">
                    {activeTab === 'ai-summary' ? 'AI Academic Summary' : 'Parent Dashboard'}
                  </h1>
                  <p className="text-sm text-[#83c5be]">
                    {activeTab === 'ai-summary' ? `AI insights for ${selectedStudent.name}` : `Track ${selectedStudent.name}'s progress`}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button className="relative p-2 text-[#83c5be] hover:bg-[#edf6f9] rounded-lg">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e29578] rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>
                
                <Link
                  href="/"
                  className="flex items-center space-x-2 px-3 py-2 text-[#006d77] hover:bg-[#edf6f9] rounded-lg"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Home</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-auto">
          {/* Student Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#83c5be]/20 p-4 sm:p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#83c5be] to-[#006d77] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#006d77] mb-1">
                  {selectedStudent.name}
                </h2>
                <p className="text-[#83c5be] mb-2">{selectedStudent.grade}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#e29578]" />
                    <span className="font-medium text-[#006d77]">{selectedStudent.weeklyStats.averageGrade}% Avg</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#83c5be]" />
                    <span className="font-medium text-[#006d77]">{selectedStudent.weeklyStats.studyHours}h Study</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'ai-summary' ? (
            renderAISummary()
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { value: selectedStudent.weeklyStats.studyHours, label: "Study Hours", icon: Clock, color: COLORS.primary },
                      { value: selectedStudent.weeklyStats.assignmentsCompleted, label: "Assignments", icon: CheckCircle, color: COLORS.primaryLight },
                      { value: selectedStudent.weeklyStats.averageGrade, label: "Avg Grade", icon: TrendingUp, color: COLORS.coral },
                      { value: selectedStudent.weeklyStats.attendanceRate, label: "Attendance", icon: User, color: COLORS.primary }
                    ].map((stat, index) => (
                      <div key={index} className="bg-white rounded-2xl p-4 text-center border border-[#83c5be]/20">
                        <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                             style={{ backgroundColor: `${stat.color}20` }}>
                          <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                        </div>
                        <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                          <AnimatedCounter end={stat.value} suffix={index >= 2 ? "%" : ""} />
                        </div>
                        <div className="text-xs text-[#83c5be]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Subjects Progress */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#83c5be]/20">
                    <h3 className="text-lg font-bold text-[#006d77] mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Subject Progress
                    </h3>
                    <div className="space-y-4">
                      {selectedStudent.subjects.slice(0, 4).map((subject, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-[#006d77]">{subject.name}</span>
                            <span className="text-sm font-bold px-2 py-1 rounded-lg text-white"
                                  style={{ backgroundColor: getProgressColor(subject.progress) }}>
                              {subject.grade}
                            </span>
                          </div>
                          <AnimatedProgressBar 
                            progress={subject.progress}
                            color={getProgressColor(subject.progress)}
                            delay={index * 100}
                          />
                          <div className="flex justify-between mt-1 text-xs text-[#83c5be]">
                            <span>{subject.progress}%</span>
                            <span>{subject.lastActivity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#83c5be]/20">
                    <h3 className="text-lg font-bold text-[#006d77] mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Recent Activities
                    </h3>
                    <div className="space-y-3">
                      {selectedStudent.recentActivities.slice(0, 3).map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-[#edf6f9] rounded-xl">
                          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
                            {getStatusIcon(activity.status)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#006d77] text-sm">{activity.description}</p>
                            <p className="text-xs text-[#83c5be]">
                              {activity.type} • {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'subjects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedStudent.subjects.map((subject, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 border border-[#83c5be]/20">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-[#006d77]">{subject.name}</h3>
                        <span className="px-3 py-1 rounded-xl text-white font-bold"
                              style={{ backgroundColor: getProgressColor(subject.progress) }}>
                          {subject.grade}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-[#83c5be]">Progress</span>
                            <span className="font-bold text-[#006d77]">{subject.progress}%</span>
                          </div>
                          <AnimatedProgressBar 
                            progress={subject.progress}
                            color={getProgressColor(subject.progress)}
                            delay={index * 100}
                          />
                        </div>
                        <div className="text-sm p-3 bg-[#edf6f9] rounded-xl">
                          <span className="text-[#83c5be]">Last activity: </span>
                          <span className="font-medium text-[#006d77]">{subject.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'activities' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <div className="bg-white rounded-2xl p-6 border border-[#83c5be]/20">
                    <h3 className="text-lg font-bold text-[#006d77] mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Recent Activities
                    </h3>
                    <div className="space-y-4">
                      {selectedStudent.recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-[#edf6f9] rounded-xl">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                            {getStatusIcon(activity.status)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-[#006d77]">{activity.description}</p>
                            <p className="text-sm text-[#83c5be] mt-1">
                              {activity.type} • {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Deadlines */}
                  <div className="bg-white rounded-2xl p-6 border border-[#83c5be]/20">
                    <h3 className="text-lg font-bold text-[#006d77] mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Upcoming Deadlines
                    </h3>
                    <div className="space-y-4">
                      {selectedStudent.upcomingDeadlines.map((deadline, index) => (
                        <div key={index} className="p-4 bg-[#edf6f9] rounded-xl">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-[#006d77]">{deadline.title}</h4>
                            <span className="text-xs px-2 py-1 rounded-full text-white font-bold"
                                  style={{ backgroundColor: getPriorityColor(deadline.priority) }}>
                              {deadline.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-[#83c5be]">
                            {deadline.subject} • Due: {new Date(deadline.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-6">
                  {/* Progress Charts Placeholder */}
                  <div className="bg-white rounded-2xl p-6 border border-[#83c5be]/20">
                    <h3 className="text-lg font-bold text-[#006d77] mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Academic Progress Over Time
                    </h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl"
                         style={{ borderColor: COLORS.primaryLight, backgroundColor: `${COLORS.primaryLight}10` }}>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                             style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})` }}>
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-lg font-bold mb-2 text-[#006d77]">Progress charts will be displayed here</p>
                        <p className="text-sm text-[#83c5be]">Integration with analytics coming soon</p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Statistics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { value: selectedStudent.weeklyStats.studyHours, label: "Study Hours This Week", icon: Clock, color: COLORS.primary },
                      { value: selectedStudent.weeklyStats.assignmentsCompleted, label: "Assignments Completed", icon: CheckCircle, color: COLORS.primaryLight },
                      { value: selectedStudent.weeklyStats.averageGrade, label: "Average Grade", icon: TrendingUp, color: COLORS.coral, suffix: "%" },
                      { value: selectedStudent.weeklyStats.attendanceRate, label: "Attendance Rate", icon: User, color: COLORS.primary, suffix: "%" }
                    ].map((stat, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 text-center border border-[#83c5be]/20">
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                             style={{ backgroundColor: `${stat.color}20` }}>
                          <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                        </div>
                        <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                          <AnimatedCounter end={stat.value} suffix={stat.suffix || ""} />
                        </div>
                        <div className="text-sm text-[#83c5be]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
