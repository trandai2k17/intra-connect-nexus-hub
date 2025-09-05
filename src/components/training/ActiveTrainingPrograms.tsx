import { Card, CardContent } from "@/components/ui/card";
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
    name: "SETUP/FESTOON WAX TRY-IN",
    startDate: "23-JUL-25",
    endDate: "22-SEP-25",
    progress: 75,
    status: 'ongoing'
  },
  {
    id: "RPD0002", 
    name: "CAST FRAME-SCAN/DESIGN",
    startDate: "24-JUL-25",
    endDate: "7-SEP-25",
    progress: 31,
    status: 'ongoing'
  },
  {
    id: "RPD0003",
    name: "PDNG-BLOCKOUT",
    startDate: "25-JUL-25",
    endDate: "7-SEP-25", 
    progress: 31,
    status: 'ongoing'
  },
  {
    id: "RPD0004",
    name: "ACRYLIC-FIT/POLISH",
    startDate: "25-JUL-25",
    endDate: "22-SEP-25",
    progress: 37,
    status: 'ongoing'
  },
  {
    id: "RPD0005",
    name: "PRINTED MODEL",
    startDate: "24-JUL-25",
    endDate: "7-SEP-25",
    progress: 50,
    status: 'ongoing'
  },
  {
    id: "RPD0006",
    name: "CT SCAN",
    startDate: "23-JUL-25",
    endDate: "22-SEP-25",
    progress: 87,
    status: 'ongoing'
  },
  {
    id: "RPD0007",
    name: "FLEXIBLE PRODUCT",
    startDate: "25-JUL-25",
    endDate: "22-SEP-25",
    progress: 65,
    status: 'ongoing'
  },
  {
    id: "RPD0008",
    name: "WAX TRY-IN PRODUCT",
    startDate: "24-JUL-25",
    endDate: "7-SEP-25",
    progress: 42,
    status: 'ongoing'
  },
  {
    id: "RPD0009",
    name: "UPGRADE TRAINING",
    startDate: "23-JUL-25",
    endDate: "22-SEP-25",
    progress: 28,
    status: 'ongoing'
  },
  {
    id: "RPD0010",
    name: "SKILL LEVEL TRAINING",
    startDate: "25-JUL-25",
    endDate: "7-SEP-25",
    progress: 93,
    status: 'ongoing'
  },
  {
    id: "RPD0011",
    name: "POLISH GROUP 3",
    startDate: "24-JUL-25",
    endDate: "22-SEP-25",
    progress: 15,
    status: 'ongoing'
  },
  {
    id: "RPD0012",
    name: "MODEL PRACTICING",
    startDate: "23-JUL-25",
    endDate: "7-SEP-25",
    progress: 79,
    status: 'ongoing'
  }
];

export const ActiveTrainingPrograms = () => {

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'stroke-emerald-500';
    if (progress >= 50) return 'stroke-cyan-500';
    if (progress >= 30) return 'stroke-amber-500';
    return 'stroke-rose-500';
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return 'text-emerald-600';
    if (progress >= 50) return 'text-cyan-600';
    if (progress >= 30) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getCardGradient = (progress: number) => {
    if (progress >= 80) return 'from-emerald-50 via-white to-emerald-50/30';
    if (progress >= 50) return 'from-cyan-50 via-white to-cyan-50/30';
    if (progress >= 30) return 'from-amber-50 via-white to-amber-50/30';
    return 'from-rose-50 via-white to-rose-50/30';
  };

  const getBorderColor = (progress: number) => {
    if (progress >= 80) return 'border-emerald-200';
    if (progress >= 50) return 'border-cyan-200';
    if (progress >= 30) return 'border-amber-200';
    return 'border-rose-200';
  };

  const CircularProgress = ({ progress }: { progress: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={getProgressColor(progress)}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${getProgressBgColor(progress)}`}>
          {progress}%
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 rounded-3xl shadow-2xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-3">
          ACTIVE TRAINING PROGRAMS
        </h2>
        <div className="text-slate-200 text-lg font-medium">
          CURRENT: {coursesData.length} PROGRAMS ACTIVE
        </div>
      </div>

      {/* Courses Grid - 4x3 layout for all 12 courses */}
      <div className="grid grid-cols-4 gap-6">
        {coursesData.map((course) => (
          <Card 
            key={course.id} 
            className={`bg-gradient-to-br ${getCardGradient(course.progress)} backdrop-blur-sm ${getBorderColor(course.progress)} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu`}
          >
            <CardContent className="p-5 flex flex-col items-center text-center space-y-4">
              {/* Course Name */}
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider leading-tight min-h-[2.5rem] flex items-center">
                {course.name}
              </h3>

              {/* Circular Progress */}
              <CircularProgress progress={course.progress} />

              {/* Date Information */}
              <div className="w-full space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                  <Calendar className="w-3 h-3 text-emerald-500" />
                  <span className="font-medium">Started</span>
                  <span className="font-bold">{course.startDate}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span className="font-medium">Expected</span>
                  <span className="font-bold">{course.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};