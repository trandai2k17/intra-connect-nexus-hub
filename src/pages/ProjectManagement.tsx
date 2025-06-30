
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Calendar, 
  Users, 
  GitBranch, 
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

const ProjectManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "ERP System Upgrade",
      description: "Nâng cấp hệ thống ERP toàn công ty",
      status: "in-progress",
      priority: "high",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      progress: 65,
      developers: ["Nguyễn A", "Trần B", "Lê C"],
      requester: "Phòng Tài chính",
      manager: "Trần Văn X",
      director: "Nguyễn Thị Y",
      totalStories: 45,
      completedStories: 29,
      totalFeedback: 23,
      departments: ["Tài chính", "Kế toán", "Nhân sự"],
      isKaizen: false
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Phát triển ứng dụng mobile cho nhân viên",
      status: "planning",
      priority: "medium",
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      progress: 25,
      developers: ["Phạm D", "Hoàng E"],
      requester: "Phòng Nhân sự",
      manager: "Lê Văn Z",
      director: "Nguyễn Thị Y",
      totalStories: 32,
      completedStories: 8,
      totalFeedback: 15,
      departments: ["Nhân sự", "IT", "Quản lý"],
      isKaizen: true
    },
    {
      id: 3,
      name: "Data Analytics Platform",
      description: "Xây dựng nền tảng phân tích dữ liệu",
      status: "completed",
      priority: "high",
      startDate: "2023-10-01",
      endDate: "2024-01-01",
      progress: 100,
      developers: ["Vũ F", "Đỗ G", "Bùi H"],
      requester: "Ban Giám đốc",
      manager: "Trần Văn X",
      director: "Nguyễn Thị Y",
      totalStories: 28,
      completedStories: 28,
      totalFeedback: 35,
      departments: ["Tài chính", "Marketing", "Sản xuất"],
      isKaizen: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "on-hold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "planning":
        return <AlertCircle className="w-4 h-4" />;
      case "on-hold":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = !searchTerm || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gradient dark:text-white">
                    Quản lý Project
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Theo dõi và quản lý các dự án phát triển phần mềm
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo Project Mới
                </Button>
              </div>

              {/* Controls */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-700/30 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm project..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="flex gap-2">
                    {[
                      { id: "all", label: "Tất cả" },
                      { id: "planning", label: "Lên kế hoạch" },
                      { id: "in-progress", label: "Đang thực hiện" },
                      { id: "completed", label: "Hoàn thành" },
                      { id: "on-hold", label: "Tạm dừng" }
                    ].map((status) => (
                      <Button
                        key={status.id}
                        variant={statusFilter === status.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter(status.id)}
                        className="text-xs"
                      >
                        {status.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/95 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            {project.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        {project.isKaizen && (
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            Kaizen
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Badge className={`${getStatusColor(project.status)} text-xs flex items-center gap-1`}>
                          {getStatusIcon(project.status)}
                          {project.status === "completed" ? "Hoàn thành" : 
                           project.status === "in-progress" ? "Đang thực hiện" :
                           project.status === "planning" ? "Lên kế hoạch" : "Tạm dừng"}
                        </Badge>
                        <Badge className={`${getPriorityColor(project.priority)} text-xs`}>
                          {project.priority === "high" ? "Cao" : 
                           project.priority === "medium" ? "Trung bình" : "Thấp"}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 dark:text-gray-300">Tiến độ</span>
                          <span className="font-medium text-gray-800 dark:text-white">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>{project.startDate} - {project.endDate}</span>
                      </div>

                      {/* Team */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Users className="w-4 h-4" />
                        <span>{project.developers.length} developers</span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                          <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400">
                            <GitBranch className="w-3 h-3" />
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {project.completedStories}/{project.totalStories} Stories
                          </div>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                          <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400">
                            <MessageSquare className="w-3 h-3" />
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {project.totalFeedback} Feedback
                          </div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
                          <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400">
                            <TrendingUp className="w-3 h-3" />
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {project.departments.length} Phòng ban
                          </div>
                        </div>
                      </div>

                      {/* Hierarchy */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <div><span className="font-medium">Requester:</span> {project.requester}</div>
                        <div><span className="font-medium">IT Manager:</span> {project.manager}</div>
                        <div><span className="font-medium">IT Director:</span> {project.director}</div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                          Xem chi tiết
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Báo cáo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    Không tìm thấy project
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProjectManagement;
