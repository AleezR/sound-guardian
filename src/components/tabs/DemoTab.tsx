import { useState } from "react";
import { Play, Volume2, Bell, Phone, Home, User, AlertTriangle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const DemoTab = () => {
  const [demoVolume, setDemoVolume] = useState([75]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const demoSounds = [
    {
      id: "door-knock",
      name: "Door Knock",
      icon: Home,
      description: "Typical apartment door knocking pattern",
      color: "primary",
      confidence: 94,
    },
    {
      id: "phone-ring",
      name: "Phone Ring",
      icon: Phone,
      description: "Standard mobile phone ringtone",
      color: "success",
      confidence: 89,
    },
    {
      id: "name-call",
      name: "Name Call",
      icon: User,
      description: "Someone calling 'Alex' or 'Hey Alex'",
      color: "warning",
      confidence: 87,
    },
    {
      id: "doorbell",
      name: "Doorbell",
      icon: Bell,
      description: "Electronic doorbell chime",
      color: "destructive",
      confidence: 92,
    },
    {
      id: "alarm",
      name: "Emergency Alarm",
      icon: AlertTriangle,
      description: "Fire alarm or emergency signal",
      color: "destructive",
      confidence: 98,
    },
    {
      id: "notification",
      name: "Message Alert",
      icon: Settings,
      description: "Text message or app notification",
      color: "primary",
      confidence: 76,
    },
  ];

  const demoScenarios = [
    {
      name: "Study Session",
      description: "Simulates a typical study environment with background noise",
      sounds: ["door-knock", "phone-ring", "name-call"],
      duration: "2 minutes",
    },
    {
      name: "Dorm Life",
      description: "Common sounds in dormitory living",
      sounds: ["door-knock", "doorbell", "name-call"],
      duration: "90 seconds",
    },
    {
      name: "Library Mode",
      description: "Quiet environment with occasional disruptions",
      sounds: ["phone-ring", "notification"],
      duration: "1 minute",
    },
    {
      name: "Emergency Drill",
      description: "Safety alerts and emergency sounds",
      sounds: ["alarm", "doorbell"],
      duration: "30 seconds",
    },
  ];

  const playDemoSound = (soundId: string, soundName: string, confidence: number) => {
    setIsPlaying(soundId);
    
    // Simulate sound playing
    setTimeout(() => {
      setIsPlaying(null);
      toast.success(`🔊 ${soundName} detected!`, {
        description: `AI confidence: ${confidence}% - Detection successful`,
        duration: 3000,
      });
    }, 2000);
  };

  const runDemoScenario = (scenario: typeof demoScenarios[0]) => {
    toast.success(`🎭 Running ${scenario.name} scenario`, {
      description: `Demo will run for ${scenario.duration}`,
      duration: 2000,
    });
    
    // Simulate scenario running with multiple detections
    scenario.sounds.forEach((soundId, index) => {
      const sound = demoSounds.find(s => s.id === soundId);
      if (sound) {
        setTimeout(() => {
          toast.success(`🔊 ${sound.name} detected!`, {
            description: `Scenario detection: ${sound.confidence}% confidence`,
            duration: 2000,
          });
        }, (index + 1) * 3000);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Demo Controls */}
      <div className="glass-card">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Play className="w-5 h-5 text-primary" />
          <span>Sound Testing & Demos</span>
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Demo Volume</h3>
              <p className="text-sm text-muted-foreground">Adjust playback volume for testing</p>
            </div>
            <div className="flex items-center space-x-3 min-w-48">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={demoVolume}
                onValueChange={setDemoVolume}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-sm font-medium text-primary w-12">{demoVolume[0]}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Individual Sound Tests */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Individual Sound Tests</h3>
          
          <div className="grid gap-3">
            {demoSounds.map((sound) => {
              const Icon = sound.icon;
              const isCurrentlyPlaying = isPlaying === sound.id;
              
              return (
                <Card
                  key={sound.id}
                  className="glass-card border transition-all duration-300 hover:scale-102"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${sound.color}/20`}>
                        <Icon className={`w-5 h-5 text-${sound.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{sound.name}</h4>
                        <p className="text-sm text-muted-foreground">{sound.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            {sound.confidence}% accuracy
                          </span>
                        </div>
                      </div>
                    </div>
                    
            <Button
              onClick={() => playDemoSound(sound.id, sound.name, sound.confidence)}
              disabled={isCurrentlyPlaying}
              variant="glass"
              size="sm"
              className={`
                min-w-20 transition-all duration-300
                ${isCurrentlyPlaying ? 'animate-pulse-glow' : ''}
              `}
            >
                      {isCurrentlyPlaying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Playing
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Test
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Demo Scenarios */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Demo Scenarios</h3>
          
          <div className="space-y-3">
            {demoScenarios.map((scenario, index) => (
              <Card
                key={scenario.name}
                className="glass-card border transition-all duration-300 hover:scale-102 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{scenario.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{scenario.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {scenario.sounds.map((soundId) => {
                          const sound = demoSounds.find(s => s.id === soundId);
                          return sound ? (
                            <span
                              key={soundId}
                              className={`text-xs px-2 py-1 rounded-full bg-${sound.color}/20 text-${sound.color}`}
                            >
                              {sound.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Duration: {scenario.duration}
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => runDemoScenario(scenario)}
                      variant="glass"
                      size="sm"
                      className="ml-3"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run Demo
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Demo Instructions */}
          <div className="glass-card border-primary/20 bg-primary/5">
            <h4 className="font-medium text-primary mb-2">Demo Instructions</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use individual tests to verify specific sound detection</li>
              <li>• Run scenarios to see how multiple sounds are handled</li>
              <li>• Adjust volume to test at different audio levels</li>
              <li>• Check toast notifications for detection feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};