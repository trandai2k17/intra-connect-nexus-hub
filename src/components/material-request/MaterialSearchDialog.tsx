
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface MaterialItem {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  notes: string;
  isFavorite: boolean;
}

interface MaterialSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: string;
  onMaterialsSelect: (materials: MaterialItem[]) => void;
}

const MaterialSearchDialog = ({ open, onOpenChange, location, onMaterialsSelect }: MaterialSearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<Set<string>>(new Set());

  // Enhanced material database with location-specific filtering
  const materialDatabase = [
    { itemId: 'MAT001', name: 'Thép tấm dày 10mm', location: 'Nhà máy 1 - Hà Nội', unit: 'Tấm' },
    { itemId: 'MAT002', name: 'Ống thép phi 100', location: 'Nhà máy 1 - Hà Nội', unit: 'Mét' },
    { itemId: 'MAT003', name: 'Đinh ốc M10', location: 'Nhà máy 2 - Hồ Chí Minh', unit: 'Cái' },
    { itemId: 'MAT004', name: 'Sơn chống gỉ', location: 'Nhà máy 2 - Hồ Chí Minh', unit: 'Lít' },
    { itemId: 'MAT005', name: 'Cao su chống rung', location: 'Kho trung tâm - Bình Dương', unit: 'Miếng' },
    { itemId: 'MAT006', name: 'Dầu thủy lực', location: 'Kho trung tâm - Bình Dương', unit: 'Lít' },
    { itemId: 'MAT007', name: 'Vòng bi SKF 6205', location: 'Nhà máy 3 - Đà Nẵng', unit: 'Cái' },
    { itemId: 'MAT008', name: 'Dây curoa', location: 'Nhà máy 3 - Đà Nẵng', unit: 'Mét' },
    { itemId: 'MAT009', name: 'Thép góc L50x50', location: 'Nhà máy 1 - Hà Nội', unit: 'Mét' },
    { itemId: 'MAT010', name: 'Ống nhựa PVC phi 110', location: 'Nhà máy 2 - Hồ Chí Minh', unit: 'Mét' },
  ];

  // Filter materials by location and search term
  const filteredMaterials = materialDatabase.filter(material => {
    const locationMatch = !location || material.location === location;
    const searchMatch = !searchTerm || 
      material.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.name.toLowerCase().includes(searchTerm.toLowerCase());
    return locationMatch && searchMatch;
  });

  const handleMaterialSelect = (itemId: string, checked: boolean) => {
    const newSelected = new Set(selectedMaterials);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedMaterials(newSelected);
  };

  const handleApply = () => {
    const selectedMaterialItems: MaterialItem[] = Array.from(selectedMaterials).map(itemId => {
      const material = materialDatabase.find(m => m.itemId === itemId)!;
      return {
        id: Date.now().toString() + Math.random(),
        code: material.itemId,
        name: material.name,
        unit: material.unit,
        quantity: 1,
        notes: '',
        isFavorite: false
      };
    });
    
    onMaterialsSelect(selectedMaterialItems);
    setSelectedMaterials(new Set());
    setSearchTerm('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedMaterials(new Set());
    setSearchTerm('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Tìm kiếm nguyên vật liệu - {location || 'Tất cả location'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm theo ItemID hoặc tên nguyên vật liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Materials Table */}
          <div className="flex-1 overflow-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Chọn</TableHead>
                  <TableHead>ItemID</TableHead>
                  <TableHead>Material Name</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => (
                  <TableRow key={material.itemId}>
                    <TableCell>
                      <Checkbox
                        checked={selectedMaterials.has(material.itemId)}
                        onCheckedChange={(checked) => handleMaterialSelect(material.itemId, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{material.itemId}</TableCell>
                    <TableCell>{material.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{material.location}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Selected Count */}
          {selectedMaterials.size > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Đã chọn: {selectedMaterials.size} nguyên vật liệu
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Hủy
          </Button>
          <Button 
            onClick={handleApply}
            disabled={selectedMaterials.size === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            Apply ({selectedMaterials.size})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialSearchDialog;
