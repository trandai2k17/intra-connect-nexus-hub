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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
              
              {/* Page Header */}
              <DashboardHeader />
              
              {/* KPI Metrics Strip */}
              <CompactMetrics />

              {/* Main Content Layout */}
              <div className="grid grid-cols-12 gap-6">
                
                {/* Left Sidebar - Quick Actions */}
                <div className="col-span-12 lg:col-span-3 xl:col-span-2">
                  <QuickActionPanel />
                </div>
                
                {/* Main Content Area */}
                <div className="col-span-12 lg:col-span-9 xl:col-span-10">
                  <div className="space-y-6">
                    
                    {/* Top Row - Key Charts */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      <CourseStatusChart />
                      <ActiveTrainingPrograms />
                    </div>
                    
                    {/* Bottom Row - Data Management */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      <CoursesTable />
                      <TVCoursesDisplay />
                    </div>
                    
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