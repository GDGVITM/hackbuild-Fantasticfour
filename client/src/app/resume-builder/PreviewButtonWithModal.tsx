import { useState } from 'react';
import ResumePreviewModal from './ResumePreviewModal';
import { ResumeData } from './types';

interface PreviewButtonWithModalProps {
  resumeData: ResumeData;
}

export default function PreviewButtonWithModal({ resumeData }: PreviewButtonWithModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="px-6 py-3 bg-[#006d77] text-white rounded-2xl font-bold shadow hover:bg-[#83c5be] transition-all"
        onClick={() => setOpen(true)}
      >
        Preview Resume
      </button>
      <ResumePreviewModal open={open} onClose={() => setOpen(false)} resumeData={resumeData} />
    </>
  );
}
