import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface TrafficArea {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'smooth' | 'moderate' | 'heavy';
  vehicles: number;
  waitTime: number;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

const TrafficMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [apiKey] = useState('AIzaSyBZKvU0Jct8QG9RMx0fO7xBXBj-GggEmXk');
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

  const initializeMap = async (apiKey: string) => {
    if (!mapRef.current || !apiKey) return;

    try {
      const { Loader } = await import('@googlemaps/js-api-loader');
      
      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      const google = await loader.load();
      
      const map = new google.maps.Map(mapRef.current, {
        zoom: 10,
        center: { lat: 28.6139, lng: 77.2090 }, // Delhi center
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Add traffic layer
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

      // Add markers for each traffic area
      trafficAreas.forEach((area) => {
        // Create custom marker with status indicator
        const marker = new google.maps.Marker({
          position: { lat: area.lat, lng: area.lng },
          map: map,
          title: area.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: getStatusColor(area.status),
            fillOpacity: 0.8,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            scale: 12
          }
        });

        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
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
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      setIsMapLoaded(true);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  };

  useEffect(() => {
    if (apiKey && !isMapLoaded) {
      initializeMap(apiKey);
    }
  }, [apiKey, isMapLoaded]);

  if (!isMapLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-4 border border-border rounded-lg bg-card/50">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Loading Traffic Map</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Initializing Google Maps with live traffic data...
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