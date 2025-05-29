
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/home/HeroBanner";
import { TabNavigation } from "@/components/home/TabNavigation";
import { ApplicationGrid } from "@/components/home/ApplicationGrid";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              {/* Hero Banner */}
              <HeroBanner />
              
              {/* Tab Navigation */}
              <TabNavigation 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
              
              {/* Applications Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-intranet-gray-800">
                      Ứng dụng & Phần mềm
                    </h2>
                    <p className="text-intranet-gray-600 mt-1">
                      Truy cập nhanh các công cụ và hệ thống nội bộ
                    </p>
                  </div>
                  <div className="text-sm text-intranet-gray-500">
                    Cập nhật: 29/11/2024
                  </div>
                </div>
                
                <ApplicationGrid activeTab={activeTab} />
              </section>

              {/* Quick Stats */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-700 font-medium">Ứng dụng đang hoạt động</p>
                      <p className="text-2xl font-bold text-blue-800">42</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">42</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-700 font-medium">Người dùng hoạt động</p>
                      <p className="text-2xl font-bold text-green-800">1,247</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">1K+</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-700 font-medium">Uptime hệ thống</p>
                      <p className="text-2xl font-bold text-purple-800">99.8%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">99%</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
