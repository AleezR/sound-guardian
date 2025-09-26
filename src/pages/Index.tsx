import { useState } from "react";
import { Header } from "@/components/Header";
import { TabNavigation } from "@/components/TabNavigation";
import { ListenTab } from "@/components/tabs/ListenTab";
import { SettingsTab } from "@/components/tabs/SettingsTab";
import { AnalyticsTab } from "@/components/tabs/AnalyticsTab";
import { DemoTab } from "@/components/tabs/DemoTab";
import { ProfileTab } from "@/components/tabs/ProfileTab";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { ToastContainer } from "@/components/ToastContainer";
import { Toaster } from "@/components/ui/sonner";

export type TabType = "listen" | "settings" | "analytics" | "demo" | "profile";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("listen");
  const [isListening, setIsListening] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "listen":
        return <ListenTab isListening={isListening} setIsListening={setIsListening} />;
      case "settings":
        return <SettingsTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "demo":
        return <DemoTab />;
      case "profile":
        return <ProfileTab />;
      default:
        return <ListenTab isListening={isListening} setIsListening={setIsListening} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-cosmic opacity-100" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-success/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header isListening={isListening} />
        
        <div className="container mx-auto px-4 py-8">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="mt-8 animate-fade-in">
            {renderActiveTab()}
          </div>
        </div>
      </div>
      
      <FloatingActionButton 
        isListening={isListening} 
        onToggle={() => setIsListening(!isListening)} 
      />
      
      <Toaster />
    </div>
  );
};

export default Index;