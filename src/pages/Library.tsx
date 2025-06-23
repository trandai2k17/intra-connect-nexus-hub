import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Eye, Palette, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CategoryFilter } from '@/components/library/CategoryFilter';
import { ComponentCard } from '@/components/library/ComponentCard';
import { CSSClassCard } from '@/components/library/CSSClassCard';

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Categories for organization
  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'button', name: 'Button' },
    { id: 'card', name: 'Card' },
    { id: 'navigation', name: 'Navigation' },
    { id: 'text', name: 'Text' },
  ];

  // Component examples với categories
  const componentExamples = [
    {
      category: 'button',
      name: "Glass Navigation Button",
      description: "Button với hiệu ứng glass và gradient hover",
      preview: (
        <Button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-gradient-to-r hover:from-[#4c4cff] hover:to-[#00d2ff] hover:text-white transition-all duration-300 relative overflow-hidden group">
          <span className="relative z-10">Glass Button</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </Button>
      ),
      html: `<button class="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-gradient-to-r hover:from-[#4c4cff] hover:to-[#00d2ff] hover:text-white transition-all duration-300 relative overflow-hidden group">
  <span class="relative z-10">Glass Button</span>
  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
</button>`,
      css: `.glass-button {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.glass-button:hover {
  background: linear-gradient(to right, #4c4cff, #00d2ff);
  color: white;
}

.glass-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.7s ease;
}

.glass-button:hover::before {
  left: 100%;
}`
    },
    {
      category: 'card',
      name: "Application Card",
      description: "Card với hover effect và gradient border",
      preview: (
        <div className="app-card border-t-2 border-t-blue-400 border-opacity-60 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden w-48 bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold">Ứng dụng Demo</h3>
            <p className="text-xs text-gray-500">Mô tả ứng dụng</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </div>
      ),
      html: `<div class="app-card border-t-2 border-t-blue-400 border-opacity-60 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden">
  <div class="card-header text-center">
    <div class="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
      <i class="icon w-6 h-6 text-white"></i>
    </div>
    <h3 class="card-title text-sm">Ứng dụng Demo</h3>
    <p class="card-description text-xs">Mô tả ứng dụng</p>
  </div>
  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
</div>`,
      css: `.app-card {
  border-top: 2px solid rgb(96 165 250 / 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.app-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.app-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.7s ease;
}

.app-card:hover::before {
  left: 100%;
}`
    },
    {
      category: 'navigation',
      name: "Navigation Item",
      description: "Navigation với active state và icon",
      preview: (
        <div className="flex items-center gap-4 px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 group relative overflow-hidden min-h-[56px] bg-gradient-to-r from-[#4c4cff] to-[#00d2ff] text-white shadow-lg shadow-blue-500/25">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium">Active Navigation</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </div>
      ),
      html: `<div class="nav-item active">
  <div class="nav-icon">
    <i class="icon"></i>
  </div>
  <span class="nav-text">Active Navigation</span>
  <div class="nav-hover-effect"></div>
</div>`,
      css: `.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 56px;
  color: #090909;
}

.nav-item.active {
  background: linear-gradient(to right, #4c4cff, #00d2ff);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 76, 255, 0.25);
}

.nav-item:hover {
  background: linear-gradient(to right, #4c4cff, #00d2ff);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 76, 255, 0.2);
}

.nav-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
}

.nav-hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.7s ease;
}

.nav-item:hover .nav-hover-effect {
  left: 100%;
}`
    },
    {
      category: 'card',
      name: "Geometric Background Card",
      description: "Card với geometric shapes và animation",
      preview: (
        <div className="relative w-full h-32 bg-gradient-to-r from-[#4c4cff] to-[#00d2ff] rounded-lg overflow-hidden">
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded transform rotate-15 animate-float"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/15 rounded transform -rotate-15"></div>
          <div className="flex items-center justify-center h-full text-white font-medium">
            Geometric Background Demo
          </div>
        </div>
      ),
      html: `<div class="geometric-container">
  <div class="geometric-shape shape-1"></div>
  <div class="geometric-shape shape-2"></div>
  <div class="content">Geometric Background Demo</div>
</div>`,
      css: `.geometric-container {
  position: relative;
  background: linear-gradient(to right, #4c4cff, #00d2ff);
  border-radius: 0.5rem;
  overflow: hidden;
}

.geometric-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
}

.shape-1 {
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  transform: rotate(15deg);
  animation: float 6s ease-in-out infinite;
}

.shape-2 {
  bottom: 1rem;
  left: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  transform: rotate(-15deg);
  background: rgba(255, 255, 255, 0.15);
}

@keyframes float {
  0%, 100% {
    transform: rotate(15deg) translateY(0px);
  }
  50% {
    transform: rotate(15deg) translateY(-10px);
  }
}`
    },
    {
      category: 'text',
      name: "Brand Gradient Text",
      description: "Text với gradient màu brand",
      preview: (
        <div className="text-2xl font-bold bg-gradient-to-r from-[#4c4cff] to-[#00d2ff] bg-clip-text text-transparent">
          IT Portal Brand Text
        </div>
      ),
      html: `<h1 class="text-brand-gradient">IT Portal Brand Text</h1>`,
      css: `.text-brand-gradient {
  background: linear-gradient(135deg, #4c4cff 0%, #00d2ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.5rem;
  font-weight: bold;
}`
    },
    {
      category: 'button',
      name: "Collapse Button",
      description: "Button Thu gọn với hiệu ứng hover",
      preview: (
        <Button variant="outline" className="border-gray-300 hover:bg-gradient-to-r hover:from-[#4c4cff] hover:to-[#00d2ff] hover:text-white hover:border-transparent transition-all duration-300">
          Thu gọn
        </Button>
      ),
      html: `<button class="collapse-btn">Thu gọn</button>`,
      css: `.collapse-btn {
  border: 1px solid #d1d5db;
  background: transparent;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.collapse-btn:hover {
  background: linear-gradient(to right, #4c4cff, #00d2ff);
  color: white;
  border-color: transparent;
}`
    }
  ];

  // CSS Classes examples
  const cssClasses = [
    {
      category: 'card',
      name: "glass-card",
      description: "Glass morphism card effect",
      example: "glass-card",
      css: `background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 8px 32px rgba(76, 76, 255, 0.1);`
    },
    {
      category: 'text',
      name: "text-brand-gradient",
      description: "Gradient text với brand colors",
      example: "text-brand-gradient",
      css: `background: linear-gradient(135deg, #4c4cff 0%, #00d2ff 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;`
    },
    {
      category: 'card',
      name: "animate-float",
      description: "Float animation cho geometric elements",
      example: "animate-float",
      css: `@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}`
    }
  ];

  // Filter components and classes based on selected category
  const filteredComponents = selectedCategory === 'all' 
    ? componentExamples 
    : componentExamples.filter(comp => comp.category === selectedCategory);

  const filteredClasses = selectedCategory === 'all' 
    ? cssClasses 
    : cssClasses.filter(cls => cls.category === selectedCategory);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#4c4cff] to-[#00d2ff] bg-clip-text text-transparent">
                  Component Library
                </h2>
                <p className="text-muted-foreground">
                  Thư viện template và components được sử dụng trong IT Portal
                </p>
              </div>
            </div>

            <Alert>
              <Palette className="h-4 w-4" />
              <AlertDescription>
                Đây là trang demo các components, effects và styling được sử dụng trong IT Portal. 
                Bạn có thể xem và copy code để sử dụng trong dự án của mình.
              </AlertDescription>
            </Alert>

            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <Tabs defaultValue="components" className="space-y-4">
              <TabsList>
                <TabsTrigger value="components" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Components
                </TabsTrigger>
                <TabsTrigger value="classes" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  CSS Classes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="space-y-6">
                {filteredComponents.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    Không có components nào trong danh mục này
                  </div>
                ) : (
                  filteredComponents.map((component, index) => (
                    <ComponentCard 
                      key={index} 
                      component={component} 
                      categoryName={categories.find(c => c.id === component.category)?.name || ''}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="classes" className="space-y-6">
                {filteredClasses.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    Không có CSS classes nào trong danh mục này
                  </div>
                ) : (
                  filteredClasses.map((cssClass, index) => (
                    <CSSClassCard 
                      key={index} 
                      cssClass={cssClass} 
                      categoryName={categories.find(c => c.id === cssClass.category)?.name || ''}
                    />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Library;
