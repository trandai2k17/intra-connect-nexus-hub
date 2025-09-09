import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
}

export function Layout({ children, showSidebar = true, showHeader = true }: LayoutProps) {
  if (!showSidebar && !showHeader) {
    // Full page layout (for login, tv displays, etc.)
    return <div className="min-h-screen w-full">{children}</div>;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {showSidebar && <AppSidebar />}
        
        <div className="flex-1 flex flex-col min-h-screen">
          {showHeader && <Header />}
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Specialized layout components for different page types
export function DashboardLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}

export function FullPageLayout({ children }: { children: ReactNode }) {
  return <Layout showSidebar={false} showHeader={false}>{children}</Layout>;
}

export function HeaderOnlyLayout({ children }: { children: ReactNode }) {
  return <Layout showSidebar={false}>{children}</Layout>;
}