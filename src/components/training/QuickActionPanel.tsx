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
    <Card className="bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 shadow-lg border border-emerald-200/30 dark:border-emerald-700/30 h-fit backdrop-blur-sm">
      <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-t-lg border-b border-emerald-100/50 dark:border-emerald-800/50">
        <CardTitle className="text-lg font-bold flex items-center gap-3 text-emerald-900 dark:text-emerald-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">⚡</span>
          </div>
          Quick Access
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {/* Quick Links */}
        <div className="space-y-2">
          {quickActions.map((action, index) => {
            const active = isActive(action.url);
            return (
              <Link key={index} to={action.url} className="block">
                <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group border hover:scale-[1.02] ${
                  active 
                    ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-primary/30 shadow-lg" 
                    : "bg-gradient-to-r from-white to-gray-50/30 dark:from-gray-700 dark:to-gray-800/50 border-gray-200/60 dark:border-gray-600/60 hover:from-emerald-50/50 hover:to-green-50/30 dark:hover:from-gray-600/80 dark:hover:to-gray-700/80 hover:shadow-lg hover:border-emerald-300/40 dark:hover:border-emerald-600/40"
                }`}>
                  <div className={`p-2 rounded-lg flex-shrink-0 shadow-sm transition-all duration-200 ${
                    active ? "bg-white/20 shadow-md" : action.color
                  }`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm transition-colors mb-0.5 ${
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
                    className={`text-xs px-3 py-1 flex-shrink-0 font-medium shadow-sm border-0 group-hover:shadow-md transition-all duration-200 ${
                      active ? "border-primary-foreground/20 text-primary-foreground bg-white/10" :
                      action.badge === "New" ? "bg-green-500/15 text-green-600 dark:text-green-400" :
                      action.badge === "Hot" ? "bg-red-500/15 text-red-600 dark:text-red-400" :
                      "bg-blue-500/15 text-blue-600 dark:text-blue-400"
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