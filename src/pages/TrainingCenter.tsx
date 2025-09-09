import { useLanguage } from "@/contexts/LanguageContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { TrainingBanner } from "@/components/training/TrainingBanner";
import { TrainingMetrics } from "@/components/training/TrainingMetrics";
import { TrainingQuickAccess } from "@/components/home/TrainingQuickAccess";
import { CoursesTable } from "@/components/training/CoursesTable";
import { TVCoursesDisplay } from "@/components/training/TVCoursesDisplay";
import { ActiveTrainingPrograms } from "@/components/training/ActiveTrainingPrograms";
import { CourseStatusChart } from "@/components/training/CourseStatusChart";

const TrainingCenter = () => {
  const { t } = useLanguage();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="w-full px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
              {/* Top Section: Banner + Metrics + Quick Access */}
              <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Banner - spans most columns */}
                <div className="lg:col-span-2 xl:col-span-3">
                  <TrainingBanner />
                </div>
                
                {/* Compact Metrics - vertical stack */}
                <div className="lg:col-span-1 xl:col-span-1 space-y-2">
                  <TrainingMetrics />
                </div>
                
                {/* Quick Access */}
                <div className="lg:col-span-1 xl:col-span-1">
                  <TrainingQuickAccess />
                </div>
              </div>

              {/* Main Content Grid - Responsive 2 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                {/* Left: Active Programs */}
                <div className="w-full">
                  <ActiveTrainingPrograms />
                </div>
                {/* Right: Course Status Chart */}
                <div className="w-full">
                  <CourseStatusChart />
                </div>
              </div>

              {/* Bottom Section - Full Width Responsive Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                {/* Courses Table */}
                <div className="w-full">
                  <CoursesTable />
                </div>
                {/* TV Display */}
                <div className="w-full">
                  <TVCoursesDisplay />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TrainingCenter;