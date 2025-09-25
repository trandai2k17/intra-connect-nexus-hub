import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  FileText,
  Users,
  Bell
} from 'lucide-react';

export default function NewsCenter() {
  const { t } = useLanguage();

  const newsStats = [
    {
      title: 'Thông báo mới',
      count: 12,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      title: 'Tin tức',
      count: 8,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Sự kiện sắp tới',
      count: 5,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Nội quy mới',
      count: 3,
      icon: FileText,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    }
  ];

  const recentPosts = [
    {
      title: 'Thông báo nghỉ lễ Quốc khánh',
      type: 'Thông báo',
      department: 'Nhân sự',
      date: '2024-09-02',
      priority: 'high'
    },
    {
      title: 'Cập nhật quy định làm việc từ xa',
      type: 'Nội quy',
      department: 'IT',
      date: '2024-09-01',
      priority: 'medium'
    },
    {
      title: 'Sự kiện team building tháng 9',
      type: 'Sự kiện',
      department: 'Nhân sự',
      date: '2024-08-30',
      priority: 'low'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              News Center
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Quản lý tin tức, thông báo và sự kiện công ty
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Bell className="w-4 h-4 mr-2" />
            Tạo thông báo mới
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.count}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Bài viết gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Badge variant="outline" className="text-xs">
                          {post.type}
                        </Badge>
                        <span>•</span>
                        <span>{post.department}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={post.priority === 'high' ? 'destructive' : post.priority === 'medium' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {post.priority === 'high' ? 'Cao' : post.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Activity */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Hoạt động phòng ban
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hr" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="hr">Nhân sự</TabsTrigger>
                  <TabsTrigger value="it">IT</TabsTrigger>
                  <TabsTrigger value="finance">Tài chính</TabsTrigger>
                </TabsList>
                <TabsContent value="hr" className="mt-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                      <p className="font-medium text-orange-800 dark:text-orange-200">
                        Cập nhật chính sách nghỉ phép
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-300">
                        2 giờ trước
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <p className="font-medium text-blue-800 dark:text-blue-200">
                        Thông báo tuyển dụng mới
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        5 giờ trước
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="it" className="mt-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <p className="font-medium text-green-800 dark:text-green-200">
                        Cập nhật hệ thống bảo mật
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        1 giờ trước
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                      <p className="font-medium text-purple-800 dark:text-purple-200">
                        Hướng dẫn sử dụng phần mềm mới
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-300">
                        3 giờ trước
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="finance" className="mt-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <p className="font-medium text-red-800 dark:text-red-200">
                        Quy định thanh toán mới
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-300">
                        4 giờ trước
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">
                        Báo cáo tài chính Q3
                      </p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-300">
                        6 giờ trước
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}