
import { Package, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationCard } from "./ApplicationCard";

interface ApplicationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  filteredApps: any[];
  companyWebPages: any[];
  favorites: number[];
  onToggleFavorite: (appId: number) => void;
}

export function ApplicationTabs({ 
  activeTab, 
  onTabChange, 
  filteredApps, 
  companyWebPages, 
  favorites, 
  onToggleFavorite 
}: ApplicationTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8 bg-blue-50/50 p-1 rounded-xl">
        <TabsTrigger value="software" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Phần Mềm ({filteredApps.length})</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="webpages" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Trang Web ({companyWebPages.length})</span>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="software" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredApps.map((app) => {
            const isFavorited = favorites.includes(app.id);
            return (
              <ApplicationCard
                key={app.id}
                app={app}
                isFavorited={isFavorited}
                onToggleFavorite={onToggleFavorite}
              />
            );
          })}
        </div>
      </TabsContent>

      <TabsContent value="webpages" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {companyWebPages.map((page) => {
            return (
              <ApplicationCard
                key={page.id}
                app={{
                  ...page,
                  type: "web",
                  isNew: false,
                  departments: ["all"]
                }}
                isFavorited={false}
                onToggleFavorite={() => {}}
              />
            );
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
}
