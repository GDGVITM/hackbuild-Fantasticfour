"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ResumeData, SectionType } from './types';
import { sampleResumeData } from './sampleData';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { downloadPDF } from './utils';

export default function TestResumePage() {
  const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
  const [activeSection, setActiveSection] = useState<SectionType>('personal');

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
              <h1 className="text-xl font-semibold text-gray-900">Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✨ New & Improved
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
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Resume Builder</h2>
              <p className="text-gray-600 mb-4">
                Create stunning professional resumes with our intuitive form-based editor. Edit your resume data and see real-time changes in the A4 preview format. Export as PDF when ready.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Form-Based Editor
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  A4 Preview
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  PDF Export
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Mobile Optimized
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveView('edit')}
              className={`flex-1 py-4 px-6 text-center font-medium rounded-l-xl transition-colors ${
                activeView === 'edit'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              ✏️ Edit Resume
            </button>
            <button
              onClick={() => setActiveView('preview')}
              className={`flex-1 py-4 px-6 text-center font-medium rounded-r-xl transition-colors ${
                activeView === 'preview'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              👁️ Preview
            </button>
          </div>
        </div>

        {/* Content */}
        {activeView === 'edit' ? (
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
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Resume Preview</h3>
              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={async () => await downloadPDF(resumeData)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <span>📥</span>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
            
            <div className="w-full overflow-x-auto overflow-y-auto">
              <div className="flex justify-center min-w-full">
                <div className="transform scale-75 sm:scale-90 lg:scale-100 origin-center w-full max-w-none" style={{ marginTop: '-5%', marginBottom: '-5%' }}>
                  <ResumePreview resumeData={resumeData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
