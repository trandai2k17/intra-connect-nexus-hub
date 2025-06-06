
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { navigationItems } from "./navigationData";
import { useLanguage } from "@/contexts/LanguageContext";

export function SidebarNavigation() {
  const { state } = useSidebar();
  const { t } = useLanguage();
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

  const handleMenuClick = (e: React.MouseEvent, url: string) => {
    if (url !== '/') {
      e.preventDefault();
      alert("Feature not yet deploy");
    }
  };

  // Function to get translated title based on navigation key
  const getTranslatedTitle = (title: string) => {
    const keyMap: Record<string, string> = {
      'Trang chủ': 'sidebar.home',
      'Ứng dụng': 'sidebar.apps',
      'Thông báo': 'sidebar.announcements',
      'Quản lý IT': 'sidebar.it-management',
      'Hệ thống': 'sidebar.systems',
      'Phần mềm': 'sidebar.software',
      'Thiết bị': 'sidebar.devices',
      'Sản xuất': 'sidebar.production',
      'Kho bãi': 'sidebar.inventory',
      'Mua hàng': 'sidebar.purchase',
      'Tài liệu': 'sidebar.documents',
      'Hỗ trợ': 'sidebar.support',
      'FAQ': 'sidebar.faq',
      'Liên hệ IT': 'sidebar.contact-it',
      'Bảo mật': 'sidebar.security',
      'Cài đặt': 'sidebar.settings',
      'ERP': 'sidebar.erp',
      'MES': 'sidebar.mes',
      'Lập kế hoạch': 'sidebar.planning',
      'Chất lượng': 'sidebar.quality',
      'QC Mobile': 'sidebar.qc',
      'Kiểm tra': 'sidebar.inspection',
      'Giao tiếp': 'sidebar.communication',
      'Microsoft Teams': 'sidebar.teams',
      'Outlook': 'sidebar.outlook',
      'SharePoint': 'sidebar.sharepoint',
      'Phát triển': 'sidebar.development',
      'GitLab': 'sidebar.gitlab',
      'Jenkins': 'sidebar.jenkins',
      'Giám sát': 'sidebar.monitoring',
      'Helpdesk': 'sidebar.helpdesk',
      'Tài sản': 'sidebar.assets'
    };
    
    return keyMap[title] ? t(keyMap[title]) : title;
  };

  return (
    <div className={`transition-all duration-300 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl flex-1 overflow-auto ${
      isCollapsed ? 'p-1' : 'p-3'
    }`}>
      <SidebarGroup>
        {!isCollapsed && (
          <SidebarGroupLabel className="text-gray-600 font-semibold text-xs uppercase tracking-wider mb-3 px-2">
            {t('sidebar.navigation')}
          </SidebarGroupLabel>
        )}
        <SidebarGroupContent>
          <SidebarMenu className={`space-y-1 ${isCollapsed ? 'space-y-2' : ''}`}>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.subItems ? (
                  <>
                    {!isCollapsed ? (
                      <Collapsible
                        open={openGroups[item.title]}
                        onOpenChange={() => toggleGroup(item.title)}
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton 
                            className="hover:bg-white/80 text-gray-700 hover:text-gray-800 transition-all duration-200 rounded-xl p-3 font-medium w-full group bg-white/70 shadow-sm hover:shadow-lg"
                            style={{
                              background: openGroups[item.title] ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.7)'
                            }}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center space-x-3">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <span className="text-sm">{getTranslatedTitle(item.title)}</span>
                              </div>
                              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                                openGroups[item.title] ? 'rotate-90' : ''
                              }`} />
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        
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
                                      <span className="flex-1 text-left">{getTranslatedTitle(subItem.title)}</span>
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
                                          onClick={(e) => handleMenuClick(e, nestedItem.url)}
                                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                                            isActive(nestedItem.url) 
                                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 border-l-4 border-blue-500 shadow-md' 
                                              : 'text-gray-600 hover:bg-white/80 hover:text-gray-800'
                                          } bg-white/50`}
                                        >
                                          <nestedItem.icon className={`w-3 h-3 ${nestedItem.color}`} />
                                          <span>{getTranslatedTitle(nestedItem.title)}</span>
                                        </NavLink>
                                      </SidebarMenuButton>
                                    ))}
                                  </CollapsibleContent>
                                </Collapsible>
                              ) : (
                                <SidebarMenuButton key={subItem.title} asChild>
                                  <NavLink 
                                    to={subItem.url} 
                                    onClick={(e) => handleMenuClick(e, subItem.url)}
                                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                      isActive(subItem.url) 
                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 border-l-4 border-blue-500 shadow-md' 
                                        : 'text-gray-600 hover:bg-white/80 hover:text-gray-800'
                                    } bg-white/60`}
                                  >
                                    <subItem.icon className={`w-4 h-4 ${subItem.color}`} />
                                    <span>{getTranslatedTitle(subItem.title)}</span>
                                  </NavLink>
                                </SidebarMenuButton>
                              )}
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton 
                        className="w-12 h-12 rounded-lg p-0 m-1 hover:bg-white/80 text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium bg-white/70 shadow-sm hover:shadow-lg group hover:scale-105"
                        tooltip={getTranslatedTitle(item.title)}
                        onClick={() => alert("Feature not yet deploy")}
                      >
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform duration-200`} />
                        </div>
                      </SidebarMenuButton>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    tooltip={isCollapsed ? getTranslatedTitle(item.title) : undefined}
                    className={`transition-all duration-200 font-medium shadow-sm hover:shadow-lg group ${
                      isCollapsed 
                        ? 'w-12 h-12 rounded-lg p-0 m-1 hover:bg-white/80 text-gray-700 hover:text-blue-600 bg-white/70 hover:scale-105 data-[active=true]:bg-gradient-to-br data-[active=true]:from-blue-500 data-[active=true]:to-purple-600 data-[active=true]:text-white data-[active=true]:shadow-lg' 
                        : 'hover:bg-white/80 text-gray-700 hover:text-gray-800 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-50 data-[active=true]:to-purple-50 data-[active=true]:text-blue-800 data-[active=true]:border-l-4 data-[active=true]:border-blue-500 data-[active=true]:shadow-md rounded-xl p-3 bg-white/70'
                    }`}
                  >
                    <NavLink 
                      to={item.url} 
                      onClick={(e) => handleMenuClick(e, item.url)}
                      className={`flex items-center w-full transition-all duration-200 ${
                        isCollapsed 
                          ? 'justify-center h-full' 
                          : 'space-x-3'
                      }`}
                    >
                      <item.icon className={`transition-transform duration-200 group-hover:scale-110 ${
                        isCollapsed 
                          ? 'w-6 h-6' 
                          : `w-5 h-5 ${item.color}`
                      }`} />
                      {!isCollapsed && (
                        <span className="text-sm">{getTranslatedTitle(item.title)}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}
