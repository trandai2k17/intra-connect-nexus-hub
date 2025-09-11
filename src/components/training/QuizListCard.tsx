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
          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white to-gray-50/30 dark:from-gray-700 dark:to-gray-800/50 border border-gray-200/60 dark:border-gray-600/60 hover:from-blue-50/50 hover:to-indigo-50/30 dark:hover:from-gray-600/80 dark:hover:to-gray-700/80 hover:shadow-lg hover:border-blue-300/40 dark:hover:border-blue-600/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
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
            className={`text-xs px-3 py-1 flex-shrink-0 capitalize font-medium shadow-sm border-0 ${getStatusColor(quiz.status)} group-hover:shadow-md transition-all duration-200`}
          >
            {quiz.status}
          </Badge>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 shadow-lg border border-blue-200/30 dark:border-blue-700/30 h-fit backdrop-blur-sm">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-lg border-b border-blue-100/50 dark:border-blue-800/50">
        <CardTitle className="text-lg font-bold flex items-center gap-3 text-blue-900 dark:text-blue-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">Q</span>
          </div>
          Quiz Center
          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-700">
            17 quizzes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <Tabs defaultValue="rpd" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 p-1">
            <TabsTrigger value="rpd" className="text-xs font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">RPD (1-10)</TabsTrigger>
            <TabsTrigger value="ng" className="text-xs font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">NG (1-7)</TabsTrigger>
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