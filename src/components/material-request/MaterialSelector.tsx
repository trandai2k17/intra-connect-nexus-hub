
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Star, Trash2, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MaterialSearchDialog from './MaterialSearchDialog';

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
  readOnly?: boolean;
  location?: string;
}

const MaterialSelector = ({ materials, onMaterialAdd, onMaterialUpdate, onMaterialRemove, readOnly = false, location = '' }: MaterialSelectorProps) => {
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const handleMaterialsSelect = (selectedMaterials: MaterialItem[]) => {
    selectedMaterials.forEach(material => {
      onMaterialAdd(material);
    });
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
    <div className="space-y-4">
      {/* Material Search Button - Hide in read-only mode */}
      {!readOnly && (
        <Card className="bg-glass border-white/20 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Tìm kiếm nguyên vật liệu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setShowSearchDialog(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!location}
            >
              <Search className="w-4 h-4 mr-2" />
              {location ? `Tìm kiếm NVL tại ${location}` : 'Vui lòng chọn Location trước'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Selected Materials */}
      <Card className="bg-glass border-white/20 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-orange-600 dark:text-orange-400 flex items-center gap-2">
            <Package className="w-5 h-5" />
            {readOnly ? 'Danh sách nguyên vật liệu' : `Danh sách nguyên vật liệu đã chọn (${materials.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Chưa có nguyên vật liệu nào được chọn</p>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="text-xs">Mã NVL</TableHead>
                    <TableHead className="text-xs">Tên nguyên vật liệu</TableHead>
                    <TableHead className="text-xs">ĐV</TableHead>
                    <TableHead className="w-20 text-xs">SL</TableHead>
                    <TableHead className="text-xs">Ghi chú</TableHead>
                    {!readOnly && <TableHead className="w-12 text-xs">YT</TableHead>}
                    {!readOnly && <TableHead className="w-12"></TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => (
                    <TableRow key={material.id} className="text-sm">
                      <TableCell>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </TableCell>
                      <TableCell className="font-medium text-xs">{material.code}</TableCell>
                      <TableCell className="text-xs">{material.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{material.unit}</Badge>
                      </TableCell>
                      <TableCell>
                        {readOnly ? (
                          <div className="w-16 h-7 flex items-center font-medium text-xs">
                            {material.quantity}
                          </div>
                        ) : (
                          <Input
                            type="number"
                            min="1"
                            value={material.quantity}
                            onChange={(e) => handleQuantityChange(material.id, e.target.value)}
                            className="w-16 h-7 text-xs"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {readOnly ? (
                          <div className="min-w-24 h-7 flex items-center text-xs">
                            {material.notes || '-'}
                          </div>
                        ) : (
                          <Input
                            placeholder="Ghi chú..."
                            value={material.notes}
                            onChange={(e) => handleNotesChange(material.id, e.target.value)}
                            className="min-w-24 h-7 text-xs"
                          />
                        )}
                      </TableCell>
                      {!readOnly && (
                        <TableCell>
                          <Checkbox
                            checked={material.isFavorite}
                            onCheckedChange={(checked) => handleFavoriteChange(material.id, !!checked)}
                          />
                        </TableCell>
                      )}
                      {!readOnly && (
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onMaterialRemove(material.id)}
                            className="h-7 w-7 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Material Search Dialog */}
      <MaterialSearchDialog
        open={showSearchDialog}
        onOpenChange={setShowSearchDialog}
        location={location}
        onMaterialsSelect={handleMaterialsSelect}
      />
    </div>
  );
};

export default MaterialSelector;
