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
  Zap
} from 'lucide-react';

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
    <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)' }}>
      <div 
        className="h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
        style={{ 
          width: `${animatedProgress}%`,
          backgroundColor: color,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

// Mock data for demonstration
const mockStudentData: StudentProgress = {
  id: "1",
  name: "Alex Johnson",
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
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'activities' | 'progress'>('overview');
  const [selectedStudent] = useState(mockStudentData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return '#006d77';
    if (progress >= 80) return '#83c5be';
    if (progress >= 70) return '#e29578';
    return '#ffddd2';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#e29578';
      case 'medium': return '#ffddd2';
      case 'low': return '#83c5be';
      default: return '#83c5be';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" style={{ color: '#006d77' }} />;
      case 'pending': return <Clock className="w-4 h-4" style={{ color: '#e29578' }} />;
      case 'overdue': return <AlertCircle className="w-4 h-4" style={{ color: '#e29578' }} />;
      default: return <Clock className="w-4 h-4" style={{ color: '#e29578' }} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" 
         style={{ 
           backgroundColor: '#edf6f9'
         }}>
      
      {/* Enhanced Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, #006d77 0%, transparent 70%)',
               animation: 'float 6s ease-in-out infinite'
             }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, #83c5be 0%, transparent 70%)',
               animation: 'float 8s ease-in-out infinite reverse'
             }}></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30"
            style={{
              backgroundColor: i % 3 === 0 ? '#006d77' : i % 3 === 1 ? '#83c5be' : '#e29578',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30" 
             style={{
               backgroundImage: `
                 radial-gradient(circle at 25% 25%, #83c5be20 0%, transparent 50%),
                 radial-gradient(circle at 75% 75%, #e2957820 0%, transparent 50%),
                 radial-gradient(circle at 75% 25%, #006d7720 0%, transparent 50%),
                 radial-gradient(circle at 25% 75%, #ffddd220 0%, transparent 50%)
               `
             }}></div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 109, 119, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 109, 119, 0.5); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 109, 119, 0.2);
        }
        .tab-active {
          position: relative;
          overflow: hidden;
        }
        .tab-active::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shine 2s infinite;
        }
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>

      {/* Enhanced Header */}
      <header className="shadow-xl backdrop-blur-lg border-b relative z-10" 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'rgba(131, 197, 190, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 109, 119, 0.1)'
              }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-3xl font-bold tracking-tight flex items-center space-x-2 group" style={{ color: '#006d77' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                     style={{ background: 'linear-gradient(135deg, #006d77, #83c5be)' }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span>EduMitra</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold" style={{ color: '#006d77' }}>Parent Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Link href="/" className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group" 
                    style={{ 
                      color: '#006d77',
                      backgroundColor: 'rgba(131, 197, 190, 0.1)',
                      border: '1px solid rgba(131, 197, 190, 0.3)'
                    }}>
                <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Home</span>
              </Link> */}
              <button className="relative p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{ 
                        backgroundColor: 'rgba(131, 197, 190, 0.2)',
                        border: '1px solid rgba(131, 197, 190, 0.3)'
                      }}>
                <Bell className="w-5 h-5" style={{ color: '#006d77' }} />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-bold animate-pulse"
                      style={{ backgroundColor: '#e29578' }}>3</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Student Info Header */}
        <div className={`rounded-3xl shadow-2xl border p-8 mb-8 card-hover backdrop-blur-lg relative overflow-hidden ${isLoaded ? 'animate-slideIn' : ''}`}
             style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.95)',
               borderColor: 'rgba(131, 197, 190, 0.3)',
               animation: isLoaded ? 'slideIn 0.6s ease-out' : 'none'
             }}>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl shadow-xl relative overflow-hidden group"
                   style={{ 
                     background: 'linear-gradient(135deg, #83c5be, #006d77)',
                   }}>
                <User className="w-10 h-10 text-white transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ color: '#006d77' }}>
                  {selectedStudent.name}
                </h2>
                <p className="text-xl flex items-center space-x-2" style={{ color: '#83c5be' }}>
                  <Star className="w-5 h-5" />
                  <span>{selectedStudent.grade}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-center p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105" 
                   style={{ backgroundColor: 'rgba(131, 197, 190, 0.1)' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#006d77' }}>
                  <AnimatedCounter end={selectedStudent.weeklyStats.averageGrade} suffix="%" />
                </div>
                <div className="text-sm font-medium" style={{ color: '#83c5be' }}>Avg Grade</div>
              </div>
              <div className="text-center p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105" 
                   style={{ backgroundColor: 'rgba(131, 197, 190, 0.1)' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#006d77' }}>
                  <AnimatedCounter end={selectedStudent.weeklyStats.studyHours} suffix="h" />
                </div>
                <div className="text-sm font-medium" style={{ color: '#83c5be' }}>Study Hours</div>
              </div>
              <div className="text-center p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105" 
                   style={{ backgroundColor: 'rgba(131, 197, 190, 0.1)' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#006d77' }}>
                  <AnimatedCounter end={selectedStudent.weeklyStats.attendanceRate} suffix="%" />
                </div>
                <div className="text-sm font-medium" style={{ color: '#83c5be' }}>Attendance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div
  className="rounded-3xl shadow-xl border mb-8 backdrop-blur-lg overflow-hidden"
  style={{
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "rgba(131, 197, 190, 0.3)",
  }}
>
  {/* Mobile-first: vertical tabs */}
  <div className="flex flex-col sm:flex-row">
    {[
      { key: "overview", label: "📊 Overview", icon: BarChart3 },
      { key: "subjects", label: "📚 Subjects", icon: BookOpen },
      { key: "activities", label: "🎯 Activities", icon: Activity },
      { key: "progress", label: "📈 Progress", icon: TrendingUp },
    ].map((tab) => (
      <button
        key={tab.key}
        onClick={() =>
          setActiveTab(
            tab.key as "overview" | "subjects" | "activities" | "progress"
          )
        }
        className={`flex items-center py-3 px-4 sm:py-4 sm:px-6 text-sm sm:text-base font-semibold transition-all duration-300 relative group ${
          activeTab === tab.key ? "tab-active" : ""
        }`}
        style={{
          backgroundColor: activeTab === tab.key ? "#006d77" : "transparent",
          color: activeTab === tab.key ? "white" : "#006d77",
          borderLeft:
            activeTab === tab.key
              ? "3px solid #83c5be"
              : "3px solid transparent",
        }}
      >
        <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-3 transition-transform group-hover:scale-110" />
        {tab.label}
        {activeTab === tab.key && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"></div>
        )}
      </button>
    ))}
  </div>
</div>


        {/* Enhanced Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Stats */}
            <div className="lg:col-span-1 space-y-8">
              {/* Weekly Performance */}
              <div className="rounded-3xl shadow-xl border p-8 card-hover backdrop-blur-lg"
                   style={{ 
                     backgroundColor: 'rgba(255, 255, 255, 0.95)',
                     borderColor: 'rgba(131, 197, 190, 0.3)'
                   }}>
                <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: '#006d77' }}>
                  <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
                       style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)' }}>
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  Weekly Performance
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{ color: '#83c5be' }}>Assignments Completed</span>
                    <span className="font-bold text-lg" style={{ color: '#006d77' }}>
                      <AnimatedCounter end={selectedStudent.weeklyStats.assignmentsCompleted} />/15
                    </span>
                  </div>
                  <AnimatedProgressBar 
                    progress={(selectedStudent.weeklyStats.assignmentsCompleted / 15) * 100}
                    color="#006d77"
                    delay={300}
                  />
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="rounded-3xl shadow-xl border p-8 card-hover backdrop-blur-lg"
                   style={{ 
                     backgroundColor: 'rgba(255, 255, 255, 0.95)',
                     borderColor: 'rgba(131, 197, 190, 0.3)'
                   }}>
                <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: '#006d77' }}>
                  <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
                       style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)' }}>
                    <Award className="w-5 h-5" />
                  </div>
                  Recent Achievements
                </h3>
                <div className="space-y-4">
                  {selectedStudent.achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                         style={{ backgroundColor: '#ffddd2' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md"
                           style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm" style={{ color: '#006d77' }}>{achievement.title}</p>
                        <p className="text-xs" style={{ color: '#83c5be' }}>{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Subject Progress */}
              <div className="rounded-3xl shadow-xl border p-8 card-hover backdrop-blur-lg"
                   style={{ 
                     backgroundColor: 'rgba(255, 255, 255, 0.95)',
                     borderColor: 'rgba(131, 197, 190, 0.3)'
                   }}>
                <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: '#006d77' }}>
                  <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
                       style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)' }}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  Subject Progress
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedStudent.subjects.map((subject, index) => (
                    <div key={index} className="p-6 rounded-2xl border shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                         style={{ 
                           backgroundColor: '#ffddd2',
                           borderColor: 'rgba(131, 197, 190, 0.3)'
                         }}>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-lg" style={{ color: '#006d77' }}>{subject.name}</h4>
                        <span className="text-sm font-bold px-3 py-2 rounded-xl text-white shadow-lg"
                              style={{ backgroundColor: getProgressColor(subject.progress) }}>
                          {subject.grade}
                        </span>
                      </div>
                      <div className="mb-4">
                        <AnimatedProgressBar 
                          progress={subject.progress}
                          color={getProgressColor(subject.progress)}
                          delay={index * 100}
                        />
                      </div>
                      <div className="flex justify-between text-sm" style={{ color: '#83c5be' }}>
                        <span className="font-medium">{subject.progress}% Complete</span>
                        <span>{subject.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="rounded-3xl shadow-xl border p-8 card-hover backdrop-blur-lg"
                   style={{ 
                     backgroundColor: 'rgba(255, 255, 255, 0.95)',
                     borderColor: 'rgba(131, 197, 190, 0.3)'
                   }}>
                <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: '#006d77' }}>
                  <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
                       style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)' }}>
                    <Activity className="w-5 h-5" />
                  </div>
                  Recent Activities
                </h3>
                <div className="space-y-4">
                  {selectedStudent.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl border shadow-lg transition-all duration-300 hover:scale-105"
                         style={{ 
                           backgroundColor: '#ffddd2',
                           borderColor: 'rgba(131, 197, 190, 0.3)'
                         }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                           style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm" style={{ color: '#006d77' }}>{activity.description}</p>
                        <p className="text-xs" style={{ color: '#83c5be' }}>
                          {activity.type} • {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedStudent.subjects.map((subject, index) => (
              <div key={index} className="rounded-3xl shadow-xl border p-8 card-hover backdrop-blur-lg"
                   style={{ 
                     backgroundColor: 'rgba(255, 255, 255, 0.95)',
                     borderColor: 'rgba(131, 197, 190, 0.3)',
                     animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                   }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold" style={{ color: '#006d77' }}>{subject.name}</h3>
                  <span className="text-2xl font-bold px-4 py-2 rounded-2xl text-white shadow-lg"
                        style={{ backgroundColor: getProgressColor(subject.progress) }}>
                    {subject.grade}
                  </span>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-3 font-medium" style={{ color: '#83c5be' }}>
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <AnimatedProgressBar 
                      progress={subject.progress}
                      color={getProgressColor(subject.progress)}
                      delay={index * 100}
                    />
                  </div>
                  <div className="text-sm p-3 rounded-xl shadow-inner" style={{ 
                    color: '#83c5be', 
                    backgroundColor: 'rgba(131, 197, 190, 0.1)',
                    border: '1px solid rgba(131, 197, 190, 0.2)'
                  }}>
                    <strong>Last activity:</strong> {subject.lastActivity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="rounded-3xl shadow-xl border p-8 card-hover backdrop-blur-lg"
                 style={{ 
                   backgroundColor: 'rgba(255, 255, 255, 0.95)',
                   borderColor: 'rgba(131, 197, 190, 0.3)'
                 }}>
              <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: '#006d77' }}>
                <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
                     style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)' }}>
                  <Activity className="w-5 h-5" />
                </div>
                Recent Activities
              </h3>
              <div className="space-y-5">
                {selectedStudent.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-5 rounded-2xl border shadow-lg transition-all duration-300 hover:scale-105"
                       style={{ 
                         backgroundColor: '#ffddd2',
                         borderColor: 'rgba(131, 197, 190, 0.3)',
                         animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                       }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                         style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base" style={{ color: '#006d77' }}>{activity.description}</p>
                      <p className="text-sm mt-1 font-medium" style={{ color: '#83c5be' }}>
                        {activity.type} • {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="rounded-3xl shadow-xl border p-8 card-hover backdrop-blur-lg"
                 style={{ 
                   backgroundColor: 'rgba(255, 255, 255, 0.95)',
                   borderColor: 'rgba(131, 197, 190, 0.3)'
                 }}>
              <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: '#006d77' }}>
                <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
                     style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)' }}>
                  <Clock className="w-5 h-5" />
                </div>
                Upcoming Deadlines
              </h3>
              <div className="space-y-5">
                {selectedStudent.upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="p-5 rounded-2xl border shadow-lg transition-all duration-300 hover:scale-105"
                       style={{ 
                         backgroundColor: '#ffddd2',
                         borderColor: 'rgba(131, 197, 190, 0.3)',
                         animation: `slideIn 0.6s ease-out ${index * 0.1 + 0.2}s both`
                       }}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-base" style={{ color: '#006d77' }}>{deadline.title}</h4>
                      <span className="text-xs px-3 py-2 rounded-xl text-white font-bold shadow-lg"
                            style={{ backgroundColor: getPriorityColor(deadline.priority) }}>
                        {deadline.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#83c5be' }}>
                      {deadline.subject} • Due: {new Date(deadline.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-8">
            {/* Progress Charts Placeholder */}
            <div className="rounded-3xl shadow-xl border p-8 card-hover backdrop-blur-lg"
                 style={{ 
                   backgroundColor: 'rgba(255, 255, 255, 0.95)',
                   borderColor: 'rgba(131, 197, 190, 0.3)'
                 }}>
              <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: '#006d77' }}>
                <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
                     style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)' }}>
                  <TrendingUp className="w-5 h-5" />
                </div>
                Academic Progress Over Time
              </h3>
              <div className="h-72 flex items-center justify-center border-2 border-dashed rounded-2xl relative overflow-hidden"
                   style={{ 
                     borderColor: '#83c5be', 
                     backgroundColor: 'rgba(131, 197, 190, 0.05)',
                   }}>
                {/* Animated background */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: '#83c5be',
                        left: `${(i * 5) % 100}%`,
                        top: `${20 + Math.sin(i) * 20}%`,
                        animation: `float ${2 + i * 0.1}s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                
                <div className="text-center z-10">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse"
                       style={{ background: 'linear-gradient(135deg, #006d77, #83c5be)' }}>
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-lg font-bold mb-2" style={{ color: '#006d77' }}>Progress charts will be displayed here</p>
                  <p className="text-sm font-medium" style={{ color: '#83c5be' }}>
                    Integration with analytics coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Detailed Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  value: selectedStudent.weeklyStats.studyHours,
                  label: "Study Hours This Week",
                  icon: Clock,
                  color: "#006d77",
                  suffix: ""
                },
                {
                  value: selectedStudent.weeklyStats.assignmentsCompleted,
                  label: "Assignments Completed",
                  icon: CheckCircle,
                  color: "#83c5be",
                  suffix: ""
                },
                {
                  value: selectedStudent.weeklyStats.averageGrade,
                  label: "Average Grade",
                  icon: TrendingUp,
                  color: "#006d77",
                  suffix: "%"
                },
                {
                  value: selectedStudent.weeklyStats.attendanceRate,
                  label: "Attendance Rate",
                  icon: User,
                  color: "#83c5be",
                  suffix: "%"
                }
              ].map((stat, index) => (
                <div key={index} 
                     className="rounded-3xl shadow-xl border p-8 text-center card-hover backdrop-blur-lg relative overflow-hidden"
                     style={{ 
                       backgroundColor: 'rgba(255, 255, 255, 0.95)',
                       borderColor: 'rgba(131, 197, 190, 0.3)',
                       animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                     }}>
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 opacity-10"
                       style={{
                         background: `linear-gradient(135deg, ${stat.color}20, transparent)`
                       }}></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
                         style={{ backgroundColor: `${stat.color}20` }}>
                      <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                    </div>
                    <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={1500} />
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#83c5be' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}