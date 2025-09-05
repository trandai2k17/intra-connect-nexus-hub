import { useLanguage } from "@/contexts/LanguageContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { TrainingBanner } from "@/components/training/TrainingBanner";
import { CoursesTable } from "@/components/training/CoursesTable";

const TrainingCenter = () => {
  const { t } = useLanguage();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8 space-y-8">
              {/* Banner */}
              <div className="grid grid-cols-1 gap-8">
                <TrainingBanner />
              </div>

              {/* Courses Statistics */}
              <div className="grid grid-cols-1 gap-8">
                <CoursesTable />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TrainingCenter;