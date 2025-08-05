import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Image, FolderOpen, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  name: string;
  path: string;
  thumbnail: string;
  type: 'image' | 'video';
}

const MediaGallery = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const { toast } = useToast();

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const folderPath = e.target.value;
    setSelectedFolder(folderPath);
    
    // Simulate loading media from folder path
    if (folderPath) {
      const mockMediaItems: MediaItem[] = [
        {
          id: '1',
          name: 'image1.jpg',
          path: `${folderPath}/image1.jpg`,
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop',
          type: 'image'
        },
        {
          id: '2',
          name: 'image2.jpg',
          path: `${folderPath}/image2.jpg`,
          thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=200&fit=crop',
          type: 'image'
        },
        {
          id: '3',
          name: 'image3.jpg',
          path: `${folderPath}/image3.jpg`,
          thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop',
          type: 'image'
        }
      ];
      
      setMediaItems(mockMediaItems);
      toast({
        title: "Folder loaded successfully",
        description: `Found ${mockMediaItems.length} media files`,
      });
    }
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Media Upload
          </CardTitle>
          <CardDescription>
            Select a folder path to load media files from your drive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter folder path (e.g., C:/Users/Photos/)"
              value={selectedFolder}
              onChange={handleFolderSelect}
              className="flex-1"
            />
            <Button variant="outline">
              <FolderOpen className="h-4 w-4 mr-2" />
              Browse
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Gallery Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Media Gallery
            {mediaItems.length > 0 && (
              <span className="text-sm text-muted-foreground">
                ({mediaItems.length} files)
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Preview and manage your media files
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mediaItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No media files loaded</p>
              <p className="text-sm">Select a folder path to view media files</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mediaItems.map((media) => (
                <div
                  key={media.id}
                  className="group cursor-pointer"
                  onClick={() => handleMediaClick(media)}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={media.thumbnail}
                      alt={media.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 truncate">
                    {media.name}
                  </p>
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
            <DialogTitle>{selectedMedia?.name}</DialogTitle>
          </DialogHeader>
          {selectedMedia && (
            <div className="flex justify-center">
              <img
                src={selectedMedia.thumbnail}
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