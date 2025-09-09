import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PortalBanner } from "@/components/portal/PortalBanner";
import { QuickLinks } from "@/components/portal/QuickLinks";
import { AnnouncementsFeed } from "@/components/portal/AnnouncementsFeed";
import { MyTasks } from "@/components/portal/MyTasks";
import { QuickActions } from "@/components/portal/QuickActions";
import { TopDocuments } from "@/components/portal/TopDocuments";
import { EventsCalendar } from "@/components/portal/EventsCalendar";


const PortalHome = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const { t } = useLanguage();

  return (
    <div className="w-full">
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
    </div>
  );
};

export default PortalHome;