import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Clock, RotateCcw, Calendar as CalendarIcon, GripVertical, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface TimeSchedule {
  id: number;
  date: Date;
  type: 'CutOff' | 'Arrival';
  startTime: Date;
  endTime: Date;
  description: string;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
  order: number;
  time?: Date;
}

export function TimeScheduleCard() {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<TimeSchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Mock data initialization
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    const mockSchedules: TimeSchedule[] = [
      {
        id: 21913,
        date: new Date('2025-08-20'),
        type: 'CutOff',
        startTime: new Date('2025-08-20T06:30:00'),
        endTime: new Date('2025-08-20T16:30:00'),
        description: 'Cutoff Time/ Giờ cắt hàng - 14:00',
        createdBy: 'ngocnguyen',
        createdAt: new Date('2025-07-30T11:08:19'),
        isActive: true,
        order: 1,
        time: new Date('1900-01-01T14:00:00')
      },
      {
        id: 21944,
        date: new Date('2025-08-20'),
        type: 'Arrival',
        startTime: new Date('2025-08-20T06:30:00'),
        endTime: new Date('2025-08-20T16:30:00'),
        description: 'Impression arrival/ Dấu răng về - 22:30',
        createdBy: 'ngocnguyen',
        createdAt: new Date('2025-07-30T11:12:12'),
        isActive: true,
        order: 2,
        time: new Date('1900-01-01T22:30:00')
      }
    ];
    setSchedules(mockSchedules);
  };

  const handleReload = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      loadMockData();
      toast({
        title: "Đã tải lại",
        description: "Dữ liệu lịch trình đã được cập nhật."
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải lại dữ liệu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = (id: number) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === id 
        ? { ...schedule, isActive: !schedule.isActive }
        : schedule
    ));
    toast({
      title: "Đã cập nhật",
      description: "Trạng thái hiển thị đã được thay đổi."
    });
  };

  const handleReorder = (scheduleId: number, newOrder: number) => {
    setSchedules(prev => {
      const updated = [...prev];
      const schedule = updated.find(s => s.id === scheduleId);
      if (schedule) {
        schedule.order = newOrder;
      }
      return updated.sort((a, b) => a.order - b.order);
    });
    toast({
      title: "Đã sắp xếp",
      description: "Thứ tự hiển thị đã được cập nhật."
    });
  };

  const filteredSchedules = schedules.filter(schedule => {
    return format(schedule.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CutOff':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'Arrival':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Quản lý lịch trình
            </CardTitle>
            <CardDescription>
              Quản lý thời gian cắt hàng và nhận dấu răng
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReload}
            disabled={isLoading}
          >
            <RotateCcw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PPP', { locale: vi }) : 'Chọn ngày'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Schedule List */}
        <div className="space-y-3 max-h-96 overflow-auto">
          {filteredSchedules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Không có lịch trình cho ngày này</p>
            </div>
          ) : (
            filteredSchedules
              .sort((a, b) => a.order - b.order)
              .map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getTypeColor(schedule.type)}>
                        {schedule.type}
                      </Badge>
                      <span className="text-sm font-medium">
                        {schedule.time && format(schedule.time, 'HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {schedule.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Bởi: {schedule.createdBy}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        #{schedule.order}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(schedule.id)}
                    >
                      {schedule.isActive ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                    
                    <Input
                      type="number"
                      min="1"
                      value={schedule.order}
                      onChange={(e) => handleReorder(schedule.id, parseInt(e.target.value))}
                      className="w-16 h-8"
                    />
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="pt-3 border-t">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-medium">{filteredSchedules.length}</div>
              <div className="text-muted-foreground">Tổng số</div>
            </div>
            <div>
              <div className="font-medium text-green-600">
                {filteredSchedules.filter(s => s.isActive).length}
              </div>
              <div className="text-muted-foreground">Hiển thị</div>
            </div>
            <div>
              <div className="font-medium text-gray-500">
                {filteredSchedules.filter(s => !s.isActive).length}
              </div>
              <div className="text-muted-foreground">Ẩn</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}