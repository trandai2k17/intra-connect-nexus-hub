import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Search, 
  Filter,
  Calendar,
  User,
  Pin,
  Eye
} from 'lucide-react';

export default function NewsAnnouncements() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const announcements = [
    {
      id: 1,
      title: 'Thông báo nghỉ lễ Quốc khánh 2/9',
      content: 'Công ty thông báo lịch nghỉ lễ Quốc khánh từ ngày 2/9 đến 4/9. Toàn bộ nhân viên nghỉ phép có lương...',
      department: 'Nhân sự',
      author: 'Nguyễn Văn A',
      createdAt: '2024-09-02',
      priority: 'high',
      isPinned: true,
      views: 245
    },
    {
      id: 2,
      title: 'Cập nhật quy định chấm công',
      content: 'Từ ngày 1/9, công ty áp dụng quy định chấm công mới. Nhân viên cần chấm công trước 8:30 sáng...',
      department: 'Hành chính',
      author: 'Trần Thị B',
      createdAt: '2024-09-01',
      priority: 'medium',
      isPinned: false,
      views: 189
    },
    {
      id: 3,
      title: 'Thông báo bảo trì hệ thống',
      content: 'Hệ thống sẽ được bảo trì từ 22:00 ngày 5/9 đến 2:00 ngày 6/9. Trong thời gian này, một số dịch vụ có thể bị gián đoạn...',
      department: 'IT',
      author: 'Lê Văn C',
      createdAt: '2024-08-30',
      priority: 'high',
      isPinned: true,
      views: 156
    },
    {
      id: 4,
      title: 'Hướng dẫn sử dụng phần mềm quản lý mới',
      content: 'IT phòng triển khai phần mềm quản lý mới. Tài liệu hướng dẫn đã được gửi qua email...',
      department: 'IT',
      author: 'Phạm Thị D',
      createdAt: '2024-08-28',
      priority: 'low',
      isPinned: false,
      views: 98
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Cao';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Thấp';
      default:
        return 'Bình thường';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Thông báo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Quản lý và xem các thông báo nội bộ
            </p>
          </div>
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            Tạo thông báo
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm thông báo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-700"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {announcement.isPinned && (
                      <Pin className="w-4 h-4 text-orange-600" />
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {announcement.title}
                    </h3>
                  </div>
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {getPriorityText(announcement.priority)}
                  </Badge>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {announcement.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{announcement.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{announcement.createdAt}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {announcement.department}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{announcement.views}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Xem chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Không tìm thấy thông báo
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}