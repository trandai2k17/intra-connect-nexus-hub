
import { 
  Home, 
  Search, 
  Settings, 
  Bell, 
  FileText, 
  Users, 
  BarChart3, 
  HelpCircle, 
  Shield, 
  Globe,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Trang chủ", url: "/", icon: Home },
  { title: "Ứng dụng", url: "/apps", icon: Globe },
  { title: "Thông báo", url: "/announcements", icon: Bell },
  { title: "Tài liệu", url: "/documents", icon: FileText },
  { title: "Thống kê", url: "/analytics", icon: BarChart3 },
  { title: "Nhân sự", url: "/hr", icon: Users },
  { title: "Hỗ trợ", url: "/support", icon: HelpCircle },
  { title: "Bảo mật", url: "/security", icon: Shield },
  { title: "Cài đặt", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-white/20 bg-glass shadow-xl">
      <SidebarHeader className="p-8 border-b border-white/20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">IT</span>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-neutral-800 text-xl">IT Portal</h2>
              <p className="text-sm text-neutral-600 font-medium">Cổng thông tin nội bộ</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-neutral-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Điều hướng
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                    className="hover:bg-white/20 hover:text-blue-600 transition-all duration-200 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500/20 data-[active=true]:to-purple-500/20 data-[active=true]:text-blue-700 data-[active=true]:border-l-4 data-[active=true]:border-blue-500 rounded-xl p-4 font-medium"
                  >
                    <NavLink to={item.url} className="flex items-center space-x-4 w-full">
                      <item.icon className="w-6 h-6" />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-white/20">
        {!isCollapsed && (
          <div className="text-xs text-neutral-500 text-center font-medium">
            © 2024 IT Department
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
