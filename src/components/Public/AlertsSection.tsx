import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, MapPin, Filter, Search } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  type: string;
  severity: string;
  message: string;
  timestamp: string;
  areas: string[];
  active: boolean;
}

const AlertsSection: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const response = await fetch('/data/alerts.json');
        const data = await response.json();
        setAlerts(data);
        setFilteredAlerts(data);
      } catch (error) {
        console.error('Error loading alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();
  }, []);

  useEffect(() => {
    let filtered = alerts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.areas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by severity
    if (severityFilter !== 'all') {
      filtered = filtered.filter(alert => alert.severity === severityFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(alert => alert.type === typeFilter);
    }

    setFilteredAlerts(filtered);
  }, [alerts, searchTerm, severityFilter, typeFilter]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather': return '🌪️';
      case 'flood': return '🌊';
      case 'earthquake': return '🏔️';
      case 'fire': return '🔥';
      case 'evacuation': return '🏃';
      default: return '⚠️';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return alertTime.toLocaleDateString();
  };

  const alertTypes = [...new Set(alerts.map(alert => alert.type))];

  if (loading) {
    return (
      <section id="alerts" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading alerts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="alerts" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Disaster Alerts & Warnings</h2>
          <p className="text-xl text-gray-600">Stay informed about current and recent disaster alerts in Pio Duran</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search alerts by title, message, or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Types</option>
              {alertTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Alerts Banner */}
        {filteredAlerts.some(alert => alert.active && alert.severity === 'high') && (
          <div className="bg-red-600 text-white rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6" />
              <div>
                <h3 className="text-lg font-bold">URGENT ALERTS ACTIVE</h3>
                <p>There are currently {filteredAlerts.filter(alert => alert.active && alert.severity === 'high').length} high-priority alerts requiring immediate attention.</p>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Grid */}
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">No alerts match your current search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-6 rounded-xl border-2 ${getSeverityColor(alert.severity)} ${
                  alert.active ? 'ring-2 ring-offset-2 ring-red-300' : ''
                } hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getTypeIcon(alert.type)}</span>
                    <span className="font-semibold text-sm uppercase tracking-wide">{alert.type}</span>
                    {alert.active && (
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">{getSeverityIcon(alert.severity)}</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-3">{alert.title}</h3>
                <p className="text-sm mb-4 leading-relaxed">{alert.message}</p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span className="font-medium">Affected Areas:</span>
                    <span>{alert.areas.join(', ')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Clock className="w-3 h-3" />
                    <span className="font-medium">Posted:</span>
                    <span>{formatTimestamp(alert.timestamp)}</span>
                  </div>
                </div>

                {alert.active && (
                  <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                    <p className="text-xs font-medium">
                      🚨 This is an active alert. Please follow official guidance and stay updated.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Emergency Contact Banner */}
        <div className="mt-12 bg-gray-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Emergency Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Fire & Rescue</h4>
              <p className="text-2xl font-bold text-red-400">911</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Medical Emergency</h4>
              <p className="text-2xl font-bold text-blue-400">911</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">MDRRMO Hotline</h4>
              <p className="text-2xl font-bold text-green-400">(054) 123-4567</p>
            </div>
          </div>
          <p className="mt-4 text-gray-400">
            In case of emergency, call immediately. For non-urgent reports, use our incident reporting system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AlertsSection;