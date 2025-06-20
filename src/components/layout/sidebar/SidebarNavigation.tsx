
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Monitor, 
  Building2, 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart 
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// Navigation items without subItems property
const navigationItems = [
  {
    title: 'sidebar.it',
    url: '/it',
    icon: Monitor,
    color: 'text-blue-600',
  },
  {
    title: 'sidebar.production',
    url: '/production',
    icon: Building2,
    color: 'text-green-600',
  },
  {
    title: 'sidebar.quality',
    url: '/quality',
    icon: BarChart3,
    color: 'text-purple-600',
  },
  {
    title: 'sidebar.hr',
    url: '/hr',
    icon: Users,
    color: 'text-orange-600',
  },
  {
    title: 'sidebar.inventory',
    url: '/inventory',
    icon: Package,
    color: 'text-indigo-600',
  },
  {
    title: 'sidebar.purchase',
    url: '/purchase',
    icon: ShoppingCart,
    color: 'text-red-600',
  },
];

export function SidebarNavigation() {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {t('sidebar.navigation')}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                    <span>{t(item.title)}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
