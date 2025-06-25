import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { CompactApplicationCard } from "@/components/application/CompactApplicationCard";
import { applications, companyWebPages } from "@/components/home/applicationData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List, Eye, EyeOff } from "lucide-react";

const SoftwareApplication = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([1, 4, 6, 7]);

  // Normalize data structure
  const normalizedApplications = applications.map(app => ({
    ...app,
    id: typeof app.id === 'string' ? parseInt(app.id) : app.id,
    type: app.type || 'desktop',
    isNew: app.isNew || false,
    departments: app.departments || ['all']
  }));

  const normalizedWebPages = companyWebPages.map(page => ({
    ...page,
    id: typeof page.id === 'string' ? parseInt(page.id) : page.id,
    type: 'web',
    isNew: false,
    departments: ['all'],
    status: 'online',
    users: 0,
    rating: 0,
    lastUpdated: 'N/A',
    badge: 'info'
  }));

  const allApplications = [...normalizedApplications, ...normalizedWebPages];

  const filteredApplications = allApplications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === "all") return matchesSearch;
    if (activeCategory === "software") return matchesSearch && normalizedApplications.some(a => a.id === app.id);
    if (activeCategory === "webpages") return matchesSearch && normalizedWebPages.some(w => w.id === app.id);
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
    { id: "software", label: "Phần mềm", count: normalizedApplications.length },
    { id: "webpages", label: "Trang web", count: normalizedWebPages.length },
    { id: "favorites", label: "Yêu thích", count: favorites.length },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="p-4 space-y-4">
              {/* Compact Header */}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gradient dark:text-white mb-1">
                  Ứng dụng & Phần mềm
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Truy cập nhanh các ứng dụng và trang web
                </p>
              </div>

              {/* Controls - more compact */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-white/30 dark:border-gray-700/30 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 h-8 text-sm"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-1">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(category.id)}
                        className="flex items-center gap-1 h-8 text-xs px-2"
                      >
                        {category.label}
                        <Badge variant="secondary" className="ml-1 text-xs h-4 px-1">
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>

                  {/* View Controls */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant={showPreview ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                      className="h-8 w-8 p-0"
                    >
                      {showPreview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 w-8 p-0"
                    >
                      <Grid className="w-3 h-3" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-8 w-8 p-0"
                    >
                      <List className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Applications Grid - more compact spacing */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-white/30 dark:border-gray-700/30 shadow-lg">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-6">
                    <Search className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                    <h3 className="text-base font-semibold text-gray-600 dark:text-gray-300 mb-1">
                      Không tìm thấy ứng dụng
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Thử thay đổi từ khóa tìm kiếm
                    </p>
                  </div>
                ) : (
                  <div className={`grid gap-3 ${
                    viewMode === "grid" 
                      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8" 
                      : "grid-cols-1 max-w-2xl mx-auto"
                  }`}>
                    {filteredApplications.map((app) => (
                      <CompactApplicationCard
                        key={app.id}
                        app={app}
                        isFavorited={favorites.includes(app.id)}
                        onToggleFavorite={handleToggleFavorite}
                        showPreview={showPreview && app.type === "web"}
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
