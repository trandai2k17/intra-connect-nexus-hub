
import React, { useState } from 'react';
import { Search, Edit, Trash2, Eye, Download, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddTermDialog } from '@/components/dictionary/AddTermDialog';
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
  const { toast } = useToast();

  const filteredTerms = terms.filter(term =>
    term.englishTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.vietnameseTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTerm = (newTerm: DictionaryTerm) => {
    setTerms(prev => [...prev, newTerm]);
  };

  const handleDeleteTerm = (id: string) => {
    setTerms(prev => prev.filter(term => term.id !== id));
    toast({
      title: "Đã xóa",
      description: "Thuật ngữ đã được xóa thành công",
    });
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
            <AddTermDialog onAddTerm={handleAddTerm} />
          </div>
        </div>

        {/* Search and Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
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
                  <TableRow key={term.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
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

                        <Button variant="ghost" size="sm">
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
  );
}
