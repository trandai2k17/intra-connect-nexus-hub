export interface ContentItem {
  recId: number;
  title: string;
  subContent: string;
  contentType: 'Header' | 'Banner' | 'Tile';
  textContent: string;
  linkUrl?: string;
  openInNewTab?: boolean;
  imageUrl?: string;
  videoUrl?: string;
  ctaLabel?: string;
  orderDisplay: number;
  priority: 'High' | 'Normal' | 'Low';
  theme: 'Light' | 'Dark' | 'Auto';
  aspectRatio: '16:9' | '4:3' | '1:1';
  deviceTarget: 'Desktop' | 'TV' | 'Both';
  category: 'Policy' | 'Announcement' | 'Document';
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date;
}

export interface ContentFilters {
  contentType: 'All' | 'Header' | 'Banner' | 'Tile';
  status: 'All' | 'Active' | 'Inactive';
  priority: 'All' | 'High' | 'Normal' | 'Low';
  category: 'All' | 'Policy' | 'Announcement' | 'Document';
  dateFrom?: Date;
  dateTo?: Date;
}