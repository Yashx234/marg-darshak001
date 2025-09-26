import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrafficMap from "@/components/TrafficMap";
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  Car, 
  Truck, 
  Bike,
  Settings,
  Eye,
  ZapOff,
  Zap,
  LogOut,
  Shield,
  Clock,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TrafficData {
  id: string;
  area: string;
  status: "normal" | "warning" | "emergency" | "idle";
  vehicles: number;
  waitTime: number;
  lastUpdate: string;
}

interface VehicleDetection {
  type: "car" | "truck" | "bike" | "emergency";
  count: number;
  percentage: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [trafficData, setTrafficData] = useState<TrafficData[]>([
    { id: "1", area: "Connaught Place", status: "warning", vehicles: 67, waitTime: 145, lastUpdate: "1 min ago" },
    { id: "2", area: "Karol Bagh Junction", status: "normal", vehicles: 34, waitTime: 42, lastUpdate: "2 min ago" },
    { id: "3", area: "Lajpat Nagar Market", status: "emergency", vehicles: 89, waitTime: 220, lastUpdate: "Just now" },
    { id: "4", area: "India Gate Circle", status: "normal", vehicles: 28, waitTime: 38, lastUpdate: "1 min ago" },
    { id: "5", area: "Rajouri Garden", status: "warning", vehicles: 56, waitTime: 120, lastUpdate: "3 min ago" },
    { id: "6", area: "Nehru Place", status: "normal", vehicles: 41, waitTime: 55, lastUpdate: "2 min ago" },
    { id: "7", area: "Dwarka Sector 21", status: "emergency", vehicles: 78, waitTime: 195, lastUpdate: "Just now" },
    { id: "8", area: "Rohini Sector 7", status: "normal", vehicles: 29, waitTime: 35, lastUpdate: "4 min ago" },
    { id: "9", area: "Pitampura Metro", status: "warning", vehicles: 62, waitTime: 132, lastUpdate: "2 min ago" },
    { id: "10", area: "Janakpuri West", status: "normal", vehicles: 33, waitTime: 48, lastUpdate: "3 min ago" },
    { id: "11", area: "Saket District Centre", status: "emergency", vehicles: 84, waitTime: 210, lastUpdate: "1 min ago" },
    { id: "12", area: "Vasant Kunj", status: "normal", vehicles: 26, waitTime: 41, lastUpdate: "5 min ago" },
  ]);

  const [vehicleDetection] = useState<VehicleDetection[]>([
    { type: "car", count: 2847, percentage: 72 },
    { type: "truck", count: 486, percentage: 12 },
    { type: "bike", count: 594, percentage: 15 },
    { type: "emergency", count: 8, percentage: 1 },
  ]);

  const [alerts] = useState([
    { id: 1, type: "violation", message: "Speed limit exceeded - Connaught Place", time: "1 min ago", severity: "high" },
    { id: 2, type: "emergency", message: "Ambulance detected - Lajpat Nagar route priority", time: "2 min ago", severity: "critical" },
    { id: 3, type: "congestion", message: "Heavy traffic buildup - Karol Bagh Junction", time: "4 min ago", severity: "medium" },
    { id: 4, type: "violation", message: "Red light violation - India Gate Circle", time: "6 min ago", severity: "high" },
    { id: 5, type: "emergency", message: "Fire brigade detected - Dwarka Sector 21", time: "7 min ago", severity: "critical" },
    { id: 6, type: "congestion", message: "Peak hour congestion - Nehru Place", time: "8 min ago", severity: "medium" },
  ]);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal": return <div className="w-3 h-3 bg-traffic-normal rounded-full animate-pulse" />;
      case "warning": return <div className="w-3 h-3 bg-traffic-warning rounded-full animate-pulse" />;
      case "emergency": return <div className="w-3 h-3 bg-traffic-emergency rounded-full animate-pulse" />;
      default: return <div className="w-3 h-3 bg-traffic-idle rounded-full" />;
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "car": return <Car className="w-5 h-5" />;
      case "truck": return <Truck className="w-5 h-5" />;
      case "bike": return <Bike className="w-5 h-5" />;
      case "emergency": return <Shield className="w-5 h-5 text-traffic-emergency" />;
      default: return <Car className="w-5 h-5" />;
    }
  };

  const toggleSignalControl = (areaId: string) => {
    setTrafficData(prev => prev.map(area => 
      area.id === areaId 
        ? { ...area, status: area.status === "normal" ? "warning" : "normal" }
        : area
    ));
    toast.success("Signal control updated");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-glass bg-glass backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Navigation className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Marg-Darshak Control Center</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Traffic Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-traffic-normal/20 text-traffic-normal border-traffic-normal">
              <Activity className="w-3 h-3 mr-1" />
              System Online
            </Badge>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Control</TabsTrigger>
            <TabsTrigger value="detection">Vehicle Detection</TabsTrigger>
            <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-glass border-glass backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Areas</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-glass border-glass backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Vehicles</p>
                    <p className="text-2xl font-bold">3,935</p>
                  </div>
                    <Car className="w-8 h-8 text-traffic-normal" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-glass border-glass backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                    <p className="text-2xl font-bold">112s</p>
                  </div>
                    <Clock className="w-8 h-8 text-traffic-warning" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-glass border-glass backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Alerts</p>
                      <p className="text-2xl font-bold">{alerts.length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-traffic-emergency" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Traffic Map */}
            <Card className="bg-glass border-glass backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Live Area-wise Traffic Map
                </CardTitle>
                <CardDescription>
                  Real-time congestion monitoring across Delhi NCR areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrafficMap />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            {/* Area Selection Filter */}
            <Card className="bg-glass border-glass backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Area-wise Traffic Control
                </CardTitle>
                <CardDescription>
                  Select and manage traffic signals across different areas in Delhi NCR
                </CardDescription>
              </CardHeader>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {trafficData.map((area) => (
                <Card key={area.id} className="bg-glass border-glass backdrop-blur-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(area.status)}
                        {area.area}
                      </CardTitle>
                      <Badge 
                        variant={area.status === "normal" ? "default" : area.status === "warning" ? "secondary" : "destructive"}
                        className="capitalize"
                      >
                        {area.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Vehicles</p>
                        <p className="text-xl font-semibold">{area.vehicles}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Wait Time</p>
                        <p className="text-xl font-semibold">{area.waitTime}s</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-glass">
                      <span className="text-sm text-muted-foreground">Manual Override</span>
                      <Button
                        size="sm"
                        variant={area.status === "normal" ? "outline" : "default"}
                        onClick={() => toggleSignalControl(area.id)}
                        className="gap-2"
                      >
                        {area.status === "normal" ? <ZapOff className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                        {area.status === "normal" ? "Enable" : "Disable"}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">Last updated: {area.lastUpdate}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detection" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vehicleDetection.map((vehicle, index) => (
                <Card key={index} className="bg-glass border-glass backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getVehicleIcon(vehicle.type)}
                        <span className="font-semibold capitalize">{vehicle.type}s</span>
                      </div>
                      <Badge variant="outline">{vehicle.percentage}%</Badge>
                    </div>
                    <p className="text-2xl font-bold">{vehicle.count.toLocaleString()}</p>
                    <div className="w-full bg-secondary rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${vehicle.percentage}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-glass border-glass backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Live Vehicle Classification
                </CardTitle>
                <CardDescription>
                  AI-powered real-time vehicle detection and classification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold text-muted-foreground">Camera Feed</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Live AI detection and classification display
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className="bg-glass border-glass backdrop-blur-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          alert.severity === "critical" ? "bg-traffic-emergency" :
                          alert.severity === "high" ? "bg-traffic-warning" : 
                          "bg-traffic-normal"
                        } animate-pulse`} />
                        <div>
                          <p className="font-semibold">{alert.message}</p>
                          <p className="text-sm text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={alert.severity === "critical" ? "destructive" : alert.severity === "high" ? "secondary" : "default"}
                        className="capitalize"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;