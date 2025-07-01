
import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DictionaryCard } from '@/components/dictionary/DictionaryCard';
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
    images: ['/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png'],
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
    images: [],
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
    images: [],
    category: 'Prosthodontics',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Từ điển Nha khoa
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Tìm hiểu các thuật ngữ chuyên ngành nha khoa song ngữ Việt-Anh
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm theo tên tiếng Anh, tiếng Việt, mã số..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="Prosthodontics">Phục hình</SelectItem>
                  <SelectItem value="Orthodontics">Chỉnh nha</SelectItem>
                  <SelectItem value="Endodontics">Nội nha</SelectItem>
                  <SelectItem value="Periodontics">Nha chu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Tìm thấy <span className="font-semibold text-blue-600">{filteredTerms.length}</span> thuật ngữ
          </p>
        </div>

        {/* Terms Grid/List */}
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }
        `}>
          {filteredTerms.map((term) => (
            <div key={term.id} className={viewMode === 'list' ? 'max-w-none' : ''}>
              <DictionaryCard term={term} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
