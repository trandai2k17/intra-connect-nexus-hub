import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardHeader } from "@/components/training/DashboardHeader";
import { CompactMetrics } from "@/components/training/CompactMetrics";
import { QuickActionPanel } from "@/components/training/QuickActionPanel";
import { QuizListCard } from "@/components/training/QuizListCard";
import { QuizDashboardCard } from "@/components/training/QuizDashboardCard";
import { CourseStatusChart } from "@/components/training/CourseStatusChart";
import { CoursesTable } from "@/components/training/CoursesTable";
import { TVCoursesDisplay } from "@/components/training/TVCoursesDisplay";
import { ActiveTrainingPrograms } from "@/components/training/ActiveTrainingPrograms";

const TrainingCenter = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-none px-4 md:px-6 lg:px-8 space-y-6">
      {/* Page Header */}
      <div className="w-full">
        <DashboardHeader />
      </div>
      
      {/* KPI Metrics Strip */}
      <div className="w-full">
        <CompactMetrics />
      </div>

      {/* Active Training Programs Row */}
      <div className="w-full">
        <ActiveTrainingPrograms />
      </div>

      {/* Quick Access & Course Status Row */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="w-full lg:col-span-4 space-y-4">
          <QuickActionPanel />
          <QuizListCard />
          <QuizDashboardCard />
        </div>
        <div className="w-full lg:col-span-8">
          <CourseStatusChart />
        </div>
      </div>

      {/* Courses Table Row */}
      <div className="w-full">
        <CoursesTable />
      </div>

      {/* TV Display Row */}
      <div className="w-full">
        <TVCoursesDisplay />
      </div>
    </div>
  );
};

export default TrainingCenter;