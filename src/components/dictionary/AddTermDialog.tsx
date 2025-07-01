
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddTermDialogProps {
  onAddTerm: (term: any) => void;
}

export function AddTermDialog({ onAddTerm }: AddTermDialogProps) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    englishTerm: '',
    vietnameseTerm: '',
    description: '',
    explanation: '',
    code: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.englishTerm || !formData.vietnameseTerm || !formData.code) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    const newTerm = {
      id: Date.now().toString(),
      ...formData,
      images,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onAddTerm(newTerm);
    
    // Reset form
    setFormData({
      englishTerm: '',
      vietnameseTerm: '',
      description: '',
      explanation: '',
      code: '',
      category: '',
    });
    setImages([]);
    setOpen(false);

    toast({
      title: "Thành công",
      description: "Đã thêm thuật ngữ mới",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Thêm thuật ngữ mới
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Thêm thuật ngữ mới
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="englishTerm">Thuật ngữ tiếng Anh *</Label>
              <Input
                id="englishTerm"
                value={formData.englishTerm}
                onChange={(e) => setFormData(prev => ({ ...prev, englishTerm: e.target.value }))}
                placeholder="VD: Palatal Strap"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vietnameseTerm">Thuật ngữ tiếng Việt *</Label>
              <Input
                id="vietnameseTerm"
                value={formData.vietnameseTerm}
                onChange={(e) => setFormData(prev => ({ ...prev, vietnameseTerm: e.target.value }))}
                placeholder="VD: Bản khẩu cái"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Mã số *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                placeholder="VD: RPD0057"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Danh mục</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prosthodontics">Phục hình</SelectItem>
                  <SelectItem value="Orthodontics">Chỉnh nha</SelectItem>
                  <SelectItem value="Endodontics">Nội nha</SelectItem>
                  <SelectItem value="Periodontics">Nha chu</SelectItem>
                  <SelectItem value="Oral Surgery">Phẫu thuật hàm mặt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả (tiếng Anh)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Mô tả chi tiết bằng tiếng Anh..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="explanation">Diễn giải (tiếng Việt)</Label>
            <Textarea
              id="explanation"
              value={formData.explanation}
              onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
              placeholder="Diễn giải chi tiết bằng tiếng Việt..."
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>Hình ảnh minh họa</Label>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click để chọn ảnh hoặc kéo thả vào đây
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Hỗ trợ: JPG, PNG, GIF (tối đa 5MB mỗi ảnh)
                </p>
              </label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Thêm thuật ngữ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
