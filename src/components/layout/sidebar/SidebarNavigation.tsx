
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { navigationItems } from './navigationData';

export function SidebarNavigation() {
  const { t } = useLanguage();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemTitle: string) => {
    if (isCollapsed) return; // Don't expand when collapsed
    
    setExpandedItems(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(title => title !== itemTitle)
        : [...prev, itemTitle]
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-black dark:text-white uppercase tracking-wider mb-4 px-4">
        {t('sidebar.navigation')}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;
            const isExpanded = expandedItems.includes(item.title);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const hasActiveSubItem = hasSubItems && item.subItems?.some(subItem => location.pathname === subItem.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <div className="w-full">
                    <NavLink
                      to={item.url}
                      onClick={(e) => {
                        if (hasSubItems && !isCollapsed) {
                          e.preventDefault();
                          toggleExpanded(item.title);
                        }
                      }}
                      className={({ isActive }) => `
                        flex items-center gap-4 px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 group relative overflow-hidden min-h-[56px] w-full
                        ${isActive || hasActiveSubItem
                          ? 'bg-gradient-to-r from-[#4c4cff] to-[#00d2ff] text-white shadow-lg shadow-blue-500/25' 
                          : 'text-[#090909] dark:text-white hover:bg-gradient-to-r hover:from-[#4c4cff] hover:to-[#00d2ff] hover:text-white hover:shadow-lg hover:shadow-blue-500/20'
                        }
                      `}
                      style={{
                        color: (isActive || hasActiveSubItem) ? 'white' : '#090909'
                      }}
                    >
                      {/* Icon with individual color and background */}
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                        ${(isActive || hasActiveSubItem)
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-white/20'
                        }
                      `}>
                        <Icon className={`w-5 h-5 transition-all duration-300 ${
                          (isActive || hasActiveSubItem)
                            ? 'text-white' 
                            : `${item.iconColor} group-hover:text-white`
                        }`} />
                      </div>
                      
                      {!isCollapsed && (
                        <>
                          <span className="font-medium transition-all duration-300 text-base flex-1" style={{ color: 'inherit' }}>
                            {t(item.title)}
                          </span>
                          
                          {hasSubItems && (
                            <div className="ml-auto">
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                              ) : (
                                <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                              )}
                            </div>
                          )}
                        </>
                      )}

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </NavLink>

                    {/* Sub-menu items */}
                    {hasSubItems && isExpanded && !isCollapsed && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.subItems?.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = location.pathname === subItem.url;

                          return (
                            <NavLink
                              key={subItem.title}
                              to={subItem.url}
                              className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group
                                ${isActive
                                  ? 'bg-white/10 text-white shadow-sm' 
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/5 hover:text-gray-800 dark:hover:text-white'
                                }
                              `}
                            >
                              <div className={`
                                w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300
                                ${isSubActive
                                  ? 'bg-white/20' 
                                  : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                                }
                              `}>
                                <SubIcon className={`w-4 h-4 transition-all duration-300 ${
                                  isSubActive
                                    ? 'text-white' 
                                    : `${subItem.iconColor} group-hover:scale-110`
                                }`} />
                              </div>
                              <span className="transition-all duration-300">
                                {subItem.title}
                              </span>
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
