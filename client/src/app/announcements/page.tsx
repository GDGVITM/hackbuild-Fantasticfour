"use client";

import { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Briefcase, 
  BookOpen, 
  Bell, 
  ExternalLink,
  Filter,
  Search,
  ChevronRight,
  Building,
  GraduationCap,
  AlertCircle,
  TrendingUp,
  Home,
  Sparkles,
  Crown,
  Star,
  Zap,
  ArrowRight,
  Target,
  Award,
  Flame,
  Eye,
  Globe,
  Heart,
  Layers,
  CheckCircle,
  Clock4,
  MapPinIcon
} from 'lucide-react';
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface Announcement {
  id: string;
  title: string;
  description: string;
  type: 'placement' | 'course' | 'general' | 'exam' | 'workshop';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  date: Date;
  deadline?: Date;
  location?: string;
  company?: string;
  eligibility?: string[];
  requirements?: string[];
  contactInfo?: string;
  applicationLink?: string;
  tags: string[];
  isActive: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Google Software Engineer Internship 2025',
    description: 'Google is hiring software engineering interns for Summer 2025. Great opportunity for final year students with strong programming skills.',
    type: 'placement',
    priority: 'high',
    date: new Date('2025-01-15'),
    deadline: new Date('2025-02-15'),
    location: 'Bangalore, India',
    company: 'Google',
    eligibility: ['B.Tech/M.Tech Computer Science', 'CGPA > 8.0', 'Final Year Students'],
    requirements: ['Strong DSA skills', 'Proficiency in Java/Python/C++', 'System Design Knowledge'],
    contactInfo: 'placement@college.edu',
    applicationLink: '/placement/google-internship-2025',
    tags: ['Internship', 'Tech', 'Google', 'Software Engineering'],
    isActive: true
  },
  {
    id: '2',
    title: 'Microsoft Campus Placement Drive',
    description: 'Microsoft is conducting an on-campus placement drive for Software Development Engineer positions. Multiple roles available.',
    type: 'placement',
    priority: 'urgent',
    date: new Date('2025-01-10'),
    deadline: new Date('2025-01-25'),
    location: 'On-Campus',
    company: 'Microsoft',
    eligibility: ['All Engineering Branches', 'CGPA > 7.5', '2025 Graduates'],
    requirements: ['Problem-solving skills', 'Programming proficiency', 'Team collaboration'],
    contactInfo: 'careers@college.edu',
    applicationLink: '/placement/microsoft-sde-2025',
    tags: ['Full-time', 'Tech', 'Microsoft', 'SDE'],
    isActive: true
  },
  {
    id: '3',
    title: 'Advanced React Development Workshop',
    description: 'Learn advanced React concepts including hooks, context API, performance optimization, and testing. Industry expert mentors.',
    type: 'workshop',
    priority: 'medium',
    date: new Date('2025-01-20'),
    deadline: new Date('2025-01-18'),
    location: 'Computer Lab - Block A',
    requirements: ['Basic React knowledge', 'Laptop with development setup'],
    contactInfo: 'workshops@college.edu',
    tags: ['React', 'Web Development', 'Workshop', 'Frontend'],
    isActive: true
  },
  {
    id: '4',
    title: 'Machine Learning Specialization Course',
    description: 'Comprehensive 8-week course covering ML fundamentals, deep learning, and practical projects. Industry-recognized certification.',
    type: 'course',
    priority: 'medium',
    date: new Date('2025-02-01'),
    deadline: new Date('2025-01-28'),
    location: 'Online + Weekend Labs',
    eligibility: ['All students', 'Basic Python knowledge preferred'],
    requirements: ['Python programming', 'Mathematics background', 'Commitment to complete course'],
    contactInfo: 'courses@college.edu',
    tags: ['Machine Learning', 'AI', 'Certification', 'Python'],
    isActive: true
  },
  {
    id: '5',
    title: 'Amazon SDE-1 Opening',
    description: 'Amazon Web Services is hiring Software Development Engineers for their cloud infrastructure team. Excellent growth opportunities.',
    type: 'placement',
    priority: 'high',
    date: new Date('2025-01-12'),
    deadline: new Date('2025-02-01'),
    location: 'Hyderabad, India',
    company: 'Amazon',
    eligibility: ['B.Tech/M.Tech', 'CGPA > 7.0', 'Strong programming skills'],
    requirements: ['Data Structures & Algorithms', 'System Design', 'AWS Knowledge (preferred)'],
    contactInfo: 'placement@college.edu',
    applicationLink: '/placement/amazon-sde1-2025',
    tags: ['Full-time', 'AWS', 'Cloud', 'Backend'],
    isActive: true
  },
  {
    id: '6',
    title: 'Mid-Semester Examination Schedule',
    description: 'Mid-semester examinations will be conducted from February 15-22, 2025. Check your individual timetable on the student portal.',
    type: 'exam',
    priority: 'urgent',
    date: new Date('2025-01-08'),
    deadline: new Date('2025-02-15'),
    location: 'Various Examination Halls',
    contactInfo: 'exams@college.edu',
    tags: ['Examination', 'Mid-sem', 'Academic'],
    isActive: true
  },
  {
    id: '7',
    title: 'Startup Pitch Competition 2025',
    description: 'Present your innovative startup ideas to industry leaders and investors. Winner gets ₹1 Lakh seed funding and mentorship.',
    type: 'general',
    priority: 'medium',
    date: new Date('2025-01-18'),
    deadline: new Date('2025-02-10'),
    location: 'Auditorium - Main Block',
    eligibility: ['All students', 'Team of 2-4 members'],
    requirements: ['Business plan', '10-minute pitch presentation', 'Prototype (optional)'],
    contactInfo: 'entrepreneurship@college.edu',
    tags: ['Startup', 'Competition', 'Entrepreneurship', 'Innovation'],
    isActive: true
  },
  {
    id: '8',
    title: 'Data Science Bootcamp by Analytics Vidhya',
    description: 'Intensive 3-day bootcamp covering data science lifecycle, machine learning models, and real-world case studies.',
    type: 'workshop',
    priority: 'medium',
    date: new Date('2025-01-25'),
    deadline: new Date('2025-01-23'),
    location: 'Hybrid (Online + On-campus)',
    requirements: ['Basic statistics knowledge', 'Python familiarity', 'Laptop required'],
    contactInfo: 'datascience@college.edu',
    tags: ['Data Science', 'Analytics', 'Bootcamp', 'Career'],
    isActive: true
  }
];

const typeColors = {
  placement: 'bg-gradient-to-r from-[#006d77] to-[#83c5be] text-white',
  course: 'bg-gradient-to-r from-[#83c5be] to-[#006d77] text-white',
  workshop: 'bg-gradient-to-r from-[#e29578] to-[#ffddd2] text-[#006d77]',
  exam: 'bg-gradient-to-r from-[#ffddd2] to-[#e29578] text-[#006d77]',
  general: 'bg-gradient-to-r from-[#006d77]/80 to-[#83c5be]/80 text-white'
};

const priorityColors = {
  low: 'bg-[#83c5be]/20 text-[#006d77] border-[#83c5be]/30',
  medium: 'bg-[#e29578]/20 text-[#006d77] border-[#e29578]/30',
  high: 'bg-[#ffddd2]/40 text-[#006d77] border-[#e29578]/40',
  urgent: 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400'
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'placement':
      return <Briefcase className="w-4 h-4" />;
    case 'course':
      return <BookOpen className="w-4 h-4" />;
    case 'workshop':
      return <Users className="w-4 h-4" />;
    case 'exam':
      return <GraduationCap className="w-4 h-4" />;
    case 'general':
      return <Bell className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getDaysUntilDeadline = (deadline: Date) => {
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function AnnouncementsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesType = selectedType === 'all' || announcement.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || announcement.priority === selectedPriority;
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesPriority && matchesSearch && announcement.isActive;
  });

  const urgentAnnouncements = mockAnnouncements.filter(a => a.priority === 'urgent' && a.isActive);
  const placementAnnouncements = mockAnnouncements.filter(a => a.type === 'placement' && a.isActive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf6f9] via-[#f8fffe] to-[#e8f4f7] relative">
      {/* Enhanced Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#83c5be]/15 via-[#83c5be]/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-[#ffddd2]/20 via-[#ffddd2]/10 to-transparent rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-[#e29578]/20 to-[#e29578]/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#006d77]/6 via-[#83c5be]/4 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Ultra-Enhanced Header */}
      <header className="relative bg-white/98 backdrop-blur-2xl shadow-xl border-b border-[#83c5be]/20 sticky top-0 z-40">
        <div className="absolute inset-0 bg-gradient-to-r from-[#006d77] via-[#83c5be] to-[#006d77] bg-[length:200%_100%] animate-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center h-auto sm:h-20 py-4 sm:py-0">
            
            {/* Enhanced Left Section */}
            <div className="flex items-center space-x-4 mb-3 sm:mb-0">
              <div className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border border-white/30">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#ffddd2] to-[#e29578] rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
                <a href="/" className="text-2xl sm:text-3xl font-black text-white hover:text-[#ffddd2] transition-colors cursor-pointer">
                  EduMitra
                </a>
              </div>
              
              <div className="hidden sm:flex items-center space-x-4">
                <div className="w-2 h-12 bg-gradient-to-b from-white/40 to-white/20 rounded-full shadow-lg"></div>
                <div>
                  <h1 className="text-xl font-black text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Announcements Hub
                  </h1>
                  <p className="text-sm text-white/80 font-medium">Stay Updated • Get Opportunities • Excel</p>
                </div>
              </div>
            </div>

            {/* Enhanced Right Section */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/"
                className="group flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:scale-105"
              >
                <Home className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium">Home</span>
              </a>
              
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-xl shadow-lg">
                <div className="relative">
                  <Star className="w-4 h-4 text-[#ffddd2] fill-current animate-pulse" />
                  <div className="absolute inset-0 bg-[#ffddd2] rounded-full blur animate-ping opacity-50"></div>
                </div>
                <span className="text-sm font-black text-white">
                  {filteredAnnouncements.length} Live
                </span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Mobile subtitle */}
          <div className="sm:hidden pb-3">
            <div className="text-center">
              <h1 className="text-lg font-black text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 animate-pulse" />
                Announcements Hub
              </h1>
              <p className="text-sm text-white/80 font-medium">Stay Updated • Get Opportunities • Excel</p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        
        {/* Ultra-Enhanced Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: 'Urgent',
              value: urgentAnnouncements.length,
              icon: AlertCircle,
              bgGradient: 'from-red-500 to-red-600',
              lightBg: 'from-red-500/10 to-red-600/5',
              iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
              textColor: 'text-red-600',
              pulse: true
            },
            {
              title: 'Placements',
              value: placementAnnouncements.length,
              icon: Briefcase,
              bgGradient: 'from-[#006d77] to-[#83c5be]',
              lightBg: 'from-[#006d77]/10 to-[#83c5be]/5',
              iconBg: 'bg-gradient-to-br from-[#006d77] to-[#83c5be]',
              textColor: 'text-[#006d77]'
            },
            {
              title: 'Active',
              value: mockAnnouncements.filter(a => a.isActive).length,
              icon: TrendingUp,
              bgGradient: 'from-[#83c5be] to-[#006d77]',
              lightBg: 'from-[#83c5be]/10 to-[#006d77]/5',
              iconBg: 'bg-gradient-to-br from-[#83c5be] to-[#006d77]',
              textColor: 'text-[#83c5be]'
            },
            {
              title: 'This Week',
              value: mockAnnouncements.filter(a => {
                const weekFromNow = new Date();
                weekFromNow.setDate(weekFromNow.getDate() + 7);
                return a.deadline && a.deadline <= weekFromNow && a.isActive;
              }).length,
              icon: Calendar,
              bgGradient: 'from-[#e29578] to-[#ffddd2]',
              lightBg: 'from-[#e29578]/10 to-[#ffddd2]/5',
              iconBg: 'bg-gradient-to-br from-[#e29578] to-[#ffddd2]',
              textColor: 'text-[#e29578]'
            }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className={`group relative bg-white/98 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-[#83c5be]/20 hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#ffddd2]/40 to-[#e29578]/20 rounded-full blur-lg opacity-60 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10 flex items-center space-x-4">
                  <div className={`relative p-4 ${stat.iconBg} rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${stat.pulse ? 'animate-pulse' : ''}`}>
                    <IconComponent className="w-6 h-6 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
                    
                    {/* Floating particles around icon */}
                    <div className="absolute -top-1 -left-1 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
                    <div className="absolute -top-1 right-0 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '1.5s' }}></div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-bold text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">{stat.title}</p>
                    <p className={`text-3xl font-black ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#83c5be]/20 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stat.bgGradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ultra-Enhanced Search and Filters */}
        <div className="relative bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 mb-8 border border-[#83c5be]/20 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#ffddd2]/40 to-[#e29578]/20 rounded-full blur-2xl opacity-60"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#83c5be]/40 to-[#006d77]/20 rounded-full blur-xl opacity-60"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-black text-[#006d77]">Find Your Opportunities</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Enhanced Search Bar */}
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#83c5be] w-5 h-5 group-focus-within:text-[#006d77] transition-colors" />
                  <input
                    type="text"
                    placeholder="Search announcements, companies, skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl
                               focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] 
                               bg-white/90 backdrop-blur-xl shadow-lg hover:shadow-xl
                               transition-all duration-300 text-[#006d77] placeholder-[#83c5be]/60
                               font-medium"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#006d77]/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                </div>
              </div>

              {/* Enhanced Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-[#006d77] to-[#83c5be] text-white rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-bold overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Filter className="w-5 h-5 mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Smart Filters</span>
              </button>
            </div>

            {/* Ultra-Enhanced Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6`}>
              {/* Type Filter */}
              <div className="group">
                <label className="block text-sm font-black text-[#006d77] mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Announcement Type
                </label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-[#83c5be]/30 rounded-2xl
                               focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] 
                               bg-white/90 backdrop-blur-xl shadow-lg hover:shadow-xl
                               transition-all duration-300 text-[#006d77] font-medium
                               appearance-none cursor-pointer"
                  >
                    <option value="all">🌟 All Types</option>
                    <option value="placement">💼 Placements</option>
                    <option value="course">📚 Courses</option>
                    <option value="workshop">👥 Workshops</option>
                    <option value="exam">🎓 Examinations</option>
                    <option value="general">📢 General</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-[#83c5be] w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* Priority Filter */}
              <div className="group">
                <label className="block text-sm font-black text-[#006d77] mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Priority Level
                </label>
                <div className="relative">
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-[#83c5be]/30 rounded-2xl
                               focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] 
                               bg-white/90 backdrop-blur-xl shadow-lg hover:shadow-xl
                               transition-all duration-300 text-[#006d77] font-medium
                               appearance-none cursor-pointer"
                  >
                    <option value="all">⚡ All Priorities</option>
                    <option value="urgent">🚨 Urgent</option>
                    <option value="high">🔥 High</option>
                    <option value="medium">⭐ Medium</option>
                    <option value="low">💡 Low</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-[#83c5be] w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#83c5be] to-[#006d77] rounded-xl flex items-center justify-center shadow-lg">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <p className="text-[#006d77] font-bold">
              Showing <span className="font-black text-xl text-[#e29578]">{filteredAnnouncements.length}</span> announcements
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ffddd2]/50 to-[#e29578]/30 rounded-xl border border-[#e29578]/30">
            <CheckCircle className="w-4 h-4 text-[#006d77]" />
            <span className="text-sm font-bold text-[#006d77]">Live Updates</span>
          </div>
        </div>

        {/* Ultra-Enhanced Announcements List */}
        <div className="space-y-8">
          {filteredAnnouncements.map((announcement, index) => (
            <div 
              key={announcement.id} 
              className="group relative bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-[#83c5be]/20 hover:shadow-3xl transition-all duration-700 overflow-hidden hover:scale-[1.02] hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background decorations */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-[#ffddd2]/30 to-[#e29578]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#83c5be]/30 to-[#006d77]/15 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Priority stripe */}
              {announcement.priority === 'urgent' && (
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-red-400 to-red-500 animate-pulse"></div>
              )}
              
              <div className="relative p-8">
                {/* Enhanced Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-6 flex-1">
                    {/* Enhanced Icon */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 ${typeColors[announcement.type]} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <div className="text-2xl">
                          {getTypeIcon(announcement.type)}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                      </div>
                      
                      {/* Floating indicator */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#ffddd2] to-[#e29578] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>
                    
                    {/* Enhanced Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-2xl font-black text-[#006d77] group-hover:text-[#83c5be] transition-colors duration-300">
                              {announcement.title}
                            </h3>
                            {announcement.company && (
                              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#83c5be] to-[#006d77] text-white rounded-2xl shadow-lg">
                                <Building className="w-4 h-4" />
                                <span className="font-bold text-sm">{announcement.company}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-[#006d77]/80 text-lg leading-relaxed font-medium mb-4">
                            {announcement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Badges */}
                  <div className="flex flex-col items-end space-y-3 ml-4">
                    <div className={`px-4 py-2 rounded-2xl text-sm font-black shadow-lg ${typeColors[announcement.type]}`}>
                      {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl text-sm font-black border-2 ${priorityColors[announcement.priority]}`}>
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      {announcement.priority === 'urgent' && <Flame className="w-4 h-4 ml-1 inline animate-pulse" />}
                    </div>
                  </div>
                </div>

                {/* Enhanced Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center space-x-3 p-4 bg-[#83c5be]/10 rounded-2xl border border-[#83c5be]/20">
                    <Calendar className="w-5 h-5 text-[#006d77]" />
                    <div>
                      <p className="text-xs font-bold text-[#006d77]/60 uppercase">Posted</p>
                      <p className="text-sm font-black text-[#006d77]">{formatDate(announcement.date)}</p>
                    </div>
                  </div>
                  
                  {announcement.deadline && (
                    <div className="flex items-center space-x-3 p-4 bg-[#e29578]/10 rounded-2xl border border-[#e29578]/20">
                      <Clock4 className="w-5 h-5 text-[#e29578]" />
                      <div>
                        <p className="text-xs font-bold text-[#e29578]/60 uppercase">Deadline</p>
                        <p className="text-sm font-black text-[#e29578]">
                          {formatDate(announcement.deadline)}
                          {getDaysUntilDeadline(announcement.deadline) <= 3 && (
                            <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                              {getDaysUntilDeadline(announcement.deadline)} days
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {announcement.location && (
                    <div className="flex items-center space-x-3 p-4 bg-[#ffddd2]/30 rounded-2xl border border-[#ffddd2]/40">
                      <MapPinIcon className="w-5 h-5 text-[#006d77]" />
                      <div>
                        <p className="text-xs font-bold text-[#006d77]/60 uppercase">Location</p>
                        <p className="text-sm font-black text-[#006d77]">{announcement.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Eligibility & Requirements */}
                {(announcement.eligibility || announcement.requirements) && (
                  <div className="mb-6 space-y-4">
                    {announcement.eligibility && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-5 h-5 text-[#83c5be]" />
                          <h4 className="text-sm font-black text-[#006d77] uppercase tracking-wide">Eligibility Criteria</h4>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {announcement.eligibility.map((criteria, index) => (
                            <div key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#83c5be] to-[#006d77] text-white rounded-2xl shadow-lg font-bold text-sm">
                              <CheckCircle className="w-4 h-4" />
                              {criteria}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {announcement.requirements && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="w-5 h-5 text-[#e29578]" />
                          <h4 className="text-sm font-black text-[#006d77] uppercase tracking-wide">Requirements</h4>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {announcement.requirements.map((req, index) => (
                            <div key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#e29578] to-[#ffddd2] text-[#006d77] rounded-2xl shadow-lg font-black text-sm border border-[#e29578]/20">
                              <Zap className="w-4 h-4" />
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Enhanced Tags */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-[#006d77]" />
                    <h4 className="text-sm font-black text-[#006d77] uppercase tracking-wide">Tags</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {announcement.tags.map((tag, index) => (
                      <div key={index} className="inline-flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-[#ffddd2]/60 to-[#ffddd2]/40 text-[#006d77] rounded-xl font-bold text-sm border border-[#e29578]/20 hover:shadow-lg transition-shadow duration-300">
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-[#83c5be]/20">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-[#e29578]" />
                    <div>
                      <p className="text-xs font-bold text-[#006d77]/60 uppercase">Contact</p>
                      <p className="text-sm font-black text-[#006d77]">{announcement.contactInfo}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {announcement.type === 'placement' && announcement.applicationLink ? (
                      <Link
                        href={announcement.applicationLink}
                        className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#006d77] via-[#83c5be] to-[#006d77] text-white font-black text-sm rounded-2xl transition-all duration-500 hover:shadow-2xl transform hover:scale-105 overflow-hidden bg-[length:200%_100%] hover:bg-[position:100%_0]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative">Apply Now</span>
                        <ArrowRight className="w-5 h-5 relative group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    ) : (
                      <button className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#83c5be] to-[#006d77] text-white font-black text-sm rounded-2xl transition-all duration-500 hover:shadow-2xl transform hover:scale-105 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative">View Details</span>
                        <ExternalLink className="w-5 h-5 relative group-hover/btn:rotate-12 transition-transform duration-300" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced No Results */}
        {filteredAnnouncements.length === 0 && (
          <div className="relative bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-[#83c5be]/20 p-16 text-center overflow-hidden">
            {/* Background decorations */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#ffddd2]/20 to-[#e29578]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#83c5be]/20 to-[#006d77]/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#ffddd2] to-[#e29578] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Bell className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-black text-[#006d77] mb-4">No announcements found</h3>
              <p className="text-[#006d77]/70 text-lg font-medium mb-8 max-w-md mx-auto">
                Try adjusting your filters or search terms to discover more opportunities.
              </p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedPriority('all');
                  setSearchTerm('');
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#006d77] to-[#83c5be] text-white font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Bottom CTA */}
        <div className="mt-16 relative bg-gradient-to-br from-[#006d77] via-[#83c5be] to-[#006d77] rounded-3xl p-12 text-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#ffddd2]/30 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }}></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 mb-6">
              <Crown className="w-8 h-8 text-[#ffddd2]" />
              <span className="text-[#ffddd2] font-black text-lg tracking-wide">STAY AHEAD OF THE CURVE</span>
              <Crown className="w-8 h-8 text-[#ffddd2]" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Never Miss an Opportunity Again
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto font-medium">
              Get instant notifications for new placements, courses, and opportunities that match your interests.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-5 h-5" />
                <span className="font-bold">10K+ Active Students</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 fill-current text-[#ffddd2]" />
                <span className="font-bold">500+ Opportunities Weekly</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Target className="w-5 h-5" />
                <span className="font-bold">Real-time Updates</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#006d77] font-black text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <Bell className="w-6 h-6" />
              Enable Notifications
              <Sparkles className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}