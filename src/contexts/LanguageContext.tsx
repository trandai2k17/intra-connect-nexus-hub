
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  vi: {
    // Header
    'header.title': 'Cổng Thông Tin Nội Bộ',
    'header.login': 'Đăng nhập',
    'header.register': 'Đăng ký',
    'header.notifications': 'Thông báo',
    'header.profile': 'Hồ sơ',
    'header.settings': 'Cài đặt',
    'header.logout': 'Đăng xuất',
    
    // Sidebar
    'sidebar.title': 'IT Portal',
    'sidebar.subtitle': 'Cổng thông tin nội bộ',
    'sidebar.expand': 'Mở rộng',
    'sidebar.collapse': 'Thu gọn',
    'sidebar.copyright': '© 2024 IT Department',
    
    // Home page
    'home.hero.title': 'Chào mừng đến với Cổng Thông Tin IT',
    'home.hero.subtitle': 'Truy cập nhanh các ứng dụng và dịch vụ nội bộ',
    'home.apps.title': 'Ứng dụng & Phần mềm',
    'home.apps.subtitle': 'Truy cập nhanh các công cụ và hệ thống nội bộ',
    'home.stats.apps': 'Ứng dụng đang hoạt động',
    'home.stats.users': 'Người dùng hoạt động',
    'home.stats.uptime': 'Uptime hệ thống',
    'home.updated': 'Cập nhật: 29/11/2024',
    
    // Navigation
    'nav.all': 'Tất cả',
    'nav.productivity': 'Năng suất',
    'nav.communication': 'Giao tiếp',
    'nav.development': 'Phát triển',
    'nav.hr': 'Nhân sự',
    'nav.finance': 'Tài chính',
  },
  en: {
    // Header
    'header.title': 'Internal Information Portal',
    'header.login': 'Login',
    'header.register': 'Register',
    'header.notifications': 'Notifications',
    'header.profile': 'Profile',
    'header.settings': 'Settings',
    'header.logout': 'Logout',
    
    // Sidebar
    'sidebar.title': 'IT Portal',
    'sidebar.subtitle': 'Internal information portal',
    'sidebar.expand': 'Expand',
    'sidebar.collapse': 'Collapse',
    'sidebar.copyright': '© 2024 IT Department',
    
    // Home page
    'home.hero.title': 'Welcome to IT Information Portal',
    'home.hero.subtitle': 'Quick access to internal applications and services',
    'home.apps.title': 'Applications & Software',
    'home.apps.subtitle': 'Quick access to internal tools and systems',
    'home.stats.apps': 'Active Applications',
    'home.stats.users': 'Active Users',
    'home.stats.uptime': 'System Uptime',
    'home.updated': 'Updated: 29/11/2024',
    
    // Navigation
    'nav.all': 'All',
    'nav.productivity': 'Productivity',
    'nav.communication': 'Communication',
    'nav.development': 'Development',
    'nav.hr': 'HR',
    'nav.finance': 'Finance',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
