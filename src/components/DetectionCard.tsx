import { AlertTriangle, Clock, TrendingUp } from "lucide-react";

interface DetectionCardProps {
  detection: string;
  confidence: number;
  timestamp: string;
}

export const DetectionCard = ({ detection, confidence, timestamp }: DetectionCardProps) => {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return "text-success";
    if (conf >= 60) return "text-warning";
    return "text-destructive";
  };

  const getConfidenceBg = (conf: number) => {
    if (conf >= 80) return "bg-success/20";
    if (conf >= 60) return "bg-warning/20";
    return "bg-destructive/20";
  };

  return (
    <div className="glass-card border-l-4 border-l-success animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-success/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-success" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">{detection}</h4>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{timestamp}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span className={getConfidenceColor(confidence)}>{confidence}% confidence</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getConfidenceBg(confidence)} ${getConfidenceColor(confidence)}`}>
          {confidence >= 80 ? "High" : confidence >= 60 ? "Medium" : "Low"}
        </div>
      </div>
    </div>
  );
};