
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

export function SidebarNavigation() {
  const { state } = useSidebar();
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
    <div className="p-3 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl flex-1 overflow-auto">
      <SidebarGroup>
        <SidebarGroupLabel className="text-gray-600 font-semibold text-xs uppercase tracking-wider mb-3 px-2">
          {!isCollapsed && "Điều hướng"}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1">
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
                                <span className="text-sm">{item.title}</span>
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
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton 
                        className="hover:bg-white/80 text-gray-700 hover:text-gray-800 transition-all duration-200 rounded-xl p-3 font-medium bg-white/70 shadow-sm hover:shadow-lg group"
                        tooltip={item.title}
                      >
                        <div className="flex flex-col items-center space-y-1 w-full">
                          <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                          <span className="text-xs font-medium text-center leading-tight">{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                    className="hover:bg-white/80 text-gray-700 hover:text-gray-800 transition-all duration-200 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-50 data-[active=true]:to-purple-50 data-[active=true]:text-blue-800 data-[active=true]:border-l-4 data-[active=true]:border-blue-500 data-[active=true]:shadow-md rounded-xl p-3 font-medium bg-white/70 shadow-sm hover:shadow-lg group"
                  >
                    <NavLink to={item.url} className={`flex items-center ${isCollapsed ? 'flex-col space-y-1 justify-center' : 'space-x-3'} w-full`}>
                      <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
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
    </div>
  );
}
