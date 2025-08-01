import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, Calendar, MapPin, Download, Phone, Users, Shield, TrendingUp, Eye, Clock } from 'lucide-react';

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

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  featured: boolean;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  location: string;
}

const HomePage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [alertsRes, newsRes, galleryRes] = await Promise.all([
          fetch('/data/alerts.json'),
          fetch('/data/news.json'),
          fetch('/data/gallery.json')
        ]);

        const alertsData = await alertsRes.json();
        const newsData = await newsRes.json();
        const galleryData = await galleryRes.json();

        setAlerts(alertsData.filter((alert: Alert) => alert.active).slice(0, 3));
        setNews(newsData.slice(0, 3));
        setGallery(galleryData.slice(0, 6));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return formatDate(timestamp);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading disaster management information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pio Duran Disaster Risk Reduction
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Protecting our community through preparedness, response, and recovery. 
              Stay informed, stay safe, stay connected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('alerts')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>View Current Alerts</span>
              </button>
              <button 
                onClick={() => document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Report Emergency</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">Protected Residents</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15</h3>
              <p className="text-gray-600">Evacuation Centers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Emergency Response</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Preparedness Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Alerts */}
      <section id="alerts" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Alerts</h2>
            <p className="text-xl text-gray-600">Stay updated with the latest disaster alerts and warnings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-6 rounded-xl border-2 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold text-sm uppercase tracking-wide">{alert.type}</span>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{alert.title}</h3>
                <p className="text-sm mb-4">{alert.message}</p>
                <div className="flex items-center justify-between text-xs">
                  <span>Areas: {alert.areas.join(', ')}</span>
                  <span>{formatTimestamp(alert.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              View All Alerts
            </button>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section id="news" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News & Announcements</h2>
            <p className="text-xl text-gray-600">Stay informed about disaster preparedness initiatives and community updates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <article key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {item.author}</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              View All News
            </button>
          </div>
        </div>
      </section>

      {/* Activity Gallery Preview */}
      <section id="gallery" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Activities</h2>
            <p className="text-xl text-gray-600">See our disaster preparedness activities and community engagement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
            <p className="text-xl text-gray-600">Essential tools and resources for emergency preparedness</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button 
              onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-center group"
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Interactive Map</h3>
              <p className="text-sm text-gray-600">Find evacuation centers and risk areas</p>
            </button>

            <button 
              onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Resources</h3>
              <p className="text-sm text-gray-600">Download emergency guides and maps</p>
            </button>

            <button 
              onClick={() => document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors text-center group"
            >
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Report Incident</h3>
              <p className="text-sm text-gray-600">Submit emergency reports and incidents</p>
            </button>

            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center group"
            >
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600">Get in touch with our DRRM team</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;