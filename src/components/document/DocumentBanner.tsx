import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Presentation, 
  File,
  ArrowRight
} from 'lucide-react';
import { FeedDocument } from '@/types/feedDocument';

interface DocumentBannerProps {
  document: FeedDocument;
  onViewDocument: (docId: string) => void;
  className?: string;
}

export function DocumentBanner({ document, onViewDocument, className }: DocumentBannerProps) {
  const getFileIcon = (fileType: string) => {
    const iconClass = "h-8 w-8";
    switch (fileType) {
      case 'docx':
        return <FileText className={`${iconClass} text-blue-600`} />;
      case 'pptx':
        return <Presentation className={`${iconClass} text-orange-600`} />;
      case 'pdf':
        return <File className={`${iconClass} text-red-600`} />;
      default:
        return <File className={`${iconClass} text-gray-600`} />;
    }
  };

  const getFileTypeEmoji = (fileType: string) => {
    switch (fileType) {
      case 'docx':
        return '📄';
      case 'pptx':
        return '📊';
      case 'pdf':
        return '📑';
      default:
        return '📄';
    }
  };

  const getFileTypeLabel = (fileType: string) => {
    switch (fileType) {
      case 'docx':
        return 'Word Document';
      case 'pptx':
        return 'PowerPoint Presentation';
      case 'pdf':
        return 'PDF Document';
      default:
        return 'Document';
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${className}`}>
      <CardContent 
        className="p-6"
        onClick={() => document.status === 'ready' && onViewDocument(document.docID)}
      >
        <div className="flex items-center gap-4">
          {/* File icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-background to-muted border flex items-center justify-center">
              {getFileIcon(document.fileType)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{getFileTypeEmoji(document.fileType)}</span>
              <Badge variant="secondary">
                {getFileTypeLabel(document.fileType)}
              </Badge>
              {document.status === 'processing' && (
                <Badge variant="outline">Processing</Badge>
              )}
            </div>
            
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
              Document: {document.title}
            </h3>
            
            {document.description && (
              <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                {document.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{document.pageCount} pages</span>
              <span>•</span>
              <span>Version {document.version}</span>
              {document.status === 'ready' && (
                <>
                  <span>•</span>
                  <span className="text-primary">Ready to view</span>
                </>
              )}
            </div>
          </div>

          {/* Action */}
          <div className="flex-shrink-0">
            {document.status === 'ready' ? (
              <Button className="gap-2 group-hover:gap-3 transition-all">
                View Document
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="px-4 py-2 rounded-md bg-muted text-muted-foreground text-sm">
                {document.status === 'processing' ? 'Processing...' : 'Unavailable'}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}