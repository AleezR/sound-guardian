import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  isListening: boolean;
  onToggle: () => void;
}

export const FloatingActionButton = ({ isListening, onToggle }: FloatingActionButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onToggle}
        size="lg"
        variant={isListening ? "gradient-danger" : "gradient-primary"}
        className={`
          w-16 h-16 rounded-full shadow-2xl transition-all duration-300
          ${isListening 
            ? 'glow-danger animate-pulse-glow hover:scale-110' 
            : 'glow-primary magnetic-hover hover:scale-105'
          }
        `}
      >
        {isListening ? (
          <MicOff className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </Button>
      
      {/* Tooltip */}
      <div className={`
        absolute bottom-full right-0 mb-2 px-3 py-1 glass rounded-lg text-sm text-foreground
        transition-opacity duration-200 pointer-events-none
        ${isListening ? 'opacity-0' : 'opacity-0 hover:opacity-100'}
      `}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </div>
    </div>
  );
};