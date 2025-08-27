import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ContentItem } from '@/types/content';
import { Template } from '@/types/template';
import { ContentPreview } from './ContentPreview';
import { TemplateSelector } from '@/components/template/TemplateSelector';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, X, Save, Eye, Palette } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ContentItem>) => void;
  editingContent: ContentItem | null;
}

interface FormData {
  title: string;
  subContent: string;
  contentType: 'Header' | 'Banner' | 'Tile';
  textContent: string;
  linkUrl: string;
  openInNewTab: boolean;
  imageUrl: string;
  videoUrl: string;
  ctaLabel: string;
  priority: 'High' | 'Normal' | 'Low';
  theme: 'Light' | 'Dark' | 'Auto';
  aspectRatio: '16:9' | '4:3' | '1:1';
  deviceTarget: 'Desktop' | 'TV' | 'Both';
  category: 'Policy' | 'Announcement' | 'Document';
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
  selectedTemplateId?: number;
}

export function ContentForm({ isOpen, onClose, onSave, editingContent }: ContentFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subContent: '',
    contentType: 'Header',
    textContent: '',
    linkUrl: '',
    openInNewTab: false,
    imageUrl: '',
    videoUrl: '',
    ctaLabel: '',
    priority: 'Normal',
    theme: 'Auto',
    aspectRatio: '16:9',
    deviceTarget: 'Both',
    category: 'Document',
    isActive: true,
    startDate: new Date(),
    endDate: undefined
  });
  
  const [isDirty, setIsDirty] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('content');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Initialize form data when editing
  useEffect(() => {
    if (editingContent) {
      setFormData({
        title: editingContent.title || '',
        subContent: editingContent.subContent || '',
        contentType: editingContent.contentType || 'Header',
        textContent: editingContent.textContent || '',
        linkUrl: editingContent.linkUrl || '',
        openInNewTab: editingContent.openInNewTab || false,
        imageUrl: editingContent.imageUrl || '',
        videoUrl: editingContent.videoUrl || '',
        ctaLabel: editingContent.ctaLabel || '',
        priority: editingContent.priority || 'Normal',
        theme: editingContent.theme || 'Auto',
        aspectRatio: editingContent.aspectRatio || '16:9',
        deviceTarget: editingContent.deviceTarget || 'Both',
        category: editingContent.category || 'Document',
        isActive: editingContent.isActive ?? true,
        startDate: editingContent.startDate || new Date(),
        endDate: editingContent.endDate
      });
      setIsDirty(false);
    } else {
      // Reset form for new content
      setFormData({
        title: '',
        subContent: '',
        contentType: 'Header',
        textContent: '',
        linkUrl: '',
        openInNewTab: false,
        imageUrl: '',
        videoUrl: '',
        ctaLabel: '',
        priority: 'Normal',
        theme: 'Auto',
        aspectRatio: '16:9',
        deviceTarget: 'Both',
        category: 'Document',
        isActive: true,
        startDate: new Date(),
        endDate: undefined,
        selectedTemplateId: undefined
      });
      setIsDirty(false);
    }
    setErrors({});
  }, [editingContent, isOpen]);

  // Track form changes
  const updateField = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  // Validation
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    } else if (formData.title.length > 120) {
      newErrors.title = 'Tiêu đề không nên vượt quá 120 ký tự (ticker sẽ hiển thị xấu)';
    }

    if (formData.contentType === 'Banner' && !formData.imageUrl && !formData.videoUrl) {
      newErrors.media = 'Banner phải có ảnh hoặc video';
    }

    if (formData.ctaLabel && !formData.linkUrl) {
      newErrors.linkUrl = 'Nếu có nhãn CTA thì phải có URL';
    }

    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }

    if (formData.contentType === 'Header' && formData.textContent.length > 160) {
      newErrors.textContent = 'Nội dung Header không nên vượt quá 160 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle save
  const handleSave = useCallback((closeAfterSave = true) => {
    if (!validateForm()) {
      toast({
        title: "Lỗi validation",
        description: "Vui lòng kiểm tra và sửa các trường bị lỗi",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    setIsDirty(false);
    
    if (closeAfterSave) {
      onClose();
    }
  }, [formData, validateForm, onSave, onClose, toast]);

  // Handle close with dirty check
  const handleClose = useCallback(() => {
    if (isDirty) {
      if (confirm('Bạn có thay đổi chưa lưu. Bạn có muốn đóng không?')) {
        setIsDirty(false);
        onClose();
      }
    } else {
      onClose();
    }
  }, [isDirty, onClose]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
          e.preventDefault();
          handleSave(false);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [isOpen, handleSave, handleClose]);

  if (!isOpen) {
    return (
      <Card className="h-fit">
        <CardContent className="p-8 text-center text-muted-foreground">
          <div className="w-12 h-12 mx-auto mb-4 opacity-50 flex items-center justify-center">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p>Chọn mục để chỉnh sửa hoặc bấm "Thêm mới" để tạo nội dung</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="h-fit max-h-[calc(100vh-12rem)] flex flex-col">
        {/* Header */}
        <CardHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {editingContent ? 'Chỉnh sửa' : 'Thêm mới'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(true)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {isDirty && (
            <div className="text-xs text-amber-600 dark:text-amber-400">
              Có thay đổi chưa lưu
            </div>
          )}
        </CardHeader>

        {/* Form Content */}
        <CardContent className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Nội dung</TabsTrigger>
              <TabsTrigger value="presentation">Trình bày</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="schedule">Lịch & Trạng thái</TabsTrigger>
            </TabsList>

            {/* Tab A: Nội dung */}
            <TabsContent value="content" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">
                  Tiêu đề <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className={errors.title ? 'border-destructive' : ''}
                  autoFocus
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subContent">Tóm tắt ngắn</Label>
                <Input
                  id="subContent"
                  value={formData.subContent}
                  onChange={(e) => updateField('subContent', e.target.value)}
                  placeholder="Mô tả ngắn gọn về nội dung"
                />
              </div>

              <div>
                <Label htmlFor="textContent">Nội dung chính</Label>
                <Textarea
                  id="textContent"
                  value={formData.textContent}
                  onChange={(e) => updateField('textContent', e.target.value)}
                  rows={6}
                  placeholder="Nội dung chi tiết (hỗ trợ HTML cơ bản: bold, italic, list, link)"
                  className={errors.textContent ? 'border-destructive' : ''}
                />
                {errors.textContent && (
                  <p className="text-sm text-destructive mt-1">{errors.textContent}</p>
                )}
              </div>

              <div>
                <Label htmlFor="linkUrl">URL liên kết</Label>
                <Input
                  id="linkUrl"
                  value={formData.linkUrl}
                  onChange={(e) => updateField('linkUrl', e.target.value)}
                  placeholder="/documents/file.pdf hoặc https://..."
                  className={errors.linkUrl ? 'border-destructive' : ''}
                />
                {errors.linkUrl && (
                  <p className="text-sm text-destructive mt-1">{errors.linkUrl}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="openInNewTab"
                  checked={formData.openInNewTab}
                  onCheckedChange={(checked) => updateField('openInNewTab', checked)}
                />
                <Label htmlFor="openInNewTab">Mở trong tab mới</Label>
              </div>
            </TabsContent>

            {/* Tab B: Trình bày */}
            <TabsContent value="presentation" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Loại nội dung</Label>
                  <Select value={formData.contentType} onValueChange={(value: any) => updateField('contentType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Header">Header</SelectItem>
                      <SelectItem value="Banner">Banner</SelectItem>
                      <SelectItem value="Tile">Tile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Độ ưu tiên</Label>
                  <Select value={formData.priority} onValueChange={(value: any) => updateField('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">Cao</SelectItem>
                      <SelectItem value="Normal">Bình thường</SelectItem>
                      <SelectItem value="Low">Thấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="imageUrl">URL hình ảnh</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => updateField('imageUrl', e.target.value)}
                  placeholder="/images/banner.jpg"
                />
              </div>

              <div>
                <Label htmlFor="videoUrl">URL video</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => updateField('videoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                />
                {errors.media && (
                  <p className="text-sm text-destructive mt-1">{errors.media}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ctaLabel">Nhãn CTA</Label>
                <Input
                  id="ctaLabel"
                  value={formData.ctaLabel}
                  onChange={(e) => updateField('ctaLabel', e.target.value)}
                  placeholder="Xem thêm, Tải về, v.v."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Chủ đề</Label>
                  <Select value={formData.theme} onValueChange={(value: any) => updateField('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Light">Sáng</SelectItem>
                      <SelectItem value="Dark">Tối</SelectItem>
                      <SelectItem value="Auto">Tự động</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tỉ lệ khung hình</Label>
                  <Select value={formData.aspectRatio} onValueChange={(value: any) => updateField('aspectRatio', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:9">16:9</SelectItem>
                      <SelectItem value="4:3">4:3</SelectItem>
                      <SelectItem value="1:1">1:1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Thiết bị đích</Label>
                  <Select value={formData.deviceTarget} onValueChange={(value: any) => updateField('deviceTarget', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Desktop">Desktop</SelectItem>
                      <SelectItem value="TV">TV</SelectItem>
                      <SelectItem value="Both">Cả hai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Danh mục</Label>
                  <Select value={formData.category} onValueChange={(value: any) => updateField('category', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Policy">Chính sách</SelectItem>
                      <SelectItem value="Announcement">Thông báo</SelectItem>
                      <SelectItem value="Document">Tài liệu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Tab C: Template */}
            <TabsContent value="template" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Template hiển thị</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Chọn template để hiển thị nội dung này
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowTemplateSelector(true)}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Chọn Template
                  </Button>
                </div>

                {selectedTemplate && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-12 bg-muted rounded flex-shrink-0">
                          {selectedTemplate.thumbnailUrl && (
                            <img 
                              src={selectedTemplate.thumbnailUrl}
                              alt={selectedTemplate.name}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{selectedTemplate.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedTemplate.description}
                          </p>
                          <div className="flex gap-1 mt-2">
                            {selectedTemplate.metaJson?.deviceSupport?.map((device) => (
                              <Badge key={device} variant="outline" className="text-xs">
                                {device}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTemplate(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!selectedTemplate && (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      <Palette className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Chưa chọn template</p>
                      <p className="text-xs mt-1">
                        Nội dung sẽ sử dụng template mặc định
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Tab D: Lịch & Trạng thái */}
            <TabsContent value="schedule" className="space-y-4 mt-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => updateField('isActive', checked)}
                />
                <Label htmlFor="isActive">Đang hiển thị</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ngày bắt đầu <span className="text-destructive">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && updateField('startDate', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Ngày kết thúc</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground",
                          errors.endDate && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "dd/MM/yyyy", { locale: vi }) : "Luôn hiển thị"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => updateField('endDate', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && (
                    <p className="text-sm text-destructive mt-1">{errors.endDate}</p>
                  )}
                </div>
              </div>

              {editingContent && (
                <div className="space-y-2 text-sm text-muted-foreground border-t pt-4">
                  <div>Tạo bởi: {editingContent.createdBy} vào {format(editingContent.createdAt, "dd/MM/yyyy HH:mm", { locale: vi })}</div>
                  <div>Cập nhật bởi: {editingContent.modifiedBy} vào {format(editingContent.modifiedAt, "dd/MM/yyyy HH:mm", { locale: vi })}</div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t bg-muted/30">
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={!isDirty}
              >
                <Save className="w-4 h-4 mr-1" />
                Lưu
              </Button>
              <Button onClick={() => handleSave(true)} disabled={!isDirty}>
                Lưu & Đóng
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Phím tắt: Ctrl+S (Lưu), Esc (Đóng)
          </div>
        </div>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview - {formData.title}</DialogTitle>
          </DialogHeader>
          <ContentPreview data={formData} />
        </DialogContent>
      </Dialog>

      {/* Template Selector */}
      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelect={(template) => {
          setSelectedTemplate(template);
          updateField('selectedTemplateId', template.id);
        }}
        currentContent={formData}
        selectedTemplateId={formData.selectedTemplateId}
      />
    </>
  );
}
