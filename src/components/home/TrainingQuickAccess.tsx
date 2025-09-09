import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Brain, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const TrainingQuickAccess = () => {
  const trainingLinks = [
    {
      title: "RPD Dictionary",
      description: "Từ điển chuyên ngành RPD",
      url: "/training/dictionary/rpd",
      icon: BookOpen,
      color: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
      count: "245 terms"
    },
    {
      title: "NG Dictionary", 
      description: "Từ điển chuyên ngành NG",
      url: "/training/dictionary/ng",
      icon: BookOpen,
      color: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400", 
      count: "189 terms"
    },
    {
      title: "Quiz Center",
      description: "Trung tâm câu hỏi RPD/NG",
      url: "/training/quiz",
      icon: Brain,
      color: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
      count: "15 quizzes"
    },
    {
      title: "Thank Corner",
      description: "Góc tri ân & ghi nhận",
      url: "/training/thank-corner",
      icon: Heart,
      color: "bg-pink-500/20 text-pink-600 dark:text-pink-400",
      count: "New!"
    }
  ];

  return (
    <Card className="border-white/20 dark:border-gray-700/20 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          Training Center - Quick Access
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trainingLinks.map((link, index) => (
            <Link key={index} to={link.url} className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover-scale border-white/20 dark:border-gray-700/20">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${link.color.split(' ')[0]} ${link.color.split(' ')[1]}`}>
                    <link.icon className={`h-8 w-8 ${link.color.split(' ').slice(1).join(' ')}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {link.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {link.count}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};