import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const totalPages = Math.ceil(coursesData.length / coursesPerPage);
  
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = coursesData.slice(startIndex, startIndex + coursesPerPage);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'stroke-green-500';
    if (progress >= 50) return 'stroke-blue-500';
    if (progress >= 30) return 'stroke-orange-500';
    return 'stroke-red-500';
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return 'text-green-500';
    if (progress >= 50) return 'text-blue-500';
    if (progress >= 30) return 'text-orange-500';
    return 'text-red-500';
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
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          ACTIVE TRAINING PROGRAMS
        </h2>
        <div className="text-blue-100 text-lg">
          CURRENT: {currentCourses.length}/{coursesData.length} PROGRAMS SHOWN
        </div>
      </div>

      {/* Courses Grid - 3x2 layout */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {currentCourses.map((course) => (
          <Card 
            key={course.id} 
            className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              {/* Course Name */}
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide min-h-[2rem] flex items-center">
                {course.name}
              </h3>

              {/* Circular Progress */}
              <CircularProgress progress={course.progress} />

              {/* Date Information */}
              <div className="w-full space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Started on</span>
                  <span className="font-bold">{course.startDate}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">Expected by</span>
                  <span className="font-bold">{course.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="text-white hover:bg-white/20"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="bg-white/20 px-4 py-2 rounded-lg">
          <span className="text-white font-medium">
            PAGE {currentPage}/{totalPages}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="text-white hover:bg-white/20"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};