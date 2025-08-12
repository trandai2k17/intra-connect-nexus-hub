import { FileText, Shield, ClipboardList, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const QuickLinks = () => {
  const quickLinks = [
    {
      title: "Tài liệu",
      description: "Chính sách & Quy trình",
      icon: FileText,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      badge: "24 mới",
      badgeColor: "bg-blue-500"
    },
    {
      title: "Chính sách",
      description: "Quy định nội bộ",
      icon: Shield,
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
      badge: "Cập nhật",
      badgeColor: "bg-green-500"
    },
    {
      title: "Biểu mẫu",
      description: "Đơn từ & Yêu cầu",
      icon: ClipboardList,
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      badge: "12 mới",
      badgeColor: "bg-orange-500"
    },
    {
      title: "Thông báo",
      description: "Tin tức nội bộ",
      icon: Megaphone,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      badge: "3 mới",
      badgeColor: "bg-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 h-80">
      {quickLinks.map((link, index) => (
        <Card 
          key={index} 
          className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden"
        >
          <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center relative">
            <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <link.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{link.title}</h3>
            <p className="text-xs text-muted-foreground">{link.description}</p>
            
            {link.badge && (
              <Badge 
                className={`absolute top-2 right-2 text-white text-xs px-2 py-1 ${link.badgeColor}`}
              >
                {link.badge}
              </Badge>
            )}
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};