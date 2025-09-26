import { Activity, Shield, Wifi, WifiOff } from "lucide-react";

interface HeaderProps {
  isListening: boolean;
}

export const Header = ({ isListening }: HeaderProps) => {
  return (
    <header className="glass-card mx-4 mt-4 mb-0">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {isListening && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full animate-pulse-glow">
                <div className="w-full h-full bg-success rounded-full animate-ping" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient-primary">Smart Sound Filter</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Audio Awareness</p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2 px-3 py-2 glass rounded-lg">
            {isListening ? (
              <>
                <Wifi className="w-4 h-4 text-success" />
                <span className="text-sm text-success font-medium">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Offline</span>
              </>
            )}
          </div>

          {/* Activity Indicator */}
          <div className="flex items-center space-x-2 px-3 py-2 glass rounded-lg">
            <Activity className={`w-4 h-4 ${isListening ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
            <span className={`text-sm font-medium ${isListening ? 'text-primary' : 'text-muted-foreground'}`}>
              {isListening ? 'Listening' : 'Idle'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};