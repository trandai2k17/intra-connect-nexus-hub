import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Template, TemplatePreviewData } from '@/types/template';
import { ContentItem } from '@/types/content';
import { TemplatePreviewDialog } from './TemplatePreviewDialog';
import { Search, Eye, Check } from 'lucide-react';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
  currentContent: Partial<ContentItem>;
  selectedTemplateId?: number;
}

export function TemplateSelector({ 
  isOpen, 
  onClose, 
  onSelect, 
  currentContent,
  selectedTemplateId 
}: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Mock templates data - same as TemplateManager
  useEffect(() => {
    const mockTemplates: Template[] = [
      {
        id: 1,
        templateKey: 'hero-banner',
        name: 'Hero Banner',
        description: 'Template banner lớn với hình ảnh nổi bật và CTA',
        viewPath: '/templates/hero-banner',
        thumbnailUrl: '/template-thumbnails/hero-banner.jpg',
        metaJson: {
          slots: ['hero-image', 'title', 'subtitle', 'cta'],
          features: ['responsive', 'video-support', 'overlay-text'],
          deviceSupport: ['desktop', 'tv', 'mobile']
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
        modifiedAt: new Date('2024-01-15')
      },
      {
        id: 2,
        templateKey: 'article-standard',
        name: 'Article Standard',
        description: 'Template bài viết chuẩn với sidebar và TOC',
        viewPath: '/templates/article-standard',
        thumbnailUrl: '/template-thumbnails/article-standard.jpg',
        metaJson: {
          slots: ['title', 'content', 'sidebar', 'toc'],
          features: ['sidebar', 'table-of-contents', 'author-info'],
          deviceSupport: ['desktop', 'mobile']
        },
        isActive: true,
        createdAt: new Date('2024-01-02'),
        modifiedAt: new Date('2024-01-10')
      },
      {
        id: 3,
        templateKey: 'card-grid',
        name: 'Card Grid',
        description: 'Template hiển thị nội dung dạng lưới cards',
        viewPath: '/templates/card-grid',
        thumbnailUrl: '/template-thumbnails/card-grid.jpg',
        metaJson: {
          slots: ['cards', 'header'],
          features: ['grid-layout', 'hover-effects', 'responsive-columns'],
          deviceSupport: ['desktop', 'tv']
        },
        isActive: true,
        createdAt: new Date('2024-01-03'),
        modifiedAt: new Date('2024-01-05')
      },
      {
        id: 4,
        templateKey: 'pdf-viewer',
        name: 'PDF Viewer',
        description: 'Template chuyên dụng cho hiển thị PDF và tài liệu',
        viewPath: '/templates/pdf-viewer',
        thumbnailUrl: '/template-thumbnails/pdf-viewer.jpg',
        metaJson: {
          slots: ['pdf-embed', 'meta-info', 'download-cta'],
          features: ['pdf-embed', 'download-button', 'fullscreen'],
          deviceSupport: ['desktop']
        },
        isActive: true,
        createdAt: new Date('2024-01-04'),
        modifiedAt: new Date('2024-01-08')
      }
    ];
    setTemplates(mockTemplates.filter(t => t.isActive));
  }, []);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const handleSelect = (template: Template) => {
    onSelect(template);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              Chọn Template hiển thị
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Chọn template để hiển thị nội dung "{currentContent.title}"
            </p>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Tìm kiếm template..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto">
              {filteredTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer hover:shadow-md transition-all ${
                    selectedTemplateId === template.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleSelect(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          {template.name}
                          {selectedTemplateId === template.id && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview(template);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Template Thumbnail */}
                    <div className="w-full h-20 bg-muted rounded-md mb-3 flex items-center justify-center">
                      {template.thumbnailUrl ? (
                        <img 
                          src={template.thumbnailUrl} 
                          alt={template.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="text-muted-foreground text-xs">
                          Preview
                        </div>
                      )}
                    </div>
                    
                    {/* Device Support */}
                    {template.metaJson?.deviceSupport && (
                      <div className="flex flex-wrap gap-1">
                        {template.metaJson.deviceSupport.map((device) => (
                          <Badge key={device} variant="outline" className="text-xs">
                            {device}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Không tìm thấy template nào
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      {showPreview && previewTemplate && (
        <TemplatePreviewDialog
          template={previewTemplate}
          content={{
            title: currentContent.title || 'Tiêu đề mẫu',
            subContent: currentContent.subContent || 'Tóm tắt mẫu',
            textContent: currentContent.textContent || 'Nội dung mẫu...',
            imageUrl: currentContent.imageUrl,
            videoUrl: currentContent.videoUrl,
            ctaLabel: currentContent.ctaLabel,
            linkUrl: currentContent.linkUrl
          }}
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setPreviewTemplate(null);
          }}
        />
      )}
    </>
  );
}