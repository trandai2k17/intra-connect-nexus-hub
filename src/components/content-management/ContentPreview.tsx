import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface PreviewData {
  title: string;
  subContent: string;
  contentType: 'Header' | 'Banner' | 'Tile';
  textContent: string;
  linkUrl?: string;
  openInNewTab?: boolean;
  imageUrl?: string;
  videoUrl?: string;
  ctaLabel?: string;
  priority: 'High' | 'Normal' | 'Low';
  theme: 'Light' | 'Dark' | 'Auto';
  aspectRatio: '16:9' | '4:3' | '1:1';
  deviceTarget: 'Desktop' | 'TV' | 'Both';
  category: 'Policy' | 'Announcement' | 'Document';
  isActive: boolean;
}

interface ContentPreviewProps {
  data: PreviewData;
}

export function ContentPreview({ data }: ContentPreviewProps) {
  const getThemeClasses = () => {
    switch (data.theme) {
      case 'Dark':
        return 'bg-gray-900 text-white';
      case 'Light':
        return 'bg-white text-gray-900';
      default:
        return 'bg-background text-foreground';
    }
  };

  const getPriorityColor = () => {
    switch (data.priority) {
      case 'High':
        return 'border-l-red-500';
      case 'Normal':
        return 'border-l-blue-500';
      case 'Low':
        return 'border-l-yellow-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const getAspectRatioClass = () => {
    switch (data.aspectRatio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square';
      default:
        return 'aspect-video';
    }
  };

  if (data.contentType === 'Header') {
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">
          Preview as Header (Ticker Style)
        </div>
        <div className={`p-4 rounded-lg border-l-4 ${getPriorityColor()} ${getThemeClasses()}`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{data.title}</h3>
              {data.subContent && (
                <p className="text-sm opacity-80 mt-1">{data.subContent}</p>
              )}
              {data.textContent && (
                <div 
                  className="text-sm mt-2 opacity-90"
                  dangerouslySetInnerHTML={{ __html: data.textContent }}
                />
              )}
            </div>
            {data.ctaLabel && data.linkUrl && (
              <Button size="sm" variant="outline" className="ml-4">
                {data.ctaLabel}
                {data.openInNewTab && <ExternalLink className="w-3 h-3 ml-1" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (data.contentType === 'Banner') {
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">
          Preview as Banner
        </div>
        <Card className={`overflow-hidden ${getThemeClasses()}`}>
          <div className={`relative ${getAspectRatioClass()}`}>
            {data.videoUrl ? (
              <iframe
                src={data.videoUrl}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt={data.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No media</span>
              </div>
            )}
            
            {/* Overlay content */}
            <div className="absolute inset-0 bg-black/40 flex items-end">
              <div className="p-6 text-white w-full">
                <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
                {data.subContent && (
                  <p className="text-lg opacity-90 mb-3">{data.subContent}</p>
                )}
                {data.ctaLabel && data.linkUrl && (
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                    {data.ctaLabel}
                    {data.openInNewTab && <ExternalLink className="w-4 h-4 ml-2" />}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (data.contentType === 'Tile') {
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">
          Preview as Tile
        </div>
        <Card className={`max-w-sm ${getThemeClasses()}`}>
          {(data.imageUrl || data.videoUrl) && (
            <div className={`relative ${getAspectRatioClass()}`}>
              {data.videoUrl ? (
                <iframe
                  src={data.videoUrl}
                  className="absolute inset-0 w-full h-full rounded-t-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : data.imageUrl ? (
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              ) : null}
            </div>
          )}
          
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{data.title}</h3>
              <Badge variant="outline" className="text-xs">
                {data.category}
              </Badge>
            </div>
            
            {data.subContent && (
              <p className="text-sm opacity-80 mb-3">{data.subContent}</p>
            )}
            
            {data.textContent && (
              <div 
                className="text-sm mb-4 opacity-90"
                dangerouslySetInnerHTML={{ __html: data.textContent }}
              />
            )}
            
            {data.ctaLabel && data.linkUrl && (
              <Button className="w-full">
                {data.ctaLabel}
                {data.openInNewTab && <ExternalLink className="w-4 h-4 ml-2" />}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="text-center text-muted-foreground">
      <p>Preview không khả dụng cho loại nội dung này</p>
    </div>
  );
}