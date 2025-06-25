
import { Package, Globe, Star, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationCard } from "./ApplicationCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ApplicationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  filteredApps: any[];
  companyWebPages: any[];
  favorites: number[];
  onToggleFavorite: (appId: number) => void;
  viewMode: "grid" | "list";
  searchTerm: string;
}

export function ApplicationTabs({ 
  activeTab, 
  onTabChange, 
  filteredApps, 
  companyWebPages, 
  favorites, 
  onToggleFavorite,
  viewMode,
  searchTerm
}: ApplicationTabsProps) {
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users" | "updated">("name");

  const sortApps = (apps: any[]) => {
    return [...apps].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "users":
          return b.users - a.users;
        case "updated":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });
  };

  const sortedApps = sortApps(filteredApps);
  const sortedWebPages = sortApps(companyWebPages);

  const favoriteApps = sortedApps.filter(app => favorites.includes(app.id));

  const getGridClasses = () => {
    if (viewMode === "list") {
      return "space-y-3";
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4";
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="grid w-auto grid-cols-3 bg-gray-100/50 p-1 rounded-lg">
          <TabsTrigger value="software" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Phần Mềm</span>
              <Badge className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5">
                {sortedApps.length}
              </Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="webpages" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Trang Web</span>
              <Badge className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5">
                {sortedWebPages.length}
              </Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Yêu thích</span>
              <Badge className="bg-yellow-100 text-yellow-700 text-xs px-1.5 py-0.5">
                {favoriteApps.length}
              </Badge>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Sort controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sắp xếp:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border border-gray-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Tên</option>
            <option value="rating">Đánh giá</option>
            <option value="users">Người dùng</option>
            <option value="updated">Cập nhật</option>
          </select>
        </div>
      </div>

      <TabsContent value="software" className="mt-0">
        {searchTerm && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              Tìm thấy <strong>{sortedApps.length}</strong> ứng dụng cho "{searchTerm}"
            </p>
          </div>
        )}
        <div className={getGridClasses()}>
          {sortedApps.map((app) => {
            const isFavorited = favorites.includes(app.id);
            return (
              <ApplicationCard
                key={app.id}
                app={app}
                isFavorited={isFavorited}
                onToggleFavorite={onToggleFavorite}
                viewMode={viewMode}
              />
            );
          })}
        </div>
        {sortedApps.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Không tìm thấy ứng dụng nào</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="webpages" className="mt-0">
        {searchTerm && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700">
              Tìm thấy <strong>{sortedWebPages.length}</strong> trang web cho "{searchTerm}"
            </p>
          </div>
        )}
        <div className={getGridClasses()}>
          {sortedWebPages.map((page) => {
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
                viewMode={viewMode}
              />
            );
          })}
        </div>
        {sortedWebPages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Không tìm thấy trang web nào</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="favorites" className="mt-0">
        <div className={getGridClasses()}>
          {favoriteApps.map((app) => {
            return (
              <ApplicationCard
                key={app.id}
                app={app}
                isFavorited={true}
                onToggleFavorite={onToggleFavorite}
                viewMode={viewMode}
              />
            );
          })}
        </div>
        {favoriteApps.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Chưa có ứng dụng yêu thích nào</p>
            <p className="text-sm mt-2">Nhấn vào biểu tượng ngôi sao để thêm ứng dụng yêu thích</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
