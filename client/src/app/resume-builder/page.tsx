// "use client";
// import { useState } from 'react';
// import Link from 'next/link';
// import { ResumeData, SectionType } from './types';
// import { sampleResumeData } from './sampleData';
// import ResumeForm from './ResumeForm';
// import ResumePreview from './ResumePreview';
// import { downloadPDF } from './utils';
// import { 
//   FileText, 
//   Download, 
//   Edit3, 
//   Eye, 
//   Sparkles, 
//   Layout, 
//   FileCheck, 
//   Smartphone, 
//   ChevronRight, 
//   Plus, 
//   ArrowRight, 
//   Zap, 
//   Star, 
//   Users, 
//   Trophy, 
//   Target, 
//   Briefcase, 
//   GraduationCap,
//   Layers,
//   Palette,
//   Shield,
//   Crown,
//   Rocket,
//   Heart
// } from 'lucide-react';

// export default function TestResumePage() {
//   const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');
//   const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
//   const [activeSection, setActiveSection] = useState<SectionType>('personal');

//   const updateResumeData = (section: string, data: unknown) => {
//     setResumeData(prev => ({
//       ...prev,
//       [section]: data
//     }));
//   };

//   const updatePersonalInfo = (field: string, value: string) => {
//     setResumeData(prev => ({
//       ...prev,
//       personalInfo: {
//         ...prev.personalInfo,
//         [field]: value
//       }
//     }));
//   };

//   const addExperience = () => {
//     const newExp = {
//       id: Date.now().toString(),
//       title: '',
//       company: '',
//       location: '',
//       startDate: '',
//       endDate: '',
//       current: false,
//       description: ['']
//     };
//     setResumeData(prev => ({
//       ...prev,
//       experience: [...prev.experience, newExp]
//     }));
//   };

//   const updateExperience = (index: number, field: string, value: unknown) => {
//     setResumeData(prev => ({
//       ...prev,
//       experience: prev.experience.map((exp, i) =>
//         i === index ? { ...exp, [field]: value } : exp
//       )
//     }));
//   };

//   const removeExperience = (index: number) => {
//     setResumeData(prev => ({
//       ...prev,
//       experience: prev.experience.filter((_, i) => i !== index)
//     }));
//   };

//   const addProject = () => {
//     const newProject = {
//       id: Date.now().toString(),
//       name: '',
//       description: '',
//       technologies: [],
//       link: '',
//       github: ''
//     };
//     setResumeData(prev => ({
//       ...prev,
//       projects: [...prev.projects, newProject]
//     }));
//   };

//   const updateProject = (index: number, field: string, value: unknown) => {
//     setResumeData(prev => ({
//       ...prev,
//       projects: prev.projects.map((project, i) =>
//         i === index ? { ...project, [field]: value } : project
//       )
//     }));
//   };

//   const removeProject = (index: number) => {
//     setResumeData(prev => ({
//       ...prev,
//       projects: prev.projects.filter((_, i) => i !== index)
//     }));
//   };

//   const features = [
//     {
//       title: "AI-Powered Suggestions",
//       description: "Get intelligent content recommendations tailored to your industry",
//       icon: Sparkles,
//       bgColor: "bg-gradient-to-br from-[#006d77] to-[#004d57]",
//       lightBg: "bg-gradient-to-br from-[#006d77]/10 to-[#004d57]/5",
//       borderColor: "border-[#006d77]/30",
//       accentColor: "text-[#006d77]",
//       shadowColor: "shadow-[#006d77]/20"
//     },
//     {
//       title: "ATS Optimization",
//       description: "Built to pass screening systems and get noticed by recruiters",
//       icon: Shield,
//       bgColor: "bg-gradient-to-br from-[#83c5be] to-[#6ba39a]",
//       lightBg: "bg-gradient-to-br from-[#83c5be]/15 to-[#6ba39a]/10",
//       borderColor: "border-[#83c5be]/40",
//       accentColor: "text-[#006d77]",
//       shadowColor: "shadow-[#83c5be]/25"
//     },
//     {
//       title: "One-Click Export",
//       description: "Download professional PDFs instantly with perfect formatting",
//       icon: Rocket,
//       bgColor: "bg-gradient-to-br from-[#e29578] to-[#d17a5e]",
//       lightBg: "bg-gradient-to-br from-[#e29578]/15 to-[#d17a5e]/10",
//       borderColor: "border-[#e29578]/40",
//       accentColor: "text-[#006d77]",
//       shadowColor: "shadow-[#e29578]/25"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#edf6f9] via-[#f8fffe] to-[#e8f4f7] relative">
//       {/* Ultra-Enhanced Background with layered animations */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         {/* Primary animated gradient orbs */}
//         <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#83c5be]/20 via-[#83c5be]/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
//         <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-[#ffddd2]/30 via-[#ffddd2]/15 to-transparent rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }}></div>
        
//         {/* Floating geometric shapes */}
//         <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-[#83c5be]/25 to-[#83c5be]/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
//         <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-gradient-to-br from-[#e29578]/25 to-[#e29578]/5 rounded-full blur-xl animate-bounce" style={{ animationDuration: '5s', animationDelay: '1.5s' }}></div>
        
//         {/* Central glow */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#006d77]/8 via-[#83c5be]/5 to-transparent rounded-full blur-3xl"></div>
        
//         {/* Subtle grid pattern overlay */}
//         {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23006d77" fill-opacity="0.03"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div> */}
//       </div>

//       {/* Header with enhanced mobile experience */}
//       <header className="relative bg-white/98 backdrop-blur-2xl shadow-xl border-b border-[#83c5be]/20 sticky top-0 z-40">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#006d77]/5 via-transparent to-[#83c5be]/5"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="flex justify-between items-center h-16 sm:h-20">
//             <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
//               <Link href="/" className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300">
//                 <div className="relative">
//                   <div className="w-10 h-10 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
//                     <Crown className="w-6 h-6 text-white" />
//                   </div>
//                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#e29578] to-[#ffddd2] rounded-full border-2 border-white shadow-lg animate-pulse"></div>
//                 </div>
//                 <span className="text-lg sm:text-xl md:text-2xl sm:text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">
//                   EduMitra
//                 </span>
//               </Link>
//               <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 md:space-x-4">
//                 <div className="w-2 h-12 bg-gradient-to-b from-[#83c5be] to-[#006d77] rounded-full shadow-lg"></div>
//                 <div>
//                   <h1 className="text-lg font-black text-[#006d77]">Resume Builder</h1>
//                   <p className="text-xs text-[#006d77]/60 font-medium">Professional • ATS-Ready • AI-Powered</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
//               <div className="group relative bg-gradient-to-r from-[#ffddd2] to-[#e29578]/80 border-2 border-[#e29578]/40 px-6 py-3 rounded-lg sm:rounded-xl md:rounded-2xlshadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//                 <div className="flex items-center gap-3">
//                   <div className="relative">
//                     <Star className="w-5 h-5 text-[#e29578] fill-current animate-pulse" />
//                     <div className="absolute inset-0 bg-[#e29578] rounded-full blur animate-ping opacity-75"></div>
//                   </div>
//                   <span className="text-sm font-black text-[#006d77] hidden sm:inline">Premium Pro</span>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg sm:rounded-xl md:rounded-2xlopacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </div>
//             </div>
//           </div>
//           {/* Enhanced Mobile subtitle */}
//           <div className="sm:hidden pb-4">
//             <div className="text-center">
//               <h1 className="text-sm font-black text-[#006d77]">Resume Builder</h1>
//               <p className="text-xs text-[#006d77]/60 font-medium">Professional • ATS-Ready • AI-Powered</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 z-10">
//         {/* Ultra-Enhanced Hero Section */}
//         <div className="relative bg-white/98 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-4 sm:p-6 md:p-8 sm:p-12 mb-8 border border-[#83c5be]/20 overflow-hidden group hover:shadow-3xl transition-all duration-700">
//           {/* Advanced decorative elements */}
//           <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#ffddd2]/70 to-[#e29578]/40 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-1000"></div>
//           <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-[#83c5be]/60 to-[#006d77]/30 rounded-full blur-xl group-hover:scale-110 transition-transform duration-1000"></div>
//           <div className="absolute top-1/2 right-12 w-4 h-20 bg-gradient-to-b from-[#e29578] to-[#e29578]/40 rounded-full opacity-70 group-hover:h-24 transition-all duration-500"></div>
//           <div className="absolute bottom-12 left-1/3 w-20 h-4 bg-gradient-to-r from-[#006d77] to-[#006d77]/40 rounded-full opacity-60 group-hover:w-24 transition-all duration-500"></div>

//           {/* Floating particles */}
//           <div className="absolute inset-0 overflow-hidden pointer-events-none">
//             <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#83c5be] rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
//             <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#e29578] rounded-full opacity-80 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}></div>
//             <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-[#ffddd2] rounded-full opacity-70 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
//           </div>

//           <div className="relative z-10">
//             <div className="text-center mb-12">
//               {/* Enhanced premium badge */}
//               <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#006d77] to-[#83c5be] text-white px-8 py-4 rounded-lg sm:rounded-xl md:rounded-2xlfont-black text-sm mb-8 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group/badge">
//                 <div className="relative">
//                   <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
//                   <div className="absolute inset-0 bg-white rounded-full blur animate-ping opacity-25"></div>
//                 </div>
//                 <span className="tracking-wide">AI-POWERED RESUME BUILDER</span>
//                 <div className="w-2 h-2 bg-[#ffddd2] rounded-full animate-pulse"></div>
//               </div>

//               {/* Enhanced description */}
//               <p className="text-[#006d77]/80 text-base sm:text-xl md:text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
//                 Build stunning, ATS-optimized resumes that get you noticed. Professional templates, 
//                 <span className="font-black text-[#e29578]"> real-time preview</span>, and 
//                 <span className="font-black text-[#83c5be]"> instant PDF export</span>.
//               </p>
//             </div>

//             {/* Ultra-Enhanced feature badges */}
//             <div className="flex flex-wrap justify-center gap-3 sm:p-4 md:p-6 mb-12">
//               <div className="group/badge relative bg-gradient-to-r from-[#006d77]/10 to-[#006d77]/5 border-2 border-[#006d77]/20 px-8 py-4 rounded-lg sm:rounded-xl md:rounded-2xlshadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#006d77]/20 to-transparent opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
//                 <div className="relative flex items-center gap-2 sm:p-3 md:p-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-xl flex items-center justify-center shadow-lg">
//                     <Edit3 className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="font-black text-[#006d77] text-base">Smart Editor</span>
//                 </div>
//               </div>

//               <div className="group/badge relative bg-gradient-to-r from-[#83c5be]/15 to-[#83c5be]/5 border-2 border-[#83c5be]/30 px-8 py-4 rounded-lg sm:rounded-xl md:rounded-2xlshadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#83c5be]/30 to-transparent opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
//                 <div className="relative flex items-center gap-2 sm:p-3 md:p-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-[#83c5be] to-[#006d77] rounded-xl flex items-center justify-center shadow-lg">
//                     <Layout className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="font-black text-[#006d77] text-base">Live Preview</span>
//                 </div>
//               </div>

//               <div className="group/badge relative bg-gradient-to-r from-[#e29578]/15 to-[#e29578]/5 border-2 border-[#e29578]/30 px-8 py-4 rounded-lg sm:rounded-xl md:rounded-2xlshadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#e29578]/30 to-transparent opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
//                 <div className="relative flex items-center gap-2 sm:p-3 md:p-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-[#e29578] to-[#ffddd2] rounded-xl flex items-center justify-center shadow-lg">
//                     <FileCheck className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="font-black text-[#006d77] text-base">ATS Ready</span>
//                 </div>
//               </div>
//             </div>

//             {/* Ultra-Enhanced CTA Button */}
//             <div className="text-center">
//               <button
//                 onClick={() => setActiveView('edit')}
//                 className="group/cta relative inline-flex items-center gap-2 sm:p-3 md:p-4 bg-gradient-to-r from-[#006d77] via-[#83c5be] to-[#006d77] text-white px-12 py-6 rounded-xl sm:rounded-2xl md:rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-[length:200%_100%] hover:bg-[position:100%_0] transform hover:scale-105 active:scale-95"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"></div>
//                 <div className="relative w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover/cta:rotate-180 transition-transform duration-500">
//                   <Plus className="w-5 h-5" />
//                 </div>
//                 <span className="relative tracking-wide">START BUILDING NOW</span>
//                 <div className="relative w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover/cta:translate-x-2 transition-transform duration-300">
//                   <ArrowRight className="w-5 h-5" />
//                 </div>
                
//                 {/* Animated border */}
//                 <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-white/30 animate-pulse"></div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Ultra-Enhanced View Toggle */}
//         <div className="relative bg-white/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl mb-8 border border-[#83c5be]/20 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-[#006d77]/5 via-transparent to-[#83c5be]/5"></div>
//           <div className="relative flex">
//             <button
//               onClick={() => setActiveView('edit')}
//               className={`flex-1 py-6 px-8 text-center font-black transition-all duration-700 flex items-center justify-center gap-2 sm:p-3 md:p-4 relative overflow-hidden group ${
//                 activeView === 'edit'
//                   ? 'bg-gradient-to-r from-[#006d77] to-[#83c5be] text-white shadow-2xl transform scale-105 z-10'
//                   : 'bg-transparent text-[#006d77] hover:bg-gradient-to-r hover:from-[#006d77]/10 hover:to-[#83c5be]/10'
//               }`}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className={`relative w-12 h-12 rounded-lg sm:rounded-xl md:rounded-2xlflex items-center justify-center shadow-lg ${
//                 activeView === 'edit' ? 'bg-white/20' : 'bg-[#006d77]/10'
//               }`}>
//                 <Edit3 className="w-6 h-6" />
//               </div>
//               <div className="relative">
//                 <span className="text-lg block">Edit Resume</span>
//                 <span className="text-xs opacity-80 block">Create & Customize</span>
//               </div>
//               {activeView === 'edit' && (
//                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-[#ffddd2] rounded-t-2xl shadow-lg"></div>
//               )}
//             </button>

//             <button
//               onClick={() => setActiveView('preview')}
//               className={`flex-1 py-6 px-8 text-center font-black transition-all duration-700 flex items-center justify-center gap-2 sm:p-3 md:p-4 relative overflow-hidden group ${
//                 activeView === 'preview'
//                   ? 'bg-gradient-to-r from-[#006d77] to-[#83c5be] text-white shadow-2xl transform scale-105 z-10'
//                   : 'bg-transparent text-[#006d77] hover:bg-gradient-to-r hover:from-[#006d77]/10 hover:to-[#83c5be]/10'
//               }`}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className={`relative w-12 h-12 rounded-lg sm:rounded-xl md:rounded-2xlflex items-center justify-center shadow-lg ${
//                 activeView === 'preview' ? 'bg-white/20' : 'bg-[#006d77]/10'
//               }`}>
//                 <Eye className="w-6 h-6" />
//               </div>
//               <div className="relative">
//                 <span className="text-lg block">Preview</span>
//                 <span className="text-xs opacity-80 block">View & Download</span>
//               </div>
//               {activeView === 'preview' && (
//                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-[#ffddd2] rounded-t-2xl shadow-lg"></div>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Content Area */}
//         {activeView === 'edit' ? (
//           <div className="bg-white/98 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-[#83c5be]/20 overflow-hidden">
//             <div className="p-4 sm:p-6 md:p-8 sm:p-12">
//               {/* Enhanced active section indicator */}
//               <div className="mb-12 text-center">
//                 <div className="inline-flex items-center gap-2 sm:p-3 md:p-4 px-8 py-4 bg-gradient-to-r from-[#ffddd2]/60 to-[#e29578]/40 rounded-lg sm:rounded-xl md:rounded-2xlborder-2 border-[#e29578]/30 shadow-lg">
//                   <div className="relative">
//                     <div className="w-4 h-4 bg-gradient-to-r from-[#e29578] to-[#ffddd2] rounded-full animate-pulse shadow-lg"></div>
//                     <div className="absolute inset-0 bg-[#e29578] rounded-full blur animate-ping opacity-50"></div>
//                   </div>
//                   <span className="text-sm font-black text-[#006d77] tracking-wide">
//                     BUILDING YOUR PROFESSIONAL RESUME
//                   </span>
//                   <Heart className="w-4 h-4 text-[#e29578] fill-current animate-pulse" />
//                 </div>
//               </div>

//               {/* Resume Form Component */}
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-[#006d77]/5 via-transparent to-[#83c5be]/5 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
//                 <div className="relative">
//                   <ResumeForm
//                     resumeData={resumeData}
//                     activeSection={activeSection}
//                     setActiveSection={setActiveSection}
//                     updateResumeData={updateResumeData}
//                     updatePersonalInfo={updatePersonalInfo}
//                     addExperience={addExperience}
//                     updateExperience={updateExperience}
//                     removeExperience={removeExperience}
//                     addProject={addProject}
//                     updateProject={updateProject}
//                     removeProject={removeProject}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white/98 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-[#83c5be]/20 overflow-hidden">
//             {/* Ultra-Enhanced Preview Header */}
//             <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6 md:p-8 sm:p-12 border-b border-[#83c5be]/20 bg-gradient-to-r from-[#edf6f9]/80 to-[#f8fffe]/60 overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-[#006d77]/5 via-transparent to-[#83c5be]/5"></div>
//               <div className="relative flex items-center gap-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6 sm:mb-0">
//                 <div className="relative w-20 h-20 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl">
//                   <Eye className="w-10 h-10 text-white" />
//                   <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#e29578] to-[#ffddd2] rounded-full flex items-center justify-center border-3 border-white shadow-xl">
//                     <FileText className="w-4 h-4 text-white" />
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
//                 </div>
//                 <div>
//                   <h3 className="text-lg sm:text-xl md:text-2xl sm:text-xl sm:text-2xl md:text-3xl font-black text-[#006d77] mb-2">Resume Preview</h3>
//                   <div className="flex items-center gap-2 sm:p-3 md:p-4">
//                     <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#006d77]/10 text-[#006d77] rounded-xl font-bold text-sm">
//                       <Layers className="w-4 h-4" />
//                       Professional A4
//                     </span>
//                     <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#83c5be]/15 text-[#006d77] rounded-xl font-bold text-sm">
//                       <Zap className="w-4 h-4" />
//                       Ready to Download
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={async () => await downloadPDF(resumeData)}
//                 className="group/download relative bg-gradient-to-r from-[#006d77] via-[#83c5be] to-[#006d77] text-white px-10 py-5 rounded-xl sm:rounded-2xl md:rounded-3xl font-black text-lg transition-all duration-500 flex items-center justify-center gap-2 sm:p-3 md:p-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 w-full sm:w-auto overflow-hidden bg-[length:200%_100%] hover:bg-[position:100%_0]"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/download:opacity-100 transition-opacity duration-300"></div>
//                 <div className="relative w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover/download:rotate-12 transition-transform duration-300">
//                   <Download className="w-5 h-5" />
//                 </div>
//                 <span className="relative tracking-wide">DOWNLOAD PDF</span>
//                 <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-white/30 animate-pulse"></div>
//               </button>
//             </div>

//             {/* Ultra-Enhanced Preview Content */}
//             <div className="relative p-4 sm:p-6 md:p-8 sm:p-12">
//               <div className="absolute inset-0 bg-gradient-to-br from-[#006d77]/3 via-transparent to-[#83c5be]/3"></div>
//               <div className="relative w-full">
//                 <div className="flex justify-center">
//                   <div className="transform scale-75 sm:scale-90 lg:scale-100 origin-center shadow-2xl rounded-lg sm:rounded-xl md:rounded-2xloverflow-hidden">
//                     <div className="relative">
//                       <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8fffe] to-[#edf6f9] rounded-2xl"></div>
//                       <div className="relative">
//                         <ResumePreview resumeData={resumeData} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Ultra-Enhanced Features Grid */}
//         <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 sm:p-6 md:p-8">
//           {features.map((feature, index) => {
//             const IconComponent = feature.icon;
//             return (
//               <div 
//                 key={index} 
//                 className={`group/feature relative bg-white/98 backdrop-blur-2xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 ${feature.borderColor} hover:shadow-3xl transition-all duration-700 text-center hover:scale-105 overflow-hidden hover:-translate-y-2`}
//                 style={{ animationDelay: `${index * 0.2}s` }}
//               >
//                 {/* Background gradient overlay */}
//                 <div className={`absolute inset-0 ${feature.lightBg} opacity-0 group-hover/feature:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl md:rounded-3xl`}></div>
                
//                 {/* Decorative elements */}
//                 <div className="absolute -top-2 sm:p-3 md:p-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#ffddd2]/40 to-[#e29578]/20 rounded-full blur-lg opacity-60 group-hover/feature:scale-150 transition-transform duration-700"></div>
//                 <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-[#83c5be]/40 to-[#006d77]/20 rounded-full blur-md opacity-60 group-hover/feature:scale-150 transition-transform duration-700"></div>

//                 <div className="relative z-10">
//                   {/* Enhanced icon container */}
//                   <div className={`relative w-24 h-24 ${feature.bgColor} rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-8 ${feature.shadowColor} shadow-2xl group-hover/feature:scale-110 group-hover/feature:rotate-6 transition-all duration-500`}>
//                     <IconComponent className="w-12 h-12 text-white relative z-10" />
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
//                     <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#ffddd2] to-[#e29578] rounded-full border-3 border-white shadow-lg animate-pulse"></div>
                    
//                     {/* Floating particles around icon */}
//                     <div className="absolute -top-2 -left-2 w-2 h-2 bg-[#83c5be] rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
//                     <div className="absolute -top-1 right-0 w-1 h-1 bg-[#e29578] rounded-full opacity-80 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '1.5s' }}></div>
//                     <div className="absolute bottom-0 -left-1 w-1.5 h-1.5 bg-[#ffddd2] rounded-full opacity-70 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
//                   </div>

//                   {/* Enhanced content */}
//                   <h4 className={`font-black ${feature.accentColor} text-xl mb-2 sm:mb-3 md:mb-4 group-hover/feature:scale-105 transition-transform duration-300`}>
//                     {feature.title}
//                   </h4>
//                   <p className="text-[#006d77]/80 leading-relaxed text-base font-medium mb-3 sm:mb-4 md:mb-6 group-hover/feature:text-[#006d77] transition-colors duration-300">
//                     {feature.description}
//                   </p>

//                   {/* Enhanced progress indicator */}
//                   <div className="relative w-full h-2 bg-[#83c5be]/20 rounded-full overflow-hidden shadow-inner">
//                     <div className={`absolute inset-0 ${feature.bgColor} rounded-full transform -translate-x-full group-hover/feature:translate-x-0 transition-transform duration-1000 ease-out shadow-lg`}></div>
//                     <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
//                   </div>

//                   {/* Floating badge */}
//                   <div className="absolute -top-3 -right-3 bg-gradient-to-br from-[#e29578] to-[#ffddd2] text-white text-xs font-black px-3 py-1 rounded-full shadow-lg opacity-0 group-hover/feature:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/feature:translate-y-0">
//                     ★ PRO
//                   </div>
//                 </div>

//                 {/* Hover border animation */}
//                 <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-transparent group-hover/feature:border-[#83c5be]/50 transition-all duration-500"></div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Enhanced Bottom CTA Section */}
//         <div className="mt-16 relative bg-gradient-to-br from-[#006d77] via-[#83c5be] to-[#006d77] rounded-xl sm:rounded-2xl md:rounded-3xl p-12 text-center overflow-hidden shadow-2xl">
//           {/* Background decorations */}
//           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
//           <div className="absolute -top-4 sm:p-6 md:p-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
//           <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#ffddd2]/30 rounded-full blur-xl"></div>
          
//           <div className="relative z-10">
//             <div className="inline-flex items-center gap-3 mb-3 sm:mb-4 md:mb-6">
//               <Trophy className="w-8 h-8 text-[#ffddd2]" />
//               <span className="text-[#ffddd2] font-black text-lg tracking-wide">READY TO GET HIRED?</span>
//               <Trophy className="w-8 h-8 text-[#ffddd2]" />
//             </div>
//             <h3 className="text-xl sm:text-2xl md:text-3xl sm:text-4xl font-black text-white mb-2 sm:mb-3 md:mb-4">
//               Join Thousands of Successful Job Seekers
//             </h3>
//             <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
//               Create your professional resume today and land your dream job tomorrow.
//             </p>
//             <div className="flex flex-wrap justify-center gap-3 sm:p-4 md:p-6">
//               <div className="flex items-center gap-2 text-white/90">
//                 <Users className="w-5 h-5" />
//                 <span className="font-bold">50K+ Users</span>
//               </div>
//               <div className="flex items-center gap-2 text-white/90">
//                 <Star className="w-5 h-5 fill-current text-[#ffddd2]" />
//                 <span className="font-bold">4.9/5 Rating</span>
//               </div>
//               <div className="flex items-center gap-2 text-white/90">
//                 <Target className="w-5 h-5" />
//                 <span className="font-bold">95% Success Rate</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ResumeData, SectionType } from './types';
import { sampleResumeData } from './sampleData';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
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
              <div className="bg-white rounded-2xl p-4 border border-[#83c5be]/20">
                <div className="overflow-x-auto">
                  <div className="min-w-[595px]"> {/* A4 width */}
                    <div className="transform scale-[0.7] origin-top-left sm:scale-75 md:scale-100">
                      <ResumePreview resumeData={resumeData} />
                    </div>
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
