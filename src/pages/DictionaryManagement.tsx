
import React, { useState } from 'react';
import { Search, Edit, Trash2, Eye, Download, Upload, Plus, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DictionaryTerm } from '@/types/dictionary';
import { useToast } from '@/hooks/use-toast';

// Sample data based on the provided seed data
const initialTerms: DictionaryTerm[] = [
  {
    termId: 'RPD0001',
    productGroup: 'RPD',
    alphabeta: 'M',
    dentalWord: 'Mandible',
    vnTerm: 'Hàm dưới',
    engTerm: 'Mand',
    engDescription: 'The lower jaw',
    vnDescription: 'Hàm dưới',
    photos: [
      {
        id: '1',
        termId: 'RPD0001',
        photoName: 'RPD0001_1',
        photoPath: '/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png',
        activePhoto: true
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    termId: 'RPD0002',
    productGroup: 'RPD',
    alphabeta: 'M',
    dentalWord: 'Maxilla',
    vnTerm: 'Hàm trên',
    engTerm: 'Max',
    engDescription: 'The upper jaw',
    vnDescription: 'Hàm trên',
    photos: [
      {
        id: '2',
        termId: 'RPD0002',
        photoName: 'RPD0002_1',
        photoPath: '/lovable-uploads/cb0bf27b-00e3-497d-b8d9-ab79e7751d6f.png',
        activePhoto: true
      }
    ],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    termId: 'RPD0003',
    productGroup: 'RPD',
    alphabeta: 'A',
    dentalWord: 'Abutment',
    vnTerm: 'Răng trụ',
    engTerm: 'Abutment tooth',
    engDescription: 'A tooth used to support a removable partial denture or anchor a fixed partial denture',
    vnDescription: 'Nếu là HTL: răng sẽ đặt móc. Nếu là răng sứ: là cùi răng',
    photos: [
      {
        id: '3',
        termId: 'RPD0003',
        photoName: 'RPD0003_1',
        photoPath: '/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png',
        activePhoto: true
      },
      {
        id: '4',
        termId: 'RPD0003',
        photoName: 'RPD0003_2',
        photoPath: '/lovable-uploads/cb0bf27b-00e3-497d-b8d9-ab79e7751d6f.png',
        activePhoto: false
      }
    ],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    termId: 'RPD0004',
    productGroup: 'RPD',
    alphabeta: 'A',
    dentalWord: 'Acrylic Resin',
    vnTerm: 'Nướu giả',
    engTerm: 'Partial Base / Denture Base',
    engDescription: 'The plastic material widely used in dentistry to make the denture base.',
    vnDescription: 'Phần nền nướu giả, làm từ nhựa theo sản phẩm yêu cầu, giúp cố định răng nhựa.',
    photos: [
      {
        id: '5',
        termId: 'RPD0004',
        photoName: 'RPD0004_1',
        photoPath: '/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png',
        activePhoto: true
      }
    ],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
];

export default function DictionaryManagement() {
  const [terms, setTerms] = useState<DictionaryTerm[]>(initialTerms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [photoFiles, setPhotoFiles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    productGroup: 'RPD',
    alphabeta: '',
    dentalWord: '',
    vnTerm: '',
    engTerm: '',
    engDescription: '',
    vnDescription: '',
    termId: '',
  });
  const { toast } = useToast();

  const filteredTerms = terms.filter(term =>
    term.dentalWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.vnTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.termId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      productGroup: 'RPD',
      alphabeta: '',
      dentalWord: '',
      vnTerm: '',
      engTerm: '',
      engDescription: '',
      vnDescription: '',
      termId: '',
    });
    setPhotoFiles([]);
    setSelectedTerm(null);
    setFormMode('add');
  };

  const handleAddNew = () => {
    resetForm();
    setFormMode('add');
  };

  const handleEdit = (term: DictionaryTerm) => {
    setFormData({
      productGroup: term.productGroup,
      alphabeta: term.alphabeta,
      dentalWord: term.dentalWord,
      vnTerm: term.vnTerm,
      engTerm: term.engTerm,
      engDescription: term.engDescription,
      vnDescription: term.vnDescription,
      termId: term.termId,
    });
    setPhotoFiles(term.photos.map(p => p.photoPath));
    setSelectedTerm(term.termId);
    setFormMode('edit');
  };

  const handleDeleteTerm = (termId: string) => {
    setTerms(prev => prev.filter(term => term.termId !== termId));
    if (selectedTerm === termId) {
      resetForm();
    }
    toast({
      title: "Đã xóa",
      description: "Thuật ngữ đã được xóa thành công",
    });
  };

  const handleApply = () => {
    if (!formData.dentalWord || !formData.vnTerm || !formData.termId) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    if (formMode === 'add') {
      const photos = photoFiles.map((photoPath, index) => ({
        id: `${Date.now()}_${index}`,
        termId: formData.termId,
        photoName: `${formData.termId}_${index + 1}`,
        photoPath,
        activePhoto: index === 0,
      }));

      const newTerm: DictionaryTerm = {
        ...formData,
        photos,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTerms(prev => [...prev, newTerm]);
      toast({
        title: "Thành công",
        description: "Đã thêm thuật ngữ mới",
      });
    } else if (formMode === 'edit' && selectedTerm) {
      const photos = photoFiles.map((photoPath, index) => ({
        id: `${Date.now()}_${index}`,
        termId: formData.termId,
        photoName: `${formData.termId}_${index + 1}`,
        photoPath,
        activePhoto: index === 0,
      }));

      setTerms(prev => prev.map(term => 
        term.termId === selectedTerm 
          ? { ...term, ...formData, photos, updatedAt: new Date() }
          : term
      ));
      toast({
        title: "Thành công",
        description: "Đã cập nhật thuật ngữ",
      });
    }
    
    resetForm();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoFiles(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
  };

  const exportToCSV = () => {
    const headers = ['TermID', 'ProductGroup', 'DentalWord', 'VnTerm', 'EngTerm', 'EngDescription', 'VnDescription'];
    const csvContent = [
      headers.join(','),
      ...terms.map(term => [
        term.termId,
        term.productGroup,
        `"${term.dentalWord}"`,
        `"${term.vnTerm}"`,
        `"${term.engTerm}"`,
        `"${term.engDescription}"`,
        `"${term.vnDescription}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `dictionary_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast({
      title: "Xuất dữ liệu thành công",
      description: "File CSV đã được tải xuống",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Quản lý từ điển
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thêm, sửa, xóa và quản lý các thuật ngữ nha khoa
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={exportToCSV}
              className="border-blue-200 hover:bg-blue-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Xuất CSV
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Table (col-8) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Search and Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm thuật ngữ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600 text-lg">{terms.length}</div>
                    <div>Tổng số thuật ngữ</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600 text-lg">
                      {terms.filter(t => t.photos.length > 0).length}
                    </div>
                    <div>Có hình ảnh</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-700">
                      <TableHead className="font-semibold">Mã ID</TableHead>
                      <TableHead className="font-semibold">Từ nha khoa</TableHead>
                      <TableHead className="font-semibold">Tiếng Việt</TableHead>
                      <TableHead className="font-semibold">Nhóm sản phẩm</TableHead>
                      <TableHead className="font-semibold text-center">Hình ảnh</TableHead>
                      <TableHead className="font-semibold">Ngày tạo</TableHead>
                      <TableHead className="font-semibold text-center">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTerms.map((term) => (
                      <TableRow 
                        key={term.termId} 
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          selectedTerm === term.termId ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <TableCell className="font-mono text-sm font-medium text-blue-600">
                          {term.termId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {term.dentalWord}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {term.vnTerm}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {term.productGroup}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={term.photos.length > 0 ? "default" : "secondary"}>
                            {term.photos.length}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {term.createdAt.toLocaleDateString('vi-VN')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{term.dentalWord}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <strong>Tiếng Việt:</strong> {term.vnTerm}
                                  </div>
                                  <div>
                                    <strong>Mã ID:</strong> {term.termId}
                                  </div>
                                  <div>
                                    <strong>Thuật ngữ tiếng Anh:</strong> {term.engTerm}
                                  </div>
                                  <div>
                                    <strong>Mô tả tiếng Anh:</strong> {term.engDescription}
                                  </div>
                                  <div>
                                    <strong>Mô tả tiếng Việt:</strong> {term.vnDescription}
                                  </div>
                                  {term.photos.length > 0 && (
                                    <div>
                                      <strong>Hình ảnh:</strong>
                                      <div className="grid grid-cols-2 gap-2 mt-2">
                                        {term.photos.map((photo) => (
                                          <div key={photo.id} className="relative">
                                            <img
                                              src={photo.photoPath}
                                              alt={photo.photoName}
                                              className="w-full h-32 object-cover rounded border"
                                            />
                                            {photo.activePhoto && (
                                              <Badge className="absolute top-2 left-2">Active</Badge>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(term)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTerm(term.termId)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* No Results */}
              {filteredTerms.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Không tìm thấy thuật ngữ nào
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Thử thay đổi từ khóa tìm kiếm hoặc thêm thuật ngữ mới
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Form (col-4) */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="sticky top-4">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {formMode === 'add' ? 'Thêm thuật ngữ mới' : 'Chỉnh sửa thuật ngữ'}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddNew}
                      className={formMode === 'add' ? 'bg-blue-50' : ''}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (selectedTerm) {
                          const term = terms.find(t => t.termId === selectedTerm);
                          if (term) handleEdit(term);
                        }
                      }}
                      disabled={!selectedTerm}
                      className={formMode === 'edit' ? 'bg-yellow-50' : ''}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (selectedTerm) handleDeleteTerm(selectedTerm);
                      }}
                      disabled={!selectedTerm}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleApply}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="termId">Mã ID *</Label>
                    <Input
                      id="termId"
                      value={formData.termId}
                      onChange={(e) => setFormData(prev => ({ ...prev, termId: e.target.value }))}
                      placeholder="VD: RPD0001"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dentalWord">Từ nha khoa *</Label>
                    <Input
                      id="dentalWord"
                      value={formData.dentalWord}
                      onChange={(e) => setFormData(prev => ({ ...prev, dentalWord: e.target.value }))}
                      placeholder="VD: Mandible"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vnTerm">Thuật ngữ tiếng Việt *</Label>
                    <Input
                      id="vnTerm"
                      value={formData.vnTerm}
                      onChange={(e) => setFormData(prev => ({ ...prev, vnTerm: e.target.value }))}
                      placeholder="VD: Hàm dưới"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="engTerm">Thuật ngữ tiếng Anh</Label>
                    <Input
                      id="engTerm"
                      value={formData.engTerm}
                      onChange={(e) => setFormData(prev => ({ ...prev, engTerm: e.target.value }))}
                      placeholder="VD: Mand"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="productGroup">Nhóm sản phẩm</Label>
                    <Select
                      value={formData.productGroup}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, productGroup: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhóm sản phẩm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RPD">RPD</SelectItem>
                        <SelectItem value="Crown">Crown</SelectItem>
                        <SelectItem value="Bridge">Bridge</SelectItem>
                        <SelectItem value="Implant">Implant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alphabeta">Chữ cái</Label>
                    <Input
                      id="alphabeta"
                      value={formData.alphabeta}
                      onChange={(e) => setFormData(prev => ({ ...prev, alphabeta: e.target.value }))}
                      placeholder="VD: M, A"
                      maxLength={1}
                    />
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2">
                    <Label htmlFor="engDescription">Mô tả tiếng Anh</Label>
                    <Textarea
                      id="engDescription"
                      value={formData.engDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, engDescription: e.target.value }))}
                      placeholder="Mô tả chi tiết bằng tiếng Anh..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vnDescription">Mô tả tiếng Việt</Label>
                    <Textarea
                      id="vnDescription"
                      value={formData.vnDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, vnDescription: e.target.value }))}
                      placeholder="Mô tả chi tiết bằng tiếng Việt..."
                      rows={2}
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-4">
                    <Label>Hình ảnh minh họa</Label>
                    
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Click để chọn ảnh
                        </p>
                      </label>
                    </div>

                    {/* Image Preview */}
                    {photoFiles.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {photoFiles.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-16 object-cover rounded border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
