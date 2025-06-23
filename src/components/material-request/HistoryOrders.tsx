
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarIcon, History, Eye, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface HistoryOrdersProps {
  employeeId: string;
}

interface HistoryOrder {
  requestId: string;
  requestDate: string;
  location: string;
  process: string;
  totalItems: number;
  status: 'Pending' | 'Approved' | 'Completed' | 'Rejected';
  materials: string[];
}

const HistoryOrders = ({ employeeId }: HistoryOrdersProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [filteredOrders, setFilteredOrders] = useState<HistoryOrder[]>([]);

  // Mock history data - trong thực tế sẽ lấy từ API
  const mockHistoryData: HistoryOrder[] = [
    {
      requestId: 'REQ-20241201-001',
      requestDate: '2024-12-01',
      location: 'Nhà máy 1 - Hà Nội',
      process: 'Công đoạn gia công',
      totalItems: 5,
      status: 'Completed',
      materials: ['MAT001', 'MAT002', 'MAT003', 'MAT004', 'MAT005']
    },
    {
      requestId: 'REQ-20241130-002',
      requestDate: '2024-11-30',
      location: 'Nhà máy 2 - Hồ Chí Minh',
      process: 'Công đoạn lắp ráp',
      totalItems: 3,
      status: 'Approved',
      materials: ['MAT006', 'MAT007', 'MAT008']
    },
    {
      requestId: 'REQ-20241129-001',
      requestDate: '2024-11-29',
      location: 'Nhà máy 1 - Hà Nội',
      process: 'Công đoạn chuẩn bị',
      totalItems: 7,
      status: 'Pending',
      materials: ['MAT001', 'MAT003', 'MAT005', 'MAT007', 'MAT009', 'MAT010', 'MAT011']
    },
    {
      requestId: 'REQ-20241128-003',
      requestDate: '2024-11-28',
      location: 'Kho trung tâm - Bình Dương',
      process: 'Công đoạn kiểm tra',
      totalItems: 2,
      status: 'Completed',
      materials: ['MAT012', 'MAT013']
    },
    {
      requestId: 'REQ-20241127-001',
      requestDate: '2024-11-27',
      location: 'Nhà máy 3 - Đà Nẵng',
      process: 'Công đoạn đóng gói',
      totalItems: 4,
      status: 'Rejected',
      materials: ['MAT014', 'MAT015', 'MAT016', 'MAT017']
    }
  ];

  React.useEffect(() => {
    // Filter orders based on selected date or show top 10 recent orders
    let orders = mockHistoryData.filter(order => {
      // In real app, this would filter by employeeId from API
      return true;
    });

    if (selectedDate) {
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      orders = orders.filter(order => order.requestDate === selectedDateStr);
    } else {
      // Show top 10 most recent orders
      orders = orders.slice(0, 10);
    }

    setFilteredOrders(orders);
  }, [selectedDate, employeeId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'Hoàn thành';
      case 'Approved':
        return 'Đã duyệt';
      case 'Pending':
        return 'Chờ duyệt';
      case 'Rejected':
        return 'Từ chối';
      default:
        return status;
    }
  };

  return (
    <Card className="bg-glass border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <History className="w-5 h-5" />
          Lịch sử order của nhân viên {employeeId}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Filter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Lọc theo ngày:
            </span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Chọn ngày cụ thể"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          {selectedDate && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(undefined)}
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              {selectedDate ? 'Đơn hàng trong ngày' : 'Top 10 đơn hàng gần nhất'}
            </h4>
            <Badge variant="secondary" className="text-sm">
              {filteredOrders.length} đơn hàng
            </Badge>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Không có đơn hàng nào trong khoảng thời gian này</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã phiếu</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Công đoạn</TableHead>
                    <TableHead className="text-center">Số item</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead className="text-center">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.requestId}>
                      <TableCell className="font-medium">
                        {order.requestId}
                      </TableCell>
                      <TableCell>
                        {format(new Date(order.requestDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{order.location}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{order.process}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{order.totalItems}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn("text-xs", getStatusColor(order.status))}>
                          {getStatusText(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Xem
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryOrders;
