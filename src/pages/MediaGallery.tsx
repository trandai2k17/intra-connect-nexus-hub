import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Image, Eye, Filter, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  name: string;
  file: File;
  url: string;
  type: 'image' | 'video';
  size: number;
  uploadDate: Date;
}

const MediaGallery = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newMediaItem: MediaItem = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            file: file,
            url: event.target?.result as string,
            type: 'image',
            size: file.size,
            uploadDate: new Date()
          };
          
          setMediaItems(prev => [...prev, newMediaItem]);
          setFilteredItems(prev => [...prev, newMediaItem]);
        };
        reader.readAsDataURL(file);
      }
    });

    toast({
      title: "Upload thành công",
      description: `Đã tải lên ${files.length} ảnh`,
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    applyFilters(value, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(filterType, term);
  };

  const applyFilters = (type: string, search: string) => {
    let filtered = mediaItems;

    if (type !== 'all') {
      filtered = filtered.filter(item => item.type === type);
    }

    if (search) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeImage = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
    setFilteredItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Đã xóa ảnh",
      description: "Ảnh đã được xóa khỏi gallery",
    });
  };

  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
    setViewerOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Media Gallery</h1>
        <p className="text-muted-foreground">Upload and manage your media files</p>
      </div>

      {/* Upload Card */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <div 
            className="flex flex-col items-center justify-center py-12 cursor-pointer text-center"
            onClick={handleUploadClick}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
            <p className="text-muted-foreground mb-4">
              Click to select images or drag and drop
            </p>
            <Button variant="outline">
              Choose Files
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Media Gallery Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Media Gallery
            {filteredItems.length > 0 && (
              <span className="text-sm text-muted-foreground">
                ({filteredItems.length} files)
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Preview and manage your uploaded images
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No images to display</p>
              <p className="text-sm">
                {mediaItems.length === 0 ? 'Upload some images to get started' : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredItems.map((media) => (
                <div
                  key={media.id}
                  className="group cursor-pointer relative"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={media.url}
                      alt={media.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMediaClick(media);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(media.id);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground truncate">
                      {media.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(media.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media Viewer Dialog */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedMedia?.name}</span>
              {selectedMedia && (
                <span className="text-sm text-muted-foreground font-normal">
                  {formatFileSize(selectedMedia.size)}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedMedia && (
            <div className="flex justify-center">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.name}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaGallery;