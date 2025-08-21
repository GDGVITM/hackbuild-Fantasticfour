"use client";

import { useState } from 'react';
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
  Filter
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
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Course':
      return 'bg-blue-100 text-blue-800';
    case 'Practice':
      return 'bg-purple-100 text-purple-800';
    case 'Sheet':
      return 'bg-orange-100 text-orange-800';
    case 'Book':
      return 'bg-indigo-100 text-indigo-800';
    case 'Video':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function InterviewResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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
              <h1 className="text-xl font-semibold text-gray-900">Interview Resources</h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✨ Multi-Branch Support
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Resources Hub</h2>
              <p className="text-gray-600 mb-4">
                Comprehensive collection of interview preparation resources for all engineering branches. From DSA sheets for CS students to core engineering concepts for Mechanical, Electrical, Civil, and Chemical engineers.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Code className="w-3 h-3 mr-1" />
                  DSA & Coding
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Wrench className="w-3 h-3 mr-1" />
                  Core Engineering
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <Calculator className="w-3 h-3 mr-1" />
                  Aptitude & Reasoning
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <FileText className="w-3 h-3 mr-1" />
                  Practice Sheets
                </span>
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
                  placeholder="Search resources..."
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
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Branch Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredResources.length}</span> resources
            {searchTerm && (
              <span> for &ldquo;<span className="font-semibold">{searchTerm}</span>&rdquo;</span>
            )}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getCategoryIcon(resource.category)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{resource.title}</h3>
                      <div className="flex items-center space-x-2">
                        {getBranchIcon(resource.branch[0])}
                        <span className="text-sm text-gray-600">{resource.branch.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {resource.category}
                  </span>
                </div>

                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Access Resource</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{resources.filter(r => r.category === 'DSA').length}</div>
            <div className="text-sm text-gray-600">DSA Resources</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{resources.filter(r => r.category === 'Core Engineering').length}</div>
            <div className="text-sm text-gray-600">Core Engineering</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">{resources.filter(r => r.type === 'Practice').length}</div>
            <div className="text-sm text-gray-600">Practice Resources</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">{new Set(resources.flatMap(r => r.branch)).size - 1}</div>
            <div className="text-sm text-gray-600">Engineering Branches</div>
          </div>
        </div>
      </div>
    </div>
  );
}
