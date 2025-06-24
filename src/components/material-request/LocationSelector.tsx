
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocationSelectorProps {
  onLocationChange: (location: string, usingLocation: string) => void;
  selectedLocation: string;
  selectedUsingLocation: string;
  readOnly?: boolean;
}

const LocationSelector = ({ 
  onLocationChange, 
  selectedLocation, 
  selectedUsingLocation,
  readOnly = false 
}: LocationSelectorProps) => {
  const { t } = useLanguage();

  const handleLocationChange = (location: string) => {
    onLocationChange(location, selectedUsingLocation);
  };

  const handleUsingLocationChange = (usingLocation: string) => {
    onLocationChange(selectedLocation, usingLocation);
  };

  if (readOnly) {
    return (
      <div className="space-y-4">
        <div>
          <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {t('material.location')}
          </Label>
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg border text-sm mt-1">
            {selectedLocation || 'N/A'}
          </div>
        </div>
        <div>
          <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {t('material.using.location')}
          </Label>
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg border text-sm mt-1">
            {selectedUsingLocation || 'N/A'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="location" className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {t('material.location')}
        </Label>
        <Select value={selectedLocation} onValueChange={handleLocationChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder={t('material.select.location')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nha-may-1">Nhà máy 1 - Hà Nội</SelectItem>
            <SelectItem value="nha-may-2">Nhà máy 2 - Hồ Chí Minh</SelectItem>
            <SelectItem value="kho-trung-tam">Kho trung tâm - Bình Dương</SelectItem>
            <SelectItem value="nha-may-3">Nhà máy 3 - Đà Nẵng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="usingLocation" className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {t('material.using.location')}
        </Label>
        <Select value={selectedUsingLocation} onValueChange={handleUsingLocationChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder={t('material.select.using.location')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line-1">Line 1 - Production</SelectItem>
            <SelectItem value="line-2">Line 2 - Assembly</SelectItem>
            <SelectItem value="line-3">Line 3 - Quality Control</SelectItem>
            <SelectItem value="warehouse-a">Warehouse A - Storage</SelectItem>
            <SelectItem value="warehouse-b">Warehouse B - Packaging</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LocationSelector;
