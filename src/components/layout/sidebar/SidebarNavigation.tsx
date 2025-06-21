
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
    color: 'text-blue-500',
  },
  {
    title: 'sidebar.production',
    url: '/production',
    icon: Building2,
    color: 'text-green-500',
  },
  {
    title: 'sidebar.quality',
    url: '/quality',
    icon: BarChart3,
    color: 'text-purple-500',
  },
  {
    title: 'sidebar.hr',
    url: '/hr',
    icon: Users,
    color: 'text-orange-500',
  },
  {
    title: 'sidebar.inventory',
    url: '/inventory',
    icon: Package,
    color: 'text-indigo-500',
  },
  {
    title: 'sidebar.purchase',
    url: '/purchase',
    icon: ShoppingCart,
    color: 'text-red-500',
  },
];

export function SidebarNavigation() {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
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
                        : 'text-[#4c4cff] hover:bg-gradient-to-r hover:from-[#4c4cff] hover:to-[#00d2ff] hover:text-white hover:shadow-md'
                      }
                    `}
                  >
                    {/* Icon background wrapper */}
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-blue-50 dark:bg-blue-900/30 group-hover:bg-white/20'
                      }
                    `}>
                      <Icon className={`w-4 h-4 transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-[#4c4cff] group-hover:text-white'
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
