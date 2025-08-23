import { ResumeData } from './types';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  return (
    <div className="w-full">
      <div
        className="bg-white shadow-xl border border-gray-300 mx-auto"
        style={{
          width: '210mm',
          minHeight: 'auto',
          maxWidth: '100%',
          aspectRatio: '210/297'
        }}
        id="resume-a4-preview"
      >
        <div className="p-8 h-full text-gray-900" style={{ fontSize: '11pt', lineHeight: '1.4' }}>
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8 pb-3 sm:pb-4 md:pb-6 border-b-2 border-blue-500">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{resumeData.personalInfo.fullName}</h1>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">
              <span className="whitespace-nowrap">📧 {resumeData.personalInfo.email}</span>
              <span className="whitespace-nowrap">📱 {resumeData.personalInfo.phone}</span>
              <span className="whitespace-nowrap">📍 {resumeData.personalInfo.location}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-blue-600">
              <span className="whitespace-nowrap">🔗 {resumeData.personalInfo.linkedin}</span>
              <span className="whitespace-nowrap">💻 {resumeData.personalInfo.github}</span>
              <span className="whitespace-nowrap">🌐 {resumeData.personalInfo.website}</span>
            </div>
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center border-b border-gray-300 pb-1 sm:pb-2">
                <span className="mr-1 sm:mr-2">💼</span> PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">{resumeData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center border-b border-gray-300 pb-1 sm:pb-2">
                <span className="mr-1 sm:mr-2">🚀</span> WORK EXPERIENCE
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 sm:mb-2">
                      <div className="flex-1 min-w-0 sm:pr-4">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{exp.title}</h3>
                        <p className="text-blue-600 font-medium text-sm">{exp.company}</p>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 sm:text-right flex-shrink-0 mt-1 sm:mt-0">
                        <p>{exp.location}</p>
                        <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-0.5 sm:space-y-1 ml-2 sm:ml-4 text-xs sm:text-sm">
                      {exp.description.map((desc, index) => (
                        <li key={index} className="leading-tight">{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center border-b border-gray-300 pb-1 sm:pb-2">
                <span className="mr-1 sm:mr-2">🎓</span> EDUCATION
              </h2>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="mb-2 sm:mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div className="flex-1 min-w-0 sm:pr-4">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{edu.degree}</h3>
                      <p className="text-green-600 font-medium text-sm">{edu.institution}</p>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 sm:text-right flex-shrink-0 mt-1 sm:mt-0">
                      <div>{edu.location}</div>
                      <div>Graduated: {edu.graduationDate}</div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                      {edu.honors && <div>{edu.honors}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center border-b border-gray-300 pb-1 sm:pb-2">
              <span className="mr-1 sm:mr-2">⚡</span> SKILLS
            </h2>
            <div className="space-y-1 sm:space-y-2">
              {resumeData.skills.technical.length > 0 && (
                <div className="text-xs sm:text-sm">
                  <span className="font-medium text-gray-900">Technical: </span>
                  <span className="text-gray-700">{resumeData.skills.technical.join(', ')}</span>
                </div>
              )}
              {resumeData.skills.languages.length > 0 && (
                <div className="text-xs sm:text-sm">
                  <span className="font-medium text-gray-900">Languages: </span>
                  <span className="text-gray-700">{resumeData.skills.languages.join(', ')}</span>
                </div>
              )}
              {resumeData.skills.tools.length > 0 && (
                <div className="text-xs sm:text-sm">
                  <span className="font-medium text-gray-900">Tools: </span>
                  <span className="text-gray-700">{resumeData.skills.tools.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center border-b border-gray-300 pb-1 sm:pb-2">
                <span className="mr-1 sm:mr-2">🛠️</span> PROJECTS
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {resumeData.projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                      <h3 className="font-semibold text-gray-900 flex-1 min-w-0 sm:pr-4 text-sm sm:text-base">{project.name}</h3>
                      {(project.link || project.github) && (
                        <div className="text-xs sm:text-sm text-blue-600 flex-shrink-0 mt-1 sm:mt-0">
                          {project.link && <span className="mr-2">🔗 Link</span>}
                          {project.github && <span>💻 GitHub</span>}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 mb-1 text-xs sm:text-sm leading-tight">{project.description}</p>
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Technologies: </span>
                      <span>{project.technologies.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center border-b border-gray-300 pb-1 sm:pb-2">
                <span className="mr-1 sm:mr-2">🏆</span> CERTIFICATIONS
              </h2>
              <div className="space-y-0.5 sm:space-y-1">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="text-xs sm:text-sm">
                    <span className="font-medium text-gray-900">{cert.name}</span>
                    <span className="text-gray-600"> - {cert.issuer} ({cert.date})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
