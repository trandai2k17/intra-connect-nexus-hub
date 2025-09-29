import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { FeedDocumentViewer } from '@/components/document/FeedDocumentViewer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { FeedDocument, FeedDocumentPage } from '@/types/feedDocument';
import { toast } from 'sonner';

// Mock data - replace with actual API calls
const mockDocument: FeedDocument = {
  docID: '1',
  feedID: 'feed-1',
  fileType: 'pptx',
  filePathOriginal: '/documents/sample-presentation.pptx',
  filePathPdf: '/documents/sample-presentation.pdf',
  pageCount: 12,
  version: 1,
  isCurrent: true,
  createdAt: new Date('2024-01-15'),
  title: 'Company Policy Updates Q1 2024',
  description: 'Comprehensive overview of new policies and procedures effective from Q1 2024, including remote work guidelines, security protocols, and performance review updates.',
  fileSize: 2048000,
  status: 'ready'
};

const mockPages: FeedDocumentPage[] = Array.from({ length: 12 }, (_, i) => ({
  pageID: `page-${i + 1}`,
  docID: '1',
  pageNumber: i + 1,
  thumbUrl: `/api/documents/1/thumbnails/page-${i + 1}.png`,
  width: 1920,
  height: 1080
}));

export function DocumentViewer() {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<FeedDocument | null>(null);
  const [pages, setPages] = useState<FeedDocumentPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        setIsLoading(true);
        
        // Mock API call - replace with actual implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (docId === '1') {
          setDocument(mockDocument);
          setPages(mockPages);
        } else {
          throw new Error('Document not found');
        }
      } catch (error) {
        console.error('Error loading document:', error);
        toast.error('Failed to load document');
        navigate('/news/center');
      } finally {
        setIsLoading(false);
      }
    };

    if (docId) {
      loadDocument();
    }
  }, [docId, navigate]);

  const handleDownloadOriginal = () => {
    if (document) {
      // Mock download - replace with actual implementation
      toast.success('Download started');
      // window.open(document.filePathOriginal, '_blank');
    }
  };

  const handleStartSlideshow = () => {
    if (document && document.fileType === 'pptx') {
      // Navigate to slideshow mode
      navigate(`/documents/${docId}/slideshow`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading document...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!document) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Document Not Found</h1>
            <p className="text-muted-foreground">The requested document could not be found.</p>
            <Button onClick={handleGoBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full flex flex-col">
        {/* Back navigation */}
        <div className="border-b bg-background p-4">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="gap-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News Center
          </Button>
        </div>

        {/* Document viewer */}
        <div className="flex-1">
          <FeedDocumentViewer
            document={document}
            pages={pages}
            onDownloadOriginal={handleDownloadOriginal}
            onStartSlideshow={handleStartSlideshow}
          />
        </div>
      </div>
    </Layout>
  );
}