import { useState } from "react";
import { Settings, Home, Coffee, BookOpen, User, Bell, Phone, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export const SettingsTab = () => {
  const [environment, setEnvironment] = useState("dorm");
  const [sensitivity, setSensitivity] = useState([75]);
  const [soundCategories, setSoundCategories] = useState({
    personal: true,
    door: true,
    communication: true,
    safety: true,
  });

  const environments = [
    { id: "dorm", name: "Dorm Room", icon: Home, description: "Optimized for close-quarters living" },
    { id: "library", name: "Library", icon: BookOpen, description: "Quiet environment with occasional sounds" },
    { id: "cafe", name: "Café", icon: Coffee, description: "Background chatter and activity" },
    { id: "custom", name: "Custom", icon: User, description: "Personalized settings" },
  ];

  const soundTypes = [
    {
      key: "personal",
      name: "Personal",
      icon: User,
      description: "Name calls, 'Hey' alerts",
      sounds: ["Name mentions", "Personal calls", "Direct address"],
    },
    {
      key: "door",
      name: "Door & Entry",
      icon: Home,
      description: "Knocks, doorbell, door opening",
      sounds: ["Door knocks", "Doorbell", "Door opening/closing"],
    },
    {
      key: "communication",
      name: "Communication",
      icon: Phone,
      description: "Phone, messages, notifications",
      sounds: ["Phone rings", "Message alerts", "Notification sounds"],
    },
    {
      key: "safety",
      name: "Safety",
      icon: Shield,
      description: "Alarms, sirens, emergency sounds",
      sounds: ["Fire alarms", "Emergency sirens", "Warning beeps"],
    },
  ];

  const toggleSoundCategory = (key: string) => {
    setSoundCategories(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Environment Presets */}
      <div className="space-y-6">
        <div className="glass-card">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-primary" />
            <span>Environment Presets</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {environments.map((env) => {
              const Icon = env.icon;
              const isSelected = environment === env.id;
              
              return (
                <Card
                  key={env.id}
                  className={`
                    cursor-pointer transition-all duration-300 p-4 border
                    ${isSelected 
                      ? 'gradient-primary text-white border-primary glow-primary' 
                      : 'glass-hover border-glass-border'
                    }
                  `}
                  onClick={() => setEnvironment(env.id)}
                >
                  <div className="text-center space-y-2">
                    <Icon className={`w-8 h-8 mx-auto ${isSelected ? 'text-white' : 'text-primary'}`} />
                    <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-foreground'}`}>
                      {env.name}
                    </h3>
                    <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {env.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sensitivity Control */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Detection Sensitivity</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Low (Quiet)</span>
              <span className="font-semibold text-primary">{sensitivity[0]}%</span>
              <span className="text-muted-foreground">High (Sensitive)</span>
            </div>
            
            <Slider
              value={sensitivity}
              onValueChange={setSensitivity}
              max={100}
              step={5}
              className="py-4"
            />
            
            <div className="text-center text-sm text-muted-foreground">
              {sensitivity[0] >= 80 ? "Very sensitive - May catch background noise" :
               sensitivity[0] >= 60 ? "Balanced - Recommended for most environments" :
               "Conservative - Only obvious sounds detected"}
            </div>
          </div>
        </div>
      </div>

      {/* Sound Categories */}
      <div className="space-y-6">
        <div className="glass-card">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary" />
            <span>Sound Categories</span>
          </h2>
          
          <div className="space-y-4">
            {soundTypes.map((type) => {
              const Icon = type.icon;
              const isEnabled = soundCategories[type.key as keyof typeof soundCategories];
              
              return (
                <div
                  key={type.key}
                  className={`
                    p-4 rounded-lg border transition-all duration-300
                    ${isEnabled ? 'border-primary/30 bg-primary/5' : 'border-glass-border bg-glass'}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon className={`w-5 h-5 mt-1 ${isEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{type.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {type.sounds.map((sound) => (
                            <span
                              key={sound}
                              className={`
                                text-xs px-2 py-1 rounded-full
                                ${isEnabled 
                                  ? 'bg-primary/20 text-primary' 
                                  : 'bg-muted text-muted-foreground'
                                }
                              `}
                            >
                              {sound}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={() => toggleSoundCategory(type.key)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Training */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4">Custom Sound Training</h3>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Train the AI to recognize specific sounds unique to your environment.
            </p>
            <Button variant="glass" className="w-full">
              Record Custom Sound
            </Button>
            <Button variant="glass" className="w-full">
              Manage Trained Sounds
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};