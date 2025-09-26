import { TrendingUp, Activity, Clock, Target, BarChart3, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export const AnalyticsTab = () => {
  const stats = [
    {
      title: "Total Detections",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Target,
      color: "primary",
    },
    {
      title: "Listening Hours",
      value: "156h",
      change: "+8%",
      trend: "up",
      icon: Clock,
      color: "success",
    },
    {
      title: "Detection Accuracy",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: Activity,
      color: "warning",
    },
    {
      title: "Daily Average",
      value: "42",
      change: "-3%",
      trend: "down",
      icon: Calendar,
      color: "destructive",
    },
  ];

  const recentActivity = [
    { time: "2 mins ago", event: "Door knock detected", confidence: 96 },
    { time: "15 mins ago", event: "Phone ringing", confidence: 89 },
    { time: "1 hour ago", event: "Name called: Alex", confidence: 92 },
    { time: "2 hours ago", event: "Doorbell sound", confidence: 87 },
    { time: "3 hours ago", event: "Message notification", confidence: 94 },
  ];

  const weeklyData = [
    { day: "Mon", detections: 45, accuracy: 92 },
    { day: "Tue", detections: 38, accuracy: 94 },
    { day: "Wed", detections: 52, accuracy: 91 },
    { day: "Thu", detections: 41, accuracy: 96 },
    { day: "Fri", detections: 48, accuracy: 93 },
    { day: "Sat", detections: 35, accuracy: 95 },
    { day: "Sun", detections: 28, accuracy: 97 },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card key={stat.title} className="glass-card animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <span className={`text-xs font-medium ${
                      stat.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}/20`}>
                  <Icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Chart */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span>Weekly Overview</span>
          </h3>
          
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-foreground">{day.day}</span>
                  <div className="flex space-x-4">
                    <span className="text-muted-foreground">{day.detections} detections</span>
                    <span className="text-success">{day.accuracy}% accuracy</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 h-2">
                  {/* Detections Bar */}
                  <div className="flex-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary transition-all duration-500"
                      style={{ width: `${(day.detections / 60) * 100}%` }}
                    />
                  </div>
                  
                  {/* Accuracy Bar */}
                  <div className="flex-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-success transition-all duration-500"
                      style={{ width: `${day.accuracy}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>Recent Activity</span>
          </h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 glass rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    activity.confidence >= 90 ? 'text-success' :
                    activity.confidence >= 80 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {activity.confidence}%
                  </div>
                  <div className="text-xs text-muted-foreground">confidence</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detection Patterns */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Usage Patterns</span>
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Peak Hours</span>
                <span className="font-medium text-foreground">2:00 PM - 6:00 PM</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-primary w-3/4 rounded-full" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Most Common</span>
                <span className="font-medium text-foreground">Door Knocks (34%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-success w-1/3 rounded-full" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Response Time</span>
                <span className="font-medium text-foreground">1.2s average</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-warning w-5/6 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm font-medium text-success">Excellent Performance</p>
              <p className="text-xs text-muted-foreground">Your detection accuracy is above average</p>
            </div>
            
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm font-medium text-primary">Peak Usage Detected</p>
              <p className="text-xs text-muted-foreground">Afternoon study sessions show highest activity</p>
            </div>
            
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm font-medium text-warning">Optimization Tip</p>
              <p className="text-xs text-muted-foreground">Consider lowering sensitivity during quiet hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};