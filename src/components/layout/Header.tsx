
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
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="flex h-full items-center justify-between px-8">
        {/* Left side - Sidebar trigger and announcement */}
        <div className="flex items-center space-x-6 flex-1">
          <SidebarTrigger className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-700" />
          
          {/* Running announcement */}
          <div className="hidden md:block flex-1 max-w-2xl">
            <div 
              className={`overflow-hidden rounded-full px-6 py-3 border border-gray-200 transition-all duration-1000 ${
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
                <span className="text-gray-800 font-medium text-sm">
                  {announcements[currentAnnouncement]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Company name */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-gradient">
            Cổng Thông Tin Nội Bộ
          </h1>
        </div>

        {/* Right side - Auth buttons and user menu */}
        <div className="flex items-center space-x-4">
          {/* Login/Register buttons */}
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 bg-white/80"
          >
            Đăng nhập
          </Button>
          <Button 
            size="sm" 
            className="hidden md:flex text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
            }}
          >
            Đăng ký
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
                <Bell className="w-6 h-6 text-gray-700 group-hover:text-gray-800" />
                <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs flex items-center justify-center border-2 border-white">
                  3
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 z-50 rounded-2xl border-gray-200 shadow-xl bg-white/95 backdrop-blur-20">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-800 text-lg">Thông báo</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-6 hover:bg-gray-50 cursor-pointer rounded-xl m-2">
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
              <button className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
                <Avatar className="w-10 h-10 border-2 border-gray-300">
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
            <DropdownMenuContent align="end" className="w-56 z-50 rounded-2xl border-gray-200 shadow-xl bg-white/95 backdrop-blur-20">
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-gray-50 rounded-xl m-1">
                <User className="mr-3 h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Hồ sơ</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-gray-50 rounded-xl m-1">
                <Settings className="mr-3 h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2 bg-gray-200" />
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-red-50 rounded-xl m-1 text-red-600">
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
