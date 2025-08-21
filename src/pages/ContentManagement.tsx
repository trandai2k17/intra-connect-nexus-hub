import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye, FileText, Video, Image, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  recId: number;
  title: string;
  subContent: string;
  contentType: 'Banner' | 'Promotion' | 'Policy' | 'Announcement' | 'Document' | 'Campaign';
  textContent: string;
  pdfUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  category: string;
  priority: number;
  createdBy: string;
  createdAt: Date;
}

export default function ContentManagement() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subContent: '',
    contentType: 'Document' as ContentItem['contentType'],
    textContent: '',
    pdfUrl: '',
    videoUrl: '',
    imageUrl: '',
    ctaLabel: '',
    ctaUrl: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    isActive: true,
    category: '',
    priority: 1
  });

  // Mock data initialization
  useEffect(() => {
    const mockContents: ContentItem[] = [
      {
        recId: 1,
        title: 'Remote Work Policy Update 2024',
        subContent: 'New guidelines for remote work arrangements and collaboration protocols',
        contentType: 'Policy',
        textContent: '<h2>Remote Work Policy Overview</h2><p>This document outlines the updated remote work guidelines effective from January 2024.</p>',
        pdfUrl: '/documents/remote-work-policy.pdf',
        imageUrl: '/images/remote-work.jpg',
        ctaLabel: 'Read Full Policy',
        ctaUrl: '/documents/remote-work-policy.pdf',
        category: 'HR Policies',
        priority: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
        createdBy: 'HR Department',
        createdAt: new Date('2024-01-01')
      },
      {
        recId: 2,
        title: 'Q1 Performance Review Process',
        subContent: 'Important information about the upcoming quarterly performance reviews',
        contentType: 'Announcement',
        textContent: '<h2>Performance Review Process</h2><p>Performance review details and timeline...</p>',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        ctaLabel: 'Watch Training Video',
        category: 'Performance',
        priority: 2,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-15'),
        isActive: true,
        createdBy: 'Management',
        createdAt: new Date('2024-03-01')
      }
    ];
    setContents(mockContents);
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      subContent: '',
      contentType: 'Document',
      textContent: '',
      pdfUrl: '',
      videoUrl: '',
      imageUrl: '',
      ctaLabel: '',
      ctaUrl: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      isActive: true,
      category: '',
      priority: 1
    });
    setEditingContent(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContent) {
      // Update existing content
      const updatedContent = {
        ...editingContent,
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined
      };
      
      setContents(prev => prev.map(item => 
        item.recId === editingContent.recId ? updatedContent : item
      ));
      
      toast({
        title: "Content Updated",
        description: "Content has been successfully updated.",
      });
    } else {
      // Create new content
      const newContent: ContentItem = {
        recId: Math.max(...contents.map(c => c.recId), 0) + 1,
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        createdBy: 'Current User',
        createdAt: new Date()
      };
      
      setContents(prev => [...prev, newContent]);
      
      toast({
        title: "Content Created",
        description: "New content has been successfully created.",
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (content: ContentItem) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      subContent: content.subContent,
      contentType: content.contentType,
      textContent: content.textContent,
      pdfUrl: content.pdfUrl || '',
      videoUrl: content.videoUrl || '',
      imageUrl: content.imageUrl || '',
      ctaLabel: content.ctaLabel || '',
      ctaUrl: content.ctaUrl || '',
      startDate: content.startDate.toISOString().split('T')[0],
      endDate: content.endDate ? content.endDate.toISOString().split('T')[0] : '',
      isActive: content.isActive,
      category: content.category,
      priority: content.priority
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (recId: number) => {
    setContents(prev => prev.filter(item => item.recId !== recId));
    toast({
      title: "Content Deleted",
      description: "Content has been successfully deleted.",
    });
  };

  const toggleActive = (recId: number) => {
    setContents(prev => prev.map(item => 
      item.recId === recId ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const getContentTypeIcon = (type: string) => {
    const icons = {
      Banner: Image,
      Promotion: Video,
      Policy: FileText,
      Announcement: Calendar,
      Document: FileText,
      Campaign: Video
    };
    const Icon = icons[type as keyof typeof icons] || FileText;
    return <Icon className="w-4 h-4" />;
  };

  const getContentTypeColor = (type: string) => {
    const colors = {
      Banner: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Promotion: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Policy: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Announcement: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      Document: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      Campaign: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[type as keyof typeof colors] || colors.Document;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-background">
            <div className="container mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Content Management</h1>
                  <p className="text-muted-foreground">
                    Create and manage dynamic content for your dashboard
                  </p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Content
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingContent ? 'Edit Content' : 'Create New Content'}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* ... keep existing code (form content) */}
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Information</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="category">Category *</Label>
                            <Input
                              id="category"
                              value={formData.category}
                              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="subContent">Sub Content</Label>
                          <Input
                            id="subContent"
                            value={formData.subContent}
                            onChange={(e) => setFormData(prev => ({ ...prev, subContent: e.target.value }))}
                            placeholder="Brief description or subtitle"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contentType">Content Type *</Label>
                            <Select value={formData.contentType} onValueChange={(value: ContentItem['contentType']) => 
                              setFormData(prev => ({ ...prev, contentType: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Banner">Banner</SelectItem>
                                <SelectItem value="Promotion">Promotion</SelectItem>
                                <SelectItem value="Policy">Policy</SelectItem>
                                <SelectItem value="Announcement">Announcement</SelectItem>
                                <SelectItem value="Document">Document</SelectItem>
                                <SelectItem value="Campaign">Campaign</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="priority">Priority</Label>
                            <Input
                              id="priority"
                              type="number"
                              min="1"
                              value={formData.priority}
                              onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Content</h3>
                        
                        <div>
                          <Label htmlFor="textContent">Text Content</Label>
                          <Textarea
                            id="textContent"
                            value={formData.textContent}
                            onChange={(e) => setFormData(prev => ({ ...prev, textContent: e.target.value }))}
                            rows={6}
                            placeholder="Main content (supports HTML)"
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Media URLs */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Media & Resources</h3>
                        
                        <div>
                          <Label htmlFor="imageUrl">Image URL</Label>
                          <Input
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                            placeholder="/images/banner.jpg"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="videoUrl">Video URL</Label>
                          <Input
                            id="videoUrl"
                            value={formData.videoUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                            placeholder="https://www.youtube.com/embed/..."
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="pdfUrl">PDF URL</Label>
                          <Input
                            id="pdfUrl"
                            value={formData.pdfUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, pdfUrl: e.target.value }))}
                            placeholder="/documents/policy.pdf"
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Call to Action */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Call to Action</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="ctaLabel">CTA Label</Label>
                            <Input
                              id="ctaLabel"
                              value={formData.ctaLabel}
                              onChange={(e) => setFormData(prev => ({ ...prev, ctaLabel: e.target.value }))}
                              placeholder="Read More, Download, etc."
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="ctaUrl">CTA URL</Label>
                            <Input
                              id="ctaUrl"
                              value={formData.ctaUrl}
                              onChange={(e) => setFormData(prev => ({ ...prev, ctaUrl: e.target.value }))}
                              placeholder="/documents/file.pdf or https://..."
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Schedule & Status */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Schedule & Status</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate">Start Date *</Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={formData.startDate}
                              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                              id="endDate"
                              type="date"
                              value={formData.endDate}
                              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="isActive"
                            checked={formData.isActive}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                          />
                          <Label htmlFor="isActive">Active</Label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-4 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingContent ? 'Update' : 'Create'} Content
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Content Table */}
              <Card>
                <CardHeader>
                  <CardTitle>All Content ({contents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contents.map((content) => (
                        <TableRow key={content.recId}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{content.title}</div>
                              {content.subContent && (
                                <div className="text-sm text-muted-foreground">{content.subContent}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getContentTypeColor(content.contentType)}>
                              {getContentTypeIcon(content.contentType)}
                              <span className="ml-1">{content.contentType}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{content.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={content.isActive}
                                onCheckedChange={() => toggleActive(content.recId)}
                              />
                              <span className={content.isActive ? 'text-green-600' : 'text-gray-400'}>
                                {content.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{content.priority}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>From: {content.startDate.toLocaleDateString()}</div>
                              {content.endDate && (
                                <div>To: {content.endDate.toLocaleDateString()}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`/content/view/${content.recId}`, '_blank')}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(content)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(content.recId)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {contents.length === 0 && (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-semibold mb-2">No content found</h3>
                      <p className="text-muted-foreground mb-4">Get started by creating your first content</p>
                      <Button onClick={() => setIsDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Content
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}