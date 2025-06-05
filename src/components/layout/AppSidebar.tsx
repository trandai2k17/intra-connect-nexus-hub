
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  TooltipProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarHeader as CustomSidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarToggleButton } from "./sidebar/SidebarToggleButton";

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <TooltipProvider delayDuration={300}>
      <Sidebar 
        className={`border-r border-white/20 shadow-2xl z-50 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-72'
        }`}
        collapsible="icon"
      >
        <SidebarHeader className={`transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-4'}`}>
          <CustomSidebarHeader />
        </SidebarHeader>

        <SidebarContent className="transition-all duration-300">
          <SidebarNavigation />
        </SidebarContent>

        <SidebarFooter className={`transition-all duration-300 ${isCollapsed ? 'p-1' : 'p-2'}`}>
          <SidebarToggleButton />
          {!isCollapsed && (
            <div className="text-xs text-gray-500 text-center font-medium mt-2 transition-opacity duration-300">
              © 2024 IT Department
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
