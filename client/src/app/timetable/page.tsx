"use client";

import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import { SAMPLE_TIMETABLE, DAYS, TimeSlot } from '@/lib/timetableData';
import UpdateTimetableModal from '@/components/UpdateTimetableModal';

// Enhanced color palette
const COLORS = {
  darkTeal: '#006d77',
  lightTeal: '#83c5be', 
  lightBlue: '#edf6f9',
  peach: '#ffddd2',
  coral: '#e29578',
  // Additional colors for better UI
  white: '#ffffff',
  gray: '#f8fafc',
  darkGray: '#64748b',
  success: '#10b981',
  warning: '#f59e0b'
};

// Sample timetable data structure is now imported from '@/lib/timetableData'

// Enhanced type colors and icons
const getTypeStyle = (type?: string) => {
  switch (type) {
    case 'class':
      return {
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightTeal,
        icon: '📚',
        iconBg: COLORS.lightTeal
      };
    case 'lab':
      return {
        backgroundColor: COLORS.white,
        borderColor: COLORS.coral,
        icon: '🔬',
        iconBg: COLORS.coral
      };
    case 'break':
      return {
        backgroundColor: COLORS.peach,
        borderColor: COLORS.coral,
        icon: '🍽️',
        iconBg: COLORS.coral
      };
    case 'exam':
      return {
        backgroundColor: COLORS.white,
        borderColor: COLORS.warning,
        icon: '📝',
        iconBg: COLORS.warning
      };
    case 'free':
      return {
        backgroundColor: COLORS.gray,
        borderColor: COLORS.lightTeal,
        icon: '⏰',
        iconBg: COLORS.success
      };
    default:
      return {
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightTeal,
        icon: '📅',
        iconBg: COLORS.lightTeal
      };
  }
};

export default function TimetablePage() {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    const today = new Date();
    const todayIndex = today.getDay();
    setCurrentDayIndex(todayIndex);
    
    // Simulate loading for smooth animation
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const navigateToDay = (direction: 'prev' | 'next') => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDayIndex(prev => {
        if (direction === 'next') {
          return (prev + 1) % 7;
        } else {
          return prev === 0 ? 6 : prev - 1;
        }
      });
      setIsTransitioning(false);
    }, 150);
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    // Use the first touch's clientX; fall back to null if not available
    setTouchEnd(e.touches[0]?.clientX ?? null);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigateToDay('next');
    } else if (isRightSwipe) {
      navigateToDay('prev');
    }
  };

  const currentDay = DAYS[currentDayIndex];
  const currentTimetable = SAMPLE_TIMETABLE[currentDay] || [];
  const hasTimetable = Object.values(SAMPLE_TIMETABLE).some(day => day.length > 0);

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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.darkTeal} 0%, ${COLORS.lightTeal} 100%)`
        }}
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse"
            style={{ backgroundColor: COLORS.coral }}
          />
          <div 
            className="absolute bottom-32 right-8 w-24 h-24 rounded-full opacity-20 animate-pulse delay-300"
            style={{ backgroundColor: COLORS.peach }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full opacity-20 animate-pulse delay-700"
            style={{ backgroundColor: COLORS.lightBlue }}
          />
        </div>

        <div className="text-center z-10">
          <div className="mb-8">
            <div 
              className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: COLORS.lightBlue, borderTopColor: 'transparent' }}
            />
            <div 
              className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-reverse-spin"
              style={{ borderColor: COLORS.coral, borderTopColor: 'transparent' }}
            />
          </div>
          <h2 
            className="text-2xl font-bold mb-2"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.lightBlue} 0%, ${COLORS.peach} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Loading Your Schedule
          </h2>
          <p 
            className="text-lg font-medium"
            style={{ color: COLORS.peach }}
          >
            Preparing your timetable...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        background: `linear-gradient(to bottom, ${COLORS.lightBlue} 0%, ${COLORS.white} 100%)`
      }}
    >
      {/* Enhanced Header with gradient and glass effect */}
      <header 
        className="sticky top-0 z-20 backdrop-blur-lg border-b shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.darkTeal}f0 0%, ${COLORS.lightTeal}e0 100%)`,
          borderBottomColor: `${COLORS.lightTeal}40`
        }}
      >
        <div className="px-4 py-4 sm:px-6 sm:py-6">
          {/* Top row with navigation and current time */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateToDay('prev')}
              className="p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
              style={{ 
                backgroundColor: `${COLORS.lightBlue}40`,
                color: COLORS.darkTeal,
                backdropFilter: 'blur(10px)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="text-center flex-1 mx-4">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <h1 
                  className={`text-xl sm:text-2xl font-black transition-all duration-300 ${
                    isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                  }`}
                  style={{ 
                    background: `linear-gradient(135deg, ${COLORS.lightBlue} 0%, ${COLORS.peach} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {currentDay}
                </h1>
                {isToday() && (
                  <span 
                    className="px-3 py-1 text-xs font-bold rounded-full shadow-lg animate-pulse"
                    style={{ 
                      backgroundColor: COLORS.coral, 
                      color: COLORS.lightBlue,
                      boxShadow: `0 0 20px ${COLORS.coral}40`
                    }}
                  >
                    TODAY
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center space-x-4">
                <p 
                  className="text-sm font-medium"
                  style={{ color: COLORS.lightTeal }}
                >
                  📅 {formatDate()}
                </p>
                <p 
                  className="text-sm font-medium"
                  style={{ color: COLORS.lightTeal }}
                >
                  🕐 {getCurrentTime()}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateToDay('next')}
              className="p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
              style={{ 
                backgroundColor: `${COLORS.lightBlue}40`,
                color: COLORS.darkTeal,
                backdropFilter: 'blur(10px)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Enhanced day navigation dots */}
          <div className="flex justify-center space-x-3">
            {DAYS.map((day, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentDayIndex(index);
                    setIsTransitioning(false);
                  }, 150);
                }}
                className={`relative transition-all duration-300 ${
                  index === currentDayIndex 
                    ? 'scale-125' 
                    : 'opacity-60 hover:opacity-90 hover:scale-110 active:scale-95'
                }`}
                title={day}
              >
                <div 
                  className={`w-3 h-3 rounded-full ${
                    index === currentDayIndex ? 'shadow-lg' : ''
                  }`}
                  style={{ 
                    backgroundColor: index === currentDayIndex ? COLORS.coral : COLORS.lightTeal,
                    boxShadow: index === currentDayIndex ? `0 0 15px ${COLORS.coral}60` : 'none'
                  }}
                />
                {index === new Date().getDay() && index !== currentDayIndex && (
                  <div 
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS.coral }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Enhanced Swipeable Content */}
      <div 
        ref={containerRef}
        className={`px-4 py-6 sm:px-6 sm:py-8 pb-28 sm:pb-32 transition-all duration-300 ${
          isTransitioning ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Swipe instruction with better design */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full shadow-sm"
            style={{ backgroundColor: `${COLORS.darkTeal}10` }}
          >
            <span className="text-xs">👈</span>
            <span 
              className="text-sm font-medium"
              style={{ color: COLORS.darkTeal }}
            >
              Swipe to navigate
            </span>
            <span className="text-xs">👉</span>
          </div>
        </div>

        {/* Enhanced Timetable */}
        <div className="space-y-4">
          {currentTimetable.length > 0 ? (
            currentTimetable.map((slot, index) => {
              const typeStyle = getTypeStyle(slot.type);
              return (
                <div
                  key={index}
                  className="group rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-2"
                  style={{ 
                    backgroundColor: typeStyle.backgroundColor,
                    borderColor: typeStyle.borderColor,
                  }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Enhanced Icon */}
                    <div 
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${typeStyle.iconBg}20` }}
                    >
                      <span className="text-xl">{typeStyle.icon}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div 
                          className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${COLORS.darkTeal}15`,
                            color: COLORS.darkTeal 
                          }}
                        >
                          {slot.time}
                        </div>
                        {slot.type && (
                          <span 
                            className="text-xs font-medium px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: `${typeStyle.iconBg}20`,
                              color: typeStyle.iconBg
                            }}
                          >
                            {slot.type.toUpperCase()}
                          </span>
                        )}
                      </div>
                      
                      {slot.subject && (
                        <div 
                          className="font-bold text-lg sm:text-xl mb-2 group-hover:text-opacity-80 transition-all duration-300"
                          style={{ 
                            background: `linear-gradient(135deg, ${COLORS.darkTeal} 0%, ${COLORS.coral} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          {slot.subject}
                        </div>
                      )}
                      
                      <div className="flex flex-col space-y-1">
                        {slot.room && (
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: COLORS.coral }}
                            />
                            <span 
                              className="text-sm font-medium"
                              style={{ color: COLORS.darkTeal }}
                            >
                              📍 {slot.room}
                            </span>
                          </div>
                        )}
                        {slot.teacher && (
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: COLORS.lightTeal }}
                            />
                            <span 
                              className="text-sm font-medium"
                              style={{ color: COLORS.darkTeal }}
                            >
                              👨‍🏫 {slot.teacher}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div 
              className="text-center py-12 rounded-3xl shadow-lg border-2 border-dashed"
              style={{ 
                backgroundColor: COLORS.peach,
                borderColor: COLORS.coral
              }}
            >
              <div className="text-5xl mb-4 animate-bounce">🎉</div>
              <p 
                className="font-bold text-lg mb-2"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.darkTeal} 0%, ${COLORS.coral} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                No Classes Today!
              </p>
              <p 
                className="text-sm font-medium"
                style={{ color: COLORS.darkTeal }}
              >
                Time to relax and recharge 🌟
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Bottom Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 backdrop-blur-lg border-t"
        style={{ 
          background: `linear-gradient(to top, ${COLORS.darkTeal}f0 0%, ${COLORS.darkTeal}80 100%)`,
          borderTopColor: `${COLORS.lightTeal}40`
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-around sm:items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto py-3 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 hover:shadow-xl"
            style={{ 
              backgroundColor: COLORS.coral,
              color: COLORS.lightBlue,
              boxShadow: `0 10px 25px ${COLORS.coral}40`
            }}
          >
            {hasTimetable ? 'Update Timetable' : 'Add Timetable'}
          </button>
          <button
            onClick={() => {
              const today = new Date().getDay();
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentDayIndex(today);
                setIsTransitioning(false);
              }, 150);
            }}
            className={`w-full sm:w-auto py-3 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg ${
              isToday() 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 active:scale-95 hover:shadow-xl'
            }`}
            style={{ 
              backgroundColor: isToday() ? COLORS.lightTeal : COLORS.coral,
              color: COLORS.lightBlue,
              boxShadow: isToday() ? 'none' : `0 10px 25px ${COLORS.coral}40`
            }}
            disabled={isToday()}
          >
            {isToday() ? '✅ You are here' : '🏠 Back to Today'}
          </button>
        </div>
      </div>

      <UpdateTimetableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
