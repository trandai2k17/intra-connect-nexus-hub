import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock } from "lucide-react";

interface Course {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'ongoing' | 'completed' | 'upcoming';
}

const coursesData: Course[] = [
  {
    id: "RPD0001",
    name: "Setup/Festoon Wax try-in/Flexible product",
    startDate: "25-Jul-25",
    endDate: "22-Sep-25",
    progress: 75,
    status: 'ongoing'
  },
  {
    id: "RPD0002", 
    name: "Setup/Festoon Flexible/Wax try-in product",
    startDate: "25-Jul-25",
    endDate: "22-Sep-25",
    progress: 30,
    status: 'ongoing'
  },
  {
    id: "RPD0003",
    name: "Cast Frame-Scan/Design-upgrade training",
    startDate: "24-Jul-25",
    endDate: "7-Sep-25", 
    progress: 31,
    status: 'ongoing'
  },
  {
    id: "RPD0004",
    name: "Pre-test: NG-Other",
    startDate: "9-Aug-25",
    endDate: "9-Sep-25",
    progress: 31,
    status: 'ongoing'
  },
  {
    id: "RPD0005",
    name: "PDNG-Blockout",
    startDate: "11-Aug-25",
    endDate: "30-Sep-25",
    progress: 31,
    status: 'ongoing'
  },
  {
    id: "RPD0006",
    name: "Flexible-Fit/Polish-Group 3",
    startDate: "25-Aug-25",
    endDate: "24-Sep-25",
    progress: 37,
    status: 'ongoing'
  },
  {
    id: "RPD0007",
    name: "Acrylic-Fit/Polish-Group 3",
    startDate: "25-Aug-25",
    endDate: "24-Sep-25",
    progress: 37,
    status: 'ongoing'
  },
  {
    id: "RPD0008",
    name: "Printed Model",
    startDate: "27-Aug-25",
    endDate: "25-Sep-25",
    progress: 50,
    status: 'ongoing'
  },
  {
    id: "RPD0009",
    name: "CT Scan",
    startDate: "27-Aug-25", 
    endDate: "25-Sep-25",
    progress: 87,
    status: 'ongoing'
  },
  {
    id: "RPD0010",
    name: "CT Scan-Practicing",
    startDate: "27-Aug-25",
    endDate: "25-Sep-25",
    progress: 96,
    status: 'ongoing'
  },
  {
    id: "RPD0011",
    name: "PDNG-Model",
    startDate: "27-Aug-25",
    endDate: "26-Sep-25",
    progress: 73,
    status: 'ongoing'
  },
  {
    id: "RPD0012",
    name: "Fitting/Polishing for Flexible product for Skill/Highskill level",
    startDate: "27-Aug-25",
    endDate: "8-Sep-25",
    progress: 71,
    status: 'ongoing'
  }
];

export const TVCoursesDisplay = () => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'hsl(var(--chart-2))'; // Green
    if (progress >= 50) return 'hsl(var(--chart-3))'; // Yellow  
    return 'hsl(var(--chart-1))'; // Red
  };

  const getProgressGradient = (progress: number) => {
    if (progress >= 80) return 'from-green-500/20 to-green-600/10';
    if (progress >= 50) return 'from-yellow-500/20 to-yellow-600/10';
    return 'from-red-500/20 to-red-600/10';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
          Ongoing Courses
        </h2>
        <div className="text-3xl font-semibold text-muted-foreground">
          {coursesData.length} Active Training Programs
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-3 gap-8 px-8">
        {coursesData.map((course) => (
          <Card 
            key={course.id} 
            className={`relative overflow-hidden border-2 border-border/20 shadow-xl bg-gradient-to-br ${getProgressGradient(course.progress)} backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
          >
            <CardContent className="p-8 space-y-6">
              {/* Course ID Badge */}
              <div className="flex justify-between items-start">
                <div className="bg-primary/10 px-4 py-2 rounded-full">
                  <span className="text-xl font-bold text-primary">{course.id}</span>
                </div>
                <div className={`w-4 h-4 rounded-full ${
                  course.progress >= 80 ? 'bg-green-500' : 
                  course.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
              </div>

              {/* Course Name */}
              <h3 className="text-2xl font-bold text-foreground leading-tight min-h-[6rem] flex items-center">
                {course.name}
              </h3>

              {/* Date Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-lg text-muted-foreground">
                  <Calendar className="w-6 h-6" />
                  <span className="font-medium">Start: {course.startDate}</span>
                </div>
                <div className="flex items-center gap-3 text-lg text-muted-foreground">
                  <Clock className="w-6 h-6" />
                  <span className="font-medium">End: {course.endDate}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Progress</span>
                  <span className="text-3xl font-bold" style={{ color: getProgressColor(course.progress) }}>
                    {course.progress}%
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={course.progress} 
                    className="h-4 bg-muted/30"
                  />
                  <div 
                    className="absolute top-0 left-0 h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{ 
                      width: `${course.progress}%`,
                      backgroundColor: getProgressColor(course.progress),
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};