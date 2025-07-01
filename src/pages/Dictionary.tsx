
import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Table, Image as ImageIcon, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DictionaryTerm } from '@/types/dictionary';

// Sample data - trong thực tế sẽ fetch từ API
const sampleTerms: DictionaryTerm[] = [
  {
    id: '1',
    englishTerm: 'Palatal Strap',
    vietnameseTerm: 'Bản khẩu cái',
    description: 'A major connector on an upper partial denture that crosses the hard palate in the bicuspid and molar region.',
    explanation: 'Một kết nối chính trên một hàm giả răng trên mở bảng qua vòm miệng cứng ở vùng răng nanh và răng hàm.',
    code: 'RPD0057',
    images: [
      '/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400'
    ],
    category: 'Prosthodontics',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    englishTerm: 'Crown',
    vietnameseTerm: 'Mão răng',
    description: 'A type of dental restoration which completely caps or encircles a tooth or dental implant.',
    explanation: 'Một loại phục hồi nha khoa bao phủ hoàn toàn hoặc bao quanh một răng hoặc cấy ghép nha khoa.',
    code: 'CR001',
    images: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400'
    ],
    category: 'Prosthodontics',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    englishTerm: 'Bridge',
    vietnameseTerm: 'Cầu răng',
    description: 'A fixed dental restoration used to replace one or more missing teeth by joining permanently to adjacent teeth.',
    explanation: 'Một phục hình nha khoa cố định được sử dụng để thay thế một hoặc nhiều răng bị mất bằng cách gắn vĩnh viễn với các răng liền kề.',
    code: 'BR001',
    images: ['https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400'],
    category: 'Prosthodontics',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');
  const [selectedTerm, setSelectedTerm] = useState<DictionaryTerm | null>(sampleTerms[0]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filteredTerms = useMemo(() => {
    return sampleTerms.filter(term => {
      const matchesSearch = 
        term.englishTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.vietnameseTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleTermSelect = (term: DictionaryTerm) => {
    setSelectedTerm(term);
    setSelectedImageIndex(0);
  };

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Từ điển Nha khoa
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tìm hiểu các thuật ngữ chuyên ngành nha khoa song ngữ Việt-Anh
          </p>
        </div>

        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Left Column - Terms List */}
          <div className="w-1/2 flex flex-col">
            {/* Search and Filter Bar */}
            <Card className="mb-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm từ vựng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2 flex-1">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="Prosthodontics">Phục hình</SelectItem>
                          <SelectItem value="Orthodontics">Chỉnh nha</SelectItem>
                          <SelectItem value="Endodontics">Nội nha</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'table' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                      >
                        <Table className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Count */}
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-blue-600">{filteredTerms.length}</span> thuật ngữ
              </p>
            </div>

            {/* Terms List/Table */}
            <Card className="flex-1 overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0 h-full">
                <div className="h-full overflow-y-auto">
                  {viewMode === 'list' ? (
                    <div className="divide-y divide-gray-200">
                      {filteredTerms.map((term) => (
                        <div
                          key={term.id}
                          className={`p-4 cursor-pointer transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-700 ${
                            selectedTerm?.id === term.id ? 'bg-blue-100 dark:bg-gray-600 border-l-4 border-blue-500' : ''
                          }`}
                          onClick={() => handleTermSelect(term)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-blue-600 dark:text-blue-400 text-sm">
                                {term.englishTerm}
                              </h3>
                              <p className="text-gray-800 dark:text-gray-200 text-sm mt-1">
                                {term.vietnameseTerm}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {term.code}
                                </Badge>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <ImageIcon className="w-3 h-3" />
                                  {term.images.length}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <TableComponent>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tiếng Anh</TableHead>
                          <TableHead>Tiếng Việt</TableHead>
                          <TableHead>Mã</TableHead>
                          <TableHead>Ảnh</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTerms.map((term) => (
                          <TableRow
                            key={term.id}
                            className={`cursor-pointer transition-colors ${
                              selectedTerm?.id === term.id ? 'bg-blue-100 dark:bg-gray-600' : ''
                            }`}
                            onClick={() => handleTermSelect(term)}
                          >
                            <TableCell className="font-medium text-blue-600 dark:text-blue-400">
                              {term.englishTerm}
                            </TableCell>
                            <TableCell>{term.vietnameseTerm}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{term.code}</Badge>
                            </TableCell>
                            <TableCell>
                              <span className="flex items-center gap-1 text-sm text-gray-500">
                                <ImageIcon className="w-3 h-3" />
                                {term.images.length}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TableComponent>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detail View */}
          <div className="w-1/2">
            {selectedTerm ? (
              <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {selectedTerm.englishTerm}
                  </CardTitle>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {selectedTerm.vietnameseTerm}
                  </p>
                  <Badge variant="outline" className="w-fit">
                    {selectedTerm.code}
                  </Badge>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Images */}
                    {selectedTerm.images.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Hình ảnh ({selectedTerm.images.length})
                        </h4>
                        
                        {/* Main Image */}
                        <div className="relative">
                          <img
                            src={selectedTerm.images[selectedImageIndex]}
                            alt={selectedTerm.englishTerm}
                            className="w-full h-64 object-cover rounded-lg border border-gray-200 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleImageClick(selectedTerm.images[selectedImageIndex], selectedImageIndex)}
                          />
                          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                            {selectedImageIndex + 1} / {selectedTerm.images.length}
                          </div>
                        </div>

                        {/* Image Thumbnails */}
                        {selectedTerm.images.length > 1 && (
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {selectedTerm.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`${selectedTerm.englishTerm} - ${index + 1}`}
                                className={`w-16 h-16 object-cover rounded border-2 cursor-pointer transition-all ${
                                  selectedImageIndex === index 
                                    ? 'border-blue-500 shadow-md' 
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => setSelectedImageIndex(index)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Mô tả chi tiết:</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {selectedTerm.description}
                      </p>
                    </div>

                    {/* Explanation */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Diễn giải:</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {selectedTerm.explanation}
                      </p>
                    </div>

                    {/* Category */}
                    {selectedTerm.category && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Danh mục: </span>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {selectedTerm.category}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                <CardContent>
                  <div className="text-center text-gray-500">
                    <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Chọn một thuật ngữ để xem chi tiết</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Image Preview Dialog */}
        {selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto rounded-lg"
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
