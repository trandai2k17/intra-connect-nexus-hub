
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarHeader as CustomSidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarToggleButton } from "./sidebar/SidebarToggleButton";

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      className={`border-r border-white/20 shadow-2xl z-50 bg-white/95 backdrop-blur-xl transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
      collapsible="icon"
    >
      <SidebarHeader>
        <CustomSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavigation />
      </SidebarContent>

      <SidebarFooter>
        <SidebarToggleButton />
        {!isCollapsed && (
          <div className="text-xs text-gray-500 text-center font-medium mt-2">
            © 2024 IT Department
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
