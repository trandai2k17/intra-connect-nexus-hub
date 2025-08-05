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

interface MediaFolder {
  id: string;
  name: string;
  images: MediaItem[];
  createdDate: Date;
}

const MediaGallery = () => {
  const [mediaFolders, setMediaFolders] = useState<MediaFolder[]>([
    {
      id: '1',
      name: 'Sản phẩm nha khoa',
      createdDate: new Date('2024-01-15'),
      images: [
        {
          id: '1-1',
          name: 'implant-1.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&h=300&fit=crop',
          type: 'image',
          size: 245760,
          uploadDate: new Date('2024-01-15')
        },
        {
          id: '1-2',
          name: 'crown-2.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=300&h=300&fit=crop',
          type: 'image',
          size: 189440,
          uploadDate: new Date('2024-01-16')
        },
        {
          id: '1-3',
          name: 'dental-tools.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1579165466991-467b1c2e7e87?w=300&h=300&fit=crop',
          type: 'image',
          size: 312560,
          uploadDate: new Date('2024-01-17')
        }
      ]
    },
    {
      id: '2',
      name: 'Hình ảnh phòng khám',
      createdDate: new Date('2024-02-01'),
      images: [
        {
          id: '2-1',
          name: 'clinic-1.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&h=300&fit=crop',
          type: 'image',
          size: 445760,
          uploadDate: new Date('2024-02-01')
        },
        {
          id: '2-2',
          name: 'waiting-room.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&h=300&fit=crop',
          type: 'image',
          size: 389440,
          uploadDate: new Date('2024-02-02')
        }
      ]
    },
    {
      id: '3',
      name: 'Before & After',
      createdDate: new Date('2024-03-10'),
      images: [
        {
          id: '3-1',
          name: 'before-treatment.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=300&h=300&fit=crop',
          type: 'image',
          size: 278560,
          uploadDate: new Date('2024-03-10')
        },
        {
          id: '3-2',
          name: 'after-treatment.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&h=300&fit=crop',
          type: 'image',
          size: 325440,
          uploadDate: new Date('2024-03-11')
        },
        {
          id: '3-3',
          name: 'smile-result.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop',
          type: 'image',
          size: 298760,
          uploadDate: new Date('2024-03-12')
        },
        {
          id: '3-4',
          name: 'teeth-whitening.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop',
          type: 'image',
          size: 267890,
          uploadDate: new Date('2024-03-13')
        }
      ]
    },
    {
      id: '4',
      name: 'Thiết bị y tế',
      createdDate: new Date('2024-04-05'),
      images: [
        {
          id: '4-1',
          name: 'xray-machine.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop',
          type: 'image',
          size: 456780,
          uploadDate: new Date('2024-04-05')
        },
        {
          id: '4-2',
          name: 'dental-chair.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=300&h=300&fit=crop',
          type: 'image',
          size: 398560,
          uploadDate: new Date('2024-04-06')
        },
        {
          id: '4-3',
          name: 'sterilization.jpg',
          file: {} as File,
          url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300&h=300&fit=crop',
          type: 'image',
          size: 334670,
          uploadDate: new Date('2024-04-07')
        }
      ]
    }
  ]);
  const [filteredFolders, setFilteredFolders] = useState<MediaFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<MediaFolder | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Initialize filtered folders
  React.useEffect(() => {
    setFilteredFolders(mediaFolders);
  }, [mediaFolders]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, folderId?: string) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 0) {
      if (folderId) {
        // Add to existing folder
        const updatedFolders = mediaFolders.map(folder => {
          if (folder.id === folderId) {
            const newImages: MediaItem[] = [];
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
                  
                  newImages.push(newMediaItem);
                  folder.images.push(newMediaItem);
                  
                  if (newImages.length === files.filter(f => f.type.startsWith('image/')).length) {
                    setMediaFolders([...updatedFolders]);
                    setFilteredFolders([...updatedFolders]);
                    if (selectedFolder?.id === folderId) {
                      setSelectedFolder({...folder});
                    }
                  }
                };
                reader.readAsDataURL(file);
              }
            });
          }
          return folder;
        });
      } else {
        // Create a new folder for uploaded images
        const newFolder: MediaFolder = {
          id: Date.now().toString(),
          name: `Upload ${new Date().toLocaleDateString()}`,
          createdDate: new Date(),
          images: []
        };

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
              
              newFolder.images.push(newMediaItem);
              
              // Update folder after all images are processed
              if (newFolder.images.length === files.filter(f => f.type.startsWith('image/')).length) {
                setMediaFolders(prev => [newFolder, ...prev]);
                setFilteredFolders(prev => [newFolder, ...prev]);
              }
            };
            reader.readAsDataURL(file);
          }
        });
      }

      toast({
        title: "Upload thành công",
        description: folderId ? `Đã thêm ${files.length} ảnh vào folder` : `Đã tạo folder mới với ${files.length} ảnh`,
      });
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term) {
      const filtered = mediaFolders.filter(folder => 
        folder.name.toLowerCase().includes(term.toLowerCase()) ||
        folder.images.some(img => img.name.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredFolders(filtered);
    } else {
      setFilteredFolders(mediaFolders);
    }
  };

  const handleFolderClick = (folder: MediaFolder) => {
    setSelectedFolder(folder);
  };

  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
    setViewerOpen(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTotalImages = (folder: MediaFolder) => {
    return folder.images.length;
  };

  const getFolderPreviewImages = (folder: MediaFolder) => {
    return folder.images.slice(0, 3); // Show first 3 images as preview
  };


  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Media Gallery</h1>
        <p className="text-muted-foreground">Upload and manage your media files</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Folders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search folders or images..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Folders Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Media Folders
            {filteredFolders.length > 0 && (
              <span className="text-sm text-muted-foreground">
                ({filteredFolders.length} folders)
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Browse your image folders and collections
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFolders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No folders to display</p>
              <p className="text-sm">
                {mediaFolders.length === 0 ? 'Upload some images to get started' : 'Try adjusting your search'}
              </p>
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4">
              {/* Add Folder Card */}
              <div className="flex-shrink-0 w-64">
                <Card 
                  className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer h-full"
                  onClick={handleUploadClick}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3 h-full flex flex-col justify-center">
                      <div className="flex flex-col items-center text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-sm mb-2">Create New Folder</h3>
                        <p className="text-xs text-muted-foreground mb-4">
                          Upload images to create a new folder
                        </p>
                        <Button variant="outline" size="sm">
                          Upload Images
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Existing Folders */}
              {filteredFolders.map((folder) => (
                <div key={folder.id} className="flex-shrink-0 w-64">
                  <Card 
                    className={`cursor-pointer hover:shadow-lg transition-all ${
                      selectedFolder?.id === folder.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleFolderClick(folder)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Preview Images Grid */}
                        <div className="grid grid-cols-3 gap-1 h-24">
                          {getFolderPreviewImages(folder).map((img, index) => (
                            <div key={img.id} className="relative rounded overflow-hidden bg-muted">
                              <img
                                src={img.url}
                                alt={img.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {/* Fill empty slots if less than 3 images */}
                          {Array.from({ length: 3 - getFolderPreviewImages(folder).length }).map((_, index) => (
                            <div key={`empty-${index}`} className="bg-muted rounded flex items-center justify-center">
                              <Image className="h-4 w-4 text-muted-foreground/50" />
                            </div>
                          ))}
                        </div>
                        
                        {/* Folder Info */}
                        <div>
                          <h3 className="font-semibold text-sm truncate">{folder.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {getTotalImages(folder)} images
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {folder.createdDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e)}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Selected Folder Images */}
      {selectedFolder && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              {selectedFolder.name}
              <span className="text-sm text-muted-foreground font-normal">
                ({getTotalImages(selectedFolder)} images)
              </span>
            </CardTitle>
            <CardDescription>
              Manage images in this folder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Upload to Folder Card */}
              <div className="aspect-square">
                <Card 
                  className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer h-full"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.accept = 'image/*';
                    input.onchange = (e) => handleFileUpload(e as any, selectedFolder.id);
                    input.click();
                  }}
                >
                  <CardContent className="p-2 h-full flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Upload className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      Add Images
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Existing Images */}
              {selectedFolder.images.map((media) => (
                <div
                  key={media.id}
                  className="group cursor-pointer"
                  onClick={() => handleMediaClick(media)}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={media.url}
                      alt={media.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
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
          </CardContent>
        </Card>
      )}

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