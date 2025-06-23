
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ComponentExample {
  category: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  html: string;
  css: string;
}

interface ComponentCardProps {
  component: ComponentExample;
  categoryName: string;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component, categoryName }) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {component.name}
              <Badge variant="secondary">Component</Badge>
              <Badge variant="outline" className="text-xs">
                {categoryName}
              </Badge>
            </CardTitle>
            <CardDescription>{component.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </h4>
          <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            {component.preview}
          </div>
        </div>
        
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>
          <TabsContent value="html">
            <CodeBlock code={component.html} language="html" />
          </TabsContent>
          <TabsContent value="css">
            <CodeBlock code={component.css} language="css" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
