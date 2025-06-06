
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
      <div className="flex items-center space-x-2 p-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 overflow-x-auto shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap shadow-sm",
                "hover:bg-white/90 hover:shadow-md",
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                  : "text-neutral-600 hover:text-blue-600 bg-white/50"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-colors duration-200",
                isActive ? "text-white" : "text-neutral-500"
              )} />
              <span>{tab.label}</span>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-colors duration-200",
                isActive 
                  ? "bg-white/25 text-white" 
                  : "bg-neutral-100 text-neutral-600"
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
