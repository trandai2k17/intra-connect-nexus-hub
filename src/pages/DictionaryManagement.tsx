import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Download, Upload, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { useLanguage } from '@/contexts/LanguageContext';
import { DictionaryTerm } from '@/types/dictionary';
import { useToast } from '@/hooks/use-toast';

// Sample data based on the provided seed data
const initialTerms: DictionaryTerm[] = [
  {
    termId: 'RPD0001',
    productGroup: 'RPD',
    alphabeta: 'M',
    dentalWord: 'Mandible',
    vnTerm: 'Hàm dưới',
    engTerm: 'Mand',
    engDescription: 'The lower jaw',
    vnDescription: 'Hàm dưới',
    photos: [
      {
        id: '1',
        termId: 'RPD0001',
        photoName: 'RPD0001_1',
        photoPath: '/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png',
        activePhoto: true
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    termId: 'RPD0002',
    productGroup: 'RPD',
    alphabeta: 'M',
    dentalWord: 'Maxilla',
    vnTerm: 'Hàm trên',
    engTerm: 'Max',
    engDescription: 'The upper jaw',
    vnDescription: 'Hàm trên',
    photos: [
      {
        id: '2',
        termId: 'RPD0002',
        photoName: 'RPD0002_1',
        photoPath: '/lovable-uploads/cb0bf27b-00e3-497d-b8d9-ab79e7751d6f.png',
        activePhoto: true
      }
    ],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    termId: 'RPD0003',
    productGroup: 'RPD',
    alphabeta: 'A',
    dentalWord: 'Abutment',
    vnTerm: 'Răng trụ',
    engTerm: 'Abutment tooth',
    engDescription: 'A tooth used to support a removable partial denture or anchor a fixed partial denture',
    vnDescription: 'Nếu là HTL: răng sẽ đặt móc. Nếu là răng sứ: là cùi răng',
    photos: [
      {
        id: '3',
        termId: 'RPD0003',
        photoName: 'RPD0003_1',
        photoPath: '/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png',
        activePhoto: true
      },
      {
        id: '4',
        termId: 'RPD0003',
        photoName: 'RPD0003_2',
        photoPath: '/lovable-uploads/cb0bf27b-00e3-497d-b8d9-ab79e7751d6f.png',
        activePhoto: false
      }
    ],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    termId: 'RPD0004',
    productGroup: 'RPD',
    alphabeta: 'A',
    dentalWord: 'Acrylic Resin',
    vnTerm: 'Nướu giả',
    engTerm: 'Partial Base / Denture Base',
    engDescription: 'The plastic material widely used in dentistry to make the denture base.',
    vnDescription: 'Phần nền nướu giả, làm từ nhựa theo sản phẩm yêu cầu, giúp cố định răng nhựa.',
    photos: [
      {
        id: '5',
        termId: 'RPD0004',
        photoName: 'RPD0004_1',
        photoPath: '/lovable-uploads/9bcec0a6-9336-4ef4-b0e3-c4b13db813e8.png',
        activePhoto: true
      }
    ],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
];

export default function DictionaryManagement() {
  const [terms, setTerms] = useState<DictionaryTerm[]>(initialTerms);
  const [searchTerm, setSearchTerm] = useState('');
  const [productGroupFilter, setProductGroupFilter] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<DictionaryTerm | null>(null);
  const [currentMode, setCurrentMode] = useState<'add' | 'edit' | 'view'>('view');
  const [formData, setFormData] = useState({
    termId: '',
    productGroup: 'RPD',
    alphabeta: '',
    dentalWord: '',
    vnTerm: '',
    engTerm: '',
    engDescription: '',
    vnDescription: '',
    photos: [] as Array<{
      id?: string;
      photoName: string;
      photoPath: string;
      isMain: boolean;
    }>
  });

  const { t } = useLanguage();
  const { toast } = useToast();

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.dentalWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.vnTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.termId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = !productGroupFilter || term.productGroup === productGroupFilter;
    return matchesSearch && matchesGroup;
  });

  const resetForm = () => {
    setFormData({
      termId: '',
      productGroup: 'RPD',
      alphabeta: '',
      dentalWord: '',
      vnTerm: '',
      engTerm: '',
      engDescription: '',
      vnDescription: '',
      photos: []
    });
    setSelectedTerm(null);
    setCurrentMode('view');
  };

  const handleRowClick = (term: DictionaryTerm) => {
    setSelectedTerm(term);
    setFormData({
      termId: term.termId,
      productGroup: term.productGroup,
      alphabeta: term.alphabeta,
      dentalWord: term.dentalWord,
      vnTerm: term.vnTerm,
      engTerm: term.engTerm,
      engDescription: term.engDescription,
      vnDescription: term.vnDescription,
      photos: term.photos.map(p => ({
        id: p.id,
        photoName: p.photoName,
        photoPath: p.photoPath,
        isMain: p.activePhoto
      }))
    });
    setCurrentMode('view');
  };

  const handleDelete = () => {
    if (!selectedTerm) return;
    
    setTerms(prev => prev.filter(term => term.termId !== selectedTerm.termId));
    toast({
      title: "Thành công",
      description: "Đã xóa thuật ngữ",
    });
    resetForm();
  };

  const handleAddPhoto = () => {
    const newPhotoIndex = formData.photos.length + 1;
    const newPhoto = {
      photoName: `${formData.termId}_${newPhotoIndex}`,
      photoPath: '',
      isMain: formData.photos.length === 0
    };
    setFormData({
      ...formData,
      photos: [...formData.photos, newPhoto]
    });
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    // If we removed the main photo, make the first photo main
    if (formData.photos[index].isMain && newPhotos.length > 0) {
      newPhotos[0].isMain = true;
    }
    setFormData({
      ...formData,
      photos: newPhotos
    });
  };

  const isFormValid = () => {
    return formData.termId && formData.dentalWord && formData.vnTerm && formData.productGroup;
  };

  const handleApply = () => {
    if (!isFormValid()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    if (currentMode === 'add') {
      const newTerm: DictionaryTerm = {
        ...formData,
        photos: formData.photos.map((photo, index) => ({
          id: `${Date.now()}_${index}`,
          termId: formData.termId,
          photoName: photo.photoName,
          photoPath: photo.photoPath,
          activePhoto: photo.isMain
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTerms(prev => [...prev, newTerm]);
      toast({
        title: "Thành công",
        description: "Đã thêm thuật ngữ mới",
      });
    } else if (currentMode === 'edit' && selectedTerm) {
      setTerms(prev => prev.map(term => 
        term.termId === selectedTerm.termId 
          ? { 
              ...term, 
              ...formData,
              photos: formData.photos.map((photo, index) => ({
                id: photo.id || `${Date.now()}_${index}`,
                termId: formData.termId,
                photoName: photo.photoName,
                photoPath: photo.photoPath,
                activePhoto: photo.isMain
              })),
              updatedAt: new Date() 
            }
          : term
      ));
      toast({
        title: "Thành công",
        description: "Đã cập nhật thuật ngữ",
      });
    }
    
    resetForm();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              <div className="grid grid-cols-12 gap-6">
                {/* Main Table Section - Col 8 */}
                <div className="col-span-8">
                  <Card className="shadow-xl backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 border border-white/30 dark:border-gray-700/30 hover:border-white/50 dark:hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl">
                    <CardHeader className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/20">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Dictionary Management
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => setCurrentMode('add')}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 border border-green-400/30"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                          <Button 
                            onClick={() => selectedTerm && setCurrentMode('edit')}
                            disabled={!selectedTerm}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 border border-blue-400/30"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            onClick={handleDelete}
                            disabled={!selectedTerm}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 border border-red-400/30"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                          <Button 
                            onClick={handleApply}
                            disabled={!isFormValid()}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 border border-purple-400/30"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Apply
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {/* Search and Filter Controls */}
                      <div className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Search terms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white/90 dark:bg-gray-700/90 border-white/40 dark:border-gray-600/40 shadow-sm focus:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200"
                          />
                        </div>
                        <select 
                          value={productGroupFilter}
                          onChange={(e) => setProductGroupFilter(e.target.value)}
                          className="px-4 py-2 rounded-lg bg-white/90 dark:bg-gray-700/90 border border-white/40 dark:border-gray-600/40 shadow-sm focus:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200"
                        >
                          <option value="">All Groups</option>
                          <option value="RPD">RPD</option>
                          <option value="Crown">Crown</option>
                          <option value="Implant">Implant</option>
                        </select>
                      </div>

                      {/* Dictionary Table */}
                      <div className="overflow-x-auto rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:border-white/50 dark:hover:border-gray-600/50 transition-all duration-300">
                        <table className="w-full">
                          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-white/20 dark:border-gray-700/20">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Term ID</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Dental Word</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Vietnamese</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Group</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Photos</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTerms.map((term) => (
                              <tr 
                                key={term.termId}
                                onClick={() => handleRowClick(term)}
                                className={`cursor-pointer hover:bg-blue-50/60 dark:hover:bg-gray-700/40 border-b border-gray-100/50 dark:border-gray-700/50 transition-all duration-200 ${
                                  selectedTerm?.termId === term.termId ? 'bg-blue-100/60 dark:bg-blue-900/20' : ''
                                }`}
                              >
                                <td className="px-4 py-3 font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                                  {term.termId}
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                                  {term.dentalWord}
                                </td>
                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                  {term.vnTerm}
                                </td>
                                <td className="px-4 py-3">
                                  <Badge variant="secondary" className="text-xs border border-gray-200/50 dark:border-gray-600/50">
                                    {term.productGroup}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge 
                                    variant={term.photos.length > 0 ? "default" : "secondary"}
                                    className="text-xs border border-gray-200/50 dark:border-gray-600/50"
                                  >
                                    {term.photos.length}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Form Panel - Col 4 */}
                <div className="col-span-4">
                  <Card className="shadow-xl backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 border border-white/30 dark:border-gray-700/30 hover:border-white/50 dark:hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl sticky top-6">
                    <CardHeader className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 dark:from-purple-500/20 dark:to-blue-500/20 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/20">
                      <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {currentMode === 'add' ? 'Add New Term' : 
                         currentMode === 'edit' ? 'Edit Term' : 
                         'Term Details'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {currentMode !== 'view' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="termId" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                Term ID
                              </Label>
                              <Input
                                id="termId"
                                value={formData.termId}
                                onChange={(e) => setFormData({...formData, termId: e.target.value})}
                                className="bg-white/90 dark:bg-gray-700/90 border-white/40 dark:border-gray-600/40 shadow-sm focus:shadow-md hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200"
                                placeholder="RPD0001"
                              />
                            </div>
                            <div>
                              <Label htmlFor="productGroup" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                Product Group
                              </Label>
                              <select
                                id="productGroup"
                                value={formData.productGroup}
                                onChange={(e) => setFormData({...formData, productGroup: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg bg-white/90 dark:bg-gray-700/90 border border-white/40 dark:border-gray-600/40 shadow-sm focus:shadow-md hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200"
                              >
                                <option value="">Select Group</option>
                                <option value="RPD">RPD</option>
                                <option value="Crown">Crown</option>
                                <option value="Implant">Implant</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="dentalWord" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                              Dental Word
                            </Label>
                            <Input
                              id="dentalWord"
                              value={formData.dentalWord}
                              onChange={(e) => setFormData({...formData, dentalWord: e.target.value})}
                              className="bg-white/90 dark:bg-gray-700/90 border-white/40 dark:border-gray-600/40 shadow-sm focus:shadow-md hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200"
                              placeholder="Mandible"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="vnTerm" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                Vietnamese Term
                              </Label>
                              <Input
                                id="vnTerm"
                                value={formData.vnTerm}
                                onChange={(e) => setFormData({...formData, vnTerm: e.target.value})}
                                className="bg-white/90 dark:bg-gray-700/90 border-white/40 dark:border-gray-600/40 shadow-sm focus:shadow-md hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200"
                                placeholder="Hàm dưới"
                              />
                            </div>
                            <div>
                              <Label htmlFor="engTerm" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                English Term
                              </Label>
                              <Input
                                id="engTerm"
                                value={formData.engTerm}
                                onChange={(e) => setFormData({...formData, engTerm: e.target.value})}
                                className="bg-white/90 dark:bg-gray-700/90 border-white/40 dark:border-gray-600/40 shadow-sm focus:shadow-md hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200"
                                placeholder="Mand"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="engDescription" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                              English Description
                            </Label>
                            <Textarea
                              id="engDescription"
                              value={formData.engDescription}
                              onChange={(e) => setFormData({...formData, engDescription: e.target.value})}
                              className="bg-white/90 dark:bg-gray-700/90 border-white/40 dark:border-gray-600/40 shadow-sm focus:shadow-md hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200"
                              placeholder="The lower jaw"
                              rows={3}
                            />
                          </div>

                          <div>
                            <Label htmlFor="vnDescription" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                              Vietnamese Description
                            </Label>
                            <Textarea
                              id="vnDescription"
                              value={formData.vnDescription}
                              onChange={(e) => setFormData({...formData, vnDescription: e.target.value})}
                              className="bg-white/90 dark:bg-gray-700/90 border-white/40 dark:border-gray-600/40 shadow-sm focus:shadow-md hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200"
                              placeholder="Hàm dưới"
                              rows={3}
                            />
                          </div>

                          {/* Photos Section */}
                          <div>
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                              Photos
                            </Label>
                            <div className="border-2 border-dashed border-gray-300/60 dark:border-gray-600/60 hover:border-purple-300 dark:hover:border-purple-500 rounded-lg p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300">
                              <div className="grid grid-cols-2 gap-2 mb-4">
                                {formData.photos.map((photo, index) => (
                                  <div key={index} className="relative group">
                                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs border border-gray-200/60 dark:border-gray-600/60 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200">
                                      {photo.photoName || `Photo ${index + 1}`}
                                    </div>
                                    <button
                                      onClick={() => handleRemovePhoto(index)}
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity border border-red-400/30"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                    {photo.isMain && (
                                      <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded border border-blue-400/30">
                                        Main
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  onClick={handleAddPhoto}
                                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 border border-blue-400/30"
                                  size="sm"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Photo
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-600 dark:text-gray-400 text-center py-8">
                          Select a term to view details or click Add to create new term
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}