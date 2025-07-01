
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
              {term.englishTerm}
            </CardTitle>
            <p className="text-base font-medium text-gray-800 dark:text-gray-200">
              {term.vietnameseTerm}
            </p>
          </div>
          <Badge variant="outline" className="ml-2 text-xs">
            {term.code}
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
              {term.explanation}
            </p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <ImageIcon className="w-3 h-3 mr-1" />
              {term.images.length} ảnh
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
                    {term.englishTerm}
                  </DialogTitle>
                  <p className="text-lg font-medium text-gray-700">
                    {term.vietnameseTerm}
                  </p>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Images Carousel */}
                  {term.images.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Hình ảnh:</h4>
                      <Carousel className="w-full">
                        <CarouselContent>
                          {term.images.map((image, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-1">
                                <img
                                  src={image}
                                  alt={`${term.englishTerm} - ${index + 1}`}
                                  className="w-full h-48 object-cover rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                                  onClick={() => setSelectedImage(image)}
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Mô tả chi tiết:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {term.description}
                    </p>
                  </div>

                  {/* Explanation */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Diễn giải:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {term.explanation}
                    </p>
                  </div>

                  {/* Code */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Mã: </span>
                    <span className="font-mono text-sm font-bold text-blue-600">
                      {term.code}
                    </span>
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
              alt={term.englishTerm}
              className="w-full h-auto rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
