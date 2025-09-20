import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Navigation, Zap, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would connect to Supabase
    if (credentials.username === "admin" && credentials.password === "admin123") {
      toast.success("Login successful! Welcome to Traffic Control Center");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials. Try admin / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_50%)] opacity-10" />
      
      <div className="w-full max-w-md relative">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-control">
            <Navigation className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Marg-Darshak
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-Powered Traffic Management System
          </p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-md bg-glass border-glass shadow-glass">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-semibold text-center flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Access the traffic management dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-secondary/50 border-glass focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-secondary/50 border-glass focus:ring-primary pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-control transition-all duration-300 font-semibold"
              >
                <Zap className="w-4 h-4 mr-2" />
                Access Control Center
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Demo credentials: admin / admin123</p>
            </div>
          </CardContent>
        </Card>

        {/* Features preview */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="p-4 rounded-lg bg-glass border-glass backdrop-blur-sm">
            <div className="w-8 h-8 bg-traffic-normal/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 bg-traffic-normal rounded-full animate-pulse" />
            </div>
            <p className="text-xs text-muted-foreground">Live Monitoring</p>
          </div>
          <div className="p-4 rounded-lg bg-glass border-glass backdrop-blur-sm">
            <div className="w-8 h-8 bg-primary/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">AI Control</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;