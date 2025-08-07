import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ExternalLink, BookOpen, Download, Users, Award, Clock, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/layout/Header';
import '../styles/education-ndx.css';

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
              <div className="education-hero education-animate-in">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Award className="education-hero__icon" />
                  <h1 className="education-hero__title">
                    NDX Education Platform
                  </h1>
                </div>
                <p className="education-hero__subtitle">
                  Phát triển thực hành nha khoa thông qua giáo dục chuyên nghiệp. 
                  Truy cập các khóa học đẳng cấp thế giới và học hỏi từ những chuyên gia hàng đầu trong ngành.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="education-actions education-animate-in">
                <Button 
                  onClick={handleHomeClick}
                  className="education-btn education-btn--primary"
                >
                  <Home className="w-4 h-4" />
                  Về Trang Chủ
                </Button>
                <a 
                  href="https://education.nationaldentex.com/home" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="education-btn education-btn--gradient"
                >
                  <ExternalLink className="w-4 h-4" />
                  Truy Cập NDX Education
                </a>
              </div>

              {/* Main Content Grid */}
              <div className="education-grid education-grid--main education-animate-in">
                {/* PDF Guide - Takes 2 columns */}
                <div>
                  <div className="education-card h-full">
                    <div className="education-card__header">
                      <h2 className="education-card__title">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        Hướng Dẫn Sử Dụng Chính
                      </h2>
                      <p className="education-card__description">
                        Tài liệu hướng dẫn chi tiết cách sử dụng nền tảng NDX Education
                      </p>
                    </div>
                    <div className="education-card__content space-y-6">
                      {/* PDF Embed */}
                      <div className="education-pdf">
                        <iframe
                          src="/lovable-uploads/sample-guide.pdf"
                          className="education-pdf__iframe"
                          title="NDX Education User Guide"
                        >
                          <div className="education-pdf__fallback">
                            <BookOpen className="education-pdf__fallback-icon" />
                            <p className="education-pdf__fallback-text">
                              Trình duyệt không hỗ trợ hiển thị PDF
                            </p>
                            <a 
                              href="/lovable-uploads/sample-guide.pdf" 
                              className="education-pdf__fallback-link"
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
                    </div>
                  </div>
                </div>

                {/* Platform Features - Takes 1 column */}
                <div className="space-y-6">
                  {/* Platform Overview */}
                  <div className="education-card">
                    <div className="education-card__header">
                      <h3 className="education-card__title">
                        <Monitor className="w-5 h-5 text-purple-600" />
                        Tính Năng Nền Tảng
                      </h3>
                    </div>
                    <div className="education-card__content">
                      <div className="space-y-4">
                        <div className="education-feature education-feature--blue">
                          <Users className="education-feature__icon education-feature__icon--blue" />
                          <div className="education-feature__content">
                            <div className="education-feature__title education-feature__title--blue">Webinar Trực Tuyến</div>
                            <div className="education-feature__description">Học tập tương tác với chuyên gia</div>
                          </div>
                        </div>

                        <div className="education-feature education-feature--green">
                          <Award className="education-feature__icon education-feature__icon--green" />
                          <div className="education-feature__content">
                            <div className="education-feature__title education-feature__title--green">Khóa Học Trực Tiếp</div>
                            <div className="education-feature__description">Thực hành với chuyên gia hàng đầu</div>
                          </div>
                        </div>

                        <div className="education-feature education-feature--purple">
                          <Clock className="education-feature__icon education-feature__icon--purple" />
                          <div className="education-feature__content">
                            <div className="education-feature__title education-feature__title--purple">Học Theo Nhu Cầu</div>
                            <div className="education-feature__description">Khóa học trực tuyến 24/7</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="education-card">
                    <div className="education-card__header">
                      <h3 className="education-card__title">
                        <ExternalLink className="w-5 h-5 text-green-600" />
                        Liên Kết Hữu Ích
                      </h3>
                    </div>
                    <div className="education-card__content space-y-3">
                      <a 
                        href="https://education.nationaldentex.com/courses" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="education-link"
                      >
                        <BookOpen className="education-link__icon education-link__icon--blue" />
                        <div className="education-link__content">
                          <div className="education-link__title">Khóa Học NDX</div>
                          <div className="education-link__description">Danh sách khóa học</div>
                        </div>
                      </a>

                      <a 
                        href="https://education.nationaldentex.com/courses-webinars" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="education-link"
                      >
                        <Users className="education-link__icon education-link__icon--purple" />
                        <div className="education-link__content">
                          <div className="education-link__title">Webinar</div>
                          <div className="education-link__description">Học trực tuyến tương tác</div>
                        </div>
                      </a>

                      <a 
                        href="https://education.nationaldentex.com/courses-in-person" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="education-link"
                      >
                        <Award className="education-link__icon education-link__icon--green" />
                        <div className="education-link__content">
                          <div className="education-link__title">Khóa Trực Tiếp</div>
                          <div className="education-link__description">Học thực hành trực tiếp</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="education-cta education-animate-in">
                <h2 className="education-cta__title">
                  Bắt Đầu Hành Trình Học Tập Của Bạn
                </h2>
                <p className="education-cta__description">
                  Tham gia NDX Education để nâng cao kỹ năng chuyên môn và phát triển thực hành nha khoa của bạn
                </p>
                <div className="education-cta__actions">
                  <a 
                    href="https://education.nationaldentex.com/home" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="education-cta__btn education-cta__btn--primary"
                  >
                    Đăng Ký Ngay
                  </a>
                  <a 
                    href="https://education.nationaldentex.com/courses" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="education-cta__btn education-cta__btn--outline"
                  >
                    Xem Khóa Học
                  </a>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EducationNdx;