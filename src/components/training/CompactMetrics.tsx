import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, GraduationCap, TrendingUp, Clock, Award } from "lucide-react";

export const CompactMetrics = () => {
  const metrics = [
    {
      title: "Total Courses",
      value: "12",
      change: "+2",
      trend: "up",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Active Trainers", 
      value: "8",
      change: "+1",
      trend: "up",
      icon: GraduationCap,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-500/20"
    },
    {
      title: "Active Trainees",
      value: "156",
      change: "+12",
      trend: "up", 
      icon: Users,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400", 
      borderColor: "border-orange-500/20"
    },
    {
      title: "Avg. Course Time",
      value: "4.2h",
      change: "-0.3h",
      trend: "down",
      icon: Clock,
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
      borderColor: "border-cyan-500/20"
    },
    {
      title: "Certificates",
      value: "94",
      change: "+8",
      trend: "up",
      icon: Award,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-500/20"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className={`${metric.borderColor} bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-200 border-0 min-h-[120px]`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <metric.icon className="h-5 w-5" />
                </div>
                <Badge 
                  variant={metric.trend === "up" ? "default" : "secondary"}
                  className={`text-xs px-2 py-1 ${
                    metric.trend === "up" 
                      ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-foreground leading-tight">{metric.value}</p>
                <p className="text-sm text-muted-foreground leading-tight">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};