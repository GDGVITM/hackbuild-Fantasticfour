"use client";
import React from 'react';

interface UpdateTimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = {
  darkTeal: '#006d77',
  lightTeal: '#83c5be', 
  lightBlue: '#edf6f9',
  peach: '#ffddd2',
  coral: '#e29578',
  white: '#ffffff',
  gray: '#f8fafc',
  darkGray: '#64748b',
};

const UpdateTimetableModal: React.FC<UpdateTimetableModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-white/10 backdrop-blur-md z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100"
        style={{ background: `linear-gradient(135deg, ${COLORS.lightBlue}, ${COLORS.white})`}}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-3xl font-bold"
            style={{ color: COLORS.darkTeal }}
          >
            Update Schedule
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200"
            style={{ color: COLORS.darkGray }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-lg mb-8" style={{ color: COLORS.darkGray }}>
          Choose a method to update your timetable:
        </p>

        <div className="space-y-4">
          <button className="w-full text-left p-5 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center space-x-4" style={{ backgroundColor: COLORS.white, border: `2px solid ${COLORS.lightTeal}` }}>
            <span className="text-2xl">✍️</span>
            <div>
              <span className="font-bold text-lg" style={{ color: COLORS.darkTeal }}>Manual Edit</span>
              <p className="text-sm" style={{ color: COLORS.darkGray }}>Directly edit the timetable grid.</p>
            </div>
          </button>
          <button className="w-full text-left p-5 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center space-x-4" style={{ backgroundColor: COLORS.white, border: `2px solid ${COLORS.coral}` }}>
            <span className="text-2xl">📄</span>
            <div>
              <span className="font-bold text-lg" style={{ color: COLORS.darkTeal }}>Upload Image (OCR)</span>
              <p className="text-sm" style={{ color: COLORS.darkGray }}>Scan a timetable from a picture.</p>
            </div>
          </button>
          <button className="w-full text-left p-5 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center space-x-4" style={{ backgroundColor: COLORS.white, border: `2px solid ${COLORS.darkTeal}` }}>
            <span className="text-2xl">📸</span>
            <div>
              <span className="font-bold text-lg" style={{ color: COLORS.darkTeal }}>Use Camera (OCR)</span>
              <p className="text-sm" style={{ color: COLORS.darkGray }}>Use your device's camera to scan.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTimetableModal;
