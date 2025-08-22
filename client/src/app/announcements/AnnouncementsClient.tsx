"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
  Home
} from 'lucide-react';

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
  placement: 'bg-green-100 text-green-800',
  course: 'bg-blue-100 text-blue-800',
  workshop: 'bg-purple-100 text-purple-800',
  exam: 'bg-red-100 text-red-800',
  general: 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700'
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

export default function AnnouncementsClient() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  
  const [selectedType, setSelectedType] = useState(typeParam || 'all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Update selectedType when URL parameter changes
  useEffect(() => {
    if (typeParam && typeParam !== selectedType) {
      setSelectedType(typeParam);
    }
  }, [typeParam, selectedType]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                EduMitra
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Announcements</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {filteredAnnouncements.length} Active
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{urgentAnnouncements.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Placements</p>
                <p className="text-2xl font-bold text-green-600">{placementAnnouncements.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Active</p>
                <p className="text-2xl font-bold text-blue-600">{mockAnnouncements.filter(a => a.isActive).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">This Week</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockAnnouncements.filter(a => {
                    const weekFromNow = new Date();
                    weekFromNow.setDate(weekFromNow.getDate() + 7);
                    return a.deadline && a.deadline <= weekFromNow && a.isActive;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4`}>
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="placement">Placements</option>
                <option value="course">Courses</option>
                <option value="workshop">Workshops</option>
                <option value="exam">Examinations</option>
                <option value="general">General</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredAnnouncements.length}</span> announcements
          </p>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      {getTypeIcon(announcement.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
                        {announcement.company && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Building className="w-3 h-3 mr-1" />
                            {announcement.company}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{announcement.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[announcement.type]}`}>
                      {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[announcement.priority]}`}>
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Posted: {formatDate(announcement.date)}</span>
                  </div>
                  
                  {announcement.deadline && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        Deadline: {formatDate(announcement.deadline)}
                        {getDaysUntilDeadline(announcement.deadline) <= 3 && (
                          <span className="ml-1 text-red-600 font-medium">
                            ({getDaysUntilDeadline(announcement.deadline)} days left)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  
                  {announcement.location && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{announcement.location}</span>
                    </div>
                  )}
                </div>

                {/* Eligibility & Requirements */}
                {(announcement.eligibility || announcement.requirements) && (
                  <div className="mb-4">
                    {announcement.eligibility && (
                      <div className="mb-2">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Eligibility:</h4>
                        <div className="flex flex-wrap gap-1">
                          {announcement.eligibility.map((criteria, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {criteria}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {announcement.requirements && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Requirements:</h4>
                        <div className="flex flex-wrap gap-1">
                          {announcement.requirements.map((req, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {announcement.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Contact: {announcement.contactInfo}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {announcement.type === 'placement' && announcement.applicationLink ? (
                      <Link
                        href={announcement.applicationLink}
                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Apply Now
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    ) : (
                      <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        View Details
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
