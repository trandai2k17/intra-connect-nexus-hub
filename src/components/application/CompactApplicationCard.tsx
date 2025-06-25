
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {/* App Icon */}
          <div className="relative">
            <div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div className={cn(
              "absolute -top-1 -right-1 w-3 h-3 rounded-full",
              getStatusColor(app.status)
            )} />
          </div>

          {/* App Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 truncate">
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
                  v{app.version}
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

            {/* Action Button */}
            <Button 
              size="sm"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm"
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
