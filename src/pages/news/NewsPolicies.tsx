import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, 
  Search, 
  Filter,
  Calendar,
  User,
  FileText,
  Download,
  Eye
} from 'lucide-react';

export default function NewsPolicies() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const policies = [
    {
      id: 1,
      title: 'Quy định chấm công và làm việc từ xa',
      description: 'Quy định mới về việc chấm công, giờ làm việc và chế độ làm việc từ xa hiệu quả từ 01/09/2024',
      department: 'Nhân sự',
      category: 'HR',
      effectiveDate: '2024-09-01',
      version: 'v2.1',
      status: 'active',
      author: 'Nguyễn Thị Hoa',
      lastUpdated: '2024-08-25',
      downloads: 156,
      views: 892
    },
    {
      id: 2,
      title: 'Chính sách bảo mật thông tin',
      description: 'Quy định về bảo mật thông tin, sử dụng thiết bị công ty và truy cập dữ liệu nhạy cảm',
      department: 'IT',
      category: 'Security',
      effectiveDate: '2024-08-15',
      version: 'v3.0',
      status: 'active',
      author: 'Trần Văn Minh',
      lastUpdated: '2024-08-10',
      downloads: 203,
      views: 1247
    },
    {
      id: 3,
      title: 'Quy trình xin nghỉ phép và nghỉ ốm',
      description: 'Hướng dẫn chi tiết về quy trình đăng ký nghỉ phép, nghỉ ốm và các loại nghỉ đặc biệt',
      department: 'Nhân sự',
      category: 'HR',
      effectiveDate: '2024-07-01',
      version: 'v1.5',
      status: 'active',
      author: 'Lê Thị Mai',
      lastUpdated: '2024-06-28',
      downloads: 287,
      views: 1564
    },
    {
      id: 4,
      title: 'Quy định về trang phục và ứng xử',
      description: 'Tiêu chuẩn về trang phục, cách ứng xử với khách hàng và đồng nghiệp trong môi trường làm việc',
      department: 'Hành chính',
      category: 'General',
      effectiveDate: '2024-06-01',
      version: 'v1.2',
      status: 'active',
      author: 'Phạm Văn Đức',
      lastUpdated: '2024-05-25',
      downloads: 98,
      views: 543
    },
    {
      id: 5,
      title: 'Chính sách chi tiêu và hoàn thuế',
      description: 'Quy định về việc chi tiêu công tác, hoàn thuế và quản lý ngân sách phòng ban',
      department: 'Tài chính',
      category: 'Finance',
      effectiveDate: '2024-05-15',
      version: 'v2.3',
      status: 'active',
      author: 'Vũ Thị Lan',
      lastUpdated: '2024-05-10',
      downloads: 134,
      views: 789
    },
    {
      id: 6,
      title: 'Quy định cũ về giờ làm việc',
      description: 'Quy định cũ về giờ làm việc đã được thay thế bởi quy định mới',
      department: 'Nhân sự',
      category: 'HR',
      effectiveDate: '2024-01-01',
      version: 'v1.0',
      status: 'archived',
      author: 'Nguyễn Văn A',
      lastUpdated: '2024-01-01',
      downloads: 45,
      views: 234
    }
  ];

  const activePolicies = policies.filter(policy => policy.status === 'active');
  const archivedPolicies = policies.filter(policy => policy.status === 'archived');

  const getFilteredPolicies = (policyList: typeof policies) => {
    return policyList.filter(policy =>
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'HR':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Security':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'Finance':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'General':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const PolicyCard = ({ policy }: { policy: typeof policies[0] }) => (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {policy.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {policy.description}
            </p>
          </div>
          <div className="flex gap-2 ml-4">
            <Badge className={getCategoryColor(policy.category)}>
              {policy.category}
            </Badge>
            <Badge className={getStatusColor(policy.status)}>
              {policy.status === 'active' ? 'Hiệu lực' : 'Lưu trữ'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{policy.department}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{policy.effectiveDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{policy.version}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{policy.views} lượt xem</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span>Tác giả: </span>
            <span className="font-medium">{policy.author}</span>
            <span className="mx-2">•</span>
            <span>Cập nhật: {policy.lastUpdated}</span>
          </div>
          <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download ({policy.downloads})
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                View Details
              </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Policies & Regulations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Tổng hợp các quy định, chính sách của công ty từ các phòng ban
            </p>
          </div>
          <Button className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700">
            <Book className="w-4 h-4 mr-2" />
            Create New Policy
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search policies..."
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

        {/* Policies Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Active Policies ({activePolicies.length})
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              Archived ({archivedPolicies.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {getFilteredPolicies(activePolicies).map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
            {getFilteredPolicies(activePolicies).length === 0 && (
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No policies found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try changing your search terms
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="archived" className="space-y-6">
            {getFilteredPolicies(archivedPolicies).map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
            {getFilteredPolicies(archivedPolicies).length === 0 && (
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No archived policies
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Expired policies will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}