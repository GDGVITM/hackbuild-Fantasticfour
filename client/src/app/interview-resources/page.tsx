"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Code, 
  Cpu, 
  Zap, 
  Wrench, 
  Building, 
  Globe, 
  Calculator,
  Database,
  Monitor,
  FileText,
  ExternalLink,
  Search,
  Filter,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  branch: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Course' | 'Practice' | 'Sheet' | 'Book' | 'Video';
}

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
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

  return <span>{count}</span>;
};

const resources: Resource[] = [
  // Computer Science & IT Resources
  {
    id: '1',
    title: 'Striver\'s SDE Sheet',
    description: 'Comprehensive 180+ problems for coding interviews covering all important DSA topics',
    link: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems',
    category: 'DSA',
    branch: ['Computer Science', 'Information Technology'],
    difficulty: 'Intermediate',
    type: 'Sheet'
  },
  {
    id: '2',
    title: 'Love Babbar DSA Sheet',
    description: '450+ curated problems for complete DSA preparation',
    link: 'https://drive.google.com/file/d/1FMdN_OCfOI0iAeDlqswCiC2DZzD4nPsb/view',
    category: 'DSA',
    branch: ['Computer Science', 'Information Technology'],
    difficulty: 'Beginner',
    type: 'Sheet'
  },
  {
    id: '3',
    title: 'LeetCode Top Interview Questions',
    description: 'Most frequently asked coding problems in tech interviews',
    link: 'https://leetcode.com/problem-list/top-interview-questions/',
    category: 'DSA',
    branch: ['Computer Science', 'Information Technology'],
    difficulty: 'Intermediate',
    type: 'Practice'
  },
  {
    id: '4',
    title: 'GeeksforGeeks DSA Course',
    description: 'Complete data structures and algorithms course with practice problems',
    link: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/',
    category: 'DSA',
    branch: ['Computer Science', 'Information Technology'],
    difficulty: 'Beginner',
    type: 'Course'
  },
  {
    id: '5',
    title: 'System Design Primer',
    description: 'Learn how to design large-scale systems. Prep for system design interviews',
    link: 'https://github.com/donnemartin/system-design-primer',
    category: 'System Design',
    branch: ['Computer Science', 'Information Technology'],
    difficulty: 'Advanced',
    type: 'Course'
  },
  {
    id: '6',
    title: 'Operating Systems Concepts',
    description: 'Comprehensive guide to operating system fundamentals',
    link: 'https://www.os-book.com/OS10/',
    category: 'Computer Fundamentals',
    branch: ['Computer Science', 'Information Technology'],
    difficulty: 'Intermediate',
    type: 'Book'
  },
  {
    id: '7',
    title: 'Database Management Systems',
    description: 'Complete DBMS concepts for technical interviews',
    link: 'https://www.geeksforgeeks.org/dbms/',
    category: 'Computer Fundamentals',
    branch: ['Computer Science', 'Information Technology'],
    difficulty: 'Intermediate',
    type: 'Course'
  },
  {
    id: '8',
    title: 'Computer Networks',
    description: 'Networking fundamentals and protocols',
    link: 'https://www.geeksforgeeks.org/computer-network-tutorials/',
    category: 'Computer Fundamentals',
    branch: ['Computer Science', 'Information Technology'],
    difficulty: 'Intermediate',
    type: 'Course'
  },

  // Electrical Engineering Resources
  {
    id: '9',
    title: 'GATE Electrical Engineering Preparation',
    description: 'Complete syllabus coverage for GATE EE with practice tests',
    link: 'https://testbook.com/gate/electrical-engineering',
    category: 'Core Engineering',
    branch: ['Electrical Engineering'],
    difficulty: 'Advanced',
    type: 'Course'
  },
  {
    id: '10',
    title: 'Circuit Analysis Fundamentals',
    description: 'Basic and advanced circuit analysis techniques',
    link: 'https://www.allaboutcircuits.com/',
    category: 'Core Engineering',
    branch: ['Electrical Engineering'],
    difficulty: 'Beginner',
    type: 'Course'
  },
  {
    id: '11',
    title: 'Power Systems Interview Questions',
    description: '200+ power system engineering interview questions',
    link: 'https://www.sanfoundry.com/electrical-engineering-questions-answers/',
    category: 'Core Engineering',
    branch: ['Electrical Engineering'],
    difficulty: 'Intermediate',
    type: 'Practice'
  },
  {
    id: '12',
    title: 'Control Systems Made Easy',
    description: 'Complete guide to control systems theory and applications',
    link: 'https://www.electrical4u.com/control-system/',
    category: 'Core Engineering',
    branch: ['Electrical Engineering'],
    difficulty: 'Intermediate',
    type: 'Course'
  },

  // Mechanical Engineering Resources
  {
    id: '13',
    title: 'GATE Mechanical Engineering',
    description: 'Comprehensive preparation for GATE ME examination',
    link: 'https://testbook.com/gate/mechanical-engineering',
    category: 'Core Engineering',
    branch: ['Mechanical Engineering'],
    difficulty: 'Advanced',
    type: 'Course'
  },
  {
    id: '14',
    title: 'Thermodynamics Concepts',
    description: 'Complete thermodynamics for engineering interviews',
    link: 'https://www.mechanical.com/thermodynamics/',
    category: 'Core Engineering',
    branch: ['Mechanical Engineering'],
    difficulty: 'Intermediate',
    type: 'Course'
  },
  {
    id: '15',
    title: 'Fluid Mechanics Interview Prep',
    description: 'Essential fluid mechanics questions for interviews',
    link: 'https://www.sanfoundry.com/mechanical-engineering-questions-answers/',
    category: 'Core Engineering',
    branch: ['Mechanical Engineering'],
    difficulty: 'Intermediate',
    type: 'Practice'
  },
  {
    id: '16',
    title: 'Manufacturing Processes',
    description: 'Complete guide to manufacturing and production engineering',
    link: 'https://www.manufacturinget.org/',
    category: 'Core Engineering',
    branch: ['Mechanical Engineering'],
    difficulty: 'Intermediate',
    type: 'Course'
  },

  // Civil Engineering Resources
  {
    id: '17',
    title: 'GATE Civil Engineering',
    description: 'Complete GATE CE preparation with mock tests',
    link: 'https://testbook.com/gate/civil-engineering',
    category: 'Core Engineering',
    branch: ['Civil Engineering'],
    difficulty: 'Advanced',
    type: 'Course'
  },
  {
    id: '18',
    title: 'Structural Analysis Fundamentals',
    description: 'Basic to advanced structural analysis concepts',
    link: 'https://www.civilengineeringx.com/structural-analysis/',
    category: 'Core Engineering',
    branch: ['Civil Engineering'],
    difficulty: 'Intermediate',
    type: 'Course'
  },
  {
    id: '19',
    title: 'Concrete Technology',
    description: 'Complete guide to concrete materials and design',
    link: 'https://www.cement.org/concrete-technology',
    category: 'Core Engineering',
    branch: ['Civil Engineering'],
    difficulty: 'Intermediate',
    type: 'Course'
  },

  // Chemical Engineering Resources
  {
    id: '20',
    title: 'Chemical Engineering Basics',
    description: 'Fundamental concepts for chemical engineering interviews',
    link: 'https://www.chemicalengineeringworld.com/',
    category: 'Core Engineering',
    branch: ['Chemical Engineering'],
    difficulty: 'Beginner',
    type: 'Course'
  },
  {
    id: '21',
    title: 'Process Control & Instrumentation',
    description: 'Essential process control concepts for interviews',
    link: 'https://instrumentationtools.com/',
    category: 'Core Engineering',
    branch: ['Chemical Engineering'],
    difficulty: 'Intermediate',
    type: 'Course'
  },

  // General Engineering & Aptitude
  {
    id: '22',
    title: 'Engineering Mathematics',
    description: 'Complete mathematics for all engineering branches',
    link: 'https://www.khanacademy.org/math',
    category: 'General',
    branch: ['All Branches'],
    difficulty: 'Beginner',
    type: 'Course'
  },
  {
    id: '23',
    title: 'Quantitative Aptitude for Engineers',
    description: 'Math and reasoning for technical interviews',
    link: 'https://www.indiabix.com/aptitude/questions-and-answers/',
    category: 'Aptitude',
    branch: ['All Branches'],
    difficulty: 'Beginner',
    type: 'Practice'
  },
  {
    id: '24',
    title: 'Technical Communication Skills',
    description: 'Improve your technical presentation and communication',
    link: 'https://www.coursera.org/learn/technical-writing',
    category: 'Soft Skills',
    branch: ['All Branches'],
    difficulty: 'Beginner',
    type: 'Course'
  },
  {
    id: '25',
    title: 'Project Management for Engineers',
    description: 'Essential project management skills for technical roles',
    link: 'https://www.pmi.org/learning/training-development',
    category: 'Soft Skills',
    branch: ['All Branches'],
    difficulty: 'Intermediate',
    type: 'Course'
  }
];

const categories = ['All', 'DSA', 'System Design', 'Computer Fundamentals', 'Core Engineering', 'General', 'Aptitude', 'Soft Skills'];
const branches = ['All Branches', 'Computer Science', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const types = ['All', 'Course', 'Practice', 'Sheet', 'Book', 'Video'];

const getBranchIcon = (branch: string) => {
  switch (branch) {
    case 'Computer Science':
    case 'Information Technology':
      return <Monitor className="w-5 h-5" />;
    case 'Electrical Engineering':
      return <Zap className="w-5 h-5" />;
    case 'Mechanical Engineering':
      return <Wrench className="w-5 h-5" />;
    case 'Civil Engineering':
      return <Building className="w-5 h-5" />;
    case 'Chemical Engineering':
      return <Globe className="w-5 h-5" />;
    default:
      return <BookOpen className="w-5 h-5" />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'DSA':
      return <Code className="w-5 h-5" />;
    case 'System Design':
      return <Cpu className="w-5 h-5" />;
    case 'Computer Fundamentals':
      return <Database className="w-5 h-5" />;
    case 'Core Engineering':
      return <Wrench className="w-5 h-5" />;
    case 'Aptitude':
      return <Calculator className="w-5 h-5" />;
    default:
      return <BookOpen className="w-5 h-5" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'text-white';
    case 'Intermediate':
      return 'text-white';
    case 'Advanced':
      return 'text-white';
    default:
      return 'text-white';
  }
};

const getDifficultyBg = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return '#83c5be';
    case 'Intermediate':
      return '#e29578';
    case 'Advanced':
      return '#006d77';
    default:
      return '#83c5be';
  }
};

const getTypeColor = (type: string) => {
  return 'text-white';
};

const getTypeBg = (type: string) => {
  switch (type) {
    case 'Course':
      return '#006d77';
    case 'Practice':
      return '#83c5be';
    case 'Sheet':
      return '#e29578';
    case 'Book':
      return '#ffddd2';
    case 'Video':
      return '#83c5be';
    default:
      return '#83c5be';
  }
};

export default function InterviewResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesBranch = selectedBranch === 'All Branches' || resource.branch.includes(selectedBranch);
    const matchesDifficulty = selectedDifficulty === 'All' || resource.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesBranch && matchesDifficulty && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#edf6f9' }}>
      {/* Enhanced Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, #006d77 0%, transparent 70%)',
               animation: 'float 8s ease-in-out infinite'
             }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-8 animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, #83c5be 0%, transparent 70%)',
               animation: 'float 10s ease-in-out infinite reverse'
             }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
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
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 20%, #83c5be15 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, #e2957815 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, #006d7715 0%, transparent 50%),
                 radial-gradient(circle at 20% 80%, #ffddd215 0%, transparent 50%)
               `
             }}></div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 109, 119, 0.2);
        }
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Enhanced Header */}
      <header className="shadow-2xl backdrop-blur-lg border-b relative z-10" 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'rgba(131, 197, 190, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 109, 119, 0.15)'
              }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-3xl font-bold tracking-tight flex items-center space-x-3 group" style={{ color: '#006d77' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shimmer-effect"
                     style={{ background: 'linear-gradient(135deg, #006d77, #83c5be)' }}>
                  <Star className="w-7 h-7 text-white" />
                </div>
                <span>EduMitra</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold" style={{ color: '#006d77' }}>Interview Resources</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg animate-pulse"
                    style={{ backgroundColor: '#83c5be' }}>
                <Award className="w-4 h-4 mr-2" />
                Multi-Branch Support
              </span> */}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Introduction */}
        <div className={`rounded-3xl shadow-2xl p-8 mb-8 backdrop-blur-lg card-hover relative overflow-hidden ${isLoaded ? 'animate-slideIn' : ''}`}
             style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.95)',
               borderColor: 'rgba(131, 197, 190, 0.3)',
               animation: isLoaded ? 'slideIn 0.8s ease-out' : 'none'
             }}>
          {/* Gradient overlay */}
          <div className="absolute inset-0 opacity-30"
               style={{
                 background: 'linear-gradient(135deg, rgba(131, 197, 190, 0.1), rgba(0, 109, 119, 0.1))'
               }}></div>
          
          <div className="flex items-start space-x-6 relative z-10">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl shimmer-effect"
                   style={{ background: 'linear-gradient(135deg, #83c5be, #006d77)' }}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: '#006d77' }}>Interview Resources Hub</h2>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#83c5be' }}>
                Comprehensive collection of interview preparation resources for all engineering branches. From DSA sheets for CS students to core engineering concepts for Mechanical, Electrical, Civil, and Chemical engineers.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Code, label: 'DSA & Coding', bg: '#006d77' },
                  { icon: Wrench, label: 'Core Engineering', bg: '#83c5be' },
                  { icon: Calculator, label: 'Aptitude & Reasoning', bg: '#e29578' },
                  { icon: FileText, label: 'Practice Sheets', bg: '#ffddd2' }
                ].map((item, index) => (
                  <span key={index} 
                        className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: item.bg }}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="rounded-3xl shadow-xl p-8 mb-8 backdrop-blur-lg card-hover"
             style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.95)',
               borderColor: 'rgba(131, 197, 190, 0.3)'
             }}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Enhanced Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                        style={{ color: '#83c5be' }} />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-lg font-medium transition-all duration-300 focus:scale-105 focus:shadow-xl"
                  style={{ 
                    backgroundColor: 'rgba(131, 197, 190, 0.1)',
                    border: '2px solid rgba(131, 197, 190, 0.3)',
                    color: '#006d77'
                  }}
                />
              </div>
            </div>

            {/* Enhanced Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-6 py-4 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#006d77' }}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Enhanced Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}>
            {[
              { label: 'Category', value: selectedCategory, setValue: setSelectedCategory, options: categories },
              { label: 'Branch', value: selectedBranch, setValue: setSelectedBranch, options: branches },
              { label: 'Difficulty', value: selectedDifficulty, setValue: setSelectedDifficulty, options: difficulties },
              { label: 'Type', value: selectedType, setValue: setSelectedType, options: types }
            ].map((filter, index) => (
              <div key={index}>
                <label className="block text-sm font-bold mb-3" style={{ color: '#006d77' }}>
                  {filter.label}
                </label>
                <select
                  value={filter.value}
                  onChange={(e) => filter.setValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 focus:scale-105 focus:shadow-lg"
                  style={{ 
                    backgroundColor: 'rgba(131, 197, 190, 0.1)',
                    border: '2px solid rgba(131, 197, 190, 0.3)',
                    color: '#006d77'
                  }}
                >
                  {filter.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Results Count */}
        <div className="mb-8">
          <div className="inline-flex items-center px-6 py-3 rounded-2xl shadow-lg"
               style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <TrendingUp className="w-5 h-5 mr-2" style={{ color: '#83c5be' }} />
            <p className="font-semibold" style={{ color: '#006d77' }}>
              Showing <span className="text-xl font-bold">{filteredResources.length}</span> resources
              {searchTerm && (
                <span> for &ldquo;<span className="font-bold">{searchTerm}</span>&rdquo;</span>
              )}
            </p>
          </div>
        </div>

        {/* Enhanced Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => (
            <div key={resource.id} 
                 className="rounded-3xl shadow-xl border backdrop-blur-lg card-hover relative overflow-hidden"
                 style={{ 
                   backgroundColor: 'rgba(255, 255, 255, 0.95)',
                   borderColor: 'rgba(131, 197, 190, 0.3)',
                   animation: `slideIn 0.6s ease-out ${index * 0.05}s both`
                 }}>
              {/* Gradient overlay */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-80"
                   style={{
                     background: `linear-gradient(90deg, ${getDifficultyBg(resource.difficulty)}, ${getTypeBg(resource.type)})`
                   }}></div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-2xl shadow-lg shimmer-effect"
                         style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)' }}>
                      <div style={{ color: '#006d77' }}>
                        {getCategoryIcon(resource.category)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 tracking-tight" style={{ color: '#006d77' }}>
                        {resource.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div style={{ color: '#83c5be' }}>
                          {getBranchIcon(resource.branch[0])}
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#83c5be' }}>
                          {resource.branch.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-base mb-6 leading-relaxed line-clamp-3" style={{ color: '#83c5be' }}>
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-2 rounded-xl text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: getDifficultyBg(resource.difficulty),
                          color: getDifficultyColor(resource.difficulty)
                        }}>
                    {resource.difficulty}
                  </span>
                  <span className="px-3 py-2 rounded-xl text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: getTypeBg(resource.type),
                          color: getTypeColor(resource.type)
                        }}>
                    {resource.type}
                  </span>
                  <span className="px-3 py-2 rounded-xl text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: 'rgba(131, 197, 190, 0.2)', color: '#006d77' }}>
                    {resource.category}
                  </span>
                </div>

                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 shimmer-effect"
                  style={{ backgroundColor: '#006d77' }}
                >
                  <span>Access Resource</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shimmer-effect"
                 style={{ background: 'linear-gradient(135deg, #83c5be, #006d77)' }}>
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#006d77' }}>No resources found</h3>
            <p className="text-lg" style={{ color: '#83c5be' }}>Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Enhanced Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              count: resources.filter(r => r.category === 'DSA').length,
              label: 'DSA Resources',
              color: '#006d77',
              icon: Code
            },
            {
              count: resources.filter(r => r.category === 'Core Engineering').length,
              label: 'Core Engineering',
              color: '#83c5be',
              icon: Wrench
            },
            {
              count: resources.filter(r => r.type === 'Practice').length,
              label: 'Practice Resources',
              color: '#e29578',
              icon: TrendingUp
            },
            {
              count: new Set(resources.flatMap(r => r.branch)).size - 1,
              label: 'Engineering Branches',
              color: '#ffddd2',
              icon: Award
            }
          ].map((stat, index) => (
            <div key={index} 
                 className="rounded-3xl shadow-xl p-6 text-center card-hover backdrop-blur-lg relative overflow-hidden"
                 style={{ 
                   backgroundColor: 'rgba(255, 255, 255, 0.95)',
                   borderColor: 'rgba(131, 197, 190, 0.3)',
                   animation: `slideIn 0.8s ease-out ${index * 0.1}s both`
                 }}>
              {/* Background gradient */}
              <div className="absolute inset-0 opacity-10"
                   style={{
                     background: `linear-gradient(135deg, ${stat.color}40, transparent)`
                   }}></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shimmer-effect"
                     style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                </div>
                <div className="text-4xl font-bold mb-2" 
                     style={{ color: stat.color === '#ffddd2' ? '#006d77' : stat.color }}>
                  <AnimatedCounter end={stat.count} duration={2000} />
                </div>
                <div className="text-sm font-semibold" style={{ color: '#83c5be' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlight Section */}
        <div className="mt-16 rounded-3xl shadow-2xl p-8 backdrop-blur-lg card-hover relative overflow-hidden"
             style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.95)',
               borderColor: 'rgba(131, 197, 190, 0.3)'
             }}>
          {/* Animated background */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: '#006d77',
                  left: `${(i * 3.33) % 100}%`,
                  top: `${20 + Math.sin(i * 0.5) * 30}%`,
                  animation: `float ${3 + i * 0.1}s ease-in-out infinite`,
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl shimmer-effect"
                 style={{ background: 'linear-gradient(135deg, #006d77, #83c5be)' }}>
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#006d77' }}>
              Curated by Industry Experts
            </h3>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#83c5be' }}>
              All resources are carefully selected and verified by professionals working in top tech companies and engineering firms. 
              Stay ahead with the most relevant and up-to-date interview preparation materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}