import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ExternalLink, BookOpen, Download, Users, Award, Clock, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/layout/Header';

const EducationNdx = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Hero Section */}
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <Award className="w-10 h-10 text-blue-600" />
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    NDX Education Platform
                  </h1>
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Phát triển thực hành nha khoa thông qua giáo dục chuyên nghiệp. 
                  Truy cập các khóa học đẳng cấp thế giới và học hỏi từ những chuyên gia hàng đầu trong ngành.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center gap-4 mb-8">
                <Button 
                  onClick={handleHomeClick}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Home className="w-4 h-4" />
                  Về Trang Chủ
                </Button>
                <Button 
                  asChild
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <a 
                    href="https://education.nationaldentex.com/home" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Truy Cập NDX Education
                  </a>
                </Button>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* PDF Guide - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        Hướng Dẫn Sử Dụng Chính
                      </CardTitle>
                      <CardDescription className="text-lg">
                        Tài liệu hướng dẫn chi tiết cách sử dụng nền tảng NDX Education
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* PDF Embed */}
                      <div className="border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 h-[500px]">
                        <iframe
                          src="/lovable-uploads/sample-guide.pdf"
                          className="w-full h-full"
                          title="NDX Education User Guide"
                        >
                          <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <BookOpen className="w-16 h-16 text-blue-400 mb-4" />
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                              Trình duyệt không hỗ trợ hiển thị PDF
                            </p>
                            <a 
                              href="/lovable-uploads/sample-guide.pdf" 
                              className="text-blue-600 hover:underline font-medium"
                            >
                              Tải xuống để xem tài liệu
                            </a>
                          </div>
                        </iframe>
                      </div>
                      
                      {/* Download Button */}
                      <div className="flex justify-center">
                        <Button variant="outline" asChild className="text-lg px-8 py-6">
                          <a 
                            href="/lovable-uploads/sample-guide.pdf" 
                            download
                            className="flex items-center gap-3"
                          >
                            <Download className="w-5 h-5" />
                            Tải Xuống Hướng Dẫn PDF
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Platform Features - Takes 1 column */}
                <div className="space-y-6">
                  {/* Platform Overview */}
                  <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-purple-600" />
                        Tính Năng Nền Tảng
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-blue-900 dark:text-blue-100">Webinar Trực Tuyến</div>
                            <div className="text-sm text-blue-700 dark:text-blue-300">Học tập tương tác với chuyên gia</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                          <Award className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-green-900 dark:text-green-100">Khóa Học Trực Tiếp</div>
                            <div className="text-sm text-green-700 dark:text-green-300">Thực hành với chuyên gia hàng đầu</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                          <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-purple-900 dark:text-purple-100">Học Theo Nhu Cầu</div>
                            <div className="text-sm text-purple-700 dark:text-purple-300">Khóa học trực tuyến 24/7</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* External Links */}
                  <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 text-green-600" />
                        Liên Kết Hữu Ích
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="ghost" asChild className="w-full justify-start h-auto p-4">
                        <a 
                          href="https://education.nationaldentex.com/courses" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <div className="text-left">
                            <div className="font-medium">Khóa Học NDX</div>
                            <div className="text-sm text-gray-500">Danh sách khóa học</div>
                          </div>
                        </a>
                      </Button>

                      <Button variant="ghost" asChild className="w-full justify-start h-auto p-4">
                        <a 
                          href="https://education.nationaldentex.com/courses-webinars" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <Users className="w-4 h-4 text-purple-600" />
                          <div className="text-left">
                            <div className="font-medium">Webinar</div>
                            <div className="text-sm text-gray-500">Học trực tuyến tương tác</div>
                          </div>
                        </a>
                      </Button>

                      <Button variant="ghost" asChild className="w-full justify-start h-auto p-4">
                        <a 
                          href="https://education.nationaldentex.com/courses-in-person" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <Award className="w-4 h-4 text-green-600" />
                          <div className="text-left">
                            <div className="font-medium">Khóa Trực Tiếp</div>
                            <div className="text-sm text-gray-500">Học thực hành trực tiếp</div>
                          </div>
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Call to Action */}
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
                <CardContent className="text-center py-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Bắt Đầu Hành Trình Học Tập Của Bạn
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Tham gia NDX Education để nâng cao kỹ năng chuyên môn và phát triển thực hành nha khoa của bạn
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8"
                      asChild
                    >
                      <a 
                        href="https://education.nationaldentex.com/home" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Đăng Ký Ngay
                      </a>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8"
                      asChild
                    >
                      <a 
                        href="https://education.nationaldentex.com/courses" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Xem Khóa Học
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EducationNdx;