
import { useState } from "react";
import { 
  Home, 
  Globe, 
  Bell, 
  FileText, 
  Users, 
  BarChart3, 
  HelpCircle, 
  Shield, 
  Settings,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Database,
  Code,
  Monitor,
  Smartphone,
  UserCheck,
  Calendar,
  Mail,
  Phone
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navigationItems = [
  { title: "Trang chủ", url: "/", icon: Home },
  { title: "Ứng dụng", url: "/apps", icon: Globe },
  { title: "Thông báo", url: "/announcements", icon: Bell },
  { 
    title: "Quản lý IT", 
    icon: Monitor,
    subItems: [
      { title: "Hệ thống", url: "/it/systems", icon: Database },
      { title: "Phần mềm", url: "/it/software", icon: Code },
      { title: "Thiết bị", url: "/it/devices", icon: Smartphone },
    ]
  },
  { title: "Tài liệu", url: "/documents", icon: FileText },
  { title: "Thống kê", url: "/analytics", icon: BarChart3 },
  { 
    title: "Nhân sự", 
    icon: Users,
    subItems: [
      { title: "Nhân viên", url: "/hr/employees", icon: UserCheck },
      { title: "Lịch làm việc", url: "/hr/schedule", icon: Calendar },
      { title: "Liên hệ", url: "/hr/contacts", icon: Phone },
    ]
  },
  { 
    title: "Hỗ trợ", 
    icon: HelpCircle,
    subItems: [
      { title: "FAQ", url: "/support/faq", icon: HelpCircle },
      { title: "Liên hệ IT", url: "/support/contact", icon: Mail },
    ]
  },
  { title: "Bảo mật", url: "/security", icon: Shield },
  { title: "Cài đặt", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <Sidebar className="border-r border-white/20 bg-glass backdrop-blur-xl shadow-xl z-50">
      <SidebarHeader className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
              <span className="text-white font-bold text-lg">IT</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-white text-xl">IT Portal</h2>
                <p className="text-sm text-white/80 font-medium">Cổng thông tin nội bộ</p>
              </div>
            )}
          </div>
          
          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group border border-white/30"
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4 text-white" />
            ) : (
              <X className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">
            {!isCollapsed && "Điều hướng"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={openGroups[item.title]}
                      onOpenChange={() => toggleGroup(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className="hover:bg-white/20 hover:text-white transition-all duration-200 rounded-xl p-4 font-medium w-full group text-white/90"
                          tooltip={isCollapsed ? item.title : undefined}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-4">
                              <item.icon className="w-6 h-6" />
                              {!isCollapsed && <span className="text-sm">{item.title}</span>}
                            </div>
                            {!isCollapsed && (
                              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                                openGroups[item.title] ? 'rotate-90' : ''
                              }`} />
                            )}
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      
                      {!isCollapsed && (
                        <CollapsibleContent className="ml-6 mt-2 space-y-1">
                          {item.subItems.map((subItem) => (
                            <SidebarMenuButton key={subItem.title} asChild>
                              <NavLink 
                                to={subItem.url} 
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                                  isActive(subItem.url) 
                                    ? 'bg-white/30 text-white border-l-4 border-white' 
                                    : 'text-white/80 hover:bg-white/20 hover:text-white'
                                }`}
                              >
                                <subItem.icon className="w-5 h-5" />
                                <span>{subItem.title}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          ))}
                        </CollapsibleContent>
                      )}
                      
                      {/* Hover menu for collapsed state */}
                      {isCollapsed && (
                        <div className="group-hover:block hidden absolute left-full top-0 ml-2 z-50">
                          <div className="bg-glass backdrop-blur-xl border border-white/30 rounded-xl shadow-xl p-4 min-w-48">
                            <p className="font-semibold text-white mb-3">{item.title}</p>
                            <div className="space-y-2">
                              {item.subItems.map((subItem) => (
                                <NavLink
                                  key={subItem.title}
                                  to={subItem.url}
                                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200"
                                >
                                  <subItem.icon className="w-4 h-4" />
                                  <span>{subItem.title}</span>
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.url)}
                      tooltip={isCollapsed ? item.title : undefined}
                      className="hover:bg-white/20 hover:text-white transition-all duration-200 data-[active=true]:bg-white/30 data-[active=true]:text-white data-[active=true]:border-l-4 data-[active=true]:border-white rounded-xl p-4 font-medium text-white/90"
                    >
                      <NavLink to={item.url} className="flex items-center space-x-4 w-full">
                        <item.icon className="w-6 h-6" />
                        {!isCollapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-white/20">
        {!isCollapsed && (
          <div className="text-xs text-white/60 text-center font-medium">
            © 2024 IT Department
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
