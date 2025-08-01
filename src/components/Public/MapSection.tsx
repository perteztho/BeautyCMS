import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Info, AlertTriangle, Shield, Heart, Users } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type?: string;
  capacity?: number;
  facilities?: string[];
  contact?: string;
  status?: string;
  risk_level?: string;
  description?: string;
  services?: string[];
}

interface MapData {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  locations: {
    evacuation_centers: Location[];
    risk_areas: Location[];
    emergency_services: Location[];
  };
}

const MapSection: React.FC = () => {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'evacuation_centers' | 'risk_areas' | 'emergency_services'>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await fetch('/data/map_data.json');
        const data = await response.json();
        setMapData(data);
      } catch (error) {
        console.error('Error loading map data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMapData();
  }, []);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'evacuation_center': return Shield;
      case 'risk_area': return AlertTriangle;
      case 'fire_station': return Shield;
      case 'medical': return Heart;
      case 'police': return Shield;
      default: return MapPin;
    }
  };

  const getLocationColor = (type: string, risk_level?: string) => {
    if (risk_level) {
      switch (risk_level) {
        case 'high': return 'bg-red-500 text-white';
        case 'medium': return 'bg-yellow-500 text-white';
        case 'low': return 'bg-green-500 text-white';
        default: return 'bg-gray-500 text-white';
      }
    }
    
    switch (type) {
      case 'evacuation_center': return 'bg-blue-500 text-white';
      case 'fire_station': return 'bg-red-500 text-white';
      case 'medical': return 'bg-green-500 text-white';
      case 'police': return 'bg-blue-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getAllLocations = () => {
    if (!mapData) return [];
    
    const allLocations: (Location & { category: string })[] = [];
    
    mapData.locations.evacuation_centers.forEach(loc => 
      allLocations.push({ ...loc, category: 'evacuation_centers', type: 'evacuation_center' })
    );
    mapData.locations.risk_areas.forEach(loc => 
      allLocations.push({ ...loc, category: 'risk_areas', type: 'risk_area' })
    );
    mapData.locations.emergency_services.forEach(loc => 
      allLocations.push({ ...loc, category: 'emergency_services' })
    );
    
    return allLocations;
  };

  const getFilteredLocations = () => {
    const allLocations = getAllLocations();
    if (selectedCategory === 'all') return allLocations;
    return allLocations.filter(loc => loc.category === selectedCategory);
  };

  if (loading) {
    return (
      <section id="map" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!mapData) {
    return (
      <section id="map" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Map data unavailable</h3>
            <p className="text-gray-600">Unable to load map information at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  const filteredLocations = getFilteredLocations();

  return (
    <section id="map" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Map</h2>
          <p className="text-xl text-gray-600">Locate evacuation centers, risk areas, and emergency services in Pio Duran</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            All Locations
          </button>
          <button
            onClick={() => setSelectedCategory('evacuation_centers')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedCategory === 'evacuation_centers'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Evacuation Centers
          </button>
          <button
            onClick={() => setSelectedCategory('risk_areas')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedCategory === 'risk_areas'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Risk Areas
          </button>
          <button
            onClick={() => setSelectedCategory('emergency_services')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedCategory === 'emergency_services'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Heart className="w-4 h-4 inline mr-2" />
            Emergency Services
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 rounded-xl p-8 h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
                <p className="text-gray-600 mb-4">
                  Center: {mapData.center.lat.toFixed(4)}, {mapData.center.lng.toFixed(4)}
                </p>
                <p className="text-sm text-gray-500">
                  In a production environment, this would display an interactive map using 
                  Leaflet or Google Maps showing all marked locations.
                </p>
              </div>
            </div>
          </div>

          {/* Locations List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 h-96 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedCategory === 'all' ? 'All Locations' :
                 selectedCategory === 'evacuation_centers' ? 'Evacuation Centers' :
                 selectedCategory === 'risk_areas' ? 'Risk Areas' :
                 'Emergency Services'} ({filteredLocations.length})
              </h3>
              
              <div className="space-y-3">
                {filteredLocations.map((location) => {
                  const Icon = getLocationIcon(location.type || '');
                  return (
                    <div
                      key={location.id}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getLocationColor(location.type || '', location.risk_level)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{location.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {location.description || 
                             (location.capacity && `Capacity: ${location.capacity}`) ||
                             (location.services && location.services.join(', '))}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            <Navigation className="w-3 h-3 mr-1" />
                            <span>{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Map Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {mapData.locations.evacuation_centers.length}
            </div>
            <div className="text-sm text-gray-600">Evacuation Centers</div>
          </div>
          
          <div className="bg-red-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-red-600 mb-1">
              {mapData.locations.risk_areas.length}
            </div>
            <div className="text-sm text-gray-600">Risk Areas</div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">
              {mapData.locations.emergency_services.length}
            </div>
            <div className="text-sm text-gray-600">Emergency Services</div>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {mapData.locations.evacuation_centers.reduce((total, center) => total + (center.capacity || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Capacity</div>
          </div>
        </div>

        {/* Location Details Modal */}
        {selectedLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getLocationColor(selectedLocation.type || '', selectedLocation.risk_level)}`}>
                    {React.createElement(getLocationIcon(selectedLocation.type || ''), { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedLocation.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {selectedLocation.type?.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {selectedLocation.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Description</h4>
                    <p className="text-sm text-gray-600">{selectedLocation.description}</p>
                  </div>
                )}

                {selectedLocation.capacity && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Capacity</h4>
                    <p className="text-sm text-gray-600">{selectedLocation.capacity} people</p>
                  </div>
                )}

                {selectedLocation.facilities && selectedLocation.facilities.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.facilities.map((facility, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLocation.services && selectedLocation.services.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.services.map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLocation.risk_level && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Risk Level</h4>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      selectedLocation.risk_level === 'high' ? 'bg-red-100 text-red-800' :
                      selectedLocation.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedLocation.risk_level.toUpperCase()}
                    </span>
                  </div>
                )}

                {selectedLocation.contact && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Contact</h4>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedLocation.contact}</span>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Coordinates</h4>
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MapSection;