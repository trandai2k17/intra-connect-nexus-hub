
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Star, Trash2, Plus } from 'lucide-react';
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

interface MaterialSelectorProps {
  materials: MaterialItem[];
  onMaterialAdd: (material: MaterialItem) => void;
  onMaterialUpdate: (id: string, updates: Partial<MaterialItem>) => void;
  onMaterialRemove: (id: string) => void;
}

const MaterialSelector = ({ materials, onMaterialAdd, onMaterialUpdate, onMaterialRemove }: MaterialSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Mock material database
  const materialDatabase = [
    { code: 'MAT001', name: 'Thép tấm dày 10mm', unit: 'Tấm' },
    { code: 'MAT002', name: 'Ống thép phi 100', unit: 'Mét' },
    { code: 'MAT003', name: 'Đinh ốc M10', unit: 'Cái' },
    { code: 'MAT004', name: 'Sơn chống gỉ', unit: 'Lít' },
    { code: 'MAT005', name: 'Cao su chống rung', unit: 'Miếng' },
    { code: 'MAT006', name: 'Dầu thủy lực', unit: 'Lít' },
    { code: 'MAT007', name: 'Vòng bi SKF 6205', unit: 'Cái' },
    { code: 'MAT008', name: 'Dây curoa', unit: 'Mét' }
  ];

  const filteredMaterials = materialDatabase.filter(
    material => 
      material.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMaterial = (material: any) => {
    const newMaterial: MaterialItem = {
      id: Date.now().toString(),
      code: material.code,
      name: material.name,
      unit: material.unit,
      quantity: 1,
      notes: '',
      isFavorite: false
    };
    onMaterialAdd(newMaterial);
  };

  const handleQuantityChange = (id: string, quantity: string) => {
    const numQuantity = parseInt(quantity) || 0;
    onMaterialUpdate(id, { quantity: numQuantity });
  };

  const handleNotesChange = (id: string, notes: string) => {
    onMaterialUpdate(id, { notes });
  };

  const handleFavoriteChange = (id: string, checked: boolean) => {
    onMaterialUpdate(id, { isFavorite: checked });
  };

  return (
    <div className="space-y-6">
      {/* Material Search */}
      <Card className="bg-glass border-white/20 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-purple-600 dark:text-purple-400 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Tìm kiếm nguyên vật liệu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm theo mã hoặc tên nguyên vật liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {searchTerm && (
            <div className="max-h-48 overflow-y-auto space-y-2">
              {filteredMaterials.map((material) => (
                <div key={material.code} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{material.code}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{material.name}</p>
                    <Badge variant="secondary" className="text-xs">{material.unit}</Badge>
                  </div>
                  <Button
                    onClick={() => handleAddMaterial(material)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Thêm
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Materials */}
      <Card className="bg-glass border-white/20 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-orange-600 dark:text-orange-400 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Danh sách nguyên vật liệu đã chọn ({materials.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Chưa có nguyên vật liệu nào được chọn</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Mã NVL</TableHead>
                    <TableHead>Tên nguyên vật liệu</TableHead>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead className="w-24">Số lượng</TableHead>
                    <TableHead>Ghi chú</TableHead>
                    <TableHead className="w-16">Yêu thích</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </TableCell>
                      <TableCell className="font-medium">{material.code}</TableCell>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{material.unit}</Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={material.quantity}
                          onChange={(e) => handleQuantityChange(material.id, e.target.value)}
                          className="w-20 h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Ghi chú..."
                          value={material.notes}
                          onChange={(e) => handleNotesChange(material.id, e.target.value)}
                          className="min-w-32 h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={material.isFavorite}
                          onCheckedChange={(checked) => handleFavoriteChange(material.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onMaterialRemove(material.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialSelector;
