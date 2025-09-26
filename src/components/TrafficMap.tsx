import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface TrafficArea {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'smooth' | 'moderate' | 'heavy';
  vehicles: number;
  waitTime: number;
}

const TrafficMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Delhi NCR traffic areas with coordinates
  const trafficAreas: TrafficArea[] = [
    { id: '1', name: 'Connaught Place', lat: 28.6315, lng: 77.2167, status: 'heavy', vehicles: 245, waitTime: 8 },
    { id: '2', name: 'Lajpat Nagar', lat: 28.5667, lng: 77.2431, status: 'moderate', vehicles: 189, waitTime: 5 },
    { id: '3', name: 'Dwarka Sector 21', lat: 28.5921, lng: 77.0460, status: 'smooth', vehicles: 124, waitTime: 2 },
    { id: '4', name: 'Karol Bagh', lat: 28.6519, lng: 77.1909, status: 'heavy', vehicles: 298, waitTime: 12 },
    { id: '5', name: 'Rohini Sector 7', lat: 28.7041, lng: 77.1025, status: 'moderate', vehicles: 167, waitTime: 6 },
    { id: '6', name: 'Gurgaon Cyber City', lat: 28.4595, lng: 77.0266, status: 'heavy', vehicles: 356, waitTime: 15 },
    { id: '7', name: 'Noida City Centre', lat: 28.5355, lng: 77.3910, status: 'moderate', vehicles: 213, waitTime: 7 },
    { id: '8', name: 'Faridabad NIT', lat: 28.3670, lng: 77.3155, status: 'smooth', vehicles: 98, waitTime: 3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'smooth': return '#10B981'; // Green
      case 'moderate': return '#F59E0B'; // Amber
      case 'heavy': return '#EF4444'; // Red
      default: return '#6B7280'; // Gray
    }
  };

  const createCustomIcon = (status: string) => {
    const color = getStatusColor(status);
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize Leaflet map
    const map = L.map(mapRef.current).setView([28.6139, 77.2090], 10);
    
    // Add OpenStreetMap tiles (free, no API key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add markers for each traffic area
    trafficAreas.forEach((area) => {
      const marker = L.marker([area.lat, area.lng], {
        icon: createCustomIcon(area.status)
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div class="p-2">
          <h3 class="font-semibold text-sm">${area.name}</h3>
          <div class="mt-1 space-y-1 text-xs">
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="capitalize" style="color: ${getStatusColor(area.status)}">${area.status}</span>
            </div>
            <div class="flex justify-between">
              <span>Vehicles:</span>
              <span>${area.vehicles}</span>
            </div>
            <div class="flex justify-between">
              <span>Wait Time:</span>
              <span>${area.waitTime} min</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
    });

    setIsMapLoaded(true);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  if (!isMapLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-4 border border-border rounded-lg bg-card/50">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Loading Traffic Map</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Initializing OpenStreetMap with area-wise traffic data...
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Smooth</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Heavy</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Traffic Map</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Smooth</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Heavy</span>
          </div>
        </div>
      </div>
      
      <div 
        ref={mapRef} 
        className="w-full h-[400px] rounded-lg border border-border"
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {trafficAreas.map((area) => (
          <Badge 
            key={area.id} 
            variant="outline" 
            className="justify-between p-2"
          >
            <span className="text-xs truncate">{area.name}</span>
            <div 
              className="w-2 h-2 rounded-full ml-1" 
              style={{ backgroundColor: getStatusColor(area.status) }}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TrafficMap;