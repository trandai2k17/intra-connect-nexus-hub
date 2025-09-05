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
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-2">
          Ongoing Courses
        </h2>
        <div className="text-xl font-semibold text-muted-foreground/80">
          {coursesData.length} Active Training Programs
        </div>
      </div>

      {/* Courses Grid - 6 columns for 2 rows display */}
      <div className="grid grid-cols-6 gap-3 px-3">
        {coursesData.map((course) => (
          <Card 
            key={course.id} 
            className="group relative overflow-hidden border border-border/10 bg-card/95 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-500 hover:scale-[1.02] hover:border-primary/20"
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 opacity-[0.03] bg-gradient-to-br ${getProgressGradient(course.progress)}`} />
            
            <CardContent className="relative p-3 space-y-3">
              {/* Course Name */}
              <h3 className="text-sm font-bold text-foreground leading-tight min-h-[2.5rem] flex items-center line-clamp-2">
                {course.name}
              </h3>

              {/* Date Information */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 text-green-500" />
                  <span className="font-medium">{course.startDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 text-red-500" />
                  <span className="font-medium">{course.endDate}</span>
                </div>
              </div>

              {/* Progress Pill */}
              <div className="flex justify-center">
                <div 
                  className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                    course.progress >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                    course.progress >= 50 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 
                    'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}
                >
                  {course.progress}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};