
import { useState } from "react";
import { 
  ExternalLink, 
  Download, 
  Star, 
  Clock, 
  Users, 
  Zap,
  Database,
  BarChart,
  FileText,
  Settings,
  Shield,
  Smartphone
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const applications = [
  {
    id: 1,
    name: "ERP System",
    description: "Hệ thống quản lý tài nguyên doanh nghiệp",
    icon: Database,
    category: "all",
    departments: ["hr", "purchase", "inventory"],
    type: "web",
    url: "https://erp.company.local",
    status: "online",
    users: 1250,
    rating: 4.8,
    isNew: false,
    isFavorite: true
  },
  {
    id: 2,
    name: "MES Production",
    description: "Hệ thống quản lý sản xuất thông minh",
    icon: BarChart,
    category: "production",
    departments: ["production"],
    type: "web",
    url: "https://mes.company.local",
    status: "online",
    users: 450,
    rating: 4.9,
    isNew: true,
    isFavorite: false
  },
  {
    id: 3,
    name: "QC Mobile",
    description: "Ứng dụng kiểm tra chất lượng di động",
    icon: Smartphone,
    category: "quality",
    departments: ["quality"],
    type: "mobile",
    downloadUrl: "/downloads/qc-mobile.apk",
    status: "online",
    users: 85,
    rating: 4.7,
    isNew: true,
    isFavorite: false
  },
  {
    id: 4,
    name: "IT Helpdesk",
    description: "Hệ thống hỗ trợ kỹ thuật nội bộ",
    icon: Settings,
    category: "it",
    departments: ["it"],
    type: "web",
    url: "https://helpdesk.company.local",
    status: "online",
    users: 320,
    rating: 4.6,
    isNew: false,
    isFavorite: true
  },
  {
    id: 5,
    name: "HR Portal",
    description: "Cổng thông tin nhân sự và chấm công",
    icon: Users,
    category: "hr",
    departments: ["hr"],
    type: "web",
    url: "https://hr.company.local",
    status: "maintenance",
    users: 890,
    rating: 4.5,
    isNew: false,
    isFavorite: false
  },
  {
    id: 6,
    name: "Inventory Manager",
    description: "Quản lý kho bãi và theo dõi tồn kho",
    icon: Package,
    category: "inventory",
    departments: ["inventory"],
    type: "desktop",
    downloadUrl: "/downloads/inventory-manager.exe",
    status: "online",
    users: 156,
    rating: 4.4,
    isNew: false,
    isFavorite: true
  },
  {
    id: 7,
    name: "Security Dashboard",
    description: "Giám sát bảo mật và cảnh báo hệ thống",
    icon: Shield,
    category: "it",
    departments: ["it"],
    type: "web",
    url: "https://security.company.local",
    status: "online",
    users: 25,
    rating: 4.9,
    isNew: false,
    isFavorite: true
  },
  {
    id: 8,
    name: "Document Center",
    description: "Trung tâm quản lý tài liệu số",
    icon: FileText,
    category: "all",
    departments: ["all"],
    type: "web",
    url: "https://docs.company.local",
    status: "online",
    users: 678,
    rating: 4.3,
    isNew: false,
    isFavorite: false
  }
];

interface ApplicationGridProps {
  activeTab: string;
}

export function ApplicationGrid({ activeTab }: ApplicationGridProps) {
  const [favorites, setFavorites] = useState<number[]>([1, 4, 6, 7]);

  const filteredApps = applications.filter(app => {
    if (activeTab === "all") return true;
    return app.departments.includes(activeTab);
  });

  const toggleFavorite = (appId: number) => {
    setFavorites(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Hoạt động</Badge>;
      case "maintenance":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Bảo trì</Badge>;
      case "offline":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Tạm ngưng</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "web":
        return <ExternalLink className="w-4 h-4" />;
      case "desktop":
      case "mobile":
        return <Download className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredApps.map((app) => {
        const Icon = app.icon;
        const isFavorited = favorites.includes(app.id);
        
        return (
          <div
            key={app.id}
            className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-white/30 p-6 hover:shadow-xl hover:shadow-intranet-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Status and favorite badges */}
            <div className="flex items-center justify-between mb-4">
              {getStatusBadge(app.status)}
              <button
                onClick={() => toggleFavorite(app.id)}
                className={cn(
                  "p-1 rounded-full transition-colors duration-200",
                  isFavorited 
                    ? "text-yellow-500 hover:text-yellow-600" 
                    : "text-gray-400 hover:text-yellow-500"
                )}
              >
                <Star className={cn("w-4 h-4", isFavorited && "fill-current")} />
              </button>
            </div>

            {/* App icon and info */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-intranet-primary/10 to-intranet-secondary/10 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Icon className="w-6 h-6 text-intranet-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-intranet-gray-800 group-hover:text-intranet-primary transition-colors duration-200">
                    {app.name}
                  </h3>
                  {app.isNew && (
                    <Badge className="bg-intranet-secondary/10 text-intranet-secondary hover:bg-intranet-secondary/10 text-xs">
                      Mới
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-intranet-gray-600 line-clamp-2">
                  {app.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-intranet-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{app.users} users</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current text-yellow-500" />
                <span>{app.rating}</span>
              </div>
            </div>

            {/* Action button */}
            <Button 
              className="w-full bg-gradient-to-r from-intranet-primary to-intranet-secondary hover:from-intranet-primary-light hover:to-intranet-secondary text-white shadow-lg shadow-intranet-primary/25 hover:shadow-intranet-primary/35 transition-all duration-200"
              onClick={() => {
                if (app.type === "web" && app.url) {
                  window.open(app.url, '_blank');
                } else if (app.downloadUrl) {
                  window.open(app.downloadUrl, '_blank');
                }
              }}
            >
              {getTypeIcon(app.type)}
              <span className="ml-2">
                {app.type === "web" ? "Mở ứng dụng" : "Tải xuống"}
              </span>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
