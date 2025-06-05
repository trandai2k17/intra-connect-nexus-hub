
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
  'text-pink-500',
  'text-blue-500', 
  'text-green-500',
  'text-purple-500',
  'text-yellow-500',
  'text-indigo-500',
  'text-red-500',
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
    <Sidebar className="border-r border-white/30 shadow-xl z-40"
      style={{
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.9) 50%, rgba(255, 240, 245, 0.95) 100%)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <SidebarHeader className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/40"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <span className="text-white font-bold text-lg">IT</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-gradient text-xl">IT Portal</h2>
                <p className="text-sm text-gray-600 font-medium">Cổng thông tin nội bộ</p>
              </div>
            )}
          </div>
          
          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group border border-white/40"
            style={{
              background: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4 text-gray-700" />
            ) : (
              <X className="w-4 h-4 text-gray-700" />
            )}
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold text-sm uppercase tracking-wider mb-4">
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
                          className="hover:bg-white/30 text-gray-700 hover:text-gray-800 transition-all duration-200 rounded-xl p-4 font-medium w-full group"
                          tooltip={isCollapsed ? item.title : undefined}
                          style={{
                            background: openGroups[item.title] ? 'rgba(255, 255, 255, 0.4)' : 'transparent'
                          }}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-4">
                              <item.icon className={`w-6 h-6 ${item.color}`} />
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
                            <div key={subItem.title}>
                              {subItem.subItems ? (
                                <Collapsible
                                  open={openGroups[subItem.title]}
                                  onOpenChange={() => toggleGroup(subItem.title)}
                                >
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuButton 
                                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 text-gray-600 hover:bg-white/20 hover:text-gray-800 w-full"
                                    >
                                      <subItem.icon className={`w-5 h-5 ${subItem.color}`} />
                                      <span className="flex-1 text-left">{subItem.title}</span>
                                      <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                                        openGroups[subItem.title] ? 'rotate-90' : ''
                                      }`} />
                                    </SidebarMenuButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="ml-6 mt-2 space-y-1">
                                    {subItem.subItems.map((nestedItem) => (
                                      <SidebarMenuButton key={nestedItem.title} asChild>
                                        <NavLink 
                                          to={nestedItem.url} 
                                          className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-xs transition-all duration-200 ${
                                            isActive(nestedItem.url) 
                                              ? 'bg-white/40 text-gray-800 border-l-4 border-blue-500' 
                                              : 'text-gray-600 hover:bg-white/20 hover:text-gray-800'
                                          }`}
                                        >
                                          <nestedItem.icon className={`w-4 h-4 ${nestedItem.color}`} />
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
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                                      isActive(subItem.url) 
                                        ? 'bg-white/40 text-gray-800 border-l-4 border-blue-500' 
                                        : 'text-gray-600 hover:bg-white/20 hover:text-gray-800'
                                    }`}
                                  >
                                    <subItem.icon className={`w-5 h-5 ${subItem.color}`} />
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                </SidebarMenuButton>
                              )}
                            </div>
                          ))}
                        </CollapsibleContent>
                      )}
                      
                      {/* Hover menu for collapsed state */}
                      {isCollapsed && (
                        <div className="group-hover:block hidden absolute left-full top-0 ml-2 z-50">
                          <div className="rounded-xl shadow-xl p-4 min-w-48 border border-white/30"
                            style={{
                              background: 'rgba(255, 255, 255, 0.95)',
                              backdropFilter: 'blur(20px)'
                            }}
                          >
                            <p className="font-semibold text-gray-800 mb-3">{item.title}</p>
                            <div className="space-y-2">
                              {item.subItems.map((subItem) => (
                                <NavLink
                                  key={subItem.title}
                                  to={subItem.url}
                                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-white/20 hover:text-gray-800 transition-all duration-200"
                                >
                                  <subItem.icon className={`w-4 h-4 ${subItem.color}`} />
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
                      className="hover:bg-white/30 text-gray-700 hover:text-gray-800 transition-all duration-200 data-[active=true]:bg-white/40 data-[active=true]:text-gray-800 data-[active=true]:border-l-4 data-[active=true]:border-blue-500 rounded-xl p-4 font-medium"
                    >
                      <NavLink to={item.url} className="flex items-center space-x-4 w-full">
                        <item.icon className={`w-6 h-6 ${item.color}`} />
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
          <div className="text-xs text-gray-500 text-center font-medium">
            © 2024 IT Department
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
