
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/components/ui/sidebar';
import { SidebarMenuButton, SidebarMenuItem as SidebarMenuItemUI } from '@/components/ui/sidebar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  borderColor?: string;
  subItems?: {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
  }[];
}

interface SidebarMenuItemProps {
  item: NavigationItem;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export function SidebarMenuItem({ item, isExpanded, onToggleExpanded }: SidebarMenuItemProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const Icon = item.icon;
  const isActive = location.pathname === item.url;
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const hasActiveSubItem = hasSubItems && item.subItems?.some(subItem => location.pathname === subItem.url);

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems && !isCollapsed) {
      e.preventDefault();
      onToggleExpanded();
    }
  };

  const menuButton = (
    <NavLink
      to={item.url}
      onClick={handleClick}
      className={`
        flex items-center rounded-xl text-base font-medium transition-all duration-200 group relative w-full
        ${isActive || hasActiveSubItem
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
          : 'text-gray-700 dark:text-gray-200 hover:bg-white hover:shadow-md dark:hover:bg-gray-700'
        }
        ${isCollapsed ? 'justify-center p-4 h-16 w-16' : 'gap-4 px-4 py-5'}
      `}
    >
      <Icon className={`
        transition-all duration-200 flex-shrink-0
        ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}
        ${(isActive || hasActiveSubItem)
          ? 'text-white' 
          : item.iconColor
        }
      `} />
      
      {!isCollapsed && (
        <>
          <span className="flex-1 text-left font-medium text-base">
            {t(item.title)}
          </span>
          
          {hasSubItems && (
            <div className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 transition-transform duration-200" />
              ) : (
                <ChevronRight className="w-3 h-3 transition-transform duration-200" />
              )}
            </div>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <SidebarMenuItemUI>
      <SidebarMenuButton asChild>
        {isCollapsed && hasSubItems ? (
          <HoverCard openDelay={300} closeDelay={100}>
            <HoverCardTrigger asChild>
              {menuButton}
            </HoverCardTrigger>
            <HoverCardContent side="right" align="start" className="w-64 p-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-600">
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  <span className="font-semibold text-base">{t(item.title)}</span>
                </div>
                
                <div className="space-y-1">
                  {item.subItems?.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = location.pathname === subItem.url;
                    
                    return (
                      <NavLink
                        key={subItem.title}
                        to={subItem.url}
                        className={`
                          flex items-center gap-3 px-3 py-4 rounded-xl text-sm transition-all duration-200 group
                          ${isSubActive
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-white hover:shadow-md dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <SubIcon className={`
                          w-4 h-4 transition-all duration-200
                          ${isSubActive
                            ? 'text-blue-600 dark:text-blue-400' 
                            : subItem.iconColor
                          }
                        `} />
                        <span className="font-medium">{subItem.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          menuButton
        )}
      </SidebarMenuButton>

      {/* Sub-menu items with smooth animation */}
      {hasSubItems && isExpanded && !isCollapsed && (
        <div className={`
          ml-6 mt-3 space-y-3 border-l-2 border-gray-200 dark:border-gray-600 pl-4
          transition-all duration-300 ease-in-out transform
          ${isExpanded ? 'opacity-100 translate-y-0 max-h-96' : 'opacity-0 -translate-y-2 max-h-0'}
        `}>
          {item.subItems?.map((subItem) => {
            const SubIcon = subItem.icon;
            const isSubActive = location.pathname === subItem.url;

            return (
              <NavLink
                key={subItem.title}
                to={subItem.url}
                className={`
                  flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${isSubActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white hover:shadow-md dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200'
                  }
                `}
              >
                <SubIcon className={`
                  w-4 h-4 transition-all duration-200
                  ${isSubActive
                    ? 'text-blue-600 dark:text-blue-400' 
                    : subItem.iconColor
                  }
                `} />
                <span className="transition-all duration-200 text-sm font-medium">
                  {subItem.title}
                </span>
              </NavLink>
            );
          })}
        </div>
      )}
    </SidebarMenuItemUI>
  );
}
