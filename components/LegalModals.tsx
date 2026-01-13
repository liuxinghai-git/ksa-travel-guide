
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-serif font-bold">{title}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-900 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-stone-600 space-y-4 leading-relaxed text-sm">
          {content}
        </div>
        <div className="mt-8 text-right">
          <button onClick={onClose} className="bg-stone-900 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors">
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
