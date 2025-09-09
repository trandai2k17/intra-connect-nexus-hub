import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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

export const CoursesTable = () => {
  // Sort courses by progress (highest to lowest)
  const sortedCourses = [...coursesData].sort((a, b) => {
    return b.progress - a.progress;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'completed': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'upcoming': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-white/20 dark:border-gray-700/20 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          Ongoing Courses
          <Badge variant="secondary" className="ml-2">
            {coursesData.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border/20">
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Course Name</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground min-w-[100px]">Start</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground min-w-[100px]">End</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground min-w-[120px]">Progress</th>
              </tr>
            </thead>
            <tbody>
              {sortedCourses.slice(0, 6).map((course) => (
                <tr 
                  key={course.id} 
                  className="border-b border-border/10 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-4 px-3">
                    <div className="font-medium text-foreground">
                      <div className="line-clamp-2 leading-tight">
                        {course.name}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-muted-foreground text-sm whitespace-nowrap">
                    {course.startDate}
                  </td>
                  <td className="py-4 px-3 text-muted-foreground text-sm whitespace-nowrap">
                    {course.endDate}
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getProgressColor(course.progress)}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground min-w-[40px]">
                        {course.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {sortedCourses.slice(0, 6).map((course) => (
            <div 
              key={course.id}
              className="p-4 bg-muted/30 rounded-lg border border-border/20"
            >
              <div className="space-y-3">
                <h4 className="font-medium text-foreground text-sm leading-tight">
                  {course.name}
                </h4>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Start: {course.startDate}</span>
                  <span>End: {course.endDate}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">{course.progress}%</span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${getProgressColor(course.progress)}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};