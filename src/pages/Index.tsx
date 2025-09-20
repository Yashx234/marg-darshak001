import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation, Shield, Zap, MapPin, Clock, Car, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_50%)] opacity-5" />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl mb-6 shadow-control">
            <Navigation className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            AI Traffic Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Advanced traffic congestion management with real-time AI optimization, 
            emergency vehicle detection, and intelligent signal control.
          </p>
          <Button 
            onClick={() => navigate("/")} 
            size="lg"
            className="bg-gradient-primary hover:shadow-control transition-all duration-300 text-lg px-8 py-3"
          >
            <Shield className="w-5 h-5 mr-2" />
            Access Control Center
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="bg-glass border-glass backdrop-blur-md hover:shadow-glass transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Live Traffic Monitoring</CardTitle>
              <CardDescription>
                Real-time congestion tracking across all intersections with Google Maps integration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-glass border-glass backdrop-blur-md hover:shadow-glass transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-traffic-normal/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-traffic-normal" />
              </div>
              <CardTitle>AI Signal Control</CardTitle>
              <CardDescription>
                Intelligent traffic light timing optimization with manual override capabilities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-glass border-glass backdrop-blur-md hover:shadow-glass transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-traffic-emergency/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-traffic-emergency" />
              </div>
              <CardTitle>Emergency Detection</CardTitle>
              <CardDescription>
                Automatic emergency vehicle detection with priority corridor management
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-glass border-glass backdrop-blur-md hover:shadow-glass transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-traffic-warning/20 rounded-xl flex items-center justify-center mb-4">
                <Car className="w-6 h-6 text-traffic-warning" />
              </div>
              <CardTitle>Vehicle Classification</CardTitle>
              <CardDescription>
                AI-powered vehicle detection and classification for optimal traffic flow
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-glass border-glass backdrop-blur-md hover:shadow-glass transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-destructive/20 rounded-xl flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle>Rule Violation Alerts</CardTitle>
              <CardDescription>
                Instant notifications for traffic violations and rule infractions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-glass border-glass backdrop-blur-md hover:shadow-glass transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Area-wise Management</CardTitle>
              <CardDescription>
                Comprehensive traffic control organized by geographic zones and districts
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Powered by AI • Real-time Analytics • Smart City Integration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
