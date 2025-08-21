"use client";

import { useState } from 'react';
import Link from 'next/link';
import SkillMatcher from './SkillMatcher';
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign,
  CheckCircle,
  Upload,
  FileText,
  User,
  GraduationCap,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface PlacementDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  salary: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  applicationDeadline: Date;
  contactEmail: string;
}

interface PlacementApplicationFormProps {
  placementData: PlacementDetails;
}

export default function PlacementApplicationForm({ placementData }: PlacementApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSkillMatcher, setShowSkillMatcher] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      studentId: '',
      branch: '',
      year: '',
      cgpa: ''
    },
    documents: {
      resume: null as File | null,
      coverLetter: null as File | null,
      transcript: null as File | null,
      portfolio: ''
    },
    experience: {
      internships: '',
      projects: '',
      skills: '',
      achievements: ''
    },
    motivation: {
      whyCompany: '',
      careerGoals: '',
      additionalInfo: ''
    }
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Here you would submit the application
    alert('Application submitted successfully! You will receive a confirmation email shortly.');
  };

  const getDaysUntilDeadline = () => {
    const now = new Date();
    const diffTime = placementData.applicationDeadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Documents', icon: FileText },
    { number: 3, title: 'Experience', icon: GraduationCap },
    { number: 4, title: 'Review & Submit', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile-First Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-16">
            <div className="flex items-center">
              <Link href="/announcements" className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base">Back</span>
              </Link>
            </div>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                getDaysUntilDeadline() <= 3 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                <Clock className="w-3 h-3 mr-1" />
                {getDaysUntilDeadline()}d left
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile-First Container */}
      <div className="px-3 sm:px-4 lg:px-8 py-3 sm:py-6 lg:py-8">
        {/* Mobile: Stacked Layout, Desktop: Grid Layout */}
        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* Job Details - Mobile: Top Card, Desktop: Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 lg:sticky lg:top-20">
              {/* Mobile: Compact Header */}
              <div className="flex items-center space-x-3 mb-3 lg:mb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base lg:text-lg font-semibold text-gray-900 truncate">{placementData.company}</h2>
                  <p className="text-xs lg:text-sm text-gray-600 truncate">{placementData.title}</p>
                </div>
              </div>

              {/* Mobile: Condensed Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3 mb-4 lg:mb-6">
                <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
                  <MapPin className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                  <span className="truncate">{placementData.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
                  <DollarSign className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                  <span className="truncate">{placementData.salary}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
                  <Users className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                  <span className="truncate">{placementData.experience}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
                  <Calendar className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                  <span className="truncate">Deadline: {placementData.applicationDeadline.toLocaleDateString()}</span>
                </div>
              </div>

              {/* Mobile: Collapsible Skills Section */}
              <div className="border-t pt-3 lg:pt-4">
                <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {placementData.skills.slice(0, 6).map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {skill}
                    </span>
                  ))}
                  {placementData.skills.length > 6 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      +{placementData.skills.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile: Simplified Tips */}
              <div className="mt-3 lg:mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs lg:text-sm">
                    <p className="font-medium text-yellow-800">Tips</p>
                    <p className="text-yellow-700 lg:hidden">Upload updated documents</p>
                    <p className="text-yellow-700 hidden lg:block">Make sure all documents are updated and highlight relevant experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form - Mobile: Main Content, Desktop: Right Column */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Mobile-First Progress Steps */}
              <div className="border-b border-gray-200 p-3 lg:p-6">
                {/* Mobile: Compact Progress Indicators */}
                <div className="flex items-center justify-between sm:hidden">
                  <div className="text-sm font-medium text-gray-900">
                    Step {currentStep} of {steps.length}
                  </div>
                  <div className="text-xs text-gray-500">
                    {steps[currentStep - 1].title}
                  </div>
                </div>
                
                {/* Mobile: Progress Bar */}
                <div className="mt-2 sm:hidden">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Desktop: Full Step Display */}
                <div className="hidden sm:flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className={`flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 ${
                        currentStep >= step.number
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}>
                        <step.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                      <div className="ml-2 lg:ml-3">
                        <p className={`text-xs lg:text-sm font-medium ${
                          currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          Step {step.number}
                        </p>
                        <p className="text-xs text-gray-500">{step.title}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-8 lg:w-16 h-0.5 ml-3 lg:ml-6 ${
                          currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content - Mobile-First Padding */}
              <div className="p-4 lg:p-6">
                {currentStep === 1 && (
                  <div className="space-y-4 lg:space-y-6">
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Personal Information</h3>
                    
                    {/* Mobile-First Form Grid */}
                    <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                      <div className="sm:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={formData.personalInfo.fullName}
                          onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="sm:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={formData.personalInfo.email}
                          onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.personalInfo.phone}
                          onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+91 9876543210"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                        <input
                          type="text"
                          value={formData.personalInfo.studentId}
                          onChange={(e) => handleInputChange('personalInfo', 'studentId', e.target.value)}
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 2021CSE001"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
                        <select
                          value={formData.personalInfo.branch}
                          onChange={(e) => handleInputChange('personalInfo', 'branch', e.target.value)}
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Branch</option>
                          <option value="CSE">Computer Science Engineering</option>
                          <option value="ECE">Electronics & Communication</option>
                          <option value="ME">Mechanical Engineering</option>
                          <option value="CE">Civil Engineering</option>
                          <option value="EE">Electrical Engineering</option>
                          <option value="IT">Information Technology</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                        <select
                          value={formData.personalInfo.year}
                          onChange={(e) => handleInputChange('personalInfo', 'year', e.target.value)}
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Year</option>
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">CGPA *</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          value={formData.personalInfo.cgpa}
                          onChange={(e) => handleInputChange('personalInfo', 'cgpa', e.target.value)}
                          className="w-full sm:w-1/2 px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 8.75"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4 lg:space-y-6">
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Documents Upload</h3>
                    
                    <div className="space-y-4 lg:space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Resume * (PDF only)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 lg:p-4">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileUpload('resume', e.target.files?.[0] || null)}
                            className="hidden"
                            id="resume-upload"
                          />
                          <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                            <Upload className="w-10 h-10 lg:w-8 lg:h-8 text-gray-400 mb-3 lg:mb-2" />
                            <span className="text-base lg:text-sm text-gray-600 text-center">Tap to upload resume</span>
                            {formData.documents.resume && (
                              <span className="text-sm lg:text-xs text-green-600 mt-2 lg:mt-1">✓ {formData.documents.resume.name}</span>
                            )}
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload('coverLetter', e.target.files?.[0] || null)}
                            className="hidden"
                            id="cover-letter-upload"
                          />
                          <label htmlFor="cover-letter-upload" className="cursor-pointer flex flex-col items-center">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">Click to upload cover letter</span>
                            {formData.documents.coverLetter && (
                              <span className="text-xs text-green-600 mt-1">✓ {formData.documents.coverLetter.name}</span>
                            )}
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Academic Transcript *</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileUpload('transcript', e.target.files?.[0] || null)}
                            className="hidden"
                            id="transcript-upload"
                          />
                          <label htmlFor="transcript-upload" className="cursor-pointer flex flex-col items-center">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">Click to upload transcript</span>
                            {formData.documents.transcript && (
                              <span className="text-xs text-green-600 mt-1">✓ {formData.documents.transcript.name}</span>
                            )}
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio URL (Optional)</label>
                        <input
                          type="url"
                          value={formData.documents.portfolio}
                          onChange={(e) => handleInputChange('documents', 'portfolio', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Experience & Background</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Previous Internships</label>
                        <textarea
                          value={formData.experience.internships}
                          onChange={(e) => handleInputChange('experience', 'internships', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe your previous internship experiences..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Projects *</label>
                        <textarea
                          value={formData.experience.projects}
                          onChange={(e) => handleInputChange('experience', 'projects', e.target.value)}
                          rows={5}
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe your relevant projects, technologies used, and impact..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills *</label>
                        <textarea
                          value={formData.experience.skills}
                          onChange={(e) => handleInputChange('experience', 'skills', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="List your programming languages, frameworks, tools, etc..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Achievements & Awards</label>
                        <textarea
                          value={formData.experience.achievements}
                          onChange={(e) => handleInputChange('experience', 'achievements', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Academic achievements, competition wins, certifications..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Review & Submit</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Application Summary</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {formData.personalInfo.fullName || 'Not provided'}</p>
                        <p><span className="font-medium">Email:</span> {formData.personalInfo.email || 'Not provided'}</p>
                        <p><span className="font-medium">Branch:</span> {formData.personalInfo.branch || 'Not provided'}</p>
                        <p><span className="font-medium">CGPA:</span> {formData.personalInfo.cgpa || 'Not provided'}</p>
                        <p><span className="font-medium">Resume:</span> {formData.documents.resume ? '✓ Uploaded' : '✗ Not uploaded'}</p>
                        <p><span className="font-medium">Transcript:</span> {formData.documents.transcript ? '✓ Uploaded' : '✗ Not uploaded'}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to work at {placementData.company}? *</label>
                        <textarea
                          value={formData.motivation.whyCompany}
                          onChange={(e) => handleInputChange('motivation', 'whyCompany', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Explain your motivation for applying to this company..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Career Goals</label>
                        <textarea
                          value={formData.motivation.careerGoals}
                          onChange={(e) => handleInputChange('motivation', 'careerGoals', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe your short-term and long-term career goals..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                        <textarea
                          value={formData.motivation.additionalInfo}
                          onChange={(e) => handleInputChange('motivation', 'additionalInfo', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Any additional information you'd like to share..."
                        />
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900">Ready to Submit</p>
                          <p className="text-blue-800">Please review all information before submitting. You will receive a confirmation email after submission.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile-First Navigation Buttons */}
              <div className="border-t border-gray-200 p-4 lg:p-6">
                <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex-1 sm:flex-none px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    <button
                      onClick={() => setShowSkillMatcher(true)}
                      className="flex-1 sm:flex-none px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-300 rounded-lg hover:bg-blue-100"
                    >
                      <span className="sm:hidden">Skills</span>
                      <span className="hidden sm:inline">Check Skill Match</span>
                    </button>
                  </div>
                  
                  {currentStep < 4 ? (
                    <button
                      onClick={nextStep}
                      className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700"
                    >
                      Submit Application
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Skill Matcher Modal */}
      <SkillMatcher
        isOpen={showSkillMatcher}
        onClose={() => setShowSkillMatcher(false)}
        requiredSkills={placementData.skills}
        jobTitle={placementData.title}
        company={placementData.company}
      />
    </div>
  );
}
