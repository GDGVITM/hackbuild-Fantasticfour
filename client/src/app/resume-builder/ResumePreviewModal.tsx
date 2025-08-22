import { useRef, useEffect } from 'react';
import ResumePreview from './ResumePreview';
import { ResumeData } from './types';

interface ResumePreviewModalProps {
  open: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

export default function ResumePreviewModal({ open, onClose, resumeData }: ResumePreviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="relative flex items-center justify-center w-full h-full"
        style={{ maxWidth: '98vw', maxHeight: '98vh', margin: '0 auto' }}
      >
        <div className="relative flex items-center justify-center w-auto h-auto p-4 bg-transparent" style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
          <ResumePreview resumeData={resumeData} />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white rounded-full shadow p-2 hover:bg-gray-100 text-gray-700 z-50"
            aria-label="Close preview"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
