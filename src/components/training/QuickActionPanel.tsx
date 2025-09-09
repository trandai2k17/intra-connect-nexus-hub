import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Heart, Plus, Calendar, Users } from "lucide-react";
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

  const systemActions = [
    {
      icon: Plus,
      label: "New Course",
      action: () => {},
      variant: "default" as const
    },
    {
      icon: Calendar,
      label: "Schedule",
      action: () => {},
      variant: "outline" as const
    },
    {
      icon: Users,
      label: "Manage Users", 
      action: () => {},
      variant: "outline" as const
    }
  ];

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Links */}
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.url} className="block">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
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

        {/* System Actions */}
        <div className="pt-3 border-t border-border/50">
          <p className="text-sm font-medium text-muted-foreground mb-3">System Actions</p>
          <div className="space-y-2">
            {systemActions.map((action, index) => (
              <Button 
                key={index}
                variant={action.variant}
                size="sm"
                className="w-full justify-start gap-2"
                onClick={action.action}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};