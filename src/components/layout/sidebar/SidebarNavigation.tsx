
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import { navigationItems } from './navigationData';
import { SidebarMenuItem } from './SidebarMenuItem';

export function SidebarNavigation() {
  const { t } = useLanguage();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // Auto-expand groups that contain the active route
    const activeGroups = navigationItems
      .filter(item => 
        item.url === location.pathname || 
        item.subItems?.some(sub => sub.url === location.pathname)
      )
      .map(item => item.title);
    return activeGroups;
  });

  const toggleExpanded = (itemTitle: string) => {
    if (isCollapsed) return;
    
    setExpandedItems(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(title => title !== itemTitle)
        : [...prev, itemTitle]
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={`
        text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3
        ${isCollapsed ? 'px-2' : 'px-4'}
        transition-all duration-200
      `}>
        {!isCollapsed && t('sidebar.navigation')}
      </SidebarGroupLabel>
      
      <SidebarGroupContent>
        <SidebarMenu className="space-y-2 px-2">
          {navigationItems.map((item) => (
            <SidebarMenuItem
              key={item.title}
              item={item}
              isExpanded={expandedItems.includes(item.title)}
              onToggleExpanded={() => toggleExpanded(item.title)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
