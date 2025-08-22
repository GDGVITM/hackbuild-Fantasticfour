import { ResumeData } from './types';

// Sample resume data for testing
export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: "Prathamesh Sankhe",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 987-6543",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    website: "alexjohnson.dev"
  },
  summary: "Creative full-stack developer with 4+ years of experience building user-centered web applications. Passionate about modern technologies, clean code architecture, and delivering exceptional user experiences.",
  experience: [
    {
      id: "1",
      title: "Full Stack Developer",
      company: "InnovateTech Solutions",
      location: "Austin, TX",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: [
        "Developed responsive web applications using React and Node.js",
        "Implemented automated testing reducing bugs by 35%",
        "Collaborated with UI/UX team to improve user engagement by 50%"
      ]
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "Digital Startup Hub",
      location: "Remote",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
      description: [
        "Built interactive user interfaces with React and TypeScript",
        "Optimized application performance improving load times by 40%",
        "Mentored junior developers in modern JavaScript frameworks"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Texas at Austin",
      location: "Austin, TX",
      graduationDate: "2020-05",
      gpa: "3.7",
      honors: "Cum Laude"
    }
  ],
  skills: {
    technical: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "MongoDB", "PostgreSQL"],
    languages: ["English (Native)", "Spanish (Intermediate)"],
    tools: ["Git", "VS Code", "Figma", "Docker", "AWS"]
  },
  projects: [
    {
      id: "1",
      name: "Task Management App",
      description: "Full-stack productivity application with real-time collaboration features",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      link: "https://taskapp-demo.com",
      github: "https://github.com/alexjohnson/task-app"
    },
    {
      id: "2",
      name: "Portfolio Website",
      description: "Responsive personal portfolio showcasing projects and skills",
      technologies: ["Next.js", "Tailwind CSS", "Vercel"],
      link: "https://alexjohnson.dev",
      github: "https://github.com/alexjohnson/portfolio"
    }
  ],
  certifications: [
    {
      id: "1",
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2023-08",
      link: "https://coursera.org/certificate/react"
    },
    {
      id: "2",
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023-05",
      link: "https://aws.amazon.com/certification/"
    }
  ]
};
