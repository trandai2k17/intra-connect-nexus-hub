
import { 
  ExternalLink, 
  Download, 
  Star, 
  Clock, 
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  app: any;
  isFavorited: boolean;
  onToggleFavorite: (appId: number) => void;
}

export function ApplicationCard({ app, isFavorited, onToggleFavorite }: ApplicationCardProps) {
  const Icon = app.icon;

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
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-white via-white to-blue-50/30 rounded-2xl border border-white/40 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
      {/* Header with status and favorite */}
      <div className="flex items-center justify-between mb-4">
        {getStatusBadge(app.status)}
        <button
          onClick={() => onToggleFavorite(app.id)}
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
          if (app.url) {
            window.open(app.url, '_blank');
          }
        }}
      >
        {getTypeIcon(app.type || "web")}
        <span className="ml-2">
          {app.type === "web" || !app.type ? "Mở trang web" : "Khởi chạy"}
        </span>
      </Button>
    </div>
  );
}
