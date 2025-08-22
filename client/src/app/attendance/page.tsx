"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Same color palette
const COLORS = {
  darkTeal: '#006d77',
  lightTeal: '#83c5be', 
  lightBlue: '#edf6f9',
  peach: '#ffddd2',
  coral: '#e29578',
  white: '#ffffff',
  gray: '#f8fafc',
  darkGray: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444'
};

// Student interface
interface Student {
  id: string;
  name: string;
  rollNumber: string;
  avatar?: string;
  attendanceStatus: 'present' | 'absent' | 'late' | 'excused' | 'pending';
  lastAttendance?: string;
  attendancePercentage: number;
}

// Class information interface
interface ClassInfo {
  id: string;
  subject: string;
  className: string;
  instructor: string;
  room: string;
  time: string;
  date: string;
  duration: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'exam';
}

// Static data for the class
const CLASS_INFO: ClassInfo = {
  id: '1',
  subject: 'Advanced Mathematics',
  className: 'Grade 12-A',
  instructor: 'Dr. Sarah Smith',
  room: 'Room 101',
  time: '9:00 AM - 10:30 AM',
  date: 'Friday, August 22, 2025',
  duration: '90 minutes',
  type: 'lecture'
};

// Static student data
const STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    rollNumber: 'MTH2025001',
    attendanceStatus: 'present',
    lastAttendance: '2025-08-21',
    attendancePercentage: 95.2
  },
  {
    id: '2',
    name: 'Bob Chen',
    rollNumber: 'MTH2025002',
    attendanceStatus: 'present',
    lastAttendance: '2025-08-21',
    attendancePercentage: 88.7
  },
  {
    id: '3',
    name: 'Catherine Davis',
    rollNumber: 'MTH2025003',
    attendanceStatus: 'late',
    lastAttendance: '2025-08-20',
    attendancePercentage: 91.3
  },
  {
    id: '4',
    name: 'David Wilson',
    rollNumber: 'MTH2025004',
    attendanceStatus: 'absent',
    lastAttendance: '2025-08-19',
    attendancePercentage: 76.5
  },
  {
    id: '5',
    name: 'Emma Thompson',
    rollNumber: 'MTH2025005',
    attendanceStatus: 'present',
    lastAttendance: '2025-08-21',
    attendancePercentage: 97.8
  },
  {
    id: '6',
    name: 'Frank Rodriguez',
    rollNumber: 'MTH2025006',
    attendanceStatus: 'excused',
    lastAttendance: '2025-08-21',
    attendancePercentage: 82.1
  },
  {
    id: '7',
    name: 'Grace Kim',
    rollNumber: 'MTH2025007',
    attendanceStatus: 'present',
    lastAttendance: '2025-08-21',
    attendancePercentage: 93.6
  },
  {
    id: '8',
    name: 'Henry Lee',
    rollNumber: 'MTH2025008',
    attendanceStatus: 'pending',
    lastAttendance: '2025-08-20',
    attendancePercentage: 85.4
  }
];

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | 'pending';

export default function AttendancePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<AttendanceStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());

  // Get URL parameters
  const subject = searchParams.get('subject') || CLASS_INFO.subject;
  const className = searchParams.get('class') || CLASS_INFO.className;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const getStatusStyle = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return { 
          backgroundColor: COLORS.success, 
          color: COLORS.white, 
          icon: '✅',
          label: 'Present'
        };
      case 'absent':
        return { 
          backgroundColor: COLORS.danger, 
          color: COLORS.white, 
          icon: '❌',
          label: 'Absent'
        };
      case 'late':
        return { 
          backgroundColor: COLORS.warning, 
          color: COLORS.white, 
          icon: '⏰',
          label: 'Late'
        };
      case 'excused':
        return { 
          backgroundColor: COLORS.lightTeal, 
          color: COLORS.darkTeal, 
          icon: '📝',
          label: 'Excused'
        };
      case 'pending':
        return { 
          backgroundColor: COLORS.darkGray, 
          color: COLORS.white, 
          icon: '⏳',
          label: 'Pending'
        };
      default:
        return { 
          backgroundColor: COLORS.gray, 
          color: COLORS.darkTeal, 
          icon: '❓',
          label: 'Unknown'
        };
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return COLORS.success;
    if (percentage >= 75) return COLORS.warning;
    return COLORS.danger;
  };

  const updateAttendance = (studentId: string, status: AttendanceStatus) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, attendanceStatus: status }
        : student
    ));
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  };

  const bulkUpdateAttendance = (status: AttendanceStatus) => {
    setStudents(prev => prev.map(student => 
      selectedStudents.has(student.id)
        ? { ...student, attendanceStatus: status }
        : student
    ));
    setSelectedStudents(new Set());
  };

  const filteredStudents = students.filter(student => {
    const matchesFilter = selectedFilter === 'all' || student.attendanceStatus === selectedFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const attendanceStats = {
    total: students.length,
    present: students.filter(s => s.attendanceStatus === 'present').length,
    absent: students.filter(s => s.attendanceStatus === 'absent').length,
    late: students.filter(s => s.attendanceStatus === 'late').length,
    excused: students.filter(s => s.attendanceStatus === 'excused').length,
    pending: students.filter(s => s.attendanceStatus === 'pending').length
  };

  const presentPercentage = ((attendanceStats.present + attendanceStats.late) / attendanceStats.total * 100).toFixed(1);
  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: `linear-gradient(to bottom, ${COLORS.lightBlue} 0%, ${COLORS.white} 100%)`
      }}
    >
      {/* Header */}
        <header 
        className="sticky top-0 z-20 backdrop-blur-lg border-b shadow-lg"
        style={{ 
            background: `linear-gradient(135deg, ${COLORS.darkTeal}f0 0%, ${COLORS.lightTeal}e0 100%)`,
            borderBottomColor: `${COLORS.lightTeal}40`
        }}
        >
        <div className="px-6 py-4">
            <div className="flex items-center space-x-4 mb-4">
            <button
                onClick={() => router.back()}
                className="p-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                style={{ 
                backgroundColor: `${COLORS.lightBlue}40`,
                color: COLORS.darkTeal
                }}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            
            <div className="flex-1">
                <h1 
                className="text-xl font-black"
                style={{ 
                    background: `linear-gradient(135deg, ${COLORS.lightBlue} 0%, ${COLORS.peach} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}
                >
                📋 Attendance Sheet
                </h1>
                <p 
                className="text-sm font-medium"
                style={{ color: COLORS.lightTeal }}
                >
                {subject} • {className}
                </p>
            </div>
            </div>

            {/* Class Information Card - Simplified */}
            <div 
            className="rounded-xl p-4 shadow-sm border"
            style={{ 
                backgroundColor: `${COLORS.lightBlue}60`,
                borderColor: `${COLORS.lightTeal}60`
            }}
            >
            <div className="flex items-center justify-between text-sm">
                <div>
                <span 
                    className="font-bold"
                    style={{ color: COLORS.darkTeal }}
                >
                    👨‍🏫 {CLASS_INFO.instructor}
                </span>
                </div>
                <div>
                <span 
                    className="font-bold"
                    style={{ color: COLORS.darkTeal }}
                >
                    📅 Today • {CLASS_INFO.time}
                </span>
                </div>
            </div>
            </div>
        </div>
        </header>

        {/* 🔽 Filters are now OUTSIDE the header */}
        <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
            { key: 'all', label: 'All', icon: '👥', color: COLORS.darkTeal },
            { key: 'present', label: 'Present', icon: '✅', color: COLORS.success },
            { key: 'absent', label: 'Absent', icon: '❌', color: COLORS.danger },
            { key: 'late', label: 'Late', icon: '⏰', color: COLORS.warning }
            ].map((filter) => (
            <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`w-full px-2 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex flex-col items-center justify-center space-y-1 min-h-[60px] ${
                selectedFilter === filter.key 
                    ? 'shadow-md scale-105' 
                    : 'opacity-80 hover:opacity-100 active:scale-95 shadow-sm'
                }`}
                style={{
                backgroundColor: selectedFilter === filter.key ? filter.color : COLORS.white,
                color: selectedFilter === filter.key ? COLORS.white : filter.color,
                border: `2px solid ${selectedFilter === filter.key ? filter.color : `${filter.color}40`}`
                }}
            >
                <span className="text-lg">{filter.icon}</span>
                <span className="text-xs font-black leading-tight">{filter.label}</span>
            </button>
            ))}
        </div>
        </div>


      {/* Main Content */}
      <div className="px-6 py-6 pb-32">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-xl border-2 font-medium"
            style={{ borderColor: COLORS.lightTeal, color: COLORS.darkTeal }}
          />
        </div>

        {/* Attendance Summary - Compact */}
        <div 
          className="rounded-2xl p-4 shadow-lg border-2 mb-6"
          style={{ backgroundColor: COLORS.white, borderColor: COLORS.lightTeal }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div 
                className="text-2xl font-black"
                style={{ color: getAttendanceColor(parseFloat(presentPercentage)) }}
              >
                {presentPercentage}%
              </div>
              <div 
                className="text-sm font-medium"
                style={{ color: COLORS.darkTeal }}
              >
                Attendance Rate
              </div>
            </div>
            <div className="text-right">
              <div 
                className="text-2xl font-black"
                style={{ color: COLORS.darkTeal }}
              >
                {attendanceStats.present + attendanceStats.late}/{attendanceStats.total}
              </div>
              <div 
                className="text-sm font-medium"
                style={{ color: COLORS.darkTeal }}
              >
                Students Present
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions - Only show when students selected */}
        {selectedStudents.size > 0 && (
          <div 
            className="rounded-xl p-4 mb-6 shadow-lg border-2"
            style={{ backgroundColor: COLORS.peach, borderColor: COLORS.coral }}
          >
            <div className="flex items-center justify-between mb-3">
              <span 
                className="font-bold"
                style={{ color: COLORS.darkTeal }}
              >
                {selectedStudents.size} selected
              </span>
              <button
                onClick={() => setSelectedStudents(new Set())}
                className="text-sm font-medium"
                style={{ color: COLORS.coral }}
              >
                Clear
              </button>
            </div>
            
            <div className="flex space-x-2">
              {[
                { status: 'present', label: 'Present', icon: '✅' },
                { status: 'absent', label: 'Absent', icon: '❌' },
                { status: 'late', label: 'Late', icon: '⏰' },
                { status: 'excused', label: 'Excused', icon: '📝' }
              ].map((action) => (
                <button
                  key={action.status}
                  onClick={() => bulkUpdateAttendance(action.status as AttendanceStatus)}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 active:scale-95"
                  style={{ 
                    backgroundColor: getStatusStyle(action.status as AttendanceStatus).backgroundColor,
                    color: getStatusStyle(action.status as AttendanceStatus).color
                  }}
                >
                  {action.icon}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Student List - Fixed Layout */}
        <div className="space-y-3">
          {filteredStudents.map((student) => {
            const statusStyle = getStatusStyle(student.attendanceStatus);
            const isSelected = selectedStudents.has(student.id);
            
            return (
              <div
                key={student.id}
                className={`p-4 rounded-lg ring-2 ${
    isSelected ? "ring-coral" : "ring-transparent"
  }`}
                style={{ 
                  backgroundColor: COLORS.white,
                  borderColor: isSelected ? COLORS.coral : COLORS.lightTeal,
                }}
              >
                <div className="flex items-center space-x-4">
                  {/* Selection Checkbox */}
                  <button
                    onClick={() => toggleStudentSelection(student.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      isSelected ? 'scale-110' : ''
                    }`}
                    style={{ 
                      borderColor: isSelected ? COLORS.coral : COLORS.lightTeal,
                      backgroundColor: isSelected ? COLORS.coral : 'transparent'
                    }}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: COLORS.white }}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  {/* Student Avatar */}
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0"
                    style={{ 
                      backgroundColor: `${COLORS.lightTeal}20`,
                      color: COLORS.darkTeal
                    }}
                  >
                    {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>

                  {/* Student Info - Fixed spacing */}
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-bold text-lg mb-1 truncate"
                      style={{ color: COLORS.darkTeal }}
                    >
                      {student.name}
                    </h3>
                    <div className="flex flex-col space-y-1">
                      <span 
                        className="text-sm font-medium"
                        style={{ color: COLORS.darkGray }}
                      >
                        🆔 {student.rollNumber}
                      </span>
                      <span 
                        className="text-sm font-bold"
                        style={{ color: getAttendanceColor(student.attendancePercentage) }}
                      >
                        {student.attendancePercentage}% overall
                      </span>
                    </div>
                  </div>

                  {/* Status Button - Large and clear */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => {
                        // Cycle through statuses
                        const statuses: AttendanceStatus[] = ['present', 'absent', 'late', 'excused'];
                        const currentIndex = statuses.indexOf(student.attendanceStatus);
                        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                        updateAttendance(student.id, nextStatus);
                      }}
                      className="px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
                      style={{ 
                        backgroundColor: statusStyle.backgroundColor,
                        color: statusStyle.color
                      }}
                    >
                      {statusStyle.icon} {statusStyle.label}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-6 left-6 right-6 z-10">
        <button
          onClick={() => {
            // Save attendance logic here
            alert('Attendance saved successfully!');
          }}
          className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
          style={{ 
            backgroundColor: COLORS.success,
            color: COLORS.white,
            boxShadow: `0 10px 30px ${COLORS.success}40`
          }}
        >
          💾 Save Attendance ({attendanceStats.total} students)
        </button>
      </div>
    </div>
  );
}
