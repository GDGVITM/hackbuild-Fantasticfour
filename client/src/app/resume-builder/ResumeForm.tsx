import { ResumeData, SectionType } from './types';

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
    { key: 'personal' as const, label: '👤 Personal', icon: '👤' },
    { key: 'summary' as const, label: '📝 Summary', icon: '📝' },
    { key: 'experience' as const, label: '💼 Experience', icon: '💼' },
    { key: 'education' as const, label: '🎓 Education', icon: '🎓' },
    { key: 'skills' as const, label: '⚡ Skills', icon: '⚡' },
    { key: 'projects' as const, label: '🚀 Projects', icon: '🚀' },
    { key: 'certifications' as const, label: '🏆 Certs', icon: '🏆' }
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <div className="flex p-2 space-x-1 min-w-max">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Sections */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        {/* Personal Info Section */}
        {activeSection === 'personal' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">👤</span>Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="City, State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                <input
                  type="url"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="github.com/yourusername"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="yourwebsite.com"
                />
              </div>
            </div>
          </div>
        )}

        {/* Summary Section */}
        {activeSection === 'summary' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📝</span>Professional Summary
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
              <textarea
                value={resumeData.summary}
                onChange={(e) => updateResumeData('summary', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Write a compelling professional summary..."
              />
              <p className="text-sm text-gray-500 mt-2">💡 Keep it concise (2-3 sentences) and highlight your key strengths</p>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="mr-2">💼</span>Work Experience
              </h3>
              <button
                onClick={addExperience}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                + Add Job
              </button>
            </div>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Job #{index + 1}</h4>
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="Job Title"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="Company Name"
                    />
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(index, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="Location"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      />
                      {!exp.current && (
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        />
                      )}
                    </div>
                    <label className="flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                        className="mr-2"
                      />
                      Current Position
                    </label>
                    <textarea
                      value={exp.description.join('\n')}
                      onChange={(e) => updateExperience(index, 'description', e.target.value.split('\n'))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="Job responsibilities (one per line)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">⚡</span>Skills
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
                <input
                  type="text"
                  value={resumeData.skills.technical.join(', ')}
                  onChange={(e) => updateResumeData('skills', {
                    ...resumeData.skills,
                    technical: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="JavaScript, Python, React, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                <input
                  type="text"
                  value={resumeData.skills.languages.join(', ')}
                  onChange={(e) => updateResumeData('skills', {
                    ...resumeData.skills,
                    languages: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="English (Native), Spanish (Conversational)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tools & Software</label>
                <input
                  type="text"
                  value={resumeData.skills.tools.join(', ')}
                  onChange={(e) => updateResumeData('skills', {
                    ...resumeData.skills,
                    tools: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Git, VS Code, Figma, etc."
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation for mobile */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => {
              const sectionKeys = sections.map(s => s.key);
              const currentIndex = sectionKeys.indexOf(activeSection);
              if (currentIndex > 0) {
                setActiveSection(sectionKeys[currentIndex - 1]);
              }
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            disabled={activeSection === 'personal'}
          >
            ← Previous
          </button>
          <button
            onClick={() => {
              const sectionKeys = sections.map(s => s.key);
              const currentIndex = sectionKeys.indexOf(activeSection);
              if (currentIndex < sectionKeys.length - 1) {
                setActiveSection(sectionKeys[currentIndex + 1]);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            disabled={activeSection === 'certifications'}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
