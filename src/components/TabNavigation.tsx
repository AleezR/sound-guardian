import { Mic, Settings, BarChart3, PlayCircle, User } from "lucide-react";
import { TabType } from "@/pages/Index";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "listen" as TabType, label: "Listen", icon: Mic, emoji: "🎤" },
  { id: "settings" as TabType, label: "Settings", icon: Settings, emoji: "⚙️" },
  { id: "analytics" as TabType, label: "Analytics", icon: BarChart3, emoji: "📊" },
  { id: "demo" as TabType, label: "Demo", icon: PlayCircle, emoji: "🎭" },
  { id: "profile" as TabType, label: "Profile", icon: User, emoji: "👤" },
];

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="glass-card p-2">
      <div className="flex space-x-2 overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 min-w-fit
                ${isActive 
                  ? 'gradient-primary text-white shadow-lg glow-primary scale-105' 
                  : 'glass-hover text-foreground hover:scale-102'
                }
              `}
            >
              <span className="text-lg">{tab.emoji}</span>
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-primary'}`} />
              <span className={`font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-foreground'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};