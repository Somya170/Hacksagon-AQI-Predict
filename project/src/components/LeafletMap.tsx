import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { RefreshCw, MapPin, Thermometer, Droplets, Clock, Zap } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CityData {
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  quality: string;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  temperature: number;
  humidity: number;
  lastUpdated: string;
  source: string;
}

interface LeafletMapProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ selectedCity, onCitySelect }) => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // All 25 cities with coordinates
  const allCitiesData = [
    { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Bhopal', lat: 23.2599, lng: 77.4126 },
    { name: 'Indore', lat: 22.7196, lng: 75.8577 },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Gwalior', lat: 26.2183, lng: 78.1828 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Varanasi', lat: 25.3176, lng: 82.9739 },
    { name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
    { name: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Kanpur', lat: 26.4499, lng: 80.3319 },
    { name: 'Patna', lat: 25.5941, lng: 85.1376 },
    { name: 'Raipur', lat: 21.2514, lng: 81.6296 },
    { name: 'Ranchi', lat: 23.3441, lng: 85.3096 },
    { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Surat', lat: 21.1702, lng: 72.8311 },
    { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
    { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366 },
    { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
    { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
    { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 },
  ];

  // Realistic AQI data for all 25 cities
  const realisticCityAQI = {
    'Delhi': 168, 'Mumbai': 95, 'Hyderabad': 92, 'Bhopal': 112, 'Indore': 105,
    'Ahmedabad': 125, 'Chennai': 78, 'Gwalior': 145, 'Jaipur': 135, 'Varanasi': 152,
    'Nagpur': 98, 'Pune': 88, 'Lucknow': 158, 'Kanpur': 172, 'Patna': 165,
    'Raipur': 118, 'Ranchi': 102, 'Bengaluru': 85, 'Kolkata': 142, 'Surat': 108,
    'Kochi': 72, 'Thiruvananthapuram': 68, 'Coimbatore': 82, 'Madurai': 89, 'Visakhapatnam': 94
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#22C55E';
    if (aqi <= 100) return '#EAB308';
    if (aqi <= 150) return '#F97316';
    if (aqi <= 200) return '#EF4444';
    return '#8B5CF6';
  };

  const getQualityFromAqi = (aqi: number): string => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const createCustomIcon = (aqi: number, isSelected: boolean, isHovered: boolean) => {
    const color = getAQIColor(aqi);
    const size = isSelected ? 45 : isHovered ? 35 : 30;
    
    return L.divIcon({
      className: 'custom-aqi-marker',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: ${isSelected ? '14px' : isHovered ? '12px' : '10px'};
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          ${isSelected ? 'animation: pulse 2s infinite;' : ''}
          ${isHovered ? 'transform: scale(1.1);' : ''}
        ">${aqi}</div>
        <style>
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 ${color}60; }
            70% { box-shadow: 0 0 0 15px ${color}00; }
            100% { box-shadow: 0 0 0 0 ${color}00; }
          }
        </style>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const fetchCitiesData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/cities');
      const data = await response.json();
      setCities(data);
      setLastUpdated(new Date());
      console.log('✅ Fetched real-time data for', data.length, 'cities');
    } catch (error) {
      console.error('Failed to fetch cities data:', error);
      // Enhanced fallback data with all 25 cities and realistic values
      const mockCities = allCitiesData.map(city => {
        const baseAqi = realisticCityAQI[city.name as keyof typeof realisticCityAQI] || 100;
        return {
          ...city,
          aqi: baseAqi,
          quality: getQualityFromAqi(baseAqi),
          pm25: Math.floor(baseAqi * 0.6),
          pm10: Math.floor(baseAqi * 0.8),
          o3: Math.floor(baseAqi * 0.4),
          no2: Math.floor(baseAqi * 0.3),
          so2: Math.floor(baseAqi * 0.2),
          co: Math.floor(baseAqi * 0.1),
          temperature: getRealisticTemperature(city.name),
          humidity: getRealisticHumidity(city.name),
          lastUpdated: new Date().toISOString(),
          source: 'Enhanced Mock Data'
        };
      });
      setCities(mockCities);
    } finally {
      setLoading(false);
    }
  };

  const getRealisticTemperature = (cityName: string) => {
    const cityTemperatures = {
      'Delhi': 18, 'Mumbai': 28, 'Chennai': 26, 'Kolkata': 22, 'Bengaluru': 23,
      'Hyderabad': 25, 'Pune': 24, 'Ahmedabad': 22, 'Jaipur': 20, 'Lucknow': 19,
      'Kanpur': 19, 'Patna': 20, 'Varanasi': 20, 'Nagpur': 22, 'Indore': 21,
      'Bhopal': 20, 'Surat': 26, 'Gwalior': 19, 'Raipur': 23, 'Ranchi': 21,
      'Kochi': 29, 'Thiruvananthapuram': 30, 'Coimbatore': 25, 'Madurai': 26,
      'Visakhapatnam': 26
    };
    return cityTemperatures[cityName as keyof typeof cityTemperatures] || 25;
  };

  const getRealisticHumidity = (cityName: string) => {
    const cityHumidity = {
      'Delhi': 65, 'Mumbai': 75, 'Chennai': 70, 'Kolkata': 70, 'Bengaluru': 60,
      'Hyderabad': 55, 'Pune': 50, 'Ahmedabad': 45, 'Jaipur': 50, 'Lucknow': 70,
      'Kanpur': 75, 'Patna': 75, 'Varanasi': 70, 'Nagpur': 55, 'Indore': 50,
      'Bhopal': 55, 'Surat': 65, 'Gwalior': 60, 'Raipur': 65, 'Ranchi': 60,
      'Kochi': 85, 'Thiruvananthapuram': 80, 'Coimbatore': 65, 'Madurai': 70,
      'Visakhapatnam': 75
    };
    return cityHumidity[cityName as keyof typeof cityHumidity] || 65;
  };

  useEffect(() => {
    fetchCitiesData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchCitiesData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const MapUpdater = () => {
    const map = useMap();
    
    useEffect(() => {
      const selectedCityData = cities.find(city => city.name === selectedCity);
      if (selectedCityData) {
        map.setView([selectedCityData.lat, selectedCityData.lng], 8, { animate: true });
      } else {
        // Show full India view when no specific city is selected
        map.setView([20.5937, 78.9629], 5, { animate: true });
      }
    }, [selectedCity, cities, map]);
    
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Loading Real-time Map</h3>
            <p className="text-gray-600">Fetching live AQI data from 25 Indian cities...</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-600">Powered by Ambee API</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Live India Air Quality Map</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Real-time Data</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
            <Zap className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">25 Cities</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchCitiesData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium text-blue-700">Refresh</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Good (≤50)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600">Moderate (51-100)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-gray-600">Unhealthy (101-150)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Very Unhealthy (150+)</span>
        </div>
      </div>
      
      <div className="h-96 rounded-xl overflow-hidden border border-gray-200">
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          className="rounded-xl"
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapUpdater />
          
          {cities.map((city) => (
            <Marker
              key={city.name}
              position={[city.lat, city.lng]}
              icon={createCustomIcon(city.aqi, selectedCity === city.name, hoveredCity === city.name)}
              eventHandlers={{
                click: () => onCitySelect(city.name),
                mouseover: () => setHoveredCity(city.name),
                mouseout: () => setHoveredCity(null),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-4 min-w-72">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-6 h-6 rounded-full shadow-lg"
                      style={{ backgroundColor: getAQIColor(city.aqi) }}
                    ></div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{city.name}</h4>
                      <p className="text-sm text-gray-500">{city.quality}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                        <Zap className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-blue-700">{city.source}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Coordinates Display */}
                  <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-100">
                    <h5 className="font-semibold text-blue-800 mb-2">📍 Coordinates (Asia/GMT+5:30)</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-blue-600">Latitude:</span>
                        <p className="font-mono font-semibold text-blue-800">{city.lat.toFixed(4)}°</p>
                      </div>
                      <div>
                        <span className="text-blue-600">Longitude:</span>
                        <p className="font-mono font-semibold text-blue-800">{city.lng.toFixed(4)}°</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">AQI:</span>
                        <span className="font-semibold text-gray-800">{city.aqi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PM2.5:</span>
                        <span className="font-semibold text-gray-800">{city.pm25}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PM10:</span>
                        <span className="font-semibold text-gray-800">{city.pm10}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">O₃:</span>
                        <span className="font-semibold text-gray-800">{city.o3}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">NO₂:</span>
                        <span className="font-semibold text-gray-800">{city.no2}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SO₂:</span>
                        <span className="font-semibold text-gray-800">{city.so2}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">{city.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">{city.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {new Date(city.lastUpdated).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          🌍 Real-time data from 25 Indian cities • Click markers for details • Hover to see coordinates • Asia/GMT+5:30 timezone
        </p>
      </div>
    </div>
  );
};

export default LeafletMap;