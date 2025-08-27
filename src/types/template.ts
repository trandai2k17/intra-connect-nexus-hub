export interface Template {
  id: number;
  templateKey: string;
  name: string;
  description: string;
  viewPath: string;
  thumbnailUrl?: string;
  metaJson?: {
    slots: string[];
    features: string[];
    deviceSupport: string[];
  };
  isActive: boolean;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ArticleTemplate {
  articleId: number;
  templateId: number;
  optionsJson?: {
    theme?: 'light' | 'dark' | 'auto';
    showToc?: boolean;
    showAuthor?: boolean;
    bgColor?: string;
    layout?: 'standard' | 'compact' | 'wide';
  };
  chosenDate: Date;
}

export interface TemplatePreviewData {
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
  options?: ArticleTemplate['optionsJson'];
}