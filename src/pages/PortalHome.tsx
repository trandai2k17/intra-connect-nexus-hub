import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { PortalBanner } from "@/components/portal/PortalBanner";
import { QuickLinks } from "@/components/portal/QuickLinks";
import { AnnouncementsFeed } from "@/components/portal/AnnouncementsFeed";
import { MyTasks } from "@/components/portal/MyTasks";
import { QuickActions } from "@/components/portal/QuickActions";
import { TopDocuments } from "@/components/portal/TopDocuments";
import { EventsCalendar } from "@/components/portal/EventsCalendar";
import { TimeWeatherWidget } from "@/components/portal/TimeWeatherWidget";

const PortalHome = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const { t } = useLanguage();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            {/* Portal Header with Time/Weather Widget */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-border/40 sticky top-20 z-40">
              <div className="container mx-auto px-6 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      Portal Chính
                    </h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Trung tâm thông tin và dịch vụ nội bộ
                    </p>
                  </div>
                  <div className="flex-1 max-w-2xl ml-6">
                    <TimeWeatherWidget />
                  </div>
                </div>
              </div>
            </div>
            <div className="container mx-auto px-6 py-8 space-y-8">
              {/* Row 1: Banner + Quick Links */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  <PortalBanner />
                </div>
                <div className="lg:col-span-4">
                  <QuickLinks />
                </div>
              </div>

              {/* Row 2: Announcements + My Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  <AnnouncementsFeed selectedDepartment={selectedDepartment} />
                </div>
                <div className="lg:col-span-4">
                  <MyTasks />
                </div>
              </div>

              {/* Row 3: Quick Actions + Top Documents + Events */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                  <QuickActions />
                </div>
                <div className="lg:col-span-4">
                  <TopDocuments />
                </div>
                <div className="lg:col-span-4">
                  <EventsCalendar />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PortalHome;