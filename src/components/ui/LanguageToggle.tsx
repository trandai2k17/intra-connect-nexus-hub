
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="h-10 w-10 p-0 border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-700">
        <DropdownMenuItem 
          onClick={() => setLanguage('vi')}
          className={`cursor-pointer ${language === 'vi' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}`}
        >
          <span className="mr-2">🇻🇳</span>
          Tiếng Việt
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={`cursor-pointer ${language === 'en' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}`}
        >
          <span className="mr-2">🇺🇸</span>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
