
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const newsSlides = [
  {
    id: 1,
    title: "Triển khai hệ thống MES mới cho nhà máy 2",
    description: "Hệ thống quản lý sản xuất thông minh sẽ được triển khai từ tháng 12/2024, giúp tối ưu hóa quy trình sản xuất và theo dõi real-time.",
    image: "/api/placeholder/800/400",
    category: "Sản xuất",
    date: "28/11/2024"
  },
  {
    id: 2,
    title: "Ứng dụng QC Mobile chính thức ra mắt",
    description: "Ứng dụng kiểm tra chất lượng trên thiết bị di động giúp QC team thực hiện kiểm tra nhanh chóng và cập nhật kết quả real-time.",
    image: "/api/placeholder/800/400",
    category: "Chất lượng",
    date: "27/11/2024"
  },
  {
    id: 3,
    title: "Cập nhật chính sách bảo mật IT 2024",
    description: "Các quy định mới về mật khẩu, 2FA và truy cập VPN. Tất cả nhân viên cần đọc và tuân thủ để đảm bảo an toàn thông tin.",
    image: "/api/placeholder/800/400",
    category: "Bảo mật",
    date: "26/11/2024"
  }
];

const announcements = [
  {
    id: 1,
    type: "warning",
    title: "Bảo trì hệ thống ERP",
    message: "Hệ thống ERP sẽ bảo trì từ 22:00 hôm nay đến 02:00 ngày mai",
    time: "19:00 - 29/11/2024"
  },
  {
    id: 2,
    type: "danger",
    title: "Cảnh báo Phishing",
    message: "Phát hiện email giả mạo từ domain hr-company.net. Không click vào link",
    time: "14:30 - 29/11/2024"
  },
  {
    id: 3,
    type: "info",
    title: "Đào tạo Office 365",
    message: "Khóa đào tạo Teams & SharePoint sẽ diễn ra vào 9:00 ngày 02/12",
    time: "10:00 - 29/11/2024"
  },
  {
    id: 4,
    type: "success",
    title: "Server mới đã sẵn sàng",
    message: "Server backup mới đã được cài đặt và test thành công",
    time: "08:15 - 29/11/2024"
  }
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length);
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "danger": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getAnnouncementBg = (type: string) => {
    switch (type) {
      case "warning": return "border-l-amber-400 bg-amber-50";
      case "danger": return "border-l-red-400 bg-red-50";
      case "success": return "border-l-green-400 bg-green-50";
      default: return "border-l-blue-400 bg-blue-50";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* News Slider */}
      <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-white/20 shadow-xl">
        <div className="relative h-80">
          {newsSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <Badge className="mb-3 bg-intranet-primary/90 text-white">
                    {slide.category}
                  </Badge>
                  <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-gray-200 mb-4 line-clamp-2">
                    {slide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{slide.date}</span>
                    <Button 
                      size="sm" 
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white animate-slide-up"
                    >
                      Khám phá <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {newsSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Important Announcements */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-intranet-gray-800 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-intranet-warning" />
            Thông báo quan trọng
          </h3>
        </div>
        <div className="h-72 overflow-hidden relative">
          <div className="animate-scroll-up">
            {[...announcements, ...announcements].map((announcement, index) => (
              <div
                key={`${announcement.id}-${index}`}
                className={`p-4 mx-4 my-2 rounded-lg border-l-4 ${getAnnouncementBg(announcement.type)} transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start space-x-3">
                  {getAnnouncementIcon(announcement.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-intranet-gray-800 truncate">
                      {announcement.title}
                    </h4>
                    <p className="text-xs text-intranet-gray-600 mt-1 line-clamp-2">
                      {announcement.message}
                    </p>
                    <p className="text-xs text-intranet-gray-400 mt-2">
                      {announcement.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
