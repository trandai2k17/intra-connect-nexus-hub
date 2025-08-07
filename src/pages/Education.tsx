
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ExternalLink, BookOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/layout/Header';

const Education = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header Section */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Tài Liệu Hướng Dẫn
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Truy cập các tài liệu hướng dẫn và tài nguyên học tập
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center mb-6">
                <Button 
                  onClick={handleHomeClick}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Home className="w-4 h-4" />
                  Về Trang Chủ
                </Button>
              </div>

              {/* Main Content Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* PDF Viewer Section */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Tài Liệu PDF Hướng Dẫn
                    </CardTitle>
                    <CardDescription>
                      Xem và tải xuống tài liệu hướng dẫn chi tiết
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* PDF Embed */}
                    <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700 h-96">
                      <iframe
                        src="/lovable-uploads/sample-guide.pdf"
                        className="w-full h-full"
                        title="Tài liệu hướng dẫn"
                      >
                        <p className="text-center text-gray-500 py-8">
                          Trình duyệt không hỗ trợ hiển thị PDF. 
                          <a href="/lovable-uploads/sample-guide.pdf" className="text-blue-600 hover:underline ml-1">
                            Tải xuống tại đây
                          </a>
                        </p>
                      </iframe>
                    </div>
                    
                    {/* Download Button */}
                    <div className="flex justify-center">
                      <Button variant="outline" asChild>
                        <a 
                          href="/lovable-uploads/sample-guide.pdf" 
                          download
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Tải Xuống PDF
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links Section */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-green-600" />
                      Liên Kết Truy Cập
                    </CardTitle>
                    <CardDescription>
                      Các liên kết hữu ích và tài nguyên bổ sung
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {/* External Links */}
                      <Button variant="ghost" asChild className="w-full justify-start h-auto p-4">
                        <a 
                          href="https://docs.lovable.dev/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-600" />
                          <div className="text-left">
                            <div className="font-medium">Tài Liệu Lovable</div>
                            <div className="text-sm text-gray-500">Hướng dẫn chi tiết về Lovable</div>
                          </div>
                        </a>
                      </Button>

                      <Button variant="ghost" asChild className="w-full justify-start h-auto p-4">
                        <a 
                          href="https://ui.shadcn.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                          <div className="text-left">
                            <div className="font-medium">Shadcn/UI Components</div>
                            <div className="text-sm text-gray-500">Thư viện component UI</div>
                          </div>
                        </a>
                      </Button>

                      <Button variant="ghost" asChild className="w-full justify-start h-auto p-4">
                        <a 
                          href="https://tailwindcss.com/docs" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <ExternalLink className="w-4 h-4 text-cyan-600" />
                          <div className="text-left">
                            <div className="font-medium">Tailwind CSS Docs</div>
                            <div className="text-sm text-gray-500">Tài liệu CSS framework</div>
                          </div>
                        </a>
                      </Button>

                      <Button variant="ghost" asChild className="w-full justify-start h-auto p-4">
                        <a 
                          href="https://reactjs.org/docs" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-400" />
                          <div className="text-left">
                            <div className="font-medium">React Documentation</div>
                            <div className="text-sm text-gray-500">Tài liệu React JS</div>
                          </div>
                        </a>
                      </Button>
                    </div>

                    {/* Internal Navigation */}
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Điều Hướng Nội Bộ
                      </h4>
                      <div className="space-y-2">
                        <Button variant="outline" onClick={() => navigate('/library')} className="w-full justify-start">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Thư Viện Components
                        </Button>
                        
                        <Button variant="outline" onClick={() => navigate('/dictionary')} className="w-full justify-start">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Từ Điển
                        </Button>
                        
                        <Button variant="outline" onClick={() => navigate('/software-application')} className="w-full justify-start">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Ứng Dụng Phần Mềm
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Education;
