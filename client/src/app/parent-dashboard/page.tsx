"use client";

import { useState } from 'react';
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
  Bell
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

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return '#047857';
    if (progress >= 80) return '#059669';
    if (progress >= 70) return '#10b981';
    return '#fbbf24';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#ea580c';
      case 'low': return '#047857';
      default: return '#047857';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />;
      case 'pending': return <Clock className="w-4 h-4" style={{ color: '#fbbf24' }} />;
      case 'overdue': return <AlertCircle className="w-4 h-4" style={{ color: '#dc2626' }} />;
      default: return <Clock className="w-4 h-4" style={{ color: '#fbbf24' }} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #134e4a 100%)' }}>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20" 
             style={{ backgroundColor: '#047857' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20" 
             style={{ backgroundColor: '#065f46' }}></div>
        <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full opacity-15" 
             style={{ backgroundColor: '#0f766e' }}></div>
        <div className="absolute top-2/3 -right-20 w-32 h-32 rounded-full opacity-10" 
             style={{ backgroundColor: '#047857' }}></div>
      </div>

      {/* Header */}
      <header className="shadow-sm border-b border-opacity-20 relative z-10" 
              style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold" style={{ color: '#10b981' }}>
                EduMitra
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold" style={{ color: '#d1fae5' }}>Parent Dashboard</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 transition-colors hover:opacity-80" 
                    style={{ color: '#10b981' }}>
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <button className="relative p-2 rounded-full transition-colors hover:opacity-80"
                      style={{ backgroundColor: '#374151' }}>
                <Bell className="w-4 h-4" style={{ color: '#10b981' }} />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center text-white"
                      style={{ backgroundColor: '#f87171' }}>3</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Student Info Header */}
        <div className="rounded-xl shadow-sm border p-6 mb-6"
             style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                   style={{ backgroundColor: '#374151' }}>
                <User className="w-8 h-8" style={{ color: '#10b981' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#d1fae5' }}>{selectedStudent.name}</h2>
                <p className="text-lg" style={{ color: '#a7f3d0', opacity: 0.8 }}>{selectedStudent.grade}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{selectedStudent.weeklyStats.averageGrade}%</div>
                <div className="text-sm" style={{ color: '#a7f3d0', opacity: 0.8 }}>Avg Grade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{selectedStudent.weeklyStats.studyHours}h</div>
                <div className="text-sm" style={{ color: '#a7f3d0', opacity: 0.8 }}>Study Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{selectedStudent.weeklyStats.attendanceRate}%</div>
                <div className="text-sm" style={{ color: '#a7f3d0', opacity: 0.8 }}>Attendance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="rounded-xl shadow-sm border mb-6"
             style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
          <div className="flex overflow-x-auto">
            {[
              { key: 'overview', label: '📊 Overview', icon: BarChart3 },
              { key: 'subjects', label: '📚 Subjects', icon: BookOpen },
              { key: 'activities', label: '🎯 Activities', icon: Activity },
              { key: 'progress', label: '📈 Progress', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'overview' | 'subjects' | 'activities' | 'progress')}
                className="flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: activeTab === tab.key ? '#047857' : 'transparent',
                  color: activeTab === tab.key ? 'white' : '#10b981'
                }}
              >
                <tab.icon className="w-4 h-4 inline mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Weekly Performance */}
              <div className="rounded-xl shadow-sm border p-6"
                   style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#d1fae5' }}>
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Weekly Performance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: '#a7f3d0' }}>Assignments Completed</span>
                    <span className="font-semibold" style={{ color: '#10b981' }}>{selectedStudent.weeklyStats.assignmentsCompleted}/15</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: '#374151' }}>
                    <div className="h-2 rounded-full transition-all duration-300"
                         style={{ 
                           width: `${(selectedStudent.weeklyStats.assignmentsCompleted / 15) * 100}%`,
                           backgroundColor: '#047857'
                         }}></div>
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="rounded-xl shadow-sm border p-6"
                   style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#d1fae5' }}>
                  <Award className="w-5 h-5 mr-2" />
                  Recent Achievements
                </h3>
                <div className="space-y-3">
                  {selectedStudent.achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg"
                         style={{ backgroundColor: '#374151' }}>
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm" style={{ color: '#d1fae5' }}>{achievement.title}</p>
                        <p className="text-xs" style={{ color: '#a7f3d0', opacity: 0.7 }}>{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Subject Progress */}
              <div className="rounded-xl shadow-sm border p-6"
                   style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#d1fae5' }}>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Subject Progress
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedStudent.subjects.map((subject, index) => (
                    <div key={index} className="p-4 rounded-lg border"
                         style={{ backgroundColor: '#374151', borderColor: '#4b5563' }}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium" style={{ color: '#d1fae5' }}>{subject.name}</h4>
                        <span className="text-sm font-semibold px-2 py-1 rounded text-white"
                              style={{ backgroundColor: getProgressColor(subject.progress) }}>
                          {subject.grade}
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2 mb-2" style={{ backgroundColor: '#4b5563' }}>
                        <div className="h-2 rounded-full transition-all duration-300"
                             style={{ 
                               width: `${subject.progress}%`,
                               backgroundColor: getProgressColor(subject.progress)
                             }}></div>
                      </div>
                      <div className="flex justify-between text-xs" style={{ color: '#a7f3d0', opacity: 0.7 }}>
                        <span>{subject.progress}% Complete</span>
                        <span>{subject.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="rounded-xl shadow-sm border p-6"
                   style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#d1fae5' }}>
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activities
                </h3>
                <div className="space-y-3">
                  {selectedStudent.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border"
                         style={{ backgroundColor: '#374151', borderColor: '#4b5563' }}>
                      {getStatusIcon(activity.status)}
                      <div className="flex-1">
                        <p className="font-medium text-sm" style={{ color: '#d1fae5' }}>{activity.description}</p>
                        <p className="text-xs" style={{ color: '#a7f3d0', opacity: 0.7 }}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedStudent.subjects.map((subject, index) => (
              <div key={index} className="rounded-xl shadow-sm border p-6"
                   style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: '#d1fae5' }}>{subject.name}</h3>
                  <span className="text-xl font-bold px-3 py-1 rounded text-white"
                        style={{ backgroundColor: getProgressColor(subject.progress) }}>
                    {subject.grade}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2" style={{ color: '#a7f3d0' }}>
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <div className="w-full rounded-full h-3" style={{ backgroundColor: '#374151' }}>
                      <div className="h-3 rounded-full transition-all duration-300"
                           style={{ 
                             width: `${subject.progress}%`,
                             backgroundColor: getProgressColor(subject.progress)
                           }}></div>
                    </div>
                  </div>
                  <div className="text-sm" style={{ color: '#a7f3d0', opacity: 0.8 }}>
                    Last activity: {subject.lastActivity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="rounded-xl shadow-sm border p-6"
                 style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#d1fae5' }}>Recent Activities</h3>
              <div className="space-y-4">
                {selectedStudent.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border"
                       style={{ backgroundColor: '#374151', borderColor: '#4b5563' }}>
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: '#d1fae5' }}>{activity.description}</p>
                      <p className="text-sm mt-1" style={{ color: '#a7f3d0', opacity: 0.7 }}>
                        {activity.type} • {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="rounded-xl shadow-sm border p-6"
                 style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#d1fae5' }}>Upcoming Deadlines</h3>
              <div className="space-y-4">
                {selectedStudent.upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="p-4 rounded-lg border"
                       style={{ backgroundColor: '#374151', borderColor: '#4b5563' }}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium" style={{ color: '#d1fae5' }}>{deadline.title}</h4>
                      <span className="text-xs px-2 py-1 rounded text-white"
                            style={{ backgroundColor: getPriorityColor(deadline.priority) }}>
                        {deadline.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: '#a7f3d0', opacity: 0.8 }}>
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
            <div className="rounded-xl shadow-sm border p-6"
                 style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#d1fae5' }}>Academic Progress Over Time</h3>
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg"
                   style={{ borderColor: '#4b5563' }}>
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2" style={{ color: '#10b981' }} />
                  <p style={{ color: '#d1fae5' }}>Progress charts will be displayed here</p>
                  <p className="text-sm mt-1" style={{ color: '#a7f3d0', opacity: 0.7 }}>
                    Integration with analytics coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl shadow-sm border p-6 text-center"
                   style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
                <div className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>
                  {selectedStudent.weeklyStats.studyHours}
                </div>
                <div className="text-sm" style={{ color: '#a7f3d0', opacity: 0.8 }}>Study Hours This Week</div>
              </div>
              <div className="rounded-xl shadow-sm border p-6 text-center"
                   style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
                <div className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>
                  {selectedStudent.weeklyStats.assignmentsCompleted}
                </div>
                <div className="text-sm" style={{ color: '#a7f3d0', opacity: 0.8 }}>Assignments Completed</div>
              </div>
              <div className="rounded-xl shadow-sm border p-6 text-center"
                   style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
                <div className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>
                  {selectedStudent.weeklyStats.averageGrade}%
                </div>
                <div className="text-sm" style={{ color: '#a7f3d0', opacity: 0.8 }}>Average Grade</div>
              </div>
              <div className="rounded-xl shadow-sm border p-6 text-center"
                   style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
                <div className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>
                  {selectedStudent.weeklyStats.attendanceRate}%
                </div>
                <div className="text-sm" style={{ color: '#a7f3d0', opacity: 0.8 }}>Attendance Rate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
