import React, { useState, useEffect, useCallback } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ContentTable } from '@/components/content-management/ContentTable';
import { ContentForm } from '@/components/content-management/ContentForm';
import { ContentFilters } from '@/components/content-management/ContentFilters';
import { BulkActions } from '@/components/content-management/BulkActions';
import { TimeScheduleCard } from '@/components/content-management/TimeScheduleCard';
import { ContentItem, ContentFilters as FilterType } from '@/types/content';
import { Plus, RotateCcw, ArrowUpDown, Search } from 'lucide-react';

export default function ContentManagement() {
  const { toast } = useToast();
  
  // State
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState<FilterType>({
    contentType: 'All',
    status: 'All',
    priority: 'All',
    category: 'All',
    dateFrom: undefined,
    dateTo: undefined
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortField, setSortField] = useState<keyof ContentItem>('orderDisplay');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock data initialization
  useEffect(() => {
    const mockContents: ContentItem[] = [
      {
        recId: 1,
        title: 'Remote Work Policy Update 2024',
        subContent: 'New guidelines for remote work arrangements and collaboration protocols',
        contentType: 'Header',
        textContent: '<h2>Remote Work Policy Overview</h2><p>This document outlines the updated remote work guidelines effective from January 2024.</p>',
        linkUrl: '/documents/remote-work-policy.pdf',
        openInNewTab: true,
        imageUrl: '/images/remote-work.jpg',
        ctaLabel: 'Read Full Policy',
        orderDisplay: 1,
        priority: 'High',
        theme: 'Light',
        aspectRatio: '16:9',
        deviceTarget: 'Both',
        category: 'Policy',
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        createdBy: 'HR Department',
        createdAt: new Date('2024-01-01'),
        modifiedBy: 'HR Department',
        modifiedAt: new Date('2024-01-15')
      },
      {
        recId: 2,
        title: 'Q1 Performance Review Process',
        subContent: 'Important information about the upcoming quarterly performance reviews',
        contentType: 'Banner',
        textContent: '<h2>Performance Review Process</h2><p>Performance review details and timeline...</p>',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        ctaLabel: 'Watch Training Video',
        orderDisplay: 2,
        priority: 'Normal',
        theme: 'Auto',
        aspectRatio: '16:9',
        deviceTarget: 'Desktop',
        category: 'Announcement',
        isActive: true,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-15'),
        createdBy: 'Management',
        createdAt: new Date('2024-03-01'),
        modifiedBy: 'Management',
        modifiedAt: new Date('2024-03-01')
      },
      {
        recId: 3,
        title: 'Employee Benefits Overview',
        subContent: 'Comprehensive guide to company benefits and perks',
        contentType: 'Tile',
        textContent: '<p>Learn about health insurance, retirement plans, and other benefits available to employees.</p>',
        imageUrl: '/images/benefits.jpg',
        ctaLabel: 'Learn More',
        linkUrl: '/benefits',
        orderDisplay: 3,
        priority: 'Low',
        theme: 'Dark',
        aspectRatio: '4:3',
        deviceTarget: 'TV',
        category: 'Document',
        isActive: false,
        startDate: new Date('2024-02-01'),
        createdBy: 'HR Team',
        createdAt: new Date('2024-02-01'),
        modifiedBy: 'HR Team',
        modifiedAt: new Date('2024-02-01')
      }
    ];
    setContents(mockContents);
  }, []);

  // Handlers
  const handleAddNew = useCallback(() => {
    setEditingContent(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((content: ContentItem) => {
    setEditingContent(content);
    setIsFormOpen(true);
  }, []);

  const handleSave = useCallback((data: Partial<ContentItem>) => {
    if (editingContent) {
      // Update existing
      const updated = { ...editingContent, ...data, modifiedAt: new Date() };
      setContents(prev => prev.map(item => item.recId === editingContent.recId ? updated : item));
      toast({ title: "Đã cập nhật", description: "Nội dung đã được cập nhật thành công." });
    } else {
      // Create new
      const newItem: ContentItem = {
        recId: Math.max(...contents.map(c => c.recId), 0) + 1,
        orderDisplay: contents.length + 1,
        createdBy: 'Current User',
        createdAt: new Date(),
        modifiedBy: 'Current User',
        modifiedAt: new Date(),
        ...data
      } as ContentItem;
      setContents(prev => [...prev, newItem]);
      toast({ title: "Đã tạo mới", description: "Nội dung mới đã được tạo thành công." });
    }
    setIsFormOpen(false);
  }, [editingContent, contents, toast]);

  const handleDelete = useCallback((recId: number) => {
    setContents(prev => prev.filter(item => item.recId !== recId));
    setSelectedItems(prev => prev.filter(id => id !== recId));
    toast({ title: "Đã xóa", description: "Nội dung đã được xóa thành công." });
  }, [toast]);

  const handleToggleActive = useCallback((recId: number) => {
    setContents(prev => prev.map(item => 
      item.recId === recId ? { ...item, isActive: !item.isActive, modifiedAt: new Date() } : item
    ));
    toast({ title: "Đã cập nhật", description: "Trạng thái hiển thị đã được thay đổi." });
  }, [toast]);

  const handleDuplicate = useCallback((content: ContentItem) => {
    const duplicated: ContentItem = {
      ...content,
      recId: Math.max(...contents.map(c => c.recId), 0) + 1,
      title: `${content.title} (Copy)`,
      isActive: false,
      orderDisplay: contents.length + 1,
      createdBy: 'Current User',
      createdAt: new Date(),
      modifiedBy: 'Current User',
      modifiedAt: new Date()
    };
    setContents(prev => [...prev, duplicated]);
    setEditingContent(duplicated);
    setIsFormOpen(true);
    toast({ title: "Đã sao chép", description: "Nội dung đã được sao chép và sẵn sàng chỉnh sửa." });
  }, [contents, toast]);

  const handleReorder = useCallback((newOrder: ContentItem[]) => {
    const reordered = newOrder.map((item, index) => ({
      ...item,
      orderDisplay: index + 1,
      modifiedAt: new Date()
    }));
    setContents(reordered);
    toast({ title: "Đã sắp xếp", description: "Thứ tự hiển thị đã được cập nhật." });
  }, [toast]);

  const handleQuickUpdate = useCallback((recId: number, field: keyof ContentItem, value: any) => {
    setContents(prev => prev.map(item => 
      item.recId === recId 
        ? { ...item, [field]: value, modifiedAt: new Date() }
        : item
    ));
    
    const fieldNames = {
      title: 'tiêu đề',
      priority: 'độ ưu tiên', 
      category: 'danh mục'
    };
    
    toast({ 
      title: "Đã cập nhật", 
      description: `${fieldNames[field as keyof typeof fieldNames] || field} đã được thay đổi.` 
    });
  }, [toast]);

  const handleBulkAction = useCallback((action: 'activate' | 'deactivate' | 'delete', ids: number[]) => {
    if (action === 'delete') {
      setContents(prev => prev.filter(item => !ids.includes(item.recId)));
      toast({ title: "Đã xóa", description: `Đã xóa ${ids.length} mục.` });
    } else {
      const isActive = action === 'activate';
      setContents(prev => prev.map(item => 
        ids.includes(item.recId) 
          ? { ...item, isActive, modifiedAt: new Date() }
          : item
      ));
      toast({ title: "Đã cập nhật", description: `Đã ${action === 'activate' ? 'kích hoạt' : 'vô hiệu hóa'} ${ids.length} mục.` });
    }
    setSelectedItems([]);
  }, [toast]);

  // Filter and search
  const filteredContents = contents.filter(item => {
    if (searchKeyword && !item.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
      return false;
    }
    if (filters.contentType !== 'All' && item.contentType !== filters.contentType) {
      return false;
    }
    if (filters.status !== 'All') {
      if (filters.status === 'Active' && !item.isActive) return false;
      if (filters.status === 'Inactive' && item.isActive) return false;
    }
    if (filters.priority !== 'All' && item.priority !== filters.priority) {
      return false;
    }
    if (filters.category !== 'All' && item.category !== filters.category) {
      return false;
    }
    if (filters.dateFrom && item.startDate < filters.dateFrom) {
      return false;
    }
    if (filters.dateTo && item.startDate > filters.dateTo) {
      return false;
    }
    return true;
  });

  // Sort
  const sortedContents = [...filteredContents].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (aVal === bVal) return 0;
    
    const result = aVal < bVal ? -1 : 1;
    return sortDirection === 'desc' ? -result : result;
  });

  // Pagination
  const totalPages = Math.ceil(sortedContents.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedContents = sortedContents.slice(startIndex, startIndex + pageSize);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'f') {
          e.preventDefault();
          document.getElementById('search-input')?.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          {/* Header Section */}
          <div className="bg-background border-b">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold">Quản lý nội dung Dashboard</h1>
                  <p className="text-muted-foreground mt-1">
                    Tạo và quản lý nội dung hiển thị trên dashboard
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsReorderMode(!isReorderMode)}
                    className={isReorderMode ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    {isReorderMode ? 'Thoát sắp xếp' : 'Sắp xếp'}
                  </Button>
                  
                  <Button variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Preview rotation
                  </Button>
                  
                  <Button onClick={handleAddNew}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm mới
                  </Button>
                </div>
              </div>
              
              {/* Search */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="search-input"
                    placeholder="Tìm kiếm theo tiêu đề..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {selectedItems.length > 0 && (
                  <BulkActions
                    selectedCount={selectedItems.length}
                    onAction={handleBulkAction}
                    selectedIds={selectedItems}
                  />
                )}
              </div>
              
              {/* Filters */}
              <ContentFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 flex gap-6 p-6 min-h-0">
            {/* Time Schedule Card */}
            <div className="w-80 flex-shrink-0">
              <TimeScheduleCard />
            </div>
            
            {/* Table - Left side (55-65%) */}
            <div className="flex-[0.6] min-w-0 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-auto">
                <ContentTable
                  contents={paginatedContents}
                  selectedItems={selectedItems}
                  onSelectionChange={setSelectedItems}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  onToggleActive={handleToggleActive}
                  onReorder={handleReorder}
                  onQuickUpdate={handleQuickUpdate}
                  isReorderMode={isReorderMode}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={(field, direction) => {
                    setSortField(field);
                    setSortDirection(direction);
                  }}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={sortedContents.length}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
            
            {/* Form - Right side (35-45%) */}
            <div className="flex-[0.4] min-w-0">
              <ContentForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSave}
                editingContent={editingContent}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}