
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

// Navigation items with individual colors
const navigationItems = [
  {
    title: 'sidebar.it',
    url: '/it',
    icon: Monitor,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-500',
  },
  {
    title: 'sidebar.production',
    url: '/production',
    icon: Building2,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    hoverBg: 'hover:bg-green-500',
  },
  {
    title: 'sidebar.quality',
    url: '/quality',
    icon: BarChart3,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    hoverBg: 'hover:bg-purple-500',
  },
  {
    title: 'sidebar.hr',
    url: '/hr',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    hoverBg: 'hover:bg-orange-500',
  },
  {
    title: 'sidebar.inventory',
    url: '/inventory',
    icon: Package,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    hoverBg: 'hover:bg-indigo-500',
  },
  {
    title: 'sidebar.purchase',
    url: '/purchase',
    icon: ShoppingCart,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    hoverBg: 'hover:bg-red-500',
  },
];

export function SidebarNavigation() {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
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
                      flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#4c4cff] to-[#00d2ff] text-white shadow-lg shadow-blue-500/25' 
                        : `text-gray-700 dark:text-gray-300 ${item.hoverBg} hover:text-white hover:shadow-md`
                      }
                    `}
                  >
                    {/* Icon with individual background color */}
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : `${item.bgColor} dark:bg-gray-700 group-hover:bg-white/20`
                      }
                    `}>
                      <Icon className={`w-4 h-4 transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : `${item.color} dark:text-gray-300 group-hover:text-white`
                      }`} />
                    </div>
                    
                    <span className="font-medium transition-all duration-300">
                      {t(item.title)}
                    </span>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
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
