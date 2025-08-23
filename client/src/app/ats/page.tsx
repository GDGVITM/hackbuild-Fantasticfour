"use client";
import React, { useState } from "react";
import { Upload, FileText, Target, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { getATSScore, atsResponse } from "@/utlis/ats/ats";

export default function ATSPage() {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [atsFeedback, setAtsFeedback] = useState<string>("");
  const [atsSuggestions, setAtsSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Extract text from PDF using external API
  const extractPdfText = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("pdf_file", file);
    const res = await fetch("https://fantasticfour.onrender.com/pdf/extract-pdf", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to extract PDF text");
    const data = await res.json();
    return data.extracted_text || "";
  };

  const handleUpload = async () => {
    if (!resume || !jd) return;
    setIsLoading(true);
    setScore(null);
    setAtsFeedback("");
    setAtsSuggestions([]);
    try {
      // 1. Extract resume text from PDF
      const resumeText = await extractPdfText(resume);
      // 2. Get ATS score using ats.ts
      const ats: atsResponse = await getATSScore(resumeText, jd);
      setScore(ats.score);
      setAtsFeedback(ats.feedback);
      setAtsSuggestions(ats.suggestions);
    } catch (error) {
      setScore(0);
      setAtsFeedback("Error processing your resume. Please try again.");
      setAtsSuggestions([]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setResume(file);
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#006D77]";
    if (score >= 60) return "text-[#E29578]";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-[#006D77]";
    if (score >= 60) return "bg-[#E29578]";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-[#EDF6F9] p-2 sm:p-4 md:p-6 lg:p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 sm:p-3 md:p-40 -right-40 w-80 h-80 bg-[#83C5BE]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFDDD2]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#83C5BE]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-[#83C5BE]/30 mb-2 sm:mb-3 md:mb-4">
            <Target className="w-5 h-5 text-[#006D77]" />
            <span className="text-sm font-medium text-[#006D77]">AI-Powered ATS Analysis</span>
          </div>
          <h1 className="text-xl sm:text-4xl md:text-3xl lg:text-5xl font-bold text-[#006D77] mb-2 sm:mb-3 md:mb-4 leading-tight">
            ATS Score Checker
          </h1>
          <p className="text-[#006D77]/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Optimize your resume against job descriptions with our intelligent ATS scoring system
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-3 sm:p-4 md:p-6 lg:gap-2 md:gap-4 mb-8">
          {/* Job Description Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xlp-3 sm:p-4 md:p-6 shadow-lg border border-[#83C5BE]/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3 sm:mb-4 md:mb-6">
              <div className="p-2 bg-[#006D77] rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#006D77]">Job Description</h2>
            </div>
            <div className="relative">
              <textarea
                className="w-full h-48 sm:h-56 p-2 sm:p-3 md:p-4 border-2 border-[#83C5BE]/30 rounded-xl bg-white/70 text-[#006D77] placeholder-[#006D77]/50 focus:border-[#006D77] focus:outline-none focus:ring-4 focus:ring-[#006D77]/10 transition-all duration-300 resize-none"
                placeholder="Paste the complete job description here... Include requirements, skills, qualifications, and responsibilities for better analysis."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
              <div className="absolute bottom-3 right-3 text-xs text-[#006D77]/50">
                {jd.length} characters
              </div>
            </div>
          </div>

          {/* Resume Upload Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xlp-3 sm:p-4 md:p-6 shadow-lg border border-[#83C5BE]/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3 sm:mb-4 md:mb-6">
              <div className="p-2 bg-[#E29578] rounded-lg">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#006D77]">Resume Upload</h2>
            </div>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 md:p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-[#006D77] bg-[#006D77]/5"
                  : resume
                  ? "border-[#83C5BE] bg-[#83C5BE]/5"
                  : "border-[#83C5BE]/40 hover:border-[#83C5BE] hover:bg-[#83C5BE]/5"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {resume ? (
                <div className="space-y-3">
                  <CheckCircle className="w-12 h-12 text-[#83C5BE] mx-auto" />
                  <div>
                    <p className="font-medium text-[#006D77]">{resume.name}</p>
                    <p className="text-sm text-[#006D77]/70">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB • PDF
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setResume(null);
                    }}
                    className="text-xs text-[#E29578] hover:text-[#E29578]/80 underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 text-[#83C5BE] mx-auto" />
                  <div>
                    <p className="font-medium text-[#006D77] mb-1">
                      Drop your resume here
                    </p>
                    <p className="text-sm text-[#006D77]/70">
                      or <span className="text-[#006D77] underline">browse files</span>
                    </p>
                  </div>
                  <p className="text-xs text-[#006D77]/50">PDF files only</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleUpload}
            disabled={!resume || !jd || isLoading}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg sm:rounded-xl md:rounded-2xlfont-semibold text-lg transition-all duration-300 transform ${
              !resume || !jd || isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#006D77] text-white hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Get ATS Score
              </>
            )}
          </button>
          {(!resume || !jd) && (
            <p className="text-sm text-[#006D77]/60 mt-3">
              Please upload a resume and add job description to continue
            </p>
          )}
        </div>

        {/* Results Section */}
        {score !== null && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xlp-3 sm:p-4 md:p-6 shadow-xl border border-[#83C5BE]/20 animate-in slide-in-from-bottom duration-500">
            <div className="text-center mb-3 sm:mb-4 md:mb-6">
              <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                <Target className="w-6 h-6 text-[#006D77]" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#006D77]">Your ATS Score</h3>
              </div>
              {/* Animated SVG Circular Progress Bar */}
              <div className="relative w-32 h-32 mx-auto mb-3 sm:mb-4 md:mb-6 flex items-center justify-center">
                <svg className="absolute top-0 left-0" width="128" height="128" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#e5e7eb" /* Tailwind gray-200 */
                    strokeWidth="12"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke={score >= 80 ? "#006D77" : score >= 60 ? "#E29578" : "#ef4444"}
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={2 * Math.PI * 56 * (1 - (score ?? 0) / 100)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                    transform="rotate(-90 64 64)"
                  />
                </svg>
                <div className="absolute w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <span className={`text-xl sm:text-2xl md:text-3xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </span>
                </div>
              </div>
              {/* Score Interpretation */}
              <div className="space-y-3">
                {score >= 80 ? (
                  <div className="flex items-center justify-center gap-2 text-[#006D77]">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Excellent Match!</span>
                  </div>
                ) : score >= 60 ? (
                  <div className="flex items-center justify-center gap-2 text-[#E29578]">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">Good Match</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">Needs Improvement</span>
                  </div>
                )}
                <p className="text-[#006D77]/70 max-w-md mx-auto">
                  {score >= 80
                    ? "Your resume is highly optimized for this job posting!"
                    : score >= 60
                    ? "Your resume has good potential. Consider adding relevant keywords."
                    : "Your resume could benefit from better keyword optimization."}
                </p>
                {atsFeedback && (
                  <div className="mt-4 text-left max-w-2xl mx-auto">
                    <h4 className="font-semibold text-[#006D77] mb-1">Feedback:</h4>
                    <p className="text-[#006D77]/80 text-sm">{atsFeedback}</p>
                  </div>
                )}
                {atsSuggestions && atsSuggestions.length > 0 && (
                  <div className="mt-4 text-left max-w-2xl mx-auto">
                    <h4 className="font-semibold text-[#006D77] mb-1">Suggestions:</h4>
                    <ul className="list-disc pl-5 text-[#006D77]/80 text-sm">
                      {atsSuggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
