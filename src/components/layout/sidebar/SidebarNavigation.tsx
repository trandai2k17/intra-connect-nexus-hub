
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "./navigationData";
import { useLanguage } from "@/contexts/LanguageContext";

export function SidebarNavigation() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const { t } = useLanguage();

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (url?: string) => {
    if (!url) return false;
    return location.pathname === url;
  };

  const isParentActive = (item: any) => {
    if (!item.subItems) return false;
    return item.subItems.some((subItem: any) => isActive(subItem.url));
  };

  const getTranslatedTitle = (title: string) => {
    const translationKey = `sidebar.${title.toLowerCase().replace(/\s+/g, '-')}`;
    return t(translationKey);
  };

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isExpanded = expandedItems.includes(item.title);
        const hasSubItems = 'subItems' in item && item.subItems;
        const itemIsActive = hasSubItems ? isParentActive(item) : isActive('url' in item ? item.url : undefined);

        return (
          <div key={item.title}>
            {hasSubItems ? (
              <button
                onClick={() => toggleExpanded(item.title)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group ${
                  itemIsActive
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${item.color} transition-colors duration-200`} />
                  <span className="font-medium">{getTranslatedTitle(item.title)}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ) : (
              <Link
                to={'url' in item ? item.url : '#'}
                className={`flex items-center space-x-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group ${
                  itemIsActive
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${item.color} transition-colors duration-200`} />
                <span className="font-medium">{getTranslatedTitle(item.title)}</span>
              </Link>
            )}

            {hasSubItems && isExpanded && (
              <div className="ml-4 mt-2 space-y-1">
                {item.subItems.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const subItemIsActive = isActive(subItem.url);
                  
                  return (
                    <Link
                      key={subItem.title}
                      to={subItem.url}
                      className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        subItemIsActive
                          ? "bg-white/15 text-white shadow-md"
                          : "text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <SubIcon className={`w-3.5 h-3.5 ${subItem.color} transition-colors duration-200`} />
                      <span>{getTranslatedTitle(subItem.title)}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
