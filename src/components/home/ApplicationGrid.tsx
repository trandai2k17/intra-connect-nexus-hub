
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
  Smartphone,
  Package,
  Globe,
  Building2,
  Calendar,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const applications = [
  {
    id: 1,
    name: "Online Report Tools",
    description: "ERP Report Tools - Công cụ báo cáo trực tuyến",
    icon: Database,
    category: "all",
    departments: ["production", "hr", "purchase"],
    type: "desktop",
    url: "Online-Report-Tool://Hello-app",
    status: "online",
    users: 1250,
    rating: 4.8,
    version: "v1.3.5",
    lastUpdated: "2025-03-15",
    isNew: false,
    isFavorite: true,
    badge: "success"
  },
  {
    id: 2,
    name: "Purchase Application",
    description: "Purchasing application - Ứng dụng quản lý mua hàng",
    icon: Package,
    category: "purchase",
    departments: ["purchase"],
    type: "desktop",
    url: "Purchasing-Management-Tool://Hello-app",
    status: "online",
    users: 450,
    rating: 4.9,
    version: "v2.1.0",
    lastUpdated: "2025-04-01",
    isNew: true,
    isFavorite: false,
    badge: "warning"
  },
  {
    id: 3,
    name: "Scan Out Location",
    description: "Scan in and out - Quét vào ra vị trí",
    icon: Smartphone,
    category: "production", 
    departments: ["production"],
    type: "desktop",
    url: "Scan-Out-Location://Hello-app",
    status: "online",
    users: 85,
    rating: 4.7,
    version: "v2.1.0",
    lastUpdated: "2025-04-01",
    isNew: true,
    isFavorite: false,
    badge: "warning"
  },
  {
    id: 4,
    name: "Pakship",
    description: "Shipping scanner - Máy quét vận chuyển",
    icon: Settings,
    category: "inventory",
    departments: ["inventory"],
    type: "desktop",
    url: "Pakship-Tool://Hello-app",
    status: "online",
    users: 320,
    rating: 4.6,
    version: "v3.2.1",
    lastUpdated: "2025-04-10",
    isNew: false,
    isFavorite: true,
    badge: "success"
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
    version: "v1.8.2",
    lastUpdated: "2025-03-20",
    isNew: false,
    isFavorite: false,
    badge: "info"
  },
  {
    id: 6,
    name: "Quality Control Mobile",
    description: "Ứng dụng kiểm tra chất lượng di động",
    icon: BarChart,
    category: "quality",
    departments: ["quality"],
    type: "mobile",
    downloadUrl: "/downloads/qc-mobile.apk",
    status: "online",
    users: 156,
    rating: 4.4,
    version: "v1.5.3",
    lastUpdated: "2025-04-05",
    isNew: false,
    isFavorite: true,
    badge: "success"
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
    version: "v2.0.1",
    lastUpdated: "2025-04-12",
    isNew: false,
    isFavorite: true,
    badge: "success"
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
    version: "v1.2.0",
    lastUpdated: "2025-03-25",
    isNew: false,
    isFavorite: false,
    badge: "info"
  }
];

const companyWebPages = [
  {
    id: 'web1',
    name: "Company Portal",
    description: "Cổng thông tin chính của công ty",
    icon: Globe,
    url: "https://portal.company.com",
    category: "General",
    isInternal: true
  },
  {
    id: 'web2', 
    name: "Employee Self Service",
    description: "Dịch vụ tự phục vụ nhân viên",
    icon: Users,
    url: "https://ess.company.com",
    category: "HR",
    isInternal: true
  },
  {
    id: 'web3',
    name: "Company Website",
    description: "Website chính thức của công ty",
    icon: Building2,
    url: "https://www.company.com",
    category: "Public",
    isInternal: false
  },
  {
    id: 'web4',
    name: "Learning Management",
    description: "Hệ thống quản lý đào tạo",
    icon: Calendar,
    url: "https://learning.company.com",
    category: "Training",
    isInternal: true
  },
  {
    id: 'web5',
    name: "Internal Communication",
    description: "Hệ thống giao tiếp nội bộ",
    icon: MessageSquare,
    url: "https://comm.company.com",
    category: "Communication",
    isInternal: true
  }
];

interface ApplicationGridProps {
  activeTab: string;
}

export function ApplicationGrid({ activeTab }: ApplicationGridProps) {
  const [favorites, setFavorites] = useState<number[]>([1, 4, 6, 7]);
  const [showWebPages, setShowWebPages] = useState(false);

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

  const getVersionBadge = (badge: string, version: string) => {
    const badgeClasses = {
      success: "bg-green-100 text-green-700",
      warning: "bg-amber-100 text-amber-700", 
      info: "bg-blue-100 text-blue-700"
    };
    
    return (
      <Badge className={`${badgeClasses[badge as keyof typeof badgeClasses]} hover:${badgeClasses[badge as keyof typeof badgeClasses]}`}>
        {version}
      </Badge>
    );
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
    <div className="space-y-8">
      {/* Applications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredApps.map((app) => {
          const Icon = app.icon;
          const isFavorited = favorites.includes(app.id);
          
          return (
            <div
              key={app.id}
              className="group relative bg-gradient-to-br from-white via-white to-blue-50/30 rounded-2xl border border-white/40 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header with status and favorite */}
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
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 text-lg">
                      {app.name}
                    </h3>
                    {app.isNew && (
                      <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs px-2 py-1">
                        Mới
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>

              {/* Version and date */}
              <div className="flex items-center justify-between mb-4">
                {getVersionBadge(app.badge, app.version)}
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {app.lastUpdated}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
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
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-600/35 transition-all duration-200 font-medium"
                onClick={() => {
                  if (app.type === "web" && app.url) {
                    window.open(app.url, '_blank');
                  } else if (app.url) {
                    window.open(app.url, '_blank');
                  }
                }}
              >
                {getTypeIcon(app.type)}
                <span className="ml-2">
                  {app.type === "web" ? "Mở ứng dụng" : "Khởi chạy"}
                </span>
              </Button>
            </div>
          );
        })}
      </div>

      {/* Company Web Pages Section */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Trang Web Công Ty</h3>
            <p className="text-gray-600">Các trang web và dịch vụ trực tuyến của công ty</p>
          </div>
          <Button
            onClick={() => setShowWebPages(!showWebPages)}
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            {showWebPages ? "Ẩn bớt" : "Xem tất cả"}
          </Button>
        </div>

        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 transition-all duration-500",
          showWebPages ? "max-h-none opacity-100" : "max-h-32 opacity-60 overflow-hidden"
        )}>
          {companyWebPages.map((page) => {
            const Icon = page.icon;
            
            return (
              <div
                key={page.id}
                className="group bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => window.open(page.url, '_blank')}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 text-sm">
                      {page.name}
                    </h4>
                    <Badge 
                      className={cn(
                        "text-xs mt-1",
                        page.isInternal 
                          ? "bg-blue-100 text-blue-600" 
                          : "bg-green-100 text-green-600"
                      )}
                    >
                      {page.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {page.description}
                </p>
                <div className="flex items-center justify-end mt-3">
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
