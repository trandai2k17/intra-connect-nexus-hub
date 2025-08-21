import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Video, Download, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ContentViewData {
  recId: number;
  title: string;
  subContent: string;
  contentType: 'Banner' | 'Promotion' | 'Policy' | 'Announcement' | 'Document' | 'Campaign';
  textContent: string;
  pdfUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  category: string;
  priority: number;
  createdBy: string;
  createdAt: Date;
}

export default function ContentView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [content, setContent] = useState<ContentViewData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call to Supabase
  useEffect(() => {
    const mockContent: ContentViewData = {
      recId: parseInt(id || '1'),
      title: 'Company Policy Update - Remote Work Guidelines',
      subContent: 'Updated guidelines for remote work arrangements and collaboration protocols',
      contentType: 'Policy',
      textContent: `
        <h2>Remote Work Policy Overview</h2>
        <p>This document outlines the updated remote work guidelines effective from January 2024.</p>
        
        <h3>Key Changes</h3>
        <ul>
          <li>Flexible working hours between 8 AM - 6 PM</li>
          <li>Mandatory office days: Tuesday and Thursday</li>
          <li>Video conferencing requirements for team meetings</li>
          <li>Performance evaluation criteria updates</li>
        </ul>
        
        <h3>Equipment and Setup</h3>
        <p>All remote workers are entitled to:</p>
        <ul>
          <li>Laptop and necessary accessories</li>
          <li>High-speed internet allowance</li>
          <li>Ergonomic home office setup budget</li>
        </ul>
        
        <h3>Communication Protocols</h3>
        <p>Regular communication is essential for successful remote work...</p>
      `,
      pdfUrl: '/documents/remote-work-policy-2024.pdf',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: '/images/remote-work-banner.jpg',
      ctaLabel: 'Download Full Policy',
      ctaUrl: '/documents/remote-work-policy-2024.pdf',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      isActive: true,
      category: 'Policy',
      priority: 1,
      createdBy: 'HR Department',
      createdAt: new Date('2024-01-01')
    };

    // Simulate API call delay
    setTimeout(() => {
      setContent(mockContent);
      setLoading(false);
    }, 500);
  }, [id]);

  const getContentTypeColor = (type: string) => {
    const colors = {
      Banner: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Promotion: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Policy: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Announcement: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      Document: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      Campaign: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[type as keyof typeof colors] || colors.Document;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-muted rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
        <p className="text-muted-foreground mb-6">The requested content could not be found.</p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Badge className={getContentTypeColor(content.contentType)}>
          {content.contentType}
        </Badge>
        <Badge variant="outline">{content.category}</Badge>
      </div>

      {/* Main content card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{content.title}</CardTitle>
              {content.subContent && (
                <p className="text-muted-foreground text-lg">{content.subContent}</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
            <span>Created by: {content.createdBy}</span>
            <span>•</span>
            <span>Created: {content.createdAt.toLocaleDateString()}</span>
            {content.endDate && (
              <>
                <span>•</span>
                <span>Valid until: {content.endDate.toLocaleDateString()}</span>
              </>
            )}
          </div>
        </CardHeader>

        {/* Hero Image */}
        {content.imageUrl && (
          <div className="px-6">
            <img 
              src={content.imageUrl} 
              alt={content.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          </div>
        )}

        <CardContent>
          {/* Video Embed */}
          {content.videoUrl && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Video className="w-5 h-5 mr-2" />
                Video Content
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={content.videoUrl}
                  title={content.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Text Content */}
          {content.textContent && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Content Details
              </h3>
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content.textContent }}
              />
            </div>
          )}

          {/* PDF Download */}
          {content.pdfUrl && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Documents
              </h3>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="font-medium">Full Document (PDF)</p>
                      <p className="text-sm text-muted-foreground">Complete policy document</p>
                    </div>
                  </div>
                  <Button asChild>
                    <a href={content.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          )}

          <Separator className="my-6" />

          {/* Call to Action */}
          {content.ctaLabel && content.ctaUrl && (
            <div className="text-center">
              <Button size="lg" asChild>
                <a href={content.ctaUrl} target="_blank" rel="noopener noreferrer">
                  {content.ctaLabel}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}