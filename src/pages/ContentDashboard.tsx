import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentCard } from '@/components/home/ContentCard';
import { Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  category: string;
  priority: number;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdBy: string;
}

export default function ContentDashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [contents, setContents] = useState<ContentItem[]>([]);

  // Mock data - replace with actual API call to Supabase
  useEffect(() => {
    const mockContents: ContentItem[] = [
      {
        recId: 1,
        title: 'Remote Work Policy Update 2024',
        subContent: 'New guidelines for remote work arrangements and collaboration protocols',
        contentType: 'Policy',
        textContent: 'Detailed policy content...',
        pdfUrl: '/documents/remote-work-policy.pdf',
        imageUrl: '/images/remote-work.jpg',
        ctaLabel: 'Read Full Policy',
        category: 'HR Policies',
        priority: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
        createdBy: 'HR Department'
      },
      {
        recId: 2,
        title: 'Q1 Performance Review Process',
        subContent: 'Important information about the upcoming quarterly performance reviews',
        contentType: 'Announcement',
        textContent: 'Performance review details...',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        ctaLabel: 'Watch Training Video',
        category: 'Performance',
        priority: 2,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-15'),
        isActive: true,
        createdBy: 'Management'
      },
      {
        recId: 3,
        title: 'Health & Safety Guidelines',
        subContent: 'Updated workplace safety protocols and emergency procedures',
        contentType: 'Document',
        textContent: 'Safety guidelines content...',
        pdfUrl: '/documents/safety-guidelines.pdf',
        imageUrl: '/images/safety.jpg',
        ctaLabel: 'Download Guidelines',
        category: 'Safety',
        priority: 3,
        startDate: new Date('2024-01-15'),
        isActive: true,
        createdBy: 'Safety Team'
      },
      {
        recId: 4,
        title: 'Summer Team Building Campaign',
        subContent: 'Join our exciting summer activities and team building events',
        contentType: 'Campaign',
        textContent: 'Campaign details...',
        imageUrl: '/images/team-building.jpg',
        ctaLabel: 'Register Now',
        category: 'Events',
        priority: 4,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        isActive: true,
        createdBy: 'HR Events'
      },
      {
        recId: 5,
        title: 'New Employee Benefits Package',
        subContent: 'Enhanced benefits package now available for all employees',
        contentType: 'Promotion',
        textContent: 'Benefits package details...',
        pdfUrl: '/documents/benefits-package.pdf',
        imageUrl: '/images/benefits.jpg',
        ctaLabel: 'Learn More',
        category: 'Benefits',
        priority: 5,
        startDate: new Date('2024-02-01'),
        isActive: true,
        createdBy: 'Benefits Team'
      }
    ];

    setContents(mockContents);
  }, []);

  // Filter contents based on search and selection
  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.subContent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    const matchesType = selectedType === 'all' || content.contentType === selectedType;
    
    return content.isActive && matchesSearch && matchesCategory && matchesType;
  });

  // Get unique categories and types for filters
  const categories = [...new Set(contents.map(c => c.category))];
  const types = [...new Set(contents.map(c => c.contentType))];

  // Get hero content (highest priority active content)
  const heroContent = contents
    .filter(c => c.isActive)
    .sort((a, b) => a.priority - b.priority)[0];

  const regularContents = filteredContents
    .filter(c => c.recId !== heroContent?.recId)
    .sort((a, b) => a.priority - b.priority);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and view all your dynamic content in one place
          </p>
        </div>
        <Button onClick={() => navigate('/content-management')}>
          <Plus className="w-4 h-4 mr-2" />
          Manage Content
        </Button>
      </div>

      {/* Hero Section */}
      {heroContent && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Content</h2>
          <ContentCard content={heroContent} variant="hero" />
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularContents.map(content => (
          <ContentCard key={content.recId} content={content} />
        ))}
      </div>

      {/* Empty State */}
      {filteredContents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No content found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters
          </p>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
            setSelectedType('all');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}