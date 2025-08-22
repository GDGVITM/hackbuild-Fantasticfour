"use client";
import { useState } from "react";
import { Upload, FileText, Target, CheckCircle, AlertCircle, Zap } from "lucide-react";

export default function ATSPage() {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!resume || !jd) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ats/score`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setScore(data.score);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e:  React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e:  React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
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
    <div className="min-h-screen bg-[#EDF6F9] p-4 sm:p-6 lg:p-8">
            {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#83C5BE]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFDDD2]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#83C5BE]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-[#83C5BE]/30 mb-4">
            <Target className="w-5 h-5 text-[#006D77]" />
            <span className="text-sm font-medium text-[#006D77]">AI-Powered ATS Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#006D77] mb-4 leading-tight">
            ATS Score Checker
          </h1>
          <p className="text-[#006D77]/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Optimize your resume against job descriptions with our intelligent ATS scoring system
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Job Description Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-[#83C5BE]/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#006D77] rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#006D77]">Job Description</h2>
            </div>
            <div className="relative">
              <textarea
                className="w-full h-48 sm:h-56 p-4 border-2 border-[#83C5BE]/30 rounded-xl bg-white/70 text-[#006D77] placeholder-[#006D77]/50 focus:border-[#006D77] focus:outline-none focus:ring-4 focus:ring-[#006D77]/10 transition-all duration-300 resize-none"
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-[#83C5BE]/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#E29578] rounded-lg">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#006D77]">Resume Upload</h2>
            </div>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
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
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${
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
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-[#83C5BE]/20 animate-in slide-in-from-bottom duration-500">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-[#006D77]" />
                <h3 className="text-2xl font-bold text-[#006D77]">Your ATS Score</h3>
              </div>
              
              {/* Score Circle */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                <div
                  className={`absolute inset-0 rounded-full ${getScoreBg(score)} opacity-20`}
                ></div>
                <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}