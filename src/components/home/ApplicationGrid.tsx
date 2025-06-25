
import { useState } from "react";
import { ApplicationTabs } from "./ApplicationTabs";
import { applications, companyWebPages } from "./applicationData";

interface ApplicationGridProps {
  activeTab: string;
}

export function ApplicationGrid({ activeTab }: ApplicationGridProps) {
  const [favorites, setFavorites] = useState<number[]>([1, 4, 6, 7]);
  const [activeAppTab, setActiveAppTab] = useState("software");

  const filteredApps = applications.filter(app => {
    if (activeTab === "all") return true;
    return app.departments.includes(activeTab);
  });

  const toggleFavorite = (appId: number) => {
    setFavorites(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  return (
    <div className="bg-gradient-to-br from-white via-white to-blue-50/20 rounded-3xl border border-white/40 p-8 shadow-xl">
      <ApplicationTabs
        activeTab={activeAppTab}
        onTabChange={setActiveAppTab}
        filteredApps={filteredApps}
        companyWebPages={companyWebPages}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
