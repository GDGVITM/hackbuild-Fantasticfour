import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">EduMitra</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/resume-builder" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Resume Builder
              </Link>
              <Link href="/interview-resources" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Interview Resources
              </Link>
              <Link href="/test-resume" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Test Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="font-sans flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] items-center text-center">
          <div className="flex items-center space-x-4">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
            <span className="text-3xl font-bold text-gray-400">+</span>
            <div className="text-2xl font-bold text-blue-600">AI Resume Builder</div>
          </div>
          
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Professional Resumes with AI
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Build stunning resumes using our AI-powered platform and prepare for interviews with our comprehensive resource collection covering all engineering branches - from DSA sheets to core engineering concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">Generate professional content using Google Gemini AI technology</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">JSON-Based</h3>
              <p className="text-gray-600 text-sm">Structure your data for easy version control and collaboration</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Ready</h3>
              <p className="text-gray-600 text-sm">Download as markdown or JSON for any platform or service</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Prep</h3>
              <p className="text-gray-600 text-sm">Access curated resources for all engineering branches and coding interviews</p>
            </div>
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-12 px-6 sm:px-8"
              href="/resume-builder"
            >
              🚀 Start Building Resume
            </Link>
            <Link
              className="rounded-full border border-solid border-orange-600 text-orange-600 transition-colors flex items-center justify-center hover:bg-orange-50 font-medium text-sm sm:text-base h-12 px-6 sm:px-8"
              href="/interview-resources"
            >
              📚 Interview Resources
            </Link>
            <Link
              className="rounded-full border border-solid border-blue-600 text-blue-600 transition-colors flex items-center justify-center hover:bg-blue-50 font-medium text-sm sm:text-base h-12 px-6 sm:px-8"
              href="/test-resume"
            >
              🎯 Try Demo
            </Link>
          </div>

          <div className="text-sm text-gray-500 max-w-md">
            <p>✨ <strong>New:</strong> Comprehensive interview resources for all engineering branches</p>
            <p>🤖 Powered by Google Gemini AI for intelligent content generation</p>
            <p>📚 DSA sheets, core engineering concepts, and aptitude resources</p>
          </div>
        </main>
        
        <footer className="flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500">
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/resume-builder"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Resume Builder
          </Link>
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/interview-resources"
          >
            <Image
              aria-hidden
              src="/book.svg"
              alt="Resources icon"
              width={16}
              height={16}
            />
            Interview Resources
          </Link>
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/test-resume"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Test Demo
          </Link>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/GDGVITM/hackbuild-Fantasticfour"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            View on GitHub →
          </a>
        </footer>
      </div>
    </div>
  );
}