
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function MaterialLanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => setLanguage('vi')}
        className={`w-12 h-12 rounded-full font-bold text-sm border-2 transition-all duration-200 ${
          language === 'vi'
            ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-110'
            : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
        }`}
      >
        VI
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`w-12 h-12 rounded-full font-bold text-sm border-2 transition-all duration-200 ${
          language === 'en'
            ? 'bg-green-600 text-white border-green-600 shadow-lg scale-110'
            : 'bg-white text-green-600 border-green-600 hover:bg-green-50'
        }`}
      >
        EN
      </button>
    </div>
  );
}
