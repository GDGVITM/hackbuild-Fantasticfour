import { ResumeData } from './types';

export const generateMarkdownResume = (data: ResumeData) => {
  return `# ${data.personalInfo.fullName}

**Email:** ${data.personalInfo.email}  
**Phone:** ${data.personalInfo.phone}  
**Location:** ${data.personalInfo.location}  
**LinkedIn:** ${data.personalInfo.linkedin}  
**GitHub:** ${data.personalInfo.github}  
**Website:** ${data.personalInfo.website}

## Professional Summary

${data.summary}

## Work Experience

${data.experience.map((exp) => `
### ${exp.title} - ${exp.company}
**${exp.location}** | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}

${exp.description.map((desc: string) => `- ${desc}`).join('\n')}
`).join('\n')}

## Education

${data.education.map((edu) => `
### ${edu.degree}
**${edu.institution}** - ${edu.location}  
Graduated: ${edu.graduationDate} ${edu.gpa ? `| GPA: ${edu.gpa}` : ''} ${edu.honors ? `| ${edu.honors}` : ''}
`).join('\n')}

## Skills

**Technical Skills:** ${data.skills.technical.join(', ')}  
**Languages:** ${data.skills.languages.join(', ')}  
**Tools:** ${data.skills.tools.join(', ')}

## Projects

${data.projects.map((project) => `
### ${project.name}
${project.description}

**Technologies:** ${project.technologies.join(', ')}  
**Live Demo:** ${project.link}  
**GitHub:** ${project.github}
`).join('\n')}

## Certifications

${data.certifications.map((cert) => `
- **${cert.name}** - ${cert.issuer} (${cert.date})
`).join('\n')}`;
};

export const downloadMarkdown = (resumeData: ResumeData) => {
  const markdown = generateMarkdownResume(resumeData);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadPDF = async (resumeData: ResumeData) => {
  try {
    // Create a temporary window with the resume content
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow popups for this site to generate PDF.');
      return;
    }

    const resumeHTML = generateResumeHTML(resumeData);
    
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>${resumeData.personalInfo.fullName} - Resume</title>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4;
      margin: 0.8in;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.4;
      color: #333;
      font-size: 11pt;
      margin: 0;
      padding: 0;
      background: white;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #3b82f6;
    }
    .name {
      font-size: 24pt;
      font-weight: bold;
      margin-bottom: 8px;
      color: #1f2937;
    }
    .contact-info {
      font-size: 10pt;
      color: #6b7280;
      margin-bottom: 5px;
    }
    .section {
      margin-bottom: 18px;
    }
    .section-title {
      font-size: 12pt;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 8px;
      padding-bottom: 3px;
      border-bottom: 1px solid #e5e7eb;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .job {
      margin-bottom: 12px;
    }
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 5px;
    }
    .job-title {
      font-weight: bold;
      font-size: 11pt;
    }
    .company {
      color: #3b82f6;
      font-weight: 600;
    }
    .job-details {
      font-size: 10pt;
      color: #6b7280;
      text-align: right;
    }
    .description {
      margin-left: 15px;
    }
    .description li {
      margin-bottom: 3px;
      font-size: 10pt;
    }
    .skills-section {
      display: block;
    }
    .skill-category {
      font-size: 10pt;
      margin-bottom: 5px;
    }
    .skill-label {
      font-weight: 600;
      color: #1f2937;
    }
    .project {
      margin-bottom: 10px;
    }
    .project-name {
      font-weight: bold;
      font-size: 11pt;
      margin-bottom: 3px;
    }
    .project-description {
      font-size: 10pt;
      margin-bottom: 3px;
    }
    .project-tech {
      font-size: 9pt;
      color: #6b7280;
    }
    .education {
      margin-bottom: 8px;
    }
    .degree {
      font-weight: bold;
      font-size: 11pt;
    }
    .institution {
      color: #059669;
      font-weight: 600;
    }
    .cert {
      font-size: 10pt;
      margin-bottom: 3px;
    }
    @media print {
      body { 
        font-size: 10pt;
      }
      .header {
        margin-bottom: 15px;
      }
      .section {
        margin-bottom: 15px;
      }
      .job-header {
        display: block;
      }
      .job-details {
        text-align: left;
        margin-bottom: 5px;
      }
    }
  </style>
</head>
<body>
  ${resumeHTML}
  <script>
    // Auto-trigger print dialog
    window.onload = function() {
      window.print();
      // Close the window after print dialog
      window.onafterprint = function() {
        window.close();
      };
    };
  </script>
</body>
</html>`;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

const generateResumeHTML = (data: ResumeData) => {
  return `
    <div class="header">
      <div class="name">${data.personalInfo.fullName}</div>
      <div class="contact-info">
        📧 ${data.personalInfo.email} | 📱 ${data.personalInfo.phone} | 📍 ${data.personalInfo.location}
      </div>
      <div class="contact-info">
        🔗 ${data.personalInfo.linkedin} | 💻 ${data.personalInfo.github} | 🌐 ${data.personalInfo.website}
      </div>
    </div>

    ${data.summary ? `
    <div class="section">
      <div class="section-title">Professional Summary</div>
      <p>${data.summary}</p>
    </div>
    ` : ''}

    ${data.experience.length > 0 ? `
    <div class="section">
      <div class="section-title">Work Experience</div>
      ${data.experience.map(exp => `
        <div class="job">
          <div class="job-header">
            <div>
              <div class="job-title">${exp.title}</div>
              <div class="company">${exp.company}</div>
            </div>
            <div class="job-details">
              <div>${exp.location}</div>
              <div>${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
            </div>
          </div>
          <ul class="description">
            ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.education.length > 0 ? `
    <div class="section">
      <div class="section-title">Education</div>
      ${data.education.map(edu => `
        <div class="education">
          <div class="degree">${edu.degree}</div>
          <div class="institution">${edu.institution}</div>
          <div class="job-details">
            ${edu.location} | Graduated: ${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}${edu.honors ? ` | ${edu.honors}` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <div class="section">
      <div class="section-title">Skills</div>
      <div class="skills-section">
        ${data.skills.technical.length > 0 ? `
        <div class="skill-category">
          <span class="skill-label">Technical:</span> ${data.skills.technical.join(', ')}
        </div>
        ` : ''}
        ${data.skills.languages.length > 0 ? `
        <div class="skill-category">
          <span class="skill-label">Languages:</span> ${data.skills.languages.join(', ')}
        </div>
        ` : ''}
        ${data.skills.tools.length > 0 ? `
        <div class="skill-category">
          <span class="skill-label">Tools:</span> ${data.skills.tools.join(', ')}
        </div>
        ` : ''}
      </div>
    </div>

    ${data.projects.length > 0 ? `
    <div class="section">
      <div class="section-title">Projects</div>
      ${data.projects.map(project => `
        <div class="project">
          <div class="project-name">${project.name}</div>
          <div class="project-description">${project.description}</div>
          <div class="project-tech">
            <strong>Technologies:</strong> ${project.technologies.join(', ')}
            ${project.link ? `<br><strong>Live Demo:</strong> ${project.link}` : ''}
            ${project.github ? `<br><strong>GitHub:</strong> ${project.github}` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.certifications.length > 0 ? `
    <div class="section">
      <div class="section-title">Certifications</div>
      ${data.certifications.map(cert => `
        <div class="cert">
          <strong>${cert.name}</strong> - ${cert.issuer} (${cert.date})
        </div>
      `).join('')}
    </div>
    ` : ''}
  `;
};