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

        {/* Schedule Timeline */}
        <div className="space-y-4">
          {filteredSchedules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Không có lịch trình cho ngày này</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Timeline Header */}
              <div className="flex items-center justify-between text-sm text-muted-foreground border-b pb-2">
                <span>Lịch trình ngày {format(selectedDate, 'dd/MM/yyyy')}</span>
                <span>{filteredSchedules.length} sự kiện</span>
              </div>

              {/* Timeline Items */}
              {filteredSchedules
                .sort((a, b) => {
                  if (!a.time || !b.time) return 0;
                  return a.time.getTime() - b.time.getTime();
                })
                .map((schedule, index) => (
                  <div key={schedule.id} className="relative">
                    {/* Timeline connector */}
                    {index < filteredSchedules.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-8 bg-border" />
                    )}
                    
                    <div className="flex items-start gap-4 group">
                      {/* Timeline dot & time */}
                      <div className="flex flex-col items-center min-w-0">
                        <div className={cn(
                          "w-3 h-3 rounded-full border-2 bg-background",
                          schedule.isActive ? "border-primary" : "border-muted-foreground"
                        )} />
                        <div className="text-xs font-mono mt-1 text-center">
                          {schedule.time && format(schedule.time, 'HH:mm')}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-4 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className={getTypeColor(schedule.type)}>
                                {schedule.type === 'CutOff' ? 'Cắt hàng' : 'Nhận dấu'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                #{schedule.order}
                              </span>
                            </div>
                            
                            <h4 className="font-medium text-sm leading-tight mb-1">
                              {schedule.type === 'CutOff' 
                                ? `Cutoff Time - ${schedule.time && format(schedule.time, 'HH:mm')}`
                                : `Impression Arrival - ${schedule.time && format(schedule.time, 'HH:mm')}`
                              }
                            </h4>
                            
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {schedule.description.split(' - ')[1] || schedule.description}
                            </p>
                            
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span>ID: {schedule.id}</span>
                              <span>Bởi: {schedule.createdBy}</span>
                              <span>{format(schedule.createdAt, 'dd/MM HH:mm')}</span>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleActive(schedule.id)}
                              className="h-8 w-8 p-0"
                            >
                              {schedule.isActive ? (
                                <Eye className="w-3 h-3 text-green-600" />
                              ) : (
                                <EyeOff className="w-3 h-3 text-muted-foreground" />
                              )}
                            </Button>
                            
                            <div className="flex items-center gap-1">
                              <GripVertical className="w-3 h-3 text-muted-foreground cursor-grab" />
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                value={schedule.order}
                                onChange={(e) => handleReorder(schedule.id, parseInt(e.target.value) || 1)}
                                className="w-12 h-6 text-xs p-1 text-center"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
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