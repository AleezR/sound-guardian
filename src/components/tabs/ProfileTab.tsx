import { useState } from "react";
import { User, Mail, Lock, Cloud, Download, Upload, Settings, LogOut, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const ProfileTab = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    university: "State University",
    studyField: "Computer Science",
  });
  const [cloudSync, setCloudSync] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    summary: false,
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success("Welcome back!", {
      description: "Successfully logged into your account",
    });
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
    toast.success("Account created!", {
      description: "Welcome to Smart Sound Filter",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info("Logged out", {
      description: "See you next time!",
    });
  };

  const handleBackup = () => {
    toast.success("Settings backed up", {
      description: "Your preferences have been saved to the cloud",
    });
  };

  const handleRestore = () => {
    toast.success("Settings restored", {
      description: "Your preferences have been restored from backup",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto space-y-6">
        <div className="glass-card text-center">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isSignUp 
              ? "Join thousands of students using Smart Sound Filter" 
              : "Sign in to sync your settings and access analytics"
            }
          </p>

          <div className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" className="glass" />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@university.edu" className="glass" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" className="glass" />
            </div>

            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input id="university" placeholder="Your university name" className="glass" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input id="field" placeholder="e.g., Computer Science" className="glass" />
                </div>
              </>
            )}

            <Button
              onClick={isSignUp ? handleSignUp : handleLogin}
              className="w-full"
              variant="gradient-primary"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>

            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp 
                  ? "Already have an account? Sign in" 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="glass-card">
          <h3 className="font-semibold text-foreground mb-3">Account Benefits</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Cloud sync across devices</span>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Advanced analytics & insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Secure settings backup</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Custom sound training</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="glass-card">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{userData.name}</h2>
            <p className="text-muted-foreground">{userData.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm bg-primary/20 text-primary px-2 py-1 rounded-full">
                {userData.university}
              </span>
              <span className="text-sm bg-muted px-2 py-1 rounded-full text-muted-foreground">
                {userData.studyField}
              </span>
            </div>
          </div>
          <Button variant="glass" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <div className="space-y-6">
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>Account Settings</span>
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Display Name</Label>
                <Input
                  id="profile-name"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="glass"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email Address</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="glass"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profile-university">University</Label>
                <Input
                  id="profile-university"
                  value={userData.university}
                  onChange={(e) => setUserData(prev => ({ ...prev, university: e.target.value }))}
                  className="glass"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profile-field">Field of Study</Label>
                <Input
                  id="profile-field"
                  value={userData.studyField}
                  onChange={(e) => setUserData(prev => ({ ...prev, studyField: e.target.value }))}
                  className="glass"
                />
              </div>
              
              <Button variant="glass" className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <span>Notifications</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive detection summaries via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Real-time alerts for sound detections</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Daily Summary</p>
                  <p className="text-sm text-muted-foreground">End-of-day activity report</p>
                </div>
                <Switch
                  checked={notifications.summary}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, summary: checked }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cloud & Data */}
        <div className="space-y-6">
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Cloud className="w-5 h-5 text-primary" />
              <span>Cloud Sync</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Automatic Sync</p>
                  <p className="text-sm text-muted-foreground">
                    Sync settings and data across devices
                  </p>
                </div>
                <Switch
                  checked={cloudSync}
                  onCheckedChange={setCloudSync}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last sync:</span>
                <span className="text-foreground">2 minutes ago</span>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={handleBackup}
                  variant="glass"
                  size="sm"
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Backup
                </Button>
                <Button
                  onClick={handleRestore}
                  variant="glass"
                  size="sm"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Restore
                </Button>
              </div>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 glass rounded-lg">
                <div className="text-2xl font-bold text-primary">47</div>
                <div className="text-sm text-muted-foreground">Days Active</div>
              </div>
              <div className="text-center p-3 glass rounded-lg">
                <div className="text-2xl font-bold text-success">1,247</div>
                <div className="text-sm text-muted-foreground">Total Detections</div>
              </div>
              <div className="text-center p-3 glass rounded-lg">
                <div className="text-2xl font-bold text-warning">94.2%</div>
                <div className="text-sm text-muted-foreground">Avg Accuracy</div>
              </div>
              <div className="text-center p-3 glass rounded-lg">
                <div className="text-2xl font-bold text-destructive">156h</div>
                <div className="text-sm text-muted-foreground">Listening Time</div>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Privacy & Security</span>
            </h3>
            
            <div className="space-y-3">
              <Button variant="glass" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="glass" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="destructive" className="w-full">
                <User className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};