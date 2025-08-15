import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  RecID: number;
  TransDate: string;
  OrderDisplay: number;
  ContentType: string;
  TextContent: string;
  SubContent: string;
  ImageUrl: string;
  LinkUrl: string;
  IsActive: boolean;
  StartDate: string;
  EndDate: string;
  CreatedBy: string;
  CreatedDate: string;
}

const mockContentData: ContentItem[] = [
  {
    RecID: 1,
    TransDate: '2024-01-15',
    OrderDisplay: 1,
    ContentType: 'Banner',
    TextContent: 'Chào mừng đến với Portal',
    SubContent: 'Hệ thống quản lý nội dung hiện đại',
    ImageUrl: '/assets/banner1.jpg',
    LinkUrl: '/portal',
    IsActive: true,
    StartDate: '2024-01-01',
    EndDate: '2024-12-31',
    CreatedBy: 'Admin',
    CreatedDate: '2024-01-01'
  },
  {
    RecID: 2,
    TransDate: '2024-01-20',
    OrderDisplay: 2,
    ContentType: 'Announcement',
    TextContent: 'Thông báo bảo trì hệ thống',
    SubContent: 'Hệ thống sẽ được bảo trì vào cuối tuần',
    ImageUrl: '',
    LinkUrl: '',
    IsActive: true,
    StartDate: '2024-01-20',
    EndDate: '2024-01-25',
    CreatedBy: 'IT Admin',
    CreatedDate: '2024-01-20'
  },
  {
    RecID: 3,
    TransDate: '2024-02-01',
    OrderDisplay: 3,
    ContentType: 'Event',
    TextContent: 'Hội thảo công nghệ 2024',
    SubContent: 'Tham gia hội thảo về xu hướng công nghệ mới',
    ImageUrl: '/assets/event1.jpg',
    LinkUrl: '/events/tech-seminar',
    IsActive: false,
    StartDate: '2024-02-15',
    EndDate: '2024-02-16',
    CreatedBy: 'Event Manager',
    CreatedDate: '2024-02-01'
  }
];

export default function ContentManagement() {
  const [contentData, setContentData] = useState<ContentItem[]>(mockContentData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<Partial<ContentItem>>({});
  const { toast } = useToast();

  const contentTypes = ['Banner', 'Announcement', 'Event', 'News', 'Promotion', 'Document'];

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      TransDate: new Date().toISOString().split('T')[0],
      OrderDisplay: contentData.length + 1,
      ContentType: 'Banner',
      IsActive: true,
      StartDate: new Date().toISOString().split('T')[0],
      EndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      CreatedBy: 'Current User',
      CreatedDate: new Date().toISOString().split('T')[0]
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.TextContent) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập nội dung chính",
        variant: "destructive"
      });
      return;
    }

    if (editingItem) {
      setContentData(prev => prev.map(item => 
        item.RecID === editingItem.RecID 
          ? { ...item, ...formData }
          : item
      ));
      toast({
        title: "Thành công",
        description: "Đã cập nhật nội dung"
      });
    } else {
      const newItem: ContentItem = {
        RecID: Math.max(...contentData.map(item => item.RecID)) + 1,
        ...formData as ContentItem
      };
      setContentData(prev => [...prev, newItem]);
      toast({
        title: "Thành công", 
        description: "Đã thêm nội dung mới"
      });
    }

    setIsDialogOpen(false);
    setFormData({});
  };

  const handleDelete = (id: number) => {
    setContentData(prev => prev.filter(item => item.RecID !== id));
    toast({
      title: "Thành công",
      description: "Đã xóa nội dung"
    });
  };

  const toggleActive = (id: number) => {
    setContentData(prev => prev.map(item =>
      item.RecID === id 
        ? { ...item, IsActive: !item.IsActive }
        : item
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Content</h1>
          <p className="text-muted-foreground">Quản lý nội dung hiển thị trên website</p>
        </div>

        <Card className="backdrop-blur-sm bg-card/90 border-border/50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Danh sách Content
              </CardTitle>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Chỉnh sửa Content' : 'Thêm Content mới'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contentType">Loại Content</Label>
                        <Select 
                          value={formData.ContentType} 
                          onValueChange={(value) => setFormData({...formData, ContentType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại content" />
                          </SelectTrigger>
                          <SelectContent>
                            {contentTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="orderDisplay">Thứ tự hiển thị</Label>
                        <Input
                          id="orderDisplay"
                          type="number"
                          value={formData.OrderDisplay || ''}
                          onChange={(e) => setFormData({...formData, OrderDisplay: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="textContent">Nội dung chính *</Label>
                      <Input
                        id="textContent"
                        value={formData.TextContent || ''}
                        onChange={(e) => setFormData({...formData, TextContent: e.target.value})}
                        placeholder="Nhập tiêu đề hoặc nội dung chính"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subContent">Nội dung phụ</Label>
                      <Textarea
                        id="subContent"
                        value={formData.SubContent || ''}
                        onChange={(e) => setFormData({...formData, SubContent: e.target.value})}
                        placeholder="Nhập mô tả chi tiết"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="imageUrl">URL Hình ảnh</Label>
                      <Input
                        id="imageUrl"
                        value={formData.ImageUrl || ''}
                        onChange={(e) => setFormData({...formData, ImageUrl: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="linkUrl">URL Liên kết</Label>
                      <Input
                        id="linkUrl"
                        value={formData.LinkUrl || ''}
                        onChange={(e) => setFormData({...formData, LinkUrl: e.target.value})}
                        placeholder="/page-url hoặc https://external-link.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Ngày bắt đầu</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.StartDate || ''}
                          onChange={(e) => setFormData({...formData, StartDate: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="endDate">Ngày kết thúc</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.EndDate || ''}
                          onChange={(e) => setFormData({...formData, EndDate: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={formData.IsActive || false}
                        onCheckedChange={(checked) => setFormData({...formData, IsActive: checked})}
                      />
                      <Label htmlFor="isActive">Kích hoạt hiển thị</Label>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleSave}>
                        {editingItem ? 'Cập nhật' : 'Thêm mới'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Nội dung</TableHead>
                    <TableHead>Thứ tự</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead>Ngày kết thúc</TableHead>
                    <TableHead>Tạo bởi</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentData.map((item) => (
                    <TableRow key={item.RecID}>
                      <TableCell>{item.RecID}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.ContentType}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        <div>
                          <div className="font-medium">{item.TextContent}</div>
                          {item.SubContent && (
                            <div className="text-sm text-muted-foreground truncate">
                              {item.SubContent}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{item.OrderDisplay}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive(item.RecID)}
                        >
                          <Badge variant={item.IsActive ? "default" : "secondary"}>
                            {item.IsActive ? 'Hiển thị' : 'Ẩn'}
                          </Badge>
                        </Button>
                      </TableCell>
                      <TableCell>{item.StartDate}</TableCell>
                      <TableCell>{item.EndDate}</TableCell>
                      <TableCell>{item.CreatedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.RecID)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}