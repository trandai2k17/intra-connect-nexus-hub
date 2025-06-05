
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/home/HeroBanner";
import { TabNavigation } from "@/components/home/TabNavigation";
import { ApplicationGrid } from "@/components/home/ApplicationGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useLanguage();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 gradient-bg dark:bg-gray-900">
            <div className="p-8 space-y-10">
              {/* Hero Banner */}
              <section className="mb-10">
                <HeroBanner />
              </section>
              
              {/* Tab Navigation */}
              <section className="rounded-3xl p-6 shadow-lg border border-white/30 dark:border-gray-700/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <TabNavigation 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                />
              </section>
              
              {/* Applications Section */}
              <section className="rounded-3xl p-8 shadow-xl border border-white/30 dark:border-gray-700/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gradient-bright dark:text-white">
                      {t('home.apps.title')}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg font-medium">
                      {t('home.apps.subtitle')}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80">
                    {t('home.updated')}
                  </div>
                </div>
                
                <ApplicationGrid activeTab={activeTab} />
              </section>

              {/* Quick Stats */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">{t('home.stats.apps')}</p>
                      <p className="text-4xl font-bold text-gradient dark:text-white mt-2">42</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-medium">+3 từ tuần trước</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <span className="text-white font-bold text-xl">42</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">{t('home.stats.users')}</p>
                      <p className="text-4xl font-bold text-gradient dark:text-white mt-2">1,247</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-medium">+156 hôm nay</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-green-500 to-blue-600">
                      <span className="text-white font-bold text-lg">1K+</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">{t('home.stats.uptime')}</p>
                      <p className="text-4xl font-bold text-gradient dark:text-white mt-2">99.8%</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-medium">30 ngày qua</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-orange-500 to-red-500">
                      <span className="text-white font-bold text-lg">99%</span>
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
