
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

const tabs = [
  { id: "all", label: "Tất cả", icon: LayoutGrid, count: 42 },
  { id: "it", label: "IT", icon: Monitor, count: 12 },
  { id: "production", label: "Sản xuất", icon: Building2, count: 8 },
  { id: "quality", label: "QA/QC", icon: BarChart3, count: 6 },
  { id: "hr", label: "Nhân sự", icon: Users, count: 5 },
  { id: "inventory", label: "Kho bãi", icon: Package, count: 7 },
  { id: "purchase", label: "Mua hàng", icon: ShoppingCart, count: 4 }
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-1 p-1 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap",
                "hover:bg-white/70 hover:shadow-md",
                isActive 
                  ? "bg-gradient-to-r from-intranet-primary to-intranet-secondary text-white shadow-lg shadow-intranet-primary/25" 
                  : "text-intranet-gray-600 hover:text-intranet-primary"
              )}
            >
              <Icon className={cn(
                "w-4 h-4 transition-colors duration-200",
                isActive ? "text-white" : "text-intranet-gray-500"
              )} />
              <span>{tab.label}</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-200",
                isActive 
                  ? "bg-white/20 text-white" 
                  : "bg-intranet-gray-100 text-intranet-gray-600"
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
