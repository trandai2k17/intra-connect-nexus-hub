import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Template } from '@/types/template';
import { Save, X } from 'lucide-react';

interface TemplateEditorProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (templateData: Partial<Template>) => void;
}

export function TemplateEditor({ template, isOpen, onClose, onSave }: TemplateEditorProps) {
  const [formData, setFormData] = useState({
    templateKey: '',
    name: '',
    description: '',
    viewPath: '',
    thumbnailUrl: '',
    isActive: true,
    metaJson: {
      slots: [],
      features: [],
      deviceSupport: []
    }
  });

  const [slotsText, setSlotsText] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [deviceSupportText, setDeviceSupportText] = useState('');

  useEffect(() => {
    if (template) {
      setFormData({
        templateKey: template.templateKey,
        name: template.name,
        description: template.description,
        viewPath: template.viewPath,
        thumbnailUrl: template.thumbnailUrl || '',
        isActive: template.isActive,
        metaJson: template.metaJson || { slots: [], features: [], deviceSupport: [] }
      });
      setSlotsText(template.metaJson?.slots?.join(', ') || '');
      setFeaturesText(template.metaJson?.features?.join(', ') || '');
      setDeviceSupportText(template.metaJson?.deviceSupport?.join(', ') || '');
    } else {
      setFormData({
        templateKey: '',
        name: '',
        description: '',
        viewPath: '',
        thumbnailUrl: '',
        isActive: true,
        metaJson: { slots: [], features: [], deviceSupport: [] }
      });
      setSlotsText('');
      setFeaturesText('');
      setDeviceSupportText('');
    }
  }, [template, isOpen]);

  const handleSave = () => {
    const templateData = {
      ...formData,
      metaJson: {
        slots: slotsText.split(',').map(s => s.trim()).filter(s => s),
        features: featuresText.split(',').map(s => s.trim()).filter(s => s),
        deviceSupport: deviceSupportText.split(',').map(s => s.trim()).filter(s => s)
      }
    };
    onSave(templateData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {template ? 'Chỉnh sửa Template' : 'Thêm Template mới'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 overflow-y-auto max-h-[70vh]">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="templateKey">Template Key *</Label>
              <Input
                id="templateKey"
                value={formData.templateKey}
                onChange={(e) => setFormData(prev => ({ ...prev, templateKey: e.target.value }))}
                placeholder="hero-banner"
              />
            </div>
            <div>
              <Label htmlFor="name">Tên hiển thị *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Hero Banner"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Mô tả template..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="viewPath">View Path</Label>
              <Input
                id="viewPath"
                value={formData.viewPath}
                onChange={(e) => setFormData(prev => ({ ...prev, viewPath: e.target.value }))}
                placeholder="/templates/hero-banner"
              />
            </div>
            <div>
              <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
              <Input
                id="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                placeholder="/template-thumbnails/hero-banner.jpg"
              />
            </div>
          </div>

          {/* Meta Information */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Thông tin meta</h3>
            
            <div>
              <Label htmlFor="slots">Slots (phân cách bằng dấu phẩy)</Label>
              <Input
                id="slots"
                value={slotsText}
                onChange={(e) => setSlotsText(e.target.value)}
                placeholder="hero-image, title, subtitle, cta"
              />
            </div>

            <div>
              <Label htmlFor="features">Features (phân cách bằng dấu phẩy)</Label>
              <Input
                id="features"
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                placeholder="responsive, video-support, overlay-text"
              />
            </div>

            <div>
              <Label htmlFor="deviceSupport">Device Support (phân cách bằng dấu phẩy)</Label>
              <Input
                id="deviceSupport"
                value={deviceSupportText}
                onChange={(e) => setDeviceSupportText(e.target.value)}
                placeholder="desktop, tv, mobile"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2 pt-4 border-t">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="isActive">Template đang hoạt động</Label>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Hủy
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}