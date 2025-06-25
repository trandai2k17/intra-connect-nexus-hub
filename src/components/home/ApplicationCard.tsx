
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
  viewMode?: "grid" | "list";
}

export function ApplicationCard({ app, isFavorited, onToggleFavorite, viewMode = "grid" }: ApplicationCardProps) {
  const Icon = app.icon;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs px-2 py-1">Hoạt động</Badge>;
      case "maintenance":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs px-2 py-1">Bảo trì</Badge>;
      case "offline":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs px-2 py-1">Tạm ngưng</Badge>;
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
      <Badge className={`${badgeClasses[badge as keyof typeof badgeClasses]} hover:${badgeClasses[badge as keyof typeof badgeClasses]} text-xs px-2 py-1`}>
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

  if (viewMode === "list") {
    return (
      <div className="group bg-gradient-to-r from-white via-white to-blue-50/30 rounded-xl border border-white/40 p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
        <div className="flex items-center space-x-4">
          {/* App icon */}
          <div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg group-hover:scale-110 transition-transform duration-200">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>

          {/* App info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 truncate">
                {app.name}
              </h3>
              {app.isNew && (
                <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs px-2 py-1">
                  Mới
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-1">
              {app.description}
            </p>
          </div>

          {/* Status and stats */}
          <div className="flex items-center space-x-3">
            {getStatusBadge(app.status)}
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{app.users}</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current text-yellow-500" />
              <span>{app.rating}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(app.id)}
              className={cn(
                "p-1.5 rounded-full transition-colors duration-200",
                isFavorited 
                  ? "text-yellow-500 hover:text-yellow-600" 
                  : "text-gray-400 hover:text-yellow-500"
              )}
            >
              <Star className={cn("w-4 h-4", isFavorited && "fill-current")} />
            </button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
              onClick={() => {
                if (app.url) {
                  window.open(app.url, '_blank');
                }
              }}
            >
              {getTypeIcon(app.type || "web")}
              <span className="ml-1 text-xs">
                {app.type === "web" || !app.type ? "Mở" : "Chạy"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-gradient-to-br from-white via-white to-blue-50/30 rounded-xl border border-white/40 p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
      {/* Header with status and favorite */}
      <div className="flex items-center justify-between mb-3">
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
      <div className="flex items-start space-x-3 mb-3">
        <div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg group-hover:scale-110 transition-transform duration-200">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 truncate">
              {app.name}
            </h3>
            {app.isNew && (
              <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs px-1.5 py-0.5">
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
      <div className="flex items-center justify-between mb-3">
        {getVersionBadge(app.badge, app.version)}
        <span className="text-xs text-gray-500 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {app.lastUpdated}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
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
