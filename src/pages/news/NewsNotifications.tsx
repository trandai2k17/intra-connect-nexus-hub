import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  BellRing,
  Mail,
  MessageSquare,
  Settings,
  Check,
  X
} from 'lucide-react';

export default function NewsNotifications() {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Họp team hàng tuần',
      message: 'Cuộc họp team sẽ bắt đầu trong 15 phút tại phòng họp A',
      type: 'meeting',
      time: '5 phút trước',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống đã được cập nhật thành công. Vui lòng đăng nhập lại để sử dụng',
      type: 'system',
      time: '1 giờ trước',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Thông báo mới từ HR',
      message: 'Có thông báo mới về chính sách nghỉ phép. Xem chi tiết trong phần thông báo',
      type: 'announcement',
      time: '2 giờ trước',
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      title: 'Email quan trọng',
      message: 'Bạn có 3 email chưa đọc từ khách hàng VIP',
      type: 'email',
      time: '3 giờ trước',
      isRead: true,
      priority: 'high'
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    meetingReminders: true,
    systemUpdates: false,
    announcements: true
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <BellRing className="w-5 h-5 text-blue-600" />;
      case 'system':
        return <Settings className="w-5 h-5 text-purple-600" />;
      case 'announcement':
        return <MessageSquare className="w-5 h-5 text-orange-600" />;
      case 'email':
        return <Mail className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/10';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
      case 'low':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/10';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/10';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Bell className="w-8 h-8 text-yellow-600" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Quản lý thông tin và cài đặt thông báo
            </p>
          </div>
          <Button onClick={markAllAsRead} variant="outline">
            Mark All as Read
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellRing className="w-5 h-5 text-blue-600" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No notifications
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border-l-4 transition-all duration-200 ${
                        getPriorityColor(notification.priority)
                      } ${notification.isRead ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <h4 className={`font-medium mb-1 ${
                              notification.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                              className="p-2"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Nhận thông báo qua email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Thông báo đẩy trên trình duyệt
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Lịch họp</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Nhắc nhở cuộc họp
                    </p>
                  </div>
                  <Switch
                    checked={settings.meetingReminders}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, meetingReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Cập nhật hệ thống</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Thông báo bảo trì, cập nhật
                    </p>
                  </div>
                  <Switch
                    checked={settings.systemUpdates}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, systemUpdates: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Thông báo chung</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Thông báo từ công ty
                    </p>
                  </div>
                  <Switch
                    checked={settings.announcements}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, announcements: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tổng thông báo</span>
                  <Badge variant="secondary">{notifications.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Chưa đọc</span>
                  <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Đã đọc</span>
                  <Badge variant="outline">{notifications.length - unreadCount}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}