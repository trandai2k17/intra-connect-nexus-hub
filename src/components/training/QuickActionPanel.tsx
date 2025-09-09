import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const QuickActionPanel = () => {
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


  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">Quick Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Links */}
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.url} className="block">
              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group border border-transparent hover:border-muted">
                <div className={`p-3 rounded-lg ${action.color} flex-shrink-0`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-base text-foreground group-hover:text-primary transition-colors mb-1">
                    {action.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs px-3 py-1 flex-shrink-0 ${
                    action.badge === "New" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                    action.badge === "Hot" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
                    "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {action.badge}
                </Badge>
              </div>
            </Link>
          ))}
        </div>

      </CardContent>
    </Card>
  );
};