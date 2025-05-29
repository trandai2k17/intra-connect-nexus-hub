
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

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Sidebar trigger and search */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="lg:hidden p-2 hover:bg-white/50 rounded-lg transition-colors duration-200" />
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intranet-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm ứng dụng, tài liệu, người liên hệ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-intranet-primary/30 focus:border-intranet-primary/50 transition-all duration-200 placeholder-intranet-gray-400"
            />
          </div>
        </div>

        {/* Center - Company name */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold bg-gradient-to-r from-intranet-primary to-intranet-secondary bg-clip-text text-transparent">
            Cổng Thông Tin Nội Bộ
          </h1>
        </div>

        {/* Right side - Notifications and user menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 hover:bg-white/50 rounded-lg transition-all duration-200 group">
                <Bell className="w-5 h-5 text-intranet-gray-600 group-hover:text-intranet-primary" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-intranet-danger text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white/95 backdrop-blur-xl border-white/20">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-intranet-gray-800">Thông báo</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-4 hover:bg-intranet-gray-50 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm text-intranet-gray-800">Cập nhật hệ thống ERP</p>
                    <p className="text-xs text-intranet-gray-500 mt-1">Hệ thống sẽ bảo trì từ 22:00 - 02:00</p>
                    <p className="text-xs text-intranet-primary mt-1">2 phút trước</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 hover:bg-intranet-gray-50 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm text-intranet-gray-800">Ứng dụng mới: QC Mobile</p>
                    <p className="text-xs text-intranet-gray-500 mt-1">Ứng dụng kiểm tra chất lượng trên mobile</p>
                    <p className="text-xs text-intranet-primary mt-1">1 giờ trước</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 hover:bg-intranet-gray-50 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm text-intranet-gray-800">Cảnh báo bảo mật</p>
                    <p className="text-xs text-intranet-gray-500 mt-1">Phát hiện email phishing từ domain giả mạo</p>
                    <p className="text-xs text-intranet-primary mt-1">3 giờ trước</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded-lg transition-all duration-200 group">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-intranet-primary to-intranet-secondary text-white text-sm">
                    NV
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-intranet-gray-700 group-hover:text-intranet-primary">Nguyễn Văn A</p>
                  <p className="text-xs text-intranet-gray-500">IT Developer</p>
                </div>
                <ChevronDown className="w-4 h-4 text-intranet-gray-500 group-hover:text-intranet-primary" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-white/20">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Thông tin cá nhân</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
