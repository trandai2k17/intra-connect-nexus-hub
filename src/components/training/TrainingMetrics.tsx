import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, GraduationCap, Trophy } from "lucide-react";

interface TopStudent {
  name: string;
  subdepartment: string;
  realTask: string;
  completeDate: string;
}

const topStudents: TopStudent[] = [
  {
    name: "Nguyen Van A",
    subdepartment: "Digital Design",
    realTask: "RPD Framework Setup",
    completeDate: "15-Dec"
  },
  {
    name: "Tran Thi B",
    subdepartment: "CAD/CAM",
    realTask: "3D Modeling Advanced",
    completeDate: "14-Dec"
  },
  {
    name: "Le Van C",
    subdepartment: "Quality Control",
    realTask: "CT Scan Analysis",
    completeDate: "13-Dec"
  },
  {
    name: "Pham Thi D",
    subdepartment: "Production",
    realTask: "Flexible Materials",
    completeDate: "12-Dec"
  },
  {
    name: "Hoang Van E",
    subdepartment: "Digital Design",
    realTask: "Wax Try-in Process",
    completeDate: "11-Dec"
  },
  {
    name: "Vo Thi F",
    subdepartment: "CAD/CAM",
    realTask: "Cast Frame Design",
    completeDate: "10-Dec"
  },
  {
    name: "Dang Van G",
    subdepartment: "Quality Control",
    realTask: "Model Validation",
    completeDate: "09-Dec"
  },
  {
    name: "Bui Thi H",
    subdepartment: "Production",
    realTask: "Polishing Techniques",
    completeDate: "08-Dec"
  },
  {
    name: "Ngo Van I",
    subdepartment: "Digital Design",
    realTask: "Blockout Methods",
    completeDate: "07-Dec"
  },
  {
    name: "Truong Thi K",
    subdepartment: "CAD/CAM",
    realTask: "Printed Model QC",
    completeDate: "06-Dec"
  }
];

export const TrainingMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Courses */}
      <Card className="border-white/20 dark:border-gray-700/20 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl hover:shadow-3xl transition-all duration-300 hover-scale">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Trainers */}
      <Card className="border-white/20 dark:border-gray-700/20 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl hover:shadow-3xl transition-all duration-300 hover-scale">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <GraduationCap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Trainers</p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">8</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Trainees */}
      <Card className="border-white/20 dark:border-gray-700/20 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl hover:shadow-3xl transition-all duration-300 hover-scale">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Trainees</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">156</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers Card */}
      <Card className="border-white/20 dark:border-gray-700/20 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Top 10 Completions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {topStudents.map((student, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <p className="font-medium text-sm text-foreground truncate">
                      {student.name}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {student.subdepartment}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {student.realTask}
                  </p>
                </div>
                <Badge className="bg-green-500/90 hover:bg-green-500 text-white text-xs shrink-0 ml-2">
                  {student.completeDate}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};