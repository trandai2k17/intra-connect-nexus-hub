import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Presentation, 
  File, 
  Eye,
  Download,
  Calendar
} from 'lucide-react';
import { FeedDocument, FeedDocumentPage } from '@/types/feedDocument';
import { format } from 'date-fns';

interface DocumentCardProps {
  document: FeedDocument;
  pages: FeedDocumentPage[];
  onViewDocument: (docId: string) => void;
  onDownload?: (docId: string) => void;
  className?: string;
}

export function DocumentCard({ document, pages, onViewDocument, onDownload, className }: DocumentCardProps) {
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'pptx':
        return <Presentation className="h-5 w-5 text-orange-600" />;
      case 'pdf':
        return <File className="h-5 w-5 text-red-600" />;
      default:
        return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getFileTypeLabel = (fileType: string) => {
    switch (fileType) {
      case 'docx':
        return 'Word';
      case 'pptx':
        return 'PowerPoint';
      case 'pdf':
        return 'PDF';
      default:
        return 'Document';
    }
  };

  // Get first 3 pages for preview
  const previewPages = pages.slice(0, 3);

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardContent className="p-4">
        {/* Document preview thumbnails */}
        <div className="mb-4">
          {document.status === 'ready' && previewPages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {previewPages.map((page, index) => (
                <div 
                  key={page.pageID} 
                  className="aspect-[3/4] bg-gray-100 rounded border overflow-hidden"
                >
                  <img 
                    src={page.thumbUrl} 
                    alt={`Page ${page.pageNumber}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Fill empty slots if less than 3 pages */}
              {Array.from({ length: 3 - previewPages.length }).map((_, index) => (
                <div 
                  key={`empty-${index}`}
                  className="aspect-[3/4] bg-gray-50 rounded border flex items-center justify-center"
                >
                  <File className="h-6 w-6 text-gray-300" />
                </div>
              ))}
            </div>
          ) : (
            // Fallback for processing or error status
            <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 rounded border flex items-center justify-center mb-3">
              <div className="text-center">
                {getFileIcon(document.fileType)}
                <p className="text-xs text-muted-foreground mt-1">
                  {document.status === 'processing' ? 'Processing...' : getFileTypeLabel(document.fileType)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Document info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {getFileIcon(document.fileType)}
              <Badge variant="secondary" className="text-xs">
                {getFileTypeLabel(document.fileType)}
              </Badge>
            </div>
            
            {document.status === 'processing' && (
              <Badge variant="outline" className="text-xs">
                Processing
              </Badge>
            )}
          </div>

          <div>
            <h3 className="font-medium text-sm line-clamp-2 mb-1">
              {document.title}
            </h3>
            
            {document.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {document.description}
              </p>
            )}
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(document.createdAt), 'MMM dd, yyyy')}</span>
              <span>•</span>
              <span>{document.pageCount} pages</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1 gap-1"
              onClick={() => onViewDocument(document.docID)}
              disabled={document.status !== 'ready'}
            >
              <Eye className="h-3 w-3" />
              View Document
            </Button>
            
            {onDownload && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDownload(document.docID)}
              >
                <Download className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}