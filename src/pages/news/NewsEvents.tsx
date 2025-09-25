import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  MapPin,
  Users,
  Clock,
  Plus,
  Filter
} from 'lucide-react';

export default function NewsEvents() {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      id: 1,
      title: 'Team Building Q3 2024',
      description: 'Hoạt động team building quý 3 tại resort Sầm Sơn. Tham gia các hoạt động vui chơi, gắn kết đồng nghiệp.',
      date: '2024-09-15',
      time: '08:00 - 18:00',
      location: 'Resort Sầm Sơn, Thanh Hóa',
      attendees: 85,
      maxAttendees: 100,
      status: 'upcoming',
      organizer: 'Phòng Nhân sự',
      category: 'Team Building'
    },
    {
      id: 2,
      title: 'Hội thảo Công nghệ AI 2024',
      description: 'Khám phá xu hướng AI mới nhất và ứng dụng trong doanh nghiệp. Diễn giả từ các công ty công nghệ hàng đầu.',
      date: '2024-09-20',
      time: '09:00 - 17:00',
      location: 'Trung tâm hội nghị Lotte, Hà Nội',
      attendees: 45,
      maxAttendees: 50,
      status: 'upcoming',
      organizer: 'Phòng IT',
      category: 'Hội thảo'
    },
    {
      id: 3,
      title: 'Đào tạo kỹ năng Leadership',
      description: 'Chương trình đào tạo kỹ năng lãnh đạo dành cho quản lý cấp trung. Kéo dài 2 ngày với nhiều bài tập thực hành.',
      date: '2024-09-25',
      time: '08:30 - 17:30',
      location: 'Phòng đào tạo tầng 5',
      attendees: 20,
      maxAttendees: 25,
      status: 'upcoming',
      organizer: 'Phòng Đào tạo',
      category: 'Đào tạo'
    },
    {
      id: 4,
      title: 'Họp tổng kết tháng 8',
      description: 'Báo cáo kết quả kinh doanh tháng 8 và kế hoạch tháng 9. Tất cả nhân viên bắt buộc tham dự.',
      date: '2024-08-30',
      time: '14:00 - 16:00',
      location: 'Hội trường tầng 1',
      attendees: 120,
      maxAttendees: 120,
      status: 'completed',
      organizer: 'Ban Giám đốc',
      category: 'Họp'
    }
  ];

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const completedEvents = events.filter(event => event.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Team Building':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'Hội thảo':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'Đào tạo':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Họp':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Events
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Quản lý và theo dõi các sự kiện, hoạt động của công ty
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Upcoming Events */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                  Upcoming Events ({upcomingEvents.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800/30 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {event.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          Sắp diễn ra
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Tổ chức bởi: <span className="font-medium">{event.organizer}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {event.attendees < event.maxAttendees && (
                          <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                            Register
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Progress bar for attendees */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Registration Count</span>
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Completed Events */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-green-600" />
                  Completed Events ({completedEvents.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} người tham dự</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        Đã hoàn thành
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}