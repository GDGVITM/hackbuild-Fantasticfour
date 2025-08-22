"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  BookOpen, 
  CheckSquare,
  Users,
  Briefcase,
  MessageSquare,
  FileText,
  Bell,
  PlusCircle,
  Monitor,
  GraduationCap,
  Building
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  bgColor: string;
  category: 'academic' | 'career' | 'assessment' | 'management';
}

const features: Feature[] = [
  // Academic Features
  {
    title: 'Resume Builder',
    description: 'Create professional resumes with our easy-to-use builder',
    href: '/resume-builder',
    icon: FileText,
    color: '#006d77',
    bgColor: '#edf6f9',
    category: 'career'
  },
  {
    title: 'Interview Resources',
    description: 'Access DSA sheets, courses, and interview preparation materials',
    href: '/interview-resources',
    icon: BookOpen,
    color: '#006d77',
    bgColor: '#edf6f9',
    category: 'career'
  },
  {
    title: 'Mock Interview',
    description: 'Practice interviews with AI-powered feedback and guidance',
    href: '/mock-interview',
    icon: MessageSquare,
    color: '#006d77',
    bgColor: '#edf6f9',
    category: 'career'
  },
  {
    title: 'Quiz Creator',
    description: 'Create and manage quizzes for your students',
    href: '/quiz-creator',
    icon: PlusCircle,
    color: '#047857',
    bgColor: '#f0fdf4',
    category: 'assessment'
  },
  {
    title: 'Course Registration',
    description: 'Register for courses and manage your academic schedule',
    href: '/CourseRegistration',
    icon: GraduationCap,
    color: '#006d77',
    bgColor: '#edf6f9',
    category: 'academic'
  },
  {
    title: 'Announcements',
    description: 'Stay updated with placement and course announcements',
    href: '/announcements',
    icon: Bell,
    color: '#ea580c',
    bgColor: '#fff7ed',
    category: 'management'
  },
  {
    title: 'Parent Dashboard',
    description: 'Monitor student progress and academic performance',
    href: '/parent-dashboard',
    icon: Users,
    color: '#047857',
    bgColor: '#f0fdf4',
    category: 'management'
  },
  {
    title: 'Community',
    description: 'Connect with peers and join study groups',
    href: '/community',
    icon: Users,
    color: '#7c3aed',
    bgColor: '#faf5ff',
    category: 'academic'
  },
  {
    title: 'Placement',
    description: 'Explore placement opportunities and apply to companies',
    href: '/placement',
    icon: Briefcase,
    color: '#dc2626',
    bgColor: '#fef2f2',
    category: 'career'
  }
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Features', icon: Monitor },
    { key: 'academic', label: 'Academic', icon: BookOpen },
    { key: 'career', label: 'Career', icon: Briefcase },
    { key: 'assessment', label: 'Assessment', icon: CheckSquare },
    { key: 'management', label: 'Management', icon: Building }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  return (
    <div className="min-h-screen relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #edf6f9 0%, #83c5be 50%, #006d77 100%)' }}>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 sm:p-3 md:p-40 -right-40 w-80 h-80 rounded-full opacity-20" 
             style={{ backgroundColor: '#ffddd2' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20" 
             style={{ backgroundColor: '#e29578' }}></div>
        <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full opacity-15" 
             style={{ backgroundColor: '#83c5be' }}></div>
        <div className="absolute top-2/3 -right-20 w-32 h-32 rounded-full opacity-10" 
             style={{ backgroundColor: '#ffddd2' }}></div>
      </div>

      {/* Header */}
      <header className="shadow-sm border-b border-opacity-20 relative z-10" 
              style={{ backgroundColor: '#ffddd2', borderColor: '#83c5be' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <Link href="/" className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: '#006d77' }}>
                EduMitra
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold" style={{ color: '#006d77' }}>Dashboard</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <Link href="/dashboard" className="flex items-center space-x-2 transition-colors hover:opacity-80" 
                      style={{ color: '#006d77' }}>
                  <Monitor className="w-4 h-4" />
                  <span>Student Dashboard</span>
                </Link>
                <Link href="/login" className="flex items-center space-x-2 transition-colors hover:opacity-80" 
                      style={{ color: '#006d77' }}>
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="rounded-xl shadow-sm border p-4 sm:p-6 md:p-8 mb-8"
             style={{ backgroundColor: '#ffddd2', borderColor: '#83c5be' }}>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 sm:mb-3 md:mb-4" style={{ color: '#006d77' }}>
              Welcome to EduMitra
            </h1>
            <p className="text-lg mb-3 sm:mb-4 md:mb-6" style={{ color: '#006d77', opacity: 0.8 }}>
              Your comprehensive education and career companion. Access all tools and resources in one place.
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#006d77' }}>{features.length}</div>
                <div className="text-sm" style={{ color: '#006d77', opacity: 0.8 }}>Available Tools</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#006d77' }}>24/7</div>
                <div className="text-sm" style={{ color: '#006d77', opacity: 0.8 }}>Access</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#006d77' }}>∞</div>
                <div className="text-sm" style={{ color: '#006d77', opacity: 0.8 }}>Possibilities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="rounded-xl shadow-sm border p-3 sm:p-4 md:p-6 mb-8"
             style={{ backgroundColor: '#ffddd2', borderColor: '#83c5be' }}>
          <h2 className="text-lg font-semibold mb-2 sm:mb-3 md:mb-4" style={{ color: '#006d77' }}>Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200"
                style={{
                  backgroundColor: selectedCategory === category.key ? '#006d77' : 'transparent',
                  borderColor: '#83c5be',
                  color: selectedCategory === category.key ? 'white' : '#006d77'
                }}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="rounded-xl shadow-sm border p-3 sm:p-4 md:p-6"
             style={{ backgroundColor: '#ffddd2', borderColor: '#83c5be' }}>
          <h2 className="text-xl font-semibold mb-3 sm:mb-4 md:mb-6" style={{ color: '#006d77' }}>
            {selectedCategory === 'all' ? 'All Features' : categories.find(c => c.key === selectedCategory)?.label}
            <span className="text-sm font-normal opacity-80 ml-2">({filteredFeatures.length} tools)</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:p-4 md:p-6">
            {filteredFeatures.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group block p-3 sm:p-4 md:p-6 rounded-xl border transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: feature.bgColor, 
                  borderColor: '#d1d5db'
                }}
              >
                <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: feature.color + '20' }}
                  >
                    <feature.icon 
                      className="w-6 h-6" 
                      style={{ color: feature.color }} 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity" 
                        style={{ color: feature.color }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed" 
                       style={{ color: feature.color, opacity: 0.8 }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <span className="text-xs font-medium px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: feature.color + '20', 
                          color: feature.color 
                        }}>
                    {feature.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:p-3 md:p-4">
          <Link 
            href="/quiz-creator"
            className="p-2 sm:p-3 md:p-4 rounded-lg border transition-colors hover:opacity-80"
            style={{ backgroundColor: '#047857', borderColor: '#065f46' }}
          >
            <div className="flex items-center space-x-3">
              <PlusCircle className="w-5 h-5 text-white" />
              <div>
                <div className="font-medium text-white">Create Quiz</div>
                <div className="text-xs text-white opacity-80">Build assessments</div>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/resume-builder"
            className="p-2 sm:p-3 md:p-4 rounded-lg border transition-colors hover:opacity-80"
            style={{ backgroundColor: '#006d77', borderColor: '#005a63' }}
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-white" />
              <div>
                <div className="font-medium text-white">Build Resume</div>
                <div className="text-xs text-white opacity-80">Career ready</div>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/mock-interview"
            className="p-2 sm:p-3 md:p-4 rounded-lg border transition-colors hover:opacity-80"
            style={{ backgroundColor: '#7c3aed', borderColor: '#6d28d9' }}
          >
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-white" />
              <div>
                <div className="font-medium text-white">Practice Interview</div>
                <div className="text-xs text-white opacity-80">Get feedback</div>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/parent-dashboard"
            className="p-2 sm:p-3 md:p-4 rounded-lg border transition-colors hover:opacity-80"
            style={{ backgroundColor: '#dc2626', borderColor: '#b91c1c' }}
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-white" />
              <div>
                <div className="font-medium text-white">Parent View</div>
                <div className="text-xs text-white opacity-80">Track progress</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
