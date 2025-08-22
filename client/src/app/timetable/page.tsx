"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

// Color palette from your URL
const COLORS = {
  darkTeal: '#006d77',
  lightTeal: '#83c5be', 
  lightBlue: '#edf6f9',
  peach: '#ffddd2',
  coral: '#e29578'
};

// Sample timetable data structure
interface TimeSlot {
  time: string;
  subject?: string;
  room?: string;
  teacher?: string;
}

const SAMPLE_TIMETABLE: { [key: string]: TimeSlot[] } = {
  Monday: [
    { time: '9:00 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Dr. Smith' },
    { time: '10:30 AM', subject: 'Physics', room: 'Lab 2', teacher: 'Prof. Johnson' },
    { time: '12:00 PM', subject: 'Lunch Break' },
    { time: '1:00 PM', subject: 'English', room: 'Room 205', teacher: 'Ms. Davis' },
    { time: '2:30 PM', subject: 'Chemistry', room: 'Lab 1', teacher: 'Dr. Wilson' },
  ],
  Tuesday: [
    { time: '9:00 AM', subject: 'History', room: 'Room 102', teacher: 'Mr. Brown' },
    { time: '10:30 AM', subject: 'Biology', room: 'Lab 3', teacher: 'Dr. Taylor' },
    { time: '12:00 PM', subject: 'Lunch Break' },
    { time: '1:00 PM', subject: 'Art', room: 'Studio A', teacher: 'Ms. Garcia' },
    { time: '2:30 PM', subject: 'PE', room: 'Gymnasium', teacher: 'Coach Miller' },
  ],
  Wednesday: [
    { time: '9:00 AM', subject: 'Computer Science', room: 'Lab 4', teacher: 'Mr. Lee' },
    { time: '10:30 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Dr. Smith' },
    { time: '12:00 PM', subject: 'Lunch Break' },
    { time: '1:00 PM', subject: 'Geography', room: 'Room 203', teacher: 'Ms. Anderson' },
    { time: '2:30 PM', subject: 'Music', room: 'Music Room', teacher: 'Mr. Thompson' },
  ],
  Thursday: [
    { time: '9:00 AM', subject: 'Literature', room: 'Room 206', teacher: 'Ms. White' },
    { time: '10:30 AM', subject: 'Physics', room: 'Lab 2', teacher: 'Prof. Johnson' },
    { time: '12:00 PM', subject: 'Lunch Break' },
    { time: '1:00 PM', subject: 'Spanish', room: 'Room 301', teacher: 'Señora Martinez' },
    { time: '2:30 PM', subject: 'Study Hall', room: 'Library' },
  ],
  Friday: [
    { time: '9:00 AM', subject: 'Psychology', room: 'Room 104', teacher: 'Dr. Clark' },
    { time: '10:30 AM', subject: 'Chemistry', room: 'Lab 1', teacher: 'Dr. Wilson' },
    { time: '12:00 PM', subject: 'Lunch Break' },
    { time: '1:00 PM', subject: 'Drama', room: 'Theater', teacher: 'Ms. Roberts' },
    { time: '2:30 PM', subject: 'Free Period' },
  ],
  Saturday: [
    { time: '10:00 AM', subject: 'Extra Classes', room: 'Room 105', teacher: 'Various' },
    { time: '12:00 PM', subject: 'Sports Activity', room: 'Field', teacher: 'Coach Miller' },
  ],
  Sunday: [
    { time: 'All Day', subject: 'Rest Day' },
  ],
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function TimetablePage() {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize to today's day
  useEffect(() => {
    const today = new Date();
    const todayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    setCurrentDayIndex(todayIndex);
    setIsLoading(false);
  }, []);

  const navigateToDay = (direction: 'prev' | 'next') => {
    setCurrentDayIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % 7;
      } else {
        return prev === 0 ? 6 : prev - 1;
      }
    });
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateToDay('next'),
    onSwipedRight: () => navigateToDay('prev'),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const currentDay = DAYS[currentDayIndex];
  const currentTimetable = SAMPLE_TIMETABLE[currentDay] || [];

  const isToday = () => {
    const today = new Date().getDay();
    return currentDayIndex === today;
  };

  const formatDate = () => {
    const today = new Date();
    const targetDate = new Date(today);
    const dayDiff = currentDayIndex - today.getDay();
    targetDate.setDate(today.getDate() + dayDiff);
    
    return targetDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: COLORS.lightBlue }}
      >
        <div className="text-center">
          <div 
            className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: COLORS.darkTeal, borderTopColor: 'transparent' }}
          />
          <p style={{ color: COLORS.darkTeal }}>Loading timetable...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: COLORS.lightBlue }}
    >
      {/* Header */}
      <header 
        className="sticky top-0 z-10 px-4 py-6 shadow-sm"
        style={{ backgroundColor: COLORS.darkTeal }}
      >
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigateToDay('prev')}
            className="p-2 rounded-full transition-colors hover:bg-opacity-20 hover:bg-white"
            style={{ color: COLORS.lightBlue }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center flex-1">
            <h1 
              className="text-xl font-bold mb-1"
              style={{ color: COLORS.lightBlue }}
            >
              {currentDay}
              {isToday() && (
                <span 
                  className="ml-2 px-2 py-1 text-xs font-medium rounded-full"
                  style={{ 
                    backgroundColor: COLORS.coral, 
                    color: COLORS.darkTeal 
                  }}
                >
                  Today
                </span>
              )}
            </h1>
            <p 
              className="text-sm opacity-90"
              style={{ color: COLORS.lightTeal }}
            >
              {formatDate()}
            </p>
          </div>

          <button
            onClick={() => navigateToDay('next')}
            className="p-2 rounded-full transition-colors hover:bg-opacity-20 hover:bg-white"
            style={{ color: COLORS.lightBlue }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Day navigation dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {DAYS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDayIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentDayIndex ? 'scale-125' : 'opacity-50 hover:opacity-75'
              }`}
              style={{ 
                backgroundColor: index === currentDayIndex ? COLORS.coral : COLORS.lightTeal 
              }}
            />
          ))}
        </div>
      </header>

      {/* Swipeable Content */}
      <div 
        {...swipeHandlers}
        ref={containerRef}
        className="px-4 py-6 pb-20"
      >
        {/* Swipe instruction */}
        <div className="text-center mb-6">
          <p 
            className="text-sm opacity-70"
            style={{ color: COLORS.darkTeal }}
          >
            ← Swipe to navigate between days →
          </p>
        </div>

        {/* Timetable */}
        <div className="space-y-3">
          {currentTimetable.length > 0 ? (
            currentTimetable.map((slot, index) => (
              <div
                key={index}
                className="rounded-xl p-4 shadow-sm border border-opacity-20 transition-transform active:scale-[0.98]"
                style={{ 
                  backgroundColor: slot.subject === 'Lunch Break' || slot.subject === 'Free Period' || slot.subject === 'Rest Day'
                    ? COLORS.peach 
                    : 'white',
                  borderColor: COLORS.lightTeal
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div 
                      className="text-sm font-medium mb-1"
                      style={{ color: COLORS.darkTeal }}
                    >
                      {slot.time}
                    </div>
                    {slot.subject && (
                      <div 
                        className="font-semibold text-lg mb-1"
                        style={{ color: COLORS.darkTeal }}
                      >
                        {slot.subject}
                      </div>
                    )}
                    {slot.room && (
                      <div 
                        className="text-sm"
                        style={{ color: COLORS.coral }}
                      >
                        📍 {slot.room}
                      </div>
                    )}
                    {slot.teacher && (
                      <div 
                        className="text-sm mt-1"
                        style={{ color: COLORS.darkTeal, opacity: 0.7 }}
                      >
                        👨‍🏫 {slot.teacher}
                      </div>
                    )}
                  </div>
                  
                  {slot.subject && slot.subject !== 'Lunch Break' && slot.subject !== 'Free Period' && slot.subject !== 'Rest Day' && (
                    <div 
                      className="w-4 h-4 rounded-full ml-3 mt-1 flex-shrink-0"
                      style={{ backgroundColor: COLORS.lightTeal }}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div 
              className="text-center py-12 rounded-xl"
              style={{ backgroundColor: COLORS.peach }}
            >
              <div className="text-4xl mb-2">📅</div>
              <p 
                className="font-medium"
                style={{ color: COLORS.darkTeal }}
              >
                No classes scheduled
              </p>
              <p 
                className="text-sm mt-1 opacity-70"
                style={{ color: COLORS.darkTeal }}
              >
                Enjoy your free day!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-4"
        style={{ backgroundColor: COLORS.darkTeal }}
      >
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              const today = new Date().getDay();
              setCurrentDayIndex(today);
            }}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              isToday() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
            }`}
            style={{ 
              backgroundColor: isToday() ? COLORS.lightTeal : COLORS.coral,
              color: COLORS.darkTeal
            }}
            disabled={isToday()}
          >
            {isToday() ? 'You are here' : 'Go to Today'}
          </button>
        </div>
      </div>
    </div>
  );
}
