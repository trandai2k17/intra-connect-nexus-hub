import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Search, 
  Filter,
  Calendar,
  User,
  Tag,
  Heart,
  MessageCircle
} from 'lucide-react';

export default function NewsArticles() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const articles = [
    {
      id: 1,
      title: 'Thành tựu quý III - Doanh thu tăng trưởng 25%',
      excerpt: 'Quý III/2024 đánh dấu cột mốc quan trọng với doanh thu tăng trưởng 25% so với cùng kỳ năm trước. Các sản phẩm mới đã được thị trường đón nhận tích cực...',
      category: 'Kinh doanh',
      author: 'Nguyễn Minh Khôi',
      publishedAt: '2024-09-02',
      imageUrl: '/lovable-uploads/news-business.jpg',
      tags: ['doanh thu', 'tăng trưởng', 'thành tựu'],
      likes: 45,
      comments: 12,
      readTime: '5 phút'
    },
    {
      id: 2,
      title: 'Ra mắt sản phẩm công nghệ mới - AI Assistant 2.0',
      excerpt: 'Sau 6 tháng phát triển, AI Assistant 2.0 chính thức ra mắt với nhiều tính năng thông minh. Sản phẩm hứa hẹn mang lại trải nghiệm hoàn toàn mới...',
      category: 'Công nghệ',
      author: 'Lê Thị Hương',
      publishedAt: '2024-09-01',
      imageUrl: '/lovable-uploads/news-tech.jpg',
      tags: ['AI', 'công nghệ', 'sản phẩm mới'],
      likes: 38,
      comments: 8,
      readTime: '7 phút'
    },
    {
      id: 3,
      title: 'Hoạt động CSR - Xây dựng trường học tại vùng cao',
      excerpt: 'Chương trình trách nhiệm xã hội của công ty tiếp tục với dự án xây dựng trường học tại Sapa. Dự án được khởi động từ tháng 8 với sự đóng góp của toàn thể nhân viên...',
      category: 'Xã hội',
      author: 'Trần Văn Nam',
      publishedAt: '2024-08-30',
      imageUrl: '/lovable-uploads/news-csr.jpg',
      tags: ['CSR', 'xã hội', 'giáo dục'],
      likes: 62,
      comments: 15,
      readTime: '4 phút'
    },
    {
      id: 4,
      title: 'Đào tạo và phát triển nhân viên - Chương trình Leadership 2024',
      excerpt: 'Chương trình đào tạo lãnh đạo 2024 chính thức khởi động với sự tham gia của 50 nhân viên tiềm năng. Chương trình kéo dài 3 tháng với nhiều hoạt động thực tế...',
      category: 'Nhân sự',
      author: 'Phạm Thu Hà',
      publishedAt: '2024-08-28',
      imageUrl: '/lovable-uploads/news-training.jpg',
      tags: ['đào tạo', 'lãnh đạo', 'phát triển'],
      likes: 29,
      comments: 6,
      readTime: '6 phút'
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Kinh doanh':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Công nghệ':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'Xã hội':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Nhân sự':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              News Articles
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Cập nhật tin tức mới nhất và thông tin hữu ích
            </p>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Write New Article
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-700"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {article.readTime}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.publishedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{article.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{article.comments}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" variant="outline">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try changing your search terms or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}