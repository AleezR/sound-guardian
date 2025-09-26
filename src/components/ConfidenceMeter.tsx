import { TrendingUp } from "lucide-react";

interface ConfidenceMeterProps {
  confidence: number;
}

export const ConfidenceMeter = ({ confidence }: ConfidenceMeterProps) => {
  const getColor = (conf: number) => {
    if (conf >= 80) return "success";
    if (conf >= 60) return "warning";
    return "destructive";
  };

  const color = getColor(confidence);

  return (
    <div className="space-y-4">
      {/* Circular Progress */}
      <div className="relative flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
            className="opacity-20"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={`hsl(var(--${color}))`}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - confidence / 100)}`}
            className="animate-scale-in glow-primary"
            style={{
              filter: `drop-shadow(0 0 6px hsl(var(--${color})))`,
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold text-${color}`}>{confidence}%</span>
          <span className="text-xs text-muted-foreground">confidence</span>
        </div>
      </div>

      {/* Status indicator */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <TrendingUp className={`w-4 h-4 text-${color}`} />
          <span className={`font-medium text-${color}`}>
            {confidence >= 80 ? "Excellent" : confidence >= 60 ? "Good" : "Needs Improvement"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {confidence >= 80 
            ? "High accuracy detection" 
            : confidence >= 60 
            ? "Moderate accuracy detection" 
            : "Consider adjusting sensitivity"
          }
        </p>
      </div>

      {/* Confidence bars */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Low</span>
          <span>High</span>
        </div>
        <div className="flex space-x-1 h-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm transition-all duration-300 ${
                i < Math.floor(confidence / 10) 
                  ? `bg-${color} glow-${color}` 
                  : 'bg-muted opacity-30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};