import { CheckCircle, Clock, AlertTriangle, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const MyTasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Phê duyệt đơn nghỉ phép - Nguyễn Văn A",
      type: "approval",
      priority: "high",
      dueDate: "2024-01-20",
      status: "pending",
      department: "HR"
    },
    {
      id: 2,
      title: "Xử lý ticket #2024-001 - Lỗi hệ thống ERP",
      type: "ticket",
      priority: "high",
      dueDate: "2024-01-19",
      status: "in_progress",
      department: "IT"
    },
    {
      id: 3,
      title: "Duyệt timesheet tuần 3 - Team Marketing",
      type: "timesheet",
      priority: "medium",
      dueDate: "2024-01-22",
      status: "pending",
      department: "Finance"
    },
    {
      id: 4,
      title: "Phê duyệt mua sắm thiết bị văn phòng",
      type: "purchase",
      priority: "medium",
      dueDate: "2024-01-25",
      status: "review",
      department: "Admin"
    },
    {
      id: 5,
      title: "Xác nhận đào tạo nhân viên mới",
      type: "training",
      priority: "low",
      dueDate: "2024-01-30",
      status: "pending",
      department: "HR"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-500/10";
      case "in_progress": return "text-blue-600 bg-blue-500/10";
      case "review": return "text-orange-600 bg-orange-500/10";
      case "completed": return "text-green-600 bg-green-500/10";
      default: return "text-gray-600 bg-gray-500/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-3 w-3" />;
      case "in_progress": return <AlertTriangle className="h-3 w-3" />;
      case "review": return <FileText className="h-3 w-3" />;
      case "completed": return <CheckCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: "Chờ xử lý",
      in_progress: "Đang xử lý",
      review: "Đang xem xét",
      completed: "Hoàn thành"
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-500";
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="h-96">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Công việc của tôi
            <Badge variant="secondary" className="text-xs">
              {tasks.filter(t => t.status !== "completed").length}
            </Badge>
          </CardTitle>
          <Button variant="outline" size="sm">
            Xem tất cả
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-72 overflow-y-auto">
        {tasks.slice(0, 5).map((task, index) => (
          <div key={task.id}>
            <div className={`group p-3 rounded-lg border-l-2 ${getPriorityColor(task.priority)} hover:bg-muted/50 cursor-pointer transition-colors`}>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {task.title}
                  </h4>
                  <Badge className={`text-xs ${getStatusColor(task.status)} shrink-0`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(task.status)}
                      {getStatusLabel(task.status)}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="bg-muted px-2 py-1 rounded text-xs font-medium">
                    {task.department}
                  </span>
                  <div className="flex items-center gap-2">
                    {isOverdue(task.dueDate) ? (
                      <Badge variant="destructive" className="text-xs">
                        Quá hạn {Math.abs(getDaysUntilDue(task.dueDate))} ngày
                      </Badge>
                    ) : getDaysUntilDue(task.dueDate) <= 1 ? (
                      <Badge variant="destructive" className="text-xs">
                        Đến hạn hôm nay
                      </Badge>
                    ) : (
                      <span>Còn {getDaysUntilDue(task.dueDate)} ngày</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {index < tasks.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};