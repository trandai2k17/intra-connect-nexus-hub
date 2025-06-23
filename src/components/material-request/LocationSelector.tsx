
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Settings } from 'lucide-react';

interface LocationSelectorProps {
  onLocationChange: (location: string, process: string) => void;
  selectedLocation: string;
  selectedProcess: string;
}

const LocationSelector = ({ onLocationChange, selectedLocation, selectedProcess }: LocationSelectorProps) => {
  const locations = [
    'Nhà máy 1 - Hà Nội',
    'Nhà máy 2 - Hồ Chí Minh',
    'Nhà máy 3 - Đà Nẵng',
    'Kho trung tâm - Bình Dương',
    'Chi nhánh Hải Phòng'
  ];

  const processes = [
    'Công đoạn chuẩn bị',
    'Công đoạn gia công',
    'Công đoạn lắp ráp',
    'Công đoạn kiểm tra',
    'Công đoạn đóng gói',
    'Công đoạn vận chuyển'
  ];

  const handleLocationSelect = (location: string) => {
    onLocationChange(location, selectedProcess);
  };

  const handleProcessSelect = (process: string) => {
    onLocationChange(selectedLocation, process);
  };

  return (
    <Card className="bg-glass border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-green-600 dark:text-green-400 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Thông tin đặt hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Chọn Location
          </label>
          <Select value={selectedLocation} onValueChange={handleLocationSelect}>
            <SelectTrigger className="w-full h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Chọn location để order" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              {locations.map((location) => (
                <SelectItem key={location} value={location} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Chọn công đoạn
          </label>
          <Select value={selectedProcess} onValueChange={handleProcessSelect}>
            <SelectTrigger className="w-full h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Chọn công đoạn sử dụng" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              {processes.map((process) => (
                <SelectItem key={process} value={process} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  {process}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
