
import { useState, useEffect } from "react";
import { Bell, User, Settings, LogOut, ChevronDown, LogIn, UserPlus } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const announcements = {
  vi: [
    "🎉 Hệ thống ERP mới đã được cập nhật với nhiều tính năng hữu ích",
    "📢 Bảo trì hệ thống dự kiến vào 22:00 - 02:00 đêm nay",
    "🚀 Ứng dụng mobile QC đã ra mắt trên App Store",
    "💡 Khóa học Excel nâng cao sẽ bắt đầu vào tuần tới"
  ],
  en: [
    "🎉 New ERP system has been updated with many useful features",
    "📢 System maintenance scheduled for 22:00 - 02:00 tonight",
    "🚀 QC mobile app has launched on the App Store",
    "💡 Advanced Excel course will start next week"
  ]
};

export function Header() {
  const { t, language } = useLanguage();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Calculate sidebar width for proper spacing
  const sidebarWidth = isCollapsed ? "4rem" : "18rem";
  const headerLeftMargin = isCollapsed ? "ml-16" : "ml-72";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAnnouncement(false);
      
      setTimeout(() => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements[language].length);
        setShowAnnouncement(true);
      }, 1000);

      setTimeout(() => {
        setShowAnnouncement(false);
      }, 10000);
    }, 60000);

    const hideTimer = setTimeout(() => {
      setShowAnnouncement(false);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, [language]);

  return (
    <>
      {/* Spacer div to push content down */}
      <div style={{ height: 'var(--header-height)' }} />
      
      <header className="fixed top-0 left-0 right-0 z-30 h-20 transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="flex h-full items-center justify-between px-4">
          {/* Left side - Sidebar trigger only */}
          <div className="flex items-center">
            <SidebarTrigger className="lg:hidden p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 text-gray-700 dark:text-gray-300" />
          </div>

          {/* Center - Running announcement with dynamic spacing based on sidebar */}
          <div className={`flex-1 flex justify-center px-8 transition-all duration-300 ${headerLeftMargin}`}>
            <div className="max-w-2xl w-full">
              <div 
                className={`overflow-hidden rounded-full px-6 py-3 border border-gray-200 dark:border-gray-700 transition-all duration-1000 ${
                  showAnnouncement ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                }`}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className={`whitespace-nowrap transition-transform duration-1000 ${
                  showAnnouncement ? 'animate-running-text' : ''
                }`}>
                  <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">
                    {announcements[language][currentAnnouncement]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Toggle buttons, Notifications and user menu */}
          <div className="flex items-center space-x-4">
            {/* Theme and Language toggles */}
            <ThemeToggle />
            <LanguageToggle />

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-xl transition-all duration-200 group">
                  <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-lg">
                    3
                  </Badge>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 z-50 rounded-2xl border-gray-200 dark:border-gray-700 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-20">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">{t('header.notifications')}</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 cursor-pointer rounded-xl m-2">
                    <div>
                      <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">Cập nhật hệ thống ERP</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Hệ thống sẽ bảo trì từ 22:00 - 02:00</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">2 phút trước</p>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-3 p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-xl transition-all duration-200 group">
                  <Avatar className="w-10 h-10 border-2 border-gray-300 dark:border-gray-600">
                    <AvatarImage src="/api/placeholder/40/40" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">
                      NV
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Nguyễn Văn A</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">IT Developer</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-50 rounded-2xl border-gray-200 dark:border-gray-700 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-20">
                <DropdownMenuItem className="cursor-pointer p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-xl m-1">
                  <LogIn className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('header.login')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-xl m-1">
                  <UserPlus className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('header.register')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem className="cursor-pointer p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-xl m-1">
                  <User className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('header.profile')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-xl m-1">
                  <Settings className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('header.settings')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem className="cursor-pointer p-4 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl m-1 text-red-600 dark:text-red-400">
                  <LogOut className="mr-3 h-5 w-5" />
                  <span className="font-medium">{t('header.logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
