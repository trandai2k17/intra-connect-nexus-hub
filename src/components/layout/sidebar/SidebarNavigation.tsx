
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

// Navigation items with individual icon colors
const navigationItems = [
  {
    title: 'sidebar.it',
    url: '/it',
    icon: Monitor,
    iconColor: 'text-blue-500',
  },
  {
    title: 'sidebar.production',
    url: '/production',
    icon: Building2,
    iconColor: 'text-green-500',
  },
  {
    title: 'sidebar.quality',
    url: '/quality',
    icon: BarChart3,
    iconColor: 'text-purple-500',
  },
  {
    title: 'sidebar.hr',
    url: '/hr',
    icon: Users,
    iconColor: 'text-orange-500',
  },
  {
    title: 'sidebar.inventory',
    url: '/inventory',
    icon: Package,
    iconColor: 'text-indigo-500',
  },
  {
    title: 'sidebar.purchase',
    url: '/purchase',
    icon: ShoppingCart,
    iconColor: 'text-red-500',
  },
];

export function SidebarNavigation() {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-black dark:text-white uppercase tracking-wider mb-4 px-4">
        {t('sidebar.navigation')}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) => `
                      flex items-center gap-4 px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 group relative overflow-hidden min-h-[56px]
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#4c4cff] to-[#00d2ff] text-white shadow-lg shadow-blue-500/25' 
                        : 'text-black dark:text-white hover:bg-gradient-to-r hover:from-[#4c4cff] hover:to-[#00d2ff] hover:text-white hover:shadow-lg hover:shadow-blue-500/20'
                      }
                    `}
                  >
                    {/* Icon with individual color and background */}
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-white/20'
                      }
                    `}>
                      <Icon className={`w-5 h-5 transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : `${item.iconColor} group-hover:text-white`
                      }`} />
                    </div>
                    
                    <span className="font-medium transition-all duration-300 text-base">
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
