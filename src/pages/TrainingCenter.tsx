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
            <div className="container mx-auto px-4 py-4 max-w-7xl">
              {/* Compact Header Section */}
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6">
                {/* Banner - spans 3 columns */}
                <div className="xl:col-span-3">
                  <TrainingBanner />
                </div>
                {/* Quick Access - compact in 1 column */}
                <div className="xl:col-span-1">
                  <TrainingQuickAccess />
                </div>
              </div>

              {/* Metrics Row - Compact */}
              <div className="mb-6">
                <TrainingMetrics />
              </div>

              {/* Main Content Grid - 2 Columns */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                {/* Left: Active Programs */}
                <div>
                  <ActiveTrainingPrograms />
                </div>
                {/* Right: Course Status Chart */}
                <div>
                  <CourseStatusChart />
                </div>
              </div>

              {/* Bottom Section - Full Width */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                {/* Courses Table */}
                <div>
                  <CoursesTable />
                </div>
                {/* TV Display */}
                <div>
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