import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Clock, Users, Trophy } from "lucide-react";
import { useState } from "react";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  category: string;
}

const rpdQuizzes: Quiz[] = [
  {
    id: "RPD001",
    title: "RPD Setup Fundamentals",
    description: "Kiến thức cơ bản về thiết lập RPD và các nguyên tắc căn bản",
    questions: 20,
    duration: 30,
    difficulty: 'Easy',
    participants: 45,
    category: "Setup"
  },
  {
    id: "RPD002", 
    title: "Flexible Materials Advanced",
    description: "Chuyên sâu về vật liệu mềm dẻo trong sản xuất RPD",
    questions: 25,
    duration: 45,
    difficulty: 'Hard',
    participants: 28,
    category: "Materials"
  },
  {
    id: "RPD003",
    title: "Cast Frame Design",
    description: "Thiết kế khung đúc cho răng giả tháo lắp",
    questions: 15,
    duration: 25,
    difficulty: 'Medium',
    participants: 67,
    category: "Design"
  },
  {
    id: "RPD004",
    title: "Wax Try-in Procedures",
    description: "Quy trình thử nghiệm sáp và điều chỉnh",
    questions: 18,
    duration: 35,
    difficulty: 'Medium',
    participants: 52,
    category: "Process"
  }
];

const ngQuizzes: Quiz[] = [
  {
    id: "NG001",
    title: "Complete Denture Impression",
    description: "Kỹ thuật lấy dấu cho răng giả toàn hàm",
    questions: 22,
    duration: 40,
    difficulty: 'Medium',
    participants: 73,
    category: "Impression"
  },
  {
    id: "NG002",
    title: "Occlusion Principles",
    description: "Nguyên lý khớp cắn trong răng giả toàn hàm",
    questions: 30,
    duration: 50,
    difficulty: 'Hard',
    participants: 34,
    category: "Occlusion"
  },
  {
    id: "NG003",
    title: "Retention & Stability",
    description: "Cố định và ổn định của răng giả toàn hàm",
    questions: 16,
    duration: 20,
    difficulty: 'Easy',
    participants: 89,
    category: "Function"
  },
  {
    id: "NG004",
    title: "Aesthetics in Complete Dentures",
    description: "Thẩm mỹ và sự hài hòa trong răng giả toàn hàm",
    questions: 12,
    duration: 15,
    difficulty: 'Easy',
    participants: 95,
    category: "Design"
  }
];

const QuizCenter = () => {
  const [activeTab, setActiveTab] = useState("rpd");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'Hard': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const QuizCard = ({ quiz }: { quiz: Quiz }) => (
    <Card className="border-white/20 dark:border-gray-700/20 shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-foreground mb-2">{quiz.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{quiz.description}</p>
          </div>
          <Badge className={getDifficultyColor(quiz.difficulty)}>
            {quiz.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{quiz.questions} câu hỏi</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{quiz.duration} phút</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{quiz.participants} người tham gia</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary" className="text-xs">
              {quiz.category}
            </Badge>
          </div>
        </div>
        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-lg transition-colors font-medium">
          Bắt đầu Quiz
        </button>
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8 space-y-8">
              {/* Header */}
              <Card className="border-white/20 dark:border-gray-700/20 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-3">
                    <Brain className="h-8 w-8" />
                    Quiz Center
                    <Badge variant="secondary" className="ml-auto">
                      {rpdQuizzes.length + ngQuizzes.length} quizzes
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">Trung tâm câu hỏi kiểm tra kiến thức RPD & NG</p>
                </CardHeader>
              </Card>

              {/* Quiz Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="rpd" className="text-base font-semibold">
                    RPD Quizzes ({rpdQuizzes.length})
                  </TabsTrigger>
                  <TabsTrigger value="ng" className="text-base font-semibold">
                    NG Quizzes ({ngQuizzes.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="rpd" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rpdQuizzes.map((quiz) => (
                      <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="ng" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ngQuizzes.map((quiz) => (
                      <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default QuizCenter;