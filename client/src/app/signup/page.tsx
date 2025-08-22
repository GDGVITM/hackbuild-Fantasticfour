'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    branch: '',
    year: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Form Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.name,
          name: formData.name,
          college: formData.college,
          branch: formData.branch,
          year: formData.year,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError('Failed to create account. Email might already be in use.');
        return;
      }

      // Store token and username in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);

      // Redirect to dashboard
      router.push('/dashboard');

    } catch (err) {
      setError('Failed to create account. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20 relative overflow-hidden">
      {/* Enhanced Animated Background - Matching Landing Page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#83c5be]/10 to-[#006d77]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#ffddd2]/20 to-[#e29578]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#83c5be]/5 to-[#006d77]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="text-center animate-in fade-in zoom-in duration-1000">
            {/* EduMitra Logo - Matching Landing Page */}
            <Link href="/" className="group inline-flex items-center space-x-3 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-4xl font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">EduMitra</span>
            </Link>
            
            <h2 className="mt-8 text-center text-4xl font-black bg-gradient-to-r from-[#006d77] via-[#83c5be] to-[#006d77] bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000 delay-300">
              Join the Revolution! 🚀
            </h2> 
            <p className="mt-3 text-center text-lg bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000 delay-500 max-w-2xl mx-auto">
              Join thousands of students on their educational journey to success
            </p>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl animate-in slide-in-from-bottom-4 duration-1000 delay-700">
          <div className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-2xl rounded-3xl border border-white/20 hover:shadow-3xl transition-all duration-300">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#006d77] to-[#83c5be] rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-[#83c5be]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/20 focus:border-[#006d77] focus:bg-white transition-all duration-300 text-base text-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-2">Email address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-[#83c5be]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/20 focus:border-[#006d77] focus:bg-white transition-all duration-300 text-base text-gray-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#83c5be] to-[#e29578] bg-clip-text text-transparent flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#83c5be] to-[#e29578] rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Academic Details
                </h3>

                <div>
                  <label htmlFor="college" className="block text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-2">College/University</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-[#83c5be]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <input
                      id="college"
                      name="college"
                      type="text"
                      required
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="Your College Name"
                      className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/20 focus:border-[#006d77] focus:bg-white transition-all duration-300 text-base text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="branch" className="block text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-2">Branch/Course</label>
                    <div className="relative">
                      <select
                        id="branch"
                        name="branch"
                        required
                        value={formData.branch}
                        onChange={handleChange}
                        className="block w-full pl-4 pr-10 py-4 border border-gray-200 rounded-2xl shadow-sm bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/20 focus:border-[#006d77] focus:bg-white transition-all duration-300 text-base appearance-none text-gray-800"
                      >
                        <option value="">Select Branch</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-[#83c5be]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="year" className="block text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-2">Current Year</label>
                    <div className="relative">
                      <select
                        id="year"
                        name="year"
                        required
                        value={formData.year}
                        onChange={handleChange}
                        className="block w-full pl-4 pr-10 py-4 border border-gray-200 rounded-2xl shadow-sm bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/20 focus:border-[#006d77] focus:bg-white transition-all duration-300 text-base appearance-none text-gray-800"
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-[#83c5be]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#e29578] to-[#ffddd2] bg-clip-text text-transparent flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#e29578] to-[#ffddd2] rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  Security
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-[#83c5be]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        className="block w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/20 focus:border-[#006d77] focus:bg-white transition-all duration-300 text-base text-gray-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        <svg className="h-5 w-5 text-[#83c5be] hover:text-[#006d77] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showPassword ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-2">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-[#83c5be]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="block w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/20 focus:border-[#006d77] focus:bg-white transition-all duration-300 text-base text-gray-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        <svg className="h-5 w-5 text-[#83c5be] hover:text-[#006d77] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showConfirmPassword ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-[#006d77] focus:ring-[#006d77]/20 border-gray-300 rounded transition-all duration-200"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent font-medium">
                    I agree to the{' '}
                    <Link href="/terms" className="font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent hover:from-[#e29578] hover:to-[#ffddd2] transition-all duration-200">Terms & Conditions</Link> and{' '}
                    <Link href="/privacy" className="font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent hover:from-[#e29578] hover:to-[#ffddd2] transition-all duration-200">Privacy Policy</Link>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-[#006d77] to-[#83c5be] hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#83c5be]/30 disabled:opacity-50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#83c5be] to-[#006d77] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="relative z-10">Creating account...</span>
                    </>
                  ) : (
                    <span className="relative z-10 flex items-center">
                      Create your account
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent font-medium backdrop-blur-sm">Already have an account?</span>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="group relative w-full flex justify-center py-4 px-4 border-2 border-[#e29578] rounded-2xl shadow-lg text-base font-semibold bg-gradient-to-r from-[#e29578] to-[#ffddd2] bg-clip-text text-transparent bg-white/90 backdrop-blur-sm hover:bg-[#e29578] hover:text-white hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#e29578]/30 transition-all duration-300"
                >
                  <span className="flex items-center group-hover:text-white">
                    Sign in instead
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
