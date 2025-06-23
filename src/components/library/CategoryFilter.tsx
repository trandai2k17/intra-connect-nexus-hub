
import React from 'react';
import { Button } from '@/components/ui/button';
import { Code, Square, CreditCard, Menu, Type } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Tất cả', icon: Code },
  { id: 'button', name: 'Button', icon: Square },
  { id: 'card', name: 'Card', icon: CreditCard },
  { id: 'navigation', name: 'Navigation', icon: Menu },
  { id: 'text', name: 'Text', icon: Type },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={selectedCategory === category.id 
              ? "bg-gradient-to-r from-[#4c4cff] to-[#00d2ff] text-white border-none" 
              : "hover:bg-gradient-to-r hover:from-[#4c4cff] hover:to-[#00d2ff] hover:text-white transition-all duration-300"
            }
          >
            <Icon className="w-4 h-4 mr-2" />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
};
