import { Plus, Bug, Calendar, FileText, Phone, Users, Settings, Headphones } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
  const actions = [
    {
      title: "Tạo yêu cầu mới",
      description: "Đơn từ, mua sắm, bảo trì...",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600",
      shortcut: "Ctrl+N"
    },
    {
      title: "Báo cáo sự cố IT",
      description: "Lỗi hệ thống, mạng, phần mềm",
      icon: Bug,
      color: "bg-red-500 hover:bg-red-600",
      shortcut: "F1"
    },
    {
      title: "Đặt phòng họp",
      description: "Lịch họp, sự kiện nội bộ",
      icon: Calendar,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Tạo tài liệu",
      description: "Báo cáo, hướng dẫn, quy trình",
      icon: FileText,
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Danh bạ nội bộ",
      description: "Liên hệ nhân viên, phòng ban",
      icon: Phone,
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Quản lý nhóm",
      description: "Phân quyền, thành viên dự án",
      icon: Users,
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      title: "Cài đặt tài khoản",
      description: "Thông tin cá nhân, bảo mật",
      icon: Settings,
      color: "bg-gray-500 hover:bg-gray-600"
    },
    {
      title: "Hỗ trợ kỹ thuật",
      description: "Chat trực tiếp với IT",
      icon: Headphones,
      color: "bg-teal-500 hover:bg-teal-600"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Thao tác nhanh
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start h-auto p-3 group hover:bg-muted/80"
          >
            <div className="flex items-center gap-3 w-full">
              <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
              {action.shortcut && (
                <div className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
                  {action.shortcut}
                </div>
              )}
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};