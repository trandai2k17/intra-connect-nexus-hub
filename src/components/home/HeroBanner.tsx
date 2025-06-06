
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, AlertTriangle, Info, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  const newsSlides = [
    {
      id: 1,
      title: t('banner.news.title1'),
      description: t('banner.news.desc1'),
      image: "/api/placeholder/600/400",
      category: t('banner.news.category1'),
      date: "28/11/2024"
    },
    {
      id: 2,
      title: t('banner.news.title2'),
      description: t('banner.news.desc2'),
      image: "/api/placeholder/600/400",
      category: t('banner.news.category2'),
      date: "27/11/2024"
    },
    {
      id: 3,
      title: t('banner.news.title3'),
      description: t('banner.news.desc3'),
      image: "/api/placeholder/600/400",
      category: t('banner.news.category3'),
      date: "26/11/2024"
    }
  ];

  const sideWindows = [
    {
      id: 1,
      title: t('banner.window.title1'),
      content: t('banner.window.content1'),
      type: "warning",
      time: "19:00 - 29/11/2024"
    },
    {
      id: 2,
      title: t('banner.window.title2'),
      content: t('banner.window.content2'),
      type: "danger",
      time: "14:30 - 29/11/2024"
    },
    {
      id: 3,
      title: t('banner.window.title3'),
      content: t('banner.window.content3'),
      type: "info",
      time: "10:00 - 29/11/2024"
    },
    {
      id: 4,
      title: t('banner.window.title4'),
      content: t('banner.window.content4'),
      type: "success",
      time: "08:15 - 29/11/2024"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [newsSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length);
  };

  const getWindowIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "danger": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getWindowBg = (type: string) => {
    switch (type) {
      case "warning": return "bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200";
      case "danger": return "bg-gradient-to-br from-red-50 to-red-100/50 border-red-200";
      case "success": return "bg-gradient-to-br from-green-50 to-green-100/50 border-green-200";
      default: return "bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Main News Window */}
      <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-xl">
        <div className="relative h-96">
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
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <Badge className="mb-4 bg-blue-600/90 text-white">
                    {slide.category}
                  </Badge>
                  <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-gray-200 mb-6 line-clamp-2 text-lg">
                    {slide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{slide.date}</span>
                    <Button 
                      size="sm" 
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
                    >
                      {t('banner.explore')} <ArrowRight className="w-4 h-4 ml-1" />
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {newsSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Side Windows Grid */}
      <div className="grid grid-cols-2 gap-3">
        {sideWindows.map((window) => (
          <div
            key={window.id}
            className={`p-4 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${getWindowBg(window.type)}`}
          >
            <div className="flex items-start space-x-3 mb-3">
              {getWindowIcon(window.type)}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 group-hover:text-gray-900">
                  {window.title}
                </h4>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-gray-600 mb-3 line-clamp-3">
              {window.content}
            </p>
            <p className="text-xs text-gray-400">
              {window.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
