import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Eye, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface MaterialItem {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  notes: string;
  isFavorite: boolean;
}

interface RequestData {
  employeeId: string;
  employeeName: string;
  department: string;
  warehouse: string;
  location: string;
  usingLocation: string;
  process: string;
  materials: MaterialItem[];
  requestDate: string;
  requestId: string;
}

interface HistoryOrdersProps {
  employeeId: string;
  onViewOrder: (orderData: RequestData) => void;
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

const HistoryOrders = ({ employeeId, onViewOrder }: HistoryOrdersProps) => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [filteredOrders, setFilteredOrders] = useState<HistoryOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const loadData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let orders = mockHistoryData.filter(order => {
      return true;
    });

    if (selectedDate) {
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      orders = orders.filter(order => order.requestDate === selectedDateStr);
    } else {
      orders = orders.slice(0, 10);
    }

    setFilteredOrders(orders);
    setIsLoading(false);
  };

  React.useEffect(() => {
    loadData();
  }, [selectedDate, employeeId]);

  const handleReloadData = () => {
    loadData();
  };

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

  const handleViewOrder = (order: HistoryOrder) => {
    // Convert HistoryOrder to RequestData format
    const mockMaterials = order.materials.map((matCode, index) => ({
      id: `${order.requestId}-${index}`,
      code: matCode,
      name: `Material ${matCode}`,
      unit: 'Cái',
      quantity: Math.floor(Math.random() * 10) + 1,
      notes: '',
      isFavorite: false
    }));

    const requestData: RequestData = {
      employeeId: employeeId,
      employeeName: 'Test User',
      department: 'Test Department',
      warehouse: 'Test Warehouse',
      location: order.location,
      usingLocation: 'Test Using Location',
      process: order.process,
      materials: mockMaterials,
      requestDate: order.requestDate,
      requestId: order.requestId
    };

    onViewOrder(requestData);
  };

  return (
    <div className="space-y-3 h-full flex flex-col">
      {/* Date Filter and Reload Button */}
      <div className="space-y-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {t('material.filter.date')}:
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={handleReloadData}
            disabled={isLoading}
          >
            <RefreshCw className={cn("w-3 h-3 mr-1", isLoading && "animate-spin")} />
            {t('material.reload.data')}
          </Button>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal text-xs h-8",
                !selectedDate && "text-muted-foreground"
              )}
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-3 w-3" />
              {selectedDate ? format(selectedDate, "dd/MM/yyyy") : t('material.select.date')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {selectedDate && (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs h-7"
            onClick={() => setSelectedDate(undefined)}
            disabled={isLoading}
          >
            {t('material.clear.filter')}
          </Button>
        )}
      </div>

      {/* Orders Count */}
      <div className="flex items-center justify-between flex-shrink-0">
        <h4 className="text-xs font-medium text-gray-900 dark:text-white">
          {selectedDate ? t('material.orders.today') : t('material.orders.recent')}
        </h4>
        <Badge variant="secondary" className="text-xs">
          {isLoading ? '...' : filteredOrders.length}
        </Badge>
      </div>

      {/* Orders List */}
      <div className="space-y-2 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-xs">
            <RefreshCw className="w-4 h-4 animate-spin mx-auto mb-2" />
            <p>{t('material.loading.data')}</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-xs">
            <p>{t('material.no.orders')}</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.requestId} className="border rounded-lg p-2 bg-white dark:bg-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {order.requestId}
                </div>
                <Badge className={cn("text-xs", getStatusColor(order.status))}>
                  {getStatusText(order.status)}
                </Badge>
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {format(new Date(order.requestDate), "dd/MM/yyyy")}
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {order.process}
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {order.totalItems} {t('material.items')}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => handleViewOrder(order)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  {t('material.view')}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryOrders;
