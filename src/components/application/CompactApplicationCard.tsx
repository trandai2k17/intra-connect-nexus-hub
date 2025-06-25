
import { 
  ExternalLink, 
  Download, 
  Star, 
  Globe,
  Monitor,
  Smartphone
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "web":
        return <Globe className="w-4 h-4" />;
      case "desktop":
        return <Monitor className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

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
      "Unikey": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center", // Vietnamese keyboard
      "Zalo Desktop": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop&crop=center", // Chat/communication
      "Microsoft Teams": "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop&crop=center", // Team collaboration
      "Microsoft Excel": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center", // Spreadsheet
      "Microsoft Word": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop&crop=center", // Document
      "Microsoft PowerPoint": "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop&crop=center", // Presentation
      "YouTube": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center", // Video platform
      "Coursera": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop&crop=center", // Education
      "Udemy": "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop&crop=center", // Online learning
      "Google Chrome": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center", // Browser
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
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {/* App Icon with circular design, border and shadow */}
          <div className="relative">
            <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg">
              {appIconImage ? (
                <AvatarImage 
                  src={appIconImage} 
                  alt={app.name}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className={cn(
                  "bg-gradient-to-br text-white font-semibold",
                  appStyle.gradient
                )}>
                  <Icon className="w-6 h-6" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className={cn(
              "absolute -top-1 -right-1 w-3 h-3 rounded-full ring-2 ring-white",
              getStatusColor(app.status)
            )} />
          </div>

          {/* App Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={cn(
                "font-semibold group-hover:transition-colors duration-200 truncate",
                `group-hover:${appStyle.iconColor}`,
                "text-gray-800"
              )}>
                {app.name}
              </h3>
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
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {app.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center space-x-2 mb-3">
              {app.version && (
                <Badge variant="outline" className="text-xs">
                  {app.version}
                </Badge>
              )}
              {app.isNew && (
                <Badge className="bg-blue-100 text-blue-600 text-xs">
                  Mới
                </Badge>
              )}
              <div className="flex items-center text-xs text-gray-500">
                {getTypeIcon(app.type || "web")}
                <span className="ml-1">
                  {app.type === "web" ? "Web" : app.type === "desktop" ? "Desktop" : "Mobile"}
                </span>
              </div>
            </div>

            {/* Action Button with custom gradient */}
            <Button 
              size="sm"
              className={cn(
                "w-full text-white shadow-sm bg-gradient-to-r hover:shadow-md transition-all duration-200",
                appStyle.gradient,
                `hover:${appStyle.gradient.replace('from-', 'from-').replace('to-', 'to-').replace('-500', '-600').replace('-600', '-700')}`
              )}
              onClick={() => {
                if (app.url) {
                  window.open(app.url, '_blank');
                }
              }}
            >
              {getTypeIcon(app.type || "web")}
              <span className="ml-2">
                {app.type === "web" || !app.type ? "Mở" : "Chạy"}
              </span>
            </Button>
          </div>
        </div>

        {/* Website Preview */}
        {showPreview && app.type === "web" && app.url && (
          <div className="mt-3 border rounded-lg overflow-hidden bg-gray-50">
            <div className="h-32 flex items-center justify-center text-gray-500">
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
