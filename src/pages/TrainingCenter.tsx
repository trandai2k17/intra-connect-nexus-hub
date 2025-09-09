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

const TrainingCenter = () => {
  const { t } = useLanguage();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              {/* Dashboard Header Banner */}
              <div className="mb-8">
                <TrainingBanner />
              </div>

              {/* Top Metrics Row */}
              <div className="mb-8">
                <TrainingMetrics />
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                {/* Left Column - Quick Access */}
                <div className="xl:col-span-1">
                  <TrainingQuickAccess />
                </div>

                {/* Right Column - Active Training Programs */}
                <div className="xl:col-span-2">
                  <ActiveTrainingPrograms />
                </div>
              </div>

              {/* Courses Table Section */}
              <div className="mb-8">
                <CoursesTable />
              </div>

              {/* TV Display Section */}
              <div className="mb-8">
                <TVCoursesDisplay />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TrainingCenter;