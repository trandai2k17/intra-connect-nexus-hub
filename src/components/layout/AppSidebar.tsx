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
  Phone,
  Building,
  Car,
  ShoppingCart,
  DollarSign,
  Package
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

const iconColors = [
  'text-blue-500',
  'text-green-500', 
  'text-purple-500',
  'text-red-500',
  'text-yellow-500',
  'text-indigo-500',
  'text-pink-500',
  'text-teal-500',
  'text-orange-500',
  'text-cyan-500'
];

const getRandomColor = () => iconColors[Math.floor(Math.random() * iconColors.length)];

const navigationItems = [
  { title: "Trang chủ", url: "/", icon: Home, color: getRandomColor() },
  { title: "Ứng dụng", url: "/apps", icon: Globe, color: getRandomColor() },
  { title: "Thông báo", url: "/announcements", icon: Bell, color: getRandomColor() },
  { 
    title: "Quản lý IT", 
    icon: Monitor,
    color: getRandomColor(),
    subItems: [
      { title: "Hệ thống", url: "/it/systems", icon: Database, color: getRandomColor() },
      { title: "Phần mềm", url: "/it/software", icon: Code, color: getRandomColor() },
      { title: "Thiết bị", url: "/it/devices", icon: Smartphone, color: getRandomColor() },
    ]
  },
  { 
    title: "Tài chính", 
    icon: DollarSign,
    color: getRandomColor(),
    subItems: [
      { title: "Báo cáo tài chính", url: "/finance/reports", icon: BarChart3, color: getRandomColor() },
      { title: "Ngân sách", url: "/finance/budget", icon: Package, color: getRandomColor() },
      { title: "Thanh toán", url: "/finance/payments", icon: ShoppingCart, color: getRandomColor() },
    ]
  },
  { title: "Tài liệu", url: "/documents", icon: FileText, color: getRandomColor() },
  { title: "Thống kê", url: "/analytics", icon: BarChart3, color: getRandomColor() },
  { 
    title: "Nhân sự", 
    icon: Users,
    color: getRandomColor(),
    subItems: [
      { title: "Nhân viên", url: "/hr/employees", icon: UserCheck, color: getRandomColor() },
      { title: "Lịch làm việc", url: "/hr/schedule", icon: Calendar, color: getRandomColor() },
      { title: "Liên hệ", url: "/hr/contacts", icon: Phone, color: getRandomColor() },
      { 
        title: "Phòng ban", 
        url: "/hr/departments", 
        icon: Building, 
        color: getRandomColor(),
        subItems: [
          { title: "IT Department", url: "/hr/departments/it", icon: Code, color: getRandomColor() },
          { title: "HR Department", url: "/hr/departments/hr", icon: Users, color: getRandomColor() },
          { title: "Sales Department", url: "/hr/departments/sales", icon: ShoppingCart, color: getRandomColor() },
        ]
      },
    ]
  },
  { 
    title: "Logistics", 
    icon: Car,
    color: getRandomColor(),
    subItems: [
      { title: "Vận chuyển", url: "/logistics/shipping", icon: Car, color: getRandomColor() },
      { title: "Kho hàng", url: "/logistics/warehouse", icon: Package, color: getRandomColor() },
    ]
  },
  { 
    title: "Hỗ trợ", 
    icon: HelpCircle,
    color: getRandomColor(),
    subItems: [
      { title: "FAQ", url: "/support/faq", icon: HelpCircle, color: getRandomColor() },
      { title: "Liên hệ IT", url: "/support/contact", icon: Mail, color: getRandomColor() },
    ]
  },
  { title: "Bảo mật", url: "/security", icon: Shield, color: getRandomColor() },
  { title: "Cài đặt", url: "/settings", icon: Settings, color: getRandomColor() },
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
    <Sidebar 
      className={`border-r border-white/20 shadow-2xl z-50 bg-white/95 backdrop-blur-xl transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      <SidebarHeader className="p-4 border-b border-white/20 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/30 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
              <span className="text-white font-bold text-lg">IT</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-xl">
                  IT Portal
                </h2>
                <p className="text-sm text-gray-600 font-medium">Cổng thông tin nội bộ</p>
              </div>
            )}
          </div>
          
          {/* Round toggle button */}
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 hover:bg-white/80 rounded-full flex items-center justify-center transition-all duration-200 group border border-white/30 bg-white/90 shadow-lg hover:shadow-xl"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5 text-gray-700" />
            ) : (
              <X className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold text-xs uppercase tracking-wider mb-3 px-2">
            {!isCollapsed && "Điều hướng"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={!isCollapsed && openGroups[item.title]}
                      onOpenChange={() => !isCollapsed && toggleGroup(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className="hover:bg-white/80 text-gray-700 hover:text-gray-800 transition-all duration-200 rounded-xl p-3 font-medium w-full group bg-white/70 shadow-sm hover:shadow-lg"
                          tooltip={isCollapsed ? item.title : undefined}
                          style={{
                            background: openGroups[item.title] ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.7)'
                          }}
                        >
                          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} w-full`}>
                            <div className={`flex items-center ${isCollapsed ? 'flex-col space-y-1' : 'space-x-3'}`}>
                              <item.icon className={`w-5 h-5 ${item.color}`} />
                              {isCollapsed ? (
                                <span className="text-xs font-medium text-center leading-tight">{item.title}</span>
                              ) : (
                                <span className="text-sm">{item.title}</span>
                              )}
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
                        <CollapsibleContent className="ml-4 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <div key={subItem.title}>
                              {subItem.subItems ? (
                                <Collapsible
                                  open={openGroups[subItem.title]}
                                  onOpenChange={() => toggleGroup(subItem.title)}
                                >
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuButton 
                                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-gray-600 hover:bg-white/80 hover:text-gray-800 w-full bg-white/60 shadow-sm"
                                    >
                                      <subItem.icon className={`w-4 h-4 ${subItem.color}`} />
                                      <span className="flex-1 text-left">{subItem.title}</span>
                                      <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                                        openGroups[subItem.title] ? 'rotate-90' : ''
                                      }`} />
                                    </SidebarMenuButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="ml-4 mt-1 space-y-1">
                                    {subItem.subItems.map((nestedItem) => (
                                      <SidebarMenuButton key={nestedItem.title} asChild>
                                        <NavLink 
                                          to={nestedItem.url} 
                                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                                            isActive(nestedItem.url) 
                                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 border-l-4 border-blue-500 shadow-md' 
                                              : 'text-gray-600 hover:bg-white/80 hover:text-gray-800'
                                          } bg-white/50`}
                                        >
                                          <nestedItem.icon className={`w-3 h-3 ${nestedItem.color}`} />
                                          <span>{nestedItem.title}</span>
                                        </NavLink>
                                      </SidebarMenuButton>
                                    ))}
                                  </CollapsibleContent>
                                </Collapsible>
                              ) : (
                                <SidebarMenuButton key={subItem.title} asChild>
                                  <NavLink 
                                    to={subItem.url} 
                                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                      isActive(subItem.url) 
                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 border-l-4 border-blue-500 shadow-md' 
                                        : 'text-gray-600 hover:bg-white/80 hover:text-gray-800'
                                    } bg-white/60`}
                                  >
                                    <subItem.icon className={`w-4 h-4 ${subItem.color}`} />
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                </SidebarMenuButton>
                              )}
                            </div>
                          ))}
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.url)}
                      tooltip={isCollapsed ? item.title : undefined}
                      className="hover:bg-white/80 text-gray-700 hover:text-gray-800 transition-all duration-200 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-50 data-[active=true]:to-purple-50 data-[active=true]:text-blue-800 data-[active=true]:border-l-4 data-[active=true]:border-blue-500 data-[active=true]:shadow-md rounded-xl p-3 font-medium bg-white/70 shadow-sm hover:shadow-lg"
                    >
                      <NavLink to={item.url} className={`flex items-center ${isCollapsed ? 'flex-col space-y-1 justify-center' : 'space-x-3'} w-full`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        {isCollapsed ? (
                          <span className="text-xs font-medium text-center leading-tight">{item.title}</span>
                        ) : (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/20 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl">
        {!isCollapsed && (
          <div className="text-xs text-gray-500 text-center font-medium">
            © 2024 IT Department
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
