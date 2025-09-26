import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isActive: boolean;
  audioLevel: number;
}

export const AudioVisualizer = ({ isActive, audioLevel }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const barsRef = useRef<number[]>(Array(64).fill(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      const bars = barsRef.current;
      const barWidth = canvas.offsetWidth / bars.length;
      
      bars.forEach((bar, index) => {
        if (isActive) {
          // Simulate audio frequency data
          const targetHeight = Math.random() * (audioLevel / 100) * canvas.offsetHeight;
          bars[index] = bars[index] + (targetHeight - bars[index]) * 0.1;
        } else {
          bars[index] = bars[index] * 0.95; // Decay
        }
        
        const height = Math.max(2, bars[index]);
        const hue = 250 + (index / bars.length) * 60; // Purple to blue gradient
        const opacity = isActive ? 0.8 : 0.3;
        
        ctx.fillStyle = `hsla(${hue}, 70%, 65%, ${opacity})`;
        ctx.fillRect(
          index * barWidth,
          canvas.offsetHeight - height,
          barWidth - 2,
          height
        );
        
        // Add glow effect
        if (isActive && height > 20) {
          ctx.shadowColor = `hsla(${hue}, 70%, 65%, 0.5)`;
          ctx.shadowBlur = 10;
          ctx.fillRect(
            index * barWidth,
            canvas.offsetHeight - height,
            barWidth - 2,
            height
          );
          ctx.shadowBlur = 0;
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, audioLevel]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-32 rounded-lg bg-gradient-to-r from-primary/10 to-success/10"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Waveform Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`text-sm font-medium transition-opacity duration-300 ${
          isActive ? 'opacity-0' : 'opacity-60'
        }`}>
          {isActive ? '' : 'Audio visualization will appear here when listening'}
        </div>
      </div>
      
      {/* Peak Level Indicator */}
      {isActive && (
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <div className="text-xs text-muted-foreground">Peak:</div>
          <div className={`text-xs font-mono ${
            audioLevel > 80 ? 'text-destructive' : 
            audioLevel > 50 ? 'text-warning' : 'text-success'
          }`}>
            {Math.round(audioLevel)}%
          </div>
        </div>
      )}
    </div>
  );
};