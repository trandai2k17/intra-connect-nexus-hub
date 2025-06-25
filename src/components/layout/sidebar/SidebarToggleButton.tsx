
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarToggleButton() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-4'}`}>
      <button
        onClick={toggleSidebar}
        className={`
          w-full h-12 rounded-xl flex items-center justify-center 
          transition-all duration-300 group relative overflow-hidden
          bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
          text-white font-semibold shadow-lg hover:shadow-xl
          transform hover:scale-105 active:scale-95
          ${isCollapsed ? 'w-12 h-12 rounded-lg' : ''}
        `}
        title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
      >
        {/* Gradient overlay for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isCollapsed ? (
          <div className="relative z-10 flex flex-col items-center">
            <ChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
          </div>
        ) : (
          <div className="relative z-10 flex items-center space-x-2">
            <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-bold tracking-wide animate-pulse">
              Thu gọn
            </span>
          </div>
        )}

        {/* Shine effect */}
        <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/30 to-transparent w-4 h-16 rotate-45 transform translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-1000" />
      </button>

      {/* Expand hint for collapsed state */}
      {isCollapsed && (
        <div className="mt-2 text-center">
          <div className="text-xs font-bold text-blue-600 animate-bounce">
            ↑
          </div>
          <div className="text-[10px] text-blue-600 font-semibold">
            Mở
          </div>
        </div>
      )}
    </div>
  );
}
