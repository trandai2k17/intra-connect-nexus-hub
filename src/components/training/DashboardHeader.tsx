import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Download, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const DashboardHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Left side - Title and breadcrumb */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Training Center</span>
            <span>/</span>
            <span>Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Training Dashboard</h1>
          <p className="text-lg text-muted-foreground">Monitor training progress and performance metrics</p>
        </div>

        {/* Right side - Actions and stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Card className="px-4 py-3 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-base font-medium">Q4 2024</span>
              </div>
            </Card>
            
            <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 px-3 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Live Data</span>
            </Badge>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="default" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" size="default" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button variant="outline" size="default">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};