import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Monitor, 
  Play, 
  Settings, 
  Maximize, 
  Eye,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface Dashboard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive';
  lastUpdated: string;
  url: string;
  category: 'performance' | 'schedule' | 'alerts' | 'general';
}

const dashboards: Dashboard[] = [
  {
    id: 'bonus-summary',
    name: 'Bonus Summary',
    description: 'Hiển thị thống kê bonus và hiệu suất nhân viên',
    icon: <TrendingUp className="w-6 h-6" />,
    status: 'active',
    lastUpdated: '5 phút trước',
    url: '/tv/bonus-summary',
    category: 'performance'
  },
  {
    id: 'late-cases',
    name: 'Late Cases',
    description: 'Theo dõi các case bị trễ theo thời gian',
    icon: <AlertTriangle className="w-6 h-6" />,
    status: 'active', 
    lastUpdated: '2 phút trước',
    url: '/tv/late-cases',
    category: 'alerts'
  },
  {
    id: 'prodline-summary',
    name: 'Prodline Summary',
    description: 'Tổng quan dây chuyền sản xuất',
    icon: <BarChart3 className="w-6 h-6" />,
    status: 'active',
    lastUpdated: '1 phút trước', 
    url: '/tv/prodline',
    category: 'performance'
  },
  {
    id: 'shift-schedule',
    name: 'Shift Schedule',
    description: 'Lịch ca làm việc và thời gian',
    icon: <Calendar className="w-6 h-6" />,
    status: 'inactive',
    lastUpdated: '10 phút trước',
    url: '/tv/schedule',
    category: 'schedule'
  },
  {
    id: 'team-status',
    name: 'Team Status',
    description: 'Trạng thái và hiệu suất từng team',
    icon: <Users className="w-6 h-6" />,
    status: 'active',
    lastUpdated: '3 phút trước',
    url: '/tv/team-status',
    category: 'performance'
  },
  {
    id: 'real-time-clock',
    name: 'Real-time Clock',
    description: 'Đồng hồ thời gian thực và thông báo',
    icon: <Clock className="w-6 h-6" />,
    status: 'active',
    lastUpdated: 'Trực tiếp',
    url: '/tv/clock',
    category: 'general'
  }
];

const categories = [
  { value: 'all', label: 'Tất cả', color: 'bg-gray-500' },
  { value: 'performance', label: 'Hiệu suất', color: 'bg-green-500' },
  { value: 'schedule', label: 'Lịch trình', color: 'bg-blue-500' },
  { value: 'alerts', label: 'Cảnh báo', color: 'bg-red-500' },
  { value: 'general', label: 'Tổng hợp', color: 'bg-purple-500' }
];

export default function TVDisplay() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredDashboards = selectedCategory === 'all' 
    ? dashboards 
    : dashboards.filter(d => d.category === selectedCategory);

  const handlePreview = (dashboard: Dashboard) => {
    window.open(dashboard.url, '_blank', 'width=1920,height=1080,fullscreen=yes');
  };

  const handleFullscreen = (dashboard: Dashboard) => {
    const newWindow = window.open(dashboard.url, '_blank', 'fullscreen=yes');
    if (newWindow) {
      newWindow.focus();
      // Request fullscreen
      setTimeout(() => {
        if (newWindow.document.documentElement.requestFullscreen) {
          newWindow.document.documentElement.requestFullscreen();
        }
      }, 1000);
    }
  };

  const handleToggleStatus = (dashboardId: string) => {
    // Logic to toggle dashboard status
    toast({
      title: "Thành công",
      description: "Đã cập nhật trạng thái dashboard"
    });
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || 'bg-gray-500';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">TV Display Management</h1>
          <p className="text-muted-foreground">
            Quản lý và hiển thị các dashboard lên màn hình TV
          </p>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90">
          <Settings className="w-4 h-4 mr-2" />
          Cài đặt TV
        </Button>
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Danh mục Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDashboards.map((dashboard) => (
          <Card 
            key={dashboard.id} 
            className={`transition-all duration-200 hover:shadow-lg cursor-pointer ${
              selectedDashboard === dashboard.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedDashboard(dashboard.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {dashboard.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                    <Badge 
                      variant={dashboard.status === 'active' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {dashboard.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                    </Badge>
                  </div>
                </div>
                <Badge variant="outline" className={`${getCategoryColor(dashboard.category)} text-white border-0`}>
                  {categories.find(c => c.value === dashboard.category)?.label}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {dashboard.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>Cập nhật: {dashboard.lastUpdated}</span>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(dashboard);
                  }}
                  className="flex-1"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Xem trước
                </Button>
                
                <Button 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullscreen(dashboard);
                  }}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Maximize className="w-3 h-3 mr-1" />
                  TV Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hành động nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Play className="w-5 h-5" />
              Chạy tất cả
            </Button>
            
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Monitor className="w-5 h-5" />
              Cài đặt màn hình
            </Button>
            
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Settings className="w-5 h-5" />
              Cấu hình tự động
            </Button>
            
            <Button variant="outline" className="h-16 flex-col gap-2">
              <BarChart3 className="w-5 h-5" />
              Báo cáo sử dụng
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}