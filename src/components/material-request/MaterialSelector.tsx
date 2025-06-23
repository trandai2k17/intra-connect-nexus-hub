
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Star, Trash2, Package } from 'lucide-react';

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
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  // Mock material database
  const availableMaterials = [
    { code: 'MAT001', name: 'Thép tấm 2mm', unit: 'kg' },
    { code: 'MAT002', name: 'Đinh vít M6x20', unit: 'cái' },
    { code: 'MAT003', name: 'Sơn chống gỉ', unit: 'lít' },
    { code: 'MAT004', name: 'Gasket cao su', unit: 'cái' },
    { code: 'MAT005', name: 'Dây điện 2.5mm', unit: 'mét' },
    { code: 'MAT006', name: 'Ống nhựa PVC 50mm', unit: 'mét' },
    { code: 'MAT007', name: 'Keo dán 3M', unit: 'tuýp' },
    { code: 'MAT008', name: 'Băng keo điện', unit: 'cuộn' },
  ];

  const filteredMaterials = availableMaterials.filter(material => 
    material.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteItems = JSON.parse(localStorage.getItem('favoriteMaterials') || '[]');

  const handleAddMaterial = () => {
    const selected = availableMaterials.find(m => m.code === selectedMaterial);
    if (!selected || quantity <= 0) {
      alert('Vui lòng chọn nguyên vật liệu và nhập số lượng hợp lệ');
      return;
    }

    const newMaterial: MaterialItem = {
      id: `${Date.now()}-${Math.random()}`,
      code: selected.code,
      name: selected.name,
      unit: selected.unit,
      quantity,
      notes,
      isFavorite: favoriteItems.includes(selected.code)
    };

    onMaterialAdd(newMaterial);
    setSelectedMaterial('');
    setQuantity(1);
    setNotes('');
  };

  const handleToggleFavorite = (code: string) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMaterials') || '[]');
    const newFavorites = favorites.includes(code)
      ? favorites.filter((f: string) => f !== code)
      : [...favorites, code];
    
    localStorage.setItem('favoriteMaterials', JSON.stringify(newFavorites));
    
    // Update existing materials
    materials.forEach(material => {
      if (material.code === code) {
        onMaterialUpdate(material.id, { isFavorite: newFavorites.includes(code) });
      }
    });
  };

  return (
    <Card className="bg-glass border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-purple-600 dark:text-purple-400 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Chi tiết nguyên vật liệu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Material Search and Add */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tìm và thêm nguyên vật liệu</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Mã hoặc tên nguyên vật liệu"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Chọn nguyên vật liệu</label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">-- Chọn nguyên vật liệu --</option>
                {filteredMaterials.map(material => (
                  <option key={material.code} value={material.code}>
                    {material.code} - {material.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Số lượng</label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Ghi chú</label>
              <Input
                placeholder="Ghi chú thêm"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <Button onClick={handleAddMaterial} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Thêm vào danh sách
          </Button>
        </div>

        {/* Material List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Danh sách nguyên vật liệu đã chọn</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showFavorites"
                checked={showFavorites}
                onCheckedChange={setShowFavorites}
              />
              <label htmlFor="showFavorites" className="text-sm text-gray-700 dark:text-gray-300">
                Chỉ hiển thị yêu thích
              </label>
            </div>
          </div>

          {materials.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Chưa có nguyên vật liệu nào được chọn
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã</TableHead>
                    <TableHead>Tên nguyên vật liệu</TableHead>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Ghi chú</TableHead>
                    <TableHead>Yêu thích</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials
                    .filter(material => !showFavorites || material.isFavorite)
                    .map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.code}</TableCell>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.unit}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={material.quantity}
                          onChange={(e) => onMaterialUpdate(material.id, { quantity: Number(e.target.value) })}
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={material.notes}
                          onChange={(e) => onMaterialUpdate(material.id, { notes: e.target.value })}
                          className="w-32"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleFavorite(material.code)}
                          className={material.isFavorite ? 'text-yellow-500' : 'text-gray-400'}
                        >
                          <Star className={`w-4 h-4 ${material.isFavorite ? 'fill-current' : ''}`} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMaterialRemove(material.id)}
                          className="text-red-500 hover:text-red-700"
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
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialSelector;
