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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {metrics.map((metric, index) => (
        <Card key={index} className={`${metric.borderColor} bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-md transition-all duration-200`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${metric.color}`}>
                <metric.icon className="h-4 w-4" />
              </div>
              <Badge 
                variant={metric.trend === "up" ? "default" : "secondary"}
                className={`text-xs px-2 py-0 ${
                  metric.trend === "up" 
                    ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {metric.change}
              </Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground truncate">{metric.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};