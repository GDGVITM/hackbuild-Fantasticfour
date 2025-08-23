"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ResumeData, SectionType } from './types';
import { sampleResumeData } from './sampleData';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import dynamic from 'next/dynamic';
const PreviewButtonWithModal = dynamic(() => import('./PreviewButtonWithModal'), { ssr: false });
import { downloadPDF } from './utils';
import { 
  FileText, 
  Download, 
  Edit3, 
  Eye, 
  Sparkles, 
  Layout, 
  FileCheck, 
  Menu,
  X,
  Home,
  Crown,
  Shield,
  Rocket
} from 'lucide-react';

// Color scheme constants
const COLORS = {
  primary: '#006d77',
  primaryLight: '#83c5be',
  secondary: '#edf6f9',
  accent: '#ffddd2',
  coral: '#e29578',
  white: '#ffffff'
};

export default function TestResumePage() {
  const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
  const [activeSection, setActiveSection] = useState<SectionType>('personal');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateResumeData = (section: string, data: unknown) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (index: number, field: string, value: unknown) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (index: number, field: string, value: unknown) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const features = [
    {
      title: "AI-Powered",
      description: "Smart content suggestions for your industry",
      icon: Sparkles,
      color: COLORS.primary
    },
    {
      title: "ATS-Ready",
      description: "Pass screening systems effortlessly",
      icon: Shield,
      color: COLORS.primaryLight
    },
    {
      title: "Instant Export",
      description: "Perfect PDF formatting every time",
      icon: Rocket,
      color: COLORS.coral
    }
  ];

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
              <Crown className="w-4 h-4 text-[#006d77]" />
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

        {/* Title */}
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Resume Builder</h2>
          <p className="text-xs text-white/70">Professional • ATS-Ready</p>
        </div>

        {/* View Toggle - Mobile First */}
        <div className="p-4">
          <div className="space-y-2">
            <button
              onClick={() => {
                setActiveView('edit');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeView === 'edit'
                  ? 'bg-[#83c5be] text-[#006d77]'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center mr-3">
                <Edit3 className="w-5 h-5" />
              </div>
              Edit Resume
            </button>
            
            <button
              onClick={() => {
                setActiveView('preview');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeView === 'preview'
                  ? 'bg-[#83c5be] text-[#006d77]'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center mr-3">
                <Eye className="w-5 h-5" />
              </div>
              Preview & Download
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="px-4">
          <h3 className="text-sm font-semibold text-white/90 mb-3">Features</h3>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="p-3 bg-white/10 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                       style={{ backgroundColor: `${feature.color}40` }}>
                    <feature.icon className="w-3 h-3" style={{ color: feature.color }} />
                  </div>
                  <span className="font-medium text-white text-sm">{feature.title}</span>
                </div>
                <p className="text-xs text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile-First Header */}
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
                  <h1 className="text-lg font-bold text-[#006d77]">Resume Builder</h1>
                  <p className="text-xs text-[#83c5be]">
                    {activeView === 'edit' ? 'Edit Your Resume' : 'Preview & Download'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {activeView === 'preview' && (
                  <button
                    onClick={async () => await downloadPDF(resumeData)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#006d77] text-white rounded-lg font-medium text-sm hover:bg-[#006d77]/90"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                )}
                
                <Link
                  href="/"
                  className="p-2 text-[#83c5be] hover:bg-[#edf6f9] rounded-lg"
                >
                  <Home className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {activeView === 'edit' ? (
            <div className="p-4">
              {/* Welcome Message - Mobile Optimized */}
              <div className="bg-white rounded-2xl p-6 mb-6 border border-[#83c5be]/20">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-[#006d77] mb-2">Build Your Perfect Resume</h2>
                  <p className="text-[#83c5be] text-sm">
                    Fill in your details below to create a professional, ATS-optimized resume
                  </p>
                </div>

                {/* Quick Features */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center p-3 bg-[#edf6f9] rounded-xl">
                      <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
                           style={{ backgroundColor: `${feature.color}20` }}>
                        <feature.icon className="w-4 h-4" style={{ color: feature.color }} />
                      </div>
                      <span className="text-xs font-medium text-[#006d77]">{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Form */}
              <div className="bg-white rounded-2xl border border-[#83c5be]/20">
                <ResumeForm
                  resumeData={resumeData}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  updateResumeData={updateResumeData}
                  updatePersonalInfo={updatePersonalInfo}
                  addExperience={addExperience}
                  updateExperience={updateExperience}
                  removeExperience={removeExperience}
                  addProject={addProject}
                  updateProject={updateProject}
                  removeProject={removeProject}
                />
              </div>
            </div>
          ) : (
            <div className="p-4">
              {/* Preview Header */}
              <div className="bg-white rounded-2xl p-6 mb-6 border border-[#83c5be]/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-2xl flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#006d77] mb-1">Resume Preview</h2>
                    <p className="text-[#83c5be] text-sm">Your professional resume is ready!</p>
                  </div>
                </div>

                {/* Mobile Download Button */}
                <button
                  onClick={async () => await downloadPDF(resumeData)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#006d77] to-[#83c5be] text-white rounded-xl font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Resume
                </button>

                {/* Resume Stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-3 bg-[#edf6f9] rounded-xl">
                    <div className="text-lg font-bold text-[#006d77]">A4</div>
                    <div className="text-xs text-[#83c5be]">Format</div>
                  </div>
                  <div className="text-center p-3 bg-[#edf6f9] rounded-xl">
                    <div className="text-lg font-bold text-[#006d77]">ATS</div>
                    <div className="text-xs text-[#83c5be]">Optimized</div>
                  </div>
                  <div className="text-center p-3 bg-[#edf6f9] rounded-xl">
                    <div className="text-lg font-bold text-[#006d77]">PDF</div>
                    <div className="text-xs text-[#83c5be]">Ready</div>
                  </div>
                </div>
              </div>

              {/* Resume Preview - Mobile Optimized */}
              <div className="bg-white rounded-2xl p-2 sm:p-4 border border-[#83c5be]/20 overflow-hidden h-130">
                <div className="w-full overflow-hidden">
                  <div 
                    className="transform origin-top-left"
                    style={{ 
                      scale: '0.45',
                      width: '210mm',
                      height: 'fit-content'
                    }}
                  >
                    <ResumePreview resumeData={resumeData} />
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="mt-6 p-6 bg-gradient-to-r from-[#006d77]/10 to-[#83c5be]/10 rounded-2xl border border-[#83c5be]/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#006d77] mb-2">Resume Ready!</h3>
                <p className="text-[#83c5be] text-sm mb-4">
                  Your professional resume is optimized and ready to help you land your dream job.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setActiveView('edit')}
                    className="px-6 py-3 border-2 border-[#006d77] text-[#006d77] rounded-xl font-medium hover:bg-[#006d77] hover:text-white transition-colors"
                  >
                    Edit More
                  </button>
                  <button
                    onClick={async () => await downloadPDF(resumeData)}
                    className="px-6 py-3 bg-[#006d77] text-white rounded-xl font-medium hover:bg-[#006d77]/90"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
