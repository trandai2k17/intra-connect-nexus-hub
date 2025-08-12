import { FileText, Download, Eye, Star, File, FileSpreadsheet, FileImage } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const TopDocuments = () => {
  const documents = [
    {
      id: 1,
      title: "Quy trình onboarding nhân viên mới 2024",
      type: "pdf",
      size: "2.4 MB",
      views: 1247,
      downloads: 89,
      tags: ["HR", "Quy trình", "2024"],
      updatedAt: "2024-01-15",
      isFavorite: true
    },
    {
      id: 2,
      title: "Mẫu đơn xin nghỉ phép",
      type: "doc",
      size: "156 KB",
      views: 956,
      downloads: 234,
      tags: ["Biểu mẫu", "HR"],
      updatedAt: "2024-01-10",
      isFavorite: false
    },
    {
      id: 3,
      title: "Hướng dẫn sử dụng hệ thống ERP",
      type: "pdf",
      size: "5.2 MB",
      views: 834,
      downloads: 156,
      tags: ["ERP", "Hướng dẫn", "IT"],
      updatedAt: "2024-01-12",
      isFavorite: true
    },
    {
      id: 4,
      title: "Chính sách bảo mật thông tin",
      type: "pdf",
      size: "1.8 MB",
      views: 723,
      downloads: 45,
      tags: ["Bảo mật", "Chính sách"],
      updatedAt: "2024-01-08",
      isFavorite: false
    },
    {
      id: 5,
      title: "Template báo cáo tháng",
      type: "xlsx",
      size: "890 KB",
      views: 567,
      downloads: 123,
      tags: ["Template", "Báo cáo"],
      updatedAt: "2024-01-14",
      isFavorite: false
    },
    {
      id: 6,
      title: "Sơ đồ tổ chức công ty 2024",
      type: "png",
      size: "645 KB",
      views: 445,
      downloads: 67,
      tags: ["Tổ chức", "Sơ đồ"],
      updatedAt: "2024-01-09",
      isFavorite: true
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="h-4 w-4 text-red-500" />;
      case "doc": case "docx": return <FileText className="h-4 w-4 text-blue-500" />;
      case "xlsx": case "xls": return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
      case "png": case "jpg": case "jpeg": return <FileImage className="h-4 w-4 text-purple-500" />;
      default: return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTagColor = (tag: string) => {
    const colors = {
      "HR": "bg-blue-500/10 text-blue-700 dark:text-blue-300",
      "Quy trình": "bg-green-500/10 text-green-700 dark:text-green-300",
      "2024": "bg-purple-500/10 text-purple-700 dark:text-purple-300",
      "Biểu mẫu": "bg-orange-500/10 text-orange-700 dark:text-orange-300",
      "ERP": "bg-red-500/10 text-red-700 dark:text-red-300",
      "Hướng dẫn": "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
      "IT": "bg-gray-500/10 text-gray-700 dark:text-gray-300",
      "Bảo mật": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
      "Chính sách": "bg-pink-500/10 text-pink-700 dark:text-pink-300",
      "Template": "bg-teal-500/10 text-teal-700 dark:text-teal-300",
      "Báo cáo": "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
    };
    return colors[tag as keyof typeof colors] || "bg-gray-500/10 text-gray-700 dark:text-gray-300";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Tài liệu hot
          </CardTitle>
          <Button variant="outline" size="sm">
            Xem tất cả
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {documents.slice(0, 6).map((doc, index) => (
          <div
            key={doc.id}
            className="group p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border/40"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getFileIcon(doc.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {doc.title}
                  </h4>
                  {doc.isFavorite && (
                    <Star className="h-3 w-3 text-yellow-500 fill-current flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {doc.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className={`text-xs px-2 py-0.5 ${getTagColor(tag)}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {doc.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{doc.tags.length - 2}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span>{doc.size}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {doc.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {doc.downloads}
                    </span>
                  </div>
                  <span>{new Date(doc.updatedAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};