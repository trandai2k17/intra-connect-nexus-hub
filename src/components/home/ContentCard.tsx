import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, Image as ImageIcon, ExternalLink, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ContentCardProps {
  content: {
    recId: number;
    title: string;
    subContent: string;
    contentType: 'Banner' | 'Promotion' | 'Policy' | 'Announcement' | 'Document' | 'Campaign';
    textContent: string;
    pdfUrl?: string;
    videoUrl?: string;
    imageUrl?: string;
    ctaLabel?: string;
    category: string;
    priority: number;
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
  };
  variant?: 'default' | 'compact' | 'hero';
}

export function ContentCard({ content, variant = 'default' }: ContentCardProps) {
  const navigate = useNavigate();

  const getContentTypeColor = (type: string) => {
    const colors = {
      Banner: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Promotion: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Policy: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Announcement: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      Document: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      Campaign: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[type as keyof typeof colors] || colors.Document;
  };

  const getContentIcon = () => {
    if (content.videoUrl) return <Video className="w-5 h-5" />;
    if (content.pdfUrl) return <FileText className="w-5 h-5" />;
    if (content.imageUrl) return <ImageIcon className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  const handleViewContent = () => {
    navigate(`/content/view/${content.recId}`);
  };

  if (variant === 'hero') {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white">
        {content.imageUrl && (
          <div className="absolute inset-0 opacity-20">
            <img 
              src={content.imageUrl} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardContent className="relative p-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {content.contentType}
            </Badge>
            {content.endDate && (
              <div className="flex items-center gap-1 text-sm text-white/80">
                <Calendar className="w-4 h-4" />
                Valid until {content.endDate.toLocaleDateString()}
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-3">{content.title}</h2>
          <p className="text-white/90 mb-6 text-lg">{content.subContent}</p>
          
          <Button 
            onClick={handleViewContent}
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            {content.ctaLabel || 'View Details'}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleViewContent}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted">
              {getContentIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={getContentTypeColor(content.contentType)} variant="secondary">
                  {content.contentType}
                </Badge>
              </div>
              <h3 className="font-medium text-sm line-clamp-2 mb-1">{content.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{content.subContent}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge className={getContentTypeColor(content.contentType)}>
              {content.contentType}
            </Badge>
            <Badge variant="outline">{content.category}</Badge>
          </div>
          {content.endDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {content.endDate.toLocaleDateString()}
            </div>
          )}
        </div>
        
        <CardTitle className="text-lg line-clamp-2">{content.title}</CardTitle>
      </CardHeader>

      {content.imageUrl && (
        <div className="px-6 pb-3">
          <img 
            src={content.imageUrl} 
            alt={content.title}
            className="w-full h-32 object-cover rounded-md"
          />
        </div>
      )}

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {content.subContent}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {getContentIcon()}
            <span>
              {content.videoUrl && 'Video'}
              {content.pdfUrl && 'PDF Document'}
              {!content.videoUrl && !content.pdfUrl && 'Article'}
            </span>
          </div>

          <Button size="sm" onClick={handleViewContent}>
            {content.ctaLabel || 'View'}
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}