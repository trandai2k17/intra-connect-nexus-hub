
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutGrid, 
  Monitor, 
  Building2, 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const tabs = [
  { id: "all", key: "nav.all", icon: LayoutGrid, count: 42 },
  { id: "it", key: "nav.it", icon: Monitor, count: 12 },
  { id: "production", key: "nav.production", icon: Building2, count: 8 },
  { id: "quality", key: "nav.quality", icon: BarChart3, count: 6 },
  { id: "hr", key: "nav.hr", icon: Users, count: 5 },
  { id: "inventory", key: "nav.inventory", icon: Package, count: 7 },
  { id: "purchase", key: "nav.purchase", icon: ShoppingCart, count: 4 }
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 p-2 bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200/50 overflow-x-auto shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap shadow-sm",
                "hover:shadow-md",
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                  : "text-gray-600 hover:text-blue-600 bg-white/70 hover:bg-white/90"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-colors duration-200",
                isActive ? "text-white" : "text-gray-500"
              )} />
              <span>{t(tab.key)}</span>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-colors duration-200",
                isActive 
                  ? "bg-white/25 text-white" 
                  : "bg-gray-100 text-gray-600"
              )}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
