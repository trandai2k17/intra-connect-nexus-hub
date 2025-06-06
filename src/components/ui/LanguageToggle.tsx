
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={toggleLanguage}
      className="h-10 px-3 border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
    >
      <Globe className="h-4 w-4 mr-2" />
      <span className="font-medium">{language === 'vi' ? 'EN' : 'VI'}</span>
    </Button>
  );
}
