
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from './CodeBlock';

interface CSSClass {
  category: string;
  name: string;
  description: string;
  example: string;
  css: string;
}

interface CSSClassCardProps {
  cssClass: CSSClass;
  categoryName: string;
}

export const CSSClassCard: React.FC<CSSClassCardProps> = ({ cssClass, categoryName }) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          .{cssClass.name}
          <Badge variant="outline">CSS Class</Badge>
          <Badge variant="outline" className="text-xs">
            {categoryName}
          </Badge>
        </CardTitle>
        <CardDescription>{cssClass.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Usage</h4>
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
            className="{cssClass.example}"
          </code>
        </div>
        <CodeBlock code={cssClass.css} language="css" />
      </CardContent>
    </Card>
  );
};
