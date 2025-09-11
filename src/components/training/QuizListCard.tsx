import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle } from "lucide-react";

export const QuizListCard = () => {
  const quizzes = [
    {
      id: 1,
      title: "Dental Procedures Basic",
      participants: 24,
      duration: "15 min",
      status: "active",
      completionRate: 85
    },
    {
      id: 2,
      title: "Equipment Safety",
      participants: 18,
      duration: "10 min", 
      status: "new",
      completionRate: 92
    },
    {
      id: 3,
      title: "Patient Care Standards",
      participants: 31,
      duration: "20 min",
      status: "active",
      completionRate: 78
    },
    {
      id: 4,
      title: "Sterilization Process",
      participants: 12,
      duration: "12 min",
      status: "completed",
      completionRate: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "active": return "bg-blue-500/10 text-blue-600 dark:text-blue-400"; 
      case "completed": return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
      default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Quiz Center
          <Badge variant="secondary" className="text-xs">
            {quizzes.length} quizzes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          {quizzes.map((quiz) => (
            <div 
              key={quiz.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground mb-1 line-clamp-1">
                  {quiz.title}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{quiz.participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{quiz.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>{quiz.completionRate}%</span>
                  </div>
                </div>
              </div>
              <Badge 
                variant="secondary"
                className={`text-xs px-2 py-0.5 flex-shrink-0 capitalize ${getStatusColor(quiz.status)}`}
              >
                {quiz.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};