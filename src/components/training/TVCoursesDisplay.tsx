import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

// Top performing courses data
const topPerformingCourses = coursesData
  .sort((a, b) => b.progress - a.progress)
  .slice(0, 5);

// Most recent courses data  
const newestCourses = coursesData
  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  .slice(0, 5);

export const TVCoursesDisplay = () => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-emerald-600';
    if (progress >= 50) return 'text-amber-600'; 
    return 'text-rose-600';
  };

  const getProgressGradient = (progress: number) => {
    if (progress >= 80) return 'from-emerald-50 to-emerald-100';
    if (progress >= 50) return 'from-amber-50 to-amber-100';
    return 'from-rose-50 to-rose-100';
  };

  const CircularProgress = ({ progress }: { progress: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    return (
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            className={getProgressColor(progress)}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold ${getProgressColor(progress)}`}>
          {progress}%
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Main Courses Grid */}
      <Card className="border-white/20 dark:border-gray-700/20 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            Ongoing Course
            <Badge variant="secondary" className="ml-2">
              {coursesData.length} courses
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {coursesData.map((course) => (
              <Card 
                key={course.id} 
                className={`bg-gradient-to-br ${getProgressGradient(course.progress)} border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl`}
              >
                <CardContent className="p-3 sm:p-4 flex flex-col items-center text-center space-y-2 sm:space-y-3">
                  <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight min-h-[2.5rem] sm:min-h-[3rem] flex items-center line-clamp-2">
                    {course.name}
                  </h3>
                  
                  <CircularProgress progress={course.progress} />
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 w-full">
                    <div className="truncate">Start: {course.startDate}</div>
                    <div className="truncate">End: {course.endDate}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Courses */}
      <Card className="border-white/20 dark:border-gray-700/20 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
            Top Performing Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformingCourses.map((course, index) => (
              <div key={course.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200 truncate">{course.name}</span>
                </div>
                <Badge className="bg-emerald-500 text-white">
                  {course.progress}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newest Courses */}
      <Card className="border-white/20 dark:border-gray-700/20 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-400">
            Newest Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {newestCourses.map((course, index) => (
              <div key={course.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200 truncate">{course.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Started: {course.startDate}</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-300 text-blue-700">
                  {course.progress}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};