'use client';

import auth from '../../lib/auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// --- Icon Components (for clarity and reusability) ---
const OverviewIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CoursesIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>;
const CareerIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const SettingsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('Alex');

  useEffect(() => {
    (async () => {
      const u = await auth.getStoredUsername();
      if (u) setUsername(u);
    })();
  }, []);

  return (
    <div className="min-h-screen flex bg-[#edf6f9]">
      {/* --- Sidebar --- */}
      <aside className={`fixed inset-y-0 left-0 bg-[#006d77] text-white w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
        <div className="flex items-center justify-center h-20 border-b border-white/20">
          <Link href="/" className="text-2xl font-bold">StudySphere</Link>
        </div>
        <nav className="mt-6">
          <Link href="/community" className="flex items-center px-6 py-3 text-base font-semibold bg-white/10"><OverviewIcon /><span className="ml-4">Overview</span></Link>
          <Link href="/quiz-creator" className="flex items-center px-6 py-3 text-base hover:bg-white/10"><CoursesIcon /><span className="ml-4">Quiz Creator</span></Link>
          <Link href="/home" className="flex items-center px-6 py-3 text-base hover:bg-white/10"><CareerIcon /><span className="ml-4">All Features</span></Link>
          <Link href="#" className="flex items-center px-6 py-3 text-base hover:bg-white/10"><SettingsIcon /><span className="ml-4">Settings</span></Link>
        </nav>
        <div className="absolute bottom-0 w-full">
            <Link href="/login" className="flex items-center px-6 py-4 text-base hover:bg-white/10"><LogoutIcon /><span className="ml-4">Logout</span></Link>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col">
        {/* --- Top Bar --- */}
        <header className="flex items-center justify-between h-16 bg-white shadow-sm px-4 sm:px-6 md:h-20">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-[#006d77]">
                <OverviewIcon />
            </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome, {username}!</h1>
          <div className="flex items-center">
            {/* User Profile */}
            <Link href="/dashboard/profile" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#e29578] flex items-center justify-center text-white font-bold">{username?.[0]?.toUpperCase() || 'U'}</div>
              <span className="hidden md:block font-medium text-gray-700">{username}</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* --- Quick Stats --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Overall Attendance</h3>
              <p className="mt-2 text-3xl font-bold text-[#006d77]">92%</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Upcoming Deadlines</h3>
              <p className="mt-2 text-3xl font-bold text-[#e29578]">3</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Courses Enrolled</h3>
              <p className="mt-2 text-3xl font-bold text-[#006d77]">5</p>
            </div>
             <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Study Streak</h3>
              <p className="mt-2 text-3xl font-bold text-[#006d77]">12 Days</p>
            </div>
          </div>

          {/* --- Main Dashboard Sections --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Tasks */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Tasks & Deadlines</h2>
              <ul className="space-y-4">
                <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-semibold">Physics Assignment 2</p>
                    <p className="text-sm text-gray-500">Due: August 25, 2025</p>
                  </div>
                  <span className="px-3 py-1 text-sm font-semibold text-white bg-[#e29578] rounded-full">High Priority</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-semibold">Math Quiz 4</p>
                    <p className="text-sm text-gray-500">Due: August 28, 2025</p>
                  </div>
                   <span className="px-3 py-1 text-sm font-semibold text-white bg-[#83c5be] rounded-full">Medium Priority</span>
                </li>
                 <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-semibold">History Essay Outline</p>
                    <p className="text-sm text-gray-500">Due: September 2, 2025</p>
                  </div>
                   <span className="px-3 py-1 text-sm font-semibold text-white bg-[#83c5be] rounded-full">Medium Priority</span>
                </li>
              </ul>
            </div>

            {/* Career Progress */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Career Prep Progress</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume Completion</label>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-[#006d77] h-2.5 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Mock Interviews</label>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-[#006d77] h-2.5 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Skills Assessment</label>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-[#006d77] h-2.5 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"></div>}
    </div>
  );
}
