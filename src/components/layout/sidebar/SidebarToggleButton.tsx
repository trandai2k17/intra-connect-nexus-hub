
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarToggleButton() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="p-4 border-t border-white/20 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl">
      <button
        onClick={toggleSidebar}
        className="w-full h-12 hover:bg-white/80 rounded-xl flex items-center justify-center transition-all duration-200 group border border-white/30 bg-white/90 shadow-lg hover:shadow-xl"
        title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
        ) : (
          <div className="flex items-center space-x-2">
            <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              Thu gọn
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
