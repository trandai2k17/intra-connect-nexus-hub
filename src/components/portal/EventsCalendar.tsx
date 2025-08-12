import { Calendar, Clock, MapPin, Users, Download, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const EventsCalendar = () => {
  const events = [
    {
      id: 1,
      title: "Đào tạo An toàn Lao động Q1",
      type: "training",
      date: "2024-01-25",
      time: "09:00 - 12:00",
      location: "Phòng hội thảo A",
      attendees: 45,
      isRequired: true,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Họp team Marketing tháng 1",
      type: "meeting",
      date: "2024-01-22",
      time: "14:00 - 15:30",
      location: "Phòng họp 201",
      attendees: 8,
      isRequired: false,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Deadline nộp báo cáo Q4",
      type: "deadline",
      date: "2024-01-26",
      time: "17:00",
      location: "Online submission",
      attendees: 0,
      isRequired: true,
      status: "deadline"
    },
    {
      id: 4,
      title: "Workshop Excel nâng cao",
      type: "workshop",
      date: "2024-01-28",
      time: "13:30 - 17:00",
      location: "Phòng máy tính 1",
      attendees: 20,
      isRequired: false,
      status: "upcoming"
    },
    {
      id: 5,
      title: "Sinh nhật công ty - 10 năm",
      type: "celebration",
      date: "2024-02-01",
      time: "18:00 - 21:00",
      location: "Khách sạn Grand Plaza",
      attendees: 150,
      isRequired: false,
      status: "upcoming"
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "training": return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
      case "meeting": return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "deadline": return "bg-red-500/10 text-red-700 dark:text-red-300";
      case "workshop": return "bg-purple-500/10 text-purple-700 dark:text-purple-300";
      case "celebration": return "bg-orange-500/10 text-orange-700 dark:text-orange-300";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
    }
  };

  const getEventTypeLabel = (type: string) => {
    const labels = {
      training: "Đào tạo",
      meeting: "Họp",
      deadline: "Deadline",
      workshop: "Workshop",
      celebration: "Sự kiện"
    };
    return labels[type as keyof typeof labels] || type;
  };

  const isToday = (date: string) => {
    const today = new Date().toDateString();
    const eventDate = new Date(date).toDateString();
    return today === eventDate;
  };

  const isTomorrow = (date: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const eventDate = new Date(date).toDateString();
    return tomorrow.toDateString() === eventDate;
  };

  const getDaysUntil = (date: string) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Lịch sự kiện
          </CardTitle>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3 mr-1" />
              iCal
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="group p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border/40"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                  {event.title}
                </h4>
                <div className="flex gap-1 flex-shrink-0">
                  <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                    {getEventTypeLabel(event.type)}
                  </Badge>
                  {event.isRequired && (
                    <Badge variant="destructive" className="text-xs">
                      Bắt buộc
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {isToday(event.date) ? (
                      <span className="text-primary font-medium">Hôm nay</span>
                    ) : isTomorrow(event.date) ? (
                      <span className="text-orange-600 font-medium">Ngày mai</span>
                    ) : getDaysUntil(event.date) <= 7 ? (
                      <span className="text-yellow-600 font-medium">
                        {getDaysUntil(event.date)} ngày nữa
                      </span>
                    ) : (
                      new Date(event.date).toLocaleDateString('vi-VN')
                    )}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </span>
                  {event.attendees > 0 && (
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.attendees} người
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center pt-2">
          <Button variant="ghost" size="sm" className="text-xs">
            Xem lịch đầy đủ →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};