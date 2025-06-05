
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="p-4 border-b border-white/20 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl">
      <div className="flex items-center justify-center">
        <div className={`flex items-center transition-all duration-300 ${
          isCollapsed ? 'justify-center' : 'space-x-3'
        }`}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/30 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
            <span className="text-white font-bold text-lg">IT</span>
          </div>
          {!isCollapsed && (
            <div>
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
