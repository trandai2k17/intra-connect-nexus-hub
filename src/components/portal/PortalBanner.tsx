import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const PortalBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Hệ thống quản lý mới",
      subtitle: "Nâng cao hiệu quả làm việc",
      description: "Khám phá các tính năng mới trong hệ thống ERP 2024",
      cta: "Tìm hiểu ngay",
      background: "bg-gradient-to-r from-primary/20 to-blue-500/20",
      image: "/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png"
    },
    {
      title: "Đào tạo an toàn lao động",
      subtitle: "Bắt buộc cho toàn bộ nhân viên",
      description: "Hoàn thành khóa học trước ngày 30/12/2024",
      cta: "Đăng ký ngay",
      background: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
      image: "/lovable-uploads/cb0bf27b-00e3-497d-b8d9-ab79e7751d6f.png"
    },
    {
      title: "Chính sách mới 2024",
      subtitle: "Cập nhật quan trọng",
      description: "Xem chi tiết các chính sách và quy định mới nhất",
      cta: "Xem chi tiết",
      background: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
      image: "/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <Card className="relative overflow-hidden h-80 group">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : 
              index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <div className={`h-full ${slide.background} flex items-center relative`}>
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
              <div className="relative z-10 p-8 flex-1">
                <h2 className="text-3xl font-bold text-foreground mb-2">{slide.title}</h2>
                <p className="text-lg text-primary font-semibold mb-3">{slide.subtitle}</p>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed max-w-md">
                  {slide.description}
                </p>
                <Button className="gap-2">
                  {slide.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-30">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/30" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-6" : "bg-background/60"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </Card>
  );
};