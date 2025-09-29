import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut,
  RotateCw,
  FileText,
  Presentation,
  File
} from 'lucide-react';
import { DocumentViewerProps } from '@/types/feedDocument';
import { toast } from 'sonner';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export function FeedDocumentViewer({ document, pages, onDownloadOriginal, onStartSlideshow }: DocumentViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
        return 'Word Document';
      case 'pptx':
        return 'PowerPoint Presentation';
      case 'pdf':
        return 'PDF Document';
      default:
        return 'Document';
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading document:', error);
    toast.error('Failed to load document');
    setIsLoading(false);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(numPages || 1, prev + 1));
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(3.0, prev + 0.25));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.25));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleThumbnailClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (document.status === 'processing') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Processing document preview...</p>
        </div>
      </div>
    );
  }

  if (document.status === 'error') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="text-destructive">
            <File className="h-12 w-12 mx-auto mb-2" />
          </div>
          <p className="text-muted-foreground">Failed to process document</p>
          <Button variant="outline" onClick={onDownloadOriginal}>
            Download Original File
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getFileIcon(document.fileType)}
            <div>
              <h1 className="text-xl font-semibold">{document.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{getFileTypeLabel(document.fileType)}</Badge>
                <span>•</span>
                <span>{document.pageCount} pages</span>
                <span>•</span>
                <span>Version {document.version}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {document.fileType === 'pptx' && (
              <Button onClick={onStartSlideshow} className="gap-2">
                <Play className="h-4 w-4" />
                Start Slideshow
              </Button>
            )}
            <Button variant="outline" onClick={onDownloadOriginal} className="gap-2">
              <Download className="h-4 w-4" />
              Download Original
            </Button>
          </div>
        </div>
        
        {document.description && (
          <p className="text-muted-foreground mt-2">{document.description}</p>
        )}
      </div>

      <div className="flex-1 flex">
        {/* Sidebar with thumbnails */}
        <div className="w-64 border-r bg-muted/30">
          <div className="p-4">
            <h3 className="font-medium mb-3">Pages</h3>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-2">
                {pages.map((page) => (
                  <Card 
                    key={page.pageID}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      currentPage === page.pageNumber ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleThumbnailClick(page.pageNumber)}
                  >
                    <CardContent className="p-2">
                      <div className="aspect-[3/4] bg-white rounded border mb-1">
                        <img 
                          src={page.thumbUrl} 
                          alt={`Page ${page.pageNumber}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        Page {page.pageNumber}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main viewer */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="border-b p-2 flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePreviousPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm text-muted-foreground px-2">
                {currentPage} / {numPages || 0}
              </span>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage}
                disabled={currentPage >= (numPages || 0)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="text-sm text-muted-foreground px-2">
                {Math.round(scale * 100)}%
              </span>
              
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleRotate}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
            <div className="flex justify-center">
              {isLoading && (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              
              <Document
                file={document.filePathPdf}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                className={isLoading ? 'hidden' : ''}
              >
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  rotate={rotation}
                  className="shadow-lg"
                />
              </Document>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}