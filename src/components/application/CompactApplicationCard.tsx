
import { 
  ExternalLink, 
  Download, 
  Star, 
  Globe,
  Monitor,
  Smartphone,
  Play,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CompactApplicationCardProps {
  app: any;
  isFavorited: boolean;
  onToggleFavorite: (appId: number) => void;
  showPreview?: boolean;
}

export function CompactApplicationCard({ 
  app, 
  isFavorited, 
  onToggleFavorite,
  showPreview = false
}: CompactApplicationCardProps) {
  const Icon = app.icon;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "maintenance":
        return "bg-yellow-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get app icon image based on app name
  const getAppIconImage = (appName: string) => {
    const iconMap: Record<string, string> = {
      "Unikey": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center",
      "Zalo Desktop": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop&crop=center",
      "Microsoft Teams": "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop&crop=center",
      "Microsoft Excel": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center",
      "Microsoft Word": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop&crop=center",
      "Microsoft PowerPoint": "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop&crop=center",
      "YouTube": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center",
      "Coursera": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop&crop=center",
      "Udemy": "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop&crop=center",
      "Google Chrome": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center",
    };
    return iconMap[appName] || null;
  };

  // Use custom app styling if available, otherwise fall back to defaults
  const appStyle = app.appStyle || {
    gradient: "from-blue-500 to-blue-600",
    iconBg: "from-blue-500/10 to-blue-600/10",
    iconColor: "text-blue-600"
  };

  const appIconImage = getAppIconImage(app.name);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/95 backdrop-blur-sm h-fit">
      <CardContent className="p-3">
        <div className="flex flex-col items-center space-y-2 text-center">
          {/* App Icon - larger and more prominent */}
          <div className="relative">
            <Avatar className="w-14 h-14 ring-2 ring-white shadow-lg group-hover:scale-105 transition-transform duration-200">
              {appIconImage ? (
                <AvatarImage 
                  src={appIconImage} 
                  alt={app.name}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className={cn(
                  "bg-gradient-to-br text-white font-semibold text-lg",
                  appStyle.gradient
                )}>
                  <Icon className="w-7 h-7" />
                </AvatarFallback>
              )}
            </Avatar>
            
            {/* Status indicator */}
            <div className={cn(
              "absolute -top-1 -right-1 w-3 h-3 rounded-full ring-2 ring-white",
              getStatusColor(app.status)
            )} />
            
            {/* Favorite star */}
            <button
              onClick={() => onToggleFavorite(app.id)}
              className={cn(
                "absolute -top-1 -left-1 p-1 rounded-full transition-all duration-200 hover:scale-110",
                isFavorited 
                  ? "text-yellow-500 bg-white shadow-sm" 
                  : "text-gray-400 hover:text-yellow-500 hover:bg-white hover:shadow-sm"
              )}
            >
              <Star className={cn("w-3 h-3", isFavorited && "fill-current")} />
            </button>
          </div>

          {/* App Name - compact with shadow text */}
          <div className="w-full">
            <h3 className={cn(
              "font-semibold text-sm leading-tight group-hover:transition-colors duration-200 truncate",
              "text-gray-800 drop-shadow-sm",
              `group-hover:${appStyle.iconColor}`
            )}>
              {app.name}
            </h3>
            
            {/* New badge if applicable */}
            {app.isNew && (
              <Badge className="bg-blue-100 text-blue-600 text-xs mt-1 px-2 py-0">
                Mới
              </Badge>
            )}
          </div>

          {/* Action Buttons - compact */}
          <div className="flex gap-1 w-full">
            <Button 
              size="sm"
              className={cn(
                "flex-1 text-white shadow-sm bg-gradient-to-r hover:shadow-md transition-all duration-200 text-xs py-1 h-7",
                appStyle.gradient
              )}
              onClick={() => {
                if (app.url) {
                  window.open(app.url, '_blank');
                }
              }}
            >
              <Play className="w-3 h-3" />
              <span className="ml-1">
                {app.type === "web" || !app.type ? "Mở" : "Chạy"}
              </span>
            </Button>
            
            {showPreview && (
              <Button 
                size="sm"
                variant="outline"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  // Toggle preview logic here
                }}
              >
                <Eye className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Website Preview - if enabled */}
        {showPreview && app.type === "web" && app.url && (
          <div className="mt-3 border rounded-lg overflow-hidden bg-gray-50">
            <div className="h-24 flex items-center justify-center text-gray-500">
              <iframe 
                src={app.url}
                className="w-full h-full border-0 pointer-events-none scale-50 origin-top-left"
                style={{ width: '200%', height: '200%' }}
                title={`Preview of ${app.name}`}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
