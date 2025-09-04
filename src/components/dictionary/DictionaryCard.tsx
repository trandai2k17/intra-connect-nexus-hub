
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Eye, Image as ImageIcon } from 'lucide-react';
import { DictionaryTerm } from '@/types/dictionary';

interface DictionaryCardProps {
  term: DictionaryTerm;
}

export function DictionaryCard({ term }: DictionaryCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
              {term.dentalWord}
            </CardTitle>
            <p className="text-base font-medium text-gray-800 dark:text-gray-200">
              {term.vnTerm}
            </p>
          </div>
          <Badge variant="outline" className="ml-2 text-xs">
            {term.termId}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
              Mô tả:
            </p>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {term.vnDescription}
            </p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <ImageIcon className="w-3 h-3 mr-1" />
              {term.photos.length} ảnh
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  Xem chi tiết
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-blue-600">
                    {term.dentalWord}
                  </DialogTitle>
                  <p className="text-lg font-medium text-gray-700">
                    {term.vnTerm}
                  </p>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Images Carousel */}
                  {term.photos.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Hình ảnh:</h4>
                      <Carousel className="w-full">
                        <CarouselContent>
                          {term.photos.map((photo) => (
                            <CarouselItem key={photo.id} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-1">
                                <div className="relative">
                                  <img
                                    src={photo.photoPath}
                                    alt={photo.photoName}
                                    className="w-full h-48 object-cover rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => setSelectedImage(photo.photoPath)}
                                  />
                                  {photo.activePhoto && (
                                    <Badge className="absolute top-2 left-2">Active</Badge>
                                  )}
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  )}

                  {/* English Description */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Mô tả tiếng Anh:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {term.engDescription}
                    </p>
                  </div>

                  {/* Vietnamese Description */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Mô tả tiếng Việt:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {term.vnDescription}
                    </p>
                  </div>

                  {/* Term ID and Product Group */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Mã ID: </span>
                      <span className="font-mono text-sm font-bold text-blue-600">
                        {term.termId}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Nhóm sản phẩm: </span>
                      <span className="text-sm font-bold text-blue-600">
                        {term.productGroup}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Thuật ngữ TA: </span>
                      <span className="text-sm font-bold text-blue-600">
                        {term.engTerm}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>

      {/* Image Preview Dialog */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            <img
              src={selectedImage}
              alt={term.dentalWord}
              className="w-full h-auto rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
