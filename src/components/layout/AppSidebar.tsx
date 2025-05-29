
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Building2,
  Users,
  Cog,
  BarChart3,
  Package,
  ShoppingCart,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Home
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Trang chủ", url: "/", icon: Home, badge: null },
  { title: "IT Support", url: "/it", icon: Monitor, badge: "2" },
  { title: "Sản xuất", url: "/production", icon: Building2, badge: null },
  { title: "QA/QC", url: "/quality", icon: BarChart3, badge: "5" },
  { title: "Nhân sự", url: "/hr", icon: Users, badge: null },
  { title: "Kho bãi", url: "/inventory", icon: Package, badge: "12" },
  { title: "Mua hàng", url: "/purchase", icon: ShoppingCart, badge: null },
  { title: "Cài đặt", url: "/settings", icon: Cog, badge: null },
];

export function AppSidebar() {
  const { collapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <Sidebar 
      className={cn(
        "transition-all duration-300 ease-in-out border-r border-white/20",
        "bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-xl",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible
    >
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-intranet-primary to-intranet-secondary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-intranet-gray-800 text-sm">IntraConnect</h2>
              <p className="text-xs text-intranet-gray-500">Nexus Hub</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-intranet-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-intranet-gray-600" />
          )}
        </button>
      </div>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      "group relative rounded-xl transition-all duration-200",
                      "hover:bg-gradient-to-r hover:from-intranet-primary/10 hover:to-intranet-secondary/10",
                      "hover:shadow-lg hover:shadow-intranet-primary/20",
                      isActive(item.url) && "bg-gradient-to-r from-intranet-primary to-intranet-secondary text-white shadow-lg"
                    )}
                  >
                    <NavLink to={item.url} className="flex items-center w-full p-3">
                      <item.icon className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        collapsed ? "mx-auto" : "mr-3",
                        isActive(item.url) ? "text-white" : "text-intranet-gray-600 group-hover:text-intranet-primary"
                      )} />
                      {!collapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span className={cn(
                            "font-medium text-sm transition-colors duration-200",
                            isActive(item.url) ? "text-white" : "text-intranet-gray-700 group-hover:text-intranet-primary"
                          )}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className={cn(
                              "px-2 py-1 text-xs rounded-full font-medium",
                              isActive(item.url) 
                                ? "bg-white/20 text-white" 
                                : "bg-intranet-primary/10 text-intranet-primary group-hover:bg-intranet-primary group-hover:text-white"
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-16 bg-intranet-gray-800 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          {item.title}
                          {item.badge && (
                            <span className="ml-2 px-1.5 py-0.5 bg-intranet-primary rounded-full text-xs">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
