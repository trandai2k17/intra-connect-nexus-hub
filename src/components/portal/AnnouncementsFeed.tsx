import { useState } from "react";
import { Pin, Clock, Filter, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AnnouncementsFeedProps {
  selectedDepartment: string;
}

export const AnnouncementsFeed = ({ selectedDepartment }: AnnouncementsFeedProps) => {
  const [filter, setFilter] = useState("all");

  const announcements = [
    {
      id: 1,
      title: "Thông báo nghỉ lễ Tết Nguyên đán 2024",
      content: "Công ty thông báo lịch nghỉ Tết Nguyên đán từ ngày 08/02 đến 17/02/2024. Toàn thể CBNV cần hoàn thành công việc trước...",
      department: "hr",
      priority: "high",
      isPinned: true,
      isRequired: true,
      readCount: 245,
      publishedAt: "2024-01-15",
      author: "Phòng Nhân sự"
    },
    {
      id: 2,
      title: "Cập nhật hệ thống ERP - Bảo trì định kỳ",
      content: "Hệ thống ERP sẽ được bảo trì vào 22:00 ngày 20/01/2024. Trong thời gian này, một số tính năng có thể bị gián đoạn...",
      department: "it",
      priority: "medium",
      isPinned: false,
      isRequired: false,
      readCount: 89,
      publishedAt: "2024-01-18",
      author: "Phòng IT"
    },
    {
      id: 3,
      title: "Đào tạo An toàn Lao động Q1/2024",
      content: "Khóa đào tạo bắt buộc cho toàn thể nhân viên về An toàn Lao động sẽ được tổ chức trong tháng 3/2024. Vui lòng đăng ký...",
      department: "hr",
      priority: "high",
      isPinned: true,
      isRequired: true,
      readCount: 156,
      publishedAt: "2024-01-16",
      author: "Phòng Nhân sự"
    },
    {
      id: 4,
      title: "Thay đổi quy trình phê duyệt đơn hàng",
      content: "Từ ngày 01/02/2024, quy trình phê duyệt đơn hàng sẽ có một số thay đổi nhằm tối ưu hóa hiệu quả làm việc...",
      department: "operations",
      priority: "medium",
      isPinned: false,
      isRequired: false,
      readCount: 78,
      publishedAt: "2024-01-17",
      author: "Phòng Vận hành"
    }
  ];

  const filteredAnnouncements = announcements
    .filter(ann => selectedDepartment === "all" || ann.department === selectedDepartment)
    .filter(ann => {
      if (filter === "pinned") return ann.isPinned;
      if (filter === "required") return ann.isRequired;
      return true;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      default: return "bg-green-500";
    }
  };

  const getDepartmentLabel = (dept: string) => {
    const labels = {
      hr: "Nhân sự",
      it: "IT",
      finance: "Tài chính",
      operations: "Vận hành"
    };
    return labels[dept as keyof typeof labels] || dept;
  };

  return (
    <Card className="h-96">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            Thông báo nội bộ
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              Tất cả
            </Button>
            <Button
              variant={filter === "pinned" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pinned")}
            >
              <Pin className="h-3 w-3 mr-1" />
              Ghim
            </Button>
            <Button
              variant={filter === "required" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("required")}
            >
              Bắt buộc
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-72 overflow-y-auto">
        {filteredAnnouncements.map((announcement, index) => (
          <div key={announcement.id}>
            <div className="group p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-1 h-16 rounded ${getPriorityColor(announcement.priority)} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {announcement.isPinned && (
                      <Pin className="h-3 w-3 text-primary" />
                    )}
                    <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {announcement.title}
                    </h4>
                    {announcement.isRequired && (
                      <Badge variant="destructive" className="text-xs">Bắt buộc</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{announcement.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(announcement.publishedAt).toLocaleDateString('vi-VN')}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {announcement.readCount}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {getDepartmentLabel(announcement.department)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            {index < filteredAnnouncements.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const Megaphone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m4 6V9a5 5 0 00-10 0v1M7 14a3 3 0 003-3h4a3 3 0 003 3v1a1 1 0 01-1 1H8a1 1 0 01-1-1v-1z" />
  </svg>
);