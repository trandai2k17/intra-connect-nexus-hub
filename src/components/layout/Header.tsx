
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
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
      <div className="flex h-full items-center justify-between px-8">
        {/* Left side - Sidebar trigger and announcement */}
        <div className="flex items-center space-x-6 flex-1">
          <SidebarTrigger className="lg:hidden p-3 hover:bg-blue-50 rounded-xl transition-all duration-200" />
          
          {/* Running announcement */}
          <div className="hidden md:block flex-1 max-w-2xl">
            <div 
              className={`overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full px-6 py-3 border border-blue-100 transition-all duration-1000 ${
                showAnnouncement ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
              }`}
            >
              <div className={`whitespace-nowrap transition-transform duration-1000 ${
                showAnnouncement ? 'animate-running-text' : ''
              }`}>
                <span className="text-blue-700 font-medium text-sm">
                  {announcements[currentAnnouncement]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Company name */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
            Cổng Thông Tin Nội Bộ
          </h1>
        </div>

        {/* Right side - Auth buttons and user menu */}
        <div className="flex items-center space-x-4">
          {/* Login/Register buttons */}
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex bg-white/70 border-blue-200 hover:bg-blue-50 text-blue-700 font-semibold px-6 py-3 rounded-xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
          >
            Đăng nhập
          </Button>
          <Button 
            size="sm" 
            className="hidden md:flex bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Đăng ký
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
                <Bell className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-red-500 text-white text-xs flex items-center justify-center border-2 border-white">
                  3
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white/95 backdrop-blur-xl border-gray-100/50 shadow-xl rounded-2xl">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg">Thông báo</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-6 hover:bg-blue-50/50 cursor-pointer rounded-xl m-2">
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
              <button className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
                <Avatar className="w-10 h-10 border-2 border-blue-200">
                  <AvatarImage src="/api/placeholder/40/40" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold">
                    NV
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Nguyễn Văn A</p>
                  <p className="text-xs text-gray-500 font-medium">IT Developer</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-gray-100/50 shadow-xl rounded-2xl">
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-blue-50/50 rounded-xl m-1">
                <User className="mr-3 h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Hồ sơ</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-blue-50/50 rounded-xl m-1">
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
