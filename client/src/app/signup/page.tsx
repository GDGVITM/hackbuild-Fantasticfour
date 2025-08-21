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
            username: formData.name, // Using name as username
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
    // Using "Alice Blue" for the main background
    <div className="min-h-screen bg-[#edf6f9] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          {/* --- Logo/Brand Name using "Caribbean Current" --- */}
          <Link href="/" className="text-4xl font-bold text-[#006d77] hover:opacity-80 transition-colors">
            EduMitra
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join thousands of students on their educational journey
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* --- Form Fields with updated focus colors --- */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#006d77] focus:border-[#006d77] sm:text-sm" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#006d77] focus:border-[#006d77] sm:text-sm" />
            </div>

            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700">College/University</label>
              <input id="college" name="college" type="text" required value={formData.college} onChange={handleChange} placeholder="Your College Name" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#006d77] focus:border-[#006d77] sm:text-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch/Course</label>
                <select id="branch" name="branch" required value={formData.branch} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#006d77] focus:border-[#006d77] sm:text-sm rounded-md">
                    <option value="">Select Branch</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Current Year</label>
                <select id="year" name="year" required value={formData.year} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#006d77] focus:border-[#006d77] sm:text-sm rounded-md">
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} placeholder="Create a strong password" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#006d77] focus:border-[#006d77] sm:text-sm" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#006d77] focus:border-[#006d77] sm:text-sm" />
            </div>
            
            {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-[#006d77] focus:ring-[#e29578] border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="font-medium text-[#006d77] hover:text-[#e29578]">Terms</Link> and{' '}
                  <Link href="/privacy" className="font-medium text-[#006d77] hover:text-[#e29578]">Privacy Policy</Link>
                </label>
              </div>
            </div>

            {/* --- Submit Button using "Caribbean Current" --- */}
            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#006d77] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006d77] disabled:opacity-50 transition-all">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating account...</span>
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>

          {/* --- Link to Login Page --- */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Already have an account?</span></div>
            </div>
            <div className="mt-6">
              {/* Using "Atomic Tangerine" and "Pale Dogwood" for the secondary button */}
              <Link href="/login" className="w-full flex justify-center py-3 px-4 border border-[#e29578] rounded-lg shadow-sm text-sm font-medium text-[#e29578] bg-white hover:bg-[#ffddd2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e29578] transition-all">
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
