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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-3">
          Ongoing Courses
        </h2>
        <div className="text-2xl font-semibold text-muted-foreground/80">
          {coursesData.length} Active Training Programs
        </div>
      </div>

      {/* Courses Grid - 4 columns for better TV display */}
      <div className="grid grid-cols-4 gap-4 px-4">
        {coursesData.map((course) => (
          <Card 
            key={course.id} 
            className="group relative overflow-hidden border border-border/10 bg-card/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-500 hover:scale-[1.02] hover:border-primary/20"
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 opacity-[0.03] bg-gradient-to-br ${getProgressGradient(course.progress)}`} />
            
            <CardContent className="relative p-5 space-y-4">
              {/* Course ID Badge & Status Dot */}
              <div className="flex justify-between items-start">
                <div className="bg-gradient-to-r from-primary/15 to-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 shadow-sm">
                  <span className="text-base font-bold text-primary">{course.id}</span>
                </div>
                <div 
                  className={`w-3 h-3 rounded-full shadow-lg ${
                    course.progress >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600 shadow-green-500/30' : 
                    course.progress >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-yellow-500/30' : 
                    'bg-gradient-to-r from-red-400 to-red-600 shadow-red-500/30'
                  }`} 
                />
              </div>

              {/* Course Name */}
              <h3 className="text-lg font-bold text-foreground leading-snug min-h-[4.5rem] flex items-center line-clamp-3">
                {course.name}
              </h3>

              {/* Date Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary/70" />
                  <span className="font-medium">Start: {course.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary/70" />
                  <span className="font-medium">End: {course.endDate}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">Progress</span>
                  <span 
                    className="text-xl font-bold drop-shadow-sm" 
                    style={{ color: getProgressColor(course.progress) }}
                  >
                    {course.progress}%
                  </span>
                </div>
                <div className="relative">
                  <div className="h-2 bg-muted/20 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                      style={{ 
                        width: `${course.progress}%`,
                        background: `linear-gradient(90deg, ${getProgressColor(course.progress)}, ${getProgressColor(course.progress)}dd)`,
                        boxShadow: `0 0 8px ${getProgressColor(course.progress)}40`
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};