import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ExternalLink, BookOpen, Download, Users, Award, Clock, Monitor, Smartphone } from 'lucide-react';
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
      <div className="flex h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          
          <main className="flex-1 overflow-auto">
            {/* Use CSS file styles */}
            <link rel="stylesheet" href="/education-ndx.css" />
            
            <div className="education-container">
              {/* Hero Section */}
              <div className="hero-section">
                <div className="hero-content">
                  <div className="hero-header">
                    <svg className="award-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="6"/>
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                    <h1 className="hero-title">NDX Education Platform</h1>
                  </div>
                  <p className="hero-description">
                    Phát triển thực hành nha khoa thông qua giáo dục chuyên nghiệp. 
                    Truy cập các khóa học đẳng cấp thế giới và học hỏi từ những chuyên gia hàng đầu trong ngành.
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <button className="btn btn-home" onClick={handleHomeClick}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                  Về Trang Chủ
                </button>
                <a href="https://education.nationaldentex.com/home" target="_blank" rel="noopener noreferrer" className="btn btn-external">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Truy Cập NDX Education
                </a>
              </div>

              {/* Main Content Grid */}
              <div className="main-content">
                {/* PDF Guide Section */}
                <div className="pdf-section">
                  <div className="card pdf-card">
                    <div className="card-header">
                      <h2 className="card-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                        Hướng Dẫn Sử Dụng Chính
                      </h2>
                      <p className="card-description">
                        Tài liệu hướng dẫn chi tiết cách sử dụng nền tảng NDX Education
                      </p>
                    </div>
                    <div className="card-content">
                      {/* PDF Embed */}
                      <div className="pdf-container">
                        <iframe
                          src="/lovable-uploads/sample-guide.pdf"
                          className="pdf-iframe"
                          title="NDX Education User Guide">
                          <div className="pdf-fallback">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                            <p>Trình duyệt không hỗ trợ hiển thị PDF</p>
                            <a href="/lovable-uploads/sample-guide.pdf" className="pdf-download-link">
                              Tải xuống để xem tài liệu
                            </a>
                          </div>
                        </iframe>
                      </div>
                      
                      {/* Download Button */}
                      <div className="download-section">
                        <a href="/lovable-uploads/sample-guide.pdf" download className="btn btn-download">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          Tải Xuống Hướng Dẫn PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Panel */}
                <div className="side-panel">
                  {/* Platform Features */}
                  <div className="card features-card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                          <line x1="8" y1="21" x2="16" y2="21"/>
                          <line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                        Tính Năng Nền Tảng
                      </h3>
                    </div>
                    <div className="card-content">
                      <div className="features-list">
                        <div className="feature-item feature-blue">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                          </svg>
                          <div>
                            <div className="feature-title">Webinar Trực Tuyến</div>
                            <div className="feature-description">Học tập tương tác với chuyên gia</div>
                          </div>
                        </div>

                        <div className="feature-item feature-green">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="8" r="6"/>
                            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                          </svg>
                          <div>
                            <div className="feature-title">Khóa Học Trực Tiếp</div>
                            <div className="feature-description">Thực hành với chuyên gia hàng đầu</div>
                          </div>
                        </div>

                        <div className="feature-item feature-purple">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                          </svg>
                          <div>
                            <div className="feature-title">Học Theo Nhu Cầu</div>
                            <div className="feature-description">Khóa học trực tuyến 24/7</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="card links-card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Liên Kết Hữu Ích
                      </h3>
                    </div>
                    <div className="card-content">
                      <a href="https://education.nationaldentex.com/courses" target="_blank" rel="noopener noreferrer" className="link-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                        <div>
                          <div className="link-title">Khóa Học NDX</div>
                          <div className="link-description">Danh sách khóa học</div>
                        </div>
                      </a>

                      <a href="https://education.nationaldentex.com/courses-webinars" target="_blank" rel="noopener noreferrer" className="link-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <div>
                          <div className="link-title">Webinar</div>
                          <div className="link-description">Học trực tuyến tương tác</div>
                        </div>
                      </a>

                      <a href="https://education.nationaldentex.com/courses-in-person" target="_blank" rel="noopener noreferrer" className="link-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="8" r="6"/>
                          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                        </svg>
                        <div>
                          <div className="link-title">Khóa Trực Tiếp</div>
                          <div className="link-description">Học thực hành trực tiếp</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Mobile App Guide */}
                  <div className="card mobile-guide-card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                          <line x1="12" y1="18" x2="12.01" y2="18"/>
                        </svg>
                        Hướng Dẫn Tải App Mobile
                      </h3>
                    </div>
                    <div className="card-content">
                      <div className="mobile-steps">
                        <div className="step-item">
                          <span className="step-number">1</span>
                          <div className="step-content">
                            <div className="step-title">Tải Ứng Dụng</div>
                            <div className="step-description">Google Play Store hoặc Apple App Store</div>
                          </div>
                        </div>

                        <div className="step-item">
                          <span className="step-number">2</span>
                          <div className="step-content">
                            <div className="step-title">Chọn NDX Education</div>
                            <div className="step-description">Tìm và mở ứng dụng</div>
                          </div>
                        </div>

                        <div className="step-item">
                          <span className="step-number">3</span>
                          <div className="step-content">
                            <div className="step-title">Đăng Nhập</div>
                            <div className="step-description">Sử dụng email đã đăng ký</div>
                          </div>
                        </div>

                        <div className="step-item">
                          <span className="step-number">4</span>
                          <div className="step-content">
                            <div className="step-title">Đăng Ký Mới</div>
                            <div className="step-description">Truy cập education.nationaldentex.com</div>
                          </div>
                        </div>
                      </div>

                      <div className="app-store-links">
                        <a href="https://education.nationaldentex.com" target="_blank" rel="noopener noreferrer" className="app-link">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          <span>Tham Gia Cộng Đồng Học Tập</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="cta-section">
                <div className="cta-card">
                  <div className="cta-content">
                    <h2 className="cta-title">Bắt Đầu Hành Trình Học Tập Của Bạn</h2>
                    <p className="cta-description">
                      Tham gia NDX Education để nâng cao kỹ năng chuyên môn và phát triển thực hành nha khoa của bạn
                    </p>
                    <div className="cta-buttons">
                      <a href="https://education.nationaldentex.com/home" target="_blank" rel="noopener noreferrer" className="btn btn-cta-primary">
                        Đăng Ký Ngay
                      </a>
                      <a href="https://education.nationaldentex.com/courses" target="_blank" rel="noopener noreferrer" className="btn btn-cta-secondary">
                        Xem Khóa Học
                      </a>
                    </div>
                  </div>
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