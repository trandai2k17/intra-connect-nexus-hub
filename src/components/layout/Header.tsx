
import { useState } from "react";
import { Search, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
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

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-glass border-b border-white/20 shadow-sm">
      <div className="flex h-20 items-center justify-between px-8">
        {/* Left side - Sidebar trigger and search */}
        <div className="flex items-center space-x-6">
          <SidebarTrigger className="lg:hidden p-3 hover:bg-white/20 rounded-xl transition-all duration-200" />
          
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm ứng dụng, tài liệu, người liên hệ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-4 w-96 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 placeholder-neutral-500 text-neutral-700 font-medium shadow-sm"
            />
          </div>
        </div>

        {/* Center - Company name */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Cổng Thông Tin Nội Bộ
          </h1>
        </div>

        {/* Right side - Auth buttons and user menu */}
        <div className="flex items-center space-x-4">
          {/* Login/Register buttons */}
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex bg-white/70 border-white/30 hover:bg-white/90 text-neutral-700 font-semibold px-6 py-3 rounded-xl backdrop-blur-sm shadow-sm"
          >
            Đăng nhập
          </Button>
          <Button 
            size="sm" 
            className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Đăng ký
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-3 hover:bg-white/20 rounded-xl transition-all duration-200 group">
                <Bell className="w-6 h-6 text-neutral-600 group-hover:text-blue-600" />
                <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-red-500 text-white text-xs flex items-center justify-center border-2 border-white">
                  3
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white/95 backdrop-blur-xl border-white/30 shadow-xl rounded-2xl">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-neutral-800 text-lg">Thông báo</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-6 hover:bg-blue-50/50 cursor-pointer rounded-xl m-2">
                  <div>
                    <p className="font-semibold text-sm text-neutral-800">Cập nhật hệ thống ERP</p>
                    <p className="text-xs text-neutral-600 mt-2">Hệ thống sẽ bảo trì từ 22:00 - 02:00</p>
                    <p className="text-xs text-blue-600 mt-2 font-medium">2 phút trước</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-6 hover:bg-blue-50/50 cursor-pointer rounded-xl m-2">
                  <div>
                    <p className="font-semibold text-sm text-neutral-800">Ứng dụng mới: QC Mobile</p>
                    <p className="text-xs text-neutral-600 mt-2">Ứng dụng kiểm tra chất lượng trên mobile</p>
                    <p className="text-xs text-blue-600 mt-2 font-medium">1 giờ trước</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-3 p-3 hover:bg-white/20 rounded-xl transition-all duration-200 group">
                <Avatar className="w-10 h-10 border-2 border-white/30">
                  <AvatarImage src="/api/placeholder/40/40" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                    NV
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-neutral-700 group-hover:text-blue-600">Nguyễn Văn A</p>
                  <p className="text-xs text-neutral-500 font-medium">IT Developer</p>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-blue-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-white/30 shadow-xl rounded-2xl">
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-blue-50/50 rounded-xl m-1">
                <User className="mr-3 h-5 w-5 text-neutral-600" />
                <span className="font-medium text-neutral-700">Hồ sơ</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-4 hover:bg-blue-50/50 rounded-xl m-1">
                <Settings className="mr-3 h-5 w-5 text-neutral-600" />
                <span className="font-medium text-neutral-700">Cài đặt</span>
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
