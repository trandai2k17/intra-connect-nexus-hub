import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Template } from '@/types/template';
import { TemplatePreviewDialog } from './TemplatePreviewDialog';
import { TemplateEditor } from './TemplateEditor';
import { Plus, Search, Edit, Eye, Settings } from 'lucide-react';

interface TemplateManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TemplateManager({ isOpen, onClose }: TemplateManagerProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // Mock templates data
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
      },
      {
        id: 5,
        templateKey: 'slide-presentation',
        name: 'Slide Presentation',
        description: 'Template cho slide presentation với navigation',
        viewPath: '/templates/slide-presentation',
        thumbnailUrl: '/template-thumbnails/slide-presentation.jpg',
        metaJson: {
          slots: ['slides', 'navigation', 'progress'],
          features: ['slide-navigation', 'fullscreen', 'autoplay'],
          deviceSupport: ['desktop', 'tv']
        },
        isActive: false,
        createdAt: new Date('2024-01-05'),
        modifiedAt: new Date('2024-01-05')
      }
    ];
    setTemplates(mockTemplates);
  }, []);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setShowEditor(true);
  };

  const handleSaveTemplate = (templateData: Partial<Template>) => {
    if (selectedTemplate) {
      // Update existing
      setTemplates(prev => prev.map(t => 
        t.id === selectedTemplate.id 
          ? { ...t, ...templateData, modifiedAt: new Date() }
          : t
      ));
    } else {
      // Create new
      const newTemplate: Template = {
        id: Math.max(...templates.map(t => t.id), 0) + 1,
        createdAt: new Date(),
        modifiedAt: new Date(),
        ...templateData
      } as Template;
      setTemplates(prev => [...prev, newTemplate]);
    }
    setShowEditor(false);
    setSelectedTemplate(null);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quản lý Template
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm template..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={() => {
                  setSelectedTemplate(null);
                  setShowEditor(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm Template
              </Button>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          {template.name}
                        </CardTitle>
                        <Badge 
                          variant={template.isActive ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {template.isActive ? 'Hoạt động' : 'Tạm dừng'}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(template)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(template)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Template Thumbnail */}
                    <div className="w-full h-24 bg-muted rounded-md mb-3 flex items-center justify-center">
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
                    
                    <p className="text-xs text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    
                    {/* Features */}
                    {template.metaJson?.features && (
                      <div className="space-y-2">
                        <div className="text-xs font-medium">Tính năng:</div>
                        <div className="flex flex-wrap gap-1">
                          {template.metaJson.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
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
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      {showPreview && selectedTemplate && (
        <TemplatePreviewDialog
          template={selectedTemplate}
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setSelectedTemplate(null);
          }}
        />
      )}

      {/* Editor Dialog */}
      {showEditor && (
        <TemplateEditor
          template={selectedTemplate}
          isOpen={showEditor}
          onClose={() => {
            setShowEditor(false);
            setSelectedTemplate(null);
          }}
          onSave={handleSaveTemplate}
        />
      )}
    </>
  );
}