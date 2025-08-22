import { ResumeData, SectionType } from './types';
import { 
  Users, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  Target, 
  Trophy,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ResumeFormProps {
  resumeData: ResumeData;
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  updateResumeData: (section: string, data: unknown) => void;
  updatePersonalInfo: (field: string, value: string) => void;
  addExperience: () => void;
  updateExperience: (index: number, field: string, value: unknown) => void;
  removeExperience: (index: number) => void;
  addProject: () => void;
  updateProject: (index: number, field: string, value: unknown) => void;
  removeProject: (index: number) => void;
}

export default function ResumeForm({
  resumeData,
  activeSection,
  setActiveSection,
  updateResumeData,
  updatePersonalInfo,
  addExperience,
  updateExperience,
  removeExperience,
  addProject,
  updateProject,
  removeProject
}: ResumeFormProps) {
  const sections = [
    { key: 'personal' as const, label: 'Personal', icon: Users, color: '#006d77', bgColor: 'bg-[#006d77]', lightBg: 'bg-[#006d77]/10', borderColor: 'border-[#006d77]' },
    { key: 'summary' as const, label: 'Summary', icon: FileText, color: '#83c5be', bgColor: 'bg-[#83c5be]', lightBg: 'bg-[#83c5be]/15', borderColor: 'border-[#83c5be]' },
    { key: 'experience' as const, label: 'Experience', icon: Briefcase, color: '#e29578', bgColor: 'bg-[#e29578]', lightBg: 'bg-[#e29578]/15', borderColor: 'border-[#e29578]' },
    { key: 'education' as const, label: 'Education', icon: GraduationCap, color: '#83c5be', bgColor: 'bg-[#83c5be]', lightBg: 'bg-[#83c5be]/15', borderColor: 'border-[#83c5be]' },
    { key: 'skills' as const, label: 'Skills', icon: Zap, color: '#006d77', bgColor: 'bg-[#006d77]', lightBg: 'bg-[#006d77]/10', borderColor: 'border-[#006d77]' },
    { key: 'projects' as const, label: 'Projects', icon: Target, color: '#e29578', bgColor: 'bg-[#e29578]', lightBg: 'bg-[#e29578]/15', borderColor: 'border-[#e29578]' },
    { key: 'certifications' as const, label: 'Certifications', icon: Trophy, color: '#83c5be', bgColor: 'bg-[#83c5be]', lightBg: 'bg-[#83c5be]/15', borderColor: 'border-[#83c5be]' }
  ];

  const getCurrentSection = () => sections.find(s => s.key === activeSection);
  const currentSection = getCurrentSection();

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-[#83c5be]/20">
        <div className="p-4">
          {/* Mobile: Vertical stack */}
          <div className="flex flex-col space-y-3 sm:hidden">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 ${
                    activeSection === section.key
                      ? `${section.bgColor} text-white shadow-xl transform scale-105`
                      : `bg-white/90 text-[#006d77] hover:${section.lightBg} border-2 ${section.borderColor}/30 shadow-lg`
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {section.label}
                </button>
              );
            })}
          </div>
          
          {/* Tablet and Desktop: Horizontal with scroll */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="flex space-x-3 min-w-max">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                      activeSection === section.key
                        ? `${section.bgColor} text-white shadow-xl transform scale-105`
                        : `bg-white/90 text-[#006d77] hover:${section.lightBg} border-2 ${section.borderColor}/30 shadow-lg`
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      

      {/* Form Sections */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-[#83c5be]/20 overflow-hidden">
        <div className="p-8">
          {/* Personal Info Section */}
          {activeSection === 'personal' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className={`w-20 h-20 ${currentSection?.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-[#006d77] mb-2">Personal Information</h3>
                <p className="text-[#006d77]/70">Tell us about yourself</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">Email</label>
                  <input
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">Phone</label>
                  <input
                    type="tel"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">Location</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="City, State"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">LinkedIn</label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">GitHub</label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.github}
                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="github.com/yourusername"
                  />
                </div>
                <div className="lg:col-span-2 space-y-2">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">Website</label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.website}
                    onChange={(e) => updatePersonalInfo('website', e.target.value)}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Summary Section */}
          {activeSection === 'summary' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className={`w-20 h-20 ${currentSection?.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-[#006d77] mb-2">Professional Summary</h3>
                <p className="text-[#006d77]/70">Describe your professional background</p>
              </div>
              <div className="max-w-4xl mx-auto">
                <label className="block text-sm font-bold text-[#006d77] mb-4">Summary</label>
                <textarea
                  value={resumeData.summary}
                  onChange={(e) => updateResumeData('summary', e.target.value)}
                  rows={6}
                  className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all resize-none"
                  placeholder="Write a compelling professional summary that highlights your key strengths and achievements..."
                />
                <div className="mt-4 p-4 bg-[#ffddd2]/30 border-2 border-[#e29578]/30 rounded-2xl">
                  <p className="text-sm text-[#006d77]/80 font-medium">Keep it concise (2-3 sentences) and highlight your key strengths</p>
                </div>
              </div>
            </div>
          )}

          {/* Experience Section */}
          {activeSection === 'experience' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div className="text-center flex-1 mb-8">
                  <div className={`w-20 h-20 ${currentSection?.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-[#006d77] mb-2">Work Experience</h3>
                  <p className="text-[#006d77]/70">Add your professional experience</p>
                </div>
                <button
                  onClick={addExperience}
                  className="bg-[#006d77] hover:bg-[#83c5be] text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Add Job
                </button>
              </div>
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="p-8 border-2 border-[#83c5be]/30 rounded-3xl bg-[#edf6f9]/50 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#e29578] rounded-2xl flex items-center justify-center shadow-lg">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-xl font-black text-[#006d77]">Position #{index + 1}</h4>
                      </div>
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700 font-bold transition-colors flex items-center gap-2 hover:scale-105"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(index, 'title', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#83c5be]/30 rounded-xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white font-medium"
                        placeholder="Job Title"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#83c5be]/30 rounded-xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white font-medium"
                        placeholder="Company Name"
                      />
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(index, 'location', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#83c5be]/30 rounded-xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white font-medium"
                        placeholder="Location"
                      />
                      <div className="flex gap-3">
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-[#83c5be]/30 rounded-xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white font-medium"
                        />
                        {!exp.current && (
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            className="flex-1 px-4 py-3 border-2 border-[#83c5be]/30 rounded-xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white font-medium"
                          />
                        )}
                      </div>
                      <div className="lg:col-span-2">
                        <label className="flex items-center text-[#006d77] font-bold gap-3 mb-4">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                            className="w-5 h-5 text-[#006d77] bg-gray-100 border-2 border-[#83c5be]/30 rounded focus:ring-[#006d77] focus:ring-2"
                          />
                          Current Position
                        </label>
                        <textarea
                          value={exp.description.join('\n')}
                          onChange={(e) => updateExperience(index, 'description', e.target.value.split('\n'))}
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-[#83c5be]/30 rounded-xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white font-medium resize-none"
                          placeholder="Job responsibilities and achievements (one per line)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className={`w-20 h-20 ${currentSection?.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-[#006d77] mb-2">Skills</h3>
                <p className="text-[#006d77]/70">List your technical and professional skills</p>
              </div>
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">Technical Skills</label>
                  <input
                    type="text"
                    value={resumeData.skills.technical.join(', ')}
                    onChange={(e) => updateResumeData('skills', {
                      ...resumeData.skills,
                      technical: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="JavaScript, Python, React, Node.js, etc."
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">Languages</label>
                  <input
                    type="text"
                    value={resumeData.skills.languages.join(', ')}
                    onChange={(e) => updateResumeData('skills', {
                      ...resumeData.skills,
                      languages: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="English (Native), Spanish (Conversational)"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#006d77] mb-3">Tools & Software</label>
                  <input
                    type="text"
                    value={resumeData.skills.tools.join(', ')}
                    onChange={(e) => updateResumeData('skills', {
                      ...resumeData.skills,
                      tools: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                    className="w-full px-6 py-4 border-2 border-[#83c5be]/30 rounded-2xl focus:ring-4 focus:ring-[#006d77]/20 focus:border-[#006d77] text-[#006d77] bg-white/90 shadow-lg font-medium transition-all"
                    placeholder="Git, VS Code, Figma, Docker, etc."
                  />
                </div>
                <div className="mt-6 p-6 bg-[#83c5be]/15 border-2 border-[#83c5be]/30 rounded-2xl">
                  <p className="text-sm text-[#006d77]/80 font-medium">Separate each skill with a comma. Focus on skills relevant to your target job.</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation for mobile */}
          <div className="mt-12 flex justify-between items-center gap-4">
            <div className="flex flex-col space-y-3 sm:hidden">
            <button
              onClick={() => {
                const sectionKeys = sections.map(s => s.key);
                const currentIndex = sectionKeys.indexOf(activeSection);
                if (currentIndex > 0) {
                  setActiveSection(sectionKeys[currentIndex - 1]);
                }
              }}
              className="flex items-center gap-3 bg-[#edf6f9] hover:bg-[#83c5be]/20 text-[#006d77] px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeSection === 'personal'}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            <div className="flex-1 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffddd2]/50 rounded-full border border-[#e29578]/30">
                <div className="w-2 h-2 bg-[#e29578] rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-[#006d77]">
                  {sections.findIndex(s => s.key === activeSection) + 1} of {sections.length}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                const sectionKeys = sections.map(s => s.key);
                const currentIndex = sectionKeys.indexOf(activeSection);
                if (currentIndex < sectionKeys.length - 1) {
                  setActiveSection(sectionKeys[currentIndex + 1]);
                }
              }}
              className="flex items-center gap-3 bg-[#006d77] hover:bg-[#83c5be] text-white px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeSection === 'certifications'}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}