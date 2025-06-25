
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { ApplicationCard } from "@/components/home/ApplicationCard";
import { applications, companyWebPages } from "@/components/home/applicationData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";

const SoftwareApplication = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([1, 4, 6, 7]);

  const allApplications = [...applications, ...companyWebPages];

  const filteredApplications = allApplications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === "all") return matchesSearch;
    if (activeCategory === "software") return matchesSearch && applications.includes(app);
    if (activeCategory === "webpages") return matchesSearch && companyWebPages.includes(app);
    if (activeCategory === "favorites") return matchesSearch && favorites.includes(app.id);
    
    return matchesSearch;
  });

  const handleToggleFavorite = (appId: number) => {
    setFavorites(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const categories = [
    { id: "all", label: "Tất cả", count: allApplications.length },
    { id: "software", label: "Phần mềm", count: applications.length },
    { id: "webpages", label: "Trang web", count: companyWebPages.length },
    { id: "favorites", label: "Yêu thích", count: favorites.length },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="p-8 space-y-8">
              {/* Page Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gradient dark:text-white mb-4">
                  Ứng dụng & Phần mềm
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Quản lý và truy cập tất cả các ứng dụng, phần mềm và trang web của công ty
                </p>
              </div>

              {/* Search and Controls */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Tìm kiếm ứng dụng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600"
                    />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="p-2"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="p-2"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      onClick={() => setActiveCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      {category.label}
                      <Badge variant="secondary" className="ml-1">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Applications Grid/List */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-16 h-16 mx-auto mb-4" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Không tìm thấy ứng dụng
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Thử thay đổi từ khóa tìm kiếm hoặc danh mục
                    </p>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${
                    viewMode === "grid" 
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                      : "grid-cols-1"
                  }`}>
                    {filteredApplications.map((app) => (
                      <ApplicationCard
                        key={app.id}
                        app={app}
                        isFavorited={favorites.includes(app.id)}
                        onToggleFavorite={handleToggleFavorite}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SoftwareApplication;
