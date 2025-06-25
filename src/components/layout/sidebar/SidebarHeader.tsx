
import { useSidebar } from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { DentalLogo } from "./DentalLogo";

export function SidebarHeader() {
  const { state } = useSidebar();
  const { t } = useLanguage();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`bg-gradient-to-r from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-700/90 backdrop-blur-xl transition-all duration-300 ${
      isCollapsed ? 'p-2' : 'p-4'
    }`}>
      <div className="flex items-center justify-center">
        <div className={`flex items-center transition-all duration-300 ${
          isCollapsed ? 'justify-center' : 'space-x-3'
        }`}>
          {/* Logo container */}
          <div className={`rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
            isCollapsed ? 'w-10 h-10' : 'w-12 h-12'
          }`}>
            <DentalLogo className={`transition-all duration-300 ${
              isCollapsed ? 'w-8 h-8' : 'w-10 h-10'
            }`} />
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-300">
              <h2 className="font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent text-xl">
                Digital Age
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Dental Laboratories</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
