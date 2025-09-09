import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EducationNdx = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <svg className="text-yellow-500" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="6"/>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">NDX Education Platform</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Phát triển thực hành nha khoa thông qua giáo dục chuyên nghiệp. 
              Truy cập các khóa học đẳng cấp thế giới và học hỏi từ những chuyên gia hàng đầu trong ngành.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button onClick={handleHomeClick} variant="default" className="inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            Về Trang Chủ
          </Button>
          <Button asChild variant="secondary">
            <a href="https://education.nationaldentex.com/home" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Truy Cập NDX Education
            </a>
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PDF Guide Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                  Hướng Dẫn Sử Dụng Chính
                </CardTitle>
                <p className="text-muted-foreground">
                  Tài liệu hướng dẫn chi tiết cách sử dụng nền tảng NDX Education
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* PDF Embed */}
                <div className="border border-border rounded-md overflow-hidden h-96">
                  <iframe
                    src="/lovable-uploads/sample-guide.pdf"
                    className="w-full h-full"
                    title="NDX Education User Guide"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      </svg>
                      <p>Trình duyệt không hỗ trợ hiển thị PDF</p>
                      <Button asChild variant="outline" className="mt-2">
                        <a href="/lovable-uploads/sample-guide.pdf">
                          Tải xuống để xem tài liệu
                        </a>
                      </Button>
                    </div>
                  </iframe>
                </div>
                
                {/* Download Button */}
                <Button asChild variant="outline" className="w-full">
                  <a href="/lovable-uploads/sample-guide.pdf" download className="inline-flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Tải Xuống Hướng Dẫn PDF
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Platform Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  Tính Năng Nền Tảng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500 mt-0.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-sm">Webinar Trực Tuyến</div>
                      <div className="text-sm text-muted-foreground">Học tập tương tác với chuyên gia</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 mt-0.5">
                      <circle cx="12" cy="8" r="6"/>
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-sm">Khóa Học Trực Tiếp</div>
                      <div className="text-sm text-muted-foreground">Thực hành với chuyên gia hàng đầu</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500 mt-0.5">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-sm">Học Theo Nhu Cầu</div>
                      <div className="text-sm text-muted-foreground">Khóa học trực tuyến 24/7</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* External Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Liên Kết Hữu Ích
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start h-auto p-3">
                    <a href="https://education.nationaldentex.com/courses" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold text-sm">Khóa Học NDX</div>
                        <div className="text-sm text-muted-foreground">Danh sách khóa học</div>
                      </div>
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="w-full justify-start h-auto p-3">
                    <a href="https://education.nationaldentex.com/courses-webinars" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold text-sm">Webinar</div>
                        <div className="text-sm text-muted-foreground">Học trực tuyến tương tác</div>
                      </div>
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="w-full justify-start h-auto p-3">
                    <a href="https://education.nationaldentex.com/courses-in-person" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5">
                        <circle cx="12" cy="8" r="6"/>
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold text-sm">Khóa Trực Tiếp</div>
                        <div className="text-sm text-muted-foreground">Học thực hành trực tiếp</div>
                      </div>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mobile App Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                  Hướng Dẫn Tải App Mobile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Tải Ứng Dụng", desc: "Google Play Store hoặc Apple App Store" },
                    { step: 2, title: "Chọn NDX Education", desc: "Tìm và mở ứng dụng" },
                    { step: 3, title: "Đăng Nhập", desc: "Sử dụng email đã đăng ký" },
                    { step: 4, title: "Đăng Ký Mới", desc: "Truy cập education.nationaldentex.com" }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold mt-0.5">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full mt-4">
                  <a href="https://education.nationaldentex.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15,3 21,3 21,9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    <span>Tham Gia Cộng Đồng Học Tập</span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Bắt Đầu Hành Trình Học Tập Của Bạn</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Tham gia NDX Education để nâng cao kỹ năng chuyên môn và phát triển thực hành nha khoa của bạn
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="secondary">
                <a href="https://education.nationaldentex.com/home" target="_blank" rel="noopener noreferrer">
                  Đăng Ký Ngay
                </a>
              </Button>
              <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <a href="https://education.nationaldentex.com/courses" target="_blank" rel="noopener noreferrer">
                  Xem Khóa Học
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducationNdx;