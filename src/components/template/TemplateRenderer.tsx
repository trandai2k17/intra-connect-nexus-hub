import React from 'react';
import { Template } from '@/types/template';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ExternalLink, Play } from 'lucide-react';

interface TemplateRendererProps {
  template: Template;
  content: {
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
  options?: {
    theme?: 'light' | 'dark' | 'auto';
    showToc?: boolean;
    showAuthor?: boolean;
    bgColor?: string;
    layout?: 'standard' | 'compact' | 'wide';
  };
}

export function TemplateRenderer({ template, content, options }: TemplateRendererProps) {
  const { templateKey } = template;

  // Hero Banner Template
  if (templateKey === 'hero-banner') {
    return (
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg overflow-hidden min-h-[400px]">
        {content.imageUrl && (
          <div className="absolute inset-0">
            <img 
              src={content.imageUrl} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}
        
        <div className="relative z-10 p-8 h-full flex flex-col justify-center text-center">
          <Badge className="mx-auto mb-4 w-fit">Featured Content</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            {content.subContent}
          </p>
          {content.ctaLabel && content.linkUrl && (
            <Button size="lg" className="mx-auto">
              {content.ctaLabel}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Article Standard Template
  if (templateKey === 'article-standard') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Article Header */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
            <p className="text-muted-foreground text-lg">{content.subContent}</p>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Tác giả: Demo Author
              </div>
              <div className="text-sm text-muted-foreground">
                Ngày: {new Date().toLocaleDateString('vi-VN')}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {content.imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={content.imageUrl} 
                alt={content.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: content.textContent }}
          />

          {/* CTA */}
          {content.ctaLabel && content.linkUrl && (
            <div className="pt-6 border-t">
              <Button>
                {content.ctaLabel}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Mục lục</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="text-muted-foreground">• Giới thiệu</div>
              <div className="text-muted-foreground">• Nội dung chính</div>
              <div className="text-muted-foreground">• Kết luận</div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Tài liệu liên quan</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="text-muted-foreground">• Tài liệu A</div>
              <div className="text-muted-foreground">• Tài liệu B</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Card Grid Template
  if (templateKey === 'card-grid') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
          <p className="text-muted-foreground">{content.subContent}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="w-full h-32 bg-muted rounded-md mb-3"></div>
                <h3 className="font-semibold mb-2">Card {i}</h3>
                <p className="text-sm text-muted-foreground">
                  Mô tả ngắn cho card số {i}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {content.ctaLabel && content.linkUrl && (
          <div className="text-center">
            <Button>
              {content.ctaLabel}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    );
  }

  // PDF Viewer Template
  if (templateKey === 'pdf-viewer') {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
            <p className="text-muted-foreground">{content.subContent}</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Tải về PDF
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="w-full h-96 bg-muted rounded-lg flex flex-col items-center justify-center">
              <FileText className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">PDF Viewer Preview</p>
              <p className="text-sm text-muted-foreground mt-2">
                Document: sample-document.pdf
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Tổng số trang</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">2.3MB</div>
              <div className="text-sm text-muted-foreground">Kích thước file</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">PDF</div>
              <div className="text-sm text-muted-foreground">Định dạng</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Slide Presentation Template
  if (templateKey === 'slide-presentation') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
          <p className="text-muted-foreground">{content.subContent}</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex flex-col items-center justify-center">
              <Play className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Slide Presentation</h2>
              <p className="text-muted-foreground text-center max-w-md">
                Nội dung slide sẽ được hiển thị ở đây với navigation controls
              </p>
              <div className="flex gap-2 mt-6">
                <Button variant="outline" size="sm">Trước</Button>
                <Button size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Phát
                </Button>
                <Button variant="outline" size="sm">Tiếp</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Slide 1 / 8
            <div className="w-32 h-1 bg-muted rounded-full">
              <div className="w-4 h-1 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default template
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
        <p className="text-muted-foreground">{content.subContent}</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: content.textContent }}
          />
        </CardContent>
      </Card>

      {content.ctaLabel && content.linkUrl && (
        <div className="text-center">
          <Button>
            {content.ctaLabel}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}