
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-10 w-10 p-0 border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-200"
    >
      {theme === 'light' ? (
        <Sun className="h-4 w-4 text-orange-500" />
      ) : (
        <Moon className="h-4 w-4 text-blue-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
