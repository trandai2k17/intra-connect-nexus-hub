import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const QuickActionPanel = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const quickActions = [
    {
      title: "RPD Dictionary",
      description: "245 terms",
      url: "/training/dictionary/rpd",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      badge: "Active"
    },
    {
      title: "NG Dictionary", 
      description: "189 terms",
      url: "/training/dictionary/ng",
      icon: BookOpen,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      badge: "Active" 
    },
    {
      title: "Quiz Center",
      description: "15 active quizzes",
      url: "/training/quiz",
      icon: Brain,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      badge: "New"
    },
    {
      title: "Thank Corner",
      description: "Recognition hub",
      url: "/training/thank-corner",
      icon: Heart,
      color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
      badge: "Hot"
    }
  ];

  const isActive = (url: string) => currentPath === url;


  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Quick Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Quick Links */}
        <div className="space-y-1">
          {quickActions.map((action, index) => {
            const active = isActive(action.url);
            return (
              <Link key={index} to={action.url} className="block">
                <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group border ${
                  active 
                    ? "bg-primary text-primary-foreground border-primary shadow-md" 
                    : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-sm"
                }`}>
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    active ? "bg-white/20" : action.color
                  }`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm transition-colors mb-0.5 ${
                      active ? "text-primary-foreground" : "text-foreground"
                    }`}>
                      {action.title}
                    </p>
                    <p className={`text-xs ${
                      active ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      {action.description}
                    </p>
                  </div>
                  <Badge 
                    variant={active ? "outline" : "secondary"}
                    className={`text-xs px-2 py-0.5 flex-shrink-0 ${
                      active ? "border-primary-foreground/20 text-primary-foreground" :
                      action.badge === "New" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                      action.badge === "Hot" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
                      "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {action.badge}
                  </Badge>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};