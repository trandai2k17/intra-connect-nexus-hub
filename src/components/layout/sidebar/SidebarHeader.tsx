
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`border-b border-white/20 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl transition-all duration-300 ${
      isCollapsed ? 'p-2' : 'p-4'
    }`}>
      <div className="flex items-center justify-center">
        <div className={`flex items-center transition-all duration-300 ${
          isCollapsed ? 'justify-center' : 'space-x-3'
        }`}>
          <div className={`rounded-2xl flex items-center justify-center shadow-lg border border-white/30 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 transition-all duration-300 ${
            isCollapsed ? 'w-10 h-10' : 'w-12 h-12'
          }`}>
            <span className={`text-white font-bold transition-all duration-300 ${
              isCollapsed ? 'text-sm' : 'text-lg'
            }`}>IT</span>
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-300">
              <h2 className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-xl">
                IT Portal
              </h2>
              <p className="text-sm text-gray-600 font-medium">Cổng thông tin nội bộ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
