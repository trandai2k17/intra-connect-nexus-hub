import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Download, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const DashboardHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Left side - Title and breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Training Center</span>
            <span>/</span>
            <span>Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Training Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor training progress and performance</p>
        </div>

        {/* Right side - Actions and stats */}
        <div className="flex items-center gap-3">
          <Card className="px-3 py-2 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Q4 2024</span>
            </div>
          </Card>
          
          <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Live Data
          </Badge>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};