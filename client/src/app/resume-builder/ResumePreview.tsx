import { ResumeData } from './types';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  return (
    <div className="bg-white shadow-xl border border-gray-300 mx-auto" 
         style={{ 
           width: '210mm',
           minHeight: '297mm'
         }}>
      <div className="p-4 sm:p-8 lg:p-12 h-full text-gray-900" style={{ fontSize: '11pt', lineHeight: '1.5' }}>
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-blue-500">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{resumeData.personalInfo.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm text-gray-700 mb-2">
            <span>📧 {resumeData.personalInfo.email}</span>
            <span>📱 {resumeData.personalInfo.phone}</span>
            <span>📍 {resumeData.personalInfo.location}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm text-blue-600">
            <span>🔗 {resumeData.personalInfo.linkedin}</span>
            <span>💻 {resumeData.personalInfo.github}</span>
            <span>🌐 {resumeData.personalInfo.website}</span>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center border-b border-gray-300 pb-2">
              <span className="mr-2">💼</span> PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center border-b border-gray-300 pb-2">
              <span className="mr-2">🚀</span> WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 text-right flex-shrink-0">
                      <p>{exp.location}</p>
                      <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {exp.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center border-b border-gray-300 pb-2">
              <span className="mr-2">🎓</span> EDUCATION
            </h2>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-green-600 font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-600 text-right flex-shrink-0">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center border-b border-gray-300 pb-2">
            <span className="mr-2">⚡</span> SKILLS
          </h2>
          <div className="space-y-2">
            {resumeData.skills.technical.length > 0 && (
              <div>
                <span className="font-medium text-gray-900">Technical: </span>
                <span className="text-gray-700">{resumeData.skills.technical.join(', ')}</span>
              </div>
            )}
            {resumeData.skills.languages.length > 0 && (
              <div>
                <span className="font-medium text-gray-900">Languages: </span>
                <span className="text-gray-700">{resumeData.skills.languages.join(', ')}</span>
              </div>
            )}
            {resumeData.skills.tools.length > 0 && (
              <div>
                <span className="font-medium text-gray-900">Tools: </span>
                <span className="text-gray-700">{resumeData.skills.tools.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center border-b border-gray-300 pb-2">
              <span className="mr-2">🛠️</span> PROJECTS
            </h2>
            <div className="space-y-3">
              {resumeData.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 flex-1 min-w-0 pr-4">{project.name}</h3>
                    {(project.link || project.github) && (
                      <div className="text-sm text-blue-600 flex-shrink-0">
                        {project.link && <span className="mr-2">🔗 Link</span>}
                        {project.github && <span>💻 GitHub</span>}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 mb-1">{project.description}</p>
                  <div className="text-sm text-gray-600">
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
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center border-b border-gray-300 pb-2">
              <span className="mr-2">🏆</span> CERTIFICATIONS
            </h2>
            <div className="space-y-1">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id}>
                  <span className="font-medium text-gray-900">{cert.name}</span>
                  <span className="text-gray-600"> - {cert.issuer} ({cert.date})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
