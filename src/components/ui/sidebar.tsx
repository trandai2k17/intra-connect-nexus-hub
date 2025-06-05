
import { TooltipProvider } from "@/components/ui/tooltip"

// Export context and provider
export { SidebarProvider, useSidebar } from "./sidebar/SidebarContext"

// Export main sidebar component
export { Sidebar } from "./sidebar/Sidebar"

// Export layout components
export { SidebarInset, SidebarHeader, SidebarFooter, SidebarContent } from "./sidebar/SidebarLayout"

// Export group components
export { SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent } from "./sidebar/SidebarGroup"

// Export menu components
export { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSkeleton } from "./sidebar/SidebarMenu"

// Export submenu components
export { SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "./sidebar/SidebarSubmenu"

// Export control components
export { SidebarTrigger, SidebarRail, SidebarInput, SidebarSeparator } from "./sidebar/SidebarControls"

// Re-export TooltipProvider for compatibility
export { TooltipProvider }
