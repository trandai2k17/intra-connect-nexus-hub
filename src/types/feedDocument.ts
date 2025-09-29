export interface FeedDocument {
  docID: string;
  feedID: string;
  fileType: 'docx' | 'pptx' | 'pdf' | 'xlsx';
  filePathOriginal: string;
  filePathPdf: string;
  pageCount: number;
  version: number;
  isCurrent: boolean;
  createdAt: Date;
  title: string;
  description?: string;
  fileSize: number;
  status: 'processing' | 'ready' | 'error';
}

export interface FeedDocumentPage {
  pageID: string;
  docID: string;
  pageNumber: number;
  thumbUrl: string;
  width?: number;
  height?: number;
}

export interface FeedItem {
  feedID: string;
  title: string;
  description: string;
  type: 'document' | 'article' | 'announcement' | 'video';
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
  category: 'policy' | 'announcement' | 'news' | 'training';
  priority: 'high' | 'normal' | 'low';
}

export interface DocumentViewerProps {
  document: FeedDocument;
  pages: FeedDocumentPage[];
  onDownloadOriginal?: () => void;
  onStartSlideshow?: () => void;
}