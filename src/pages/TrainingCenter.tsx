import { useLanguage } from "@/contexts/LanguageContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900 min-h-screen">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
              {/* Dashboard Header */}
              <DashboardHeader />
              
              {/* KPI Metrics Row */}
              <CompactMetrics />

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
                {/* Left Side - Quick Actions Panel */}
                <div className="lg:col-span-1 xl:col-span-1">
                  <QuickActionPanel />
                </div>
                
                {/* Main Content Area */}
                <div className="lg:col-span-3 xl:col-span-4 space-y-6">
                  {/* Charts Row */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <CourseStatusChart />
                    <ActiveTrainingPrograms />
                  </div>
                  
                  {/* Data Tables Row */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <CoursesTable />
                    <TVCoursesDisplay />
                  </div>
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