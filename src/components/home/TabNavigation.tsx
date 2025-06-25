
import { useState, useEffect } from "react";
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

interface TabItem {
  id: string;
  labelKey: string;
  icon: React.ElementType;
  count: number;
}

const tabs: TabItem[] = [
  { id: "all", labelKey: "nav.all", icon: LayoutGrid, count: 42 },
  { id: "it", labelKey: "sidebar.it", icon: Monitor, count: 12 },
  { id: "production", labelKey: "sidebar.production", icon: Building2, count: 8 },
  { id: "quality", labelKey: "sidebar.quality", icon: BarChart3, count: 6 },
  { id: "hr", labelKey: "sidebar.hr", icon: Users, count: 5 },
  { id: "inventory", labelKey: "sidebar.inventory", icon: Package, count: 7 },
  { id: "purchase", labelKey: "sidebar.purchase", icon: ShoppingCart, count: 4 }
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { t } = useLanguage();
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      "mb-8 transition-all duration-300 relative",
      scrollPosition > 100 ? "sticky top-20 z-20" : ""
    )}>
      {/* Background with geometric elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-3xl border border-white/40 shadow-lg geometric-bg"></div>
      
      <div className="relative flex items-center space-x-2 p-4 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 whitespace-nowrap relative overflow-hidden group",
                "hover:shadow-lg hover:scale-105 transform",
                isActive 
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/25 animate-brand-pulse" 
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 bg-white/60 backdrop-blur-sm border border-white/30"
              )}
            >
              {/* Geometric decoration for active tab */}
              {isActive && (
                <>
                  <div className="absolute top-1 right-1 w-3 h-3 bg-white/20 rounded transform rotate-45"></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/15 rounded transform rotate-12"></div>
                </>
              )}
              
              <Icon className={cn(
                "w-5 h-5 transition-all duration-300",
                isActive ? "text-white" : "text-blue-600 group-hover:text-blue-700"
              )} />
              <span className="font-medium">{t(tab.labelKey)}</span>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 min-w-[2rem] text-center",
                isActive 
                  ? "bg-white/25 text-white shadow-sm" 
                  : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"
              )}>
                {tab.count}
              </span>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
