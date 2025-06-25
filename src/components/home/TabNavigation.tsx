
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutGrid, 
  Monitor, 
  Building2, 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart,
  Search,
  Grid3X3,
  List
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApplicationTabs } from "./ApplicationTabs";
import { applications, companyWebPages } from "./applicationData";

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
  const [favorites, setFavorites] = useState<number[]>([1, 4, 6, 7]);
  const [activeAppTab, setActiveAppTab] = useState("software");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = activeTab === "all" || app.departments.includes(activeTab);
    return matchesSearch && matchesDept;
  });

  const filteredWebPages = companyWebPages.filter(page => {
    return page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           page.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleFavorite = (appId: number) => {
    setFavorites(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  return (
    <div className={cn(
      "transition-all duration-300 relative",
      scrollPosition > 100 ? "sticky top-20 z-20" : ""
    )}>
      {/* Background with geometric elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-3xl border border-white/40 shadow-lg geometric-bg"></div>
      
      <div className="relative p-6 space-y-6">
        {/* Header with title and controls */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Ứng dụng & Phần mềm</h2>
            <p className="text-sm text-gray-600">Quản lý và truy cập các ứng dụng công ty</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm ứng dụng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="p-2"
            >
              {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Department tabs - compact horizontal scrollable */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-brand">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap border",
                  isActive 
                    ? "bg-blue-500 text-white shadow-md border-blue-500" 
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 bg-white border-gray-200"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{t(tab.labelKey)}</span>
                <Badge 
                  className={cn(
                    "text-xs px-2 py-0.5",
                    isActive 
                      ? "bg-white/20 text-white border-white/30" 
                      : "bg-blue-100 text-blue-700 border-blue-200"
                  )}
                >
                  {tab.count}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Application Tabs */}
        <ApplicationTabs
          activeTab={activeAppTab}
          onTabChange={setActiveAppTab}
          filteredApps={filteredApps}
          companyWebPages={filteredWebPages}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          viewMode={viewMode}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}
