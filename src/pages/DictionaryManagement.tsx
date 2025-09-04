
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

// Sample data
const initialTerms: DictionaryTerm[] = [
  {
    id: '1',
    englishTerm: 'Palatal Strap',
    vietnameseTerm: 'Bản khẩu cái',
    description: 'A major connector on an upper partial denture that crosses the hard palate in the bicuspid and molar region.',
    explanation: 'Một kết nối chính trên một hàm giả răng trên mở bảng qua vòm miệng cứng ở vùng răng nanh và răng hàm.',
    code: 'RPD0057',
    images: ['/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png'],
    category: 'Prosthodontics',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export default function DictionaryManagement() {
  const [terms, setTerms] = useState<DictionaryTerm[]>(initialTerms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    englishTerm: '',
    vietnameseTerm: '',
    description: '',
    explanation: '',
    code: '',
    category: '',
  });
  const { toast } = useToast();

  const filteredTerms = terms.filter(term =>
    term.englishTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.vietnameseTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      englishTerm: '',
      vietnameseTerm: '',
      description: '',
      explanation: '',
      code: '',
      category: '',
    });
    setImages([]);
    setSelectedTerm(null);
    setFormMode('add');
  };

  const handleAddNew = () => {
    resetForm();
    setFormMode('add');
  };

  const handleEdit = (term: DictionaryTerm) => {
    setFormData({
      englishTerm: term.englishTerm,
      vietnameseTerm: term.vietnameseTerm,
      description: term.description,
      explanation: term.explanation,
      code: term.code,
      category: term.category || '',
    });
    setImages(term.images);
    setSelectedTerm(term.id);
    setFormMode('edit');
  };

  const handleDeleteTerm = (id: string) => {
    setTerms(prev => prev.filter(term => term.id !== id));
    if (selectedTerm === id) {
      resetForm();
    }
    toast({
      title: "Đã xóa",
      description: "Thuật ngữ đã được xóa thành công",
    });
  };

  const handleApply = () => {
    if (!formData.englishTerm || !formData.vietnameseTerm || !formData.code) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    if (formMode === 'add') {
      const newTerm: DictionaryTerm = {
        id: Date.now().toString(),
        ...formData,
        images,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTerms(prev => [...prev, newTerm]);
      toast({
        title: "Thành công",
        description: "Đã thêm thuật ngữ mới",
      });
    } else if (formMode === 'edit' && selectedTerm) {
      setTerms(prev => prev.map(term => 
        term.id === selectedTerm 
          ? { ...term, ...formData, images, updatedAt: new Date() }
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
          setImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const exportToCSV = () => {
    const headers = ['Mã số', 'Tiếng Anh', 'Tiếng Việt', 'Danh mục', 'Mô tả', 'Diễn giải'];
    const csvContent = [
      headers.join(','),
      ...terms.map(term => [
        term.code,
        `"${term.englishTerm}"`,
        `"${term.vietnameseTerm}"`,
        term.category || '',
        `"${term.description}"`,
        `"${term.explanation}"`
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
                      {terms.filter(t => t.images.length > 0).length}
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
                      <TableHead className="font-semibold">Mã số</TableHead>
                      <TableHead className="font-semibold">Tiếng Anh</TableHead>
                      <TableHead className="font-semibold">Tiếng Việt</TableHead>
                      <TableHead className="font-semibold">Danh mục</TableHead>
                      <TableHead className="font-semibold text-center">Hình ảnh</TableHead>
                      <TableHead className="font-semibold">Ngày tạo</TableHead>
                      <TableHead className="font-semibold text-center">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTerms.map((term) => (
                      <TableRow 
                        key={term.id} 
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          selectedTerm === term.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <TableCell className="font-mono text-sm font-medium text-blue-600">
                          {term.code}
                        </TableCell>
                        <TableCell className="font-medium">
                          {term.englishTerm}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {term.vietnameseTerm}
                        </TableCell>
                        <TableCell>
                          {term.category && (
                            <Badge variant="secondary" className="text-xs">
                              {term.category}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={term.images.length > 0 ? "default" : "secondary"}>
                            {term.images.length}
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
                                  <DialogTitle>{term.englishTerm}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <strong>Tiếng Việt:</strong> {term.vietnameseTerm}
                                  </div>
                                  <div>
                                    <strong>Mã:</strong> {term.code}
                                  </div>
                                  <div>
                                    <strong>Mô tả:</strong> {term.description}
                                  </div>
                                  <div>
                                    <strong>Diễn giải:</strong> {term.explanation}
                                  </div>
                                  {term.images.length > 0 && (
                                    <div>
                                      <strong>Hình ảnh:</strong>
                                      <div className="grid grid-cols-2 gap-2 mt-2">
                                        {term.images.map((img, idx) => (
                                          <img
                                            key={idx}
                                            src={img}
                                            alt={`${term.englishTerm} ${idx + 1}`}
                                            className="w-full h-32 object-cover rounded border"
                                          />
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
                              onClick={() => handleDeleteTerm(term.id)}
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
                          const term = terms.find(t => t.id === selectedTerm);
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
                    <Label htmlFor="englishTerm">Thuật ngữ tiếng Anh *</Label>
                    <Input
                      id="englishTerm"
                      value={formData.englishTerm}
                      onChange={(e) => setFormData(prev => ({ ...prev, englishTerm: e.target.value }))}
                      placeholder="VD: Palatal Strap"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vietnameseTerm">Thuật ngữ tiếng Việt *</Label>
                    <Input
                      id="vietnameseTerm"
                      value={formData.vietnameseTerm}
                      onChange={(e) => setFormData(prev => ({ ...prev, vietnameseTerm: e.target.value }))}
                      placeholder="VD: Bản khẩu cái"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code">Mã số *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                      placeholder="VD: RPD0057"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Prosthodontics">Phục hình</SelectItem>
                        <SelectItem value="Orthodontics">Chỉnh nha</SelectItem>
                        <SelectItem value="Endodontics">Nội nha</SelectItem>
                        <SelectItem value="Periodontics">Nha chu</SelectItem>
                        <SelectItem value="Oral Surgery">Phẫu thuật hàm mặt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả (tiếng Anh)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Mô tả chi tiết bằng tiếng Anh..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="explanation">Diễn giải (tiếng Việt)</Label>
                    <Textarea
                      id="explanation"
                      value={formData.explanation}
                      onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
                      placeholder="Diễn giải chi tiết bằng tiếng Việt..."
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
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {images.map((image, index) => (
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
