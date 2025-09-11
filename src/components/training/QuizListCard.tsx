import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, CheckCircle } from "lucide-react";

export const QuizListCard = () => {
  const rpdQuizzes = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `RPD Test - ${i + 1}`,
    participants: Math.floor(Math.random() * 30) + 10,
    duration: `${Math.floor(Math.random() * 15) + 5} min`,
    status: ["active", "new", "completed"][Math.floor(Math.random() * 3)],
    completionRate: Math.floor(Math.random() * 30) + 70
  }));

  const ngQuizzes = Array.from({ length: 7 }, (_, i) => ({
    id: i + 11,
    title: `NG Test - ${i + 1}`,
    participants: Math.floor(Math.random() * 25) + 5,
    duration: `${Math.floor(Math.random() * 20) + 10} min`,
    status: ["active", "new", "completed"][Math.floor(Math.random() * 3)],
    completionRate: Math.floor(Math.random() * 25) + 75
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "active": return "bg-blue-500/10 text-blue-600 dark:text-blue-400"; 
      case "completed": return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
      default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  const renderQuizList = (quizzes: typeof rpdQuizzes) => (
    <div className="space-y-1 max-h-64 overflow-y-auto">
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
  );

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Quiz Center
          <Badge variant="secondary" className="text-xs">
            17 quizzes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Tabs defaultValue="rpd" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rpd" className="text-xs">RPD (1-10)</TabsTrigger>
            <TabsTrigger value="ng" className="text-xs">NG (1-7)</TabsTrigger>
          </TabsList>
          <TabsContent value="rpd" className="space-y-2">
            {renderQuizList(rpdQuizzes)}
          </TabsContent>
          <TabsContent value="ng" className="space-y-2">
            {renderQuizList(ngQuizzes)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};