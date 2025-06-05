
import { useState, useEffect } from "react";
import { Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
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

const announcements = [
  "🎉 Hệ thống ERP mới đã được cập nhật với nhiều tính năng hữu ích",
  "📢 Bảo trì hệ thống dự kiến vào 22:00 - 02:00 đêm nay",
  "🚀 Ứng dụng mobile QC đã ra mắt trên App Store",
  "💡 Khóa học Excel nâng cao sẽ bắt đầu vào tuần tới"
];

export function Header() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

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
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
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
  }, []);

  return (
    <header className={`${isScrolled ? 'fixed' : 'relative'} top-0 left-0 right-0 z-30 h-20 transition-all duration-300`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 182, 193, 0.9) 50%, rgba(173, 216, 230, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}
    >
      <div className="flex h-full items-center justify-between px-8">
        {/* Left side - Sidebar trigger and announcement */}
        <div className="flex items-center space-x-6 flex-1">
          <SidebarTrigger className="lg:hidden p-3 hover:bg-white/30 rounded-xl transition-all duration-200 text-gray-700" />
          
          {/* Running announcement */}
          <div className="hidden md:block flex-1 max-w-2xl">
            <div 
              className={`overflow-hidden rounded-full px-6 py-3 border transition-all duration-1000 ${
                showAnnouncement ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 192, 203, 0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              <div className={`whitespace-nowrap transition-transform duration-1000 ${
                showAnnouncement ? 'animate-running-text' : ''
              }`}>
                <span className="text-gray-800 font-medium text-sm">
                  {announcements[currentAnnouncement]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Company name */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-gradient-bright">
            Cổng Thông Tin Nội Bộ
          </h1>
        </div>

        {/* Right side - Auth buttons and user menu */}
        <div className="flex items-center space-x-4">
          {/* Login/Register buttons */}
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex border-white/40 hover:bg-white/30 text-gray-700 font-semibold px-6 py-3 rounded-xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}
          >
            Đăng nhập
          </Button>
          <Button 
            size="sm" 
            className="hidden md:flex text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)'
            }}
          >
            Đăng ký
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-3 hover:bg-white/20 rounded-xl transition-all duration-200 group">
                <Bell className="w-6 h-6 text-gray-700 group-hover:text-gray-800" />
                <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs flex items-center justify-center border-2 border-white">
                  3
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 z-50 rounded-2xl border-white/30 shadow-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <div className="p-6 border-b border-white/20">
                <h3 className="font-bold text-gray-800 text-lg">Thông báo</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-6 hover:bg-white/10 cursor-pointer rounded-xl m-2">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Cập nhật hệ thống ERP</p>
                    <p className="text-xs text-gray-600 mt-2">Hệ thống sẽ bảo trì từ 22:00 - 02:00</p>
                    <p className="text-xs text-blue-600 mt-2 font-medium">2 phút trước</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-3 p-3 hover:bg-white/20 rounded-xl transition-all duration-200 group">
                <Avatar className="w-10 h-10 border-2 border-white/50">
                  <AvatarImage src="/api/placeholder/40/40" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold">
                    NV
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">Nguyễn Văn A</p>
                  <p className="text-xs text-gray-600 font-medium">IT Developer</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 z-50 rounded-2xl border-white/30 shadow-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-white/10 rounded-xl m-1">
                <User className="mr-3 h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Hồ sơ</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-white/10 rounded-xl m-1">
                <Settings className="mr-3 h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2 bg-gray-200" />
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-red-50/50 rounded-xl m-1 text-red-600">
                <LogOut className="mr-3 h-5 w-5" />
                <span className="font-medium">Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
