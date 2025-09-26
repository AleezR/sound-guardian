import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Activity, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { DetectionCard } from "@/components/DetectionCard";
import { ConfidenceMeter } from "@/components/ConfidenceMeter";
import { toast } from "sonner";

interface ListenTabProps {
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

export const ListenTab = ({ isListening, setIsListening }: ListenTabProps) => {
  const [audioLevel, setAudioLevel] = useState(0);
  const [detectionConfidence, setDetectionConfidence] = useState(85);
  const [lastDetection, setLastDetection] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("Ready to listen");
  
  // Mock audio level animation
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
        
        // Simulate random detections
        if (Math.random() < 0.1) { // 10% chance every second
          const detections = ["Door knock detected", "Phone ringing", "Name called: Alex", "Doorbell sound"];
          const detection = detections[Math.floor(Math.random() * detections.length)];
          setLastDetection(detection);
          toast.success(detection, {
            description: "Sound detected with high confidence",
            duration: 3000,
          });
        }
      }, 100);
      
      setStatusMessage("Actively listening for important sounds...");
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
      setStatusMessage("Click to start listening");
    }
  }, [isListening]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast.success("Smart Sound Filter activated", {
        description: "Now listening for important sounds",
      });
    } else {
      toast.info("Listening stopped", {
        description: "Sound detection paused",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Control Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Primary Control */}
        <div className="glass-card text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Audio Monitoring</h2>
            <p className="text-muted-foreground">{statusMessage}</p>
          </div>
          
          <Button
            onClick={toggleListening}
            size="lg"
            variant={isListening ? "gradient-danger" : "gradient-primary"}
            className={`
              w-32 h-32 rounded-full font-bold text-lg
              ${isListening 
                ? 'glow-danger animate-pulse-glow hover:scale-110' 
                : 'glow-primary magnetic-hover'
              }
            `}
          >
            {isListening ? (
              <>
                <MicOff className="w-8 h-8 mb-2" />
                Stop
              </>
            ) : (
              <>
                <Mic className="w-8 h-8 mb-2" />
                Listen
              </>
            )}
          </Button>
          
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <span>Audio: {Math.round(audioLevel)}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Status: {isListening ? "Active" : "Idle"}</span>
            </div>
          </div>
        </div>

        {/* Audio Visualizer */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>Real-time Audio Analysis</span>
          </h3>
          <AudioVisualizer isActive={isListening} audioLevel={audioLevel} />
        </div>

        {/* Recent Detection */}
        {lastDetection && (
          <DetectionCard 
            detection={lastDetection} 
            confidence={detectionConfidence} 
            timestamp="Just now"
          />
        )}
      </div>

      {/* Side Panel */}
      <div className="space-y-6">
        {/* Confidence Meter */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Detection Confidence</span>
          </h3>
          <ConfidenceMeter confidence={detectionConfidence} />
        </div>

        {/* Quick Stats */}
        <div className="glass-card space-y-4">
          <h3 className="text-lg font-semibold">Today's Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Listening Time</span>
              <span className="font-semibold text-primary">2h 34m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sounds Detected</span>
              <span className="font-semibold text-success">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-semibold text-warning">94%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card space-y-3">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <Button variant="glass" className="w-full">
            Test Microphone
          </Button>
          <Button variant="glass" className="w-full">
            Calibrate Sensitivity
          </Button>
          <Button variant="glass" className="w-full">
            View History
          </Button>
        </div>
      </div>
    </div>
  );
};