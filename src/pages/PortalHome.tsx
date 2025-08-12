import { useState } from "react";
import { Search, Bell, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { PortalBanner } from "@/components/portal/PortalBanner";
import { QuickLinks } from "@/components/portal/QuickLinks";
import { AnnouncementsFeed } from "@/components/portal/AnnouncementsFeed";
import { MyTasks } from "@/components/portal/MyTasks";
import { QuickActions } from "@/components/portal/QuickActions";
import { TopDocuments } from "@/components/portal/TopDocuments";
import { EventsCalendar } from "@/components/portal/EventsCalendar";

const PortalHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const { t } = useLanguage();

  const departments = [
    { value: "all", label: "Tất cả phòng ban" },
    { value: "it", label: "IT" },
    { value: "hr", label: "Nhân sự" },
    { value: "finance", label: "Tài chính" },
    { value: "operations", label: "Vận hành" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header with Search */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-border/40 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm tài liệu, thông báo, biểu mẫu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/60"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              {departments.find(d => d.value === selectedDepartment)?.label}
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                3
              </Badge>
            </Button>
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
    </div>
  );
};

export default PortalHome;