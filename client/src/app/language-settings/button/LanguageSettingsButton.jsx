"use client";

import React, { useState, useRef, useEffect } from 'react';
import LanguageSettingsPage from '@/app/language-settings/page';
import './modal.css';

const LanguageSettingsButton = ({ buttonText = "Language Settings", buttonClassName = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => setIsModalOpen(false);

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <button 
        className={`language-settings-button ${buttonClassName}`}
        onClick={openModal}
        style={{
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
      >
        {buttonText}
      </button>

      {isModalOpen && (
        <div className="modal-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className="modal-container" ref={modalRef} style={{
            backgroundColor: '#121212',
            color: '#e0e0e0',
            border: '1px solid #333',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            width: '80%',
            maxWidth: '1200px'
          }}>
            <button className="modal-close-button" onClick={closeModal} style={{
              color: '#e0e0e0',
              backgroundColor: 'transparent',
              border: 'none'
            }}>×</button>
            <div className="modal-content">
              <LanguageSettingsPage />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageSettingsButton;
