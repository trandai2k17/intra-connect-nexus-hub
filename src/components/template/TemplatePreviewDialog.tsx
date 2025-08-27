import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Template } from '@/types/template';
import { TemplateRenderer } from './TemplateRenderer';
import { Monitor, Tv, Smartphone, Info } from 'lucide-react';

interface TemplatePreviewDialogProps {
  template: Template;
  content?: {
    title: string;
    subContent: string;
    textContent: string;
    imageUrl?: string;
    videoUrl?: string;
    pdfUrl?: string;
    slideUrl?: string;
    ctaLabel?: string;
    linkUrl?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function TemplatePreviewDialog({ 
  template, 
  content,
  isOpen, 
  onClose 
}: TemplatePreviewDialogProps) {
  const defaultContent = {
    title: 'Tiêu đề mẫu cho template',
    subContent: 'Đây là phần tóm tắt ngắn của nội dung, giúp người đọc nắm được ý chính.',
    textContent: `
      <h2>Nội dung chính</h2>
      <p>Đây là phần nội dung chính của bài viết. Template sẽ hiển thị nội dung này theo cách thức đã được thiết kế.</p>
      <p>Nội dung có thể bao gồm:</p>
      <ul>
        <li>Văn bản với định dạng HTML</li>
        <li>Hình ảnh và media</li>
        <li>Liên kết và call-to-action</li>
      </ul>
    `,
    imageUrl: '/images/sample-content.jpg',
    ctaLabel: 'Xem thêm',
    linkUrl: '#'
  };

  const previewContent = content || defaultContent;

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="w-4 h-4" />;
      case 'tv': return <Tv className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Preview: {template.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[80vh]">
          {/* Template Info Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {template.description}
                    </p>
                  </div>

                  {/* Device Support */}
                  {template.metaJson?.deviceSupport && (
                    <div>
                      <div className="text-xs font-medium mb-2 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Hỗ trợ thiết bị:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.metaJson.deviceSupport.map((device) => (
                          <Badge key={device} variant="outline" className="text-xs">
                            {getDeviceIcon(device)}
                            <span className="ml-1 capitalize">{device}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {template.metaJson?.features && (
                    <div>
                      <div className="text-xs font-medium mb-2">Tính năng:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.metaJson.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Slots */}
                  {template.metaJson?.slots && (
                    <div>
                      <div className="text-xs font-medium mb-2">Vùng nội dung:</div>
                      <div className="space-y-1">
                        {template.metaJson.slots.map((slot) => (
                          <div key={slot} className="text-xs text-muted-foreground">
                            • {slot}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Preview */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="p-6 h-full overflow-auto">
                <TemplateRenderer
                  template={template}
                  content={previewContent}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}