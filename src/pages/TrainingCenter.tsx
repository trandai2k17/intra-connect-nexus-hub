import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardHeader } from "@/components/training/DashboardHeader";
import { CompactMetrics } from "@/components/training/CompactMetrics";
import { QuickActionPanel } from "@/components/training/QuickActionPanel";
import { CourseStatusChart } from "@/components/training/CourseStatusChart";
import { CoursesTable } from "@/components/training/CoursesTable";
import { TVCoursesDisplay } from "@/components/training/TVCoursesDisplay";
import { ActiveTrainingPrograms } from "@/components/training/ActiveTrainingPrograms";

const TrainingCenter = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <DashboardHeader />
      
      {/* KPI Metrics Strip */}
      <CompactMetrics />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar - Quick Actions */}
        <div className="lg:col-span-3">
          <QuickActionPanel />
        </div>
        
        {/* Main Content Area */}
        <div className="lg:col-span-9">
          <div className="space-y-8">
            
            {/* Top Row - Key Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <CourseStatusChart />
              <ActiveTrainingPrograms />
            </div>
            
            {/* Bottom Row - Data Management */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <CoursesTable />
              <TVCoursesDisplay />
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TrainingCenter;