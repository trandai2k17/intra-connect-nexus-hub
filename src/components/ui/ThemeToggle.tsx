
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
      className="h-10 w-10 p-0 border-white/30 hover:bg-white/20 dark:border-gray-600 dark:hover:bg-gray-800 bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 relative overflow-hidden group"
    >
      {/* Geometric decoration */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-white/20 rounded transform rotate-45 group-hover:scale-110 transition-transform"></div>
      
      {theme === 'light' ? (
        <Sun className="h-4 w-4 text-orange-400 group-hover:text-orange-300 transition-colors" />
      ) : (
        <Moon className="h-4 w-4 text-blue-300 group-hover:text-blue-200 transition-colors" />
      )}
      <span className="sr-only">Toggle theme</span>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
    </Button>
  );
}
